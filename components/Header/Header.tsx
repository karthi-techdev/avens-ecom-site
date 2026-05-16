// "use client";

// import React, { useState, useMemo, useEffect, useRef } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// // import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Heart,
//   ShoppingCart,
//   PhoneCall,
//   ChevronDown,
//   LayoutGrid,
//   MapPin,
//   Smartphone,
//   Menu,
//   X,
//   Laptop,
//   Speaker,
//   Footprints,
//   Sun,
//   Home,
//   Baby,
//   Shirt,
//   Clock,
// } from "lucide-react";
// import * as Icons from "lucide-react";
// import { LucideIcon } from "lucide-react";
// import { CiUser } from "react-icons/ci";
// import { FaRegUser } from "react-icons/fa";

// import { useMainCategoryStore } from "../../store/useMainCategoryStore";
// import { useSubCategoryStore } from "../../store/useSubCategoryStore";
// import { useCategoryStore } from "../../store/useCategoryStore";
// import { useSearchHistoryStore } from "../../store/useSearchStore";
// import { useSettingsStore } from "../../store/useSettingsStore";
// import { useCartStore } from "@/store/cartStore";
// import URLs from "../../lib/urls";

// interface MainCategory {
//   _id: string;
//   name: string;
//   icon?: string;
//   slug: string;
//   image?: string;
// }

// const CategoryIcon = ({ name, size = 18 }: { name: string; size?: number }) => {
//   const props = {
//     size,
//     strokeWidth: 1.5,
//     className: "group-hover:text-[var(--primary)] transition-colors",
//   };
//   switch (name) {
//     case "Women's Clothing":
//       return (
//         <svg
//           width={size}
//           height={size}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className={props.className}
//         >
//           <path d="M6 3c0 2.5 1.5 3 1.5 3S6 7 6 9.5s2 4.5 2 4.5L6 21h12l-2-7s2-2 2-4.5S16.5 6 16.5 6s1.5-.5 1.5-3H6z" />
//         </svg>
//       );
//     case "Men's Clothing": return <Shirt {...props} />;
//     case "Cellphones": return <Smartphone {...props} />;
//     case "Computer & Office": return <Laptop {...props} />;
//     case "Consumer Electronics": return <Speaker {...props} />;
//     case "Jewelry & Accessories":
//       return (
//         <svg
//           width={size}
//           height={size}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className={props.className}
//         >
//           <path d="M6 3h12l3 6-9 13L3 9l3-6zM3 9h18M12 3v19M4.5 7.5L12 22l7.5-14.5" />
//         </svg>
//       );
//     case "Home & Garden": return <Home {...props} />;
//     case "Shoes": return <Footprints {...props} />;
//     case "Mother & Kids": return <Baby {...props} />;
//     case "Outdoor fun": return <Sun {...props} />;
//     default: return <LayoutGrid {...props} />;
//   }
// };

// const Header = () => {
//   const router = useRouter();
//   const searchRef = useRef<HTMLDivElement>(null);

//   // --- UI State ---
//   const [isOpen, setIsOpen] = useState(false);
//   const [listIsOpen, setListIsOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All Categories");
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
//   const [showHistory, setShowHistory] = useState(false);
//   const [openMobileMain, setOpenMobileMain] = useState<string | null>(null);
//   const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);
//   const [selectedMainCategory, setSelectedMainCategory] = useState<any>(null);
//   const [showAll, setShowAll] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   // --- Auth & Data State ---
//   const [token, setToken] = useState<any>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [wishlistCount, setWishlistCount] = useState(0);

//   // --- Stores ---
//   const { fetchMainCategories, mainCategories } = useMainCategoryStore();
//   const { fetchSubCategories, subCategories } = useSubCategoryStore();
//   const { fetchCategories, categories } = useCategoryStore();
//   const { history, fetchHistory, addSearch, removeSearchItem, clearHistory } = useSearchHistoryStore();
//   const { settings, fetchSettings } = useSettingsStore();
//   const { getAllCart, cartItems, removeCart } = useCartStore();

