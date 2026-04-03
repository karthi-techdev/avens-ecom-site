'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { PiLessThan, PiGreaterThan } from "react-icons/pi";
import ProductCard from '@/components/ui/ProductCard';
import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";

const NewArrivals = ({ onQuickView }: { onQuickView: () => void }) => {
    const { products, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts("new");
    }, [fetchProducts]);

    return (
        <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem] sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem]'>
            <div className='flex justify-between'>
                <h1 className='text-[1.5rem] font-semibold !text-black !mb-[1rem]'><span className='text-[var(--primary)]'>New </span> Arrivals</h1> 
                <div> 
                    <button className="prev-new bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem] rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> <PiLessThan/> </button> 
                    <button className="next-new bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] rounded-full hover:bg-[var(--primary)] !p-[0.5rem] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer !ml-[0.6rem]">  <PiGreaterThan/> </button>
                </div>
            </div>
            <div className='relative !mx-[1rem]'>
                <Swiper 
                    modules={[Navigation, Autoplay]}
                    loop={products.length > 6}
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                        1280: { slidesPerView: 6 },
                    }}
                    spaceBetween={30}
                    autoplay={{ 
                        delay: 2500, 
                        disableOnInteraction: false,  
                        pauseOnMouseEnter: true 
                        }}
                    navigation={{
                        nextEl: '.next-new',
                        prevEl: '.prev-new',
                    }}
                >
                    {products.map((product, index) => (
                        <SwiperSlide key={product._id}>
                            <ProductCard product={product} onQuickView={onQuickView} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default NewArrivals;
