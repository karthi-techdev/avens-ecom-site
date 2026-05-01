'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation'; 
import ShopSidebar from '@/components/sections/shop/ShopSidebar';
import ShopHeader from '@/components/sections/shop/ShopHeader';
import ProductCard from '@/components/ui/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { useProductStore } from '../../store/useProductStore';
import { useCategoryStore } from '../../store/useCategoryStore';
import { useOfferStore } from '../../store/useOfferStore';

export default function ProductShowPage() {
    const searchParams = useSearchParams();
    const offerIdFromUrl = searchParams.get('offerId'); 
    
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('Release Date');
    const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const itemsPerPage = view === 'grid' ? 12 : 6;

    const { products, isLoading, fetchProducts } = useProductStore();
    const { categories, fetchCategories } = useCategoryStore();
    const { offers, fetchOffers } = useOfferStore(); 

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchOffers(); 
    }, [fetchProducts, fetchCategories, fetchOffers]);

    const filteredAndSortedProducts = useMemo(() => {
        let items = [...products];

if (offerIdFromUrl && offers.length > 0) {
    const targetOffer = offers.find(o => String(o._id) === String(offerIdFromUrl));
    const offerProducts = (targetOffer as any)?.products;

    if (offerProducts && Array.isArray(offerProducts)) {
        items = items.filter(product => 
            offerProducts.some((p: any) => {
                const pId = typeof p === 'object' ? p._id : p;
                return String(pId) === String(product._id);
            })
        );
    }
}

        // Filter by Category
        if (selectedCategoryId) {
            items = items.filter(product => {
                const rawId = product.categoryId || (product as any).mainCategoryId || (product as any).category;
                if (!rawId) return false;
                const productCatId = typeof rawId === 'object' ? rawId?._id : rawId;
                return String(productCatId) === String(selectedCategoryId);
            });
        }

        //  Filter by Price
        items = items.filter(product => {
            const price = product.discountPrice || product.price || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Sort Logic
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
                default:
                    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            }
        });
        return items;
    }, [products, offers, sortOption, priceRange, selectedCategoryId, offerIdFromUrl]);

    // --- Pagination ---
    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
    const currentProducts = filteredAndSortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleQuickView = (product: any) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    return (
        <main className="w-full !overflow-x-hidden !mt-9">
            <div className='max-w-[1600px] !mx-auto !px-4 sm:!px-6 lg:!px-10 !py-6'>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                    {/* Sidebar Section */}
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

                    {/* Content Section */}
                    <div className={`col-span-12 ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"} transition-all duration-300`}>
                        <ShopHeader
                            totalItems={filteredAndSortedProducts.length}
                            view={view}
                            setView={(v) => { setView(v); setCurrentPage(1); }}
                            sortSelected={sortOption}
                            setSortSelected={setSortOption}
                        />

                        {isLoading ? (
                            <div className="text-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3BB77E] mx-auto"></div>
                                <p className="mt-4 text-gray-500">Loading products...</p>
                            </div>
                        ) : filteredAndSortedProducts.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-2xl">
                                <p className="text-lg text-gray-600">No products found matching your criteria.</p>
                                <button
                                    onClick={() => {
                                        window.location.href = "/product-list"; // Reset URL params
                                    }}
                                    className="text-[#3BB77E] underline font-bold mt-2"
                                >
                                    Reset all filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className={
                                    view === 'grid'
                                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                        : "flex flex-col gap-6"
                                }>
                                    {currentProducts.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                            onQuickView={() => handleQuickView(product)}
                                            view={view}
                                        />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="flex justify-center mt-12 gap-2">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(prev => prev - 1)}
                                            className="w-10 h-10 rounded-full border flex items-center justify-center disabled:opacity-30"
                                        >
                                            &lt;
                                        </button>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-10 h-10 rounded-full border transition-all ${currentPage === i + 1
                                                        ? 'bg-[#3BB77E] text-white border-[#3BB77E]'
                                                        : 'bg-white hover:bg-gray-100'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                            className="w-10 h-10 rounded-full border flex items-center justify-center disabled:opacity-30"
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <QuickViewModal
                    isOpen={isQuickViewOpen}
                    product={selectedProduct}
                    onClose={() => setIsQuickViewOpen(false)}
                />
            </div>
        </main>
    );
}