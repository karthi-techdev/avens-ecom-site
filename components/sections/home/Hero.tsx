'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { PiLessThan, PiGreaterThan } from "react-icons/pi";
import axios from 'axios';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Slider {
  _id: string;
  title: string;
  highlightsText: string;
  buttonName: string;
  buttonUrl: string;
  image: string;
  serialNumber: number;
  status: 'active' | 'inactive';
  imageUrl?: string;
}

const Hero = () => {

  const [slides, setSlides] = useState<Slider[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {

    const fetchSliders = async () => {
      try {

        const res = await axios.get('http://localhost:5000/api/v1/admin/sliders/');
        const BASE_URL = 'http://localhost:5000';

        const sliderData: Slider[] = res.data.data.data
          .filter((s: Slider) => s.status === 'active')
          .map((s: Slider) => ({
            ...s,
            imageUrl: `${BASE_URL}${s.image.startsWith('/') ? s.image : '/' + s.image}`
          }))
          .sort((a: Slider, b: Slider) => a.serialNumber - b.serialNumber);

        setSlides(sliderData);

      } catch (err) {
        console.error(err);
      }
    };

    fetchSliders();

  }, []);

  if (!mounted) return null;

  return (

    <main className='relative px-[1rem] py-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[6rem]'>

      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        loop={true}
        slidesPerView={1}
        speed={700}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        navigation={{
          nextEl: '.next-arrow',
          prevEl: '.prev-arrow'
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
      >

        {slides.map((slide) => (

          <SwiperSlide key={slide._id}>

            <div className='grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] items-center'>

              <div className='flex items-center justify-center md:justify-start'>
                <div className='text-center md:text-left'>

                  <h3 className='text-[1.3rem] md:text-[1.8rem] font-semibold pb-4'>
                    {slide.title}
                  </h3>

                  <h1 className='text-[var(--primary)] text-[2rem] md:text-[3.2rem] font-bold'>
                    {slide.highlightsText}
                  </h1>

                  {slide.buttonName && slide.buttonUrl && (

                    <a
                      href={slide.buttonUrl}
                      className="relative inline-flex items-center justify-center px-8 py-3 mt-6 rounded-[28px] 
                      bg-gray-900 text-white font-semibold text-base
                      border border-white/25
                      shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_2px_2px_rgba(255,255,255,0.15),
                      inset_0_4px_4px_rgba(255,255,255,0.1),inset_0_8px_8px_rgba(255,255,255,0.05),
                      0_2px_4px_rgba(0,0,0,0.2)]"
                    >

                      <span className="relative z-10 text-white">
                        {slide.buttonName}
                      </span>

                      <span className="absolute inset-0 rounded-[28px] pointer-events-none
                      bg-gradient-to-b from-white/10 to-black/10 mix-blend-overlay"></span>

                    </a>

                  )}

                </div>
              </div>

              <div className='relative flex justify-center items-center h-[420px]'>

                <div className='absolute w-[300px] h-[300px] bg-[var(--green-light)] rounded-[50%_40%_60%_50%] rotate-12 -top-8 -right-10 opacity-20'></div>

                <div className='absolute w-[250px] h-[250px] bg-[var(--primary)] rounded-[60%_50%_50%_60%] -bottom-6 -left-12 opacity-10 rotate-6'></div>

                <div className='absolute w-[180px] h-[180px] bg-pink-300 rounded-[50%_60%_40%_50%] -top-16 -left-6 opacity-15'></div>

                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className='w-[80%] h-[80%] object-cover relative z-10 rounded-[50%_40%_60%_50%] shadow-lg'
                />

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

      <button className="prev-arrow absolute left-0 top-1/2 -translate-y-1/2 z-20
      bg-[var(--green-light)] border border-[var(--green-border)] 
      text-[var(--primary)] p-3 rounded-full
      hover:bg-[var(--primary)] hover:text-white
      transition-all duration-500 cursor-pointer">

        <PiLessThan size={22}/>

      </button>

      <button className="next-arrow absolute right-0 top-1/2 -translate-y-1/2 z-20
      bg-[var(--green-light)] border border-[var(--green-border)] 
      text-[var(--primary)] p-3 rounded-full
      hover:bg-[var(--primary)] hover:text-white
      transition-all duration-100 cursor-pointer">

        <PiGreaterThan size={22}/>

      </button>

    </main>

  );

};

export default Hero;