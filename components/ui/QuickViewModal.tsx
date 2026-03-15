'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Heart, Repeat, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';
import { PiLessThan, PiGreaterThan } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay, Zoom } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { productImages, colors, sizes } from '@/lib/constants';

interface QuickViewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const QuickViewModal = ({ isOpen, onClose }: QuickViewModalProps) => {
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("M");
    const [quantity, setQuantity] = useState(1);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
    const [activeThumbIndex, setActiveThumbIndex] = useState<number | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-[999] flex items-center justify-center bg-[#00000085]'>
            <div className='relative flex flex-col md:flex-row gap-6 bg-white w-[95%] max-w-[850px] max-h-[90vh] overflow-y-auto shadow-2xl !p-6 md:!p-4'>
                <div className='flex flex-col gap-4'>
                    <div className="relative h-[300px] sm:h-[350px] md:h-[28rem] w-full md:w-[24rem]">
                        <Swiper
                            modules={[Thumbs, Zoom, Autoplay]}
                            onSwiper={setMainSwiper}
                            thumbs={{
                                swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                            }}
                            zoom
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            speed={800}
                            className="h-full"
                        >
                            {productImages.map((img, index) => (
                                <SwiperSlide key={index} className="!h-full">
                                    <div className="swiper-zoom-container relative h-full w-full">
                                        <Image
                                            src={img.main}
                                            alt="product"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className='flex flex-col md:justify-center items-center'>
                        <div className="relative h-[130px] md:h-[80px] lg:h-[63px] w-full md:max-w-[22rem] !mt-4"
                            onMouseEnter={() => {
                                mainSwiper?.autoplay?.stop();
                                thumbsSwiper?.autoplay?.stop();
                            }}
                            onMouseLeave={() => {
                                mainSwiper?.autoplay?.start();
                                thumbsSwiper?.autoplay?.start();
                            }}
                        >
                            <Swiper
                                modules={[Navigation, Thumbs, Autoplay]}
                                onSwiper={setThumbsSwiper}
                                breakpoints={{
                                    0: { slidesPerView: 2 },
                                    640: { slidesPerView: 3 },
                                    768: { slidesPerView: 4 },
                                    1024: { slidesPerView: 5 },
                                }}
                                spaceBetween={4}
                                loop={true}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                speed={800}
                                navigation={{
                                    prevEl: ".custom-swiper-prev",
                                    nextEl: ".custom-swiper-next",
                                }}
                                watchSlidesProgress={true}
                                slideToClickedSlide={true}
                                onSlideChange={(swiper) => {
                                    const realIndex = swiper.realIndex;
                                    setActiveThumbIndex(realIndex);
                                    mainSwiper?.slideTo(realIndex);
                                }}
                                className="h-full"
                            >
                                {productImages.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            onClick={() => {
                                                setActiveThumbIndex(index);
                                                mainSwiper?.slideTo(index);
                                            }}
                                            className={`md:w-[63px] h-full w-full md:h-[63px] rounded overflow-hidden border transition-all duration-200 ${
                                                activeThumbIndex === index
                                                    ? "border-[var(--primary)]"
                                                    : "border-transparent"
                                            }`}
                                        >
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={img.thumb}
                                                    alt="thumb"
                                                    fill
                                                    className="object-cover cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="absolute top-[50%] md:top-[40] -left-5 -translate-y-1/2 z-10">
                                <button className="custom-swiper-prev text-[var(--text-muted)] text-[1.5rem] hover:text-[var(--primary)] duration-700 transition-all cursor-pointer">
                                    <PiLessThan />
                                </button>
                            </div>
                            <div className="absolute top-[50%] md:top-[40] -right-3 -translate-y-1/2 z-10">
                                <button className="custom-swiper-next text-[var(--text-muted)] text-[1.5rem] hover:text-[var(--primary)] duration-700 transition-all cursor-pointer">
                                    <PiGreaterThan />
                                </button>
                            </div>
                        </div>
                        <div className='text-left w-[100%]'>
                            <div className="!mt-4 text-left pt-4 flex flex-wrap">
                                <h3 className="text-sm font-medium text-[var(--text-muted)]">Share this :</h3>
                                <div className="flex items-center gap-2 !mx-4">
                                    <a href="#" className="hover:scale-110 transition-transform"><Facebook size={20} className="text-[var(--text-muted)]" /></a>
                                    <a href="#" className="hover:scale-110 transition-transform"><Twitter size={20} className="text-[var(--text-muted)]" /></a>
                                    <a href="#" className="hover:scale-110 transition-transform"><Instagram size={20} className="text-[var(--text-muted)]" /></a>
                                    <a href="#" className="hover:scale-110 transition-transform"><MessageCircle size={20} className="text-[var(--text-muted)]" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={onClose} className="absolute -top-1 md:top-4 right-1 md:right-6 text-2xl cursor-pointer text-gray-500 hover:text-black">✕</button>
                    <div className="!mt-3 !mb-2">
                        <h1 className="text-[1.7rem] font-semibold w-[100%] md:max-w-[20rem] !mb-2 !text-[var(--black)]">Colorful Pattern Shirts HD450</h1>
                        <div className="flex justify-between items-center !mb-2">
                            <p className="!mb-2 !mt-4 text-[var(--primary)] font-light"><span className="font-medium !mr-1 text-[var(--black)]">Brands:</span>Boostrap</p>
                            <div className="flex items-center !mt-2">
                                <div className="flex text-[var(--yellow)]">
                                    {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-current" />))}
                                </div>
                                <span className="text-sm !ml-2 text-[var(--text-muted)]">(25 reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 !mb-2 border-y py-4 border-[var(--border-color)]">
                        <span className="text-xl sm:text-3xl font-bold !m-2 text-[var(--primary)]">$120.00</span>
                        <span className="text-gray-500 line-through">$200.00</span>
                        <span className="text-sm text-[var(--black)] font-medium">25% Off</span>
                    </div>
                    <p className="text-[0.9rem] !mb-2 w-[100%] md:max-w-[24rem] leading-[1.2rem] text-[var(--foreground)]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi,!</p>
                    <div className="!mb-6 flex items-center gap-1">
                        <p className="text-sm font-semibold text-[var(--black)]">Color</p>
                        <div className="flex items-center gap-2">
                            {colors.map((color) => (
                                <button key={color} onClick={() => setSelectedColor(color)} className={`w-7 h-7 rounded-full border-2 transition-all duration-200 relative ${selectedColor === color ? "border-gray-100 scale-110" : "border-gray-100"}`} style={{ backgroundColor: color }}>
                                    {selectedColor === color && (<span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--primary)]"></span>)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="!mb-4 flex items-center gap-2">
                        <p className="text-sm font-semibold text-[var(--black)]">Size</p>
                        <div className="flex items-center gap-3">
                            {sizes.map((size) => (
                                <button key={size} onClick={() => setSelectedSize(size)} className="w-9 h-9 flex items-center justify-center text-sm font-medium border rounded transition-all duration-200" style={selectedSize === size ? { backgroundColor: "var(--primary)", color: "white", borderColor: "var(--primary)" } : { backgroundColor: "white", color: "var(--text-muted)", borderColor: "var(--border-color)" }}>{size}</button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-[2fr_2fr_1fr_1fr] items-center gap-3 md:gap-1 lg:gap-3 !mt-5 !mb-[3rem]">
                        <div className="grid grid-cols-[1fr_2fr_1fr] items-center border rounded overflow-hidden border-[var(--border-color)]">
                            <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="!p-2 md:!p-1 border-r hover:bg-gray-50 border-[var(--border-color)] text-[var(--text-muted)]">-</button>
                            <span className="text-center text-[var(--black)]">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="border-l hover:bg-gray-50 border-[var(--border-color)] text-[var(--text-muted)]">+</button>
                        </div>
                        <button className="!px-4 md:!px-1 lg:!px-4 !py-2 rounded text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors duration-200">Add to cart</button>
                        <button className="!px-2 !py-3 border flex items-center justify-center rounded transition-all duration-200 bg-white hover:-translate-y-1" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}><Heart size={18} /></button>
                        <button className="!p-2 !py-3 border flex items-center justify-center rounded transition-all duration-200 bg-white hover:-translate-y-1" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}><Repeat size={18} /></button>
                    </div>
                    <div className="text-sm mb-6 space-y-2 border-t pt-5 !mb-5 border-[var(--border-color)] text-[var(--text-muted)]">
                        <p className="!mb-2 !mt-4 text-[var(--primary)]"><span className="font-medium text-[var(--black)]">SKU:</span> FWM15VKT</p>
                        <p className="!mb-2 text-[var(--primary)]"><span className="font-medium text-[var(--black)]">Tags:</span> Cloth, Women, Dress</p>
                        <p className="!mb-2 text-[var(--primary)]"><span className="font-medium text-[var(--black)]">Availability:</span> 8 Items In Stock</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
