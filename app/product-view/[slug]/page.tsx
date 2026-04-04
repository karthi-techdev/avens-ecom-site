'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductGallery from '@/components/sections/product/ProductGallery';
import ProductInfo from '@/components/sections/product/ProductInfo';
import ProductTabs from '@/components/sections/product/ProductTabs';
import ShopSidebar from '@/components/sections/shop/ShopSidebar';
import ProductCard from '@/components/ui/ProductCard';
import { shopProducts } from '@/lib/constants';

export default function ProductPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Static Related Products (First 4 products from your constants)
    const relatedProducts = shopProducts.slice(0, 4);

    useEffect(() => {
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
                console.error("ERROR:", err);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    if (loading) {
        return <p className="text-center mt-20 text-xl">Loading...</p>;
    }

    if (!product) {
        return <p className="text-center mt-20 text-xl">Product not found</p>;
    }

    const galleryImages = [
        `http://localhost:5000${product.thumbnail}`,
        ...(product.images || []).map((img: string) => `http://localhost:5000${img}`)
    ];

    return (
        <main className="w-full overflow-x-hidden">
            {/* Breadcrumb */}
            <div className="bg-[var(--bg-light)] py-6 mb-10">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-10 flex gap-2 text-sm">
                    <span className="text-green-600 font-bold">Home</span>
                    <span>/</span>
                    <span className="text-green-600 font-bold">
                        {product?.mainCategoryId?.name || "Category"}
                    </span>
                    <span>/</span>
                    <span>{product.name}</span>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* LEFT CONTENT */}
                    <div className="col-span-12 lg:col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <ProductGallery images={galleryImages} />
                            <ProductInfo product={product} />
                        </div>

                        <ProductTabs description={product.longDescription} />

                        {/*  STATIC RELATED PRODUCTS SECTION ADDED HERE */}
                        <div className="mt-16 mb-20">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-[var(--text-main)]">Related Products</h2>
                                <div className="flex-1 h-[1px] bg-[var(--border-color)] ml-8"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map(item => (
                                    <ProductCard key={item.id} product={item} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <ShopSidebar />
                    </aside>
                </div>
            </div>
        </main>
    );
}