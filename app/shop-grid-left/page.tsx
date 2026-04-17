// 'use client';
// import { useState } from 'react';
// import { Menu } from "lucide-react";
// import ShopSidebar from '@/components/sections/shop/ShopSidebar';
// import ShopHeader from '@/components/sections/shop/ShopHeader';
// import ProductCard from '@/components/ui/ProductCard';
// import QuickViewModal from '@/components/ui/QuickViewModal';
// import { shopProducts } from '@/lib/constants';

// export default function ProductLeftGridPage() {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 12;

//     const totalPages = Math.ceil(shopProducts.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentProducts = shopProducts.slice(indexOfFirstItem, indexOfLastItem);

//     const openQuickView = () => setIsQuickViewOpen(true);
//     const closeQuickView = () => setIsQuickViewOpen(false);

//     return (
//         <main className="w-full !overflow-x-hidden !mt-9">
//             <div className='max-w-[1600px] !mx-auto !px-4 sm:!px-6 lg:!px-10 !py-6'>
//                 <button
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                     className="flex items-center gap-2 !px-4 !py-2 mb-2 rounded border transition-all lg:hidden"
//                     style={{ borderColor: "var(--border-color)" }}
//                 >
//                     <Menu size={18} style={{ color: "var(--primary)" }} />
//                 </button>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
//                     {/* Sidebar */}
//                     <aside className={`col-span-12 lg:col-span-3 ${isSidebarOpen ? "block" : "hidden"} lg:block order-1`}>
//                         <ShopSidebar />
//                     </aside>

//                     {/* Main Content */}
//                     <div className={`col-span-12 ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"} order-2`}>
//                         <ShopHeader totalItems={shopProducts.length} />

//                         {/* Product Grid */}
//                         <div className={`grid grid-cols-1 sm:grid-cols-2 ${isSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-6`}>
//                             {currentProducts.map((product) => (
//                                 <ProductCard 
//                                     key={product.id} 
//                                     product={product} 
//                                     onQuickView={openQuickView} 
//                                 />
//                             ))}
//                         </div>

//                         {/* Pagination */}
//                         {totalPages > 1 && (
//                             <div className="flex justify-center !mt-12 gap-2">
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

// import { useState, useEffect, useMemo } from 'react';
// import { Menu } from "lucide-react";
// import ShopSidebar from '@/components/sections/shop/ShopSidebar';
// import ShopHeader from '@/components/sections/shop/ShopHeader';
// import ProductCard from '@/components/ui/ProductCard';
// import QuickViewModal from '@/components/ui/QuickViewModal';
// import { useProductStore } from '../../store/useProductStore'; // ✅ Import your store

// export default function ProductLeftGridPage() {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
    
//     // ✅ 1. Add View & Filter states
//     const [view, setView] = useState<'grid' | 'list'>('grid'); 
//     const [sortOption, setSortOption] = useState('Release Date');
//     const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);

//     const itemsPerPage = view === 'grid' ? 12 : 6;
    
//     // ✅ 2. Get API Data from Store
//     const { products, isLoading, fetchProducts } = useProductStore();

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     // ✅ 3. Filtering & Sorting Logic
//     const filteredAndSortedProducts = useMemo(() => {
//         let items = [...products];

//         // Filter by Price
//         items = items.filter(product => {
//             const price = product.discountPrice || product.price || 0;
//             return price >= priceRange[0] && price <= priceRange[1];
//         });

//         // Sort
//         items.sort((a, b) => {
//             const priceA = a.discountPrice || a.price || 0;
//             const priceB = b.discountPrice || b.price || 0;
//             switch (sortOption) {
//                 case 'Price: Low to High': return priceA - priceB;
//                 case 'Price: High to Low': return priceB - priceA;
//                 case 'Avg. Rating': return (b.rating || 0) - (a.rating || 0);
//                 default: return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
//             }
//         });
//         return items;
//     }, [products, sortOption, priceRange]);

//     // Pagination
//     const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
//     const currentProducts = filteredAndSortedProducts.slice(
//         (currentPage - 1) * itemsPerPage, 
//         currentPage * itemsPerPage
//     );

//     const openQuickView = () => setIsQuickViewOpen(true);
//     const closeQuickView = () => setIsQuickViewOpen(false);

//     return (
//         <main className="w-full !overflow-x-hidden !mt-9">
//             <div className='max-w-[1600px] !mx-auto !px-4 sm:!px-6 lg:!px-10 !py-6'>
//                 <button
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                     className="flex items-center gap-2 !px-4 !py-2 mb-2 rounded border transition-all lg:hidden"
//                     style={{ borderColor: "var(--border-color)" }}
//                 >
//                     <Menu size={18} style={{ color: "var(--primary)" }} />
//                 </button>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
//                     {/* Sidebar */}
//                     <aside className={`col-span-12 lg:col-span-3 ${isSidebarOpen ? "block" : "hidden"} lg:block order-1`}>
//                         <ShopSidebar priceRange={priceRange} setPriceRange={setPriceRange} />
//                     </aside>

