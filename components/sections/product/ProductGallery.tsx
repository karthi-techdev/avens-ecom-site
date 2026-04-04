'use client';
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

interface ProductGalleryProps {
    images: string[];
    productName?: string;
}

const ProductGallery = ({ images, productName = "Product" }: ProductGalleryProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <div className="flex flex-col gap-6 w-full h-full">
            {/* 1. BIG IMAGE SECTION */}
            <div className="relative flex-grow flex flex-col justify-center rounded-2xl border border-gray-100 bg-white p-4 min-h-[500px] md:min-h-[600px]">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F2F3F4] flex items-center justify-center">
                    <Swiper
                        spaceBetween={10}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[FreeMode, Thumbs]}
                        className="w-full h-full"
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full h-full flex items-center justify-center p-6">
                                    <img
                                        src={img}
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* 2. THUMBNAIL SECTION */}
            <div className="relative group px-10 w-full">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={12}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    navigation={{
                        prevEl: ".thumb-prev",
                        nextEl: ".thumb-next",
                    }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="w-full"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index} className="cursor-pointer">
                            <div className="aspect-square rounded-xl overflow-hidden border-2 border-transparent bg-[#F2F3F4] p-2 transition-all swiper-slide-thumb-active:border-[#3bb77e]">
                                <img
                                    src={img}
                                    alt={`Thumb ${index + 1}`}
                                    className="object-contain w-full h-full mix-blend-multiply"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button className="thumb-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-[#3bb77e] hover:text-white transition-all">
                    <ChevronLeft size={16} />
                </button>
                <button className="thumb-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-[#3bb77e] hover:text-white transition-all">
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* 3. SHARE THIS SECTION - Positioned right below thumbnails */}
            <div className="flex items-center gap-3 text-sm text-gray-400 px-2 mt-2">
                <span className="font-medium">Share this:</span>
                <div className="flex gap-4 items-center">
                    <Link href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" className="hover:text-blue-600 transition-colors">
                        <Facebook size={16} />
                    </Link>
                    <Link href={`https://twitter.com/intent/tweet?url=${currentUrl}`} target="_blank" className="hover:text-sky-400 transition-colors">
                        <Twitter size={16} />
                    </Link>
                    <Link href="https://www.instagram.com" target="_blank" className="hover:text-pink-600 transition-colors">
                        <Instagram size={16} />
                    </Link>
                    {/* WhatsApp Icon */}
                    <Link href={`https://api.whatsapp.com/send?text=${encodeURIComponent(productName + " " + currentUrl)}`} target="_blank" className="hover:text-green-500 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;