'use client';
import { useState } from 'react';
import { Menu } from "lucide-react";
import ShopSidebar from '@/components/sections/shop/ShopSidebar';
import ShopHeader from '@/components/sections/shop/ShopHeader';
import ProductCard from '@/components/ui/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { shopProducts } from '@/lib/constants';

export default function ProductListRightPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const totalPages = Math.ceil(shopProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = shopProducts.slice(indexOfFirstItem, indexOfLastItem);

    const openQuickView = () => setIsQuickViewOpen(true);
    const closeQuickView = () => setIsQuickViewOpen(false);

    return (
        <main className="w-full !overflow-x-hidden !mt-9">
            <div className='max-w-[1600px] !mx-auto !px-4 sm:!px-6 lg:!px-10 !py-6'>
                <div className="flex justify-end lg:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="flex items-center gap-2 !px-4 !py-2 mb-2 rounded border transition-all"
                        style={{ borderColor: "var(--border-color)" }}
                    >
                        <Menu size={18} style={{ color: "var(--primary)" }} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                    {/* Main Content */}
                    <div className={`col-span-12 ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"} lg:order-1 order-2`}>
                        <ShopHeader totalItems={shopProducts.length} />

                        {/* Product List */}
                        <div className="flex flex-col gap-6">
                            {currentProducts.map((product) => (
                                <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                    onQuickView={openQuickView} 
                                    view="list"
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center !mt-12 gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                            currentPage === i + 1 
                                            ? 'bg-[var(--primary)] text-white' 
                                            : 'bg-white border hover:bg-[var(--green-light)]'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className={`col-span-12 lg:col-span-3 ${isSidebarOpen ? "block" : "hidden"} lg:block lg:order-2 order-1`}>
                        <ShopSidebar />
                    </aside>
                </div>

                <QuickViewModal isOpen={isQuickViewOpen} onClose={closeQuickView} />
            </div>
        </main>
    );
}