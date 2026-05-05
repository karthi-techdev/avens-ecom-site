'use client';

import { useEffect } from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useOfferStore } from "@/store/useOfferStore";
import Link from "next/link"; 

const OfferBoxes = () => {
    const { offers, fetchOffers, isLoading } = useOfferStore();

    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return "";
        if (imagePath.startsWith("http")) return imagePath;

        const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000").replace(/\/$/, "");
        const cleanPath = imagePath.replace(/^\/+/, "");

        return `${baseUrl}/${cleanPath}`;
    };

    const filteredOffers = offers.filter(
        item => item.banner === "Banner 1" && item.isActive === true
    );

    if (!isLoading && filteredOffers.length === 0) return null;

    return (
        <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem] sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem]'>

            {/*  DYNAMIC GRID */}
            <div className={`
                grid gap-[2rem]
                ${filteredOffers.length === 1 ? 'grid-cols-1' : ''}
                ${filteredOffers.length === 2 ? 'grid-cols-1 md:grid-cols-2' : ''}
                ${filteredOffers.length >= 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
            `}>

                {filteredOffers.slice(0, 3).map((item: any, index: number) => {

                    const words = (item.displayName || item.name || "").split(" ");
                    const mid = Math.ceil(words.length / 2);
                    const firstLine = words.slice(0, mid).join(" ");
                    const secondLine = words.slice(mid).join(" ");

                    const bgColors = ["#fceef5", "#ebf2f7", "#fff6eb"];

                    return (
                        <div
                            key={index}
                            className={`
                                relative group overflow-hidden rounded-sm p-[1.5rem] flex items-center
                                ${filteredOffers.length === 1 ? 'h-[14rem]' : 'h-[11rem]'}
                            `}
                            style={{ backgroundColor: bgColors[index % bgColors.length] }}
                        >

                            {/* IMAGE */}
                            <img
                                src={getImageUrl(item.image)}
                                alt={item.name || "offer"}
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* TEXT */}
                            <div className='relative z-10 w-[60%]'>
                                <h3 className='text-[0.85rem] text-[var(--text-muted)]'>
                                    Smart Offer
                                </h3>

                                <h1 className='font-semibold text-[1.2rem] !text-black'>
                                    {firstLine}
                                </h1>

                                <h1 className='font-semibold text-[1.2rem] !text-black'>
                                    {secondLine}
                                </h1>

                                
                                <Link
                                    href={`/product-list?offerId=${item._id || item.id}`}
                                    className="font-bold text-[0.8rem] !text-[var(--primary)] flex items-center cursor-pointer"
                                >
                                    Shop now <MdOutlineArrowRightAlt className="ml-1" />
                                </Link>
                            </div>

                        </div>
                    );
                })}
            </div>

        </section>
    );
};

export default OfferBoxes;