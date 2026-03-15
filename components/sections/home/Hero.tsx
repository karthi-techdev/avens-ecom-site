'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { PiLessThan, PiGreaterThan } from "react-icons/pi";
import slide1 from '../../../public/home/download.png'
import slide2 from '../../../public/home/slider-2.png'
import slide3 from '../../../public/home/slider-3.png'

const Hero = () => {
    const slides = [
        { name: "slide 1", img: slide1.src },
        { name: "Slide 2", img: slide2.src },
        { name: "Slide 3", img: slide3.src },
    ];

    return (
        <main className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem] relative'>
            <Swiper 
                modules={[Navigation, Autoplay, Pagination]}
                loop 
                slidesPerView={1}
                spaceBetween={0}
                autoplay={{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true }}
                navigation={{
                    nextEl: '.next-new',
                    prevEl: '.prev-new',
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                observer={true} 
                observeParents={true}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className='grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] justify-between '>
                            <div className='flex items-center justify-center lg:justify-start'>
                                <div className='text-center lg:text-left'>
                                    <h3 className='text-[1.2rem] sm:text-[1.4rem] md:text-[1.7rem] lg:text-[2rem] !pb-[1rem] font-semibold'>Trade-in offer</h3>
                                    <h1 className=' text-[2rem] sm:text-[2.5rem]  md:text-[3rem] lg:text-[3.5rem] font-bold leading-[1.9rem]'>Super value deals</h1>
                                    <h1 className='text-[var(--primary)] text-[2rem] sm:text-[2.5rem]  md:text-[3rem] lg:text-[3.5rem] font-bold'>On all products</h1>
                                    <h4 className='text-semibold text-[1.1rem]'>Save more with coupons & upto 70% off</h4>
                                    <button type='button' className='text-[var(--primary)] !ms-[1.5rem] capitalize !mt-[1rem] font-semibold cursor-pointer bg-[var(--border-color)] !mb-[1rem] lg:!mb-[0rem] !px-[1rem] !py-[0.4rem] rounded-md'>Shop now</button>
                                </div>
                            </div>
                            <div>
                                <img src={slide.img} className='w-full h-full object-contain' alt={slide.name} />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="text-center flex justify-center  gap-[0.7rem] !mt-[0.6rem]"> 
                    <button className="prev-new bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem]  rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> 
                        <PiLessThan /> 
                    </button> 
                    <button className="next-new  bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem]  rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> 
                        <PiGreaterThan /> 
                    </button> 
                </div>
            </Swiper>
        </main>
    );
};

export default Hero;
