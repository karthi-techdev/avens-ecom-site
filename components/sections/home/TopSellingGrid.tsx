'use client';

import { useEffect } from "react";
import { useProductTypeStore } from "@/store/productTypeStore";
import URLs from "@/lib/urls";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import banner10 from '../../../public/home/banner-10.jpg';
import Link from 'next/link'; 

const TopSellingGrid = () => {

    const {
        deals,
        topSelling,
        hotReleases,
        fetchDeals,
        fetchTopSelling,
        fetchHotReleases,
        isLoading
    } = useProductTypeStore();

    useEffect(() => {
        fetchDeals();
        fetchTopSelling();
        fetchHotReleases();
    }, []);

    const listData = [
        {
            title: "Deals & Outlet",
            items: deals.filter(p => p.type === "deals")
        },
        {
            title: "Top Selling",
            items: topSelling.filter(p => p.type === "topSelling")
        },
        {
            title: "Hot Releases",
            items: hotReleases.filter(p => p.type === "hotReleases")
        }
    ];

    const getImageUrl = (img?: string) => {
        if (!img) return "/placeholder.png";

        const baseUrl = URLs.LIVEURL.endsWith("/")
            ? URLs.LIVEURL
            : `${URLs.LIVEURL}/`;

        const path = img.startsWith("/") ? img.substring(1) : img;

        return `${baseUrl}${path}`;
    };

    return (
        <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem] sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem] grid-cols-1 md:grid-cols-2 grid lg:grid-cols-[1fr_1fr_1fr_1fr] gap-[1.5rem]'>
            
            {/* Banner Section */}
            <div className='relative group bg-center h-[24rem] w-full md:h-full bg-no-repeat !ps-[2rem] !pt-[4rem] !pb-[2rem] bg-cover' style={{ backgroundImage: `url(${banner10.src})` }}>
                <div className='absolute'>
                    <h3 className='text-[0.9rem] !mb-[0.4rem] text-[var(--text-muted)]'>Big Offer</h3>
                    <h1 className='font-semibold group-hover:!ml-[0.5rem] transition-all duration-500 text-[1.3rem] w-full max-w-[10rem] !text-black leading-[1.6rem]'>Save 20% on Women's socks</h1>
                    
                    {/* Banner Shop Now Button Redirect */}
                    <Link href='/product-list' className='!mt-[0.9rem] inline-block text-[0.9rem] !text-[var(--primary)] !py-[0.5rem] capitalize rounded-sm group/icon cursor-pointer'>
                        Shop now
                        <MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem] transition-all duration-500 group-hover/icon:!ml-[0.8rem]' />
                    </Link>
                </div>
            </div>

            {/* List Data Section */}
            {listData.map((list, idx) => (
                <div key={idx} className='grid grid-cols-1 gap-[1.5rem] content-start'>
                    <h1 className="font-semibold !text-black relative before:content-[''] before:absolute before:left-0 before:bottom-0 !mb-[1rem] !pb-[0.5rem] before:w-full before:h-[0.5px] before:bg-[#dfdfdf] before:block after:content-[''] after:absolute after:block after:left-0 after:bottom-0 after:bg-[var(--primary)] after:h-[1px] after:w-[18%]">
                        {list.title}
                    </h1>
                    
                    {list.items?.slice(0, 3).map((item, i) => (
                        <div key={i} className='grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-[0.4rem] md:gap-[1rem]'>
                            <Link href={`/product-view/${item.slug}`}  className="w-[85px] h-[85px] overflow-hidden rounded-sm bg-[#f5f5f5] flex items-center justify-center cursor-pointer">
                                <img
                                    src={getImageUrl(item.thumbnail)}
                                    alt={item.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </Link>

                            <div className='!p-[0.6rem] flex flex-col justify-center'>
                                <Link href={`/product-view/${item.slug}`}  className='inline-block !text-black font-medium leading-tight hover:text-[var(--primary)] transition-colors cursor-pointer'>
                                    {item.name}
                                </Link>

                                <h5 className='text-[var(--text-muted)] mt-1'>
                                    <span className='text-[var(--primary)] font-medium !mr-[0.4rem]'>
                                        ${item.discountPrice}
                                    </span>
                                    <span className='line-through'>${item.price}</span>
                                </h5>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </section>
    );
};

export default TopSellingGrid;