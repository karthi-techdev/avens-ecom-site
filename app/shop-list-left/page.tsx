
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Menu } from "lucide-react";
import ShopSidebar from '@/components/sections/shop/ShopSidebar';
import ShopHeader from '@/components/sections/shop/ShopHeader';
import ProductCard from '@/components/ui/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { useProductStore } from '../../store/useProductStore';
import { useCategoryStore } from '../../store/useCategoryStore';

export default function ProductLeftListPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('Release Date');
    const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const itemsPerPage = 6;
    const { products, isLoading, fetchProducts } = useProductStore();
    const { categories, fetchCategories } = useCategoryStore();

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // ✅ FIXED AND ROBUST FILTERING LOGIC
    const filteredAndSortedProducts = useMemo(() => {
        let items = [...products];

        // 1. Filter by CategoryId (Handling strings, ObjectIds, and Objects)
        if (selectedCategoryId) {
            items = items.filter(product => {
                // Get the ID value from the product
                // Checking categoryId first, then mainCategoryId as fallback
                const rawId = product.categoryId || (product as any).mainCategoryId;
                
                if (!rawId) return false;

                // Extract the ID string (handles cases where API returns category as an object)
                const productCatId = typeof rawId === 'object' ? rawId?._id : rawId;
                
                // ✅ FORCE BOTH TO STRINGS for a guaranteed match
                return String(productCatId) === String(selectedCategoryId);
            });
        }

        // 2. Filter by Price Range
        items = items.filter(product => {
            const price = product.discountPrice || product.price || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // 3. Sorting Logic
        items.sort((a, b) => {
            const priceA = a.discountPrice || a.price || 0;
            const priceB = b.discountPrice || b.price || 0;
            const ratingA = a.rating || 0;
            const ratingB = b.rating || 0;

            switch (sortOption) {
                case 'Price: Low to High': return priceA - priceB;
                case 'Price: High to Low': return priceB - priceA;
                case 'Avg. Rating': return ratingB - ratingA;
                case 'Release Date': 
                    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
                default: return 0;
            }
        });

        return items;
    }, [products, sortOption, priceRange, selectedCategoryId]);

    const currentProducts = filteredAndSortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

    return (
        <main className="w-full overflow-x-hidden mt-9">
            <div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6'>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <aside className={`col-span-12 lg:col-span-3 ${isSidebarOpen ? "block" : "hidden"} lg:block`}>
                        <ShopSidebar 
                            priceRange={priceRange} 
                            setPriceRange={setPriceRange} 
                            categories={categories}
                            selectedCategoryId={selectedCategoryId}
                            onCategoryChange={(id) => { 
                                setSelectedCategoryId(id); 
                                setCurrentPage(1); 
                            }}
                        />
                    </aside>

                    <div className={`col-span-12 ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"}`}>
                        <ShopHeader 
                            totalItems={filteredAndSortedProducts.length} 
                            sortSelected={sortOption}
                            setSortSelected={setSortOption}
                        />

                        {isLoading ? (
                            <p className="text-center py-20 text-lg">Loading products...</p>
                        ) : filteredAndSortedProducts.length === 0 ? (
                            <div className="text-center py-20  rounded-xl bg-gray-50">
                                <p className="text-lg text-gray-600 mb-4">No products found in this category.</p>
                                <button 
                                    onClick={() => setSelectedCategoryId(null)} 
                                    className="text-[#3BB77E] font-bold underline px-4 py-2 hover:bg-[#3BB77E] hover:text-white rounded-lg transition-all "
                                >
                                    Clear Category Filter
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {currentProducts.map((product) => (
                                    <ProductCard 
                                        key={product._id} 
                                        product={product} 
                                        onQuickView={() => setIsQuickViewOpen(true)} 
                                        view="list" 
                                    />
                                ))}
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-12 gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => setCurrentPage(i + 1)} 
                                        className={`w-10 h-10 rounded-full border transition-all ${currentPage === i + 1 ? 'bg-[#3BB77E] text-white border-[#3BB77E]' : 'bg-white hover:bg-gray-100'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <QuickViewModal isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
            </div>
        </main>
    );
}