// 'use client';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { Star, Heart, Repeat, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';
// import { PiLessThan, PiGreaterThan } from "react-icons/pi";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Thumbs, Autoplay, Zoom } from "swiper/modules";
// import type { Swiper as SwiperType } from "swiper";
// import { productImages, colors, sizes } from '@/lib/constants';

// interface QuickViewModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// const QuickViewModal = ({ isOpen, onClose }: QuickViewModalProps) => {
//     const [selectedColor, setSelectedColor] = useState("");
//     const [selectedSize, setSelectedSize] = useState("M");
//     const [quantity, setQuantity] = useState(1);
//     const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
//     const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
//     const [activeThumbIndex, setActiveThumbIndex] = useState<number | null>(null);

//     useEffect(() => {
//         if (isOpen) {
//             document.body.classList.add("overflow-hidden");
//         } else {
//             document.body.classList.remove("overflow-hidden");
//         }
//         return () => document.body.classList.remove("overflow-hidden");
//     }, [isOpen]);

//     if (!isOpen) return null;

//     return (
//         <div className='fixed inset-0 z-[999] flex items-center justify-center bg-[#00000085]'>
//             <div className='relative flex flex-col md:flex-row gap-6 bg-white w-[95%] max-w-[850px] max-h-[90vh] overflow-y-auto shadow-2xl !p-6 md:!p-4'>
//                 <div className='flex flex-col gap-4'>
//                     <div className="relative h-[300px] sm:h-[350px] md:h-[28rem] w-full md:w-[24rem]">
//                         <Swiper
//                             modules={[Thumbs, Zoom, Autoplay]}
//                             onSwiper={setMainSwiper}
//                             thumbs={{
//                                 swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
//                             }}
//                             zoom
//                             autoplay={{
//                                 delay: 3000,
//                                 disableOnInteraction: false,
//                             }}
//                             speed={800}
//                             className="h-full"
//                         >
//                             {productImages.map((img, index) => (
//                                 <SwiperSlide key={index} className="!h-full">
//                                     <div className="swiper-zoom-container relative h-full w-full">
//                                         <Image
//                                             src={img.main}
//                                             alt="product"
//                                             fill
//                                             className="object-cover"
//                                         />
//                                     </div>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>
//                     <div className='flex flex-col md:justify-center items-center'>
//                         <div className="relative h-[130px] md:h-[80px] lg:h-[63px] w-full md:max-w-[22rem] !mt-4"
//                             onMouseEnter={() => {
//                                 mainSwiper?.autoplay?.stop();
//                                 thumbsSwiper?.autoplay?.stop();
//                             }}
//                             onMouseLeave={() => {
//                                 mainSwiper?.autoplay?.start();
//                                 thumbsSwiper?.autoplay?.start();
//                             }}
//                         >
//                             <Swiper
//                                 modules={[Navigation, Thumbs, Autoplay]}
//                                 onSwiper={setThumbsSwiper}
//                                 breakpoints={{
//                                     0: { slidesPerView: 2 },
//                                     640: { slidesPerView: 3 },
//                                     768: { slidesPerView: 4 },
//                                     1024: { slidesPerView: 5 },
//                                 }}
//                                 spaceBetween={4}
//                                 loop={true}
//                                 autoplay={{
//                                     delay: 3000,
//                                     disableOnInteraction: false,
//                                 }}
//                                 speed={800}
//                                 navigation={{
//                                     prevEl: ".custom-swiper-prev",
//                                     nextEl: ".custom-swiper-next",
//                                 }}
//                                 watchSlidesProgress={true}
//                                 slideToClickedSlide={true}
//                                 onSlideChange={(swiper) => {
//                                     const realIndex = swiper.realIndex;
//                                     setActiveThumbIndex(realIndex);
//                                     mainSwiper?.slideTo(realIndex);
//                                 }}
//                                 className="h-full"
//                             >
//                                 {productImages.map((img, index) => (
//                                     <SwiperSlide key={index}>
//                                         <div
//                                             onClick={() => {
//                                                 setActiveThumbIndex(index);
//                                                 mainSwiper?.slideTo(index);
//                                             }}
//                                             className={`md:w-[63px] h-full w-full md:h-[63px] rounded overflow-hidden border transition-all duration-200 ${
//                                                 activeThumbIndex === index
//                                                     ? "border-[var(--primary)]"
//                                                     : "border-transparent"
//                                             }`}
//                                         >
//                                             <div className="relative w-full h-full">
//                                                 <Image
//                                                     src={img.thumb}
//                                                     alt="thumb"
//                                                     fill
//                                                     className="object-cover cursor-pointer"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </SwiperSlide>
//                                 ))}
//                             </Swiper>
//                             <div className="absolute top-[50%] md:top-[40] -left-5 -translate-y-1/2 z-10">
//                                 <button className="custom-swiper-prev text-[var(--text-muted)] text-[1.5rem] hover:text-[var(--primary)] duration-700 transition-all cursor-pointer">
//                                     <PiLessThan />
//                                 </button>
//                             </div>
//                             <div className="absolute top-[50%] md:top-[40] -right-3 -translate-y-1/2 z-10">
//                                 <button className="custom-swiper-next text-[var(--text-muted)] text-[1.5rem] hover:text-[var(--primary)] duration-700 transition-all cursor-pointer">
//                                     <PiGreaterThan />
//                                 </button>
//                             </div>
//                         </div>
//                         <div className='text-left w-[100%]'>
//                             <div className="!mt-4 text-left pt-4 flex flex-wrap">
//                                 <h3 className="text-sm font-medium text-[var(--text-muted)]">Share this :</h3>
//                                 <div className="flex items-center gap-2 !mx-4">
//                                     <a href="#" className="hover:scale-110 transition-transform"><Facebook size={20} className="text-[var(--text-muted)]" /></a>
//                                     <a href="#" className="hover:scale-110 transition-transform"><Twitter size={20} className="text-[var(--text-muted)]" /></a>
//                                     <a href="#" className="hover:scale-110 transition-transform"><Instagram size={20} className="text-[var(--text-muted)]" /></a>
//                                     <a href="#" className="hover:scale-110 transition-transform"><MessageCircle size={20} className="text-[var(--text-muted)]" /></a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <button onClick={onClose} className="absolute -top-1 md:top-4 right-1 md:right-6 text-2xl cursor-pointer text-gray-500 hover:text-black">✕</button>
//                     <div className="!mt-3 !mb-2">
//                         <h1 className="text-[1.7rem] font-semibold w-[100%] md:max-w-[20rem] !mb-2 !text-[var(--black)]">Colorful Pattern Shirts HD450</h1>
//                         <div className="flex justify-between items-center !mb-2">
//                             <p className="!mb-2 !mt-4 text-[var(--primary)] font-light"><span className="font-medium !mr-1 text-[var(--black)]">Brands:</span>Boostrap</p>
//                             <div className="flex items-center !mt-2">
//                                 <div className="flex text-[var(--yellow)]">
//                                     {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-current" />))}
//                                 </div>
//                                 <span className="text-sm !ml-2 text-[var(--text-muted)]">(25 reviews)</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-3 !mb-2 border-y py-4 border-[var(--border-color)]">
//                         <span className="text-xl sm:text-3xl font-bold !m-2 text-[var(--primary)]">$120.00</span>
//                         <span className="text-gray-500 line-through">$200.00</span>
//                         <span className="text-sm text-[var(--black)] font-medium">25% Off</span>
//                     </div>
//                     <p className="text-[0.9rem] !mb-2 w-[100%] md:max-w-[24rem] leading-[1.2rem] text-[var(--foreground)]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi,!</p>
//                     <div className="!mb-6 flex items-center gap-1">
//                         <p className="text-sm font-semibold text-[var(--black)]">Color</p>
//                         <div className="flex items-center gap-2">
//                             {colors.map((color) => (
//                                 <button key={color} onClick={() => setSelectedColor(color)} className={`w-7 h-7 rounded-full border-2 transition-all duration-200 relative ${selectedColor === color ? "border-gray-100 scale-110" : "border-gray-100"}`} style={{ backgroundColor: color }}>
//                                     {selectedColor === color && (<span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--primary)]"></span>)}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="!mb-4 flex items-center gap-2">
//                         <p className="text-sm font-semibold text-[var(--black)]">Size</p>
//                         <div className="flex items-center gap-3">
//                             {sizes.map((size) => (
//                                 <button key={size} onClick={() => setSelectedSize(size)} className="w-9 h-9 flex items-center justify-center text-sm font-medium border rounded transition-all duration-200" style={selectedSize === size ? { backgroundColor: "var(--primary)", color: "white", borderColor: "var(--primary)" } : { backgroundColor: "white", color: "var(--text-muted)", borderColor: "var(--border-color)" }}>{size}</button>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-[2fr_2fr_1fr_1fr] items-center gap-3 md:gap-1 lg:gap-3 !mt-5 !mb-[3rem]">
//                         <div className="grid grid-cols-[1fr_2fr_1fr] items-center border rounded overflow-hidden border-[var(--border-color)]">
//                             <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="!p-2 md:!p-1 border-r hover:bg-gray-50 border-[var(--border-color)] text-[var(--text-muted)]">-</button>
//                             <span className="text-center text-[var(--black)]">{quantity}</span>
//                             <button onClick={() => setQuantity(quantity + 1)} className="border-l hover:bg-gray-50 border-[var(--border-color)] text-[var(--text-muted)]">+</button>
//                         </div>
//                         <button className="!px-4 md:!px-1 lg:!px-4 !py-2 rounded text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors duration-200">Add to cart</button>
//                         <button className="!px-2 !py-3 border flex items-center justify-center rounded transition-all duration-200 bg-white hover:-translate-y-1" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}><Heart size={18} /></button>
//                         <button className="!p-2 !py-3 border flex items-center justify-center rounded transition-all duration-200 bg-white hover:-translate-y-1" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}><Repeat size={18} /></button>
//                     </div>
//                     <div className="text-sm mb-6 space-y-2 border-t pt-5 !mb-5 border-[var(--border-color)] text-[var(--text-muted)]">
//                         <p className="!mb-2 !mt-4 text-[var(--primary)]"><span className="font-medium text-[var(--black)]">SKU:</span> FWM15VKT</p>
//                         <p className="!mb-2 text-[var(--primary)]"><span className="font-medium text-[var(--black)]">Tags:</span> Cloth, Women, Dress</p>
//                         <p className="!mb-2 text-[var(--primary)]"><span className="font-medium text-[var(--black)]">Availability:</span> 8 Items In Stock</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default QuickViewModal;


// 'use client';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { Star, Heart, Repeat, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';
// import { PiLessThan, PiGreaterThan } from "react-icons/pi";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Thumbs, Autoplay, Zoom } from "swiper/modules";
// import type { Swiper as SwiperType } from "swiper";
// import URLs from "@/lib/urls";

// interface QuickViewModalProps {
//     isOpen: boolean;
//     product: any; // Receives the dynamic product
//     onClose: () => void;
// }

// const QuickViewModal = ({ isOpen, product, onClose }: QuickViewModalProps) => {
//     const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
//     const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
//     const [quantity, setQuantity] = useState(1);

//     useEffect(() => {
//         if (isOpen) {
//             document.body.classList.add("overflow-hidden");
//             setQuantity(1); // Reset quantity when opening
//         } else {
//             document.body.classList.remove("overflow-hidden");
//         }
//     }, [isOpen]);

//     if (!isOpen || !product) return null;

//     const finalPrice = product.discountPrice || product.price || 0;
//     const originalPrice = product.discountPrice ? product.price : null;
//     const discountPercent = originalPrice ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;

//     return (
//         <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4'>
//             <div className='relative flex flex-col md:flex-row gap-6 bg-white w-full max-w-[900px] max-h-[90vh] overflow-y-auto shadow-2xl p-6 rounded-2xl'>
                
