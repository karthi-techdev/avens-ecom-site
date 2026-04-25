"use client";
import { useMainCategoryStore } from "../../store/useMainCategoryStore";
import { useSubCategoryStore } from "../../store/useSubCategoryStore";
import { useCategoryStore } from "../../store/useCategoryStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import React, { useState, useMemo, useEffect } from "react";
import URLs from '../../lib/urls';
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
  X, Laptop, Speaker, Footprints, Sun, Home, Baby, Shirt
} from "lucide-react";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

import { useSettingsStore } from '../../store/useSettingsStore';
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";

//login 
const Header = () => {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [listIsOpen, setListIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSinglePostOpen, setIsSinglePostOpen] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { fetchMainCategories, mainCategories } = useMainCategoryStore();
  const { fetchSubCategories, subCategories } = useSubCategoryStore();
  const { fetchCategories, categories } = useCategoryStore();
  const [selectedMainCategory, setSelectedMainCategory] = useState<any>(null);
  const [showAll, setShowAll] = useState(false);
  const { settings, fetchSettings } = useSettingsStore();
  const [wishlistCount, setWishlistCount] = useState(0);
  const { getAllCart, cartItems, removeCart } = useCartStore();
  const [token, setToken] = useState<any>(null);
  const visibleCategories = showAll ? mainCategories : mainCategories.slice(0, 10);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchMainCategories();
    fetchSubCategories();
    fetchCategories();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setToken(user);
  }, []);

  useEffect(() => {
    if (!settings) {
      fetchSettings();
    }
  }, [fetchSettings, settings]);

  useEffect(() => {
    if (token) {
      console.log("hii from token", token._id)
      getAllCart(token._id);
    }
  }, [token])

  useEffect(() => {
    const loginStatus = localStorage.getItem("loginSuccess");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount();
    window.addEventListener("wishlistUpdated", updateWishlistCount);
    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
      // window.removeEventListener("storage", updateWishlistCount);
    };
  }, []);

  useEffect(() => {
    const loginStatus = localStorage.getItem("loginSuccess");

    if (loginStatus === "true") {
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "You are logged in",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Not Logged In",
        text: "Please login to continue",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }, []);

  const maincategories = mainCategories.map((cat, index) => ({
    name: cat.name,
  }));
  const filteredSubCategories = subCategories.filter(
    (sub) => sub.mainCategoryId === selectedMainCategory?._id
  );

  const deleteCart = async (id: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "!bg-[var(--red-color)] !p-[1rem] !text-[var(--white)] text-[1.1rem] font-semibold",
        cancelButton: "!bg-[var(--primary)] !p-[1rem] !text-[var(--white)] !mr-[0.6rem] text-[1.1rem] font-semibold  "
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        removeCart(id);
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your cart item has been deleted.",
          icon: "success"
        });
      }

      else if (result.dismiss === Swal.DismissReason.cancel) swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your cart item is safe :)",
        icon: "error"
      });
    });
  }


  const siteLogoUrl = useMemo(() => {
    const logoPath = settings?.branding?.siteLogo;

    if (logoPath) {

      const baseUrl = URLs.FILEURL.replace(/\/$/, "");

      const cleanPath = logoPath.startsWith('/') ? logoPath : `/${logoPath}`;
      return `${baseUrl}${cleanPath}?t=${new Date().getTime()}`;
    }

    return "/evara.svg";
  }, [settings?.branding?.siteLogo]);



  // Logout handler...
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from this session",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3BB77E",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("loginSuccess");
        setIsLoggedIn(false);
        router.push("/login");
        Swal.fire({
          title: "Logged Out!",
          text: "You have successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const categoriess = [
    { icon: <Shirt size={18} />, name: "Women's Clothing" },
    { icon: <Shirt size={18} />, name: "Men's Clothing" },
    { icon: <Smartphone size={18} />, name: "Cellphones" },
    { icon: <Laptop size={18} />, name: "Computer & Office" },
    { icon: <Speaker size={18} />, name: "Consumer Electronics" },
    { icon: <Home size={18} />, name: "Home & Garden" },
    { icon: <Footprints size={18} />, name: "Shoes" },
    { icon: <Baby size={18} />, name: "Mother & Kids" },
    { icon: <Sun size={18} />, name: "Outdoor fun" },
  ];

  const navItems = [
    "Home",
    "About",
    "Shop",
    "Mega menu",
    "Blog",
    "Pages",
    "Contact",
  ];
  const categoryData = {
    "Women's Clothing": {
      col1: { title: "Hot & Trending", items: ["Dresses", "Blouses & Shirts", "Hoodies & Sweatshirts", "Women's Sets", "Suits & Blazers", "Bodysuits", "Tanks & Camis", "Coats & Jackets"] },
      col2: { title: "Bottoms", items: ["Leggings", "Skirts", "Shorts", "Jeans", "Pants & Capris", "Bikini Sets", "Cover-Ups", "Swimwear"] },
      promo: { banner1: "New Arrival", discount1: "10% Off", banner2: "Hot Deals", discount2: "15% Off" }
    },
    "Men's Clothing": {
      col1: { title: "Jackets & Coats", items: ["Down Jackets", "Jackets", "Parkas", "Faux Leather Coats", "Trench", "Wool & Blends", "Vests & Waistcoats", "Leather Coats"] },
      col2: { title: "Suits & Blazers", items: ["Blazers", "Suit Jackets", "Suit Pants", "Suits", "Vests", "Tailor-made Suits", "Cover-Ups"] },
      promo: { banner1: "New Arrival", discount1: "10% Off", banner2: "Hot Deals", discount2: "15% Off" }
    },
    "Cellphones": {
      col1: { title: "Hot & Trending", items: ["Cellphones", "iPhones", "Refurbished Phones", "Mobile Phone", "Mobile Phone Parts", "Phone Bags & Cases", "Communication Equipments", "Walkie Talkie"] },
      col2: { title: "Accessories", items: ["Screen Protectors", "Wire Chargers", "Wireless Chargers", "Car Chargers", "Power Bank", "Armbands", "Dust Plug", "Signal Boosters"] },
      promo: { banner1: "New Arrival", discount1: "10% Off", banner2: "Hot Deals", discount2: "15% Off" }
    }
  };

  // const cartItems = [
  //     { id: 1, name: "Daisy Casual Bag", price: 800, qty: 1, img: "wish1.jpg" },
  //     { id: 2, name: "Corduroy Shirts", price: 3200, qty: 1, img: "wish2.jpg" },
  //   ];
  const CategoryMegaMenu = () => {
    const maincategories = mainCategories.map((cat, index) => ({
      name: cat.name,
    }));

    const validSubCategories = subCategories.filter((sub: any) =>
      categories.some(
        (cat: any) =>
          cat.mainCategoryId?._id === selectedMainCategory?._id &&
          cat.subCategoryId?._id === sub._id
      )
    );
    const hasSubContent = validSubCategories.length > 0;
    const half = Math.ceil(validSubCategories.length / 2);
    const col1 = validSubCategories.slice(0, half);
    const col2 = validSubCategories.slice(half);
    const filteredSubWithImages = validSubCategories.filter(
      (sub: any) => sub.image
    );
    const validCol1 = col1.filter((sub) =>
      categories.some(
        (cat: any) =>
          cat.mainCategoryId?._id === selectedMainCategory._id &&
          cat.subCategoryId?._id === sub._id
      )
    );

    const validCol2 = col2.filter((sub) =>
      categories.some(
        (cat: any) =>
          cat.mainCategoryId?._id === selectedMainCategory._id &&
          cat.subCategoryId?._id === sub._id
      )
    );

    const handleLogout = () => {
      localStorage.removeItem("loginSuccess");
      setIsLoggedIn(false);
      router.push("/login");
    };


    return (
      <>
        <div className={`absolute top-full left-0 mt-2 bg-white border border-gray-200 shadow-xl flex rounded-sm z-[100] 
    ${hasSubContent ? "w-[1000px]" : "w-[250px]"}`}>

          {/* LEFT SIDEBAR (Main Categories) - Always visible */}
          <div className={`${hasSubContent ? "w-1/4" : "w-full"} border-r border-gray-100 py-2`}>
            <ul className="text-sm text-gray-700">
              {visibleCategories.map((cat) => {
                const IconComponent = Icons[cat.icon as keyof typeof Icons] as LucideIcon;
                console.log("ICON:", cat.icon);
                return (
                  <li
                    key={cat._id}
                    onClick={() => setSelectedMainCategory(cat)}
                    className={`group flex justify-between items-center px-4 py-[10.5px] cursor-pointer border-b border-gray-50 last:border-0 hover:bg-gray-50 hover:text-[var(--primary)] 
            ${selectedMainCategory?._id === cat._id ? "text-[var(--primary)] bg-gray-50" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <span> {IconComponent ? (<IconComponent className="text-gray-400" size={18} />) : (<Icons.LayoutGrid size={18} />)}</span>
                      <span className="font-medium">{cat.name}</span>
                    </div>
                    {/* Optional: Add an arrow icon if sub-content exists */}
                  </li>
                )
              })}
              {mainCategories.length > 10 && (
                <li
                  onClick={() => setShowAll(!showAll)}
                  className="px-4 py-3 text-xs text-gray-500 hover:text-[var(--primary)] cursor-pointer text-center font-bold"
                >
                  {showAll ? "- Show Less" : "+ See More"}
                </li>
              )}
            </ul>
          </div>

          {/* RIGHT CONTENT - Only shows if there is data */}
          {
            selectedMainCategory && hasSubContent && (
              <div className={`w-3/4 p-8 grid gap-8 ${filteredSubWithImages.length > 0
                ? validCol1.length > 0 && validCol2.length > 0 ? "grid-cols-3" : "grid-cols-2"
                : validCol1.length > 0 && validCol2.length > 0 ? "grid-cols-2" : "grid-cols-1"}`}>
                {/* COLUMN 1 */}
                {validCol1.length > 0 && (
                  <div>
                    {validCol1.map((sub) => {
                      const filteredCategories = categories.filter(
                        (cat: any) =>
                          cat.mainCategoryId?._id === selectedMainCategory._id &&
                          cat.subCategoryId?._id === sub._id
                      );
                      if (filteredCategories.length === 0) return null;
                      return (
                        <div key={sub._id} className="mb-4">
                          <h3 className="text-[var(--primary)] font-bold text-base mb-2 border-b pb-2">
                            {sub.name}
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {filteredCategories.map((item: any) => (
                              <li key={item._id} className="hover:text-[var(--primary)] cursor-pointer">
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )};
        </div>

        <div className="absolute top-full left-0 mt-2 w-[1000px] bg-white border border-gray-200 shadow-xl rounded-sm z-[100] flex">

          <div className="w-1/4 border-r border-gray-100 py-2">
            <ul className="text-sm text-gray-700">
              {
                categories.map((cat, index) => (
                  <li
                    key={index}
                    className="group flex justify-between items-center px-4 py-[10.5px] hover:bg-gray-50 hover:text-[var(--primary)] cursor-pointer border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg opacity-80">{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                    </div>
                    {cat.hasSub && <span className="text-[10px] text-gray-400 group-hover:text-[var(--primary)]">❯</span>}
                  </li>
                ))
              }
              <li className="px-4 py-3 text-xs text-gray-500 hover:text-[var(--primary)] cursor-pointer text-center font-bold">
                + See More
              </li>
            </ul >
          </div >

          {/* COLUMN 2 */}
          {
            validCol2.length > 0 && (
              <div>
                {validCol2.map((sub) => {
                  const filteredCategories = categories.filter(
                    (cat: any) =>
                      cat.mainCategoryId?._id === selectedMainCategory._id &&
                      cat.subCategoryId?._id === sub._id
                  );
                  if (filteredCategories.length === 0) return null;
                  return (
                    <div key={sub._id} className="mb-4">
                      <h3 className="text-[var(--primary)] font-bold text-base mb-2 border-b pb-2">
                        {sub.name}
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {filteredCategories.map((item: any) => (
                          <li key={item._id} className="hover:text-[var(--primary)] cursor-pointer">
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )
          }
          {/* COLUMN 3 (Images) */}

          <div className="space-y-4">
            {filteredSubWithImages.slice(0, 2).map((sub: any) => (
              <div key={sub._id} className="relative rounded-md h-40 overflow-hidden">
                <img
                  src={`${URLs.FILEURL}${sub.image.replace(/^\/+/, "")}`}
                  alt={sub.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div >
      </>
    )
  };

  return (
    <header className="w-full relative ">

      <div className="bg-gray-100 px-10 text-gray-600 text-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Smartphone size={14} />
              (+01) – 2345 – 6789
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin size={14} />
              Our location
            </span>
          </div>

          <div className="hidden md:block">
            Get great devices <strong>up to 50% off</strong>{" "}
            <a href="#" className="text-[var(--primary)] hover:underline">
              View details
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--primary)] transition">
              English <ChevronDown size={14} />
            </div>
            <span>|</span>

            {/* //for login */}
            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="hover:text-[var(--primary)] font-medium cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" className="hover:text-[var(--primary)]">Login</Link>
                  <span>/</span>
                  <Link href="/register" className="hover:text-[var(--primary)]">Sign Up</Link>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      <div className="bg-white px-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <img
              key={siteLogoUrl} // Important: Forces the image to swap immediately on update
              src={siteLogoUrl}
              alt="Site Logo"
              className="h-8 object-contain"
              onError={(e) => {
                // Extra safety: if the image fails to load, revert to fallback
                (e.target as HTMLImageElement).src = "/evara.svg";
              }}
            />

          </div>

          <div className="hidden lg:flex items-center w-full max-w-[700px] border-b-3 border-gray-800 bg-transparent relative h-[45px] ml-10">
            {/* Category Dropdown Toggle */}
            <div className="relative h-full">
              <button
                onClick={() => setListIsOpen(!listIsOpen)}
                className="px-0 py-3 text-[14px] font-bold flex items-center gap-2 text-[#253D4E] min-w-[130px] whitespace-nowrap h-full"
              >
                {selectedCategory}
                <ChevronDown size={14} className={`transition-transform duration-300 ${listIsOpen ? 'rotate-180' : ''} text-gray-400`} />
              </button>

              {/* The Dropdown Menu */}
              {listIsOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setListIsOpen(false)}></div>

                  <ul className="absolute left-0 top-[100%] mt-2 w-64 bg-white border border-gray-100 rounded-md shadow-xl z-20 max-h-80 overflow-y-auto custom-scrollbar py-2">
                    <li
                      onClick={() => { setSelectedCategory("All Categories"); setListIsOpen(false); }}
                      className="px-5 py-2 text-[13px] hover:bg-[#F7F8F9] hover:text-[#3BB77E] cursor-pointer transition-colors"
                    >
                      All Categories
                    </li>
                    {maincategories.map((cat, index) => (
                      <li
                        key={index}
                        onClick={() => { setSelectedCategory(cat.name); setListIsOpen(false); }}
                        className="px-5 py-2 text-[13px] text-[#253D4E] hover:bg-[#F7F8F9] hover:text-[#3BB77E] cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <span className="opacity-70">{cat.icon}</span>
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Vertical Separator - Thin and subtle like the image */}
            <div className="h-4 w-[1px] bg-gray-300 mx-2"></div>
            <span className="text-gray-400">
              <Search size={20} strokeWidth={1.5} />
            </span>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for items..."
              className="flex-1 px-4 py-2 outline-none text-[14px] text-[#253D4E] placeholder-gray-400 bg-transparent"
            />
          </div>

          <div className="flex items-center gap-6">

            {/* Icons */}
            <div className="flex items-center gap-6">
              {/* Wishlist Link - LINE 360 UPDATED HERE */}
              <Link href="/wishlist" className="relative cursor-pointer group flex items-center gap-2">
                <div className="relative">
                  <Heart
                    size={28}
                    fill="none"
                    stroke="#253D4E"
                    className="transition-all duration-300 group-hover:stroke-[#3BB77E]"
                  />
                  {/*  UPDATED: dynamic count */}
                  <span className="absolute -top-1 -right-1 bg-[#3BB77E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                </div>
                {/* <span className="hidden xl:block text-sm text-gray-600 mt-1">Wishlist</span> */}
              </Link>
              <div className={`${token ? 'relative group py-4' : 'hidden'}`}>
                <div className="relative cursor-pointer">
                  <ShoppingCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-[#3BB77E] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {cartItems ? cartItems.length : 0}
                  </span>
                </div>

                <div className={`${token ? 'absolute right-0 top-full hidden group-hover:block w-80 bg-white shadow-xl rounded-lg border border-gray-100 p-5 z-50' : 'hidden'}`}>
                  <ul className="space-y-4">
                    {cartItems ? cartItems.map((item: any) => (
                      <li key={item._id} className="flex items-center justify-between gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img src={` http://localhost:5000${item.productId.thumbnail}`} alt={item.productId.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-[#3BB77E] truncate w-32">{item.productId.name}</h4>
                          <p className="text-gray-500 text-xs">{item.quantity} × ${(item.price / item.quantity).toFixed(2)}</p>
                        </div>
                        <button className="text-gray-400 hover:text-red-500" onClick={() => deleteCart(item._id)}>
                          <X size={16} />
                        </button>
                      </li>
                    )) : <div></div>}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-500 font-medium">Total</span>
                      <span className="text-[#3BB77E] font-bold text-lg">{"$" + (cartItems ? cartItems.reduce((acc, item: any) => acc + item.price, 0) : 0).toFixed(2)}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link href='/cart' className="flex-1 !text-center border border-[#3BB77E] !text-[#3BB77E] py-2 rounded text-sm font-medium hover:bg-[#3BB77E] hover:!text-white transition-colors">
                        View cart
                      </Link>
                      <Link href='/checkout' className="flex-1 text-center bg-[#3BB77E] !text-white py-2 rounded text-sm font-medium hover:bg-[#2fa36f] transition-colors">
                        Checkout
                      </Link>
                    </div >
                  </div >
                </div >
              </div>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden"
            >
              <Menu size={28} />
            </button>

          </div>
        </div>
      </div>

      <div className="hidden lg:block border-t border-gray-200 px-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          <div className="relative">
            <div
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[var(--primary-hover)] transition"
            >
              <LayoutGrid size={18} />
              <span className="text-sm font-medium">Browse Categories</span>
            </div>

            {isCategoryOpen && <CategoryMegaMenu />}
          </div>

          <nav>
            <ul className="flex items-center gap-8 text-sm font-medium text-gray-800">
              {navItems.map((item, i) => (
                <li
                  key={i}
                  className="relative group flex items-center gap-1 cursor-pointer hover:text-[var(--primary)] transition"
                >
                  {item}
                  {item !== "Contact" && item !== "About" && <ChevronDown size={12} />}

                  {item === "Home" && (
                    <div className="absolute top-full left-0 mt-4 w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <ul className="py-2 text-sm text-gray-700">
                        <li className="px-4 py-2 hover:bg-gray-100">Home 1</li>
                        <li className="px-4 py-2 hover:bg-gray-100">Home 2</li>
                        <li className="px-4 py-2 hover:bg-gray-100">Home 3</li>
                        <li className="px-4 py-2 hover:bg-gray-100">Home 4</li>
                      </ul>
                    </div>
                  )}

                  {item === "Shop" && (
                    <div className="absolute top-full left-0 mt-4 w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <ul className="py-2 text-sm text-gray-700">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop Grid – Right Sidebar</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop Grid – Left Sidebar</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop List – Right Sidebar</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop List – Left Sidebar</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop – Wide</li>

                        <li className="group/sub relative px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center text-[var(--primary)]">
                          Single Product
                          <span>&gt;</span>

                          <div className="absolute left-full top-0 ml-px w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300">
                            <ul className="py-2 text-sm text-gray-700">
                              <li className="px-4 py-2 hover:bg-gray-100">Product – Right Sidebar</li>
                              <li className="px-4 py-2 hover:bg-gray-100">Product – Left Sidebar</li>
                              <li className="px-4 py-2 hover:bg-gray-100">Product – No sidebar</li>
                            </ul>
                          </div>
                        </li>

                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop – Filter</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop – Wishlist</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop – Cart</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop – Checkout</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop – Compare</li>
                      </ul>
                    </div>
                  )}

                  {item === "Pages" && (
                    <div className="absolute top-full left-0 mt-4 w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <ul className="py-2 text-sm text-gray-700">
                        <li className="px-4 py-2 hover:bg-gray-100">About Us</li>
                        <li className="px-4 py-2 hover:bg-gray-100">Contact</li>
                        <li className="px-4 py-2 hover:bg-gray-100">My Account</li>
                        <li className="px-4 py-2 hover:bg-gray-100">Login / Register</li>
                        <li className="px-4 py-2 hover:bg-gray-100">Privacy Policy</li>
                        <li className="px-4 py-2 hover:bg-gray-100">404 Page</li>
                      </ul>
                    </div>
                  )}

                  {item === "Blog" && (
                    <div className="absolute top-full left-0 mt-4 w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <ul className="py-2 text-sm text-gray-700">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Blog Category Grid</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Blog Category List</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Blog Category Big</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Blog Category Wide</li>

                        <li className="group/sub relative px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center text-[var(--primary)]">
                          Single Post
                          <span className="text-xs">❯</span>

                          <div className="absolute left-full top-0 ml-px w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 border-l border-gray-100">
                            <ul className="py-2 text-sm text-gray-700">
                              <li className="px-4 py-2 hover:bg-gray-100 hover:text-[var(--primary)]">Left Sidebar</li>
                              <li className="px-4 py-2 hover:bg-gray-100 hover:text-[var(--primary)]">Right Sidebar</li>
                              <li className="px-4 py-2 hover:bg-gray-100 hover:text-[var(--primary)]">No Sidebar</li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}

                  {item === "Mega menu" && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-6 w-260 max-w-7xl bg-white shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-8">

                      <div className="grid grid-cols-4 gap-10">

                        <div>
                          <h4 className="text-[var(--primary)] font-semibold mb-4">
                            Women's Fashion
                          </h4>
                          <ul className="space-y-3 text-gray-700">
                            <li className="hover:text-[var(--primary)] cursor-pointer">Dresses</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Blouses & Shirts</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Hoodies & Sweatshirts</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Wedding Dresses</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Prom Dresses</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Cosplay Costumes</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-[var(--primary)] font-semibold mb-4">
                            Men's Fashion
                          </h4>
                          <ul className="space-y-3 text-gray-700">
                            <li className="hover:text-[var(--primary)] cursor-pointer">Jackets</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Casual Faux Leather</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Genuine Leather</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Casual Pants</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Sweatpants</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Harem Pants</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-[var(--primary)] font-semibold mb-4">
                            Technology
                          </h4>
                          <ul className="space-y-3 text-gray-700">
                            <li className="hover:text-[var(--primary)] cursor-pointer">Gaming Laptops</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Ultraslim Laptops</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Tablets</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Laptop Accessories</li>
                            <li className="hover:text-[var(--primary)] cursor-pointer">Tablet Accessories</li>
                          </ul>
                        </div>

                        <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-between">
                          <div>
                            <p className="text-sm text-gray-500 uppercase">
                              Hot Deals
                            </p>
                            <h3 className="text-2xl font-bold mt-2">
                              Don't miss <br /> Trending
                            </h3>
                            <p className="text-[var(--primary)] font-semibold mt-2">
                              Save to 50%
                            </p>
                          </div>

                          <button className="mt-6 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition">
                            Shop now
                          </button>
                        </div>

                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <PhoneCall size={20} className="text-[var(--primary)]" />
            <div className="text-sm">
              <span className="block text-gray-500">
                Hotline
              </span>
              <strong className="text-gray-800">
                1900 – 888
              </strong>
            </div>
          </div>

        </div>
      </div>


      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 lg:hidden flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-white">
          <img
            src="/evara.svg"
            alt="Evaria Logo"
            className="h-8 w-auto object-contain"
          />

          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 border-b border-gray-300">
            <div className="flex border rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search for items..."
                className="flex-1 px-3 py-2 text-sm outline-none"
              />
              <button className="px-3 text-[var(--primary)]">
                <Search size={18} />
              </button>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <div
              className="px-6 py-4 flex items-center justify-between text-[var(--primary)] font-medium cursor-pointer"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
              <div className="flex items-center gap-2">
                <LayoutGrid size={18} />
                Browse Categories
              </div>

            </div>

            {isCategoriesOpen && (
              <ul className="px-6 pb-4 space-y-4 animate-fadeIn">
                {categories.map((cat, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700 hover:text-[var(--primary)] cursor-pointer text-sm">
                    <span className="text-gray-400">{cat.icon}</span>
                    {cat.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ul className="flex flex-col px-6 py-4 space-y-4 text-gray-800 font-medium">
            {navItems.map((item, i) => {
              const hasDropdown = item !== "Contact" && item !== "About";
              const isItemOpen = openMobileSubMenu === item;

              return (
                <li key={i} className="flex flex-col">
                  <div
                    className="flex justify-between items-center cursor-pointer hover:text-[var(--primary)] transition py-1"
                    onClick={() => {
                      if (hasDropdown) {
                        setOpenMobileSubMenu(isItemOpen ? null : item);
                      }
                    }}
                  >
                    <span>{item}</span>
                    {hasDropdown && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${isItemOpen ? "rotate-180 text-[var(--primary)]" : ""}`}
                      />
                    )}
                  </div>

                  {hasDropdown && isItemOpen && (
                    <ul className="mt-2 ml-4 flex flex-col gap-3 text-sm font-normal text-gray-600 border-l border-gray-100 pl-4 animate-in fade-in slide-in-from-top-1 duration-200">
                      {item === "Home" && (
                        <>
                          <li className="hover:text-[var(--primary)]">Home 1</li>
                          <li className="hover:text-[var(--primary)]">Home 2</li>
                          <li className="hover:text-[var(--primary)]">Home 3</li>
                          <li className="hover:text-[var(--primary)]">Home 4</li>
                        </>
                      )}
                      {item === "Shop" && (
                        <>
                          <li className="hover:text-[var(--primary)]">Shop Grid – Right Sidebar</li>
                          <li className="hover:text-[var(--primary)]">Shop Grid – Left Sidebar</li>
                          <li className="hover:text-[var(--primary)]">Shop List – Right Sidebar</li>
                          <li className="hover:text-[var(--primary)]">Shop List – Left Sidebar</li>
                          <li className="hover:text-[var(--primary)]">Shop - Wide</li>
                          <li className="hover:text-[var(--primary)]">Single Product</li>
                          <li className="hover:text-[var(--primary)]">Shop - Filter</li>
                          <li className="hover:text-[var(--primary)]">Shop - Wishlist</li>
                          <li className="hover:text-[var(--primary)]">Shop - Cart</li>
                          <li className="hover:text-[var(--primary)]">Shop - Checkout</li>
                          <li className="hover:text-[var(--primary)]">Shop - Compare</li>
                        </>
                      )}
                      {item === "Mega menu" && (
                        <>
                          <li className="hover:text-[var(--primary)] font-bold text-[var(--primary)]">Fashion</li>
                          <li className="hover:text-[var(--primary)]">Dresses</li>
                          <li className="hover:text-[var(--primary)] font-bold text-[var(--primary)] mt-1">Technology</li>
                          <li className="hover:text-[var(--primary)]">Smartphones</li>
                        </>
                      )}
                      {item === "Blog" && (
                        <ul className="pl-4 space-y-2">
                          <li className="hover:text-[var(--primary)] cursor-pointer">Blog Category Grid</li>
                          <li className="hover:text-[var(--primary)] cursor-pointer">Blog Category List</li>
                          <li className="hover:text-[var(--primary)] cursor-pointer">Blog Category Big</li>
                          <li className="hover:text-[var(--primary)] cursor-pointer">Blog Category Wide</li>

                          {/* Nested Dropdown Trigger */}
                          <li className="group">
                            <div
                              className="flex items-center justify-between hover:text-[var(--primary)] cursor-pointer"
                              onClick={() => setIsSinglePostOpen(!isSinglePostOpen)}
                            >
                              <span>Single Product Layout</span>
                              <span className={`transform transition-transform ${isSinglePostOpen ? 'rotate-180' : ''}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                              </span>
                            </div>

                            {/* Nested Items */}
                            {isSinglePostOpen && (
                              <ul className="pl-6 mt-2 space-y-2 text-gray-600 border-l-2 border-gray-100">
                                <li className="hover:text-[var(--primary)] cursor-pointer">Left Sidebar</li>
                                <li className="hover:text-[var(--primary)] cursor-pointer">Right Sidebar</li>
                                <li className="hover:text-[var(--primary)] cursor-pointer">No Sidebar</li>
                              </ul>
                            )}
                          </li>
                        </ul>
                      )}
                      {item === "Pages" && (
                        <>
                          <li className="hover:text-[var(--primary)]">About Us</li>
                          <li className="hover:text-[var(--primary)]">Contact</li>
                          <li className="hover:text-[var(--primary)]">My Account</li>
                          <li className="hover:text-[var(--primary)]">login/register</li>
                          <li className="hover:text-[var(--primary)]">Purchase Guide</li>
                          <li className="hover:text-[var(--primary)]">Privacy Policy</li>
                          <li className="hover:text-[var(--primary)]">Terms of Service</li>
                          <li className="hover:text-[var(--primary)]">404 Page</li>
                        </>
                      )}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-auto px-6 py-6 border-t border-gray-300 text-sm text-gray-600 space-y-3 bg-gray-50">
          <p className="flex items-center gap-2 text-green-500"><MapPin size={14} /> Our location</p>
          <p className="flex items-center gap-2 cursor-pointer hover:text-[var(--primary)] transition">Log In / Sign Up</p>
          <p className="flex items-center gap-2 text-green-500"><Smartphone size={14} /> (+01) – 2345 – 6789</p>
        </div>
      </div>

    </header >
  );
};

export default Header;
