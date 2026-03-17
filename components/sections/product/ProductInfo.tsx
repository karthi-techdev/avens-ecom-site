'use client';
import { useState } from 'react';
import { Star, Hash, ShoppingBag, Heart, RefreshCw, BadgeCheck, RefreshCcw, Wallet } from 'lucide-react';

interface ProductInfoProps {
    product: any;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Blue');

    const colors = ['#f74877', '#3bb77e', '#2196f3', '#ff9800'];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-2">
                <span className="bg-[var(--pink-light)] text-[var(--pink-dark)] text-xs font-bold px-3 py-1 rounded">Sale Off</span>
                <h1 className="text-3xl font-bold text-[var(--text-main)]">{product.name}</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-[#ffb703] gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        <span className="text-sm text-[var(--text-muted)] ml-1">(32 reviews)</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 py-4 border-y border-[var(--border-color)]">
                <span className="text-4xl font-bold text-[var(--primary)]">${product.price}</span>
                {product.oldPrice && (
                    <div className="flex flex-col">
                        <span className="text-sm text-[var(--pink-dark)] font-bold">25% Off</span>
                        <span className="text-lg text-[var(--text-muted)] line-through">${product.oldPrice}</span>
                    </div>
                )}
            </div>

            <p className="text-[var(--text-muted)] line-clamp-3">
                {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et scelerisque lorem bibendum."}
            </p>

            {/* Sizes */}
            <div>
                <p className="text-sm font-bold text-[var(--text-main)] mb-3">Size/Weight</p>
                <div className="flex gap-2">
                    {sizes.map(size => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 border rounded text-sm transition-all ${
                                selectedSize === size ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "bg-white text-[var(--text-muted)] hover:bg-[var(--green-light)]"
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-wrap items-center gap-4 py-4">
                <div className="flex items-center border border-[var(--border-color)] rounded-lg px-4 py-2">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-xl px-2 hover:text-[var(--primary)]">-</button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="text-xl px-2 hover:text-[var(--primary)]">+</button>
                </div>
                <button className="flex-1 min-w-[200px] h-14 bg-[var(--primary)] text-white rounded-lg flex items-center justify-center gap-2 font-bold hover:bg-[#29a56c] transition-all shadow-lg active:scale-95">
                    <ShoppingBag size={20} />
                    Add to Cart
                </button>
                <div className="flex gap-2">
                    <button className="w-14 h-14 border border-[var(--border-color)] rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm">
                        <Heart size={20} />
                    </button>
                    <button className="w-14 h-14 border border-[var(--border-color)] rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm">
                        <RefreshCw size={20} />
                    </button>
                </div>
            </div>

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

            <div className="space-y-1 text-sm pt-4 border-t border-[var(--border-color)]">
                <p><span className="text-[var(--text-main)] font-semibold">SKU:</span> <span className="text-[var(--primary)]">FWM15VKT</span></p>
                <p><span className="text-[var(--text-main)] font-semibold">Category:</span> <span className="text-[var(--primary)]">{product.category}</span></p>
                <p><span className="text-[var(--text-main)] font-semibold">Tags:</span> <span className="text-[var(--primary)]">Organic, Healthy</span></p>
            </div>
        </div>
    );
};

export default ProductInfo;