//                     {/* Main Content */}
//                     <div className={`col-span-12 ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"} order-2`}>
                        
//                         {/* ✅ 4. Connect ShopHeader to View State */}
//                         <ShopHeader 
//                             totalItems={filteredAndSortedProducts.length} 
//                             view={view}
//                             setView={setView} 
//                             sortSelected={sortOption}
//                             setSortSelected={setSortOption}
//                         />

//                         {isLoading ? (
//                             <div className="text-center py-20">Loading products...</div>
//                         ) : (
//                             /* ✅ 5. DYNAMIC CONTAINER: Grid vs List */
//                             <div className={
//                                 view === 'grid' 
//                                 ? `grid grid-cols-1 sm:grid-cols-2 ${isSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-6`
//                                 : `flex flex-col gap-6`
//                             }>
//                                 {currentProducts.map((product) => (
//                                     <ProductCard 
//                                         key={product._id} 
//                                         product={product} 
//                                         onQuickView={openQuickView} 
//                                         view={view} // ✅ Passes grid or list
//                                     />
//                                 ))}
//                             </div>
//                         )}

//                         {/* Pagination */}
//                         {totalPages > 1 && (
//                             <div className="flex justify-center !mt-12 gap-2">
//                                 {[...Array(totalPages)].map((_, i) => (
//                                     <button
//                                         key={i}
//                                         onClick={() => setCurrentPage(i + 1)}
//                                         className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
//                                             currentPage === i + 1 ? 'bg-[#3BB77E] text-white' : 'bg-white border'
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

// import { useState, useEffect, useMemo } from 'react';
// import { Menu } from "lucide-react";
// import ShopSidebar from '@/components/sections/shop/ShopSidebar';
// import ShopHeader from '@/components/sections/shop/ShopHeader';
// import ProductCard from '@/components/ui/ProductCard';
// import QuickViewModal from '@/components/ui/QuickViewModal';
// import { useProductStore } from '../../store/useProductStore';
// import { useCategoryStore } from '../../store/useCategoryStore'; // ✅ Added Import

// export default function ProductLeftGridPage() {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
    
//     const [view, setView] = useState<'grid' | 'list'>('grid'); 
//     const [sortOption, setSortOption] = useState('Release Date');
//     const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);

//     // ✅ 1. Add Category State
//     const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

//     const itemsPerPage = view === 'grid' ? 12 : 6;
    
//     const { products, isLoading, fetchProducts } = useProductStore();
//     // ✅ 2. Get Categories from Store
//     const { categories, fetchCategories } = useCategoryStore();

//     useEffect(() => {
//         fetchProducts();
//         fetchCategories(); // ✅ 3. Fetch categories on mount
//     }, []);

//     // ✅ 4. Updated Filtering & Sorting Logic
//     const filteredAndSortedProducts = useMemo(() => {
//         let items = [...products];

//         // Filter by Category
//         if (selectedCategoryId) {
//             items = items.filter(product => product.categoryId === selectedCategoryId);
//         }

//         // Filter by Price
//         items = items.filter(product => {
//             const price = product.discountPrice || product.price || 0;
//             return price >= priceRange[0] && price <= priceRange[1];
//         });

//         // Sort
//         items.sort((a, b) => {
//             const priceA = a.discountPrice || a.price || 0;
//             const priceB = b.discountPrice || b.price || 0;
//             switch (sortOption) {
//                 case 'Price: Low to High': return priceA - priceB;
//                 case 'Price: High to Low': return priceB - priceA;
//                 case 'Avg. Rating': return (b.rating || 0) - (a.rating || 0);
//                 default: return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
//             }
//         });
//         return items;
//     }, [products, sortOption, priceRange, selectedCategoryId]);

//     // Pagination
//     const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
//     const currentProducts = filteredAndSortedProducts.slice(
//         (currentPage - 1) * itemsPerPage, 
//         currentPage * itemsPerPage
//     );

//     const openQuickView = () => setIsQuickViewOpen(true);
//     const closeQuickView = () => setIsQuickViewOpen(false);

//     return (
//         <main className="w-full !overflow-x-hidden !mt-9">
//             <div className='max-w-[1600px] !mx-auto !px-4 sm:!px-6 lg:!px-10 !py-6'>
//                 <button
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                     className="flex items-center gap-2 !px-4 !py-2 mb-2 rounded border transition-all lg:hidden"
//                     style={{ borderColor: "var(--border-color)" }}
//                 >
//                     <Menu size={18} style={{ color: "var(--primary)" }} />
//                 </button>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
//                     {/* Sidebar */}
//                     <aside className={`col-span-12 lg:col-span-3 ${isSidebarOpen ? "block" : "hidden"} lg:block order-1`}>
//                         {/* ✅ 5. PASS ALL PROPS TO SIDEBAR */}
//                         <ShopSidebar 
//                             priceRange={priceRange} 
//                             setPriceRange={setPriceRange} 
//                             categories={categories}
//                             selectedCategoryId={selectedCategoryId}
//                             onCategoryChange={(id) => {
//                                 setSelectedCategoryId(id);
//                                 setCurrentPage(1); // Reset page on filter
//                             }}
//                         />
//                     </aside>

