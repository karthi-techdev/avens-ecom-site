'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { PiLessThan, PiGreaterThan } from "react-icons/pi";
import axios from 'axios';

import "swiper/css";
import "swiper/css/navigation";

interface Category {
  _id: string;
  name: string;
  image: string;
  status: string;
  imageUrl?: string;
}

const CategoriesCarousel = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/admin/categories/');
        const BASE_URL = 'http://localhost:5000';

        const activeCategories: Category[] = res.data.data.data
          .filter(
            (c: Category) =>
              c.status?.toLowerCase() === 'active' &&
              c.image &&
              c.image.trim() !== ''
          )
          .map((c: Category) => ({
            ...c,
            imageUrl: `${BASE_URL}${c.image.startsWith('/') ? c.image : '/' + c.image}`
          }));

        setCategories(activeCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  if (!mounted || categories.length === 0) return null;

  return (
    <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem] sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem]'>

      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-[1.5rem] font-semibold !text-black'>
          <span className='text-[var(--primary)]'>Popular </span> Categories
        </h1>

        <div className='flex items-center'>
          <button className="prev-el bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem] rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> 
            <PiLessThan/> 
          </button> 
          <button className="next-el bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] rounded-full hover:bg-[var(--primary)] !p-[0.5rem] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer !ml-[0.6rem]">  
            <PiGreaterThan/> 
          </button>
        </div>
      </div>

      <div className='relative !mx-[1rem]'>
        <Swiper 
          modules={[Navigation, Autoplay]}
          loop
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          spaceBetween={20}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation={{
            nextEl: '.next-el',
            prevEl: '.prev-el'
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <div className='bg-white border flex flex-col gap-2 p-1 text-center rounded-[20px] border-[var(--green-border)] group shadow-md overflow-hidden w-[160px] h-[200px] mx-auto'>
                
         
                <div className='flex-1 overflow-hidden rounded-t-[20px]'>
                  <img 
                    src={category.imageUrl} 
                    alt={category.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/fallback.png';
                    }}
                    className='w-[150px] h-[150px] object-cover scale-100 group-hover:scale-110 transition-transform duration-700 p-2'
                  />
                </div>

                <h1 className='text-[var(--foreground)] capitalize font-semibold group-hover:text-[var(--primary)] text-sm mt-1'>
                  {category.name}
                </h1>
                    
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoriesCarousel;