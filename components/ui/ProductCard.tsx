

'use client';

import { IoBagAddOutline, IoEyeOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { FaCodeCompare } from "react-icons/fa6";
import { MdStarPurple500 } from "react-icons/md";
import URLs from "../../lib/urls";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useCartStore } from "@/store/cartStore";
import { toast, Bounce } from "react-toastify";
interface ProductCardProps {
    product: any;
    onQuickView?: () => void;
    view?: 'grid' | 'list';
}

const ProductCard = ({ product, onQuickView, view = 'grid' }: ProductCardProps) => {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  
    const [rating, setRating] = useState(product?.rating || 0);
    const [percentage, setPercentage] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [token, setToken] = useState<any>(null);
    const { addCart, getAllCart } = useCartStore();

    const originalPrice = product?.price || 0;
    const discountPercent = product?.discountPrice || 0;
    const finalPrice = discountPercent > 0
        ? Math.round(originalPrice - (originalPrice * discountPercent) / 100)
        : originalPrice;


const baseUrl = (URLs.FILEURL || "http://localhost:5000").replace(/\/$/, "");
   const rawPath = product?.thumbnail || 
               (product?.images && product?.images.length > 0 ? product.images[0] : "") || 
               product?.image || "";

const finalImageSrc = rawPath 
    ? (rawPath.startsWith('http') ? rawPath : `${baseUrl}/${rawPath.replace(/^\/+/, "")}`)
    : "/placeholder.jpg";
    const hasDiscount = discountPercent > 0;
    const categoryName = product?.categoryId?.name || product?.mainCategoryId?.name || "Category";


    //hover img
     const rawHoverPath = (product?.images && product?.images.length > 1) ? product.images[1] : "";
const finalHoverImageSrc = rawHoverPath 
    ? (rawHoverPath.startsWith('http') ? rawHoverPath : `${baseUrl}/${rawHoverPath.replace(/^\/+/, "")}`)
    : null;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        setToken(user);
    }, []);

    useEffect(() => {
        if (!product?._id) return;

        fetch(`http://localhost:5000/api/v1/admin/reviews/rating-summary/${product._id}`)
            .then(res => {
                if (!res.ok) return null; 
                return res.json();
            })
            .then(data => {
                if (data && data.data) {
                    setRating(data?.data?.avgRating || 0);
                    setPercentage(data?.data?.percentage || 0);
                }
            })
            .catch(err => console.log("No reviews yet for this product"));
    }, [product?._id]);


    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const isExist = savedWishlist.some(
            (item: any) => (item._id || item.id) === (product._id || product.id)
        );
        setIsInWishlist(isExist);

    }, [product]);

    const addToCart = async () => {
        if (!token) {
            toast.warn('Login first');
            return;
        }
        try {
            await addCart({
                quantity: 1,
                selectedColor: product.colors[0] || null,
                selectedSize: product.size || null,
                totalPrice: product.price - (product.price * (product.discountPrice / 100)),
                product,
                userId: token._id
            });
            await getAllCart(token._id);
            console.log(product, "im here to check")
            toast.success('Added to cart!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
        } catch (error: any) {
            console.log(error, 'in the page of card')
            toast.warn(error.message)
        }
    }

    const handleAddWishlist = () => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

        const isExist = savedWishlist.find(
            (item: any) => (item._id || item.id) === (product._id || product.id)
        );

        if (!isExist) {
            savedWishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(savedWishlist));

            window.dispatchEvent(new Event("wishlistUpdated"));

            setIsInWishlist(true);

            // router.push('/wishlist'); //  redirect
        }
    };

    const handleRemoveWishlist = () => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

        const updated = savedWishlist.filter(
            (item: any) => (item._id || item.id) !== (product._id || product.id)
        );

        localStorage.setItem('wishlist', JSON.stringify(updated));
        window.dispatchEvent(new Event("wishlistUpdated"));
        setIsInWishlist(false);
        setShowRemoveAlert(true);
        setTimeout(() => setShowRemoveAlert(false), 3000);
    };


    const IconButton = ({ icon: Icon, label, onClick, onDoubleClick, color }: { icon: any, label: string, color?: string, onClick?: () => void, onDoubleClick?: () => void ; onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;}) => (
        <div className="relative group/tooltip">
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[var(--primary)]">
                {label}
            </span>
            <button
                color={color}
                onClick={onClick}
                style={{ color: color }}
                onDoubleClick={onDoubleClick}
                className="w-9 h-9 flex items-center justify-center bg-white text-[var(--primary)] rounded-full border border-[#BCE3C9] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 shadow-sm"
            >
                <Icon size={18} />
            </button>
        </div>
    );


    if (view === 'list') {
        // Calculate second image for hover if it exists
        const rawHoverPath = product?.images?.[1] || "";
        const finalHoverImageSrc = rawHoverPath 
            ? (rawHoverPath.startsWith('http') ? rawHoverPath : `${baseUrl}/${rawHoverPath.replace(/^\/+/, "")}`)
            : null;

        return (
            <div className="group relative w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row p-4 sm:p-6 border border-[var(--border-color)] hover:shadow-lg">

                {product?.badge && (
                    <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[.80rem] text-white bg-[#f74877]">
                        {product.badge}
                    </span>
                )}

                <div className="relative w-full md:w-64 aspect-square overflow-hidden rounded-xl bg-white cursor-pointer p-3">
                    <div className="w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110">
                       
                        <img
                            src={finalImageSrc}
                            alt={product?.name || "product"}
                            className="w-full h-full object-contain"
                        />
                        
                       
                        {finalHoverImageSrc && (
                            <img
                                src={finalHoverImageSrc}
                                alt={product?.name || "product"}
                                className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            />
                        )}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/5">
                        <IconButton icon={IoEyeOutline} label="Quick View" onClick={onQuickView} />
                        <IconButton 
                            icon={isInWishlist ? IoHeart : IoHeartOutline} 
                            label="Add to Wishlist" 
                            onClick={handleAddWishlist}
                            color={isInWishlist ? "red" : "#7ac086"}
                        />
                        <IconButton icon={FaCodeCompare} label="Compare" />
                    </div>
                </div>

                <div className="flex-1 mt-4 md:mt-0 md:ml-8 flex flex-col justify-center">
                    <p className="text-sm text-[var(--text-muted)] mb-1">{categoryName}</p>
                    <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--primary)]">
                        {product?.name}
                    </h3>

                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-[var(--primary)]">
                            ₹{finalPrice}
                        </span>

                        {hasDiscount && (
                            <>
                                <span className="line-through text-gray-400">
                                    ₹{originalPrice}
                                </span>
                                <span className="text-red-500 font-bold">
                                    {discountPercent}% OFF
                                </span>
                            </>
                        )}
                    </div>

                    {/* STARS */}
                    <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                            <MdStarPurple500
                                key={i}
                                className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}
                            />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">
                            ({percentage}%)
                        </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-6 line-clamp-3">
                        {product?.shortDescription || product?.description || "No description available"}
                    </p>

                    <div className="flex items-center justify-between">
                        <button className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg flex items-center gap-2 hover:bg-[#29A56C] transition-colors" onClick={addToCart}>
                            <IoBagAddOutline />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (

        <div className="group/card relative border border-gray-200 rounded-[20px] p-4 bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            {/* ... wishlist portal code ... */}

            {product?.badge && (
                <span className="absolute top-6 left-6 z-10 bg-[#f74877] text-white px-2 py-1 text-[10px] uppercase font-bold rounded-2xl">
                    {product.badge}
                </span>
            )}

            <div className="relative aspect-square overflow-hidden rounded-xl bg-white p-3 cursor-pointer">
                <div className="w-full h-full transition-transform duration-700 ease-in-out group-hover/card:scale-110">
                  
                    <img
                        src={finalImageSrc}
                        alt={product?.name || "product"}
                        className="w-full h-full object-contain rounded-[20px]"
                    />
                    
              
                    {finalHoverImageSrc && (
                        <img
                            src={finalHoverImageSrc}
                            alt={product?.name || "product"}
                            className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 rounded-[20px]"
                        /> 
                    )}
                </div>

                {/* Hover Icons */}
                <div className="absolute inset-0 flex justify-center items-center gap-2 opacity-0 group-hover/card:opacity-100 transition-all duration-300 bg-black/5">
                    <IconButton icon={IoEyeOutline} label="Quick View" onClick={onQuickView} />
                    <IconButton 
                        icon={isInWishlist ? IoHeart : IoHeartOutline} 
                        label="Wishlist" 
                        onClick={handleAddWishlist}
                        onDoubleClick={handleRemoveWishlist}
                        color={isInWishlist ? "red" : "#7ac086"}
                    />
                    <IconButton icon={FaCodeCompare} label="Compare" />
                </div>
            </div>

            {/* Content Section */}
            <div className="mt-3 flex flex-col flex-1">
                <p className="text-[12px] text-gray-400">{categoryName}</p>
                <h3 className="font-bold text-[15px] leading-tight transition-colors duration-300 group-hover/card:text-[var(--primary)] line-clamp-2 min-h-[40px] mt-1">
                    {product?.name}
                </h3>

                {/* Dynamic Rating */}
                <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                        <MdStarPurple500
                            key={i}
                            size={14}
                            className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-200"}
                        />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">
                        ({percentage}%)
                    </span>
                </div>

                {/* Price and Cart */}
                <div className="flex justify-between items-center mt-auto pt-3">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-600">
                                ₹{finalPrice}
                            </span>
                            {hasDiscount && (
                                <span className="text-red-500 text-xs font-bold">
                                    {discountPercent}% OFF
                                </span>
                            )}
                        </div>
                        {hasDiscount && (
                            <span className="line-through text-gray-400 text-sm mt-1">
                                ₹{originalPrice}
                            </span>
                        )}
                    </div>
                    <button className="p-2.5 bg-[#DEF9EC] text-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all duration-300" onClick={addToCart}>
                        <IoBagAddOutline size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;






