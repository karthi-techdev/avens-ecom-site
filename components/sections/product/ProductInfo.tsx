'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
    Star, ShoppingBag, Heart, RefreshCw, BadgeCheck, 
    RefreshCcw, Check, X, CircleCheck 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast, Bounce } from 'react-toastify';
import { useCartStore } from '@/store/cartStore';
import { useReviewStore } from '@/store/useReviewStore';

interface ProductInfoProps {
    product: any;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
    const router = useRouter();
    const { addCart, getAllCart } = useCartStore();
    const { activeProductReviews, fetchActiveReviews } = useReviewStore();

    // States
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('#3bb77e');
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [showRemoveAlert, setShowRemoveAlert] = useState(false);

    const colors = ['#f74877', '#3bb77e', '#2196f3', '#ff9800'];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    // 1. Fetch Reviews and check Wishlist on mount
    useEffect(() => {
        if (product?._id) {
            fetchActiveReviews(product._id);
        }
        
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const isExist = savedWishlist.some((item: any) => (item._id || item.id) === (product?._id || product?.id));
        setIsInWishlist(isExist);
    }, [product?._id, fetchActiveReviews]);

    // 2. Calculate Average Rating and Count dynamically from Store
    const { avgRating, reviewCount } = useMemo(() => {
        const count = activeProductReviews.length;
        if (count === 0) {
            return { avgRating: product?.rating || 0, reviewCount: 0 };
        }
        const totalRating = activeProductReviews.reduce((sum, rev) => sum + rev.rating, 0);
        return { 
            avgRating: totalRating / count, 
            reviewCount: count 
        };
    }, [activeProductReviews, product?.rating]);

    // 3. Price Calculations
    const unitPrice = product.price - (product.price * (product.discountPrice || 0) / 100);
    const totalPrice = Math.round(unitPrice * quantity);
    const totalOriginalPrice = product.price * quantity;
    const discountPercent = product.discountPrice || 0;

    // 4. Token handling
    const token = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user") || '{}') : {};

    const increaseFunc = () => {
        if (quantity < product.stockQuantity) {
            setQuantity(prev => prev + 1);
        } else {
            toast.warn('Stock max reached!', { position: "top-right", transition: Bounce });
        }
    };

    const addToCart = async () => {
        if (!token?._id) {
            toast.warn('Please login to add items to cart');
            return;
        }

        try {
            await addCart({
                userId: token._id,
                quantity: quantity,
                color: selectedColor,
                size: selectedSize,
                price: totalPrice,
                productId: product._id
            });
            await getAllCart(token._id);

            toast.success('Added to cart!', {
                position: "top-right",
                autoClose: 3000,
                transition: Bounce,
            });
        } catch (error) {
            console.error("Cart Error:", error);
        }
    };

    const handleWishlistClick = () => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const isExist = savedWishlist.find(
            (item: any) => (item._id || item.id) === (product._id || product.id)
        );

        if (!isExist) {
            const productToSave = {
                ...product,
                price: unitPrice, // Save the calculated discounted price
                stockQuantity: product.stockQuantity
            };
            savedWishlist.push(productToSave);
            localStorage.setItem('wishlist', JSON.stringify(savedWishlist));
            window.dispatchEvent(new Event("wishlistUpdated"));
            setIsInWishlist(true);
            router.push('/wishlist');
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

    return (
        <div className="flex flex-col gap-6 relative">
            {/* Alert Message */}
            {showRemoveAlert && (
                <div className="fixed top-5 right-5 z-[9999] min-w-[320px] bg-white border-l-8 border-red-500 shadow-xl p-5 rounded-r-xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <CircleCheck className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900">Removed!</h4>
                        <p className="text-sm text-gray-500">Item removed from wishlist.</p>
                    </div>
                    <button onClick={() => setShowRemoveAlert(false)}><X size={18} /></button>
                </div>
            )}

            {/* TITLE & RATINGS */}
            <div className="space-y-2">
                <span className="bg-[var(--pink-light)] text-[var(--pink-dark)] text-xs font-bold px-3 py-1 rounded">
                    Sale Off
                </span>
                <h1 className="text-3xl font-bold text-[var(--text-main)]">
                    {product.name || product.title}
                </h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-[#ffb703] gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star 
                                key={i} 
                                size={16} 
                                fill={i < Math.round(avgRating) ? "currentColor" : "none"} 
                                className={i < Math.round(avgRating) ? "text-[#ffb703]" : "text-gray-300"}
                            />
                        ))}
                        <span className="text-sm text-[var(--text-muted)] ml-1">
                            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                        </span>
                    </div>
                </div>
            </div>

