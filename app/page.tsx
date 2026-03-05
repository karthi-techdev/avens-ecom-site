"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="w-full h-[90vh]"
    >
      <SwiperSlide>
        <div className="flex items-center px-20 h-[90vh] bg-[#f5f5f5]">

          <div className="w-2/5">
            <p className="text-gray-400 text-lg mb-4">
              Hot promotions
            </p>

            <h1 className="text-6xl font-bold leading-tight mb-6">
              Big Deals From <br />
              <span className="text-[var(--primary)]">Manufacturer</span>
            </h1>

            <p className="text-gray-500 mb-6">
              Clothing, Shoes, Bags, Wallets...
            </p>

            <button className="bg-pink-200 px-8 py-3 rounded-full cursor-pointer font-semibold hover:bg-pink-300 transition">
              Shop Now
            </button>
          </div>

          <div className="relative w-3/5 h-[700px]">
            <Image
              src="/slider-1.png"
              alt="Slider 1"
              fill
              className="object-contain"
              priority
            />
          </div>

        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex items-center px-20 h-[90vh] bg-[#f2f2f2]">

          <div className="w-2/5">
            <p className="text-gray-400 text-lg mb-4">
              Trade-in offer
            </p>

            <h1 className="text-6xl font-bold leading-tight mb-6">
              Supper value deals <br />
              <span className="text-[var(--primary)]">On all products</span>
            </h1>

            <p className="text-gray-500 mb-6">
              Save more with coupons & up to 70% off
            </p>

            <button className="bg-yellow-200 px-8 py-3 rounded-full cursor-pointer font-semibold hover:bg-yellow-300 transition">
              Shop Now
            </button>
          </div>

          <div className="relative w-3/5 h-[700px]">
            <Image
              src="/slider-2.png"
              alt="Slider 2"
              fill
              className="object-contain"
            />
          </div>

        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="flex items-center px-20 h-[90vh] bg-[#f2f2f2]">

          <div className="w-2/5">
            <p className="text-gray-400 text-lg mb-4">
              Upcoming Offer
            </p>

            <h1 className="text-6xl font-bold leading-tight mb-6">
              Big Deals From <br />
              <span className="text-[var(--primary)]">Manufacturer</span>
            </h1>

            <p className="text-gray-500 mb-6">
              Clothing, Shoes, Bags, Wallets...
            </p>

            <button className="bg-yellow-200 px-8 py-3 rounded-full cursor-pointer font-semibold hover:bg-yellow-300 transition">
              Shop Now
            </button>
          </div>

          <div className="relative w-3/5 h-[700px]">
            <Image
              src="/slider-3.png"
              alt="Slider 2"
              fill
              className="object-contain"
            />
          </div>

        </div>
      </SwiperSlide>
    </Swiper>
  );
}
