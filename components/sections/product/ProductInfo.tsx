'use client';
// FIX: useEffect-ai inge import panniyaachu
import { useState, useEffect } from 'react';
import { Star, ShoppingBag, Heart, RefreshCw, BadgeCheck, RefreshCcw, X, CircleCheck } from 'lucide-react';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductInfoProps {
    product: any;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('#3bb77e');
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [showRemoveAlert, setShowRemoveAlert] = useState(false);
    const router = useRouter();
    const colors = ['#f74877', '#3bb77e', '#2196f3', '#ff9800'];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const unitPrice = product.price - (product.price * (product.discountPrice || 0) / 100);
    const totalPrice = Math.round(unitPrice * quantity);
    const totalOriginalPrice = product.price * quantity;

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const isExist = savedWishlist.some((item: any) => (item._id || item.id) === (product._id || product.id));
        setIsInWishlist(isExist);
    }, [product]);

    const handleWishlistClick = () => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const isExist = savedWishlist.find(
            (item: any) => (item._id || item.id) === (product._id || product.id)
        );

        if (!isExist) {
            const discountedPrice = Math.round(
                product.price - (product.price * (product.discountPrice || 0) / 100)
            );
            const productToSave = {
                ...product,
                price: discountedPrice,
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
            {showRemoveAlert && (
                <div className="fixed top-5 right-5 z-[9999] min-w-[320px] bg-white border-l-8 border-red-500 shadow-xl p-5 rounded-r-xl flex items-center gap-4">

                    <div className="bg-red-100 p-3 rounded-full">
                        <CircleCheck className="w-6 h-6 text-red-600" />
                    </div>

                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900">Removed!</h4>
                        <p className="text-sm text-gray-500">
                            Item removed from wishlist.
                        </p>
                    </div>

                    <button onClick={() => setShowRemoveAlert(false)}>
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* TITLE & RATINGS */}
            <div className="space-y-2">
                <span className="bg-[var(--pink-light)] text-[var(--pink-dark)] text-xs font-bold px-3 py-1 rounded">
                    Sale Off
                </span>
                <h1 className="text-3xl font-bold text-[var(--text-main)]">
                    {product.title || product.name}
                </h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-[#ffb703] gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" />
                        ))}
                        <span className="text-sm text-[var(--text-muted)] ml-1">(32 reviews)</span>
                    </div>
                </div>
            </div>

            {/* PRICE SECTION */}
            <div className="flex items-center gap-4 py-4 border-y border-[var(--border-color)]">
                <span className="text-4xl font-bold text-[var(--primary)]">
                    ₹{totalPrice}
                </span>
                {product.discountPrice > 0 && (
                    <div className="flex flex-col">
                        <span className="text-sm text-[var(--pink-dark)] font-bold">
                            {product.discountPrice}% Off
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
            <div className="mt-6">
                <p className="text-sm font-bold text-[#253d4e] mb-3">Color</p>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`relative w-6 h-6 rounded-full border border-gray-100 transition-all hover:scale-110 ${selectedColor === color ? "border-black scale-110 shadow-sm" : "border-gray-200"}`}
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

            {/* QUANTITY & ACTIONS */}
            <div className="flex flex-wrap items-center gap-4 py-4">
                <div className="flex items-center border border-[var(--border-color)] rounded-lg px-4 py-2">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2 font-bold">-</button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="px-2 font-bold">+</button>
                </div>

                <button className="flex-1 min-w-[200px] h-14 bg-[var(--primary)] text-white rounded-lg flex items-center justify-center gap-2 font-bold">
                    <ShoppingBag size={20} />
                    Add to Cart
                </button>

                <div className="flex gap-2">
                    {/* 5. Heart Button - Dynamic styling apply panniyaachu */}
                    <button
                        type="button"
                        onClick={handleWishlistClick}
                        onDoubleClick={handleRemoveWishlist}
                        className={`w-14 h-14 border rounded-lg flex items-center justify-center transition-all ${isInWishlist ? "bg-red-50 border-red-200" : "hover:bg-gray-50 border-gray-200"}`}
                    >
                        <Heart
                            size={20}
                            fill={isInWishlist ? "#ef4444" : "none"}
                            className={isInWishlist ? "text-red-500" : "text-gray-600"}
                        />
                    </button>
                    <button className="w-14 h-14 border rounded-lg flex items-center justify-center"><RefreshCw size={20} /></button>
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

            {/* META INFO */}
            <div className="space-y-1 text-sm pt-4 border-t border-[var(--border-color)]">
                <p><span className="font-semibold">SKU:</span> {product.sku}</p>
                <p><span className="font-semibold">Category:</span> {product.mainCategoryId}</p>
                <p><span className="font-semibold">Stock:</span> {product.stockQuantity}</p>
            </div>
        </div>
    );
};

export default ProductInfo;