//   const visibleCategories = showAll ? mainCategories : mainCategories.slice(0, 10);
//   const formatUrl = (slug: string) => `/product-list?category=${slug}`;
//   const getID = (item: any) => (typeof item === "object" ? item?._id : item);

//   const getImageUrl = (path: string | undefined) => {
//     if (!path) return "";
//     if (path.startsWith("http")) return path;
//     const baseUrl = URLs.FILEURL.replace(/\/$/, "");
//     return `${baseUrl}/${path.replace(/^\/+/, "")}`;
//   };

//   // --- Effects ---
//   useEffect(() => {
//     fetchMainCategories();
//     fetchSubCategories();
//     fetchCategories();
//     fetchSettings();

//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setShowHistory(false);
//         setListIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user") || "null");
//     const loginStatus = localStorage.getItem("loginSuccess");
//     setToken(user);
//     setIsLoggedIn(loginStatus === "true");

//     if (user) {
//       fetchHistory();
//       getAllCart(user._id);
//     }

//     const updateWishlistCount = () => {
//       const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
//       setWishlistCount(wishlist.length);
//     };
//     updateWishlistCount();
//     window.addEventListener("wishlistUpdated", updateWishlistCount);
//     return () => window.removeEventListener("wishlistUpdated", updateWishlistCount);
//   }, []);

//   // --- Handlers ---
//   const handleSearch = async (e?: React.KeyboardEvent<HTMLInputElement>, overrideQuery?: string) => {
//     if (e && e.key !== "Enter") return;
//     const queryToSearch = overrideQuery !== undefined ? overrideQuery : searchQuery;
//     if (queryToSearch.trim() !== "") {
//       if (token) await addSearch(queryToSearch.trim());
//       router.push(`/product-list?search=${encodeURIComponent(queryToSearch.trim())}`);
//       setIsOpen(false);
//       setShowHistory(false);
//     }
//   };

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out from this session",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Logout",
//       confirmButtonColor: "#3BB77E",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("loginSuccess");
//         localStorage.removeItem("user");
//         setIsLoggedIn(false);
//         router.push("/login");
//       }
//     });
//   };

//   const deleteCart = async (id: string) => {
//     Swal.fire({
//       title: "Are you sure?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3BB77E",
//     }).then((result) => {
//       if (result.isConfirmed) removeCart(id);
//     });
//   };

//   const siteLogoUrl = useMemo(() => {
//     const logoPath = settings?.branding?.siteLogo;
//     if (logoPath) {
//       const baseUrl = URLs.FILEURL.replace(/\/$/, "");
//       const cleanPath = logoPath.startsWith("/") ? logoPath : `/${logoPath}`;
//       return `${baseUrl}${cleanPath}?t=${new Date().getTime()}`;
//     }
//     return "/evara.svg";
//   }, [settings?.branding?.siteLogo]);

//   // --- Sub-Components ---
//   const CategoryMegaMenu = () => {
//     const activeSubCategories = subCategories.filter(
//       (sub: any) => getID(sub.mainCategoryId) === selectedMainCategory?._id
//     );
//     const hasSubContent = selectedMainCategory && activeSubCategories.length > 0;

