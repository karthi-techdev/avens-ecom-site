'use client';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { PiLessThan, PiGreaterThan } from "react-icons/pi";
import { useBrandStore } from '@/store/useBrandStore';
import URLs from '@/lib/urls';

const BrandsCarousel = () => {
    const { brands, fetchBrands, isLoading } = useBrandStore();

    useEffect(() => {
        fetchBrands();
    }, [fetchBrands]);

    // If loading and no brands, show nothing or skeleton
    if (isLoading && brands.length === 0) {
        return null; // Hide while loading if no cached data 
    }

    // Hide section completely if no brands are found after loading
    if (!isLoading && brands.length === 0) {
        return null;
    }

    return (
        <section className="!px-[1rem] !py-[0.8rem] sm:!px-[2rem] sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem]">
            <div className='flex justify-between'>
                <h1 className='text-[1.5rem] font-semibold !text-black !mb-[1rem]'><span className='text-[var(--primary)]'>Featured </span> Brands</h1>
                <div className="">
                    <button className="custom-prev bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem] rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> <PiLessThan /> </button>
                    <button className="custom-next bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] rounded-full hover:bg-[var(--primary)] !p-[0.5rem] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer !ml-[0.6rem]"> <PiGreaterThan /> </button>
                </div>
            </div>
            <div className="relative !mx-[1rem]">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                        1280: { slidesPerView: 5 },
                    }}
                    spaceBetween={20}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    loop={brands.length > 5}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                >
                    {brands.map((brand, idx) => {
                        // Ensure no double slashes when joining LIVEURL and path
                        const baseUrl = URLs.LIVEURL.endsWith('/') ? URLs.LIVEURL : `${URLs.LIVEURL}/`;
                        const path = brand.image?.startsWith('/') ? brand.image.substring(1) : brand.image;
                        const src = brand.image ? `${baseUrl}${path}` : '/placeholder-brand.png';

                        return (
                            <SwiperSlide key={brand._id || idx}>
                                <img
                                    src={src}
                                    alt={brand.name}
                                    className="h-[6.5rem] mx-auto object-contain grayscale-100 hover:grayscale-0 cursor-pointer transition-all duration-700 w-[14rem]"
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
};

export default BrandsCarousel;
