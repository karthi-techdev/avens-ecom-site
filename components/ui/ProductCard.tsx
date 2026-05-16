
'use client';

import Link from 'next/link';
import { useRouter } from "next/navigation";

import {
    IoBagAddOutline,
    IoEyeOutline,
    IoHeartOutline
} from "react-icons/io5";

import { FaCodeCompare } from "react-icons/fa6";

import { MdStarPurple500 } from "react-icons/md";

import URLs from "../../lib/urls";

import { useEffect, useState } from "react";

import { useCartStore } from "@/store/cartStore";

import { useWishlistStore } from "../../store/useWishlistStore";

import {
    toast,
    Bounce
} from "react-toastify";

interface ProductCardProps {
    product: any;
    onQuickView?: () => void;
    view?: 'grid' | 'list';
}

const ProductCard = ({
    product,
    onQuickView,
    view = 'grid'
}: ProductCardProps) => {

    const router = useRouter();

    const finalPrice =
        product?.discountPrice ||
        product?.price ||
        0;

    const originalPrice =
        product?.discountPrice
            ? product?.price
            : null;

    const categoryName =
        product?.categoryId?.name ||
        product?.mainCategoryId?.name ||
        "Category";

    const detailUrl =
        `/product-view/${product?.slug}`;

    const [token, setToken] =
        useState<any>(null);

    // Rating states
    const [avgRating, setAvgRating] =
        useState<number>(0);

    const [totalReviews, setTotalReviews] =
        useState<number>(0);

    const {
        addCart,
        getAllCart
    } = useCartStore();

    const {
        addWishlist
    } = useWishlistStore();

    useEffect(() => {

        const user = JSON.parse(
            localStorage.getItem("user") || "null"
        );

        setToken(user);

        // Calculate Rating
        const calculateRating = () => {

            const savedData =
                localStorage.getItem(
                    "app_product_reviews"
                );

            if (
                savedData &&
                product?._id
            ) {

                const allReviews: any[] =
                    JSON.parse(savedData);

                const productReviews =
                    allReviews.filter(
                        (r) =>
                            r.productId === product._id
                    );

                if (
                    productReviews.length > 0
                ) {

                    const sum =
                        productReviews.reduce(
                            (acc, rev) =>
                                acc + rev.rating,
                            0
                        );

                    setAvgRating(
                        sum /
                        productReviews.length
                    );

                    setTotalReviews(
                        productReviews.length
                    );

                } else {

                    setAvgRating(
                        product?.rating || 0
                    );

                    setTotalReviews(0);
                }

            } else {

                setAvgRating(
                    product?.rating || 0
                );
            }
        };

        calculateRating();

        window.addEventListener(
            'storage',
            calculateRating
        );

        return () =>
            window.removeEventListener(
                'storage',
                calculateRating
            );

    }, [product?._id, product?.rating]);

    // Add To Wishlist
    const addToWishlist = async (
        e: React.MouseEvent
    ) => {

        e.preventDefault();

        e.stopPropagation();

        // Check Login
        if (!token?._id) {

            toast.warning(
                "Please login to add wishlist"
            );

            setTimeout(() => {
                router.push("/login");
            }, 1000);

            return;
        }

        try {

            addWishlist(product);

            toast.success(
                'Added to Wishlist!'
            );

        } catch (error: any) {

            toast.info(
                error.message ||
                "Already in wishlist"
            );
        }
    };

    // Add To Cart
    const addToCart = async (
        e?: React.MouseEvent
    ) => {

        if (e) {

            e.preventDefault();

            e.stopPropagation();
        }

        if (!token?._id) {

            toast.warn(
                'Please login first'
            );

            setTimeout(() => {
                router.push("/login");
            }, 1000);

            return;
        }

        try {

            await addCart({

                quantity: 1,

                selectedColor:
                    product.colors?.[0] || null,

                selectedSize:
                    product.size || null,

                totalPrice:
                    product.price -
                    (
                        product.price *
                        (
                            product.discountPrice / 100
                        )
                    ),

                product,

                userId: token._id
            });

            await getAllCart(token._id);

            toast.success(
                'Added to cart!',
                {
                    transition: Bounce
                }
            );

        } catch (error: any) {

            toast.warn(error.message);
        }
    };

    const IconButton = ({
        icon: Icon,
        label,
        onClick
    }: {
        icon: any,
        label: string,
        onClick?: (e: any) => void
    }) => (

        <div className="relative group/tooltip">

            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[var(--primary)]">
                {label}
            </span>

            <button
                onClick={onClick}
                className="w-9 h-9 flex items-center justify-center bg-white text-[var(--primary)] rounded-full border border-[#BCE3C9] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 shadow-sm"
            >
                <Icon size={18} />
            </button>

        </div>
    );

    // LIST VIEW
    if (view === 'list') {

        return (

            <div className="group relative w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row p-4 sm:p-6 border border-[var(--border-color)] hover:shadow-lg">

                {product?.badge && (
                    <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[.80rem] text-white bg-[#f74877]">
                        {product.badge}
                    </span>
                )}

                <Link
                    href={detailUrl}
                    className="relative w-full md:w-64 aspect-square overflow-hidden rounded-xl bg-white cursor-pointer p-3"
                >

                    <div className="w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110">

                        <img
                            src={`${URLs.FILEURL}${product?.images?.[0]?.replace(/^\/+/, "")}`}
                            alt={product?.name || "product"}
                            className="w-full h-full object-contain"
                        />

                    </div>

                    <div
                        className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/5"
                        onClick={(e) => e.preventDefault()}
                    >

                        <IconButton
                            icon={IoEyeOutline}
                            label="Quick View"
                            onClick={onQuickView}
                        />

                        <IconButton
                            icon={IoHeartOutline}
                            label="Wishlist"
                            onClick={addToWishlist}
                        />

                        <IconButton
                            icon={FaCodeCompare}
                            label="Compare"
                        />

                    </div>

                </Link>

                <div className="flex-1 mt-4 md:mt-0 md:ml-8 flex flex-col justify-center">

                    <p className="text-sm text-[var(--text-muted)] mb-1">
                        {categoryName}
                    </p>

                    <Link href={detailUrl}>
                        <h3 className="text-xl font-bold mb-2 transition-colors duration-300 hover:text-[var(--primary)]">
                            {product?.name}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-3 mb-4">

                        <span className="text-2xl font-bold text-[var(--primary)]">
                            ₹{finalPrice}
                        </span>

                        {originalPrice && (
                            <span className="text-lg line-through text-gray-400">
                                ₹{originalPrice}
                            </span>
                        )}

                    </div>

                    <p className="text-sm text-gray-500 mb-6 line-clamp-3">
                        {product?.shortDescription || "No description"}
                    </p>

                    <div className="flex items-center justify-between">

                        <button
                            className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg flex items-center gap-2 hover:bg-[#29A56C] transition-colors"
                            onClick={addToCart}
                        >

                            <IoBagAddOutline />

                            Add to Cart

                        </button>

                    </div>

                </div>

            </div>
        );
    }

    // GRID VIEW
    return (

        <div className="group/card relative border border-gray-200 rounded-[20px] p-4 bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col">

            <div className="relative aspect-square overflow-hidden rounded-xl bg-white p-3 cursor-pointer">

                <Link href={detailUrl}>

                    <div className="w-full h-full transition-transform duration-700 ease-in-out group-hover/card:scale-110">

                        <img
                            src={`${URLs.FILEURL}${product?.images?.[0]?.replace(/^\/+/, "")}`}
                            alt={product?.name || "product"}
                            className="w-full h-full object-contain rounded-[20px]"
                        />

                    </div>

                </Link>

                <div className="absolute inset-0 flex justify-center items-center gap-2 opacity-0 group-hover/card:opacity-100 transition-all duration-300 bg-black/5">

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex gap-2"
                    >

                        <IconButton
                            icon={IoEyeOutline}
                            label="Quick View"
                            onClick={onQuickView}
                        />

                        <IconButton
                            icon={IoHeartOutline}
                            label="Wishlist"
                            onClick={addToWishlist}
                        />

                        <IconButton
                            icon={FaCodeCompare}
                            label="Compare"
                        />

                    </div>

                </div>

            </div>

            <div className="mt-3 flex flex-col flex-1">

                <p className="text-[12px] text-gray-400">
                    {categoryName}
                </p>

                <Link href={detailUrl}>

                    <h3 className="font-bold text-[15px] leading-tight transition-colors duration-300 hover:text-[var(--primary)] line-clamp-2 min-h-[40px] mt-1">
                        {product?.name}
                    </h3>

                </Link>

                <div className="flex justify-between items-center mt-auto pt-3">

                    <div className="flex flex-col">

                        <span className="font-bold text-[18px] text-[var(--primary)]">
                            ₹{finalPrice}
                        </span>

                    </div>

                    <button
                        className="p-2.5 bg-[#DEF9EC] text-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
                        onClick={addToCart}
                    >

                        <IoBagAddOutline size={20} />

                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductCard;