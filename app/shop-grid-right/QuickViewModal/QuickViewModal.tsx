"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Controller } from "swiper/modules";
import { Star, Heart, Repeat, X,ChevronLeft,ChevronRight,ChevronUp, ChevronDown} from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";
import type { Swiper as SwiperType } from 'swiper';
import {  } from "lucide-react";

const colors = ["#e63946", "#f6fe52", "#ffffff", "#ffb703", "#00a8e8", "#90bd3c", "#ff66c4"];
const sizes = ["S", "M", "L", "XL", "XXL"];
const socialIcons = [
    { Icon: FaFacebookF, link: "#" },
    { Icon: FaTwitter, link: "#" },
    { Icon: FaInstagram, link: "#" },
    { Icon: FaPinterestP, link: "#" },
  ];

export default function QuickViewModal({ onClose }: { onClose: () => void }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  

 // Change 'e' to include the React.MouseEvent type
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
  
  const x = ((e.pageX - left) / width) * 100;
  const y = ((e.pageY - top) / height) * 100;
  
  const img = e.currentTarget.querySelector('img') as HTMLImageElement;
  if (img) {
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(2)";
  }
};

const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  const img = e.currentTarget.querySelector('img') as HTMLImageElement;
  if (img) {
    img.style.transform = "scale(1)";
    img.style.transformOrigin = "center center";
  }
};
  // Sample images based on your provided list
  const images = [
    { main: "/shop/new-product-1.jpg", thumb: "/shop/new-product-1.jpg" },
    { main: "/shop/new-product-2.jpg", thumb: "/shop/new-product-2.jpg" },
    { main: "/shop/new-product-3.jpg", thumb: "/shop/new-product-3.jpg" },
    { main: "/shop/product-4.jpg", thumb: "/shop/product-4.jpg" },
    { main: "/shop/product-1.jpg", thumb: "/shop/product-1.jpg" },
    { main: "/shop/product-2.jpg", thumb: "/shop/product-2.jpg" },
    { main: "/shop/product-3.jpg", thumb: "/shop/product-3.jpg" },
    { main: "/shop/product-5.jpg", thumb: "/shop/product-5.jpg" },
    { main: "/shop/product-6.jpg", thumb: "/shop/product-6.jpg" },
    { main: "/shop/product-7.jpg", thumb: "/shop/product-7.jpg" },
    { main: "/shop/product-8.jpg", thumb: "/shop/product-8.jpg" },
    { main: "/shop/product-9.jpg", thumb: "/shop/product-9.jpg" },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-2">
      <div className="bg-white max-w-[900px] w-full max-h-[90vh] relative flex flex-col lg:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 z-50 p-2 text-[#7E7E7E] transition-colors"
        >
          <X size={24} />
        </button>

        {/* LEFT SIDE: Image Gallery (Swiper) */}
        <div className="w-full lg:w-1/2 p-2 lg:p-5">
            <div className="relative w-full h-[300px] sm:h-[450px]">
                <Swiper
                modules={[Thumbs, Navigation,Controller]}
                onSwiper={setMainSwiper}
                loop={true}
                controller={{ control: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                // ADD THIS: Updates the border index when main image is swiped
                onSlideChange={(swiper) => {
                    setActiveThumbIndex(swiper.realIndex);
                }}
                className="h-full overflow-hidden main-swiper"
                >
                    {images.map((img, index) => (
                    <SwiperSlide key={`main-${index}`}>
                        <div 
                        className="relative h-full w-full overflow-hidden cursor-zoom-in"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        >
                        <Image 
                            src={img.main} 
                            alt="product" 
                            fill 
                            className="object-cover transition-transform duration-150 ease-out"
                            style={{ pointerEvents: 'none' }} // Prevents mouse events from flickering between div and img
                        />
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>

                        {/* Thumbnails Swiper */}
                <div className="relative mt-4 px-8">
                  <Swiper
                      modules={[Navigation, Thumbs, Controller]}
                      onSwiper={setThumbsSwiper}
                      // This tells the thumbs to control the main swiper
                      controller={{ control: mainSwiper && !mainSwiper.destroyed ? mainSwiper : null }}
                      slidesPerView={4}
                      spaceBetween={10}
                      loop={true} 
                      slideToClickedSlide={true}
                      watchSlidesProgress={true}
                      navigation={{
                          prevEl: ".modal-prev",
                          nextEl: ".modal-next",
                      }}
                      // Update the active index for your styling
                      onSlideChange={(swiper) => setActiveThumbIndex(swiper.realIndex)}
                      className="py-2"
                  >
                      {images.map((img, index) => (
                          <SwiperSlide key={`thumb-${index}`}>
                              <div 
                                  className={`relative h-20 border-2 cursor-pointer transition-all ${
                                      activeThumbIndex === index 
                                      ? "border-[#3BB77E] opacity-100" 
                                      : "border-transparent opacity-50 grayscale-[80%]" 
                                  }`}
                              >
                                  <Image src={img.thumb} alt="thumb" fill className="object-cover" />
                              </div>
                          </SwiperSlide>
                      ))}
                  </Swiper>

                    {/* Custom Nav Buttons */}
                    <button className="modal-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 ...">
                        <ChevronLeft size={18} />
                    </button>
                    <button className="modal-next absolute right-0 top-1/2 -translate-y-1/2 z-10 ...">
                        <ChevronRight size={18} />
                    </button>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  {/* Label */}
                  <span 
                    className="text-md font-semibold" 
                    style={{ color: "var(--text-muted)" }}
                  >
                    Share this:
                  </span>

                  {/* Icons Container */}
                  <div className="flex items-center gap-3">
                    {socialIcons.map(({ Icon, link }, index) => (
                      <a
                        key={index}
                        href={link}
                        className="transition-colors duration-300 ease-in-out hover:text-[#253D4E]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Icon size={18} strokeWidth={2} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

        {/* RIGHT SIDE: Product Info */}
        <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold" style={{ color: "var(--text-main)" }}>
              Colorful Pattern Shirts HD450
            </h1>
            
            <div className="flex justify-between items-center">
              <p style={{ color: "var(--primary)" }}>
                <span className="font-medium" style={{ color: "var(--text-main)" }}>Brands: </span>Bootstrap
              </p>
              <div className="flex items-center">
                <div className="flex" style={{ color: "#ffb703" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                </div>
                <span className="text-sm ml-2" style={{ color: "var(--text-muted)" }}>(25 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 border-y py-4" style={{ borderColor: "var(--border-color)" }}>
              <span className="text-3xl font-bold" style={{ color: "var(--primary)" }}>$120.00</span>
              <span className="text-gray-500 line-through">$200.00</span>
              <span className="text-lg">25% Off</span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi
            </p>

            {/* Color Selection */}
           <div className="flex items-center gap-1">
            <p className="text-sm font-bold w-16" style={{ color: "var(--text-main)" }}>Color</p>
            <div className="flex items-center gap-2">
              {colors.map((color) => {
                const isSelected = selectedColor === color;
                
                return (
                  <div key={color} className="relative">
                    <button
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full cursor-pointer transition-all border ${
                        isSelected ? "scale-110 border-[#ececec]" : "border-[#ececec]"
                      }`}
                      style={{ 
                        backgroundColor: color,
                      }}
                    />
                    
                    {/* The Green Selection Dot */}
                    {isSelected && (
                      <span 
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
                        style={{ backgroundColor: "var(--primary)" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

            {/* Size Selection */}
            <div className="flex items-center gap-1">
              <p className="text-sm font-bold w-16" style={{ color: "var(--text-main)" }}>Size</p>
              <div className="flex items-center gap-1">
                {sizes.map((size) => {
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-9 h-9 flex items-center justify-center cursor-pointer text-sm font-medium border rounded transition-all 
                        ${!isSelected ? "bg-white text-[var(--text-muted)] border-[var(--border-color)]" : ""} 
                        hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)]`}
                      style={isSelected ? {
                        backgroundColor: "var(--primary)",
                        color: "white",
                        borderColor: "var(--primary)",
                      } : {}}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div 
                className="flex items-center border rounded-lg px-4 py-2 w-fit bg-white" 
                style={{ borderColor: "var(--border-color)" }}
              >
                {/* The Quantity Number */}
                <span 
                  className="text-md font-semibold w-8 inline-block text-center pr-2" 
                >
                  {quantity}
                </span>

                {/* Vertical Lucide Icons */}
                <div className="flex flex-col justify-between items-center h-full">
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="hover:text-[#3BB77E] transition-colors leading-none"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <ChevronUp size={16} strokeWidth={2.5} />
                  </button>
                  
                  <button 
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="hover:text-[#3BB77E] transition-colors leading-none"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <ChevronDown size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
              <button 
                className="flex-1 lg:flex-none px-10 py-3 rounded text-white font-bold hover:bg-[#29a56c]" 
                style={{ backgroundColor: "var(--primary)" }}
              >
                Add to cart
              </button>

              <button className="p-3 border border-[#ececec] rounded  hover:bg-[var(--primary-hover)] hover:text-white hover:mb-1 transition-all"><Heart size={18} /></button>
              <button className="p-3 border border-[#ececec] rounded  hover:bg-[var(--primary-hover)] hover:text-white hover:mb-1 transition-all"><Repeat size={18} /></button>
            </div>

            {/* Meta */}
            <div className="text-sm pt-6 border-t space-y-2" style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}>
              <p className=" text-[var(--primary)] font-semibold"><span className="font-medium" style={{ color: "var(--text-main)" }}>SKU:</span> FWM15VKT</p>
              <p className=" text-[var(--primary)] font-semibold"><span className="font-medium" style={{ color: "var(--text-main)" }}>Tags:</span> Cloth, Women, Dress</p>
              <p className=" text-[var(--primary-hover)] font-semibold"><span className="font-medium" style={{ color: "var(--text-main)" }}>Availability:</span> 8 Items In Stock</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}