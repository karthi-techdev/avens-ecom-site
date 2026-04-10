// 'use client';
// import { useState } from 'react';
// import { Menu } from "lucide-react";
// import ShopSidebar from '@/components/sections/shop/ShopSidebar';
// import ShopHeader from '@/components/sections/shop/ShopHeader';
// import ProductCard from '@/components/ui/ProductCard';
// import QuickViewModal from '@/components/ui/QuickViewModal';
// import { shopProducts } from '@/lib/constants';

// export default function ProductLeftListPage() {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 6;

//     const totalPages = Math.ceil(shopProducts.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentProducts = shopProducts.slice(indexOfFirstItem, indexOfLastItem);

//     const openQuickView = () => setIsQuickViewOpen(true);
//     const closeQuickView = () => setIsQuickViewOpen(false);

//     return (
//         <main className="w-full overflow-x-hidden mt-9">
//             <div className='max-w-400 mx-auto px-4 sm:px-6 lg:px-10 py-6'>
//                 <button
//                     onClick={() => setIsSidebarOpen(isSidebarOpen)}
//                     className="flex items-center gap-2 px-4 py-2 mb-2 rounded border transition-all lg:hidden"
//                     style={{ borderColor: "var(--border-color)" }}
//                 >
//                     <Menu size={18} style={{ color: "var(--primary)" }} />
//                 </button>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
//                     {/* Sidebar */}
//                     <aside className={`col-span-12 lg:col-span-3 ${isSidebarOpen ? "block" : "hidden"} lg:block`}>
//                         <ShopSidebar />
//                     </aside>

//                     {/* Main Content */}
//                     <div className={`col-span-12 ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"}`}>
//                         <ShopHeader totalItems={shopProducts.length} />

//                         {/* Product List */}
//                         <div className="flex flex-col gap-6">
//                             {currentProducts.map((product) => (
//                                 <ProductCard 
//                                     key={product.id} 
//                                     product={product} 
//                                     onQuickView={openQuickView} 
//                                     view="list"
//                                 />
//                             ))}
//                         </div>

//                         {/* Pagination */}
//                         {totalPages > 1 && (
//                             <div className="flex justify-center mt-12 gap-2">
//                                 {[...Array(totalPages)].map((_, i) => (
//                                     <button
//                                         key={i}
//                                         onClick={() => setCurrentPage(i + 1)}
//                                         className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
//                                             currentPage === i + 1 
//                                             ? 'bg-[var(--primary)] text-white' 
//                                             : 'bg-white border hover:bg-[var(--green-light)]'
//                                         }`}
//                                     >
//                                         {i + 1}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <QuickViewModal isOpen={isQuickViewOpen} onClose={closeQuickView} />
//             </div>
//         </main>
//     );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { Menu } from "lucide-react";

// import ShopSidebar from '@/components/sections/shop/ShopSidebar';
// import ShopHeader from '@/components/sections/shop/ShopHeader';
// import ProductCard from '@/components/ui/ProductCard';
// import QuickViewModal from '@/components/ui/QuickViewModal';

// import { useProductStore } from '../../store/useProductStore';

// export default function ProductLeftListPage() {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);

//     const itemsPerPage = 6;

//     // ✅ Zustand Store
//     const { products, isLoading, fetchProducts } = useProductStore();
//     console.log("products",products)
//     // ✅ Fetch API on load
//     useEffect(() => {
//         console.log("hello")
//         fetchProducts();
//         console.log("hello")
//     }, []);

//     // ✅ Pagination logic
//     const totalPages = Math.ceil(products.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

//     // ✅ Quick View handlers
//     const openQuickView = () => setIsQuickViewOpen(true);
//     const closeQuickView = () => setIsQuickViewOpen(false);

//     return (
//         <main className="w-full overflow-x-hidden mt-9">
//             <div className='max-w-400 mx-auto px-4 sm:px-6 lg:px-10 py-6'>

//                 {/* Mobile Sidebar Toggle */}
//                 <button
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                     className="flex items-center gap-2 px-4 py-2 mb-2 rounded border transition-all lg:hidden"
//                     style={{ borderColor: "var(--border-color)" }}
//                 >
//                     <Menu size={18} style={{ color: "var(--primary)" }} />
//                 </button>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">

