'use client';
import { useEffect } from "react";
import { useOfferStore } from "@/store/useOfferStore";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import blog1 from '../../../public/home/blog-1.jpg';
import blog2 from '../../../public/home/blog-2.jpg';

const BlogSection = () => {
    const { offers, fetchOffers, isLoading } = useOfferStore();

    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return "";
        return imagePath.startsWith("http")
            ? imagePath
            : `${(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000").replace(/\/$/, "")}/${imagePath.replace(/^\/+/, "")}`;
    };

    const formatText = (text: string) => {
        if (!text.includes(" on ")) return text;
        const [first, second] = text.split(" on ");
        return (
            <>
                {first} on <br />
                {second}
            </>
        );
    };

    const sideOffers = offers.filter(
        item => item.banner === "Banner 2" && item.isActive
    ) || [];

    if (isLoading && sideOffers.length === 0) return null;

    return (
        <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem] md:!px-[4rem] lg:!px-[6rem] gap-[1.5rem] grid grid-cols-1 lg:grid-cols-2'>

            {/* LEFT SIDE BLOGS */}
            <div className='grid grid-cols-1 gap-[1.5rem]'>
                <h1 className='text-[1.5rem] font-semibold !text-black'>
                    <span className='text-[var(--primary)]'>From</span> blog
                </h1>
                {[blog2, blog1].map((blog, i) => (
                    <div key={i} className='grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4'>
                        <div className="overflow-hidden rounded-sm h-[150px]">
                            <img src={blog.src} alt="blog" className="w-full h-full object-cover" />
                        </div>
                        <div className='p-[0.5rem] flex flex-col justify-center'>
                            <a href='#' className='block font-medium text-[0.9rem] text-[#27d5d2]'>Fashion</a>
                            <a href='#' className='text-[1.1rem] block font-semibold leading-tight text-black my-2'>
                                Qualcomm is developing a Nintendo Switch-like console...
                            </a>
                            <div className='flex justify-between text-[0.75rem] text-gray-400'>
                                <span>4 April 2026 • 12M Views</span>
                                <a href='#' className='font-bold text-[#27d5d2]'>Read more</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT SIDE DYNAMIC BANNERS */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[1rem] auto-rows-fr'>

                {/*  1 ITEM */}
                {sideOffers.length === 1 && (
                    <div className='relative group h-[25rem] md:col-span-2 p-[2rem] rounded-sm overflow-hidden'>
                        <img
                            src={getImageUrl(sideOffers[0].image)}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt={sideOffers[0].name}
                        />
                        <div className='relative z-10'>
                            <h3 className='text-[0.85rem] text-gray-400 font-medium'>Accessories</h3>
                            <h1 className='font-bold text-[1.4rem] text-black my-2'>
                                {formatText(sideOffers[0].displayName || sideOffers[0].name)}
                            </h1>
                            <a className="!text-[var(--primary)] flex items-center text-sm font-bold">
                                Shop now <MdOutlineArrowRightAlt />
                            </a>
                        </div>
                    </div>
                )}

                {/*  2 ITEMS */}
                {sideOffers.length === 2 && (
                    <>
                        {sideOffers.map((item, i) => (
                            <div key={i} className='relative group h-full p-[1.5rem] rounded-sm overflow-hidden'>
                                <img
                                    src={getImageUrl(item.image)}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    alt={item.name}
                                />
                                <div className='relative z-10'>
                                    <h3 className='text-[0.8rem] text-gray-400 font-medium'>Big Offer</h3>
                                    <h1 className='font-bold text-[1.1rem] text-black my-1'>
                                        {formatText(item.displayName || item.name)}
                                    </h1>
                                    <a className="!text-[var(--primary)] flex items-center text-sm font-bold">
                                        Shop now <MdOutlineArrowRightAlt />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {/* 3 ITEMS */}
                {sideOffers.length >= 3 && (
                    <>
                        {/* BIG LEFT */}
                        <div className='relative group h-[25rem] p-[2rem] rounded-sm overflow-hidden'>
                            <img
                                src={getImageUrl(sideOffers[0].image)}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                alt={sideOffers[0].name}
                            />
                            <div className='relative z-10'>
                                <h3 className='text-[0.85rem] text-gray-400 font-medium'>Accessories</h3>
                                <h1 className='font-bold text-[1.4rem] text-black my-2'>
                                    {formatText(sideOffers[0].displayName || sideOffers[0].name)}
                                </h1>
                                <a className="!text-[var(--primary)] flex items-center text-sm font-bold">
                                    Shop now <MdOutlineArrowRightAlt />
                                </a>
                            </div>
                        </div>

                        {/* RIGHT STACK */}
                        <div className='grid grid-cols-1 gap-[1rem]'>
                            {sideOffers.slice(1, 3).map((item, i) => (
                                <div key={i} className='relative group h-[12rem] p-[1.5rem] rounded-sm overflow-hidden'>
                                    <img
                                        src={getImageUrl(item.image)}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        alt={item.name}
                                    />
                                    <div className='relative z-10'>
                                        <h3 className='text-[0.8rem] text-gray-400 font-medium'>Big Offer</h3>
                                        <h1 className='font-bold text-[1.1rem] text-black my-1'>
                                            {formatText(item.displayName || item.name)}
                                        </h1>
                                        <a className="!text-[var(--primary)] flex items-center text-sm font-bold">
                                            Shop now <MdOutlineArrowRightAlt />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>
        </section>
    );
};

export default BlogSection;