'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

const ClientsCarousel = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const logos = [
        "/about/logo-5.png",
        "/about/logo-6.png",
        "/about/logo-4.png",
        "/about/logo-1.png",
        "/about/logo-2.png",
        "/about/logo-3.png",
        "/about/logo-4.png",
    ];

    return (
        <div className="!mt-15">
            <div className="flex justify-center items-center">
                <div className="border border-[var(--primary)] rounded-lg !px-4 !py-2.5 text-lg text-white font-bold bg-[var(--primary)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">View more</div>
            </div>
            <div className="text-center !mt-8 !mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-3xl font-semibold tracking-wider !mb-3">
                    <span className="text-[var(--primary)]">Featured</span>{' '}
                    <span className="text-[var(--text-main)]">Clients</span>
                </h2>
            </div>
            <div className="!mt-10 !mb-10">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    speed={1000}
                    autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 },
                    }}
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    onMouseEnter={() => { swiperRef.current?.autoplay?.stop(); }}
                    onMouseLeave={() => { swiperRef.current?.autoplay?.start(); }}
                >
                    {logos.map((logo, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="flex justify-center items-center">
                                <img src={logo} alt={`client-logo-${idx}`} className="w-auto h-auto opacity-60 brightness-75 hover:opacity-100 hover:brightness-100 transition-all duration-500 hover:scale-105 cursor-pointer" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ClientsCarousel;