//                 {/* Close Button */}
//                 <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 z-50 transition-all">✕</button>

//                 {/* Left: Images */}
//                 <div className='w-full md:w-[45%] flex flex-col gap-4'>
//                     <div className="relative h-[300px] md:h-[400px] w-full bg-white rounded-xl border border-gray-100 overflow-hidden">
//                         <Swiper
//                             modules={[Thumbs, Zoom, Autoplay]}
//                             onSwiper={setMainSwiper}
//                             thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//                             zoom
//                             autoplay={{ delay: 3000 }}
//                             className="h-full"
//                         >
//                             {product.images?.map((img: string, index: number) => (
//                                 <SwiperSlide key={index}>
//                                     <div className="swiper-zoom-container h-full w-full flex items-center justify-center p-4">
//                                         <img src={`${URLs.FILEURL}${img.replace(/^\/+/, "")}`} alt="product" className="max-h-full object-contain" />
//                                     </div>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>

//                     {/* Thumbnails */}
//                     <div className="relative h-[70px] w-full">
//                         <Swiper
//                             modules={[Navigation, Thumbs]}
//                             onSwiper={setThumbsSwiper}
//                             slidesPerView={4}
//                             spaceBetween={10}
//                             navigation={{ prevEl: ".prev-btn", nextEl: ".next-btn" }}
//                             className="h-full px-8"
//                         >
//                             {product.images?.map((img: string, index: number) => (
//                                 <SwiperSlide key={index}>
//                                     <div className="h-full border rounded-lg overflow-hidden cursor-pointer bg-white">
//                                         <img src={`${URLs.FILEURL}${img.replace(/^\/+/, "")}`} className="w-full h-full object-contain" />
//                                     </div>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>
//                 </div>

