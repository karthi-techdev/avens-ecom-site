'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; 
import ShopSidebar from '@/components/sections/shop/ShopSidebar';
import ShopHeader from '@/components/sections/shop/ShopHeader';
import ProductCard from '@/components/ui/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { useProductStore } from '../../store/useProductStore';
import { useCategoryStore } from '../../store/useCategoryStore'; 
import { useMainCategoryStore } from '../../store/useMainCategoryStore';
import { useSubCategoryStore } from '../../store/useSubCategoryStore';
import { useOfferStore } from '../../store/useOfferStore';
export default function ProductShowPage() {
    return (
        <Suspense fallback={
            <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3BB77E] mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading Shop...</p>
            </div>
        }>
            <ProductListContent />
        </Suspense>
    );
}

function ProductListContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryQuery = searchParams.get('category');
    const offerIdFromUrl = searchParams.get('offerId'); 
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('Release Date');
    const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

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
    }, [fetchProducts, fetchMainCategories, fetchSubCategories, fetchCategories,fetchOffers]);


    const filteredAndSortedProducts = useMemo(() => {
        if (!products || products.length === 0) return [];

        let items = [...products];

        if (categoryQuery) {
            const allCats = [...(mainCategories || []), ...(subCategories || []), ...(categories || [])];
            const matchingCat: any = allCats.find(c => c.slug?.toLowerCase() === categoryQuery.toLowerCase());

            if (matchingCat) {
                const targetId = matchingCat._id.toString();

                items = items.filter((product: any) => {
    
    const targetId = matchingCat._id.toString();

  
    const pMainId = (product.mainCategoryId?._id || product.mainCategoryId || "").toString();
    const pSubId = (product.subCategoryId?._id || product.subCategoryId || "").toString();
    const pChildId = (product.categoryId?._id || product.categoryId || "").toString();

  
    return (
        pMainId === targetId || 
        pSubId === targetId || 
        pChildId === targetId
    );
});
            } else {
                if (mainCategories.length > 0) items = [];
            }
        }

        // Price filter
        items = items.filter(p => {
            const price = p.discountPrice || p.price || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Sort filter
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
            const pA = a.discountPrice || a.price || 0;
            const pB = b.discountPrice || b.price || 0;
            if (sortOption === 'Price: Low to High') return pA - pB;
            if (sortOption === 'Price: High to Low') return pB - pA;
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        });

        return items;
    }, [products,offers, categoryQuery, priceRange, selectedCategoryId,sortOption,offerIdFromUrl, mainCategories, subCategories, categories]);
   
    const sidebarItems = useMemo(() => {
   
    return mainCategories.map((cat: any) => ({
        ...cat,
        
        _id: cat.slug, 
        name: cat.name, 
        status: 'active'
    }));
}, [mainCategories]);

    // Pagination
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
                            categories={sidebarItems as any}
                            selectedCategoryId={categoryQuery}
                            onCategoryChange={(slug) => {
                                const params = new URLSearchParams(searchParams.toString());
                                if (slug) params.set('category', slug); else params.delete('category');
                                router.push(`?${params.toString()}`);
                            }}
                        />
                    </aside>

                    <div className={`col-span-12 ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"}`}>
                        <ShopHeader
                            totalItems={filteredAndSortedProducts.length}
                            view={view}
                            setView={(v) => { setView(v); setCurrentPage(1); }}
                            sortSelected={sortOption}
                            setSortSelected={setSortOption}
                        />

                        {filteredAndSortedProducts.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-2xl">
                                <p className="text-lg text-gray-600">No products found for this category.</p>
                                <button onClick={() => router.push('?')} className="text-[#3BB77E] underline font-bold mt-2">
                                    Reset all filters
                                </button>
                            </div>
                        ) : (
                            <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6" : "flex flex-col gap-6"}>
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
                    </div>
                </div>
            </div>
            <QuickViewModal isOpen={isQuickViewOpen} product={selectedProduct} onClose={() => setIsQuickViewOpen(false)} />
        </main>
    );
}
