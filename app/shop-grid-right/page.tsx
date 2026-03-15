"use client";
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Filter,Search,Heart,ArrowUpDown, ChevronDown, Check,LayoutGrid,RefreshCw, ShoppingBag,ChevronRight ,List,Grid3X3,Menu } from "lucide-react";
import { useState } from 'react';
import  QuickViewModal from './QuickViewModal/QuickViewModal';
import { useRouter, usePathname } from 'next/navigation';

export default function ProductGridPage() {
  const router = useRouter();
  const pathname = usePathname();
   const products = [
  {
    badge: "Hot",
    badgeColor: "bg-[#f74877]",
    category: "Music",
    title: "Colorful Pattern Shirts",
    price: "238.85",
    oldPrice: "245.8",
    rating: "90",
    image: "/shop/product-1.jpg",
    hoverImage:"/shop/product-hover-1.jpg"
  },
  {
    badge: "New",
    badgeColor: "bg-[var(--primary)]",
    category: "Music",
    title: "Cartoon Astronaut T-Shirts",
    price: "138.85",
    oldPrice: "255.8",
    rating: "50",
    image: "/shop/product-2.jpg",
    hoverImage:"/shop/product-hover-2.jpg"
  },
  {
    badge: "Best Sell",
    badgeColor: "bg-[#f59758]",
    category: "Watch",
    title: "Plain Striola Shirts",
    price: "338.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-3.jpg",
    hoverImage:"/shop/product-hover-3.jpg"
  },
  {
    badge: "Sale",
    badgeColor: "bg-[#f59758]",
    category: "Music",
    title: "Landscape Painting Shirt",
    price: "123.85",
    oldPrice: "245.8",
    rating: "95",
    image: "/shop/product-4.jpg",
    hoverImage:"/shop/product-hover-1.jpg"
  },
  {
    badge: "-30%",
    badgeColor: "bg-[#f74877]",
    category: "Speaker",
    title: "Letter Print T-Shirt",
    price: "38.85",
    oldPrice: "45.8",
    rating: "95",
    image: "/shop/product-5.jpg",
    hoverImage:"/shop/product-hover-1.jpg"
  },
  {
    badge: "-22%",
    badgeColor: "bg-[#f74877]",
    category: "Camera",
    title: "Element Pattern Print Shirts",
    price: "238.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-6.jpg",
    hoverImage:"/shop/product-hover-1.jpg"
  },
  {
    badge: "New",
    badgeColor: "bg-[#7E7E7E]",
    category: "Phone",
    title: "Vintage Henley Shirts",
    price: "1338.85",
    oldPrice: "1445.8",
    rating: "95",
    image: "/shop/product-7.jpg",
    hoverImage:"/shop/product-hover-4.jpg"
  },
  {
    badge: "Best Sell",
    badgeColor: "bg-[#f59758]",
    category: "Accessories",
    title: "Cotton Leaf Printed",
    price: "338.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-8.jpg",
    hoverImage:"/shop/product-hover-5.jpg"
  },
  {
    badge: "Best Sell",
    badgeColor: "bg-[#253D4E]",
    category: "Watch",
    title: "Plain Striola Shirts",
    price: "338.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-9.jpg",
    hoverImage:"/shop/product-hover-6.jpg"
  },
  {
    badge: "Best Sell",
    badgeColor: "bg-[#f59758]",
    category: "Watch",
    title: "Plain Striola Shirts",
    price: "338.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-1.jpg",
    hoverImage:"/shop/product-hover-2.jpg"
  },
  {
    badge: "Best Sell",
    badgeColor: "bg-[#7E7E7E]",
    category: "Watch",
    title: "Plain Striola Shirts",
    price: "338.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-2.jpg",
    hoverImage:"/shop/product-hover-1.jpg"
  },
  {
    badge: "Best Sell",
    badgeColor: "bg-[#f59758]",
    category: "Watch",
    title: "Plain Striola Shirts",
    price: "338.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-3.jpg",
    hoverImage:"/shop/product-hover-3.jpg"
  },
   {
    badge: "Hot",
    badgeColor: "bg-[#f74877]",
    category: "Music",
    title: "Colorful Pattern Shirts",
    price: "238.85",
    oldPrice: "245.8",
    rating: "90",
    image: "/shop/product-1.jpg",
    hoverImage:"/shop/product-hover-1.jpg"
  },
  {
    badge: "New",
    badgeColor: "bg-[var(--primary)]",
    category: "Music",
    title: "Cartoon Astronaut T-Shirts",
    price: "138.85",
    oldPrice: "255.8",
    rating: "50",
    image: "/shop/product-2.jpg",
    hoverImage:"/shop/product-hover-2.jpg"
  },
  {
    badge: "Best Sell",
    badgeColor: "bg-[#f59758]",
    category: "Watch",
    title: "Plain Striola Shirts",
    price: "338.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-3.jpg",
    hoverImage:"/shop/product-hover-3.jpg"
  },
  {
    badge: "Sale",
    badgeColor: "bg-[#f59758]",
    category: "Music",
    title: "Landscape Painting Shirt",
    price: "123.85",
    oldPrice: "245.8",
    rating: "95",
    image: "/shop/product-4.jpg",
    hoverImage:"/shop/product-hover-1.jpg"
  },
  {
    badge: "-30%",
    badgeColor: "bg-[#f74877]",
    category: "Speaker",
    title: "Letter Print T-Shirt",
    price: "38.85",
    oldPrice: "45.8",
    rating: "95",
    image: "/shop/product-5.jpg",
    hoverImage:"/shop/product-hover-1.jpg"
  },
  {
    badge: "-22%",
    badgeColor: "bg-[#f74877]",
    category: "Camera",
    title: "Element Pattern Print Shirts",
    price: "238.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-6.jpg",
    hoverImage:"/shop/product-hover-1.jpg"
  },
  {
    badge: "New",
    badgeColor: "bg-[#7E7E7E]",
    category: "Phone",
    title: "Vintage Henley Shirts",
    price: "1338.85",
    oldPrice: "1445.8",
    rating: "95",
    image: "/shop/product-7.jpg",
    hoverImage:"/shop/product-hover-4.jpg"
  },
  {
    badge: "Best Sell",
    badgeColor: "bg-[#f59758]",
    category: "Accessories",
    title: "Cotton Leaf Printed",
    price: "338.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-8.jpg",
    hoverImage:"/shop/product-hover-5.jpg"
  },
  {
    badge: "Best Sell",
    badgeColor: "bg-[#253D4E]",
    category: "Watch",
    title: "Plain Striola Shirts",
    price: "338.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-9.jpg",
    hoverImage:"/shop/product-hover-6.jpg"
  },
  {
    badge: "Best Sell",
    badgeColor: "bg-[#f59758]",
    category: "Watch",
    title: "Plain Striola Shirts",
    price: "338.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-1.jpg",
    hoverImage:"/shop/product-hover-2.jpg"
  },
  {
    badge: "Best Sell",
    badgeColor: "bg-[#7E7E7E]",
    category: "Watch",
    title: "Plain Striola Shirts",
    price: "338.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-2.jpg",
    hoverImage:"/shop/product-hover-1.jpg"
  },
  {
    badge: "Best Sell",
    badgeColor: "bg-[#f59758]",
    category: "Watch",
    title: "Plain Striola Shirts",
    price: "338.85",
    oldPrice: "445.8",
    rating: "95",
    image: "/shop/product-2.jpg",
    hoverImage:"/shop/product-hover-1.jpg"
  }
];
  const [isShowOpen, setIsShowOpen] = useState(false);
  const [showSelected, setShowSelected] = useState("50");
  const showOptions = ["50", "100", "150", "200", "All"];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Featured');
  const options = [ 'Featured','Price: Low to High','Price: High to Low','Release Date','Avg. Rating'];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <main className="w-full !overflow-x-hidden !mt-9">
      <div className='max-w-[1600px] !mx-auto !px-4 sm:!px-6 lg:!px-10 !py-6'>
        <div className="flex justify-end">
        <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="flex items-center gap-2 !px-4 !py-2 mb-2 rounded border transition-all"
        style={{ borderColor: "var(--border-color)" }}
      >
        <Menu size={18} style={{ color: "var(--primary)" }} />
        </button>
      </div>
        {/* Main*/}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Left Side  */}
            <div className={`col-span-12 ${isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"} lg:order-1 order-2`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 !mb-6">
              <p className="text-[var(--text-muted)] text-sm sm:text-lg font-semibold">
                We found <span className="text-[var(--primary)] font-bold">{products.length}</span> items for you!
              </p>

              <div className="flex items-center gap-2 ">
                 <div className="hidden lg:block relative text-left">
                      <button
                        onClick={() => setIsViewOpen(!isViewOpen)}
                        className="flex items-center gap-2 !px-5 !py-3 border border-gray-200 rounded-full bg-white transition-colors"
                        style={{ borderColor: 'var(--border-color)' }}
                      >
                        {/* Dynamic Icon */}
                        {pathname.includes('list') ? (
                          <List size={16} className="text-[var(--text-muted)]" />
                        ) : (
                          <Grid3X3 size={16} className="text-[var(--text-muted)]" />
                        )}

                        <span className="text-sm text-[var(--text-muted)]">View:</span>
                        <span className="text-sm text-[var(--text-main)]">
                          {pathname.includes('list') ? 'List' : 'Grid'}
                        </span>

                        <ChevronDown 
                          size={14} 
                          strokeWidth={3} 
                          className={`ml-1 text-[var(--text-muted)] transition-transform duration-300 ${isViewOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>

                      {isViewOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsViewOpen(false)} />
                          <ul 
                            className="absolute left-0 z-50 !mt-2 w-full min-w-[150px] bg-white border rounded-[10px] shadow-xl !py-2 animate-in fade-in zoom-in duration-200"
                            style={{ borderColor: 'var(--border-color)' }}
                          >
                            <li
                              onClick={() => { router.push('/shop-grid-right'); setIsViewOpen(false); }}
                              className="group flex items-center !px-4 !py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--primary-hover)] hover:text-white transition-colors cursor-pointer"
                            >
                              <div className="w-5 flex shrink-0 items-center">
                                {!pathname.includes('list') && <Check size={14} strokeWidth={4} className="text-[var(--primary)] group-hover:text-white" />}
                              </div>
                              <span className={`ml-1 ${!pathname.includes('list') ? 'font-bold' : 'font-medium'}`}>Grid View</span>
                            </li>
                            <li
                              onClick={() => { router.push('/shop-list-right'); setIsViewOpen(false); }}
                              className="group flex items-center !px-4 !py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--primary-hover)] hover:text-white transition-colors cursor-pointer"
                            >
                              <div className="w-5 flex shrink-0 items-center">
                                {pathname.includes('list') && <Check size={14} strokeWidth={4} className="text-[var(--primary)] group-hover:text-white" />}
                              </div>
                              <span className={`ml-1 ${pathname.includes('list') ? 'font-bold' : 'font-medium'}`}>List View</span>
                            </li>
                          </ul>
                        </>
                      )}
                        </div>
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setIsShowOpen(!isShowOpen)}
                  className="flex items-center gap-2 !px-5 !py-3 border border-gray-200 rounded-full bg-white transition-colors"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <LayoutGrid size={16} className="text-[var(--text-muted)]" strokeWidth={2} />
                  
                  <span className="text-sm text-[var(--text-muted)]">Show:</span>
                  <span className="text-sm text-[var(--text-main)]">{showSelected}</span>
                  
                  <ChevronDown 
                    size={14} 
                    strokeWidth={3} 
                    className={`ml-1 text-[var(--text-muted)] transition-transform duration-300 ${isShowOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

              {isShowOpen && (
                <>
                  <div className="fixed inset-0 z-40 " onClick={() => setIsShowOpen(false)} />             
                  <ul 
                    className="absolute left-0 z-50 !mt-2 w-full min-w-[120px] bg-white border rounded-[10px] shadow-xl !py-2 animate-in fade-in zoom-in duration-200"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    {showOptions.map((option) => (
                      <li
                        key={option}
                        onClick={() => {
                          setShowSelected(option);
                          setIsShowOpen(false);
                        }}
                        className="group flex items-center !px-4 !py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--primary-hover)] hover:text-white transition-colors cursor-pointer"
                      >
                        <div className="w-5 flex shrink-0 items-center">
                          {showSelected === option && (
                            <Check 
                              size={14} 
                              strokeWidth={4} 
                              className="text-[var(--primary)] group-hover:text-white" 
                            />
                          )}
                        </div>
                
                      <span className={`ml-1 ${showSelected === option ? 'font-bold' : 'font-medium'}`}>
                        {option}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            </div>
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 !px-5 !py-3 border border-gray-200 rounded-full bg-white transition-colors"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <ArrowUpDown size={16} className="text-[var(--text-muted)]" strokeWidth={2} />
                
                <span className="text-[var(--text-muted)] text-sm">Sort by:</span>
                <span className="text-[var(--text-main)] text-sm">{selected}</span>

                <ChevronDown 
                  size={14} 
                  strokeWidth={3} 
                  className={`ml-1 text-[var(--text-muted)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {isOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                  
                  <ul 
                    className="absolute left-0 z-50 !mt-2 w-56 bg-white border rounded-[10px] shadow-xl !py-2 animate-in fade-in zoom-in duration-200"
                    style={{ borderColor: 'var(--border-color)' }}
                  >
                    {options.map((option) => (
                      <li
                        key={option}
                        onClick={() => {
                          setSelected(option);
                          setIsOpen(false);
                        }}
                        className="group flex items-center !px-4 !py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--primary-hover)] hover:text-white transition-colors cursor-pointer"
                      >
                        <div className="w-5 flex shrink-0 items-center">
                          {selected === option && (
                            <Check 
                              size={14} 
                              strokeWidth={4} 
                              className="text-[var(--primary)] group-hover:text-white" 
                            />
                          )}
                        </div>

                        <span className={`ml-1 ${selected === option ? 'font-bold' : 'font-medium'}`}>
                          {option}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
              </div>
              </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${isSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4" } gap-6`}>
      {currentProducts.map((product, index) => (
        <div
          key={index}
          className="group relative w-full bg-white border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
          style={{ borderColor: 'var(--border-color)' }}
        >
          {product.badge && (
            <span className={`absolute !top-7 !left-7 z-20 !px-3 !py-1 rounded-full text-[.80rem] text-white ${product.badgeColor}`}>
              {product.badge}
            </span>
          )}

          <div className="relative aspect-square overflow-hidden !rounded-[20px] bg-[#f7f8f9] !mx-4 !mt-4 cursor-pointer">
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-full object-contain transition-all duration-700 group-hover:opacity-0 group-hover:scale-105 "
            />

            <Image
              src={product.hoverImage}
              alt={`${product.title} hover`}
              width={300}
              height={300}
              className="absolute inset-0 w-full h-full object-contain transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />

            <div className="hidden lg:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 pointer-events-none group-hover:pointer-events-auto">
              <div className="flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="relative p-3 bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:mb-2 rounded-full shadow-md transition-all duration-300 flex items-center justify-center group/tool"
                >
                  <Search size={20} className="transition-colors duration-300 group-hover/tool:text-white"/>
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white font-semibold text-[.85rem] p-2 rounded opacity-0 group-hover/tool:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-sm">
                    Quick View
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--primary)]"></div>
                  </span>
                </button>

                <button 
                  onClick={() => console.log("Add to Wishlist")}
                  className="relative p-3 bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:mb-2 rounded-full shadow-md transition-all duration-300 flex items-center justify-center group/tool"
                >
                  <Heart size={20} className="transition-colors duration-300 group-hover/tool:text-white"/>
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white text-[.85rem] p-2 font-semibold  rounded opacity-0 group-hover/tool:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-sm">
                    Add to Wishlist
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--primary)]"></div>
                  </span>
                </button>

                <button 
                  onClick={() => console.log("Add to Compare")}
                  className="relative p-3 bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:mb-2 rounded-full shadow-md transition-all duration-300 flex items-center justify-center group/tool"
                >
                  <RefreshCw size={20} className="transition-colors duration-300 group-hover/tool:text-white" />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white text-[.85rem] p-2 font-semibold rounded opacity-0 group-hover/tool:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-sm">
                    Compare
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--primary)]"></div>
                  </span>
                </button>
                                            
              </div>
            </div>    
          </div>

          <div className="!p-6">
            <p className="text-sm text-[var(--text-muted)]">{product.category}</p>
            <h3 className="text-lg font-bold text-[var(--text-main)] hover:text-[var(--primary)] cursor-pointer transition-colors leading-tight !my-1">
              {product.title}
            </h3>
            
            <div className="flex items-center gap-2">
              <div className="flex text-[#ffb703] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14}/>
                ))}
              </div>
              <span className="text-lg font-semibold text-[var(--text-muted)]">{product.rating}%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center !gap-2">
                <span className="text-lg font-bold text-[var(--primary)]">${product.price}</span>
                <span className="text-sm text-[var(--text-muted)] line-through">${product.oldPrice}</span>
              </div>
              <button 
                onClick={() => console.log("Added to Cart")}
                className="relative p-3 bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center group/tool"
              >
                <ShoppingBag size={20} className="transition-colors duration-300 group-hover/tool:text-white"/>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white font-semibold text-[.85rem] px-1 py-1.5 rounded opacity-0 group-hover/tool:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-sm">
                  Add to Cart
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--primary)]"></div>
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 mt-12 mb-10">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all
                      ${isActive 
                        ? 'bg-[var(--primary)] text-white'
                        : 'bg-[#f7f8f9] text-[#253D4E] hover:bg-[var(--primary)] hover:text-white'
                      }
                    `}
                  >
                    {pageNum < 10 ? `0${pageNum}` : pageNum}
                  </button>
                );
              })}

              {totalPages > 3 && <span className="text-[#7E7E7E] px-2">...</span>}
              {totalPages > 3 && (
                 <>
                    <span className="text-[#7E7E7E] px-2 font-bold">...</span>
                    <button className="w-11 h-11 rounded-lg flex items-center justify-center font-bold bg-[#f2f3f4] text-[#253D4E] hover:bg-[var(--primary)] hover:text-white">
                    16
                    </button>
                </>
              )}

              <button 
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#f7f8f9] text-[#253D4E] hover:bg-[var(--primary)] hover:text-white transition-all"
              >
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </div>
              </div>
            </div>  

          {/* Right Sidebar */}
          {isSidebarOpen && (
            <div className={` col-span-12 lg:col-span-3 ${isSidebarOpen ? "block" : "hidden"} lg:block order-1 lg:order-2`}>
            <div className="!space-y-6 lg:!space-y-8 ">
              <div className="!mb-0 lg:!mb-8 border rounded-lg !p-5 " style={{ borderColor: 'var(--border-color)' }} >
                <div className="relative !mb-4 sm:!mb-5">
                <h2
                  className="font-bold text-base !pb-3 border-b"
                  style={{
                    color: 'var(--text-main)',
                    borderColor: 'var(--border-color)'
                  }}
                >
                  Category
                </h2>

                <span className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-[var(--primary)]"></span>
              </div>

                <ul className="!space-y-4 sm:!space-y-5 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <li className="hover:text-[var(--primary)]  cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1 ">Shoes & Bags</li>
                  <li className="hover:text-[var(--primary)]  cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1">Blouses & Shirts</li>
                  <li className="hover:text-[var(--primary)]  cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1">Dresses</li>
                  <li className="hover:text-[var(--primary)] cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1">Swimwear</li>
                  <li className="hover:text-[var(--primary)] cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1">Beauty</li>
                  <li className="hover:text-[var(--primary)] cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1">Jewelry & Watch</li>
                  <li className="hover:text-[var(--primary)] cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1">Accessories</li>
                </ul>
              </div>

              <div className="!mb-0 lg:!mb-8 border rounded-lg !p-5" style={{ borderColor: 'var(--border-color)' }}>
                <div className="!mb-6">
                  <div className="relative">
                  <h2 className="font-bold text-base !mb-4 sm:!mb-5 !pb-3"
                    style={{
                      color: 'var(--text-main)',
                      borderBottom: '1px solid var(--border-color)'
                    }}
                  >
                    FILL BY PRICE
                  </h2>
                </div>
                  <div>
                    <p className="text-sm !mb-3" style={{ color: 'var(--text-muted)' }}>Range:</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>$0 - $1000</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="font-bold text-base !mb-4 sm:!mb-5 !mt-5" style={{ color: 'var(--text-main)' }}>Color</h2>
                  <ul className="!space-y-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <li className="flex items-center gap-2  cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                      <span>Red (56)</span>
                    </li>
                    <li className="flex items-center gap-2  cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                      <span>Green (78)</span>
                    </li>
                    <li className="flex items-center gap-2  cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                      <span>Blue (54)</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h2 className="font-bold text-base !mb-4 sm:!mb-5 !mt-5" style={{ color: 'var(--text-main)' }}>Item Condition</h2>
                  <ul className="!space-y-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <li className="flex items-center gap-2  cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                      <span>New (1056)</span>
                    </li>
                    <li className="flex items-center gap-2  cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                      <span>Refurbished (27)</span>
                    </li>
                    <li className="flex items-center gap-2  cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                      <span>Used (45)</span>
                    </li>
                    <button className="!px-10 !py-2 !mt-6 rounded text-white   !mt-4 flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--primary)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}>
                      <Filter size={18} />
                      Filter
                    </button>
                  </ul>
                </div>

              </div>
              
              <div className="!mb-0 lg:!mb-8 border rounded-lg !p-6" style={{ borderColor: 'var(--border-color)' }}>

                <div className="!mb-6">
                   <div className="relative">
                  <h2 className="font-bold text-base !mb-4 sm:!mb-5 !pb-3"
                    style={{
                      color: 'var(--text-main)',
                      borderBottom: '1px solid var(--border-color)'
                    }}
                  >
                    New Products
                  </h2>
                </div>
                   
                  <div className="!space-y-6 ">
                   
                    {/* Product 1 */}
                    <div className="flex gap-3 items-center group cursor-pointer !pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src="/shop/new-product-1.jpg"
                          alt="Product"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium !mb-1 line-clamp-2 " style={{ color: 'var(--primary)' }}>
                          Chen Cardigan
                        </h4>

                        <p className="text-sm font-semibold" >
                          $99.50
                        </p>
                        <div className="flex items-center gap-1 mb-1">
                          <div className="flex" style={{ color: '#ffb703' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 items-center group cursor-pointer !pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src="/shop/new-product-2.jpg"
                          alt="Product"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium !mb-1 line-clamp-2 " style={{ color: 'var(--primary)' }}>
                          Chen Sweater
                        </h4>

                        <p className="text-sm font-semibold" >
                          $89.50
                        </p>
                        <div className="flex items-center gap-1 !mb-1">
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" style={{ color: '#ffb703' }} />
                            ))}
                            <Star className="w-3 h-3" style={{ color: '#d1d5db' }} /> 
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 items-center group cursor-pointer">
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src="/shop/new-product-3.jpg"
                          alt="Product"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium !mb-1 line-clamp-2 " style={{ color: 'var(--primary)' }}>
                          Colorful Jacket
                        </h4>

                        <p className="text-sm font-semibold">
                          $25
                        </p>
                        <div className="flex items-center gap-1 !mb-1">
                          <div className="flex">
                            {[...Array(3)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" style={{ color: '#ffb703' }} />
                            ))}
                            <Star className="w-3 h-3" style={{ color: '#d1d5db' }} /> 
                            <Star className="w-3 h-3" style={{ color: '#d1d5db' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="relative z-10 p-5 flex flex-col justify-center h-full"
                style={{

                  backgroundImage: 'url("shop/new-product-4.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >

                <div className="absolute inset-0 bg-black/0 group-hover:bg-white/20 transition-all duration-300"></div>
                <div className="relative z-10 !p-5 flex flex-col justify-center h-full min-h-[380px]">
                  <h3 className="text-sm !mb-3" style={{ color: 'var(--text-main)' }}>Women Zone</h3>
                  <p className="text-xl font-bold !mb-3 transform transition-transform duration-300 group-hover:translate-x-4">
                    Save 17% on
                  </p>
                  <p className="text-xl font-bold !mb-3 transform transition-transform duration-300 group-hover:translate-x-4">
                    Office Dress
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all duration-300 text-sm"
                    style={{ color: 'var(--primary)' }}
                  >
                    Shop Now
                    <span className="text-2xl">→</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
          )}
        </div>

      </div>
      {isModalOpen && (
        <QuickViewModal 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </main>
  );
}