'use client';
import { useState, useEffect, useMemo } from 'react';
import { Star, ShoppingBag, Heart, RefreshCw, BadgeCheck, RefreshCcw, Check } from 'lucide-react';
import { toast, Bounce } from 'react-toastify';
import { useCartStore } from '../../../store/cartStore';
import { useReviewStore } from '@/store/useReviewStore'; // 1. Import Review Store

interface ProductInfoProps {
    product: any;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
    const { addCart, getAllCart } = useCartStore();
    
    // 2. Extract Review data and fetch action
    const { activeProductReviews, fetchActiveReviews } = useReviewStore();

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('#3bb77e');

    const colors = ['#f74877', '#3bb77e', '#2196f3', '#ff9800'];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    // 3. Fetch Reviews from Backend when product changes
    useEffect(() => {
        if (product?._id) {
            fetchActiveReviews(product._id);
        }
    }, [product?._id, fetchActiveReviews]);

    // 4. Calculate Average Rating and Count dynamically from Store
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

    // Calculation: Discounted Price and Original Price based on Quantity
    const unitPrice = product.price - (product.price * (product.discountPrice || 0) / 100);
    const totalPrice = Math.round(unitPrice * quantity);
    const totalOriginalPrice = product.price * quantity;

    const finalPrice = product.discountPrice || product.price || 0;
    const originalPrice = product.discountPrice ? product.price : null;
    const discountPercent = originalPrice ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;

    // Safety check for user token
    const getUserToken = () => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem("user");
            return userData ? JSON.parse(userData) : {};
        }
        return {};
    };
    const token = getUserToken();

    const increaseFunc = () => {
        if (quantity < product.stockQuantity) {
            setQuantity(quantity + 1);
        } else {
            toast.warn('Stock max reached!', {
                position: "top-right",
                autoClose: 5000,
                transition: Bounce,
            });
        }
    }

    const addToCart = async () => {
        try {
            await addCart({
                quantity,
                selectedColor,
                selectedSize,
                totalPrice,
                product,
                userId: token._id
            });
            await getAllCart(token._id)

            toast.success('Added to cart!', {
                position: "top-right",
                autoClose: 5000,
                transition: Bounce,
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col gap-6">

            {/* TITLE */}
            <div className="space-y-2">
                <span className="bg-[var(--pink-light)] text-[var(--pink-dark)] text-xs font-bold px-3 py-1 rounded">
                    Sale Off
                </span>

                <h1 className="text-3xl font-bold text-[var(--text-main)]">
                    {product.name || product.title}
                </h1>

                <div className="flex items-center gap-4">
                    <div className="flex items-center text-[#ffb703] gap-1">
                        {/* Dynamic Star Rendering */}
                        {[...Array(5)].map((_, i) => (
                            <Star 
                                key={i} 
                                size={16} 
                                // Fills star if index is less than the rounded average
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

            {/* PRICE SECTION  */}
            <div className="flex items-center gap-4 py-4 border-y border-[var(--border-color)]">
                <span className="text-4xl font-bold text-[var(--primary)]">
                    ₹{product.discountPrice || product.price}
                </span>

                {product.discountPrice > 0 && (
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
            <div className="mt-2">
                <p className="text-sm font-bold text-[#253d4e] mb-3">Color</p>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`relative w-6 h-6 rounded-full border border-gray-100 transition-all hover:scale-110 ${selectedColor === color ? "border-black scale-110 shadow-sm" : "border-gray-200"
                                }`}
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

            {/* SIZE */}
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

            {/* QUANTITY SECTION */}
            <div className="flex flex-wrap items-center gap-4 py-4">
                <div className="flex items-center border border-[var(--border-color)] rounded-lg px-4 py-2">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2 font-bold">-</button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button onClick={increaseFunc} className="px-2 font-bold">+</button>
                </div>

                <button 
                    onClick={addToCart} 
                    className={`flex-1 min-w-[200px] h-14 bg-[var(--primary)] text-white rounded-lg flex items-center justify-center gap-2 font-bold ${token?._id ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}  
                    disabled={!token || !token._id}
                >
                    <ShoppingBag size={20} />
                    Add to Cart
                </button>

                <div className="flex gap-2">
                    <button className="w-14 h-14 border rounded-lg flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">
                        <Heart size={20} />
                    </button>
                    <button className="w-14 h-14 border rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <RefreshCw size={20} />
                    </button>
                </div>
            </div>

            {/* EXTRA INFO */}
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

            {/* META */}
            <div className="space-y-1 text-sm pt-4 border-t border-[var(--border-color)]">
                <p><span className="font-semibold text-[var(--text-main)]">SKU:</span> {product.sku || "N/A"}</p>
                <p><span className="font-semibold text-[var(--text-main)]">Category:</span> {product.mainCategoryId?.name || product.mainCategoryId || "General"}</p>
                <p><span className="font-semibold text-[var(--text-main)]">Stock:</span> {product.stockQuantity} Items In Stock</p>
            </div>

        </div>
    );
};

export default ProductInfo;