'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import ProductGallery from '@/components/sections/product/ProductGallery';
import ProductInfo from '@/components/sections/product/ProductInfo';
import ProductTabs from '@/components/sections/product/ProductTabs';
import ShopSidebar from '@/components/sections/shop/ShopSidebar';
import ProductCard from '@/components/ui/ProductCard';
import { useCategoryStore } from "@/store/useCategoryStore";
import { useProductStore } from "@/store/useProductStore";

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    // Local States
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);

    // Store Actions
    const { categories, fetchCategories } = useCategoryStore();
    const { products, fetchProducts } = useProductStore();

    // 1. Initial Data Fetching (Global Stores)
    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [fetchCategories, fetchProducts]);

    // 2. Fetch Specific Product by Slug
    useEffect(() => {
        if (!slug) return;

        const fetchProductBySlug = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `http://localhost:5000/api/v1/admin/products/getProductBySlug/${slug}`
                );
                const data = await res.json();
                setProduct(data?.data || null);
            } catch (err) {
                console.error("ERROR FETCHING PRODUCT:", err);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProductBySlug();
    }, [slug]);

    // 3. Related Products Logic
    const relatedProducts = useMemo(() => {
        if (!products || !product) return [];
        
        return products
            .filter((p: any) => 
                p.slug !== slug && 
                (p.mainCategoryId === product.mainCategoryId?._id || p.categoryId === product.categoryId?._id)
            )
            .slice(0, 4);
    }, [products, product, slug]);

    // 4. Loading & Error States
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

    // Prepare Gallery Images
    const galleryImages = [
        product.thumbnail?.startsWith('http') ? product.thumbnail : `http://localhost:5000${product.thumbnail}`,
        ...(product.images || []).map((img: string) => img.startsWith('http') ? img : `http://localhost:5000${img}`)
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
                    <span className="text-gray-500 truncate max-w-[200px] sm:max-w-none">{product.name}</span>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* --- LEFT CONTENT (Product Details) --- */}
                    <div className="col-span-12 lg:col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                            <ProductGallery images={galleryImages} />
                            <ProductInfo product={product} />
                        </div>

                        {/* Description and Review Tabs */}
                        <ProductTabs
                            description={product.longDescription || product.description}
                            product={product}
                        />

                        {/* Related Products Section */}
                        {relatedProducts.length > 0 && (
                            <div className="mt-16 mb-20">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-[#253D4E]">Related Products</h2>
                                    <div className="flex-1 h-[1px] bg-gray-200 ml-8"></div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {relatedProducts.map((item: any) => (
                                        <ProductCard key={item._id} product={item} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- RIGHT SIDEBAR --- */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <ShopSidebar 
                            priceRange={priceRange} 
                            setPriceRange={setPriceRange} 
                            categories={categories}
                            selectedCategoryId={null}
                            onCategoryChange={(slug) => {
                                // Navigate back to shop with the selected category slug
                                if(slug) router.push(`/product-list?category=${slug}`);
                            }}
                        />
                    </aside>

                </div>
            </div>
        </main>
    );
}