//                 {/* Right: Details */}
//                 <div className="w-full md:w-[55%]">
//                     <span className="text-orange-500 bg-orange-50 px-2 py-1 rounded text-xs font-bold uppercase">Sale Off</span>
//                     <h1 className="text-2xl font-bold text-gray-800 mt-2">{product.name}</h1>
                    
//                     <div className="flex items-center gap-2 mt-4">
//                         <div className="flex text-yellow-400">
//                              {[...Array(5)].map((_, i) => (<Star key={i} size={16} className="fill-current" />))}
//                         </div>
//                         <span className="text-sm text-gray-400">(25 reviews)</span>
//                     </div>

//                     <div className="flex items-baseline gap-4 mt-6 border-y py-4 border-gray-100">
//                         <span className="text-3xl font-bold text-[var(--primary)]">₹{finalPrice}</span>
//                         {originalPrice && (
//                             <span className="text-lg text-gray-400 line-through font-light">₹{originalPrice}</span>
//                         )}
//                         {discountPercent > 0 && <span className="text-red-500 font-bold">{discountPercent}% Off</span>}
//                     </div>

//                     <p className="text-sm text-gray-500 mt-6 leading-relaxed">
//                         {product.shortDescription || "Premium quality product designed for your lifestyle. High durability and stylish finish."}
//                     </p>

//                     {/* Actions */}
//                     <div className="flex flex-wrap items-center gap-3 mt-8">
//                         <div className="flex items-center border rounded-lg h-12 overflow-hidden">
//                             <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="px-4 hover:bg-gray-100">-</button>
//                             <span className="px-4 font-bold min-w-[40px] text-center">{quantity}</span>
//                             <button onClick={() => setQuantity(quantity + 1)} className="px-4 hover:bg-gray-100 text-[var(--primary)]">+</button>
//                         </div>
//                         <button className="flex-1 bg-[var(--primary)] hover:bg-[#29A56C] text-white h-12 rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
//                              Add to cart
//                         </button>
//                     </div>

//                     <div className="text-xs text-gray-400 mt-8 space-y-2 border-t pt-6">
//                         <p><span className="font-bold text-gray-600">Category:</span> {product.categoryId?.name || "General"}</p>
//                         <p><span className="font-bold text-gray-600">Availability:</span> {product.stockQuantity > 0 ? `${product.stockQuantity} In Stock` : "Out of stock"}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default QuickViewModal;

// 'use client';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { Star, Heart, Repeat, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';
// import { PiLessThan, PiGreaterThan } from "react-icons/pi";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Thumbs, Autoplay, Zoom } from "swiper/modules";
// import type { Swiper as SwiperType } from "swiper";
// import URLs from "@/lib/urls";

// interface QuickViewModalProps {
//     isOpen: boolean;
//     product: any;
//     onClose: () => void;
// }

// const QuickViewModal = ({ isOpen, product, onClose }: QuickViewModalProps) => {
//     const [selectedColor, setSelectedColor] = useState("");
//     const [selectedSize, setSelectedSize] = useState("M");
//     const [quantity, setQuantity] = useState(1);
//     const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
//     const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
//     const [activeThumbIndex, setActiveThumbIndex] = useState<number>(0);

