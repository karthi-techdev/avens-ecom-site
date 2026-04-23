// 'use client';

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import ProductGallery from '@/components/sections/product/ProductGallery';
// import ProductInfo from '@/components/sections/product/ProductInfo';
// import ProductTabs from '@/components/sections/product/ProductTabs';
// import ShopSidebar from '@/components/sections/shop/ShopSidebar';
// import ProductCard from '@/components/ui/ProductCard';
// import { shopProducts } from '@/lib/constants';

// export default function ProductPage() {
//     const params = useParams();
//     const slug = params?.slug as string;

//     const [product, setProduct] = useState<any>(null);
//     const [loading, setLoading] = useState(true);

//     // Static Related Products (First 4 products from your constants)
//     const relatedProducts = shopProducts.slice(0, 4);

//     useEffect(() => {
//         if (!slug) return;

//         const fetchProduct = async () => {
//             try {
//                 const res = await fetch(
//                     `http://localhost:5000/api/v1/admin/products/getProductBySlug/${slug}`
//                 );
//                 const data = await res.json();

//                 if (data?.data) {
//                     setProduct(data.data);
//                 } else {
//                     setProduct(null);
//                 }
//             } catch (err) {
//                 console.error("ERROR:", err);
//                 setProduct(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [slug]);

//     if (loading) {
//         return <p className="text-center mt-20 text-xl">Loading...</p>;
//     }

//     if (!product) {
//         return <p className="text-center mt-20 text-xl">Product not found</p>;
//     }

//     const galleryImages = [
//         `http://localhost:5000${product.thumbnail}`,
//         ...(product.images || []).map((img: string) => `http://localhost:5000${img}`)
//     ];

//     return (
//         <main className="w-full overflow-x-hidden">
//             {/* Breadcrumb */}
//             <div className="bg-[var(--bg-light)] py-6 mb-10">
//                 <div className="max-w-[1600px] mx-auto px-4 sm:px-10 flex gap-2 text-sm">
//                     <span className="text-green-600 font-bold">Home</span>
//                     <span>/</span>
//                     <span className="text-green-600 font-bold">
//                         {product?.mainCategoryId?.name || "Category"}
//                     </span>
//                     <span>/</span>
//                     <span>{product.name}</span>
//                 </div>
//             </div>

//             <div className="max-w-[1600px] mx-auto px-4 sm:px-10">
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

//                     {/* LEFT CONTENT */}
//                     <div className="col-span-12 lg:col-span-9">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                             <ProductGallery images={galleryImages} />
//                             <ProductInfo product={product} />
//                         </div>

//                         <ProductTabs
//                             description={product.longDescription}
//                             product={product}
//                         />

//                         {/*  STATIC RELATED PRODUCTS SECTION ADDED HERE */}
//                         <div className="mt-16 mb-20">
//                             <div className="flex items-center justify-between mb-8">
//                                 <h2 className="text-2xl font-bold text-[var(--text-main)]">Related Products</h2>
//                                 <div className="flex-1 h-[1px] bg-[var(--border-color)] ml-8"></div>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                                 {relatedProducts.map(item => (
//                                     <ProductCard key={item.id} product={item} />
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT SIDEBAR */}
//                     <aside className="hidden lg:block lg:col-span-3">
//                         <ShopSidebar />
//                     </aside>
//                 </div>
//             </div>
//         </main>
//     );
// }

'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductGallery from '@/components/sections/product/ProductGallery';
import ProductInfo from '@/components/sections/product/ProductInfo';
import ProductTabs from '@/components/sections/product/ProductTabs';
import ShopSidebar from '@/components/sections/shop/ShopSidebar';
import ProductCard from '@/components/ui/ProductCard';
import { shopProducts } from '@/lib/constants'; // Using your existing constants for related products
import { useCategoryStore } from "@/store/useCategoryStore";

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Get categories from store to populate the sidebar
    const { categories, fetchCategories } = useCategoryStore();

    // Static Related Products (First 4 products from your constants)
    const relatedProducts = shopProducts.slice(0, 4);

    useEffect(() => {
        // Fetch categories for the sidebar
        fetchCategories();

        if (!slug) return;

        const fetchProduct = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/v1/admin/products/getProductBySlug/${slug}`
                );
                const data = await res.json();

                if (data?.data) {
                    setProduct(data.data);
                } else {
                    setProduct(null);
                }
            } catch (err) {
                console.error("ERROR FETCHING PRODUCT:", err);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug, fetchCategories]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3BB77E]"></div>
                <p className="mt-4 text-xl text-gray-500">Loading product details...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center mt-20">
                <p className="text-2xl font-bold text-gray-700">Product not found</p>
                <button 
                    onClick={() => router.push('/product-list')}
                    className="mt-4 text-[#3BB77E] underline"
                >
                    Back to Shop
                </button>
            </div>
        );
    }

    const galleryImages = [
        `http://localhost:5000${product.thumbnail}`,
        ...(product.images || []).map((img: string) => `http://localhost:5000${img}`)
    ];

    return (
        <main className="w-full overflow-x-hidden">
            {/* --- Breadcrumb Section --- */}
            <div className="bg-[#F7F8F9] py-6 mb-10 border-b border-gray-100">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-10 flex items-center gap-2 text-sm">
                    <span 
                        className="text-[#3BB77E] font-bold cursor-pointer hover:underline"
                        onClick={() => router.push('/')}
                    >
                        Home
                    </span>
                    <span className="text-gray-400">/</span>
                    <span 
                        className="text-[#3BB77E] font-bold cursor-pointer hover:underline"
                        onClick={() => router.push('/product-list')}
                    >
                        {product?.mainCategoryId?.name || product?.categoryId?.name || "Shop"}
                    </span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-500">{product.name}</span>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* --- LEFT CONTENT (Product Details) --- */}
                    <div className="col-span-12 lg:col-span-9">
                        {/* Image Gallery and Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                            <ProductGallery images={galleryImages} />
                            <ProductInfo product={product} />
                        </div>

                        {/* Description and Review Tabs */}
                        <ProductTabs
                            description={product.longDescription}
                            product={product}
                        />

                        {/* Related Products Section */}
                        <div className="mt-16 mb-20">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-[#253D4E]">Related Products</h2>
                                <div className="flex-1 h-[1px] bg-gray-200 ml-8"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map(item => (
                                    <ProductCard key={item.id} product={item} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT SIDEBAR --- */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <ShopSidebar 
                            priceRange={[0, 2000]} // Default safe values
                            setPriceRange={() => {}} // No-op for detail page
                            categories={categories}
                            selectedCategoryId={product?.mainCategoryId?._id || product?.categoryId?._id}
                            onCategoryChange={(id) => {
                                // Navigate back to shop with the selected category filter
                                router.push(`/product-list?category=${id}`);
                            }}
                        />
                    </aside>
                </div>
            </div>
        </main>
    );
}