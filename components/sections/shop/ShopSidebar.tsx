'use client';
import React, { useEffect, useMemo } from 'react';
import Link from 'next/link'; 
import { Filter } from 'lucide-react';
import { useProductStore } from '@/store/useProductStore';
import { useReviewStore } from '@/store/useReviewStore'; // 1. Import Review Store
import URLs from "../../../lib/urls";
import { Category } from '@/store/useCategoryStore';
import { MdStarPurple500 } from "react-icons/md";

interface ShopSidebarProps {
    priceRange: number[];
    setPriceRange: (range: number[]) => void;
    categories: Category[];
    selectedCategoryId: string | null;
    onCategoryChange: (id: string | null) => void;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ 
    priceRange = [0, 2000],           
    setPriceRange = () => {},         
    categories = [],                  
    selectedCategoryId = null,
    onCategoryChange = () => {} 
}) => {
    const { products } = useProductStore();
    
    // 2. Extract reviews and fetch action from Store
    const { reviews, fetchReviews } = useReviewStore();
    
    const max = 2000; 

    // Sort products by date to get the 3 newest arrivals
    const latestProducts = [...products]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);

    // 3. Fetch reviews from backend on component mount
    useEffect(() => {
        // We fetch a larger limit to ensure we have reviews for the sidebar products
        fetchReviews(1, 50); 
    }, [fetchReviews]);

    // 4. Helper function to calculate average rating for a specific product ID
    const getProductRating = (productId: string, initialRating: number) => {
        const productReviews = reviews.filter(r => r.productId === productId && r.status === 'active');
        
        if (productReviews.length === 0) {
            return initialRating || 0;
        }

        const sum = productReviews.reduce((acc, rev) => acc + rev.rating, 0);
        return sum / productReviews.length;
    };

    return (
        <div className="!space-y-6 lg:!space-y-8 max-w-[300px] w-full">
            
            {/* --- Category Widget --- */}
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

            {/* --- Price Filter Widget --- */}
            <div className="border rounded-xl !p-6 shadow-sm bg-white overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
                <div className="relative !mb-6">
                    <h5 className="font-bold text-lg !pb-3 border-b uppercase text-[#253D4E]">Fill by Price</h5>
                    <span className="absolute bottom-0 left-0 w-20 h-[2px] bg-[#3BB77E]"></span>
                </div>
                
                <div className="!mb-6 px-1">
                    <div className="relative h-1.5 w-full bg-[#e2e8f0] rounded-full mt-8">
                        <div 
                            className="absolute h-full bg-[#3BB77E] rounded-full"
                            style={{ 
                                left: `${(priceRange?.[0] ?? 0 / max) * 100}%`, 
                                right: `${100 - ((priceRange?.[1] ?? max) / max) * 100}%` 
                            }}
                        ></div>
                        
                        <input 
                            type="range" 
                            min={0} 
                            max={max} 
                            value={priceRange?.[0] ?? 0}
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
                            value={priceRange?.[1] ?? max}
                            onChange={(e) => {
                                const val = Math.max(Number(e.target.value), priceRange[0] + 50);
                                setPriceRange([priceRange[0], val]);
                            }}
                            className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none z-30 range-input top-0"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1 mt-6">
                        <span className="text-[14px] text-[#7E7E7E]">Range:</span>
                        <span className="text-[15px] font-bold text-[#3BB77E]">₹{priceRange?.[0] ?? 0} - ₹{priceRange?.[1] ?? max}</span>
                    </div>
                </div>
                
                <button className="w-full !py-3 bg-[#3BB77E] hover:bg-[#29A56C] text-white rounded font-bold text-[14px] flex items-center justify-center gap-2 transition-colors">
                    <Filter size={16} /> Filter
                </button>
            </div>

            {/* --- New Products Widget --- */}
            <div className="border rounded-xl !p-6 shadow-sm bg-white" style={{ borderColor: 'var(--border-color)' }}>
                <div className="relative !mb-5">
                    <h5 className="font-bold text-lg !pb-3 border-b text-[#253D4E]">New Products</h5>
                    <span className="absolute bottom-0 left-0 w-20 h-[2px] bg-[#3BB77E]"></span>
                </div>
                <div className="!space-y-5">
                    {latestProducts.map((product) => {
                        // 5. Calculate the rating for each product in the list
                        const currentAvgRating = getProductRating(product._id, product.rating);

                        return (
                            <Link 
                                key={product._id} 
                                href={`/product-view/${product.slug}`} 
                                className="flex gap-4 items-center group cursor-pointer"
                            >
                                <div className="relative w-20 h-20 bg-[#f7f8f9] rounded-lg overflow-hidden flex-shrink-0">
                                    <img 
                                        src={`${URLs.FILEURL}${product?.images?.[0]?.replace(/^\/+/, "")}`} 
                                        alt={product?.name} 
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[14px] font-bold text-[#3BB77E] line-clamp-1 group-hover:text-[#29A56C] transition-colors">
                                        {product.name}
                                    </h4>
                                    <p className="text-[14px] font-bold text-[#253D4E]">
                                        ₹{product.discountPrice || product.price}
                                    </p>
                                    
                                    {/* --- DYNAMIC RATING STARS FROM DATABASE --- */}
                                    <div className="flex gap-0.5 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <MdStarPurple500 
                                                key={i} 
                                                size={12} 
                                                className={i < Math.round(currentAvgRating) ? "text-yellow-400" : "text-gray-200"} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

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