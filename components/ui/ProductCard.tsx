

'use client';

import { IoBagAddOutline, IoEyeOutline, IoHeartOutline } from "react-icons/io5";
import { FaCodeCompare } from "react-icons/fa6";
import { MdStarPurple500 } from "react-icons/md";
import URLs from "../../lib/urls";

interface ProductCardProps {
    product: any;
    onQuickView?: () => void;
    view?: 'grid' | 'list';
}

const ProductCard = ({ product, onQuickView, view = 'grid' }: ProductCardProps) => {

    // ✅ Dynamic Data Variables (Same for both views)
    const finalPrice = product?.discountPrice || product?.price || 0;
    const originalPrice = product?.discountPrice ? product?.price : null;
    const categoryName = product?.categoryId?.name || product?.mainCategoryId?.name || "Category";
    const rating = product?.rating || 0;

    // Helper component for tooltipped buttons
    const IconButton = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) => (
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

    // ================= LIST VIEW (STAYS UNCHANGED) =================
    if (view === 'list') {
        return (
            <div className="group relative w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row p-4 sm:p-6 border border-[var(--border-color)] hover:shadow-lg">

                {product?.badge && (
                    <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[.80rem] text-white bg-[#f74877]">
                        {product.badge}
                    </span>
                )}

                <div className="relative w-full md:w-64 aspect-square overflow-hidden rounded-xl bg-white cursor-pointer  p-3">
                    <div className="w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110">
                        <img
                            src={`${URLs.FILEURL}${product?.images?.[0]?.replace(/^\/+/, "")}`}
                            alt={product?.name || "product"}
                            className="w-full h-full object-contain "
                        />    
                        {/* <img
                            src={`${URLs.FILEURL}${product?.images?.[1]?.replace(/^\/+/, "")}`}
                            alt={product?.name || "product"}
                            className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-700 "
                        />  */}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/5">
                        <IconButton icon={IoEyeOutline} label="Quick View" onClick={onQuickView} />
                        <IconButton icon={IoHeartOutline} label="Add to Wishlist" />
                        <IconButton icon={FaCodeCompare} label="Compare" />
                    </div>
                </div>

                <div className="flex-1 mt-4 md:mt-0 md:ml-8 flex flex-col justify-center">
                    <p className="text-sm text-[var(--text-muted)] mb-1">{categoryName}</p>
                    <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--primary)]">
                        {product?.name}
                    </h3>

                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-[var(--primary)]">₹{finalPrice}</span>
                        {originalPrice && <span className="text-lg line-through text-gray-400">₹{originalPrice}</span>}
                    </div>

                    <p className="text-sm text-gray-500 mb-6 line-clamp-3">{product?.shortDescription || "No description"}</p>

                    <div className="flex items-center justify-between">
                        <button className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg flex items-center gap-2 hover:bg-[#29A56C] transition-colors">
                            <IoBagAddOutline />
                            Add to Cart
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => <MdStarPurple500 key={i} />)}
                            </div>
                            <span className="text-sm text-gray-400">{rating}%</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ================= GRID VIEW (FIXED TO BE DYNAMIC) =================
    return (
        <div className="group/card relative border border-gray-200 rounded-[20px] p-4 bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            
            {/* Dynamic Badge */}
            {product?.badge && (
                <span className="absolute top-6 left-6 z-10 bg-[#f74877] text-white px-2 py-1 text-[10px] uppercase font-bold rounded-2xl">
                    {product.badge}
                </span>
            )}

            {/* Dynamic Images (Exact logic from List View) */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-white  p-3 cursor-pointer">
                <div className="w-full h-full transition-transform duration-700 ease-in-out group-hover/card:scale-110">
                    <img
                        src={`${URLs.FILEURL}${product?.images?.[0]?.replace(/^\/+/, "")}`}
                        alt={product?.name || "product"}
                        className="w-full h-full object-contain rounded-[20px]"
                    />    
                    {/* {product?.images?.[1] && (
                        <img
                            src={`${URLs.FILEURL}${product?.images?.[1]?.replace(/^\/+/, "")}`}
                            alt={product?.name || "product"}
                            className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 rounded-[20px]"
                        /> 
                    )} */}
                </div>

                {/* Hover Icons */}
                <div className="absolute inset-0 flex justify-center items-center gap-2 opacity-0 group-hover/card:opacity-100 transition-all duration-300 bg-black/5">
                    <IconButton icon={IoEyeOutline} label="Quick View" onClick={onQuickView} />
                    <IconButton icon={IoHeartOutline} label="Wishlist" />
                    <IconButton icon={FaCodeCompare} label="Compare" />
                </div>
            </div>

            {/* Content Section */}
            <div className="mt-3 flex flex-col flex-1">
                <p className="text-[12px] text-gray-400">{categoryName}</p>
                <h3 className="font-bold text-[15px] leading-tight transition-colors duration-300 group-hover/card:text-[var(--primary)] line-clamp-2 min-h-[40px] mt-1">
                    {product?.name}
                </h3>
                
                {/* Dynamic Rating */}
                <div className="flex items-center gap-1 mt-1">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                             <MdStarPurple500 key={i} size={14} className={i < 4 ? "text-yellow-400" : "text-gray-200"} />
                        ))}
                    </div>
                    <span className="text-[12px] text-gray-400">({rating}%)</span>
                </div>

                {/* Price and Cart */}
                <div className="flex justify-between items-center mt-auto pt-3">
                    <div className="flex flex-col">
                        <span className="font-bold text-[18px] text-[var(--primary)]">
                            ₹{finalPrice}
                        </span>
                        {originalPrice && (
                            <span className="line-through text-[13px] text-gray-400">
                                ₹{originalPrice}
                            </span>
                        )}
                    </div>
                    <button className="p-2.5 bg-[#DEF9EC] text-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all duration-300">
                        <IoBagAddOutline size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;