//                     {/* Main Content */}
//                     <div className={`col-span-12 ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"} order-2`}>
                        
//                         <ShopHeader 
//                             totalItems={filteredAndSortedProducts.length} 
//                             view={view}
//                             setView={setView} 
//                             sortSelected={sortOption}
//                             setSortSelected={setSortOption}
//                         />

//                         {isLoading ? (
//                             <div className="text-center py-20">Loading products...</div>
//                         ) : filteredAndSortedProducts.length === 0 ? (
//                             <div className="text-center py-20">
//                                 <p className="text-lg">No products found matching your selection.</p>
//                                 <button 
//                                     onClick={() => {setSelectedCategoryId(null); setPriceRange([0, 2000]);}}
//                                     className="text-[#3BB77E] font-bold underline mt-2"
//                                 >
//                                     Clear Filters
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className={
//                                 view === 'grid' 
//                                 ? `grid grid-cols-1 sm:grid-cols-2 ${isSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-6`
//                                 : `flex flex-col gap-6`
//                             }>
//                                 {currentProducts.map((product) => (
//                                     <ProductCard 
//                                         key={product._id} 
//                                         product={product} 
//                                         onQuickView={openQuickView} 
//                                         view={view}
//                                     />
//                                 ))}
//                             </div>
//                         )}

//                         {/* Pagination */}
//                         {totalPages > 1 && (
//                             <div className="flex justify-center !mt-12 gap-2">
//                                 {[...Array(totalPages)].map((_, i) => (
//                                     <button
//                                         key={i}
//                                         onClick={() => setCurrentPage(i + 1)}
//                                         className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
//                                             currentPage === i + 1 ? 'bg-[#3BB77E] text-white' : 'bg-white border'
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

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Menu } from "lucide-react";
import ShopSidebar from '@/components/sections/shop/ShopSidebar';
import ShopHeader from '@/components/sections/shop/ShopHeader';
import ProductCard from '@/components/ui/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { useProductStore } from '../../store/useProductStore';
import { useCategoryStore } from '../../store/useCategoryStore';

export default function ProductLeftGridPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    
    const [view, setView] = useState<'grid' | 'list'>('grid'); 
    const [sortOption, setSortOption] = useState('Release Date');
    const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const itemsPerPage = view === 'grid' ? 12 : 6;
    
    const { products, isLoading, fetchProducts } = useProductStore();
    const { categories, fetchCategories } = useCategoryStore();

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // ✅ ROBUST FILTERING LOGIC
    const filteredAndSortedProducts = useMemo(() => {
        let items = [...products];

        // 1. Filter by Category
        if (selectedCategoryId) {
            items = items.filter(product => {
                // Get the category ID from the product (could be in categoryId, mainCategoryId, or category)
                const rawId = product.categoryId || (product as any).mainCategoryId || (product as any).category;
                
                if (!rawId) return false;

                // Handle if the rawId is an object { _id: '...' } or just a string/ObjectId
                const productCatId = typeof rawId === 'object' ? rawId?._id : rawId;
                
                // ✅ FORCE STRING COMPARISON (Important for MongoDB ObjectIds)
                return String(productCatId) === String(selectedCategoryId);
            });
        }

        // 2. Filter by Price
        items = items.filter(product => {
            const price = product.discountPrice || product.price || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // 3. Sort Logic
        items.sort((a, b) => {
            const priceA = a.discountPrice || a.price || 0;
            const priceB = b.discountPrice || b.price || 0;
            switch (sortOption) {
                case 'Price: Low to High': return priceA - priceB;
                case 'Price: High to Low': return priceB - priceA;
                default: return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            }
        });
        return items;
    }, [products, sortOption, priceRange, selectedCategoryId]);

    const currentProducts = filteredAndSortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

    return (
        <main className="w-full !overflow-x-hidden !mt-9">
            <div className='max-w-[1600px] !mx-auto !px-4 sm:!px-6 lg:!px-10 !py-6'>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
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
                            view={view} setView={setView} 
                            sortSelected={sortOption} setSortSelected={setSortOption}
                        />

                        {isLoading ? (
                            <div className="text-center py-20">Loading...</div>
                        ) : filteredAndSortedProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-lg">No products found in this category.</p>
                                <button onClick={() => setSelectedCategoryId(null)} className="text-[#3BB77E] underline font-bold">Show all products</button>
                            </div>
                        ) : (
                            <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
                                {currentProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} onQuickView={() => setIsQuickViewOpen(true)} view={view} />
                                ))}
                            </div>
                        )}
                        {/* Pagination controls here... */}
                    </div>
                </div>
                <QuickViewModal isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
            </div>
        </main>
    );
}