//                     {/* Sidebar */}
//                     <aside className={`col-span-12 lg:col-span-3 ${isSidebarOpen ? "block" : "hidden"} lg:block`}>
//                         <ShopSidebar />
//                     </aside>

//                     {/* Main Content */}
//                     <div className={`col-span-12 ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"}`}>

//                         {/* Header */}
//                         <ShopHeader totalItems={products.length} />

//                         {/* Product List */}
//                         {isLoading ? (
//                             <p className="text-center py-10 text-lg">Loading products...</p>
//                         ) : products.length === 0 ? (
//                             <p className="text-center py-10 text-lg">No products found</p>
//                         ) : (
//                             <div className="flex flex-col gap-6">
//                                 {products.map((product) => (
//                                     <ProductCard
//                                         key={product._id}
//                                         product={product}
//                                         onQuickView={openQuickView}
//                                         view="list"
//                                     />
//                                 ))}
//                             </div>
//                         )}

//                         {/* Pagination */}
//                         {totalPages > 1 && (
//                             <div className="flex justify-center mt-12 gap-2">
//                                 {[...Array(totalPages)].map((_, i) => (
//                                     <button
//                                         key={i}
//                                         onClick={() => setCurrentPage(i + 1)}
//                                         className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
//                                             currentPage === i + 1
//                                                 ? 'bg-[var(--primary)] text-white'
//                                                 : 'bg-white border hover:bg-[var(--green-light)]'
//                                         }`}
//                                     >
//                                         {i + 1}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}

//                     </div>
//                 </div>

//                 {/* Quick View Modal */}
//                 <QuickViewModal 
//                     isOpen={isQuickViewOpen} 
//                     onClose={closeQuickView} 
//                 />

//             </div>
//         </main>
//     );
// }

// 'use client';

// import { useState, useEffect, useMemo } from 'react';
// import { Menu } from "lucide-react";

// import ShopSidebar from '@/components/sections/shop/ShopSidebar';
// import ShopHeader from '@/components/sections/shop/ShopHeader';
// import ProductCard from '@/components/ui/ProductCard';
// import QuickViewModal from '@/components/ui/QuickViewModal';

// import { useProductStore } from '../../store/useProductStore';

// export default function ProductLeftListPage() {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
    
//     // ✅ Sorting State
//     const [sortOption, setSortOption] = useState('Release Date');

//     const itemsPerPage = 6;

//     // ✅ Zustand Store
//     const { products, isLoading, fetchProducts } = useProductStore();

//     // ✅ Fetch API on load
//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     // ✅ Sorting Logic
//     const sortedProducts = useMemo(() => {
//         let items = [...products]; // Create copy to avoid mutating store

//         items.sort((a, b) => {
//             const priceA = a.discountPrice || a.price || 0;
//             const priceB = b.discountPrice || b.price || 0;
//             const ratingA = a.rating || 0;
//             const ratingB = b.rating || 0;

//             switch (sortOption) {
//                 case 'Price: Low to High':
//                     return priceA - priceB;
//                 case 'Price: High to Low':
//                     return priceB - priceA;
//                 case 'Avg. Rating':
//                     return ratingB - ratingA;
//                 case 'Release Date':
//                     // Uses createdAt if available, otherwise fallback to ID or default
//                     return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
//                 default:
//                     return 0;
//             }
//         });
//         return items;
//     }, [products, sortOption]);

//     // ✅ Pagination logic (Using sortedProducts instead of products)
//     const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

//     // ✅ Quick View handlers
//     const openQuickView = () => setIsQuickViewOpen(true);
//     const closeQuickView = () => setIsQuickViewOpen(false);

//     return (
//         <main className="w-full overflow-x-hidden mt-9">
//             <div className='max-w-400 mx-auto px-4 sm:px-6 lg:px-10 py-6'>

//                 {/* Mobile Sidebar Toggle */}
//                 <button
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                     className="flex items-center gap-2 px-4 py-2 mb-2 rounded border transition-all lg:hidden"
//                     style={{ borderColor: "var(--border-color)" }}
//                 >
//                     <Menu size={18} style={{ color: "var(--primary)" }} />
//                 </button>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">

//                     {/* Sidebar */}
//                     <aside className={`col-span-12 lg:col-span-3 ${isSidebarOpen ? "block" : "hidden"} lg:block`}>
//                         <ShopSidebar />
//                     </aside>

//                     {/* Main Content */}
//                     <div className={`col-span-12 ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"}`}>

