'use client';
import { useState, useEffect, useMemo } from 'react';
import { Star, Heart, Repeat, Facebook, Twitter, Instagram, Loader2 } from 'lucide-react';
import { PiLessThan, PiGreaterThan } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay, Zoom } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import URLs from "@/lib/urls";
import Link from 'next/link';
import { useReviewStore } from '@/store/useReviewStore'; // 1. Import Review Store

interface QuickViewModalProps {
    isOpen: boolean;
    product: any;
    onClose: () => void;
}

const QuickViewModal = ({ isOpen, product, onClose }: QuickViewModalProps) => {
    // 2. Extract Review data and fetch action
    const { activeProductReviews, fetchActiveReviews, isLoading: isReviewLoading } = useReviewStore();

    const [currentUrl, setCurrentUrl] = useState("");

    // Fetch Reviews when modal opens and product is available
    useEffect(() => {
        if (isOpen && product?._id) {
            fetchActiveReviews(product._id);
        }
    }, [isOpen, product?._id, fetchActiveReviews]);

    // 3. Dynamic Rating Calculation
    const { avgRating, reviewCount } = useMemo(() => {
        const count = activeProductReviews.length;
        if (count === 0) {
            return { avgRating: product?.rating || 0, reviewCount: 0 };
        }
        const totalRating = activeProductReviews.reduce((sum, rev) => sum + rev.rating, 0);
        return { 
            avgRating: totalRating / count, 
            reviewCount: count 
        };
    }, [activeProductReviews, product?.rating]);

    useEffect(() => {
        if (typeof window !== 'undefined' && product?.slug) {
            setCurrentUrl(`${window.location.origin}/product-view/${product.slug}`);
        }
    }, [product]);

    // --- STATIC COLOR DATA ---
    const staticColors = [
        { name: "Pink", hex: "#F8719D" },
        { name: "Yellow", hex: "#FACC15" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Orange", hex: "#F97316" },
        { name: "Light Blue", hex: "#7DD3FC" },
        { name: "Green", hex: "#22C55E" },
        { name: "Magenta", hex: "#F472B6" }
    ];

    const [selectedColor, setSelectedColor] = useState(staticColors[0].hex);
    const [selectedSize, setSelectedSize] = useState("M");
    const [quantity, setQuantity] = useState(1);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
    const [activeThumbIndex, setActiveThumbIndex] = useState<number>(0);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const finalPrice = product.discountPrice || product.price || 0;
    const originalPrice = product.discountPrice ? product.price : null;
    const discountPercent = originalPrice ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;

    return (
        <div className='fixed inset-0 z-[999] flex items-center justify-center bg-[#00000085] p-4'>
            <div className='relative flex flex-col md:flex-row gap-8 bg-white w-full max-w-[900px] max-h-[90vh] overflow-y-auto shadow-2xl rounded-xl p-6 md:p-8'>
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-black z-50 transition-colors">✕</button>

                {/* Left: Gallery */}
                <div className='w-full md:w-[45%] flex flex-col gap-4'>
                    <div className="relative aspect-square w-full border border-gray-100 rounded-xl overflow-hidden bg-[#f7f8f9]">
                        <Swiper
                            modules={[Thumbs, Zoom, Autoplay]}
                            onSwiper={setMainSwiper}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            zoom
                            autoplay={{ delay: 3500 }}
                            className="h-full"
                        >
                            {product.images?.map((img: string, index: number) => (
                                <SwiperSlide key={index}>
                                    <div className="swiper-zoom-container h-full w-full">
                                        <img src={`${URLs.FILEURL}${img.replace(/^\/+/, "")}`} alt="product" className="w-full h-full object-contain p-4" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Thumbs */}
                    <div className="relative px-6">
                        <Swiper
                            modules={[Navigation, Thumbs]}
                            onSwiper={setThumbsSwiper}
                            slidesPerView={4}
                            spaceBetween={10}
                        >
                            {product.images?.map((img: string, index: number) => (
                                <SwiperSlide key={index}>
                                    <div 
                                        className={`aspect-square rounded-lg border-2 cursor-pointer transition-all ${activeThumbIndex === index ? "border-[#3BB77E]" : "border-gray-100"}`}
                                        onClick={() => {
                                            mainSwiper?.slideTo(index);
                                            setActiveThumbIndex(index);
                                        }}
                                    >
                                        <img src={`${URLs.FILEURL}${img.replace(/^\/+/, "")}`} alt="thumb" className="w-full h-full object-contain bg-white" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button className="custom-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3BB77E]"><PiLessThan size={20}/></button>
                        <button className="custom-swiper-next absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3BB77E]"><PiGreaterThan size={20}/></button>
                    </div>

                    {/* Social Sharing */}
                    <div className="flex items-center gap-3 mt-4 border-t pt-4">
                        <span className="text-[14px] font-bold text-[#253D4E]">Share this:</span>
                        <div className="flex gap-4 text-gray-400">
                            <Link href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" className="hover:text-blue-600 transition-colors"><Facebook size={18} /></Link>
                            <Link href={`https://twitter.com/intent/tweet?url=${currentUrl}`} target="_blank" className="hover:text-sky-400 transition-colors"><Twitter size={18} /></Link>
                            <Link href="https://www.instagram.com" target="_blank" className="hover:text-pink-600 transition-colors"><Instagram size={18} /></Link>
                        </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className='flex-1 flex flex-col'>
                    <h1 className="text-3xl font-bold text-[#253D4E] leading-tight mb-2">{product.name}</h1>
                    
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm">
                            <span className="text-gray-400">Brands: </span>
                            <span className="text-[#3BB77E] font-medium cursor-pointer">{product.brandId?.name || "Bootstrap"}</span>
                        </p>
                        
                        {/* 4. DYNAMIC RATING SECTION */}
                        <div className="flex items-center gap-1">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={14} 
                                        fill={i < Math.round(avgRating) ? "currentColor" : "none"} 
                                        className={i < Math.round(avgRating) ? "text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-400">
                                ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 py-4 border-y border-gray-100 mb-4">
                        <span className="text-4xl font-bold text-[#3BB77E]">₹{finalPrice}</span>
                        <div className="flex flex-col">
                            {originalPrice && <span className="text-gray-400 line-through text-lg leading-none mb-1">₹{originalPrice}</span>}
                            {discountPercent > 0 && <span className="text-[#253D4E] font-bold text-sm">{discountPercent}% Off</span>}
                        </div>
                    </div>

                    <p className="text-[#7E7E7E] text-[15px] leading-relaxed mb-6">
                        {product.shortDescription || "No description available."}
                    </p>

                    {/* Color Section */}
                    <div className="flex items-center mb-6">
                        <p className="text-[14px] font-bold text-[#253D4E] min-w-[70px]">Color</p>
                        <div className="flex items-center gap-2">
                            {staticColors.map((color) => (
                                <button 
                                    key={color.name} 
                                    onClick={() => setSelectedColor(color.hex)} 
                                    className={`w-5 h-5 rounded-full border border-gray-200 transition-all duration-300 relative hover:scale-110 shadow-sm`} 
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                >
                                    {selectedColor === color.hex && (
                                        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#3BB77E] border border-white shadow-sm z-10"></span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size Section */}
                    <div className="flex items-center mb-8">
                        <p className="text-[14px] font-bold text-[#253D4E] min-w-[70px]">Size</p>
                        <div className="flex items-center gap-2">
                            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <button 
                                    key={size} 
                                    onClick={() => setSelectedSize(size)} 
                                    className={`min-w-[34px] h-8 px-2 flex items-center justify-center text-[12px] font-bold uppercase border rounded transition-all duration-200 ${
                                        selectedSize === size 
                                        ? "bg-[#3BB77E] text-white border-[#3BB77E] shadow-sm" 
                                        : "bg-white text-[#7E7E7E] border-gray-200 hover:border-[#3BB77E] hover:text-[#3BB77E]"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Section */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex items-center border border-gray-200 rounded h-12 px-3">
                            <span className="font-bold text-[16px] text-[#253D4E] min-w-[20px] text-center">{quantity}</span>
                            <div className="flex flex-col ml-3 gap-1">
                                <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-[#3BB77E] text-[10px]">▴</button>
                                <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="text-gray-400 hover:text-[#3BB77E] text-[10px]">▾</button>
                            </div>
                        </div>
                        <button className="flex-1 h-12 bg-[#3BB77E] text-white font-bold rounded hover:bg-[#29A56C] transition-all shadow-md active:scale-95">
                            Add to cart
                        </button>
                        <button className="h-12 w-12 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-[#f74877] transition-all"><Heart size={20}/></button>
                        <button className="h-12 w-12 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-[#3BB77E] transition-all"><Repeat size={20}/></button>
                    </div>

                    {/* Footer Info */}
                    <div className="space-y-1 text-[13px] border-t pt-6 text-[#7E7E7E]">
                        <p><span className="text-[#253D4E] font-medium min-w-[80px] inline-block">SKU:</span> <span className="text-[#3BB77E]">{product.sku || "N/A"}</span></p>
                        <p><span className="text-[#253D4E] font-medium min-w-[80px] inline-block">Availability:</span> <span className="text-[#3BB77E] font-bold">{product.stockQuantity || 0} Items In Stock</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;