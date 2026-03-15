'use client';
import { ChevronRight } from "lucide-react";
import ShopSidebar from '@/components/sections/shop/ShopSidebar';
import ProductGallery from '@/components/sections/product/ProductGallery';
import ProductInfo from '@/components/sections/product/ProductInfo';
import ProductTabs from '@/components/sections/product/ProductTabs';
import ProductCard from '@/components/ui/ProductCard';
import { shopProducts, type ShopProduct } from '@/lib/constants';

// Assume we're viewing the first product if none specified
const currentProduct: ShopProduct = shopProducts[0];
const relatedProducts: ShopProduct[] = shopProducts.slice(1, 5);

const galleryImages = [
    currentProduct.img1,
    currentProduct.img2 || currentProduct.img1,
    "/product-view/product3.jpg",
    "/product-view/product4.jpg",
    "/product-view/product5.jpg",
];

export default function ProductViewPage() {
    return (
        <main className="w-full !overflow-x-hidden">
            {/* Breadcrumb */}
            <div className="bg-[var(--bg-light)] !py-6 !mb-10">
                <div className="max-w-[1600px] !mx-auto !px-4 sm:!px-10 flex items-center gap-2 text-sm">
                    <a href="/" className="text-[var(--primary)] font-bold">Home</a>
                    <ChevronRight size={14} className="text-[var(--border-color)]" />
                    <a href="/shop-grid-left" className="text-[var(--primary)] font-bold">{currentProduct.category}</a>
                    <ChevronRight size={14} className="text-[var(--border-color)]" />
                    <span className="text-[var(--text-muted)]">{currentProduct.name}</span>
                </div>
            </div>

            <div className="max-w-[1600px] !mx-auto !px-4 sm:!px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <ShopSidebar />
                    </aside>

                    {/* Main Content */}
                    <div className="col-span-12 lg:col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <ProductGallery images={galleryImages} />
                            <ProductInfo product={currentProduct} />
                        </div>

                        <ProductTabs 
                            description={currentProduct.description}
                        />

                        {/* Related Products */}
                        <div className="!mt-16 !mb-20">
                            <div className="flex items-center justify-between !mb-8">
                                <h2 className="text-2xl font-bold text-[var(--text-main)]">Related Products</h2>
                                <div className="flex-1 !h-[1px] bg-[var(--border-color)] !ml-8"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}