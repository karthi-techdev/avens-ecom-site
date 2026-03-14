'use client';
import styles from "./page.module.css";
import Image from 'next/image';
import { Star } from 'lucide-react';
import slide1 from '../public/home/download.png'
import slide2 from '../public/home/slider-2.png'
import slide3 from '../public/home/slider-3.png'
import feature1 from '../public/home/feature-1.png';
import feature2 from '../public/home/feature-2.png';
import feature3 from '../public/home/feature-3.png';
import feature4 from '../public/home/feature-4.png';
import feature5 from '../public/home/feature-5.png';
import feature6 from '../public/home/feature-6.png';
import product11 from '../public/home/product-1-1.jpg';
import product12 from '../public/home/product-1-2.jpg';
import product21 from '../public/home/product-2-1.jpg';
import product22 from '../public/home/product-2-2.jpg';
import product31 from '../public/home/product-3-1.jpg';
import product32 from '../public/home/product-3-2.jpg';
import serviceBanner from '../public/home/banner-4.png';
import banner1 from '../public/home/banner-1.png';
import banner2 from '../public/home/banner-2.png';
import banner3 from '../public/home/banner-3.png';
import banner5 from '../public/home/banner-5.jpg';
import banner6 from '../public/home/banner-6.jpg';
import banner7 from '../public/home/banner-7.jpg';
import banner8 from '../public/home/banner-8.jpg';
import brand1 from '../public/home/brand-1.png'
import brand2 from '../public/home/brand-2.png'
import brand3 from '../public/home/brand-3.png'
import brand4 from '../public/home/brand-4.png'
import brand5 from '../public/home/brand-5.png'
import brand6 from '../public/home/brand-6.png'
import banner10 from '../public/home/banner-10.jpg';
import thumbnail1 from '../public/home/thumbnail-1.jpg';
import thumbnail2 from '../public/home/thumbnail-2.jpg';
import thumbnail3 from '../public/home/thumbnail-3.jpg';
import thumbnail4 from '../public/home/thumbnail-4.jpg';
import thumbnail5 from '../public/home/thumbnail-5.jpg';
import thumbnail6 from '../public/home/thumbnail-6.jpg';
import thumbnail7 from '../public/home/thumbnail-7.jpg';
import thumbnail8 from '../public/home/thumbnail-8.jpg';
import thumbnail9 from '../public/home/thumbnail-9.jpg';
import category1 from '../public/home/category-thumb-1.jpg';
import category2 from '../public/home/category-thumb-2.jpg';
import category3 from '../public/home/category-thumb-3.jpg';
import category4 from '../public/home/category-thumb-4.jpg';
import category5 from '../public/home/category-thumb-5.jpg';
import category6 from '../public/home/category-thumb-6.jpg';
import category7 from '../public/home/category-thumb-7.jpg';
import category8 from '../public/home/category-thumb-8.jpg';
import menuBanner1 from '../public/home/menu-banner-7.jpg';
import menuBanner2 from '../public/home/menu-banner-8.jpg';
import blog1 from '../public/home/blog-1.jpg';
import blog2 from '../public/home/blog-2.jpg';
import { MdStarPurple500 } from "react-icons/md";
import { IoBagAddOutline, IoEyeOutline, IoHeartOutline } from "react-icons/io5";
import { FaCodeCompare } from "react-icons/fa6";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay,Pagination ,Thumbs,Zoom} from "swiper/modules";
import { PiGreaterThan } from "react-icons/pi";
import type { Swiper as SwiperType } from "swiper";
import { PiLessThan } from "react-icons/pi";
import { BadgeCheck, RefreshCcw, Wallet, Heart, Repeat, Filter, Facebook, Twitter, Instagram, MessageCircle } from "lucide-react";
export default function Home() {
   const colors = [
    "#e63946",
    "#f6fe52",
    "#ffffff",
    "#ffb703",
    "#00a8e8",
    "#90bd3c",
    "#ff66c4",
  ];  
  const sizes = ["S", "M", "L", "XL", "XXL"];
      const [activeTab,setActiveTab]=useState("feature");
      const checkThing=(id:any)=>{
          if(id=='feature'){
              setActiveTab('feature')
          }
          if(id=='popular'){
              setActiveTab('popular')
          }
          if(id=='newone'){
              setActiveTab('newone')
          }
      }
    const products = [
    {
      id: 1,
      name: "Colorful Pattern Shirt",
      category: "Clothing",
      price: 1299,
      oldPrice: 1999,
      rating: 4.5,
      discount:'14%',
      badge: "New",
      type: "feature",
      img1: product11.src,
      img2: product12.src,
    },
    {
      id: 2,
      name: "Summer Casual T-Shirt",
      category: "Clothing",
      price: 799,
      oldPrice: 900,
      rating: 4,
      discount:'12%',
      badge: "Best Seller",
      type: "feature",
      img1: product21.src,
      img2: product22.src,
    },
    {
      id: 3,
      name: "Slim Fit Denim Jacket",
      category: "Fashion",
      price: 2199,
      oldPrice: 2999,
      rating: 5,
      badge: "Hot",
      discount:'90%',
      type: "popular",
      img1: product31.src,
      img2: product32.src,
    },
    {
      id: 4,
      name: "Printed Hoodie",
      category: "Winter Wear",
      price: 1499,
      oldPrice: 1899,
      rating: 4.2,
      badge: "New",
      discount:'59%',
      type: "newone",
      img1: product11.src,
      img2: product12.src,
    },
    {
      id: 5,
      name: "Sports Track Pants",
      category: "Sportswear",
      price: 999,
      oldPrice: 1200,
      rating: 4.3,
      discount:'54%',
      badge: "Trending",
      type: "popular",
      img1: product21.src,
      img2: product22.src,
    },
    {
      id: 6,
      name: "Leather Casual Shoes",
      category: "Footwear",
      price: 2499,
      oldPrice: 3199,
      rating: 4.7,
      discount:'10%',
      badge: "Sale",
      type: "popular",
      img1: product31.src,
      img2: product32.src,
    },
    {
      id: 7,
      name: "Printed Oversized T-Shirt",
      category: "Clothing",
      price: 899,
      oldPrice: 1000,
      rating: 4,
      badge: "New",
      discount:'20%',
      type: "feature",
      img1: product11.src,
      img2: product12.src,
    },
    {
      id: 8,
      name: "Women’s Handbag",
      category: "Accessories",
      price: 1799,
      oldPrice: 2299,
      rating: 4.6,
      badge: "Best Seller",
      type: "popular",
      discount:'70%',
      img1: product21.src,
      img2: product22.src,
    },
    {
      id: 9,
      name: "Formal Slim Shirt",
      category: "Clothing",
      price: 1399,
      discount:'89%',
      oldPrice: 1699,
      rating: 4.4,
      badge: "Hot",
      type: "newone",
      img1: product31.src,
      img2: product32.src,
    },
    {
      id: 10,
      name: "Running Sneakers",
      category: "Footwear",
      price: 2999,
      discount:'30%',
      oldPrice: 3599,
      rating: 4.8,
      badge: "Trending",
      type: "popular",
      img1: product11.src,
      img2: product12.src,
    },
  ];
  const images = [
      {
        main: "/product-16-1.jpg",
        thumb: "/thumbnail-1.jpg ",
      },
       {
        main: "/product-16-2.jpg",
        thumb: "/thumbnail-2.jpg ",
      },
       {
        main: "/product-16-3.jpg",
        thumb: "/thumbnail-3.jpg ",
      },
       {
        main: "/product-16-4.jpg",
        thumb: "/thumbnail-4.jpg ",
      }, {
        main: "/product-16-5.jpg",
        thumb: "/thumbnail-5.jpg ",
      }, {
        main: "/product-16-6.jpg",
        thumb: "/thumbnail-6.jpg ",
      }, {
        main: "/product-16-7.jpg",
        thumb: "/thumbnail-7.jpg ",
      }, {
        main: "/product-16-1.jpg",
        thumb: "/thumbnail-8.jpg ",
      }, {
        main: "/product-16-2.jpg",
        thumb: "/thumbnail-9.jpg ",
      },
    ];
    const [view,setView]=useState(false);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("M");
    const [quantity, setQuantity] = useState(1);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
    const [activeThumbIndex, setActiveThumbIndex] = useState<number | null>(null);
    useEffect(() => {
  if (view) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return () => document.body.classList.remove("overflow-hidden");
}, [view]);
  return (
   

       < >
        {/* inital section */}
            <main className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem] relative'>
                
                  <Swiper modules={[Navigation,Autoplay,Pagination]}
                    loop slidesPerView={1}
                    spaceBetween={0}
                    autoplay={{delay:5000,disableOnInteraction:true,pauseOnMouseEnter:true}}
                    navigation={{
                        nextEl:'.next-new',
                        prevEl:'.prev-new',
                    }}
                    pagination={{clickable:true,dynamicBullets:true}}
                    observer={true} observeParents={true}
                    >{[
                        { name: "slide 1", img: slide1.src },
                        { name: "Slide 2", img: slide2.src },
                        { name: "Slide 3", img: slide3.src },
                    ].map((slide,index)=>(
                        <SwiperSlide key={index} >
                         <div className='grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] justify-between '>
                    <div className='flex items-center justify-center lg:justify-start'>
                        <div className='text-center lg:text-left'>
                            <h3 className='text-[1.2rem] sm:text-[1.4rem] md:text-[1.7rem] lg:text-[2rem] !pb-[1rem] font-semibold'>Trade-in offer</h3>
                            <h1 className=' text-[2rem] sm:text-[2.5rem]  md:text-[3rem] lg:text-[3.5rem] font-bold leading-[1.9rem]'>Super value deals</h1>
                            <h1 className='text-[var(--primary)] text-[2rem] sm:text-[2.5rem]  md:text-[3rem] lg:text-[3.5rem] font-bold'>On all products</h1>
                            <h4 className='text-semibold text-[1.1rem]'>Save more with coupons & upto 70% off</h4>
                            <button type='button' className='text-[var(--primary)] !ms-[1.5rem] capitalize !mt-[1rem] font-semibold cursor-pointer bg-[var(--border-color)] !mb-[1rem] lg:!mb-[0rem] !px-[1rem] !py-[0.4rem] rounded-md'>Shop now</button>
                        </div>
                    </div>
                    <div>
                        <img src={slide.img} className='w-full h-full object-contain' />
                    </div>
                </div>
                        </SwiperSlide>
                    ))}
                    <div className="text-center flex justify-center  gap-[0.7rem] !mt-[0.6rem]"> <button className="prev-new bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem]  rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> <PiLessThan /> </button> <button className="next-new  bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem]  rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> <PiGreaterThan /> </button> </div>
                    </Swiper>
                
            </main>
            {/* features section */}
            <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem]'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1.5rem] text-[var(--primary)]'>
                    <div className='text-center hover:-translate-y-2 transtion-all duration-500 border rounded-md border-[var(--green-border)] !p-[0.8rem]'>
                      <div className='flex justify-center'>  <img src={feature1.src} /></div>
                        <h4 className='!mt-[1rem]  rounded-md inline-block font-bold capitalize bg-[#fddde4] !py-[0.3rem] !px-[0.6rem]'>Free shipping</h4>
                    </div>
                    <div className='text-center hover:-translate-y-2 transtion-all duration-500 border rounded-md border-[var(--green-border)] !p-[0.8rem]'>
                      <div className='flex justify-center'><img src={feature2.src} /></div>  
                        <h4 className='!mt-[1rem] rounded-md inline-block font-bold capitalize bg-[#d1e8f2] !py-[0.3rem] !px-[0.6rem]'>Online Order</h4>
                    </div>
                    <div className='text-center hover:-translate-y-2 transtion-all duration-500 border rounded-md border-[var(--green-border)] !p-[0.8rem]'>
                      <div className='flex justify-center'><img src={feature3.src} /></div>  
                        <h4 className='!mt-[1rem] rounded-md inline-block font-bold capitalize bg-[#cdebbc] !py-[0.3rem] !px-[0.6rem]'>Save Money</h4>
                    </div>
                    <div className='text-center hover:-translate-y-2 transtion-all duration-500 border rounded-md border-[var(--green-border)] !p-[0.8rem]'>
                      <div className='flex justify-center'><img src={feature4.src} /></div>  
                        <h4 className='!mt-[1rem] rounded-md inline-block font-bold capitalize bg-[#cdd4f8] !py-[0.3rem] !px-[0.6rem]'>Promotions</h4>
                    </div>
                    <div className='text-center hover:-translate-y-2 transtion-all duration-500 border rounded-md border-[var(--green-border)] !p-[0.8rem]'>
                      <div className='flex justify-center'><img src={feature5.src} /></div>  
                        <h4 className='!mt-[1rem] rounded-md inline-block font-bold capitalize bg-[#f6dbf6] !py-[0.3rem] !px-[0.6rem]'>Happy Sell</h4>
                    </div>
                    <div className='text-center hover:-translate-y-2 transtion-all duration-500 border rounded-md border-[var(--green-border)] !p-[0.8rem]'>
                      <div className='flex justify-center'><img src={feature6.src} /></div>  
                        <h4 className='!mt-[1rem] rounded-md inline-block font-bold capitalize bg-[#fff2e5] !py-[0.3rem] !px-[0.6rem]'>24/7 Support</h4>
                    </div>

                </div>
            </section>
            {/* products listing section ${view?'bg-[#000000b3]':'bg-[var(--white)]'} */}
            <section className={`!px-[1rem]  relative !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem] `}>
                <div className='flex justify-between items-center'>
                    <div className='grid grid-cols-3 gap-[0.6rem]'>
                        <button type='button' className={`${activeTab==='feature'?'bg-[var(--orange-light)]':'bg-[var(--border-color)]'} rounded-md !py-[0.4rem] !px-[1.2rem] text-[1.1rem] font-semibold capitalize ${activeTab==='feature'?'text-[var(--primary)]':'' } hover:-translate-y-2 transition-all duration-500 hover:text-[var(--primary)] hover:bg-[var(--orange-light)] cursor-pointer`} onClick={()=>checkThing('feature')}>Featured</button>
                        <button type='button' className={`${activeTab==='popular'?'bg-[var(--orange-light)]':'bg-[var(--border-color)]'} rounded-md !py-[0.4rem] !px-[1.2rem] text-[1.1rem] font-semibold capitalize ${activeTab==='popular'?'text-[var(--primary)]':'' } hover:-translate-y-2 transition-all duration-500 hover:text-[var(--primary)]  hover:bg-[var(--orange-light)] cursor-pointer`} onClick={()=>checkThing('popular')}>Popular</button>
                        <button type='button' className={`${activeTab==='newone'?'bg-[var(--orange-light)]':'bg-[var(--border-color)]'} rounded-md !py-[0.4rem] !px-[1.2rem] text-[1.1rem] font-semibold capitalize ${activeTab==='newone'?'text-[var(--primary)]':'' } hover:-translate-y-2 transition-all duration-500 hover:text-[var(--primary)]  hover:bg-[var(--orange-light)] cursor-pointer`} onClick={()=>checkThing('newone')} >New added</button>
                    </div>
                    <div className='hidden md:block'>
                        <a href='' className='!text-[var(--primary)] font-semibold !underline underline-offset-3 !decoration-[var(--green-border)] decoration-2 inline-block'>View more &gt;&gt;</a>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 !mt-[2rem] gap-[1.5rem]'>
                     {products.filter((item)=>item.type===activeTab).map((prod,index)=>(
                         <div key={index} className='border group/card rounded-2xl  border-[var(--green-border)] !p-[1rem]'>
                        <div className='cursor-pointer relative rounded-md overflow-hidden'>
                            <img src={prod.img1} className='w-full rounded-2xl
    transition-all duration-700 ease-in-out
    scale-100 opacity-100
    group-hover/card:scale-110
    group-hover/card:opacity-0' />
                            <img src={prod.img2} className='absolute inset-0 w-full h-full object-cover rounded-2xl
    transition-all duration-700 ease-in-out
    scale-110 opacity-0
    group-hover/card:scale-105
    group-hover/card:opacity-100'/>
                            <div className='absolute top-[5%] left-[5%]'>
                                <span className='bg-[var(--pink-dark)] text-[var(--white)] text-[0.9rem] font-sembiold !py-[0.1rem] rounded-lg !px-[0.6rem] cursor-text'>{prod.badge}</span>
                            </div>
                            <div className='flex opacity-0 group-hover/card:opacity-100 duration-700 transition-all  gap-[0.6rem] justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                <div className="relative group/icon ">
                                    <span className="absolute -top-8
left-1/2
-translate-x-1/2 bg-[var(--primary)] text-white text-[0.8rem] w-[5.5rem] text-center block opacity-0 !py-[0.2rem] rounded-lg  group-hover/icon:opacity-100 transition transition-all duration-500 capitalize">Quick View</span>
                                    <span className="absolute -top-2 left-1/2 -translate-x-1/2
  border-8 border-transparent 
  border-t-[var(--primary)] opacity-0  group-hover/icon:opacity-100
  transition-all duration-500"></span>
                                    <button type='button'  className="w-10 h-10 flex items-center justify-center 
              bg-[var(--green-light)] group-hover/icon:bg-[var(--primary)] group-hover/icon:!text-white 
              rounded-full transition-all duration-500 
              text-[1.1rem] text-[var(--primary)] cursor-pointer " onClick={()=>{setView(true)}}><IoEyeOutline /></button></div>
                                <div className='relative group/icon'>
                                    <span className="absolute -top-8
left-1/2
-translate-x-1/2 bg-[var(--primary)] text-white text-[0.8rem] w-[6.6rem] opacity-0 text-center block  !py-[0.2rem] rounded-lg  group-hover/icon:opacity-100 transition transition-all duration-500 capitalize">Add to wishlist</span>
                                    <span className='absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--primary)] duration-500 transition-all opacity-0 group-hover/icon:opacity-100'></span>
                                    <a href='' className='w-10 h-10 flex items-center justify-center 
              bg-[var(--green-light)] hover:bg-[var(--primary)] hover:!text-white 
              rounded-full transition-all duration-500 
              text-[1.1rem] text-[var(--primary)]'><IoHeartOutline /></a>
                                </div>
                                <div className='relative group/icon'>
                                    <span className="absolute -top-8
left-1/2
-translate-x-1/2 bg-[var(--primary)] text-white text-[0.8rem] w-[4.6rem] opacity-0 text-center block  !py-[0.2rem] rounded-lg  group-hover/icon:opacity-100 transition transition-all duration-500 capitalize">Compare</span>
<span className='absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--primary)] duration-500 transition-all opacity-0 group-hover/icon:opacity-100'></span>
<a href='' className='w-10 h-10 flex items-center justify-center 
              bg-[var(--green-light)] group-hover/icon:bg-[var(--primary)] group-hover/icon:!text-white 
              rounded-full transition-all duration-500 
              text-[1.1rem] text-[var(--primary)]'><FaCodeCompare /></a></div>
                            </div>
                        </div>
                        <div className='!mt-[0.6rem]'>
                            <a href='' className='inline-block font-semibold text-[0.8rem]'>{prod.category}</a>
                            <a href='' className='block  text-[1.2rem] font-bold capitalize hover:!text-[var(--primary)]'>{prod.name}</a>
                            <div className='flex justify-between'>
                                <div>
                                    <div className='flex text-[var(--yellow)]'><MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 /><div><span className='text-[var(--foreground)] font-medium !ml-[0.3rem]'>{prod.discount}</span></div></div>
                                    <h3 className='text-[1.2rem] text-[var(--primary)]  font-semibold'>${prod.price}<span className='!ml-[0.5rem] line-through text-[1rem] font-normal text-[var(--text-muted)] !decoration-1'>${prod.oldPrice}</span></h3>
                                </div>
                                <div className='flex items-center relative group/icon'>
                                    <span className='absolute -top-7 w-[5.4rem] bg-[var(--primary)] text-center rounded-lg !py-[0.2rem] text-[0.8rem] opacity-0 group-hover/icon:opacity-100 transtion-all duration-500 left-1/2 -translate-x-1/2 !text-white capitalize '>Add to cart</span>
                                    <span className='border-8 border-transparent border-t-[var(--primary)] duration-500 transition-all opacity-0  group-hover/icon:opacity-100 absolute -top-1 left-1/2 -translate-x-1/2 transtion-all duration-500'></span>
                                    <a href='' className='bg-[var(--green-light)] border border-[var(--green-border)] rounded-full !p-[0.7rem] group-hover/icon:bg-[var(--primary)] text-[var(--primary)] group-hover/icon:!text-white  
              transition-all duration-500'><IoBagAddOutline className='text-[1.2rem]' /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                     ))}
                </div>
             
            </section>
               {view && 
                
               <div className='fixed inset-0 z-[999] flex items-center justify-center bg-[#00000085]'>
                <div className='relative flex flex-col md:flex-row gap-6 bg-white w-[95%] max-w-[850px] max-h-[90vh] overflow-y-auto  shadow-2xl !p-6 md:!p-4'>
                <div className='flex flex-col gap-4'>
                 <div className="relative h-[300px] sm:h-[350px] md:h-[28rem] w-full md:w-[24rem]">
  <Swiper
    modules={[Thumbs, Zoom]}
    onSwiper={setMainSwiper}
    thumbs={{
      swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
    }}
    zoom
    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
    speed={800}
    className="h-full"
  >
    {images.map((img, index) => (
      <SwiperSlide key={index} className="!h-full">
        <div className="swiper-zoom-container relative h-full w-full">
          <Image
            src={img.main}
            alt="product"
            fill
            className="object-cover"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>
                <div className='flex flex-col md:justify-center items-center'>
                    <div className="relative h-[130px] md:h-[80px] lg:h-[63px] w-full md:max-w-[22rem]  !mt-4"
                  onMouseEnter={() => {
                    mainSwiper?.autoplay?.stop();
                    thumbsSwiper?.autoplay?.stop();
                  }}
                  onMouseLeave={() => {
                    mainSwiper?.autoplay?.start();
                    thumbsSwiper?.autoplay?.start();
                  }}
                >
                  <Swiper
                    modules={[Navigation, Thumbs, Autoplay]}
                    onSwiper={setThumbsSwiper}
                     breakpoints={{
      0: {
        slidesPerView: 2,  
      },
      640: {
        slidesPerView: 3,   
      },
      768: {
        slidesPerView: 4,   
      },
      1024: {
        slidesPerView: 5,   
      },
      1280: {
        slidesPerView: 5,   
      },
    }}
                    spaceBetween={4}
                    loop={true}
                   
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    speed={800}
                    navigation={{
                      prevEl: ".custom-swiper-prev",
                      nextEl: ".custom-swiper-next",
                    }}
                    watchSlidesProgress={true}
                    slideToClickedSlide={true}
                    onSlideChange={(swiper) => {
                      const realIndex = swiper.realIndex;
                      setActiveThumbIndex(realIndex);
                      mainSwiper?.slideTo(realIndex);
                    }}
                    className="h-full"
                  >
                    {images.map((img, index) => (
                      <SwiperSlide key={index}>
  <div
    onClick={() => {
      setActiveThumbIndex(index);
      mainSwiper?.slideTo(index);
    }}
    className={`md:w-[63px] h-full w-full md:h-[63px] rounded overflow-hidden border transition-all duration-200 ${
      activeThumbIndex === index
        ? "border-[var(--primary)]"
        : "border-transparent"
    }`}
  >
    <div className="relative w-full h-full">
      <Image
        src={img.thumb}
        alt="thumb"
        fill
        className="object-cover cursor-pointer"
      />
    </div>
  </div>
</SwiperSlide>
                    ))}
                     
                  </Swiper>
                  <div className="absolute top-[50%] md:top-[40]  -left-5  -translate-y-1/2 z-10"> <button className="custom-swiper-prev  text-[var(--text-muted)] text-[1.5rem] hover:text-[var(--primary)] duration-700 transition-all cursor-pointer"> <PiLessThan /> </button> </div> <div className="absolute top-[50%] md:top-[40] -right-3 -translate-y-1/2 z-10"> <button className="custom-swiper-next   text-[var(--text-muted)]  text-[1.5rem]  hover:text-[var(--primary)] duration-700 transition-all cursor-pointer"> <PiGreaterThan /> </button> </div>
                    
                </div>
              <div className='text-left w-[100%]'>
                  <div className="!mt-4 text-left pt-4 flex  flex-wrap">
                  <h3 className="text-sm font-medium text-[var(--text-muted)]" >Share this :</h3>
                  <div className="flex items-center gap-2 !mx-4">
                    <a href="#" className="hover:scale-110 transition-transform" aria-label="Share on Facebook">
                      <Facebook size={20} className="text-[var(--text-muted)]" />
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform" aria-label="Share on Twitter">
                      <Twitter size={20} className="text-[var(--text-muted)]" />
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform" aria-label="Share on Instagram">
                      <Instagram size={20} className="text-[var(--text-muted)]" />
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform" aria-label="Share on Messenger">
                      <MessageCircle size={20} className="text-[var(--text-muted)]" />
                    </a>
                  </div>
                </div>
              </div>
                </div>
                </div>
                <div className=''>
                  <button
        onClick={() => setView(false)}
        className="absolute -top-1 md:top-4 right-1 md:right-6 text-2xl cursor-pointer text-gray-500 hover:text-black"
      >
        ✕
      </button>
                    <div className="!mt-3 !mb-2">
                <h1 className="text-[1.7rem]  font-semibold w-[100%] md:max-w-[20rem] !mb-2 !text-[var(--black)]">
                  Colorful Pattern Shirts HD450
                </h1>
                <div className="flex justify-between items-center !mb-2">
                  <p className="!mb-2 !mt-4 text-[var(--primary)] font-light"><span className="font-medium !mr-1 text-[var(--black)]" >Brands:</span>Boostrap</p>
                  <div className="flex items-center !mt-2">
                    <div className="flex text-[var(--yellow)]" >
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm !ml-2 text-[var(--text-muted)]" >
                      (25 reviews)
                    </span>
                  </div>
                </div>
                </div>
                <div className="flex items-center gap-3 !mb-2 border-y py-4 border-[var(--border-color)]" >
                  <span className="text-xl sm:text-3xl font-bold !m-2 text-[var(--primary)]" >$120.00</span>
                  <span className="text-gray-500 line-through">$200.00</span>
                  <span className="text-sm text-[var(--black)] font-medium">25% Off</span>
                </div>

                <p className="text-[0.9rem] !mb-2 w-[100%] md:max-w-[24rem] leading-[1.2rem] text-[var(--foreground)]" >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi,!
                </p>

                <div className="!mb-6 flex items-center gap-1">
                  <p className="text-sm font-semibold  text-[var(--black)]" >Color</p>
                  <div className="flex items-center gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border-2 transition-all duration-200 relative ${selectedColor === color ? "border-gray-100 scale-110" : "border-gray-100"
                          }`}
                        style={{ backgroundColor: color }}
                      >
                        {selectedColor === color && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="!mb-4 flex items-center gap-2">
                  <p className="text-sm font-semibold text-[var(--black)]">Size</p>
                  <div className="flex items-center gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className="w-9 h-9 flex items-center justify-center text-sm font-medium border rounded transition-all duration-200"
                        style={selectedSize === size ? {
                          backgroundColor: "var(--primary)",
                          color: "white",
                          borderColor: "var(--primary)",
                        } : {
                          backgroundColor: "white",
                          color: "var(--text-muted)",
                          borderColor: "var(--border-color)",
                        }}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid grid-cols-[2fr_2fr_1fr_1fr]  items-center gap-3 md:gap-1 lg:gap-3 !mt-5 !mb-[3rem]">
               
                  <div className="grid grid-cols-[1fr_2fr_1fr]  items-center border rounded overflow-hidden border-[var(--border-color)]" >
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="!p-2 md:!p-1  border-r hover:bg-gray-50 transition-colors border-[var(--border-color)] text-[var(--text-muted)]"

                    >
                      -
                    </button>
                    <span className=" text-center  text-[var(--black)]" >
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className=" border-l hover:bg-gray-50 transition-colors border-[var(--border-color)] text-[var(--text-muted)]"

                    >
                      +
                    </button>
                  </div>

                  <button
                    className="!px-4 md:!px-1 lg:!px-4 !py-2 rounded text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors duration-200"
                  >
                    Add to cart
                  </button>

                  <button className="!px-2 !py-3 border flex items-center justify-center rounded transition-all duration-200 bg-white hover:-translate-y-1" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}><Heart size={18} /></button>

                  <button className="!p-2 !py-3 border flex items-center justify-center rounded transition-all duration-200 bg-white hover:-translate-y-1" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}><Repeat size={18} /></button>
                </div>

          
                <div className="text-sm mb-6 space-y-2 border-t pt-5  !mb-5 border-[var(--border-color)] text-[var(--text-muted)]">
                  <p className="!mb-2 !mt-4 text-[var(--primary)]" ><span className="font-medium text-[var(--black)]" >SKU:</span> FWM15VKT</p>
                  <p className="!mb-2 text-[var(--primary)]" ><span className="font-medium text-[var(--black)]">Tags:</span> Cloth, Women, Dress</p>
                  <p className="!mb-2 text-[var(--primary)]" ><span className="font-medium text-[var(--black)]">Availability:</span> 8 Items In Stock</p>
                </div>
              </div>
              </div>

             
              
                </div>
                  
                  }
            {/* services banner */}
            <section className='!mx-[1rem] group sm:!mx-[3rem] md:!mx-[4rem] lg:!mx-[6rem] relative !my-[0.8rem] sm:!my-[1rem] md:!my-[1rem] lg:!my-[2rem] bg-center h-[13rem] sm:h-[14rem] md:h-[15rem] lg:h-[18rem] !ps-[0.5rem] sm:!ps-[1rem] md:!ps-[1.5rem] lg:!ps-[2rem] !pt-[1rem] sm:!pt-[2rem] md:!pt-[3rem] lg:!pt-[4rem] !pb-[1rem] sm:!pb-[1.2rem] md:!pb-[2rem] bg-cover' style={{backgroundImage:`url(${serviceBanner.src})`}}>
                        <div className='absolute'>
                            <h3 className='text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 !mb-[1rem] font-semibold text-[var(--primary)]'>Repair Services</h3>
                            <h1 className='font-semibold text-[1.5rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] !text-black leading-[1.6rem]'>We're an Apple</h1>
                            <h1 className='font-semibold text-[1.5rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] !text-black'>Authorised Service Provider</h1>
                            <a href='' className='!mt-[1rem] inline-block bg-[var(--primary)] text-[0.8rem] font-semibold !text-white hover:bg-[var(--primary-hover)] group/button transition-all duration-500 !py-[0.7rem] capitalize !px-[1.4rem] rounded-sm'>Learn more<MdOutlineArrowRightAlt className='inline-block transition-all duration-500 group-hover/button:!ml-[0.8rem] !ml-[0.4rem]'/></a>
                        </div>
            </section>
            {/* category carousal */}
            <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem]'>
                  <div className='flex justify-between'>
                     <h1 className='text-[1.5rem] font-semibold !text-black !mb-[1rem]'><span className='text-[var(--primary)]'>Popular </span> Categories</h1>
                     <div className=""> <button className="prev-el bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem]  rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> <PiLessThan/> </button> <button className="next-el bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] rounded-full hover:bg-[var(--primary)] !p-[0.5rem] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer !ml-[0.6rem]">  <PiGreaterThan/> </button>
  </div>
                </div>
                 <div className='relative !mx-[1rem]'>
                    <Swiper modules={[Navigation,Autoplay]}
                    loop  breakpoints={{
      0: {
        slidesPerView: 2,  
      },
      640: {
        slidesPerView: 3,   
      },
      768: {
        slidesPerView: 4,   
      },
      1024: {
        slidesPerView: 5,   
      },
      1280: {
        slidesPerView: 6,   
      },
    }}
                    spaceBetween={30}
                    autoplay={{delay:2500,disableOnInteraction:false}}
                    navigation={{
                        nextEl:'.next-el',
                        prevEl:'.prev-el'
                    }}>{[
                        { name: "T-Shirt", logo: category1.src },
                        { name: "Bags", logo: category2.src },
                        { name: "Sandal", logo: category3.src },
                        { name: "Scarf cap", logo: category4.src },
                        { name: "Shoes", logo: category5.src },
                        { name: "Pillowcase", logo: category6.src },
                        { name: "Jumpsuits", logo: category7.src },
                        { name: "Hats", logo: category8.src },
                    ].map((category,index)=>(
                        <SwiperSlide key={index} >
                            <a href='' className='group'>
                                <div className='border flex flex-col gap-[0.6rem] !p-[0.6rem] text-center rounded-lg border-[var(--green-border)] '>
                                <div className='overflow-hidden'>
                                    <img src={category.logo} alt={category.name} className='rounded-lg h-full w-full object-contain scale-100 group-hover:scale-110 transition-all duration-700'/>
                                </div>
                                <h1 className='text-[var(--foreground)] capitalize font-semibold group-hover:text-[var(--primary)]'>{category.name}</h1>
                            </div>
                            </a>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                 </div>
            </section>
            {/* offer boxes */}
             <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem]'>
                        <div className='relative group  !py-[2rem] h-[11rem] !ps-[2rem] w-full bg-cover bg-center' style={{backgroundImage:`url(${banner1.src})`}}>
                            <div className='absolute '>
                            <h3 className='text-[0.9rem] !mb-[0.3rem] font-medium !text-[var(--text-muted)]'>Smart Offer</h3>
                            <h1 className='font-semibold text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 !text-black leading-[1rem]'>Save 20% on
</h1>
                            <h1 className='font-semibold text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 !text-black'>Woman Bag</h1>
                            <a href='' className='!mt-[0.7rem] inline-block !text-[var(--primary)] text-[0.8rem] font-semibold   capitalize  rounded-sm group/icon '>Shop now<MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem] group-hover/icon:!ml-[0.8rem] transition-all duration-500'/></a>
                        </div>
                        </div>
                        <div className='relative group bg-cover h-[11rem] bg-center !py-[2rem] !ps-[2rem] w-full ' style={{backgroundImage:`url(${banner2.src})`}}>
                            <div className='absolute '>
                            <h3 className='text-[0.9rem] !mb-[0.3rem] font-medium !text-[var(--text-muted)]'>Smart Offer</h3>
                            <h1 className='font-semibold text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 !text-black leading-[1rem]'>Save 20% on
</h1>
                            <h1 className='font-semibold text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 !text-black'>Woman Bag</h1>
                            <a href='' className='!mt-[0.7rem] inline-block !text-[var(--primary)] text-[0.8rem] font-semibold   capitalize  rounded-sm group/icon '>Shop now<MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem] group-hover/icon:!ml-[0.8rem] transition-all duration-500'/></a>
                        </div>
                        </div>
                        <div className='relative group  !py-[2rem] h-[11rem] !ps-[2rem] w-full bg-cover bg-center' style={{backgroundImage:`url(${banner3.src})`}}>
                            <div className='absolute '>
                            <h3 className='text-[0.9rem] !mb-[0.3rem] font-medium !text-[var(--text-muted)]'>Smart Offer</h3>
                            <h1 className='font-semibold text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 !text-black leading-[1rem]'>Save 20% on
</h1>
                            <h1 className='font-semibold text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 !text-black'>Woman Bag</h1>
                            <a href='' className='!mt-[0.7rem] inline-block !text-[var(--primary)] text-[0.8rem] font-semibold   capitalize  rounded-sm group/icon '>Shop now<MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem] group-hover/icon:!ml-[0.8rem] transition-all duration-500'/></a>
                        </div>
                        </div>
            </section>
            {/* arrivals section */}
            <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem]'>
                  <div className='flex justify-between'>
                     <h1 className='text-[1.5rem] font-semibold !text-black !mb-[1rem]'><span className='text-[var(--primary)]'>New </span> Arrivals</h1> 
                     <div> <button className="prev-new bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem]  rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> <PiLessThan/> </button> <button className="next-new bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] rounded-full hover:bg-[var(--primary)] !p-[0.5rem] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer !ml-[0.6rem]">  <PiGreaterThan/> </button>
  </div>
                </div>
                 <div className='relative !mx-[1rem]'>
                    <Swiper modules={[Navigation,Autoplay]}
                    loop breakpoints={{
                        0:{slidesPerView:2},
                        640:{slidesPerView:3},
                        768:{slidesPerView:4},
                        1024:{slidesPerView:5},
                        1280:{slidesPerView:6},
                    }}
                    spaceBetween={30}
                    autoplay={{delay:2500,disableOnInteraction:true,pauseOnMouseEnter:true}}
                    navigation={{
                        nextEl:'.next-new',
                        prevEl:'.prev-new',
                    }}>{[
                        { name: "T-Shirt", img1: product11.src,img2:product12.src },
                        { name: "Bags", img1: product21.src,img2:product22.src },
                        { name: "Sandal", img1: product31.src,img2:product32.src },
                        { name: "Scarf cap", img1: product11.src,img2:product12.src },
                        { name: "Shoes", img1: product21.src,img2:product12.src },
                        { name: "Pillowcase", img1: product31.src,img2:product32.src },
                        { name: "Pillowcase", img1: product31.src,img2:product32.src },
                    ].map((product,index)=>(
                        <SwiperSlide key={index} >
                            <div className=' group/card rounded-2xl  border-[var(--green-border)] '>
                        <div className='cursor-pointer relative rounded-md overflow-hidden'>
                            <img src={product.img1} className='w-full rounded-2xl
    transition-all duration-700 ease-in-out
    scale-100 opacity-100
    group-hover/card:scale-110
    group-hover/card:opacity-0' />
                            <img src={product.img2} className='absolute inset-0 w-full h-full object-cover rounded-2xl
    transition-all duration-700 ease-in-out
    scale-110 opacity-0
    group-hover/card:scale-105
    group-hover/card:opacity-100'/>
                            <div className='absolute top-[5%] left-[5%]'>
                                <span className='bg-[var(--pink-dark)] text-[var(--white)] text-[0.9rem] font-sembiold !py-[0.1rem] rounded-lg !px-[0.6rem] cursor-text'>Hot</span>
                            </div>
                            <div className='flex opacity-0 group-hover/card:opacity-100 duration-700 transition-all  gap-[0.6rem] justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                <div className="relative group/icon ">
                                    <span className="absolute -top-8
left-1/2
-translate-x-1/2 bg-[var(--primary)] text-white text-[0.8rem] w-[5.5rem] text-center block opacity-0 !py-[0.2rem] rounded-lg  group-hover/icon:opacity-100 transition transition-all duration-500 capitalize">Quick View</span>
                                    <span className="absolute -top-2 left-1/2 -translate-x-1/2
  border-8 border-transparent 
  border-t-[var(--primary)] opacity-0  group-hover/icon:opacity-100
  transition-all duration-500"></span>
                                    <a href='' className="w-10 h-10 flex items-center justify-center 
              bg-[var(--green-light)] group-hover/icon:bg-[var(--primary)] group-hover/icon:!text-white 
              rounded-full transition-all duration-500 
              text-[1.1rem] text-[var(--primary)] "><IoEyeOutline /></a></div>
                                <div className='relative group/icon'>
                                    <span className="absolute -top-8
left-1/2
-translate-x-1/2 bg-[var(--primary)] text-white text-[0.8rem] w-[6.6rem] opacity-0 text-center block  !py-[0.2rem] rounded-lg  group-hover/icon:opacity-100 transition transition-all duration-500 capitalize">Add to wishlist</span>
                                    <span className='absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--primary)] duration-500 transition-all opacity-0 group-hover/icon:opacity-100'></span>
                                    <a href='' className='w-10 h-10 flex items-center justify-center 
              bg-[var(--green-light)] hover:bg-[var(--primary)] hover:!text-white 
              rounded-full transition-all duration-500 
              text-[1.1rem] text-[var(--primary)]'><IoHeartOutline /></a>
                                </div>
                                <div className='relative group/icon'>
                                    <span className="absolute -top-8
left-1/2
-translate-x-1/2 bg-[var(--primary)] text-white text-[0.8rem] w-[4.6rem] opacity-0 text-center block  !py-[0.2rem] rounded-lg  group-hover/icon:opacity-100 transition transition-all duration-500 capitalize">Compare</span>
<span className='absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--primary)] duration-500 transition-all opacity-0 group-hover/icon:opacity-100'></span>
<a href='' className='w-10 h-10 flex items-center justify-center 
              bg-[var(--green-light)] group-hover/icon:bg-[var(--primary)] group-hover/icon:!text-white 
              rounded-full transition-all duration-500 
              text-[1.1rem] text-[var(--primary)]'><FaCodeCompare /></a></div>
                            </div>
                        </div>
                        <div className='!mt-[0.6rem] text-center'>
                            <a href='' className='block  text-[1.1rem] font-bold capitalize hover:!text-[var(--primary)]'>{product.name}</a>
                                <div>
                                    <div className='flex justify-center text-[var(--yellow)]'><MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 /><div></div></div>
                                    <h3 className='text-[1.2rem] text-[var(--primary)]  font-semibold'>$1238 <span className='!ml-[0.5rem] line-through text-[1rem] font-normal text-[var(--text-muted)] !decoration-1'>$245.8</span></h3>
                                </div>
                            </div>
                        </div>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                 </div>
            </section>
            {/* offer timings */}
            <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem] grid grid-cols-1 lg:grid-cols-2 gap-[0.5rem] md:gap-[1rem] lg:gap-[1.5rem]'>
                        <div className='relative  !py-[1rem] sm:!py-[2rem] md:!py-[3rem] h-[30rem] !ps-[1rem] sm:!ps-[2rem] md:!ps-[3rem] w-full bg-cover bg-center' style={{backgroundImage:`url(${menuBanner1.src})`}}>
                            <div className='absolute '>
                            <h3 className='text-[1.7rem]  font-bold !text-[var(--primary)]'>Deal of the Day</h3>
                            <h3 className='!mb-[0.3rem]  !text-black'>Limited quantities.</h3>
                            <a href='' className='text-[1.2rem] inline-block !my-[1rem] leading-[1.4rem] !text-black w-full max-w-[15rem]'>Summer Collection New Morden Design</a>
                            <h2 className='text-[#ff3551] text-[1.3rem] !mb-[1rem]'>$139.00
<span className='line-through !text-[var(--text-muted)] !ml-[0.4rem] '>
$160.99</span></h2>
<h4 className='text-[var(--text-main)]  font-medium !mb-[0.5rem]'>Hurry Up! Offer End In:</h4>
                            <div className='grid grid-cols-4 gap-[1rem] sm:gap-[2rem] '>
                                <div className="flex flex-col relative ">
                                    <h3 className="relative inline-block bg-[var(--primary)] text-white text-[1.3rem] font-semibold text-center !py-[0.4rem] !px-[0.6rem] sm:!py-[0.6rem] sm:!px-[0.9rem]  rounded-md after:content-[':']  after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:text-black after:text-[1.5rem]">00</h3>
                                    <span className='text-center text-[var(--text-muted)] uppercase text-[0.8rem]'>Days</span>
                                </div>
                                <div className="flex flex-col relative ">
                                    <h3 className="relative  inline-block bg-[var(--primary)] text-white text-[1.3rem] font-semibold text-center !py-[0.4rem] !px-[0.6rem] sm:!py-[0.6rem] sm:!px-[0.9rem] rounded-md after:content-[':'] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:text-black after:text-[1.5rem]">08</h3>
                                    <span className='text-center text-[var(--text-muted)] uppercase text-[0.8rem]'>Hours</span>
                                </div>
                                <div className="flex flex-col relative ">
                                    <h3 className="relative inline-block bg-[var(--primary)] text-white text-[1.3rem] font-semibold text-center !py-[0.4rem] !px-[0.6rem] sm:!py-[0.6rem] sm:!px-[0.9rem]  rounded-md after:content-[':'] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:text-black after:text-[1.5rem]">10</h3>
                                    <span className='text-center text-[var(--text-muted)] uppercase text-[0.8rem]'>Mins</span>
                                </div>
                                <div className="flex flex-col relative ">
                                    <h3 className="relative inline-block bg-[var(--primary)] text-white text-[1.3rem] font-semibold text-center !py-[0.4rem] !px-[0.6rem] sm:!py-[0.6rem] sm:!px-[0.9rem] rounded-md ">55</h3>
                                    <span className='text-center text-[var(--text-muted)] uppercase text-[0.8rem]'>Sec</span>
                                </div>
                                
                            </div>
                           <a href='' className='!mt-[1rem] group/btn hover:-translate-y-1 inline-block border border-[var(--primary)] text-[1rem] font-bold transition-all duration-500 !text-[var(--primary)] border-2  !py-[0.5rem] capitalize !px-[0.9rem] rounded-sm'>Shop now<MdOutlineArrowRightAlt className='inline-block transition-all duration-200 !ml-[0.4rem] group-hover/btn:!ml-[0.8rem]'/></a>
                        </div>
                        </div>
                         <div className='relative !py-[1rem] sm:!py-[2rem] md:!py-[3rem] !py-[3rem] h-[30rem] !ps-[1rem] sm:!ps-[2rem] md:!ps-[3rem] w-full bg-cover bg-center' style={{backgroundImage:`url(${menuBanner2.src})`}}>
                            <div className='absolute '>
                            <h3 className='text-[1.7rem]  font-bold !text-[var(--primary)]'>Men Clothing</h3>
                            <h3 className='!mb-[0.3rem]  !text-black'>Shirt & Bag</h3>
                            <a href='' className='text-[1.2rem] inline-block !my-[1rem] leading-[1.4rem] !text-black w-full max-w-[15rem]'>Try something new on vacation</a>
                            <h2 className='text-[#ff3551] text-[1.3rem] !mb-[1rem]'>$178.00

<span className='line-through !text-[var(--text-muted)] !ml-[0.4rem] '>
$256.99</span></h2>
<h4 className='text-[var(--text-main)]  font-medium !mb-[0.5rem]'>Hurry Up! Offer End In:</h4>
                            <div className='grid grid-cols-4 gap-[1rem] sm:gap-[2rem] '>
                                <div className="flex flex-col relative ">
                                    <h3 className="relative inline-block bg-[var(--primary)] text-white text-[1.3rem] font-semibold text-center !py-[0.4rem] !px-[0.6rem] sm:!py-[0.6rem] sm:!px-[0.9rem]  rounded-md after:content-[':']  after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:text-black after:text-[1.5rem]">00</h3>
                                    <span className='text-center text-[var(--text-muted)] uppercase text-[0.8rem]'>Days</span>
                                </div>
                                <div className="flex flex-col relative ">
                                    <h3 className="relative inline-block bg-[var(--primary)] text-white text-[1.3rem] font-semibold text-center !py-[0.4rem] !px-[0.6rem] sm:!py-[0.6rem] sm:!px-[0.9rem] rounded-md after:content-[':'] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:text-black after:text-[1.5rem]">08</h3>
                                    <span className='text-center text-[var(--text-muted)] uppercase text-[0.8rem]'>Hours</span>
                                </div>
                                <div className="flex flex-col relative ">
                                    <h3 className="relative inline-block bg-[var(--primary)] text-white text-[1.3rem] font-semibold text-center !py-[0.4rem] !px-[0.6rem] sm:!py-[0.6rem] sm:!px-[0.9rem]  rounded-md after:content-[':'] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:text-black after:text-[1.5rem]">10</h3>
                                    <span className='text-center text-[var(--text-muted)] uppercase text-[0.8rem]'>Mins</span>
                                </div>
                                <div className="flex flex-col relative ">
                                    <h3 className="relative inline-block bg-[var(--primary)] text-white text-[1.3rem] font-semibold text-center !py-[0.4rem] !px-[0.6rem] sm:!py-[0.6rem] sm:!px-[0.9rem] rounded-md ">55</h3>
                                    <span className='text-center text-[var(--text-muted)] uppercase text-[0.8rem]'>Sec</span>
                                </div>
                                
                            </div>
                           <a href='' className='!mt-[1rem] group/btn hover:-translate-y-1 inline-block border border-[var(--primary)] text-[1rem] font-bold !text-[var(--primary)] transition-all duration-500 border-2  !py-[0.5rem] capitalize !px-[0.9rem] rounded-sm'>Shop now<MdOutlineArrowRightAlt className='inline-block group-hover/btn:!ml-[0.8rem] !ml-[0.4rem] transition-all duration-200'/></a>
                        </div>
                        </div>
            </section>
            {/* brands */}
            <section className="!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem]">
                <div className='flex justify-between'>
                     <h1 className='text-[1.5rem] font-semibold !text-black !mb-[1rem]'><span className='text-[var(--primary)]'>Featured </span> Brands</h1>
                     <div className=""> <button className="custom-prev bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem]  rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> <PiLessThan/> </button> <button className="custom-next bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] rounded-full hover:bg-[var(--primary)] !p-[0.5rem] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer !ml-[0.6rem]">  <PiGreaterThan/> </button>
  </div>
                </div>
 
  
  <div className="relative !mx-[1rem]">
    <Swiper
      modules={[Navigation, Autoplay]}
      breakpoints={{
                        0:{slidesPerView:2},
                        640:{slidesPerView:3},
                        768:{slidesPerView:4},
                        1024:{slidesPerView:5},
                        1280:{slidesPerView:5},
                    }}
      spaceBetween={20}
      autoplay={{delay:2500,disableOnInteraction:false}}
      loop
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
    >
      {[
        { name: "A DESIGN HUB", logo: brand1.src },
        { name: "Travel", logo: brand2.src },
        { name: "Mockup BAR", logo: brand3.src },
        { name: "Backyard Studio", logo: brand4.src },
        { name: "Travel 2", logo: brand5.src },
        { name: "Travel 2", logo: brand6.src }
      ].map((brand, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={brand.logo}
            alt={brand.name}
            className="h-[6.5rem] mx-auto object-contain grayscale-100 hover:grayscale-0 cursor-pointer transition-all duration-700 w-[14rem]"
          />
        </SwiperSlide>
      ))}
    </Swiper>
    
  </div>
            </section>
            {/* Monthly Best Sell */}
            <section className='bg-[var(--bg-light)] !px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[3rem]'>
                <div className='flex justify-between !mb-[1rem]'>
                    <h1 className='text-[1.5rem] font-semibold !text-black !mb-[1rem]'><span className='text-[var(--primary)]'>Monthly </span> Best Sell</h1>
                     <div className='grid hidden md:inline-block grid-cols-2'>
                        <button type='button' className='bg-[var(--orange-light)] !mr-[0.6rem] hover:-translate-y-2 transition-all duration-500 rounded-md !py-[0.4rem] !px-[1.2rem] text-[1.1rem] font-semibold capitalize text-[var(--primary)] cursor-pointer' onClick={()=>checkThing('feature')}>Featured</button>
                        <button type='button' className='bg-[var(--border-color)] !mr-[0.6rem] hover:-translate-y-2 transition-all duration-500 transition-all duration-700 hover:bg-[var(--orange-light)] rounded-md !py-[0.4rem] !px-[1.2rem] text-[1.1rem] font-semibold capitalize hover:text-[var(--primary)] cursor-pointer' onClick={()=>checkThing('popular')}>Popular</button>
                        <button type='button' className='bg-[var(--border-color)] inline-block hover:-translate-y-2 transition-all duration-500 hover:bg-[var(--orange-light)] transition-all duration-700 rounded-md !py-[0.4rem] !px-[1.2rem] text-[1.1rem] font-semibold capitalize hover:text-[var(--primary)] cursor-pointer' onClick={()=>checkThing('newone')} >New added</button>
                    </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-[1rem]'>
                     <div className=' relative hidden lg:block rounded-3xl  bg-center h-[20rem]  !ps-[1rem] !py-[2rem]' style={{backgroundImage:`url(${banner6.src})`}}>
                        <div className='absolute top-1/2 -translate-y-1/2 !ps-[1rem]'>
                            <h3 className=' text-[0.9rem] !mb-[0.4rem]  text-[var(--text-muted)]'>Big Offer</h3>
                            <h1 className='font-semibold text-[1.3rem] w-full max-w-[10rem] !text-black leading-[1.6rem]'>Save 20% on
Women's socks</h1>
                            <a href='' className='!mt-[0.9rem] inline-block  text-[0.9rem]  !text-[var(--primary)] !py-[0.5rem] capitalize  rounded-sm'>Shop now<MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem]'/></a>
                        </div></div>
                       <div className='relative w-full overflow-hidden '>
                        <div className="absolute top-[30%] left-5 -translate-y-1/2 z-10"> <button className="prev-new bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem]  rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> <PiLessThan /> </button> </div> <div className="absolute top-[30%] right-5 -translate-y-1/2 z-10"> <button className="next-new  bg-[var(--green-light)] border border-[var(--green-border)] text-[var(--primary)] !p-[0.5rem]  rounded-full hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--white)] duration-700 transition-all cursor-pointer"> <PiGreaterThan /> </button> </div>
                    <Swiper modules={[Navigation,Autoplay]}
                    loop breakpoints={{
                        0:{slidesPerView:2},
                        640:{slidesPerView:2},
                        768:{slidesPerView:3},
                        1024:{slidesPerView:3},
                        1240:{slidesPerView:4},
                    }}
                    spaceBetween={10}
                    autoplay={{delay:2500,disableOnInteraction:true,pauseOnMouseEnter:true}}
                    navigation={{
                        nextEl:'.next-new',
                        prevEl:'.prev-new',
                    }}   observer={true}
  observeParents={true}>{products.map((product,index)=>(
                        <SwiperSlide key={index} >
                            <div className=' border !p-[0.6rem] group/card rounded-2xl  border-[var(--green-border)] '>
                        <div className='cursor-pointer relative rounded-md overflow-hidden'>
                            <img src={product.img1} className='h-[10rem] w-full rounded-2xl
    transition-all duration-700 ease-in-out
    scale-100 opacity-100  object-cover
    
    group-hover/card:opacity-0' />
                            <img src={product.img2} className='absolute inset-0 h-[10rem] w-full  object-cover rounded-2xl
    transition-all duration-700 ease-in-out
     opacity-0
    
    group-hover/card:opacity-100'/>
                            <div className='absolute top-[5%] left-[5%]'>
                                <span className='bg-[var(--pink-dark)] text-[var(--white)] text-[0.9rem] font-sembiold !py-[0.1rem] rounded-lg !px-[0.6rem] cursor-text'>{product.badge}</span>
                            </div>
                            <div className='flex opacity-0 group-hover/card:opacity-100 duration-700 transition-all  gap-[0.6rem] justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                <div className="relative group/icon ">
                                    <span className="absolute -top-8
left-1/2
-translate-x-1/2 bg-[var(--primary)] text-white text-[0.8rem] w-[5.5rem] text-center block opacity-0 !py-[0.2rem] rounded-lg  group-hover/icon:opacity-100 transition transition-all duration-500 capitalize">Quick View</span>
                                    <span className="absolute -top-2 left-1/2 -translate-x-1/2
  border-8 border-transparent 
  border-t-[var(--primary)] opacity-0  group-hover/icon:opacity-100
  transition-all duration-500"></span>
                                    <a href='' className="w-10 h-10 flex items-center justify-center 
              bg-[var(--green-light)] group-hover/icon:bg-[var(--primary)] group-hover/icon:!text-white 
              rounded-full transition-all duration-500 
              text-[1.1rem] text-[var(--primary)] "><IoEyeOutline /></a></div>
                                <div className='relative group/icon'>
                                    <span className="absolute -top-8
left-1/2
-translate-x-1/2 bg-[var(--primary)] text-white text-[0.8rem] w-[6.6rem] opacity-0 text-center block  !py-[0.2rem] rounded-lg  group-hover/icon:opacity-100 transition transition-all duration-500 capitalize">Add to wishlist</span>
                                    <span className='absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--primary)] duration-500 transition-all opacity-0 group-hover/icon:opacity-100'></span>
                                    <a href='' className='w-10 h-10 flex items-center justify-center 
              bg-[var(--green-light)] hover:bg-[var(--primary)] hover:!text-white 
              rounded-full transition-all duration-500 
              text-[1.1rem] text-[var(--primary)]'><IoHeartOutline /></a>
                                </div>
                                <div className='relative group/icon'>
                                    <span className="absolute -top-8
left-1/2
-translate-x-1/2 bg-[var(--primary)] text-white text-[0.8rem] w-[4.6rem] opacity-0 text-center block  !py-[0.2rem] rounded-lg  group-hover/icon:opacity-100 transition transition-all duration-500 capitalize">Compare</span>
<span className='absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--primary)] duration-500 transition-all opacity-0 group-hover/icon:opacity-100'></span>
<a href='' className='w-10 h-10 flex items-center justify-center 
              bg-[var(--green-light)] group-hover/icon:bg-[var(--primary)] group-hover/icon:!text-white 
              rounded-full transition-all duration-500 
              text-[1.1rem] text-[var(--primary)]'><FaCodeCompare /></a></div>
                            </div>
                        </div>
                       <div className='!mt-[0.6rem]'>
                            <a href='' className='inline-block  text-[0.8rem]  !text-[var(--text-muted)] hover:!text-[var(--primary)]'>{product.category}</a>
                            <a href='' className='block !text-black  font-bold capitalize hover:!text-[var(--primary)]'>{product.name}</a>
                            <div className='flex justify-between'>
                                <div>
                                    <div className='flex text-[var(--yellow)]'><MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 /><MdStarPurple500 /><div><span className='text-[var(--foreground)] font-medium !ml-[0.3rem]'>{product.discount}</span></div></div>
                                    <h3 className='text-[1.2rem] text-[var(--primary)]  font-semibold'>${product.price} <span className='!ml-[0.5rem] line-through text-[1rem] font-normal text-[var(--text-muted)] !decoration-1'>${product.oldPrice}</span></h3>
                                </div>
                                <div className='flex items-center !pr-[1.1rem] relative group/icon'>
                                    <span className='absolute -top-5 w-[4.4rem] bg-[var(--primary)] text-center rounded-md !py-[0.2rem] text-[0.7rem] opacity-0 group-hover/icon:opacity-100 transtion-all duration-500 left-4 -translate-x-1/2 !text-white capitalize '>Add to cart</span>
                                    <span className='border-8 border-transparent border-t-[var(--primary)] duration-500 transition-all opacity-0  group-hover/icon:opacity-100 absolute top-[2] left-4 -translate-x-1/2 transtion-all duration-500'></span>
                                    <a href='' className='bg-[var(--green-light)] border border-[var(--green-border)] rounded-full !p-[0.4rem] group-hover/icon:bg-[var(--primary)] text-[var(--primary)] group-hover/icon:!text-white  
              transition-all duration-500'><IoBagAddOutline  /></a>
                                </div>
                            </div>
                            </div>
                        </div>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                 </div> 
                </div>
            </section>
            {/* blog */}
            <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem] gap-[1rem] grid grid-cols-1 lg:grid-cols-[1fr_1fr]'>
                    <div className='grid grid-cols-1 gap-[1.5rem]'>
                        <h1 className='text-[1.5rem] font-semibold !text-black'><span className='text-[var(--primary)]'>From</span> blog</h1>
                        <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr]'>
                            <div>
                                <img src={blog2.src}/>
                            </div>
                            <div className='!p-[1rem] '>
                                <a href='' className='block font-medium text-[0.9rem] !text-[var(--primary-hover)]'>Fashion</a>
                                <a href='' className='text-[1.2rem] block w-full max-w-[23rem] !my-[0.5rem] leading-[1.5rem] !text-black font-medium'>Qualcomm is developing a Nintendo Switch-like console, report says</a>
                                <div className='flex justify-between text-[0.8rem] '>
                                    <div className='flex'><p className='!mr-[0.7rem]'>4 April 2026</p><ul className='!pl-3 !list-disc !list-[var(--text-muted)]'><li>12M Views</li></ul></div> 
                                    <a href='' className='inline-block !text-[var(--primary-hover)]'>Read more</a>
                                </div>
                            </div>
                        </div>
                         <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr]'>
                            <div>
                                <img src={blog1.src}/>
                            </div>
                           <div className='!p-[1rem] '>
                                <a href='' className='block font-medium text-[0.9rem] !text-[var(--primary-hover)]'>Fashion</a>
                                <a href='' className='text-[1.2rem] block w-full max-w-[23rem] !my-[0.5rem] leading-[1.5rem] !text-black font-medium'>Qualcomm is developing a Nintendo Switch-like console, report says</a>
                                <div className='flex justify-between text-[0.8rem] '>
                                    <div className='flex'><p className='!mr-[0.7rem]'>4 April 2026</p><ul className='!pl-3 !list-disc !list-[var(--text-muted)]'><li>12M Views</li></ul></div> 
                                    <a href='' className='inline-block !text-[var(--primary-hover)]'>Read more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                   <div className='grid grid-cols-1 md:grid-cols-2 gap-[1rem]'>
                     <div className=' relative  bg-center group  h-[15rem]  md:h-full !ps-[2rem] !pt-[4rem] !pb-[2rem]' style={{backgroundImage:`url(${banner5.src})`}}>
                        <div className='absolute'>
                            <h3 className='text-[0.9rem] !mb-[0.4rem]  text-[var(--text-muted)]'>Accessories</h3>
                            <h1 className='font-semibold group-hover:!ml-[0.5rem] transition-all duration-500 text-[1.3rem] w-full max-w-[10rem] !text-black leading-[1.6rem]'>Save 17% on
Autumn Hat</h1>
                            <a href='' className='!mt-[0.9rem] inline-block  text-[0.9rem]  !text-[var(--primary)] !py-[0.5rem] capitalize  rounded-sm group/icon'>Shop now<MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem] transition-all duration-500 group-hover/icon:!ml-[0.8rem]'/></a>
                        </div></div>
                    <div className='grid grid-cols-1 gap-[1rem]'>
                         <div className=' relative  bg-center group  h-[12rem] lg:h-full  !ps-[1rem] !py-[2rem]' style={{backgroundImage:`url(${banner6.src})`}}>
                        <div className='absolute'>
                            <h3 className=' text-[0.9rem] !mb-[0.4rem]  text-[var(--text-muted)]'>Big Offer</h3>
                            <h1 className='font-semibold text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 w-full max-w-[10rem] !text-black leading-[1.6rem]'>Save 20% on
Women's socks</h1>
                            <a href='' className='!mt-[0.9rem] inline-block  text-[0.9rem]  !text-[var(--primary)] !py-[0.5rem] capitalize group/icon rounded-sm'>Shop now<MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem] transition-all duration-500 group-hover/icon:!ml-[0.8rem]'/></a>
                        </div></div>
                         <div className=' relative  bg-center h-[12rem] group lg:h-full   !ps-[1rem] !py-[2rem]' style={{backgroundImage:`url(${banner7.src})`}}>
                        <div className='absolute right-2'>
                            <h3 className=' text-[0.9rem] !mb-[0.4rem]  text-[var(--text-muted)]'>Smart Offer</h3>
                            <h1 className='font-semibold text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 w-full max-w-[10rem] !text-black leading-[1.6rem]'>Save 20% on
Eardrop</h1>
                            <a href='' className='!mt-[0.9rem] inline-block  text-[0.9rem]  !text-[var(--primary)] !py-[0.5rem] capitalize group/icon  rounded-sm'>Shop now<MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem] transition-all duration-500 group-hover/icon:!ml-[0.8rem]'/></a>
                        </div></div>
                    </div>
                   </div>
            </section>
            {/* mothers day */}
             <section className='!mx-[1rem]  sm:!px-[2rem] md:!px-[4rem] lg:!mx-[6rem]  relative !my-[0.8rem] !my-[1rem] md:!my-[1.5re,] lg:!my-[2rem] bg-center  h-[10rem] !ps-[2rem]  sm:!ps-[3rem] !py-[2rem] sm:!py-[3rem]' style={{backgroundImage:`url(${banner8.src})`}}>
                        <div className='absolute'>
                            <h3 className=' !mb-[0.7rem] font-semibold text-[var(--text-muted)]'>Shop Today’s Deals</h3>
                            <h1 className='font-bold text-[1.3rem] w-full max-w-[15rem] sm:max-w-full sm:text-[1.5rem] md:text-[2rem] !text-black leading-[1.6rem]'>Happy <span className='text-[var(--primary)]'> Mother's Day</span>. Big Sale Up to 40%</h1>
                        </div>
            </section>
            {/* top sells */}
            <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem] grid-cols-1  md:grid-cols-2 grid lg:grid-cols-[1fr_1fr_1fr_1fr] gap-[1.5rem]'>
                    <div className='relative group  bg-center h-[24rem] w-full bg-center md:h-full bg-no-repeat  !ps-[2rem] !pt-[4rem] !pb-[2rem] bg-cover' style={{backgroundImage:`url(${banner10.src})`}}>
                        <div className='absolute'>
                            <h3 className=' text-[0.9rem] !mb-[0.4rem]  text-[var(--text-muted)]'>Big Offer</h3>
                            <h1 className='font-semibold group-hover:!ml-[0.5rem] transition-all duration-500 text-[1.3rem] w-full max-w-[10rem] !text-black leading-[1.6rem]'>Save 20% on
Women's socks</h1>
                            <a href='' className='!mt-[0.9rem] inline-block  text-[0.9rem]  !text-[var(--primary)] !py-[0.5rem] capitalize  rounded-sm group/icon'>Shop now<MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem] transition-all duration-500 group-hover/icon:!ml-[0.8rem]'/></a>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-[1.5rem]'>
                        <h1 className=" font-semibold !text-black relative  before:content-['']  before:absolute before:left-0  before:bottom-0 !mb-[1rem] !pb-[0.5rem] before:w-full  before:h-[0.5px]  before:bg-[#dfdfdf]  before:block after:content-['']  after:absolute after:block after:left-0 after:bottom-0 after:bg-[var(--primary)] after:h-[1px] after:w-[18%]">Deals & Outlet</h1>
                        <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-[0.4rem] md:gap-[1rem]'>
                             <div><img src={thumbnail1.src}/></div>
                            <div className='!p-[0.6rem]'>
                                <a href='' className='inline-block !text-black font-medium'>Fish Print Patched T-shirt</a>
                                <h5 className='text-[var(--text-muted)]'><span className='text-[var(--primary)] font-medium  !mr-[0.4rem]'>$238.85 </span> $245.8</h5>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-[0.4rem] md:gap-[1rem]'>
                              <div><img src={thumbnail2.src}/></div>
                            <div className='!p-[0.6rem]'>
                                <a href='' className='inline-block !text-black font-medium'>Fish Print Patched T-shirt</a>
                                <h5 className='text-[var(--text-muted)]'><span className='text-[var(--primary)] font-medium  !mr-[0.4rem]'>$238.85 </span> $245.8</h5>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-[0.4rem] md:gap-[1rem]'>
                             <div><img src={thumbnail3.src}/></div>
                            <div className='!p-[0.6rem]'>
                                <a href='' className='inline-block !text-black font-medium'>Fish Print Patched T-shirt</a>
                                <h5 className='text-[var(--text-muted)]'><span className='text-[var(--primary)] font-medium  !mr-[0.4rem]'>$238.85 </span> $245.8</h5>
                            </div>
                        </div>
                    </div>
                     <div className='grid grid-cols-1 gap-[1.5rem]'>
                        <h1 className=" font-semibold !text-black relative  before:content-['']  before:absolute before:left-0  before:bottom-0 !mb-[1rem] !pb-[0.5rem] before:w-full  before:h-[0.5px]  before:bg-[#dfdfdf]  before:block after:content-['']  after:absolute after:block after:left-0 after:bottom-0 after:bg-[var(--primary)] after:h-[1px] after:w-[18%]">Top Selling</h1>
                        <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-[0.4rem] md:gap-[1rem]'>
                             <div><img src={thumbnail4.src}/></div>
                            <div className='!p-[0.6rem]'>
                                <a href='' className='inline-block !text-black font-medium'>Fish Print Patched T-shirt</a>
                                <h5 className='text-[var(--text-muted)]'><span className='text-[var(--primary)] font-medium  !mr-[0.4rem]'>$238.85 </span> $245.8</h5>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-[0.4rem] md:gap-[1rem]'>
                              <div><img src={thumbnail5.src}/></div>
                            <div className='!p-[0.6rem]'>
                                <a href='' className='inline-block !text-black font-medium'>Fish Print Patched T-shirt</a>
                                <h5 className='text-[var(--text-muted)]'><span className='text-[var(--primary)] font-medium  !mr-[0.4rem]'>$238.85 </span> $245.8</h5>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-[0.4rem] md:gap-[1rem]'>
                             <div><img src={thumbnail6.src}/></div>
                            <div className='!p-[0.6rem]'>
                                <a href='' className='inline-block !text-black font-medium'>Fish Print Patched T-shirt</a>
                                <h5 className='text-[var(--text-muted)]'><span className='text-[var(--primary)] font-medium  !mr-[0.4rem]'>$238.85 </span> $245.8</h5>
                            </div>
                        </div>
                    </div>
                     <div className='grid grid-cols-1 gap-[1.5rem]'>
                        <h1 className=" font-semibold !text-black !pb-[0.5rem] relative  before:content-['']  before:absolute before:left-0  before:bottom-0 !mb-[1rem] before:w-full  before:h-[0.5px]  before:bg-[#dfdfdf]  before:block after:content-['']  after:absolute after:block after:left-0 after:bottom-0 after:bg-[var(--primary)] after:h-[1px] after:w-[18%]">Hot Releases</h1>
                        <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-[0.4rem] md:gap-[1rem]'>
                             <div><img src={thumbnail7.src}/></div>
                            <div className='!p-[0.6rem]'>
                                <a href='' className='inline-block !text-black font-medium'>Fish Print Patched T-shirt</a>
                                <h5 className='text-[var(--text-muted)]'><span className='text-[var(--primary)] font-medium  !mr-[0.4rem]'>$238.85 </span> $245.8</h5>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-[0.4rem] md:gap-[1rem]'>
                              <div><img src={thumbnail8.src}/></div>
                            <div className='!p-[0.6rem]'>
                                <a href='' className='inline-block !text-black font-medium'>Fish Print Patched T-shirt</a>
                                <h5 className='text-[var(--text-muted)]'><span className='text-[var(--primary)] font-medium  !mr-[0.4rem]'>$238.85 </span> $245.8</h5>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-[0.4rem] md:gap-[1rem]'>
                             <div><img src={thumbnail9.src}/></div>
                            <div className='!p-[0.6rem]'>
                                <a href='' className='inline-block !text-black font-medium'>Fish Print Patched T-shirt</a>
                                <h5 className='text-[var(--text-muted)]'><span className='text-[var(--primary)] font-medium  !mr-[0.4rem]'>$238.85 </span> $245.8</h5>
                            </div>
                        </div>
                    </div>
            </section>
        </>
  );
}
