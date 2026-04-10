// 'use client';
// import { IoBagAddOutline, IoEyeOutline, IoHeartOutline } from "react-icons/io5";
// import { FaCodeCompare } from "react-icons/fa6";
// import { MdStarPurple500 } from "react-icons/md";
// import Image from 'next/image';

// interface ProductCardProps {
//     product: any;
//     onQuickView?: () => void;
//     view?: 'grid' | 'list';
// }

// const ProductCard = ({ product, onQuickView, view = 'grid' }: ProductCardProps) => {
//     if (view === 'list') {
//         return (
//             <div className="group relative w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row p-4 sm:p-6 border border-[var(--border-color)]">
//                 {product.badge && (
//                     <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[.80rem] text-white bg-[var(--primary)]">
//                         {product.badge}
//                     </span>
//                 )}

//                 <div className="relative w-full md:w-64 aspect-square overflow-hidden rounded-xl bg-white cursor-pointer border border-[#ececec] p-3">
//                     <Image
//                         src={product.img1}
//                         alt={product.name}
//                         width={300}
//                         height={300}
//                         className="w-full h-full object-contain transition-all duration-700 group-hover:opacity-0 group-hover:scale-105 rounded-xl"
//                     />
//                     <Image
//                         src={product.img2 || product.img1}
//                         alt={`${product.name} hover`}
//                         width={300}
//                         height={300}
//                         className="absolute inset-0 w-full h-full object-contain transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
//                     />
//                 </div>

//                 <div className="flex-1 mt-4 md:mt-0 md:ml-8 flex flex-col justify-center">
//                     <p className="text-sm text-[var(--text-muted)] mb-1">{product.category}</p>
//                     <h3 className="text-lg font-bold text-[var(--text-main)] hover:text-[var(--primary)] cursor-pointer transition-colors leading-tight mb-2">
//                         {product.name}
//                     </h3>

//                     <div className="flex items-center gap-3 mb-4">
//                         <span className="text-2xl font-bold text-[var(--primary)]">${product.price}</span>
//                         {product.oldPrice && <span className="text-lg text-[var(--text-muted)] line-through">${product.oldPrice}</span>}
//                     </div>

//                     <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
//                         {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et scelerisque lorem bibendum."}
//                     </p>

//                     <div className="flex flex-wrap items-center justify-between gap-4">
//                         <button 
//                             onClick={() => console.log("Added to Cart")}
//                             className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-full shadow-md transition-all hover:bg-[#29a56c] active:scale-95 flex items-center gap-2"
//                         >
//                             <IoBagAddOutline size={18} />
//                             <span className="text-[15px] font-bold">Add to Cart</span>
//                         </button>

//                         <div className="flex items-center gap-4">
//                             <div className="flex text-[#ffb703] gap-1">
//                                 {[...Array(5)].map((_, i) => (
//                                     <MdStarPurple500 key={i} size={16} />
//                                 ))}
//                             </div>
//                             <span className="text-sm font-semibold text-[var(--text-muted)]">{product.rating}%</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className='border group/card rounded-2xl border-[var(--green-border)] !p-[1rem] bg-white'>
//             <div className='cursor-pointer relative rounded-md overflow-hidden'>
//                 <Image 
//                     src={product.img1} 
//                     width={300}
//                     height={300}
//                     className='w-full rounded-2xl transition-all duration-700 ease-in-out scale-100 opacity-100 group-hover/card:scale-110 group-hover/card:opacity-0' 
//                     alt={product.name}
//                 />
//                 <Image 
//                     src={product.img2 || product.img1} 
//                     width={300}
//                     height={300}
//                     className='absolute inset-0 w-full h-full object-cover rounded-2xl transition-all duration-700 ease-in-out scale-110 opacity-0 group-hover/card:scale-105 group-hover/card:opacity-100'
//                     alt={product.name}
//                 />
//                 {product.badge && (
//                     <div className='absolute top-[5%] left-[5%]'>
//                         <span className='bg-[var(--pink-dark)] text-[var(--white)] text-[0.9rem] font-semibold !py-[0.1rem] rounded-lg !px-[0.6rem] cursor-text'>{product.badge}</span>
//                     </div>
//                 )}
//                 <div className='flex opacity-0 group-hover/card:opacity-100 duration-700 transition-all gap-[0.6rem] justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
//                     <button onClick={onQuickView} className="p-3 bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-full shadow-md transition-all">
//                         <IoEyeOutline size={20} />
//                     </button>
//                     <button className="p-3 bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-full shadow-md transition-all">
//                         <IoHeartOutline size={20} />
//                     </button>
//                     <button className="p-3 bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-full shadow-md transition-all">
//                         <FaCodeCompare size={20} />
//                     </button>
//                 </div>
//             </div>
//             <div className='!mt-[0.6rem]'>
//                 <p className='text-sm text-[var(--text-muted)]'>{product.category}</p>
//                 <h3 className='text-lg font-bold hover:text-[var(--primary)] transition-colors'>{product.name}</h3>
//                 <div className='flex justify-between items-center mt-2'>
//                     <div>
//                         <div className='flex text-[#ffb703]'>
//                             <MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 />
//                         </div>
//                         <h3 className='text-lg text-[var(--primary)] font-bold'>
//                             ${product.price}
//                             {product.oldPrice && <span className='ml-2 line-through text-sm font-normal text-[var(--text-muted)]'>${product.oldPrice}</span>}
//                         </h3>
//                     </div>
//                     <button className='p-3 bg-[var(--green-light)] hover:bg-[var(--primary)] text-[var(--primary)] hover:text-white rounded-full transition-all'>
//                         <IoBagAddOutline size={20} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;


// 'use client';

// import { IoBagAddOutline, IoEyeOutline, IoHeartOutline } from "react-icons/io5";
// import { FaCodeCompare } from "react-icons/fa6";
// import { MdStarPurple500 } from "react-icons/md";
// import Image from 'next/image';
// import URLs from "../../lib/urls";
// interface ProductCardProps {
//     product: any;
//     onQuickView?: () => void;
//     view?: 'grid' | 'list';
// }

// const ProductCard = ({ product, onQuickView, view = 'grid' }: ProductCardProps) => {

//     const BASE_URL = "http://localhost:5000";

//     const mainImage =
//         product?.thumbnail
//             ? BASE_URL + product.thumbnail
//             : product?.images?.[0]
//             ? BASE_URL + product.images[0]
//             : "/no-image.png";
//     const hoverImage =
//         product?.images?.[1]
//             ? BASE_URL + product.images[1]
//             : mainImage;
//     const finalPrice = product?.discountPrice || product?.price || 0;
//     const originalPrice = product?.discountPrice ? product?.price : null;
//     const categoryName = product?.categoryId?.name || "Category";
//     const rating = product?.rating || 0;
//     console.log("product",product)
//     if (view === 'list') {
//         return (
//             <div className="group relative w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row p-4 sm:p-6 border border-[var(--border-color)]">

//                 {product?.badge && (
//                     <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[.80rem] text-white bg-[var(--primary)]">
//                         {product.badge}
//                     </span>
//                 )}

//                 <div className="relative w-full md:w-64 aspect-square overflow-hidden rounded-xl bg-white cursor-pointer border p-3">
//                     <img
//                         src={`${URLs.FILEURL}${product?.images?.[0].replace(/^\/+/, "")}`}
//                         alt={product?.name || "product"}
//                         className="w-full h-full object-cover"
//                     />    
//                     <img
//                         src={`${URLs.FILEURL}${product?.images?.[1].replace(/^\/+/, "")}`}
//                         alt={product?.name || "product"}
//                         className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-all duration-700"
//                     /> 
//                     {/* <Image
//                         src={hoverImage}
//                         alt="hover"
//                         width={300}
//                         height={300}
//                         className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-all duration-700"
//                     /> */}
//                 </div>

//                 <div className="flex-1 mt-4 md:mt-0 md:ml-8 flex flex-col justify-center">

//                     <p className="text-sm text-[var(--text-muted)] mb-1">
//                         {categoryName}
//                     </p>

//                     <h3 className="text-lg font-bold mb-2">
//                         {product?.name}
//                     </h3>

//                     <div className="flex items-center gap-3 mb-4">
//                         <span className="text-2xl font-bold text-[var(--primary)]">
//                             ₹{finalPrice}
//                         </span>
//                         {originalPrice && (
//                             <span className="text-lg line-through text-gray-400">
//                                 ₹{originalPrice}
//                             </span>
//                         )}
//                     </div>

//                     <p className="text-sm text-gray-500 mb-6 line-clamp-3">
//                         {product?.shortDescription || "No description"}
//                     </p>

//                     <div className="flex items-center justify-between">

//                         <button className="px-6 py-2 bg-[var(--primary)] text-white rounded-full flex items-center gap-2">
//                             <IoBagAddOutline />
//                             Add to Cart
//                         </button>

//                         <div className="flex items-center gap-2">
//                             <div className="flex text-yellow-400">
//                                 {[...Array(5)].map((_, i) => (
//                                     <MdStarPurple500 key={i} />
//                                 ))}
//                             </div>
//                             <span>{rating}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // ================= GRID VIEW =================
//     return (
//         <div className="group/card border rounded-2xl p-4 bg-white">

//             <div className="relative overflow-hidden rounded-xl">

//                 <Image
//                     src={mainImage}
//                     width={300}
//                     height={300}
//                     alt={product?.name || "product"}
//                     className="w-full transition-all duration-700 group-hover/card:opacity-0 group-hover/card:scale-110"
//                 />

//                 <Image
//                     src={hoverImage}
//                     width={300}
//                     height={300}
//                     alt="hover"
//                     className="absolute inset-0 w-full h-full opacity-0 group-hover/card:opacity-100 transition-all duration-700"
//                 />

//                 {product?.badge && (
//                     <span className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 text-sm rounded">
//                         {product.badge}
//                     </span>
//                 )}

//                 <div className="absolute inset-0 flex justify-center items-center gap-3 opacity-0 group-hover/card:opacity-100 transition">
//                     <button onClick={onQuickView} className="p-2 bg-white rounded-full">
//                         <IoEyeOutline />
//                     </button>
//                     <button className="p-2 bg-white rounded-full">
//                         <IoHeartOutline />
//                     </button>
//                     <button className="p-2 bg-white rounded-full">
//                         <FaCodeCompare />
//                     </button>
//                 </div>
//             </div>

//             <div className="mt-3">

//                 <p className="text-sm text-gray-500">{categoryName}</p>

//                 <h3 className="font-bold">{product?.name}</h3>

//                 <div className="flex justify-between items-center mt-2">

//                     <div>
//                         <div className="flex text-yellow-400">
//                             {[...Array(5)].map((_, i) => (
//                                 <MdStarPurple500 key={i} />
//                             ))}
//                         </div>

//                         <p className="font-bold text-[var(--primary)]">
//                             ₹{finalPrice}
//                             {originalPrice && (
//                                 <span className="ml-2 line-through text-sm text-gray-400">
//                                     ₹{originalPrice}
//                                 </span>
//                             )}
//                         </p>
//                     </div>

//                     <button className="p-2 bg-green-100 rounded-full">
//                         <IoBagAddOutline />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };
 
// export default ProductCard;

// 'use client';

// import { IoBagAddOutline, IoEyeOutline, IoHeartOutline } from "react-icons/io5";
// import { FaCodeCompare } from "react-icons/fa6";
// import { MdStarPurple500 } from "react-icons/md";
// import Image from 'next/image';
// import URLs from "../../lib/urls";

// interface ProductCardProps {
//     product: any;
//     onQuickView?: () => void;
//     view?: 'grid' | 'list';
// }

// const ProductCard = ({ product, onQuickView, view = 'grid' }: ProductCardProps) => {

//     const BASE_URL = "http://localhost:5000";

//     const mainImage =
//         product?.thumbnail
//             ? BASE_URL + product.thumbnail
//             : product?.images?.[0]
//             ? BASE_URL + product.images[0]
//             : "/no-image.png";
//     const hoverImage =
//         product?.images?.[1]
//             ? BASE_URL + product.images[1]
//             : mainImage;
//     const finalPrice = product?.discountPrice || product?.price || 0;
//     const originalPrice = product?.discountPrice ? product?.price : null;
//     const categoryName = product?.categoryId?.name || "Category";
//     const rating = product?.rating || 0;

//     if (view === 'list') {
//         return (
//             <div className="group relative w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row p-4 sm:p-6 border border-[var(--border-color)]">

//                 {product?.badge && (
//                     <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[.80rem] text-white bg-[#f74877]">
//                         {product.badge}
//                     </span>
//                 )}

//                 <div className="relative w-full md:w-64 aspect-square overflow-hidden rounded-xl bg-white cursor-pointer border p-3">
//                     <img
//                         src={`${URLs.FILEURL}${product?.images?.[0].replace(/^\/+/, "")}`}
//                         alt={product?.name || "product"}
//                         className="w-full h-full object-contain"
//                     />    
//                     <img
//                         src={`${URLs.FILEURL}${product?.images?.[1].replace(/^\/+/, "")}`}
//                         alt={product?.name || "product"}
//                         className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-all duration-700"
//                     /> 

//                     {/* --- HOVER ICONS OVERLAY (Added as per screenshot) --- */}
//                     <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/5">
//                         <button 
//                             onClick={onQuickView}
//                             className="w-9 h-9 flex items-center justify-center bg-white text-[var(--primary)] rounded-full border border-[#BCE3C9] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm"
//                         >
//                             <IoEyeOutline size={18} />
//                         </button>
//                         <button 
//                             className="w-9 h-9 flex items-center justify-center bg-white text-[var(--primary)] rounded-full border border-[#BCE3C9] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm"
//                         >
//                             <IoHeartOutline size={18} />
//                         </button>
//                         <button 
//                             className="w-9 h-9 flex items-center justify-center bg-white text-[var(--primary)] rounded-full border border-[#BCE3C9] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm"
//                         >
//                             <FaCodeCompare size={16} />
//                         </button>
//                     </div>
//                 </div>

//                 <div className="flex-1 mt-4 md:mt-0 md:ml-8 flex flex-col justify-center">

//                     <p className="text-sm text-[var(--text-muted)] mb-1">
//                         {categoryName}
//                     </p>

//                     <h3 className="text-xl font-bold mb-2">
//                         {product?.name}
//                     </h3>

//                     <div className="flex items-center gap-3 mb-4">
//                         <span className="text-2xl font-bold text-[var(--primary)]">
//                             ₹{finalPrice}
//                         </span>
//                         {originalPrice && (
//                             <span className="text-lg line-through text-gray-400">
//                                 ₹{originalPrice}
//                             </span>
//                         )}
//                     </div>

//                     <p className="text-sm text-gray-500 mb-6 line-clamp-3">
//                         {product?.shortDescription || "No description"}
//                     </p>

//                     <div className="flex items-center justify-between">
//                         <button className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg flex items-center gap-2 hover:bg-[#29A56C] transition-colors">
//                             <IoBagAddOutline />
//                             Add to Cart
//                         </button>

//                         <div className="flex items-center gap-2">
//                             <div className="flex text-yellow-400">
//                                 {[...Array(5)].map((_, i) => (
//                                     <MdStarPurple500 key={i} />
//                                 ))}
//                             </div>
//                             <span className="text-sm text-gray-400">{rating}%</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // ================= GRID VIEW =================
//     return (
//         <div className="group/card border rounded-2xl p-4 bg-white">
//             <div className="relative overflow-hidden rounded-xl">
//                 <Image
//                     src={mainImage}
//                     width={300}
//                     height={300}
//                     alt={product?.name || "product"}
//                     className="w-full transition-all duration-700 group-hover/card:opacity-0 group-hover/card:scale-110"
//                 />

//                 <Image
//                     src={hoverImage}
//                     width={300}
//                     height={300}
//                     alt="hover"
//                     className="absolute inset-0 w-full h-full opacity-0 group-hover/card:opacity-100 transition-all duration-700"
//                 />

//                 {product?.badge && (
//                     <span className="absolute top-2 left-2 bg-[#f74877] text-white px-2 py-1 text-xs rounded">
//                         {product.badge}
//                     </span>
//                 )}

//                 <div className="absolute inset-0 flex justify-center items-center gap-3 opacity-0 group-hover/card:opacity-100 transition-all duration-300">
//                     <button onClick={onQuickView} className="w-9 h-9 flex items-center justify-center bg-white text-[var(--primary)] rounded-full border border-[#BCE3C9] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm">
//                         <IoEyeOutline size={18} />
//                     </button>
//                     <button className="w-9 h-9 flex items-center justify-center bg-white text-[var(--primary)] rounded-full border border-[#BCE3C9] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm">
//                         <IoHeartOutline size={18} />
//                     </button>
//                     <button className="w-9 h-9 flex items-center justify-center bg-white text-[var(--primary)] rounded-full border border-[#BCE3C9] hover:bg-[var(--primary)] hover:text-white transition-all shadow-sm">
//                         <FaCodeCompare size={16} />
//                     </button>
//                 </div>
//             </div>

//             <div className="mt-3">
//                 <p className="text-sm text-gray-500">{categoryName}</p>
//                 <h3 className="font-bold">{product?.name}</h3>
//                 <div className="flex justify-between items-center mt-2">
//                     <div>
//                         <div className="flex text-yellow-400">
//                             {[...Array(5)].map((_, i) => (
//                                 <MdStarPurple500 key={i} />
//                             ))}
//                         </div>
//                         <p className="font-bold text-[var(--primary)]">
//                             ₹{finalPrice}
//                             {originalPrice && (
//                                 <span className="ml-2 line-through text-sm text-gray-400">
//                                     ₹{originalPrice}
//                                 </span>
//                             )}
//                         </p>
//                     </div>
//                     <button className="p-2 bg-[#DEF9EC] text-[var(--primary)] rounded-full hover:bg-[var(--primary)] hover:text-white transition-colors">
//                         <IoBagAddOutline size={18} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;

// 'use client';

// import { IoBagAddOutline, IoEyeOutline, IoHeartOutline } from "react-icons/io5";
// import { FaCodeCompare } from "react-icons/fa6";
// import { MdStarPurple500 } from "react-icons/md";
// import { useEffect, useState } from "react";
// import Image from 'next/image';
// import URLs from "../../lib/urls";

// interface ProductCardProps {
//     product: any;
//     onQuickView?: () => void;
//     view?: 'grid' | 'list';
// }   

// const ProductCard = ({ product, onQuickView, view = 'grid' }: ProductCardProps) => {

//     const BASE_URL = "http://localhost:5000";

//     const mainImage =
//         product?.thumbnail
//             ? BASE_URL + product.thumbnail
//             : product?.images?.[0]
//             ? BASE_URL + product.images[0]
//             : "/no-image.png";
//     const hoverImage =
//         product?.images?.[1]
//             ? BASE_URL + product.images[1]
//             : mainImage;
//     const finalPrice = product?.discountPrice || product?.price || 0;
//     const originalPrice = product?.discountPrice ? product?.price : null;
//     const categoryName = product?.categoryId?.name || "Category";
//     const rating = product?.rating || 0;

//     // Helper component for tooltipped buttons
//     const IconButton = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) => (
//         <div className="relative group/tooltip">
//             {/* Tooltip Content */}
//             <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[var(--primary)]">
//                 {label}
//             </span>
//             {/* Button */}
//             <button 
//                 onClick={onClick}
//                 className="w-9 h-9 flex items-center justify-center bg-white text-[var(--primary)] rounded-full border border-[#BCE3C9] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 shadow-sm"
//             >
//                 <Icon size={18} />
//             </button>
//         </div>
//     );

//     if (view === 'list') {
//         return (
//             <div className="group relative w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row p-4 sm:p-6 border border-[var(--border-color)] hover:shadow-lg">

//                 {product?.badge && (
//                     <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[.80rem] text-white bg-[#f74877]">
//                         {product.badge}
//                     </span>
//                 </div>

//                 {/* Image Section with Zoom Effect */}
//                 <div className="relative w-full md:w-64 aspect-square overflow-hidden rounded-xl bg-white cursor-pointer border p-3">
//                     <div className="w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110">
//                         <img
//                             src={`${URLs.FILEURL}${product?.images?.[0].replace(/^\/+/, "")}`}
//                             alt={product?.name || "product"}
//                             className="w-full h-full object-contain"
//                         />    
//                         <img
//                             src={`${URLs.FILEURL}${product?.images?.[1].replace(/^\/+/, "")}`}
//                             alt={product?.name || "product"}
//                             className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-700"
//                         /> 
//                     </div>

//                     {/* Hover Icons Overlay */}
//                     <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/5">
//                         <IconButton icon={IoEyeOutline} label="Quick View" onClick={onQuickView} />
//                         <IconButton icon={IoHeartOutline} label="Add to Wishlist" />
//                         <IconButton icon={FaCodeCompare} label="Compare" />
//                     </div>
//                 </div>

//                 <div className="flex-1 mt-4 md:mt-0 md:ml-8 flex flex-col justify-center">
//                     <p className="text-sm text-[var(--text-muted)] mb-1">{categoryName}</p>
//                     <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--primary)]">
//                         {product?.name}
//                     </h3>

//                     <div className="flex items-center gap-3 mb-4">
//                         <span className="text-2xl font-bold text-[var(--primary)]">₹{finalPrice}</span>
//                         {originalPrice && <span className="text-lg line-through text-gray-400">₹{originalPrice}</span>}
//                     </div>

//                     <p className="text-sm text-gray-500 mb-6 line-clamp-3">{product?.shortDescription || "No description"}</p>

//                     <div className="flex items-center justify-between">
//                         <button className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg flex items-center gap-2 hover:bg-[#29A56C] transition-colors">
//                             <IoBagAddOutline />
//                             Add to Cart
//                         </button>
//                         <div className="flex items-center gap-2">
//                             <div className="flex text-yellow-400">
//                                 {[...Array(5)].map((_, i) => <MdStarPurple500 key={i} />)}
//                             </div>
//                             <span className="text-sm text-gray-400">{rating}%</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // ================= GRID VIEW =================
//     return (
//         <div className="group/card border rounded-2xl p-4 bg-white hover:shadow-lg transition-all duration-300">
//             <div className="relative overflow-hidden rounded-xl">
//                 {/* Smooth Zoom Container */}
//                 <div className="transition-transform duration-700 ease-in-out group-hover/card:scale-110">
//                     <Image
//                         src={mainImage}
//                         width={300}
//                         height={300}
//                         alt={product?.name || "product"}
//                         className="w-full transition-opacity duration-700 group-hover/card:opacity-0"
//                     />
//                     <Image
//                         src={hoverImage}
//                         width={300}
//                         height={300}
//                         alt="hover"
//                         className="absolute inset-0 w-full h-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 object-contain"
//                     />
//                 </div>

//                 {product?.badge && (
//                     <span className="absolute top-2 left-2 bg-[#f74877] text-white px-2 py-1 text-xs rounded z-10">
//                         {product.badge}
//                     </span>
//                 )}

//                 {/* Hover Icons Overlay with Tooltips */}
//                 <div className="absolute inset-0 flex justify-center items-center gap-2 opacity-0 group-hover/card:opacity-100 transition-all duration-300 bg-black/5">
//                     <IconButton icon={IoEyeOutline} label="Quick View" onClick={onQuickView} />
//                     <IconButton icon={IoHeartOutline} label="Wishlist" />
//                     <IconButton icon={FaCodeCompare} label="Compare" />
//                 </div>
//             </div>

//             <div className="mt-3">
//                 <p className="text-sm text-gray-500">{categoryName}</p>
//                 <h3 className="font-bold transition-colors duration-300 group-hover/card:text-[var(--primary)]">{product?.name}</h3>
//                 <div className="flex justify-between items-center mt-2">
//                     <div>
//                         <div className="flex text-yellow-400">
//                             {[...Array(5)].map((_, i) => <MdStarPurple500 key={i} />)}
//                         </div>
//                         <p className="font-bold text-[var(--primary)]">
//                             ₹{finalPrice}
//                             {originalPrice && <span className="ml-2 line-through text-sm text-gray-400">₹{originalPrice}</span>}
//                         </p>
//                     </div>
//                     <button className="p-2 bg-[#DEF9EC] text-[var(--primary)] rounded-full hover:bg-[var(--primary)] hover:text-white transition-colors">
//                         <IoBagAddOutline size={18} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;

'use client';

import { IoBagAddOutline, IoEyeOutline, IoHeartOutline } from "react-icons/io5";
import { FaCodeCompare } from "react-icons/fa6";
import { MdStarPurple500 } from "react-icons/md";
import Image from 'next/image';
import URLs from "../../lib/urls";

interface ProductCardProps {
    product: any;
    onQuickView?: () => void;
    view?: 'grid' | 'list';
}

const ProductCard = ({ product, onQuickView, view = 'grid' }: ProductCardProps) => {

    const BASE_URL = "http://localhost:5000";

    const mainImage =
        product?.thumbnail
            ? BASE_URL + product.thumbnail
            : product?.images?.[0]
            ? BASE_URL + product.images[0]
            : "/no-image.png";
    const hoverImage =
        product?.images?.[1]
            ? BASE_URL + product.images[1]
            : mainImage;
    const finalPrice = product?.discountPrice || product?.price || 0;
    const originalPrice = product?.discountPrice ? product?.price : null;
    const categoryName = product?.categoryId?.name || "Category";
    const rating = product?.rating || 0;

    // Helper component for tooltipped buttons
    const IconButton = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) => (
        <div className="relative group/tooltip">
            {/* Tooltip Content */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[var(--primary)]">
                {label}
            </span>
            {/* Button */}
            <button 
                onClick={onClick}
                className="w-9 h-9 flex items-center justify-center bg-white text-[var(--primary)] rounded-full border border-[#BCE3C9] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 shadow-sm"
            >
                <Icon size={18} />
            </button>
        </div>
    );

    if (view === 'list') {
        return (
            <div className="group relative w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row p-4 sm:p-6 border border-[var(--border-color)] hover:shadow-lg">

                {product?.badge && (
                    <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[.80rem] text-white bg-[#f74877]">
                        {product.badge}
                    </span>
                )}

                {/* Image Section with Zoom Effect */}
                <div className="relative w-full md:w-64 aspect-square overflow-hidden rounded-xl bg-white cursor-pointer border p-3">
                    <div className="w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110">
                        <img
                            src={`${URLs.FILEURL}${product?.images?.[0].replace(/^\/+/, "")}`}
                            alt={product?.name || "product"}
                            className="w-full h-full object-contain"
                        />    
                        <img
                            src={`${URLs.FILEURL}${product?.images?.[1].replace(/^\/+/, "")}`}
                            alt={product?.name || "product"}
                            className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        /> 
                    </div>

                    {/* Hover Icons Overlay */}
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

    // ================= GRID VIEW =================
    return (
        <div className="group/card border rounded-2xl p-4 bg-white hover:shadow-lg transition-all duration-300">
            <div className="relative overflow-hidden rounded-xl">
                {/* Smooth Zoom Container */}
                <div className="transition-transform duration-700 ease-in-out group-hover/card:scale-110">
                    <Image
                        src={mainImage}
                        width={300}
                        height={300}
                        alt={product?.name || "product"}
                        className="w-full transition-opacity duration-700 group-hover/card:opacity-0"
                    />
                    <Image
                        src={hoverImage}
                        width={300}
                        height={300}
                        alt="hover"
                        className="absolute inset-0 w-full h-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 object-contain"
                    />
                </div>

                {product?.badge && (
                    <span className="absolute top-2 left-2 bg-[#f74877] text-white px-2 py-1 text-xs rounded z-10">
                        {product.badge}
                    </span>
                )}

                {/* Hover Icons Overlay with Tooltips */}
                <div className="absolute inset-0 flex justify-center items-center gap-2 opacity-0 group-hover/card:opacity-100 transition-all duration-300 bg-black/5">
                    <IconButton icon={IoEyeOutline} label="Quick View" onClick={onQuickView} />
                    <IconButton icon={IoHeartOutline} label="Wishlist" />
                    <IconButton icon={FaCodeCompare} label="Compare" />
                </div>
            </div>

            <div className="mt-3">
                <p className="text-sm text-gray-500">{categoryName}</p>
                <h3 className="font-bold transition-colors duration-300 group-hover/card:text-[var(--primary)]">{product?.name}</h3>
                <div className="flex justify-between items-center mt-2">
                    <div>
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => <MdStarPurple500 key={i} />)}
                        </div>
                        <p className="font-bold text-[var(--primary)]">
                            ₹{finalPrice}
                            {originalPrice && <span className="ml-2 line-through text-sm text-gray-400">₹{originalPrice}</span>}
                        </p>
                    </div>
                    <button className="p-2 bg-[#DEF9EC] text-[var(--primary)] rounded-full hover:bg-[var(--primary)] hover:text-white transition-colors">
                        <IoBagAddOutline size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;