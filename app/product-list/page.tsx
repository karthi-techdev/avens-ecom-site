'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ShopSidebar from '@/components/sections/shop/ShopSidebar';
import ShopHeader from '@/components/sections/shop/ShopHeader';
import ProductCard from '@/components/ui/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { useProductStore } from '@/store/useProductStore';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useMainCategoryStore } from '@/store/useMainCategoryStore';
import { useSubCategoryStore } from '@/store/useSubCategoryStore';
import { useOfferStore } from '@/store/useOfferStore';

export default function ProductShowPage() {
    return (
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <ProductListContent />
        </Suspense>
    );
}

function ProductListContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const categoryQuery = searchParams.get('category');
    const offerIdFromUrl = searchParams.get('offerId');
    const searchTerm = searchParams.get('search') || "";

    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('Release Date');
    
    // CHANGE 1: Increase max price default to ensure products aren't hidden
    const [priceRange, setPriceRange] = useState<number[]>([0, 100000]); 

    const { products, isLoading, fetchProducts } = useProductStore();
    const { mainCategories, fetchMainCategories } = useMainCategoryStore();
    const { subCategories, fetchSubCategories } = useSubCategoryStore();
    const { categories, fetchCategories } = useCategoryStore();
    const { offers, fetchOffers } = useOfferStore();

    useEffect(() => {
        fetchProducts();
        fetchMainCategories();
        fetchSubCategories();
        fetchCategories();
        fetchOffers();
    }, []);

    const filteredAndSortedProducts = useMemo(() => {
        if (!products || products.length === 0) return [];

        let items = [...products];

        // 1. Search Filter
        if (searchTerm) {
            items = items.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // 2. Category Filter
        if (categoryQuery && categoryQuery !== "All Categories") {
            const allCats = [...mainCategories, ...subCategories, ...categories];
            const matchingCat = allCats.find(c => c.slug?.toLowerCase() === categoryQuery.toLowerCase());

            if (matchingCat) {
                const targetId = matchingCat._id.toString();
                items = items.filter((product: any) => {
                    // Extract IDs safely whether they are objects or strings
                    const pMainId = (product.mainCategoryId?._id || product.mainCategoryId || "").toString();
                    const pSubId = (product.subCategoryId?._id || product.subCategoryId || "").toString();
                    const pChildId = (product.categoryId?._id || product.categoryId || "").toString();
                    
                    return pMainId === targetId || pSubId === targetId || pChildId === targetId;
                });
            } else {
                // CHANGE 2: Don't empty the items if the category isn't found immediately 
                // while data is still loading
                if (mainCategories.length > 0) items = []; 
            }
        }

        // 3. Price Filter
        items = items.filter(product => {
            // Ensure we use the correct price (discounted or original)
            const price = product.discountPrice > 0 
                ? Math.round(product.price - (product.price * product.discountPrice) / 100)
                : (product.price || 0);
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // 4. Sorting
        items.sort((a, b) => {
            const pA = a.discountPrice > 0 ? a.price - (a.price * a.discountPrice / 100) : a.price;
            const pB = b.discountPrice > 0 ? b.price - (b.price * b.discountPrice / 100) : b.price;
            if (sortOption === 'Price: Low to High') return pA - pB;
            if (sortOption === 'Price: High to Low') return pB - pA;
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        });

        return items;
    }, [products, searchTerm, categoryQuery, priceRange, sortOption, mainCategories, subCategories, categories]);

    const sidebarItems = useMemo(() => {
        return mainCategories.map((cat: any) => ({
            ...cat,
            _id: cat.slug, 
            name: cat.name
        }));
    }, [mainCategories]);

    const itemsPerPage = view === 'grid' ? 12 : 6;
    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
    const currentProducts = filteredAndSortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (isLoading) {
        return (
            <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3BB77E] mx-auto"></div>
            </div>
        );
    }

    return (
        <main className="w-full overflow-x-hidden mt-9">
            <div className='max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6'>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                    
                    <aside className="col-span-12 lg:col-span-3">
                        <ShopSidebar
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            categories={sidebarItems as any}
                            selectedCategoryId={categoryQuery}
                            onCategoryChange={(slug) => {
                                const params = new URLSearchParams(searchParams.toString());
                                if (slug) params.set('category', slug); 
                                else params.delete('category');
                                router.push(`?${params.toString()}`);
                            }}
                        />
                    </aside>

                    <div className="col-span-12 lg:col-span-9 transition-all duration-300">
                        <ShopHeader
                            totalItems={filteredAndSortedProducts.length}
                            view={view}
                            setView={setView}
                            sortSelected={sortOption}
                            setSortSelected={setSortOption}
                        />

                        {filteredAndSortedProducts.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                <p className="text-lg text-gray-600">
                                    No products found matching your filters.
                                </p>
                                <button 
                                    onClick={() => router.push('/product-list')} 
                                    className="text-[#3BB77E] underline font-bold mt-2"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-6"}>
                                {currentProducts.map((product) => (
                                    <ProductCard 
                                        key={product._id} 
                                        product={product} 
                                        onQuickView={() => { setSelectedProduct(product); setIsQuickViewOpen(true); }} 
                                        view={view} 
                                    />
                                ))}
                            </div>
                        )}
                        
                        {/* Pagination component here... */}
                    </div>
                </div>
            </div>
            <QuickViewModal isOpen={isQuickViewOpen} product={selectedProduct} onClose={() => setIsQuickViewOpen(false)} />
        </main>
    );
}