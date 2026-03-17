'use client';
import { useState } from "react";
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

interface ProductGalleryProps {
    images: string[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--border-color)] bg-white group">
                <Swiper
                    spaceBetween={10}
                    navigation={{
                        prevEl: ".gallery-prev",
                        nextEl: ".gallery-next",
                    }}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="h-full w-full"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative h-full w-full flex items-center justify-center p-8">
                                <Image
                                    src={img}
                                    alt={`Product ${index + 1}`}
                                    width={600}
                                    height={800}
                                    className="object-contain max-h-full transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                
                <button className="gallery-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--primary)] hover:text-white transition-all opacity-0 group-hover:opacity-100">
                    <ChevronLeft size={20} />
                </button>
                <button className="gallery-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--primary)] hover:text-white transition-all opacity-0 group-hover:opacity-100">
                    <ChevronRight size={20} />
                </button>
            </div>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={12}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="w-full"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index} className="cursor-pointer">
                        <div className="aspect-square rounded-lg overflow-hidden border-2 transition-all border-transparent bg-white p-2 gallery-thumb-inner">
                            <Image
                                src={img}
                                alt={`Thumb ${index + 1}`}
                                width={100}
                                height={100}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductGallery;