//                         {/* Header */}
//                         <ShopHeader 
//                             totalItems={products.length} 
//                             sortSelected={sortOption}
//                             setSortSelected={(val) => {
//                                 setSortOption(val);
//                                 setCurrentPage(1); // Reset to page 1 on sort
//                             }}
//                         />

//                         {/* Product List */}
//                         {isLoading ? (
//                             <p className="text-center py-10 text-lg">Loading products...</p>
//                         ) : sortedProducts.length === 0 ? (
//                             <p className="text-center py-10 text-lg">No products found</p>
//                         ) : (
//                             <div className="flex flex-col gap-6">
//                                 {currentProducts.map((product) => (
//                                     <ProductCard
//                                         key={product._id}
//                                         product={product}
//                                         onQuickView={openQuickView}
//                                         view="list"
//                                     />
//                                 ))}
//                             </div>
//                         )}

//                         {/* Pagination */}
//                         {totalPages > 1 && (
//                             <div className="flex justify-center mt-12 gap-2">
//                                 {[...Array(totalPages)].map((_, i) => (
//                                     <button
//                                         key={i}
//                                         onClick={() => setCurrentPage(i + 1)}
//                                         className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
//                                             currentPage === i + 1
//                                                 ? 'bg-[var(--primary)] text-white'
//                                                 : 'bg-white border hover:bg-[var(--green-light)]'
//                                         }`}
//                                     >
//                                         {i + 1}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}

//                     </div>
//                 </div>

//                 {/* Quick View Modal */}
//                 <QuickViewModal 
//                     isOpen={isQuickViewOpen} 
//                     onClose={closeQuickView} 
//                 />

//             </div>
//         </main>
//     );
// }

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Menu } from "lucide-react";
import ShopSidebar from '@/components/sections/shop/ShopSidebar';
import ShopHeader from '@/components/sections/shop/ShopHeader';
import ProductCard from '@/components/ui/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { useProductStore } from '../../store/useProductStore';

export default function ProductLeftListPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('Release Date');
    
    // ✅ 1. Add Price Range State with TypeScript Type
    const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

    const itemsPerPage = 6;
    const { products, isLoading, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, []);

    // ✅ 2. Filtering and Sorting logic combined
    const filteredAndSortedProducts = useMemo(() => {
        let items = [...products];

        // Filter by Price Range
        items = items.filter(product => {
            const price = product.discountPrice || product.price || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Sorting Logic
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
    }, [products, sortOption, priceRange]);

    // ✅ 3. Pagination logic
    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredAndSortedProducts.slice(indexOfFirstItem, indexOfLastItem);

    const openQuickView = () => setIsQuickViewOpen(true);
    const closeQuickView = () => setIsQuickViewOpen(false);

    return (
        <main className="w-full overflow-x-hidden mt-9">
            <div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6'>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="flex lg:hidden items-center gap-2 px-4 py-2 mb-4 rounded border"
                    style={{ borderColor: "var(--border-color)" }}
                >
                    <Menu size={18} style={{ color: "#3BB77E" }} />
                    <span className="text-sm font-bold uppercase">Filters</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                    <aside className={`col-span-12 lg:col-span-3 ${isSidebarOpen ? "block" : "hidden"} lg:block`}>
                        {/* ✅ 4. Pass props to Sidebar */}
                        <ShopSidebar 
                            priceRange={priceRange} 
                            setPriceRange={setPriceRange} 
                        />
                    </aside>

                    <div className={`col-span-12 ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"}`}>
                        <ShopHeader 
                            totalItems={filteredAndSortedProducts.length} 
                            sortSelected={sortOption}
                            setSortSelected={(val) => {
                                setSortOption(val);
                                setCurrentPage(1);
                            }}
                        />

                        {isLoading ? (
                            <p className="text-center py-20 text-lg">Loading products...</p>
                        ) : filteredAndSortedProducts.length === 0 ? (
                            <p className="text-center py-20 text-lg">No products found in this price range.</p>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {currentProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} onQuickView={openQuickView} view="list" />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-12 gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                            currentPage === i + 1 
                                            ? 'bg-[#3BB77E] text-white' 
                                            : 'bg-white border hover:bg-[#F7F8F9]'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <QuickViewModal isOpen={isQuickViewOpen} onClose={closeQuickView} />
            </div>
        </main>
    );
}