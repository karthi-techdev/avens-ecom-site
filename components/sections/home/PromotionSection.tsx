'use client';

import { useEffect } from 'react';
import { usePromotionStore } from '@/store/usePromotionStore';
import URLs from '@/lib/urls';


const PromotionSection = () => {

    const { promotions, fetchPromotions, isLoading } = usePromotionStore();

    useEffect(() => {
        fetchPromotions();
    }, [fetchPromotions]);

    //  data illa na hide
    if (isLoading && promotions.length === 0) return null;
    if (!isLoading && promotions.length === 0) return null;
    console.log("promotions", promotions);
    return (
        <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem] sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem]'>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1.5rem] text-[var(--primary)]'>

                {promotions.map((promo, index) => (
                    <div
                        key={promo._id || index}
                        className='text-center hover:-translate-y-2 transition-all duration-500 border rounded-md border-[var(--green-border)] !p-[0.8rem]'
                    >

                        <div className='flex justify-center'>
                            <img
                                src={`${(URLs.LIVEURL || "").replace(/\/$/, "")}/${promo.image.replace(/^\/+/, "")}`}
                                alt={promo.name || ""}
                                className="w-[80px] h-[80px] object-contain"
                            />
                        </div>

                        <h4 className='!mt-[1rem] font-bold capitalize'>
                            {promo.name}

                        </h4>

                    </div>
                ))}

            </div>
        </section>
    );
};

export default PromotionSection;