//     return (
//       <div 
//         className={`absolute top-full left-0 mt-0 bg-white border border-gray-200 shadow-2xl flex rounded-b-md z-[100] transition-all duration-300 ${hasSubContent ? "w-[1050px]" : "w-[260px]"}`}
//         onMouseLeave={() => setIsCategoryOpen(false)}
//       >
//         <div className={`${hasSubContent ? "w-[250px]" : "w-full"} border-r border-gray-100 py-2 bg-white`}>
//           <ul className="text-[14px] text-gray-700">
//             {visibleCategories.map((cat: any) => (
//               <li
//                 key={cat._id}
//                 onMouseEnter={() => setSelectedMainCategory(cat)}
//                 onClick={() => {
//                   router.push(formatUrl(cat.slug));
//                   setIsCategoryOpen(false);
//                 }}
//                 className={`group flex justify-between items-center px-5 py-[11px] cursor-pointer transition-colors
//                 ${selectedMainCategory?._id === cat._id ? "text-[var(--primary)] bg-gray-50 font-semibold" : "hover:text-[var(--primary)] hover:bg-gray-50 text-gray-700"}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <CategoryIcon name={cat.name} size={18} />
//                   <span>{cat.name}</span>
//                 </div>
//                 {subCategories.some(sub => getID(sub.mainCategoryId) === cat._id) && <span className="text-[10px] opacity-30">❯</span>}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="flex-1 overflow-hidden bg-white">
//           <AnimatePresence mode="wait">
//             {hasSubContent && (
//               <motion.div
//                 key={selectedMainCategory?._id}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="flex p-8 gap-8 h-full"
//               >
//                 <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-10">
//                   {activeSubCategories.slice(0, 4).map((sub: any) => (
//                     <div key={sub._id}>
//                       <h3 onClick={() => { router.push(formatUrl(sub.slug)); setIsCategoryOpen(false); }} className="text-[var(--primary)] font-bold text-[15px] mb-4 cursor-pointer hover:underline uppercase">
//                         {sub.name}
//                       </h3>
//                       <ul className="space-y-2">
//                         {categories.filter((c: any) => getID(c.subCategoryId) === sub._id).map((catItem: any) => (
//                           <li key={catItem._id} onClick={() => { router.push(formatUrl(catItem.slug)); setIsCategoryOpen(false); }} className="text-gray-600 hover:text-[var(--primary)] text-[14px] cursor-pointer transition-colors">
//                             {catItem.name}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ))}
//                 </div>
//                 {/* Banners */}
//                 <div className="w-[320px] flex flex-col gap-4">
//                   <div className="relative overflow-hidden rounded-xl h-[180px] bg-[#f0f4f7]">
//                     {selectedMainCategory?.image && <img src={getImageUrl(selectedMainCategory.image)} className="w-full h-full object-cover" alt="Banner" />}
//                     <div className="absolute inset-0 p-6 flex flex-col justify-center bg-black/5">
//                       <h4 className="text-xl font-extrabold text-[#253D4E]">{selectedMainCategory?.name}</h4>
//                       <Link href={formatUrl(selectedMainCategory?.slug)} className="text-[var(--primary)] text-sm font-bold mt-2 underline">Shop Now</Link>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <header className="w-full relative">
//       {/* Top Bar */}
//       <div className="bg-gray-100 px-4 lg:px-10 text-gray-600 text-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto py-2 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <span className="flex items-center gap-1"><Smartphone size={14} />(+01) – 2345 – 6789</span>
//             <span className="hidden md:inline">|</span>
//             <span className="hidden md:flex items-center gap-1"><MapPin size={14} />Our location</span>
//           </div>
//           <div className="hidden md:flex items-center gap-3">
//             {isLoggedIn ? (
//               <button onClick={handleLogout} className="hover:text-[var(--primary)] font-medium">Logout</button>
//             ) : (
//               <div className="flex gap-1">
//                 <Link href="/login" className="hover:text-[var(--primary)]">Login</Link>
//                 <span>/</span>
//                 <Link href="/register" className="hover:text-[var(--primary)]">Sign Up</Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Header */}
//       <div className="bg-white px-4 lg:px-10 border-b border-gray-100">
//         <div className="max-w-7xl mx-auto py-5 flex items-center justify-between">
//           <Link href="/">
//             <img src={siteLogoUrl} alt="Logo" className="h-8 object-contain" />
//           </Link>

//           {/* Desktop Search */}
//           <div ref={searchRef} className="hidden lg:flex items-center w-full max-w-[650px] border-b-2 border-gray-200 relative h-[45px]">
//             <button onClick={() => setListIsOpen(!listIsOpen)} className="px-4 text-[14px] font-bold flex items-center gap-2 text-[#253D4E] min-w-[130px]">
//               {selectedCategory} <ChevronDown size={14} />
//             </button>
//             {listIsOpen && (
//               <ul className="absolute left-0 top-full mt-2 w-64 bg-white border shadow-xl z-[60] py-2 rounded-md">
//                 <li onClick={() => { setSelectedCategory("All Categories"); setListIsOpen(false); }} className="px-5 py-2 hover:bg-gray-50 cursor-pointer">All Categories</li>
//                 {mainCategories.map(cat => (
//                   <li key={cat._id} onClick={() => { setSelectedCategory(cat.name); setListIsOpen(false); }} className="px-5 py-2 hover:bg-gray-50 cursor-pointer">{cat.name}</li>
//                 ))}
//               </ul>
//             )}
//             <div className="h-4 w-[1px] bg-gray-300 mx-2" />
//             <input 
//               type="text" 
//               placeholder="Search for items..." 
//               className="flex-1 px-4 outline-none text-sm"
//               value={searchQuery}
//               onFocus={() => setShowHistory(true)}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleSearch}
//             />
//             <Search size={20} className="text-gray-400 cursor-pointer" onClick={() => handleSearch()} />
            