            {/* PRICE SECTION */}
            <div className="flex items-center gap-4 py-4 border-y border-[var(--border-color)]">
                <span className="text-4xl font-bold text-[var(--primary)]">
                    ₹{totalPrice}
                </span>
                {discountPercent > 0 && (
                    <div className="flex flex-col">
                        <span className="text-sm text-[var(--pink-dark)] font-bold">
                            {discountPercent}% Off
                        </span>
                        <span className="text-lg text-[var(--text-muted)] line-through">
                            ₹{totalOriginalPrice}
                        </span>
                    </div>
                )}
            </div>

            {/* DESCRIPTION */}
            <p className="text-[var(--text-muted)] line-clamp-3">
                {product.shortDescription || "No description available"}
            </p>

            {/* COLORS SECTION */}
            <div>
                <p className="text-sm font-bold text-[#253d4e] mb-3">Color</p>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`relative w-6 h-6 rounded-full border transition-all hover:scale-110 ${selectedColor === color ? "border-black scale-110 shadow-sm" : "border-gray-200"}`}
                            style={{ backgroundColor: color }}
                        >
                            {selectedColor === color && (
                                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#3bb77e] rounded-full flex items-center justify-center border border-white shadow-sm">
                                    <Check className="text-white w-2 h-2" strokeWidth={5} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* SIZE SECTION */}
            <div>
                <p className="text-sm font-bold text-[var(--text-main)] mb-3">Size/Weight</p>
                <div className="flex gap-2">
                    {sizes.map(size => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 border rounded text-sm transition-all ${selectedSize === size
                                ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                                : "bg-white text-[var(--text-muted)] hover:bg-[var(--green-light)]"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap items-center gap-4 py-4">
                <div className="flex items-center border border-[var(--border-color)] rounded-lg px-4 py-2">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2 font-bold">-</button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button onClick={increaseFunc} className="px-2 font-bold">+</button>
                </div>

                <button 
                    onClick={addToCart} 
                    className={`flex-1 min-w-[200px] h-14 bg-[var(--primary)] text-white rounded-lg flex items-center justify-center gap-2 font-bold transition-all active:scale-95 ${!token?._id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#29A56C]'}`}
                    disabled={!token?._id}
                >
                    <ShoppingBag size={20} />
                    Add to Cart
                </button>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={handleWishlistClick}
                        onDoubleClick={handleRemoveWishlist}
                        title="Click to add, Double click to remove"
                        className={`w-14 h-14 border rounded-lg flex items-center justify-center transition-all ${isInWishlist ? "bg-red-50 border-red-200" : "hover:bg-gray-50 border-gray-200"}`}
                    >
                        <Heart
                            size={20}
                            fill={isInWishlist ? "#ef4444" : "none"}
                            className={isInWishlist ? "text-red-500" : "text-gray-600"}
                        />
                    </button>
                    <button className="w-14 h-14 border rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <RefreshCw size={20} />
                    </button>
                </div>
            </div>

            {/* GUARANTEE INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-t border-[var(--border-color)] text-sm text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                    <BadgeCheck size={18} className="text-[var(--primary)]" />
                    <span>Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                    <RefreshCcw size={18} className="text-[var(--primary)]" />
                    <span>30 Day Return Policy</span>
                </div>
            </div>

            {/* META INFO */}
            <div className="space-y-1 text-sm pt-4 border-t border-[var(--border-color)] text-[var(--text-muted)]">
                <p><span className="font-semibold text-[var(--text-main)]">SKU:</span> {product.sku || "N/A"}</p>
                <p><span className="font-semibold text-[var(--text-main)]">Category:</span> {product.mainCategoryId?.name || product.mainCategoryId || "General"}</p>
                <p><span className="font-semibold text-[var(--text-main)]">Stock:</span> {product.stockQuantity} Items In Stock</p>
            </div>
        </div>
    );
};

export default ProductInfo;