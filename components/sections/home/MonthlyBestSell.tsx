'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { PiLessThan, PiGreaterThan } from "react-icons/pi";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/lib/constants';
import banner6 from '../../../public/home/banner-6.jpg';

const MonthlyBestSell = ({ onQuickView }: { onQuickView: () => void }) => {
    const [activeTab, setActiveTab] = useState("feature");

    return (
        <section className='bg-[var(--bg-light)] !px-[1rem] !py-[0.8rem] sm:!px-[2rem] sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[3rem]'>
            <div className='flex justify-between !mb-[1rem]'>
                <h1 className='text-[1.5rem] font-semibold !text-black !mb-[1rem]'><span className='text-[var(--primary)]'>Monthly </span> Best Sell</h1>
                <div className='grid hidden md:inline-block grid-cols-2'>
                    <button type='button' className={`${activeTab === 'feature' ? 'bg-[var(--orange-light)]' : 'bg-[var(--border-color)]'} !mr-[0.6rem] hover:-translate-y-2 transition-all duration-500 rounded-md !py-[0.4rem] !px-[1.2rem] text-[1.1rem] font-semibold capitalize text-[var(--primary)] cursor-pointer`} onClick={() => setActiveTab('feature')}>Featured</button>
                    <button type='button' className={`${activeTab === 'popular' ? 'bg-[var(--orange-light)]' : 'bg-[var(--border-color)]'} !mr-[0.6rem] hover:-translate-y-2 transition-all duration-500 rounded-md !py-[0.4rem] !px-[1.2rem] text-[1.1rem] font-semibold capitalize hover:text-[var(--primary)] cursor-pointer`} onClick={() => setActiveTab('popular')}>Popular</button>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-[1rem]'>
                <div className=' relative hidden lg:block rounded-3xl bg-center h-[20rem] !ps-[1rem] !py-[2rem]' style={{ backgroundImage: `url(${banner6.src})` }}>
                    <div className='absolute top-1/2 -translate-y-1/2 !ps-[1rem]'>
                        <h3 className=' text-[0.9rem] !mb-[0.4rem] text-[var(--text-muted)]'>Big Offer</h3>
                        <h1 className='font-semibold text-[1.3rem] w-full max-w-[10rem] !text-black leading-[1.6rem]'>Save 20% on Women's socks</h1>
                        <a href='#' className='!mt-[0.9rem] inline-block text-[0.9rem] !text-[var(--primary)] !py-[0.5rem] capitalize rounded-sm'>Shop now<MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem]' /></a>
                    </div>
                </div>
                <div className='relative w-full overflow-hidden '>
                    <div className="absolute top-[30%] left-5 -translate-y-1/2 z-10"> 
                        <button className="prev-new bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem] rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> <PiLessThan /> </button> 
                    </div> 
                    <div className="absolute top-[30%] right-5 -translate-y-1/2 z-10"> 
                        <button className="next-new bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem] rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> <PiGreaterThan /> </button> 
                    </div>
                    <Swiper 
                        modules={[Navigation, Autoplay]}
                        loop 
                        breakpoints={{
                            0: { slidesPerView: 2 },
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 3 },
                            1240: { slidesPerView: 4 },
                        }}
                        spaceBetween={10}
                        autoplay={{ delay: 2500, disableOnInteraction: true, pauseOnMouseEnter: true }}
                        navigation={{
                            nextEl: '.next-new',
                            prevEl: '.prev-new',
                        }}   
                        observer={true}
                        observeParents={true}
                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={index}>
                                <div className="p-2">
                                <ProductCard product={product} onQuickView={onQuickView} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default MonthlyBestSell;
