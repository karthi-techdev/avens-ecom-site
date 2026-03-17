'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { PiLessThan, PiGreaterThan } from "react-icons/pi";
import { categories } from '@/lib/constants';

const CategoriesCarousel = () => {
    return (
        <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem] sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem]'>
            <div className='flex justify-between'>
                <h1 className='text-[1.5rem] font-semibold !text-black !mb-[1rem]'><span className='text-[var(--primary)]'>Popular </span> Categories</h1>
                <div className=""> 
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
                    spaceBetween={30}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    navigation={{
                        nextEl: '.next-el',
                        prevEl: '.prev-el'
                    }}
                >
                    {categories.map((category, index) => (
                        <SwiperSlide key={index}>
                            <a href='#' className='group'>
                                <div className='border flex flex-col gap-[0.6rem] !p-[0.6rem] text-center rounded-lg border-[var(--green-border)] '>
                                    <div className='overflow-hidden'>
                                        <img src={category.logo} alt={category.name} className='rounded-lg h-full w-full object-contain scale-100 group-hover:scale-110 transition-all duration-700'/>
                                    </div>
                                    <h1 className='text-[var(--foreground)] capitalize font-semibold group-hover:text-[var(--primary)]'>{category.name}</h1>
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default CategoriesCarousel;