//             {showHistory && history.length > 0 && (
//               <div className="absolute left-0 top-full mt-1 w-full bg-white border shadow-xl z-50 py-2 rounded-md">
//                 <div className="px-5 py-2 flex justify-between border-b text-[11px] font-bold text-gray-400 uppercase">
//                   <span>Recent Searches</span>
//                   <button onClick={clearHistory} className="text-red-500 hover:underline">Clear All</button>
//                 </div>
//                 {history.map(item => (
//                   <div key={item._id} className="flex items-center justify-between px-5 py-2 hover:bg-gray-50 cursor-pointer group">
//                     <div className="flex items-center gap-3 text-sm" onClick={() => { setSearchQuery(item.query); handleSearch(undefined, item.query); }}>
//                       <Clock size={14} className="text-gray-300" /> {item.query}
//                     </div>
//                     <X size={14} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500" onClick={() => removeSearchItem(item._id)} />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Header Icons */}
//           <div className="flex items-center gap-6">
//             <Link href="/wishlist" className="relative group">
//               <Heart size={26} className="group-hover:text-[var(--primary)] transition-colors" />
//               <span className="absolute -top-1 -right-1 bg-[var(--primary)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>
//             </Link>

//             <Link href={isLoggedIn ? "/account" : "/login"}>
//               <CiUser size={28} className="hover:text-[var(--primary)] transition-colors" />
//             </Link>

//             {token && (
//               <div className="relative group py-4">
//                 <div className="relative cursor-pointer">
//                   <ShoppingCart size={26} className="group-hover:text-[var(--primary)] transition-colors" />
//                   <span className="absolute -top-1 -right-1 bg-[var(--primary)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cartItems?.length || 0}</span>
//                 </div>
//                 <div className="absolute right-0 top-full hidden group-hover:block w-80 bg-white shadow-2xl rounded-lg border p-5 z-50">
//                   <ul className="space-y-4 max-h-60 overflow-y-auto">
//                     {cartItems?.map((item: any) => (
//                       <li key={item._id} className="flex items-center justify-between gap-4">
//                         <img src={`http://localhost:5000${item.productId.thumbnail}`} className="w-12 h-12 object-cover rounded" alt="" />
//                         <div className="flex-1 text-xs">
//                           <h4 className="font-bold truncate w-32">{item.productId.name}</h4>
//                           <p>{item.quantity} × ₹{item.price / item.quantity}</p>
//                         </div>
//                         <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => deleteCart(item._id)} />
//                       </li>
//                     ))}
//                   </ul>
//                   <div className="mt-4 pt-4 border-t">
//                     <div className="flex justify-between font-bold mb-4">
//                       <span>Total</span>
//                       <span className="text-[var(--primary)]">₹{cartItems?.reduce((acc, item: any) => acc + item.price, 0)}</span>
//                     </div>
//                     <div className="flex gap-2">
//                       <Link href="/cart" className="flex-1 text-center border border-[var(--primary)] text-[var(--primary)] py-2 rounded text-xs hover:bg-[var(--primary)] hover:text-white">Cart</Link>
//                       <Link href="/checkout" className="flex-1 text-center bg-[var(--primary)] text-white py-2 rounded text-xs">Checkout</Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <button onClick={() => setIsOpen(true)} className="lg:hidden"><Menu size={28} /></button>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Bar */}
//       <div className="hidden lg:block border-b border-gray-100 px-4 lg:px-10">
//         <div className="max-w-7xl mx-auto py-3 flex items-center justify-between">
//           <div className="relative">
//             <button onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2.5 rounded-md font-bold text-sm">
//               <LayoutGrid size={18} /> Browse Categories
//             </button>
//             {isCategoryOpen && <CategoryMegaMenu />}
//           </div>
//           <nav className="flex gap-8 text-sm font-bold text-gray-800">
//             <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
//             <Link href="/product-view-full" className="hover:text-[var(--primary)]">Shop</Link>
//             <Link href="/about" className="hover:text-[var(--primary)]">About</Link>
//             <Link href="/contact" className="hover:text-[var(--primary)]">Contact</Link>
//           </nav>
//           <div className="flex items-center gap-2 text-[var(--primary)]">
//             <PhoneCall size={20} />
//             <div className="text-xs">
//               <span className="block text-gray-500">Hotline</span>
//               <span className="font-bold text-gray-800">1900 – 888</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`fixed inset-0 bg-black/40 z-[100] transition-opacity ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`} onClick={() => setIsOpen(false)} />
//       <div className={`fixed top-0 left-0 h-full w-72 bg-white z-[110] transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
//         <div className="p-5 border-b flex justify-between items-center">
//           <img src="/evara.svg" className="h-8" alt="Logo" />
//           <X onClick={() => setIsOpen(false)} className="cursor-pointer" />
//         </div>
//         <div className="p-4">
//           <div className="relative mb-6">
//             <input 
//               type="text" 
//               placeholder="Search..." 
//               className="w-full border p-2 rounded text-sm"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleSearch}
//             />
//             <Search className="absolute right-2 top-2 text-gray-400" size={18} onClick={() => handleSearch()} />
//           </div>
//           <div className="space-y-4 font-bold text-gray-800">
//             <div onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} className="flex justify-between items-center text-[var(--primary)]">
//               <span>Categories</span> <ChevronDown className={isCategoriesOpen ? "rotate-180" : ""} />
//             </div>
//             {isCategoriesOpen && (
//               <div className="pl-4 space-y-2 text-sm font-medium">
//                 {mainCategories.map(cat => (
//                   <div key={cat._id} onClick={() => { router.push(formatUrl(cat.slug)); setIsOpen(false); }}>{cat.name}</div>
//                 ))}
//               </div>
//             )}
//             <Link href="/" className="block">Home</Link>
//             <Link href="/product-view-full" className="block">Shop</Link>
//             <Link href="/about" className="block">About</Link>
//             <Link href="/contact" className="block">Contact</Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  Search,
  Heart,
  ShoppingCart,
  PhoneCall,
  ChevronDown,
  LayoutGrid,
  MapPin,
  Smartphone,
  Menu,
  X,
  Laptop,
  Speaker,
  Footprints,
  Sun,
  Home,
  Baby,
  Shirt,
  Clock,
} from "lucide-react";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { CiUser } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

import { useMainCategoryStore } from "../../store/useMainCategoryStore";
import { useSubCategoryStore } from "../../store/useSubCategoryStore";
import { useCategoryStore } from "../../store/useCategoryStore";
import { useSearchHistoryStore } from "../../store/useSearchStore";
import { useSettingsStore } from "../../store/useSettingsStore";
import { useCartStore } from "@/store/cartStore";
import URLs from "../../lib/urls";

const CategoryIcon = ({ name, size = 18 }: { name: string; size?: number }) => {
  const props = { size, strokeWidth: 1.5, className: "group-hover:text-[var(--primary)] transition-colors" };
  switch (name) {
    case "Women's Clothing":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
          <path d="M6 3c0 2.5 1.5 3 1.5 3S6 7 6 9.5s2 4.5 2 4.5L6 21h12l-2-7s2-2 2-4.5S16.5 6 16.5 6s1.5-.5 1.5-3H6z" />
        </svg>
      );
    case "Men's Clothing": return <Shirt {...props} />;
    case "Cellphones": return <Smartphone {...props} />;
    case "Computer & Office": return <Laptop {...props} />;
    case "Consumer Electronics": return <Speaker {...props} />;
    case "Home & Garden": return <Home {...props} />;
    case "Shoes": return <Footprints {...props} />;
    case "Mother & Kids": return <Baby {...props} />;
    case "Outdoor fun": return <Sun {...props} />;
    default: return <LayoutGrid {...props} />;
  }
};

