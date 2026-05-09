
'use client';
import React from 'react';
import { Filter } from 'lucide-react';
import { useProductStore } from '@/store/useProductStore';
import URLs from "../../../lib/urls";
import { Category } from '@/store/useCategoryStore';
import { usePathname, useRouter } from 'next/navigation';


interface ShopSidebarProps {
    priceRange: number[];
    setPriceRange: (range: number[]) => void;
    categories: Category[];
    selectedCategoryId: string | null;
    onCategoryChange: (id: string | null) => void;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({
    priceRange,
    setPriceRange,
    categories = [],
    selectedCategoryId,
    onCategoryChange
}) => {
    const { products } = useProductStore();
    const pathname = usePathname();
        const router = useRouter(); 
    const isProductViewPage = pathname?.includes('product-view');
    const max = 2000;

    const handleProductClick = (slug: string) => {
        router.push(`/product-view/${slug}`);
    };

    const latestProducts = [...products]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);

    return (
        <div className="!space-y-6 lg:!space-y-8 max-w-[300px] w-full">
            {/* Dynamic Category Widget */}
            <div className="border rounded-xl !p-6 shadow-sm bg-white" style={{ borderColor: 'var(--border-color)' }}>
                <div className="relative !mb-5">
                    <h5 className="font-bold text-lg !pb-3 border-b text-[#253D4E]">Category</h5>
                    <span className="absolute bottom-0 left-0 w-20 h-[2px] bg-[#3BB77E]"></span>
                </div>
                <ul className="!space-y-4 text-[14px] text-[#7E7E7E]">
                    <li
                        onClick={() => onCategoryChange(null)}
                        className={`cursor-pointer transition-all hover:translate-x-1 hover:text-[#3BB77E] ${!selectedCategoryId ? 'text-[#3BB77E] font-bold' : ''}`}
                    >
                        All Categories
                    </li>
                    {categories.map((cat) => (
                        <li
                            key={cat._id}
                            onClick={() => onCategoryChange(cat._id)}
                            className={`cursor-pointer transition-all hover:translate-x-1 hover:text-[#3BB77E] ${selectedCategoryId === cat._id ? 'text-[#3BB77E] font-bold' : ''}`}
                        >
                            {cat.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price Filter Widget */}
            {!isProductViewPage && (
                <div className="border rounded-xl !p-6 shadow-sm bg-white overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="relative !mb-6">
                        <h5 className="font-bold text-lg !pb-3 border-b uppercase text-[#253D4E]">Fill by Price</h5>
                        <span className="absolute bottom-0 left-0 w-20 h-[2px] bg-[#3BB77E]"></span>
                    </div>

                    <div className="!mb-6 px-1">
                        {/* Slider Container */}
                        <div className="relative h-1.5 w-full bg-[#e2e8f0] rounded-full mt-8">
                            {/* The Green Progress Bar */}
                            <div
                                className="absolute h-full bg-[#3BB77E] rounded-full"
                                style={{
                                    left: `${(priceRange[0] / max) * 100}%`,
                                    right: `${100 - (priceRange[1] / max) * 100}%`
                                }}
                            ></div>

                            {/* Dual Range Inputs */}
                            <input
                                type="range"
                                min={0}
                                max={max}
                                value={priceRange[0]}
                                onChange={(e) => {
                                    const val = Math.min(Number(e.target.value), priceRange[1] - 50);
                                    setPriceRange([val, priceRange[1]]);
                                }}
                                className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none z-30 range-input top-0"
                            />
                            <input
                                type="range"
                                min={0}
                                max={max}
                                value={priceRange[1]}
                                onChange={(e) => {
                                    const val = Math.max(Number(e.target.value), priceRange[0] + 50);
                                    setPriceRange([priceRange[0], val]);
                                }}
                                className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none z-30 range-input top-0"
                            />
                        </div>

                        <div className="flex flex-col gap-1 mt-6">
                            <span className="text-[14px] text-[#7E7E7E]">Range:</span>
                            <span className="text-[15px] font-bold text-[#3BB77E]">₹{priceRange[0]} - ₹{priceRange[1]}</span>
                        </div>
                    </div>

                    <button className="w-full !py-3 bg-[#3BB77E] hover:bg-[#29A56C] text-white rounded font-bold text-[14px] flex items-center justify-center gap-2 transition-colors">
                        <Filter size={16} /> Filter
                    </button>
                </div>
            )}

            {/* New Products Widget */}
            <div className="border rounded-xl !p-6 shadow-sm bg-white" style={{ borderColor: 'var(--border-color)' }}>
                <div className="relative !mb-5">
                    <h5 className="font-bold text-lg !pb-3 border-b text-[#253D4E]">New Products</h5>
                    <span className="absolute bottom-0 left-0 w-20 h-[2px] bg-[#3BB77E]"></span>
                </div>
                <div className="!space-y-5">
                    {latestProducts.map((product: any) => {

                        const originalPrice = product?.price || 0;
                        const discountPercent = product?.discountPrice || 0;

                        const finalPrice = discountPercent > 0
                            ? Math.round(originalPrice - (originalPrice * discountPercent) / 100)
                            : originalPrice;

                        const hasDiscount = discountPercent > 0;

                        return (
                            <div key={product._id}  onClick={() => handleProductClick(product.slug)} className="flex gap-4 items-center cursor-pointer">

                                {/* Image */}
                                <div className="w-20 h-20 bg-[#f7f8f9] rounded-lg overflow-hidden">
                                    <img
                                        src={`${URLs.FILEURL}${product?.images?.[0]?.replace(/^\/+/, "")}`}
                                        alt={product?.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div>
                                    <h4 className="text-[14px] font-bold text-[#3BB77E] line-clamp-1">
                                        {product.name}
                                    </h4>

                                    {/*  PRICE UI */}
                                    <div className="flex flex-col mt-1">

                                        <div className="flex items-center gap-2">
                                            <span className="text-[16px] font-bold text-[#253D4E]">
                                                ₹{finalPrice}
                                            </span>

                                            {hasDiscount && (
                                                <span className="text-[#F74B81] text-[11px] font-bold">
                                                    {discountPercent}% OFF
                                                </span>
                                            )}
                                        </div>

                                        {hasDiscount && (
                                            <span className="line-through text-[#7E7E7E] text-[13px]">
                                                ₹{originalPrice}
                                            </span>
                                        )}

                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Injected styles for the range thumbs */}
            <style jsx>{`
                .range-input::-webkit-slider-thumb {
                    pointer-events: auto;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background-color: #3BB77E;
                    border: 2px solid white;
                    cursor: pointer;
                    -webkit-appearance: none;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                }
                .range-input::-moz-range-thumb {
                    pointer-events: auto;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background-color: #3BB77E;
                    border: 2px solid white;
                    cursor: pointer;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                }
            `}</style>
        </div>
    );
};

export default ShopSidebar;


