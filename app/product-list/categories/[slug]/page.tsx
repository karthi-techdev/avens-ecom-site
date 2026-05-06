
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import ShopSidebar from '@/components/sections/shop/ShopSidebar';
import ShopHeader from '@/components/sections/shop/ShopHeader';
import ProductCard from '@/components/ui/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';

export default function CategoryProductPage() {

    const params = useParams();
    const slug = params.slug as string;

    console.log(" URL slug:", slug);

    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('Release Date');
    const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);

    const itemsPerPage = view === 'grid' ? 12 : 6;

    // FETCH PRODUCTS BY CATEGORY SLUG
    useEffect(() => {
        if (!slug) return;

        const fetchCategoryProducts = async () => {
            try {
                setIsLoading(true);

                const res = await fetch(
                    `http://localhost:5000/api/v1/admin/products/category/${slug}`
                );

                const data = await res.json();

                console.log(" API DATA:", data);

                setProducts(data.data || []);
            } catch (err) {
                console.log(" ERROR:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [slug]);

    //  FILTER + SORT (ONLY PRICE + SORT)
    const filteredAndSortedProducts = useMemo(() => {
        let items = [...products];

        // PRICE FILTER
        items = items.filter(product => {
            const price = product.discountPrice || product.price || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // SORT
        items.sort((a, b) => {
            const priceA = a.discountPrice || a.price || 0;
            const priceB = b.discountPrice || b.price || 0;

            switch (sortOption) {
                case 'Price: Low to High': return priceA - priceB;
                case 'Price: High to Low': return priceB - priceA;
                default:
                    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            }
        });

        return items;
    }, [products, sortOption, priceRange]);

    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

    const currentProducts = filteredAndSortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="w-full !overflow-x-hidden !mt-9">
            <div className='max-w-[1600px] !mx-auto !px-4 sm:!px-6 lg:!px-10 !py-6'>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">

                    {/* Sidebar */}
                    <aside className={`col-span-12 lg:col-span-3 ${isSidebarOpen ? "block" : "hidden"} lg:block`}>
                        <ShopSidebar
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />
                    </aside>

                    {/* Products */}
                    <div className={`col-span-12 ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"}`}>

                        <ShopHeader
                            totalItems={filteredAndSortedProducts.length}
                            view={view}
                            setView={(v) => { setView(v); setCurrentPage(1); }}
                            sortSelected={sortOption}
                            setSortSelected={setSortOption}
                        />

                        {isLoading ? (
                            <p className="text-center py-10">Loading...</p>
                        ) : filteredAndSortedProducts.length === 0 ? (
                            <p className="text-center py-10 text-red-500">No products found</p>
                        ) : (
                            <div className={view === 'grid'
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                : "flex flex-col gap-6"
                            }>
                                {currentProducts.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onQuickView={() => {
                                            setSelectedProduct(product);
                                            setIsQuickViewOpen(true);
                                        }}
                                        view={view}
                                    />
                                ))}
                            </div>
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