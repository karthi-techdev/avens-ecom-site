'use client';
import { IoBagAddOutline, IoEyeOutline, IoHeartOutline } from "react-icons/io5";
import { FaCodeCompare } from "react-icons/fa6";
import { MdStarPurple500 } from "react-icons/md";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoHeart } from "react-icons/io5";

interface ProductCardProps {
    product: any;
    onQuickView?: () => void;
    view?: 'grid' | 'list';
}

const ProductCard = ({ product, onQuickView, view = 'grid' }: ProductCardProps) => {
    const router = useRouter();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [showRemoveAlert, setShowRemoveAlert] = useState(false);
    const badges = ["New", "Best Seller", "Trending", "Hot", "Sale"];
    const [badge, setBadge] = useState("New");
    useEffect(() => {
        const index = Math.floor(Math.random() * badges.length);
        setBadge(badges[index]);

        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const isExist = savedWishlist.some(
            (item: any) => (item._id || item.id) === (product._id || product.id)
        );
        setIsInWishlist(isExist);

    }, [product]);

    const handleAddWishlist = () => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

        const isExist = savedWishlist.find(
            (item: any) => (item._id || item.id) === (product._id || product.id)
        );

        if (!isExist) {
            savedWishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(savedWishlist));

            window.dispatchEvent(new Event("wishlistUpdated"));

            setIsInWishlist(true);

            // router.push('/wishlist'); //  redirect
        }
    };

    const handleRemoveWishlist = () => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

        const updated = savedWishlist.filter(
            (item: any) => (item._id || item.id) !== (product._id || product.id)
        );

        localStorage.setItem('wishlist', JSON.stringify(updated));
        window.dispatchEvent(new Event("wishlistUpdated"));
        setIsInWishlist(false);
        setShowRemoveAlert(true);
        setTimeout(() => setShowRemoveAlert(false), 3000);
    };
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
            {showRemoveAlert && (
                <div className="fixed top-5 right-5 z-[9999] bg-white border-l-8 border-red-500 shadow-xl p-4 rounded flex items-center gap-3">
                    {/* ICON */}
                    <div className="bg-red-100 p-3 rounded-full">
                        <svg
                            className="w-5 h-5 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    {/* TEXT */}
                    <div className="flex-1">
                        <h4 className="text-gray-900 font-bold text-sm">
                            Removed!
                        </h4>
                        <p className="text-gray-500 text-sm">
                            Item removed from wishlist.
                        </p>
                    </div>

                    {/* CLOSE BUTTON */}
                    <button
                        onClick={() => setShowRemoveAlert(false)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>
            )}
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
                    <button
                        onClick={handleAddWishlist}
                        onDoubleClick={handleRemoveWishlist}
                        className="p-3 rounded-full shadow-md transition-all duration-300 bg-white group"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "lab(67% -45.62 18.74)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "white";
                        }}
                    >
                        {isInWishlist ? (
                            <IoHeart size={20} color="red" />
                        ) : (
                            <IoHeartOutline
                                size={20}
                                style={{ color: "#7ac086" }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "#7ac086";
                                }}
                            />
                        )}
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