'use client';
import { IoBagAddOutline, IoEyeOutline, IoHeartOutline } from "react-icons/io5";
import { FaCodeCompare } from "react-icons/fa6";
import { MdStarPurple500 } from "react-icons/md";
import { useEffect, useState } from "react";
import Image from 'next/image';

interface ProductCardProps {
    product: any;
    onQuickView?: () => void;
    view?: 'grid' | 'list';
}   

const ProductCard = ({ product, onQuickView, view = 'grid' }: ProductCardProps) => {
    // console.log("🔵 CARD RECEIVED:", product);
    const badges = ["New", "Best Seller", "Trending", "Hot", "Sale"];
    const [badge, setBadge] = useState("New");
    useEffect(() => {
        const index = Math.floor(Math.random() * badges.length);
        setBadge(badges[index]);
        
    }, []);
    if (view === 'list') {
        return (
            <div className="group relative w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row p-4 sm:p-6 border border-[var(--border-color)]">
                <div className='absolute top-[5%] left-[5%]'>
                    <span className='bg-pink-500 text-white text-[0.8rem] font-semibold px-2 py-1 rounded'>
                        New
                    </span>
                </div>

                <div className="relative w-full md:w-64 aspect-square overflow-hidden rounded-xl bg-white cursor-pointer border border-[#ececec] p-3">
                    <Image
                        src={product.thumbnail}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-contain transition-all duration-700 group-hover:opacity-0 group-hover:scale-105 rounded-xl"
                    />
                    <Image
                        src={product.thumbnail}
                        alt={`${product.name} hover`}
                        width={300}
                        height={300}
                        className="absolute inset-0 w-full h-full object-contain transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                    />
                </div>

                <div className="flex-1 mt-4 md:mt-0 md:ml-8 flex flex-col justify-center">
                    <p className="text-sm text-[var(--text-muted)] mb-1">{product.categoryId?.name || "No Category"}</p>
                    <h3 className="text-lg font-bold text-[var(--text-main)] hover:text-[var(--primary)] cursor-pointer transition-colors leading-tight mb-2">
                        {product.name}
                    </h3>

                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-[var(--primary)]">${product.discountPrice}</span>
                        {product.oldPrice && <span className="text-lg text-[var(--text-muted)] line-through">${product.price}</span>}
                    </div>

                    <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                        {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et scelerisque lorem bibendum."}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <button 
                            onClick={() => console.log("Added to Cart")}
                            className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-full shadow-md transition-all hover:bg-[#29a56c] active:scale-95 flex items-center gap-2"
                        >
                            <IoBagAddOutline size={18} />
                            <span className="text-[15px] font-bold">Add to Cart</span>
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="flex text-[#ffb703] gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <MdStarPurple500 key={i} size={16} />
                                ))}
                            </div>
                            <span className="text-sm font-semibold text-[var(--text-muted)]">{product.rating}%</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='border group/card rounded-2xl border-[var(--green-border)] !p-[1rem] bg-white'>
            <div className='cursor-pointer relative rounded-md overflow-hidden'>
                <Image 
                    src={
                        product.thumbnail
                            ? `http://localhost:5000${product.thumbnail}`
                            : "/placeholder.png"
                        }
                    width={300}
                    height={300}
                    unoptimized 
                    className='w-full rounded-2xl transition-all duration-700 ease-in-out scale-100 opacity-100 group-hover/card:scale-110 group-hover/card:opacity-0' 
                    alt={product.name}
                />
                <Image 
                    src={
                        product.thumbnail
                            ? `http://localhost:5000${product.thumbnail}`
                            : "/placeholder.png"
                        }
                    width={300}
                    height={300}
                    unoptimized 
                    className='absolute inset-0 w-full h-full object-cover rounded-2xl transition-all duration-700 ease-in-out scale-110 opacity-0 group-hover/card:scale-105 group-hover/card:opacity-100'
                    alt={product.name}
                />
                <div className='absolute top-[5%] left-[5%] z-10'>
                    <span className='bg-pink-500 text-white text-[0.8rem] font-semibold px-2 py-1 rounded'>
                        {badge}
                    </span>
                </div>
                <div className='flex opacity-0 group-hover/card:opacity-100 duration-700 transition-all gap-[0.6rem] justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <button onClick={onQuickView} className="p-3 bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-full shadow-md transition-all">
                        <IoEyeOutline size={20} />
                    </button>
                    <button className="p-3 bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-full shadow-md transition-all">
                        <IoHeartOutline size={20} />
                    </button>
                    <button className="p-3 bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-full shadow-md transition-all">
                        <FaCodeCompare size={20} />
                    </button>
                </div>
            </div>
            <div className='!mt-[0.6rem]'>
                <p className='text-sm text-[var(--text-muted)]'>{product.categoryId?.name || "No Category"}</p>
                <h3 className='text-lg font-bold hover:text-[var(--primary)] transition-colors'>{product.name}</h3>
                <div className='flex justify-between items-center mt-2'>
                    <div>
                        <div className='flex text-[#ffb703]'>
                            <MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 />
                        </div>
                        <h3 className='text-lg text-[var(--primary)] font-bold'>
                            ${product.discountPrice}
                            {product.price && <span className='ml-2 line-through text-sm font-normal text-[var(--text-muted)]'>${product.price}</span>}
                        </h3>
                    </div>
                    <button className='p-3 bg-[var(--green-light)] hover:bg-[var(--primary)] text-[var(--primary)] hover:text-white rounded-full transition-all'>
                        <IoBagAddOutline size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;