//     useEffect(() => {
//         if (isOpen) {
//             document.body.classList.add("overflow-hidden");
//             if (product?.colors?.length > 0) setSelectedColor(product.colors[0]);
//         } else {
//             document.body.classList.remove("overflow-hidden");
//         }
//         return () => document.body.classList.remove("overflow-hidden");
//     }, [isOpen, product]);

//     if (!isOpen || !product) return null;

//     // Price Calculations
//     const finalPrice = product.discountPrice || product.price || 0;
//     const originalPrice = product.discountPrice ? product.price : null;
//     const discountPercent = originalPrice ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;

//     return (
//         <div className='fixed inset-0 z-[999] flex items-center justify-center bg-[#00000085]'>
//             <div className='relative flex flex-col md:flex-row gap-6 bg-white w-[95%] max-w-[850px] max-h-[90vh] overflow-y-auto shadow-2xl !p-6 md:!p-4'>
//                 <div className='flex flex-col gap-4'>
//                     <div className="relative h-[300px] sm:h-[350px] md:h-[28rem] w-full md:w-[24rem]">
//                         <Swiper
//                             modules={[Thumbs, Zoom, Autoplay]}
//                             onSwiper={setMainSwiper}
//                             thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//                             zoom
//                             autoplay={{ delay: 3000, disableOnInteraction: false }}
//                             speed={800}
//                             className="h-full"
//                         >
//                             {product.images?.map((img: string, index: number) => (
//                                 <SwiperSlide key={index} className="!h-full">
//                                     <div className="swiper-zoom-container relative h-full w-full">
//                                         <img
//                                             src={`${URLs.FILEURL}${img.replace(/^\/+/, "")}`}
//                                             alt="product"
//                                             className="w-full h-full object-contain"
//                                         />
//                                     </div>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>
//                     <div className='flex flex-col md:justify-center items-center'>
//                         <div className="relative h-[130px] md:h-[80px] lg:h-[63px] w-full md:max-w-[22rem] !mt-4">
//                             <Swiper
//                                 modules={[Navigation, Thumbs, Autoplay]}
//                                 onSwiper={setThumbsSwiper}
//                                 slidesPerView={4}
//                                 spaceBetween={4}
//                                 loop={product.images?.length > 4}
//                                 autoplay={{ delay: 3000, disableOnInteraction: false }}
//                                 speed={800}
//                                 navigation={{ prevEl: ".custom-swiper-prev", nextEl: ".custom-swiper-next" }}
//                                 watchSlidesProgress={true}
//                                 slideToClickedSlide={true}
//                                 onSlideChange={(swiper) => setActiveThumbIndex(swiper.realIndex)}
//                                 className="h-full"
//                             >
//                                 {product.images?.map((img: string, index: number) => (
//                                     <SwiperSlide key={index}>
//                                         <div
//                                             onClick={() => mainSwiper?.slideTo(index)}
//                                             className={`md:w-[63px] h-full w-full md:h-[63px] rounded overflow-hidden border transition-all duration-200 cursor-pointer ${
//                                                 activeThumbIndex === index ? "border-[var(--primary)]" : "border-transparent"
//                                             }`}
//                                         >
//                                             <img
//                                                 src={`${URLs.FILEURL}${img.replace(/^\/+/, "")}`}
//                                                 alt="thumb"
//                                                 className="w-full h-full object-contain"
//                                             />
//                                         </div>
//                                     </SwiperSlide>
//                                 ))}
//                             </Swiper>
//                             <div className="absolute top-[50%] -left-5 -translate-y-1/2 z-10">
//                                 <button className="custom-swiper-prev text-[var(--text-muted)] text-[1.5rem] hover:text-[var(--primary)] duration-700 transition-all cursor-pointer">
//                                     <PiLessThan />
//                                 </button>
//                             </div>
//                             <div className="absolute top-[50%] -right-3 -translate-y-1/2 z-10">
//                                 <button className="custom-swiper-next text-[var(--text-muted)] text-[1.5rem] hover:text-[var(--primary)] duration-700 transition-all cursor-pointer">
//                                     <PiGreaterThan />
//                                 </button>
//                             </div>
//                         </div>
//                         <div className='text-left w-[100%]'>
//                             <div className="!mt-4 text-left pt-4 flex flex-wrap">
//                                 <h3 className="text-sm font-medium text-[var(--text-muted)]">Share this :</h3>
//                                 <div className="flex items-center gap-2 !mx-4">
//                                     <Facebook size={20} className="text-[var(--text-muted)] cursor-pointer hover:text-blue-600" />
//                                     <Twitter size={20} className="text-[var(--text-muted)] cursor-pointer hover:text-blue-400" />
//                                     <Instagram size={20} className="text-[var(--text-muted)] cursor-pointer hover:text-pink-500" />
//                                     <MessageCircle size={20} className="text-[var(--text-muted)] cursor-pointer hover:text-green-500" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <button onClick={onClose} className="absolute -top-1 md:top-4 right-1 md:right-6 text-2xl cursor-pointer text-gray-500 hover:text-black">✕</button>
//                     <div className="!mt-3 !mb-2">
//                         <h1 className="text-[1.7rem] font-semibold w-[100%] md:max-w-[20rem] !mb-2 !text-[var(--black)]">{product.name}</h1>
//                         <div className="flex justify-between items-center !mb-2">
//                             <p className="!mb-2 !mt-4 text-[var(--primary)] font-light">
//                                 <span className="font-medium !mr-1 text-[var(--black)]">Brands:</span>
//                                 {product.brandId?.name || "Bootstrap"}
//                             </p>
//                             <div className="flex items-center !mt-2">
//                                 <div className="flex text-[var(--yellow)]">
//                                     {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-current" />))}
//                                 </div>
//                                 <span className="text-sm !ml-2 text-[var(--text-muted)]">({product.rating || 25} reviews)</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-3 !mb-2 border-y py-4 border-[var(--border-color)]">
//                         <span className="text-xl sm:text-3xl font-bold !m-2 text-[var(--primary)]">₹{finalPrice}</span>
//                         {originalPrice && <span className="text-gray-500 line-through">₹{originalPrice}</span>}
//                         {discountPercent > 0 && <span className="text-sm text-[var(--black)] font-medium">{discountPercent}% Off</span>}
//                     </div>
//                     <p className="text-[0.9rem] !mb-2 w-[100%] md:max-w-[24rem] leading-[1.2rem] text-[var(--foreground)]">
//                         {product.shortDescription || "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi,!"}
//                     </p>
                    
//                     {/* Color Section */}
//                     {product.colors && product.colors.length > 0 && (
//                         <div className="!mb-6 flex items-center gap-1">
//                             <p className="text-sm font-semibold text-[var(--black)]">Color</p>
//                             <div className="flex items-center gap-2">
//                                 {product.colors.map((color: string) => (
//                                     <button 
//                                         key={color} 
//                                         onClick={() => setSelectedColor(color)} 
//                                         className={`w-7 h-7 rounded-full border-2 transition-all duration-200 relative ${selectedColor === color ? "border-gray-300 scale-110" : "border-gray-100"}`} 
//                                         style={{ backgroundColor: color }}
//                                     >
//                                         {selectedColor === color && (<span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--primary)]"></span>)}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Size Section */}
//                     <div className="!mb-4 flex items-center gap-2">
//                         <p className="text-sm font-semibold text-[var(--black)]">Size</p>
//                         <div className="flex items-center gap-3">
//                             {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
//                                 <button 
//                                     key={size} 
//                                     onClick={() => setSelectedSize(size)} 
//                                     className="w-9 h-9 flex items-center justify-center text-sm font-medium border rounded transition-all duration-200" 
//                                     style={selectedSize === size ? { backgroundColor: "var(--primary)", color: "white", borderColor: "var(--primary)" } : { backgroundColor: "white", color: "var(--text-muted)", borderColor: "var(--border-color)" }}
//                                 >
//                                     {size}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-[2fr_2fr_1fr_1fr] items-center gap-3 md:gap-1 lg:gap-3 !mt-5 !mb-[3rem]">
//                         <div className="grid grid-cols-[1fr_2fr_1fr] items-center border rounded overflow-hidden border-[var(--border-color)]">
//                             <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="!p-2 md:!p-1 border-r hover:bg-gray-50 border-[var(--border-color)] text-[var(--text-muted)]">-</button>
//                             <span className="text-center text-[var(--black)]">{quantity}</span>
//                             <button onClick={() => setQuantity(quantity + 1)} className="border-l hover:bg-gray-50 border-[var(--border-color)] text-[var(--text-muted)]">+</button>
//                         </div>
//                         <button className="!px-4 md:!px-1 lg:!px-4 !py-2 rounded text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors duration-200">Add to cart</button>
//                         <button className="!px-2 !py-3 border flex items-center justify-center rounded transition-all duration-200 bg-white hover:-translate-y-1 border-[var(--border-color)] text-[var(--text-muted)]"><Heart size={18} /></button>
//                         <button className="!p-2 !py-3 border flex items-center justify-center rounded transition-all duration-200 bg-white hover:-translate-y-1 border-[var(--border-color)] text-[var(--text-muted)]"><Repeat size={18} /></button>
//                     </div>
//                     <div className="text-sm mb-6 space-y-2 border-t pt-5 !mb-5 border-[var(--border-color)] text-[var(--text-muted)]">
//                         <p className="!mb-2 !mt-4 text-[var(--primary)]"><span className="font-medium text-[var(--black)]">SKU:</span> {product.sku || "FWM15VKT"}</p>
//                         <p className="!mb-2 text-[var(--primary)]"><span className="font-medium text-[var(--black)]">Tags:</span> {product.categoryId?.name || "Cloth, Men, Dress"}</p>
//                         <p className="!mb-2 text-[var(--primary)]"><span className="font-medium text-[var(--black)]">Availability:</span> {product.stockQuantity || 8} Items In Stock</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default QuickViewModal;