const Header = () => {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [listIsOpen, setListIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMainCategory, setSelectedMainCategory] = useState<any>(null);
  const [showAll, setShowAll] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<any>(null);
  const [wishlistCount, setWishlistCount] = useState(0);

  const { fetchMainCategories, mainCategories } = useMainCategoryStore();
  const { fetchSubCategories, subCategories } = useSubCategoryStore();
  const { fetchCategories, categories } = useCategoryStore();
  const { history, fetchHistory, addSearch, removeSearchItem, clearHistory } = useSearchHistoryStore();
  const { settings, fetchSettings } = useSettingsStore();
  const { getAllCart, cartItems, removeCart } = useCartStore();

  const visibleCategories = showAll ? mainCategories : mainCategories.slice(0, 10);
  const formatUrl = (slug: string) => `/product-list?category=${slug}`;
  const getID = (item: any) => (typeof item === "object" ? item?._id : item);

  useEffect(() => {
    fetchMainCategories();
    fetchSubCategories();
    fetchCategories();
    fetchSettings();

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowHistory(false);
        setListIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const loginStatus = localStorage.getItem("loginSuccess");
    if (userData && userData !== "null") {
      const parsedUser = JSON.parse(userData);
      setToken(parsedUser);
      fetchHistory();
      getAllCart(parsedUser._id);
    }
    setIsLoggedIn(loginStatus === "true");

    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(wishlist.length);
    };
    updateWishlistCount();
    window.addEventListener("wishlistUpdated", updateWishlistCount);
    return () => window.removeEventListener("wishlistUpdated", updateWishlistCount);
  }, []);

  const handleSearch = async (e?: React.KeyboardEvent<HTMLInputElement>, overrideQuery?: string) => {
    if (e && e.key !== "Enter") return;
    const queryToSearch = overrideQuery !== undefined ? overrideQuery : searchQuery;
    if (queryToSearch.trim() !== "") {
      if (token) await addSearch(queryToSearch.trim());
      router.push(`/product-list?search=${encodeURIComponent(queryToSearch.trim())}`);
      setIsOpen(false);
      setShowHistory(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loginSuccess");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setToken(null);
    router.push("/login");
  };

  const siteLogoUrl = useMemo(() => {
    const logoPath = settings?.branding?.siteLogo;
    if (logoPath) {
      const baseUrl = URLs.FILEURL.replace(/\/$/, "");
      return `${baseUrl}/${logoPath.replace(/^\/+/, "")}`;
    }
    return "/evara.svg";
  }, [settings?.branding?.siteLogo]);

  const CategoryMegaMenu = () => {
    const activeSubCategories = subCategories.filter(
      (sub: any) => getID(sub.mainCategoryId) === selectedMainCategory?._id
    );
    const hasSubContent = selectedMainCategory && activeSubCategories.length > 0;

    return (
      <div 
        className={`absolute top-full left-0 mt-0 bg-white border border-gray-200 shadow-2xl flex rounded-b-md z-[100] ${hasSubContent ? "w-[1050px]" : "w-[260px]"}`}
        onMouseLeave={() => setIsCategoryOpen(false)}
      >
        <div className={`${hasSubContent ? "w-[250px]" : "w-full"} border-r border-gray-100 py-2 bg-white`}>
          <ul className="text-[14px] text-gray-700">
            {visibleCategories.map((cat: any) => (
              <li
                key={cat._id}
                onMouseEnter={() => setSelectedMainCategory(cat)}
                onClick={() => { router.push(formatUrl(cat.slug)); setIsCategoryOpen(false); }}
                className={`group flex justify-between items-center px-5 py-[11px] cursor-pointer transition-colors
                ${selectedMainCategory?._id === cat._id ? "text-[var(--primary)] bg-gray-50 font-semibold" : "hover:text-[var(--primary)] hover:bg-gray-50 text-gray-700"}`}
              >
                <div className="flex items-center gap-3">
                  <CategoryIcon name={cat.name} size={18} />
                  <span>{cat.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {hasSubContent && (
          <div className="flex-1 p-8 grid grid-cols-2 gap-x-8 gap-y-10 bg-white">
            {activeSubCategories.slice(0, 4).map((sub: any) => (
              <div key={sub._id}>
                <h3 className="text-[var(--primary)] font-bold text-[15px] mb-4 uppercase">{sub.name}</h3>
                <ul className="space-y-2">
                  {categories.filter(c => getID(c.subCategoryId) === sub._id).map((catItem: any) => (
                    <li key={catItem._id} onClick={() => { router.push(formatUrl(catItem.slug)); setIsCategoryOpen(false); }} className="text-gray-600 hover:text-[var(--primary)] text-[14px] cursor-pointer">
                      {catItem.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="w-full relative">
      {/* Top Bar */}
      <div className="bg-gray-100 px-10 text-gray-600 text-sm border-b border-gray-200 py-2 hidden lg:flex justify-between items-center">
        <div className="flex gap-4">
           <span><Smartphone size={14} className="inline mr-1" /> (+01) 2345 6789</span>
           <span><MapPin size={14} className="inline mr-1" /> Our location</span>
        </div>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-[var(--primary)]">Logout</button>
          ) : (
            <Link href="/login" className="hover:text-[var(--primary)]">Login / Sign Up</Link>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white px-4 lg:px-10 border-b border-gray-100 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/"><img src={siteLogoUrl} alt="Logo" className="h-10 object-contain" /></Link>

          <div ref={searchRef} className="hidden lg:flex items-center w-full max-w-[600px] border-b-2 border-gray-200 relative h-[45px] mx-8">
             <input 
              type="text" 
              placeholder="Search for items..." 
              className="w-full px-2 outline-none text-sm"
              value={searchQuery}
              onFocus={() => setShowHistory(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <Search className="text-gray-400 cursor-pointer" size={20} onClick={() => handleSearch()} />
            
            {showHistory && history.length > 0 && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white border shadow-2xl z-50 py-2 rounded">
                {history.map(item => (
                  <div key={item._id} className="flex justify-between items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm" onClick={() => handleSearch(undefined, item.query)}>
                    <div className="flex items-center gap-2"><Clock size={14} /> {item.query}</div>
                    <X size={14} className="text-gray-400" onClick={(e) => { e.stopPropagation(); removeSearchItem(item._id); }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            <Link href="/wishlist" className="relative group">
              <Heart size={26} />
              <span className="absolute -top-1 -right-1 bg-[var(--primary)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>
            </Link>
            <Link href={isLoggedIn ? "/account" : "/login"}><CiUser size={28} /></Link>
            {token && (
               <div className="relative group py-2">
                 <ShoppingCart size={26} />
                 <span className="absolute -top-1 -right-1 bg-[var(--primary)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cartItems?.length || 0}</span>
               </div>
            )}
            <button onClick={() => setIsOpen(true)} className="lg:hidden"><Menu size={28} /></button>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="hidden lg:block border-b border-gray-100 px-10 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="relative">
            <button onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2 rounded font-bold text-sm">
              <LayoutGrid size={18} /> Browse Categories
            </button>
            {isCategoryOpen && <CategoryMegaMenu />}
          </div>
          <nav className="flex gap-8 text-sm font-bold text-gray-800 uppercase">
            <Link href="/">Home</Link>
            <Link href="/product-view-full">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="flex items-center gap-2 text-[var(--primary)]">
            <PhoneCall size={20} />
            <div className="text-xs">
              <span className="block text-gray-500">Hotline</span>
              <span className="font-bold text-gray-800">1900 – 888</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative w-72 bg-white h-full p-5 shadow-xl">
            <div className="flex justify-between items-center mb-8">
               <img src="/evara.svg" className="h-8" alt="Logo" />
               <X onClick={() => setIsOpen(false)} />
            </div>
            <nav className="flex flex-col gap-5 font-bold uppercase text-gray-800">
               <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
               <Link href="/product-view-full" onClick={() => setIsOpen(false)}>Shop</Link>
               <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
               <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;