'use client';
import { useState, useEffect } from 'react';
import { Star, Heart, Repeat, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';
import { PiLessThan, PiGreaterThan } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay, Zoom } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import URLs from "@/lib/urls";

interface QuickViewModalProps {
    isOpen: boolean;
    product: any;
    onClose: () => void;
}

const QuickViewModal = ({ isOpen, product, onClose }: QuickViewModalProps) => {
    // --- STATIC COLOR DATA (Matching the Image) ---
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
                                        onClick={() => mainSwiper?.slideTo(index)}
                                    >
                                        <img src={`${URLs.FILEURL}${img.replace(/^\/+/, "")}`} alt="thumb" className="w-full h-full object-contain bg-white" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button className="custom-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3BB77E]"><PiLessThan size={20}/></button>
                        <button className="custom-swiper-next absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3BB77E]"><PiGreaterThan size={20}/></button>
                    </div>

                    {/* Share this */}
                    <div className="flex items-center gap-3 mt-4 border-t pt-4">
                        <span className="text-[14px] font-bold text-[#253D4E]">Share this:</span>
                        <div className="flex gap-4 text-gray-400">
                            <Facebook size={18} className="hover:text-blue-600 cursor-pointer transition-colors" />
                            <Twitter size={18} className="hover:text-sky-400 cursor-pointer transition-colors" />
                            <Instagram size={18} className="hover:text-pink-500 cursor-pointer transition-colors" />
                            <MessageCircle size={18} className="hover:text-green-500 cursor-pointer transition-colors" />
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
                        <div className="flex items-center gap-1">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (<Star key={i} size={14} className="fill-current" />))}
                            </div>
                            <span className="text-xs text-gray-400">({product.rating || 25} reviews)</span>
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
                        {product.shortDescription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi!"}
                    </p>

                    {/* --- STATIC COLOR SECTION (FIXED TO MATCH IMAGE) --- */}
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
                                    {/* Selection Indicator: Tiny green dot at the top (Exactly like reference) */}
                                    {selectedColor === color.hex && (
                                        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#3BB77E] border border-white shadow-sm z-10"></span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- SIZE SECTION --- */}
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

                    {/* --- ACTION SECTION --- */}
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

                    {/* --- FOOTER INFO --- */}
                    <div className="space-y-1 text-[13px] border-t pt-6 text-[#7E7E7E]">
                        <p><span className="text-[#253D4E] font-medium min-w-[80px] inline-block">SKU:</span> <span className="text-[#3BB77E]">{product.sku || "FWM15VKT"}</span></p>
                        <p><span className="text-[#253D4E] font-medium min-w-[80px] inline-block">Tags:</span> <span className="text-[#3BB77E]">{product.categoryId?.name || "Cloth, Men, Dress"}</span></p>
                        <p><span className="text-[#253D4E] font-medium min-w-[80px] inline-block">Availability:</span> <span className="text-[#3BB77E] font-bold">{product.stockQuantity || 8} Items In Stock</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;