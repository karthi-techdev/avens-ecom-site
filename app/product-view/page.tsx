"use client";
import { Star } from 'lucide-react';
import Image from 'next/image';
import { BadgeCheck, ChevronRight, ArrowRight, RefreshCcw, Wallet, Heart, Repeat, Search, Filter, Facebook, Twitter, Instagram, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Thumbs, Zoom, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "aos/dist/aos.css";


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
const images = [
  {
    main: "/product-view/product1.jpg",
    thumb: "/product-view/product1.jpg",
  },
  {
    main: "/product-view/product2.jpg",
    thumb: "/product-view/product2.jpg",
  },
  {
    main: "/product-view/product3.jpg",
    thumb: "/product-view/product3.jpg",
  },
  {
    main: "/product-view/product4.jpg",
    thumb: "/product-view/product4.jpg",
  },
  {
    main: "/product-view/product5.jpg",
    thumb: "/product-view/product5.jpg",
  },
  {
    main: "/product-view/product7.jpg",
    thumb: "/product-view/product7.jpg",
  },
  {
    main: "/product-view/product8.jpg",
    thumb: "/product-view/product8.jpg",
  },
  {
    main: "/product-view/product9.jpg",
    thumb: "/product-view/product9.jpg",
  },
  {
    main: "/product-view/product10.jpg",
    thumb: "/product-view/product10.jpg",
  },
  {
    main: "/product-view/product11.jpg",
    thumb: "/product-view/product11.jpg",
  },
  {
    main: "/product-view/product12.jpg",
    thumb: "/product-view/product12.jpg",
  },
  {
    main: "/product-view/product13.jpg",
    thumb: "/product-view/product13.jpg",
  },
  {
    main: "/product-view/product14.jpg",
    thumb: "/product-view/product14.jpg",
  },
];

export default function ProductViewPage() {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("DESCRIPTION");
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeThumbIndex, setActiveThumbIndex] = useState<number | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);





  return (
    <main className="main ">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm !mb-6 !px-4 sm:!px-6 !py-4  rounded" style={{
        backgroundColor: 'var(--bg-light)',
        color: 'var(--text-muted)'
      }}>
        <a href="/" className="!text-[var(--primary)] ">Home</a>
        <span className="!mx-2">
          <ChevronRight size={16} />
        </span>
        <a href="/" >Fashion</a>
        <span className="!mx-2">
          <ChevronRight size={16} />
        </span>
        <a href="/" >Abstract Print Patchwork Dress</a>
      </nav>
      <div className="max-w-[1400px] mx-auto !px-3 sm:!px-6 md:!px-10 lg:!px-[60px] !py-5 ">


        {/* Main*/}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-18">

          {/* Left Side  */}
          <div className="col-span-1 lg:col-span-9 order-1 lg:order-1">
            {/* Product Image and Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-10">
              <div>
                {/* Main Image Swiper with Autoplay */}
                <div
                  className="relative w-full !h-[280px] sm:!h-[350px] md:!h-[400px] lg:!h-[450px]"

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
                    modules={[Thumbs, Zoom, Autoplay]}
                    onSwiper={setMainSwiper}
                    thumbs={{
                      swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}
                    zoom={true}
                    autoplay={{
                      delay: 1000,
                      disableOnInteraction: false,
                    }}
                    speed={800}
                    className="!mb-4 h-full"
                  >
                    {images.map((img, index) => (
                      <SwiperSlide key={index} className="h-full">
                        <div className="swiper-zoom-container h-full w-full flex items-center justify-center">
                          <Image
                            src={img.main}
                            alt="product"
                            width={500}
                            height={450}
                            className="h-full w-full object-cover rounded-lg"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Thumbnail Swiper */}
                <div
                  className="relative"
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
                    slidesPerView={5}
                    spaceBetween={8}
                    loop={true}
                    autoplay={{
                      delay: 1000,
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
                    className="!mt-10"
                  >
                    {images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <div
                          onClick={() => {
                            setActiveThumbIndex(index);
                            mainSwiper?.slideTo(index);
                          }}
                          className={`border-1 rounded overflow-hidden transition-all duration-200 ${activeThumbIndex === index
                            ? "border-[var(--primary)]"
                            : "border-transparent"
                            }`}
                        >
                          <div className="w-full !h-20 sm:h-24 md:h-28 relative">
                            <Image
                              src={img.thumb}
                              alt="thumb"
                              fill
                              className="object-cover cursor-pointer rounded"
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* SHARE SECTION */}
                <div className="!mt-12 !mx-2 sm:!mx-4 md:!mx-6 lg:!mx-8 pt-4 flex items-center flex-wrap">
                  <h3 className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Share this :</h3>
                  <div className="flex items-center gap-4 !mx-4">
                    <a href="#" className="hover:scale-110 transition-transform" style={{ color: 'var(--text-muted)' }} aria-label="Share on Facebook">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform" style={{ color: 'var(--text-muted)' }} aria-label="Share on Twitter">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform" style={{ color: 'var(--text-muted)' }} aria-label="Share on Instagram">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform" style={{ color: 'var(--text-muted)' }} aria-label="Share on Messenger">
                      <MessageCircle size={20} />
                    </a>
                  </div>
                </div>

              </div>


              {/* Product Info */}
              <div className="space-y-6 !mb-8">
                <h1 className="text-xl sm:text-4xl font-bold !mb-2" style={{ color: 'var(--text-main)' }}>
                  Colorful Pattern Shirts HD450
                </h1>
                <div className="flex justify-between items-center !mb-8">
                  <p className="!mb-2 !mt-4" style={{ color: 'var(--primary)' }}><span className="font-medium" style={{ color: 'var(--text-main)' }}>Brands:</span>Boostrap</p>
                  <div className="flex items-center">
                    <div className="flex" style={{ color: 'var(--star-rating)' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm ml-2" style={{ color: 'var(--text-muted)' }}>
                      (25 reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 !mb-6 border-y py-4" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-xl sm:text-3xl font-bold !m-2" style={{ color: 'var(--primary)' }}>$120.00</span>
                  <span className="text-gray-500 line-through">$200.00</span>
                  <span className="text-sm">25% Off</span>
                </div>

                {/* Description */}
                <p className="text-sm !mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi, quasi, odio minus dolore impedit fuga eum eligendi? Officia doloremque facere quia. Voluptatum, accusantium!
                </p>

                {/* Features */}
                <ul className="space-y-4 text-sm !mb-6" style={{ color: "var(--text-muted)" }}>
                  <li className="flex items-center gap-2 !mb-5">
                    <BadgeCheck className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                    <span>1 Year AL Jazeera Brand Warranty</span>
                  </li>
                  <li className="flex items-center gap-2  !mb-5">
                    <RefreshCcw className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                    <span>30 Day Return Policy</span>
                  </li>
                  <li className="flex items-center gap-2  !mb-5">
                    <Wallet className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                    <span>Cash on Delivery available</span>
                  </li>
                </ul>

                {/* Color Selection */}
                <div className="!mb-6 flex items-center gap-4">
                  <p className="text-sm font-medium w-16" style={{ color: 'var(--text-main)' }}>Color</p>
                  <div className="flex items-center gap-3">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${selectedColor === color ? "border-black scale-110" : "border-gray-300"}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="!mb-6 flex items-center gap-4">
                  <p className="text-sm font-medium w-16" style={{ color: 'var(--text-main)' }}>Size</p>
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

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-5 !mb-9">
                  {/* Quantity */}
                  <div className="flex items-center border rounded overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="!p-2 border-r hover:bg-gray-50 transition-colors"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
                    >
                      -
                    </button>
                    <span className="!p-2 text-center min-w-[50px]" style={{ color: 'var(--text-main)' }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="!p-2 border-l hover:bg-gray-50 transition-colors"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button className="!px-10 !py-2 rounded text-white " style={{ backgroundColor: 'var(--primary)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}>Add to cart</button>

                  {/* Wishlist */}
                  <button className="!px-2 !py-3 border rounded transition-all duration-200 bg-white hover:-translate-y-1" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}><Heart size={18} /></button>

                  {/* Compare */}
                  <button className="!p-2 !py-3 border rounded transition-all duration-200 bg-white hover:-translate-y-1" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}><Repeat size={18} /></button>
                </div>

                {/* Product Meta */}
                <div className="text-sm mb-6 space-y-2 border-t pt-5  !mb-5" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                  <p className="!mb-2 !mt-4" style={{ color: 'var(--primary)' }}><span className="font-medium" style={{ color: 'var(--text-main)' }}>SKU:</span> FWM15VKT</p>
                  <p className="!mb-2 " style={{ color: 'var(--primary)' }}><span className="font-medium" style={{ color: 'var(--text-main)' }}>Tags:</span> Cloth, Women, Dress</p>
                  <p className="!mb-2" style={{ color: '#ef4444' }}><span className="font-medium" style={{ color: 'var(--text-main)' }}>Availability:</span> 8 Items In Stock</p>
                </div>
              </div>
            </div>

            {/* Tabs*/}

            <div className="border-b relative !mb-6" style={{ borderColor: "var(--border-color)" }}>

              <div className="flex gap-8">

                {/* DESCRIPTION */}
                <button
                  onClick={() => setActiveTab("DESCRIPTION")}
                  className="pb-3 relative font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    color: activeTab === "DESCRIPTION"
                      ? "var(--primary)"
                      : "var(--text-main)",
                  }}
                >
                  DESCRIPTION

                  {activeTab === "DESCRIPTION" && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-[2px]"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                  )}
                </button>


                {/* ADDITIONAL */}
                <button
                  onClick={() => setActiveTab("ADDITIONAL")}
                  className="pb-3 relative font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    color: activeTab === "ADDITIONAL"
                      ? "var(--primary)"
                      : "var(--text-main)",
                  }}
                >
                  ADDITIONAL INFO

                  {activeTab === "ADDITIONAL" && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-[2px]"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                  )}
                </button>


                {/* REVIEWS */}
                <button
                  onClick={() => setActiveTab("REVIEWS")}
                  className="pb-3 relative font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    color: activeTab === "REVIEWS"
                      ? "var(--primary)"
                      : "var(--text-main)",
                  }}
                >
                  REVIEWS

                  {activeTab === "REVIEWS" && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-[2px]"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                  )}
                </button>

              </div>

            </div>

            {/* Tab Content */}
            <div className="!mb-10  sm:!mx-4 md:!mx-6 lg:!mx-1">
              {activeTab === "DESCRIPTION" && (
                <div>
                  <p className="text-md leading-relaxed !mb-4" style={{ color: 'var(--text-muted)' }}>
                    Uninhibited carnally hired played in whimpered dear gorilla koala depending and much yikes off far quetzal goodness and from for grimaced goodness unaccountably and meadowlark near unblushingly crucial scallop tightly neurotic hungrily some and dear furiously this apart.
                  </p> <p className="text-md leading-relaxed !mb-4" style={{ color: 'var(--text-muted)' }}>


                    Spluttered narrowly yikes left moth in yikes bowed this that grizzly much hello on spoon-fed that alas rethought much decently richly and wow against the frequent fluidly at formidable acceptably flapped besides and much circa far over the bucolically hey precarious goldfinch mastodon goodness gnashed a jellyfish and one however because.
                  </p>

                  {/* Product Details List */}
                  <div className="!mb-8">
                    <ul className="!space-y-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                      <li className="flex">
                        <span className="font-medium w-32" style={{ color: 'var(--text-main)' }}>Type Of Packing</span>
                        <span>Bottle</span>
                      </li>
                      <li className="flex">
                        <span className="font-medium w-32" style={{ color: 'var(--text-main)' }}>Color</span>
                        <span>Green, Pink, Powder Blue, Purple</span>
                      </li>
                      <li className="flex">
                        <span className="font-medium w-32" style={{ color: 'var(--text-main)' }}>Quantity Per Case</span>
                        <span>100ml</span>
                      </li>
                      <li className="flex">
                        <span className="font-medium w-32" style={{ color: 'var(--text-main)' }}>Ethyl Alcohol</span>
                        <span>70%</span>
                      </li>
                      <li className="flex">
                        <span className="font-medium w-32" style={{ color: 'var(--text-main)' }}>Piece In One</span>
                        <span>Carton</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full h-px !mb-4" style={{ backgroundColor: 'var(--border-color)' }}></div>

                  {/* Additional Description */}
                  <p className="text-md leading-relaxed !mb-6" style={{ color: 'var(--text-muted)' }}>
                    Laconic overheard dear woodchuck wow this outrageously taut beaver hey hello far meadowlark imitatively egregiously hugged that yikes minimally unanimous pouted flirtatiously as beaver beheld above forward energetic across this jeepers beneficently cockily less a the raucously that magic upheld far so the this where crud then below after jeze enchanting drunkenly more much wow callously irrespective limpet.
                  </p>

                  {/* Packaging & Delivery Section */}
                  <h3 className="font-bold text-lg !mb-2" style={{ color: 'var(--text-main)' }}>Packaging & Delivery</h3>
                  <div className="w-full h-px !mb-4" style={{ backgroundColor: 'var(--border-color)' }}></div>
                  <p className="text-md leading-relaxed !mb-4" style={{ color: 'var(--text-muted)' }}>
                    Less lion goodness that euphemistically robin expeditiously bluebird smugly scratched far while thus cackled sheepishly rigid after due one assenting regarding censorious while occasional or this more crane went more as this less much amid overhung anathematic because much held one exuberantly sheep goodness so where rat wry well concomitantly.
                  </p>
                  <p className="text-md leading-relaxed !mb-6" style={{ color: 'var(--text-muted)' }}>
                    Scallop or far crud plain remarkably far by thus far iguana lewd precociously and and less rattlesnake contrary caustic wow this near alas and next and pled the yikes articulate about as less cackled dalmatian in much less well jeering for the thanks blindly sentimental whimpered less across objectively fanciful grimaced wildly some wow and rose jeepers.
                  </p>
                </div>
              )}
              {activeTab === "ADDITIONAL" && (
                <div className="border rounded-lg overflow-hidden !mt-6" style={{ borderColor: 'var(--border-color)' }}>
                  <table className="w-full text-sm" style={{ color: 'var(--text-main)', }}>
                    <tbody>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', width: '40%', borderColor: 'var(--border-color)' }}>Stand Up</td>
                        <td className="!py-3 !px-4">35"L x 24"W x 37-45"H (front to back wheel)</td>
                      </tr>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Folded (w/o wheels)</td>
                        <td className="!py-3 !px-4">32.5"L x 18.5"W x 16.5"H</td>
                      </tr>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Folded (w/wheels)</td>
                        <td className="!py-3 !px-4">32.5"L x 24"W x 18.5"H</td>
                      </tr>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Door Pass Through</td>
                        <td className="!py-3 !px-4">24</td>
                      </tr>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Frame</td>
                        <td className="!py-3 !px-4">Aluminum</td>
                      </tr>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Weight (w/o wheels)</td>
                        <td className="!py-3 !px-4">20 LBS</td>
                      </tr>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Weight Capacity</td>
                        <td className="!py-3 !px-4">60 LBS</td>
                      </tr>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Width</td>
                        <td className="!py-3 !px-4">24"</td>
                      </tr>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Handle height (ground to handle)</td>
                        <td className="!py-3 !px-4">37-45"</td>
                      </tr>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Wheels</td>
                        <td className="!py-3 !px-4">12" air / wide track slick tread</td>
                      </tr>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Seat back height</td>
                        <td className="!py-3 !px-4">21.5"</td>
                      </tr>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Head room (inside canopy)</td>
                        <td className="!py-3 !px-4">25″</td>
                      </tr>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Color</td>
                        <td className="!py-3 !px-4">Black, Blue, Red, White</td>
                      </tr>
                      <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <td className="!py-3 !px-4 font-medium border-r" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Size</td>
                        <td className="!py-3 !px-4">M, S</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "REVIEWS" && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-15">
                    <div>
                      <h1 className="text-xl font-bold !mb-6" style={{ color: 'var(--text-main)' }}>Customer questions & answers</h1>

                      {/* Review  1*/}
                      <div className="!mb-6 pb-6 border-b flex gap-6" style={{ borderColor: "var(--border-color)" }}>
                        {/* LEFT COLUMN  */}
                        <div className="flex flex-col items-center !w-[80px] sm:!w-[100px] md:!w-[120px] flex-shrink-0 text-center">
                          {/* Profile Image */}
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 !mb-2">
                            <Image
                              src="/product-view/profile1.jpg"
                              alt="Jacky Chan"
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-semibold text-sm !mb-1" style={{ color: "var(--text-main)" }}>Jacky Chan</span>
                          <span className="text-xs" style={{ color: "var(--text-muted)" }} >Since 2012</span>
                        </div>

                        {/* RIGHT COLUMN  */}
                        <div className="flex-1">
                          {/* Stars */}
                          <div className="flex !mb-2" style={{ color: 'var(--star-rating)' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}

                          </div>

                          <p className="text-sm !mb-3" style={{ color: "var(--text-muted)" }}>
                            Thank you very fast shipping from Poland only 3days.
                          </p>
                          <div className="flex gap-4 text-xs !mb-3">
                            <span style={{ color: "var(--text-muted)" }}>
                              December 4, 2020 at 3:12 pm
                            </span>
                            <button
                              className="hover:text-[var(--primary)] transition-colors inline-flex items-center gap-1"
                              style={{ color: "var(--primary)" }}
                            >
                              Reply <ArrowRight size={16} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Review 2  */}
                      <div className="!mb-6 pb-6 border-b flex gap-6" style={{ borderColor: "var(--border-color)" }}>
                        {/* LEFT COLUMN */}
                        <div className="flex flex-col items-center !w-[80px] sm:!w-[100px] md:!w-[120px] flex-shrink-0 text-center">
                          {/* Profile Image */}
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 !mb-2">
                            <Image
                              src="/product-view/profile2.jpg"
                              alt="Ana Rosie"
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-semibold text-sm !mb-1" style={{ color: "var(--text-main)" }}>Ana Rosie</span>
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Since 2019</span>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="flex-1">
                          {/* Stars */}
                          <div className="flex !mb-2" style={{ color: 'var(--star-rating)' }}>
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                            <Star className="w-3 h-3" style={{ color: '#d1d5db' }} />
                          </div>
                          <p className="text-sm !mb-3" style={{ color: "var(--text-muted)" }}>
                            Great low price and works well.
                          </p>
                          <div className="flex gap-4 text-xs">
                            <span style={{ color: "var(--text-muted)" }}>
                              December 4, 2020 at 3:12 pm
                            </span>
                            <button
                              className="hover:text-[var(--primary)] transition-colors inline-flex items-center gap-1"
                              style={{ color: "var(--primary)" }}
                            >
                              Reply <ArrowRight size={16} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Review 3  */}
                      <div className="!mb-6 pb-6 flex gap-6" style={{ borderColor: "var(--border-color)" }}>
                        {/* LEFT COLUMN */}
                        <div className="flex flex-col items-center !w-[80px] sm:!w-[100px] md:!w-[120px] flex-shrink-0 text-center">
                          {/* Profile Image */}
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 !mb-2">
                            <Image
                              src="/product-view/profile3.jpg"
                              alt="Steven Keny"
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-semibold text-sm !mb-1" style={{ color: "var(--text-main)" }}>Steven Keny</span>
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Since 2020</span>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="flex-1">
                          {/* Stars */}
                          <div className="flex !mb-2" style={{ color: 'var(--star-rating)' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>

                          <p className="text-sm !mb-1" style={{ color: "var(--text-muted)" }}>
                            Authentic and Beautiful, Love these way more than ever expected
                          </p>

                          <div className="flex gap-4 text-xs">
                            <span style={{ color: "var(--text-muted)" }}>
                              December 4, 2020 at 3:12 pm
                            </span>
                            <button
                              className="hover:text-[var(--primary)] transition-colors inline-flex items-center gap-1"
                              style={{ color: "var(--primary)" }}
                            >
                              Reply <ArrowRight size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold !mb-6 " style={{ color: 'var(--text-main)' }}>Customer reviews</h1>

                      {/* Overall Rating */}
                      <div className="!mb-6">
                        <div className="flex items-center gap-3 !mb-4">
                          {/* Stars */}
                          <div className="flex" style={{ color: 'var(--star-rating)' }}>
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                            <Star className="w-3 h-3" style={{ color: '#d1d5db' }} />
                          </div>
                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>4</span>
                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>out of 5</span>
                          </div>
                        </div>

                        {/* Rating Bars */}
                        <div className="!space-y-3">
                          {/* 5 star */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm w-12" style={{ color: 'var(--text-main)' }}>5 star</span>
                            <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative" style={{ backgroundColor: 'var(--border-color)' }}>
                              <div className="h-full rounded-full flex items-center justify-center px-2" style={{ width: '50%', backgroundColor: 'var(--primary)' }}>
                                <span className="text-xs text-white font-medium">50%</span>
                              </div>
                            </div>
                          </div>

                          {/* 4 star */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm w-12" style={{ color: 'var(--text-main)' }}>4 star</span>
                            <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative" style={{ backgroundColor: 'var(--border-color)' }}>
                              <div className="h-full rounded-full flex items-center justify-center px-2" style={{ width: '25%', backgroundColor: 'var(--primary)' }}>
                                <span className="text-xs text-white font-medium">25%</span>
                              </div>
                            </div>
                          </div>

                          {/* 3 star */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm w-12" style={{ color: 'var(--text-main)' }}>3 star</span>
                            <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative" style={{ backgroundColor: 'var(--border-color)' }}>
                              <div className="h-full rounded-full flex items-center justify-center px-2" style={{ width: '45%', backgroundColor: 'var(--primary)' }}>
                                <span className="text-xs text-white font-medium">45%</span>
                              </div>
                            </div>
                          </div>

                          {/* 2 star */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm w-12" style={{ color: 'var(--text-main)' }}>2 star</span>
                            <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative" style={{ backgroundColor: 'var(--border-color)' }}>
                              <div className="h-full rounded-full flex items-center justify-center px-2" style={{ width: '65%', backgroundColor: 'var(--primary)' }}>
                                <span className="text-xs text-white font-medium">65%</span>
                              </div>
                            </div>
                          </div>

                          {/* 1 star */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm w-12" style={{ color: 'var(--text-main)' }}>1 star</span>
                            <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative" style={{ backgroundColor: 'var(--border-color)' }}>
                              <div className="h-full rounded-full flex items-center justify-center px-2" style={{ width: '85%', backgroundColor: 'var(--primary)' }}>
                                <span className="text-xs text-white font-medium">85%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* How are ratings calculated link */}
                        <button className="text-sm !mt-4 hover:underline" style={{ color: 'var(--text-muted)' }}>
                          How are ratings calculated?
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Review Form */}
                  <div className="border-t !pt-8" style={{ borderColor: 'var(--border-color)' }}>
                    <h3 className="text-xl font-bold !mb-4" style={{ color: 'var(--text-main)' }}>Add a review</h3>
                    <div className="!mb-6">

                      <div className="flex gap-1 text-1xl" style={{ color: '#ecece3' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 fill-current cursor-pointer hover:scale-110 transition-transform" />
                        ))}
                      </div>
                    </div>

                    <div className="!space-y-4">
                      {/* Comment Textarea */}
                      <div>

                        <textarea
                          rows={4}
                          className="w-full !p-3 border rounded-lg text-sm"
                          style={{
                            borderColor: 'var(--border-color)',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-main)'
                          }}
                          placeholder="Write comment"
                        ></textarea>
                      </div>

                      {/* Name and Email Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>

                          <input
                            type="text"
                            className="w-full !p-3 border rounded-lg text-sm"
                            style={{
                              borderColor: 'var(--border-color)',
                              backgroundColor: 'var(--bg-primary)',
                              color: 'var(--text-main)'
                            }}
                            placeholder="Name"
                          />
                        </div>
                        <div>

                          <input
                            type="email"
                            className="w-full !p-3 border rounded-lg text-sm"
                            style={{
                              borderColor: 'var(--border-color)',
                              backgroundColor: 'var(--bg-primary)',
                              color: 'var(--text-main)'
                            }}
                            placeholder="Email"
                          />
                        </div>
                      </div>

                      {/* Website */}
                      <div>

                        <input
                          type="url"
                          className="w-full !p-3 border rounded-lg text-sm"
                          style={{
                            borderColor: 'var(--border-color)',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-main)'
                          }}
                          placeholder="Website"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="!pt-4">
                        <button
                          className="!px-8 !py-3 rounded text-white font-medium transition-colors"
                          style={{ backgroundColor: 'var(--primary)' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                        >
                          Submit Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}           </div>



            {/* Related Products Section */}
            <div className="!mt-12 !mb-18">
              <h2 className="text-2xl font-bold !mb-6" style={{ color: 'var(--text-main)' }}>Related products</h2>
              <div className="w-full h-[1px]  relative !mb-6" style={{ backgroundColor: 'var(--border-color)' }}>

                {/* Small green line */}
                <div className="absolute left-0 top-0 h-[2px] w-16 sm:w-20 bg-[var(--primary)]"></div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 !px-4 sm:!px-0">


                {/* Product 1 */}
                <div
                  className=" rounded-lg group cursor-pointer hover:shadow-lg transition-all duration-300 text-center"

                  onMouseEnter={() => setHoveredProduct(1)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative w-full h-40 sm:h-48 !mb-4 overflow-hidden rounded-lg group">
                    <span className="absolute top-3 left-3 z-10 bg-[#ff75a0] text-white text-xs font-semibold !px-3 !py-[2px] rounded-full">
                      Hot
                    </span>
                    {/* Product Image */}
                    <Image
                      src={hoveredProduct === 1
                        ? "/product-view/product-img1-hover.jpg"
                        : "/product-view/product-img1.jpg"}
                      alt="Ultra Bass Headphone"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Hover Icons */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 
  opacity-0 group-hover:opacity-100 transition duration-300
  md:opacity-0 md:group-hover:opacity-100 opacity-100 md:opacity-0">

                      {/* Search */}
                      <div className="relative group/icon cursor-pointer">

                        {/* Tooltip */}
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
    bg-[var(--primary)] text-white text-xs !px-2 !py-1 rounded opacity-0 
    group-hover/icon:opacity-100 group-hover/icon:-translate-y-1 
    transition-all duration-200">

                          Quick View

                        </span>

                        {/* Icon */}
                        <div className="bg-white !p-2 rounded-full shadow text-[var(--primary)]
    hover:bg-[var(--primary)] hover:text-white 
    group-hover/icon:-translate-y-1 transition-all duration-200">

                          <Search size={18} />

                        </div>

                      </div>


                      {/* Wishlist */}
                      <div className="relative group/icon cursor-pointer">

                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
   bg-[var(--primary)] text-white text-xs !px-2 !py-1 rounded opacity-0 
    group-hover/icon:opacity-100 group-hover/icon:-translate-y-1 
    transition-all duration-200">

                          Add to Wishlist

                        </span>

                        <div className="bg-white !p-2 rounded-full shadow text-[var(--primary)]
    hover:bg-[var(--primary)] hover:text-white 
    group-hover/icon:-translate-y-1 transition-all duration-200">

                          <Heart size={18} />

                        </div>

                      </div>


                      {/* Compare */}
                      <div className="relative group/icon cursor-pointer">

                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
  bg-[var(--primary)] text-white text-xs !px-2 !py-1 rounded opacity-0 
    group-hover/icon:opacity-100 group-hover/icon:-translate-y-1 
    transition-all duration-200">

                          Compare

                        </span>

                        <div className="bg-white !p-2 rounded-full shadow text-[var(--primary)]
    hover:bg-[var(--primary)] hover:text-white 
    group-hover/icon:-translate-y-1 transition-all duration-200">

                          <Repeat size={18} />

                        </div>

                      </div>

                    </div>

                  </div>

                  <h3 className="font-medium text-sm sm:text-base !mb-2 px-2 " style={{ color: 'var(--text-main)' }}>Colorful HomeSpeak 12UEA Goole</h3>

                  <div className="flex items-center justify-center gap-2 !mb-2">
                    <div className="flex" style={{ color: 'var(--star-rating)' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pb-4">
                    <p className="font-bold text-lg" style={{ color: 'var(--primary)' }}>$238.85</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>$245.8</span>
                    </div>
                  </div>
                </div>

                {/* Product 2 */}
                <div
                  className="rounded-lg group cursor-pointer hover:shadow-lg transition-all duration-300 text-center"

                  onMouseEnter={() => setHoveredProduct(2)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative w-full h-40 sm:h-48 !mb-4 overflow-hidden rounded-lg group">
                    <span className="absolute top-3 left-3 z-10 bg-[#a1cae2] text-white text-xs font-semibold !px-3 !py-[2px] rounded-full">
                      -12%
                    </span>
                    {/* Product Image */}
                    <Image
                      src={hoveredProduct === 2
                        ? "/product-view/products-img2-hover.jpg"
                        : "/product-view/products-img2.jpg"}
                      alt="Ultra Bass Headphone"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Hover Icons */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 
  opacity-0 group-hover:opacity-100 transition duration-300
  md:opacity-0 md:group-hover:opacity-100 opacity-100 md:opacity-0">

                      {/* Search */}
                      <div className="relative group/icon cursor-pointer">

                        {/* Tooltip */}
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
    bg-[var(--primary)] text-white text-xs !px-2 !py-1 rounded opacity-0 
    group-hover/icon:opacity-100 group-hover/icon:-translate-y-1 
    transition-all duration-200">

                          Quick View

                        </span>

                        {/* Icon */}
                        <div className="bg-white !p-2 rounded-full shadow text-[var(--primary)]
    hover:bg-[var(--primary)] hover:text-white 
    group-hover/icon:-translate-y-1 transition-all duration-200">

                          <Search size={18} />

                        </div>

                      </div>


                      {/* Wishlist */}
                      <div className="relative group/icon cursor-pointer">

                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
   bg-[var(--primary)] text-white text-xs !px-2 !py-1 rounded opacity-0 
    group-hover/icon:opacity-100 group-hover/icon:-translate-y-1 
    transition-all duration-200">

                          Add to Wishlist

                        </span>

                        <div className="bg-white !p-2 rounded-full shadow text-[var(--primary)]
    hover:bg-[var(--primary)] hover:text-white 
    group-hover/icon:-translate-y-1 transition-all duration-200">

                          <Heart size={18} />

                        </div>

                      </div>


                      {/* Compare */}
                      <div className="relative group/icon cursor-pointer">

                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
  bg-[var(--primary)] text-white text-xs !px-2 !py-1 rounded opacity-0 
    group-hover/icon:opacity-100 group-hover/icon:-translate-y-1 
    transition-all duration-200">

                          Compare

                        </span>

                        <div className="bg-white !p-2 rounded-full shadow text-[var(--primary)]
    hover:bg-[var(--primary)] hover:text-white 
    group-hover/icon:-translate-y-1 transition-all duration-200">

                          <Repeat size={18} />

                        </div>

                      </div>

                    </div>

                  </div>

                  <h3 className="font-medium text-sm sm:text-base !mb-2 px-2" style={{ color: 'var(--text-main)' }}>
                    Smart Bluetooth Speaker
                  </h3>

                  <div className="flex items-center justify-center gap-2 !mb-2">
                    <div className="flex" style={{ color: 'var(--star-rating)' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pb-4">
                    <p className="font-bold text-lg" style={{ color: 'var(--primary)' }}>$138.85</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>$145.8</span>
                    </div>
                  </div>
                </div>

                {/* Product 3 */}
                <div
                  className="rounded-lg group cursor-pointer hover:shadow-lg transition-all duration-300 text-center"

                  onMouseEnter={() => setHoveredProduct(3)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative w-full h-40 sm:h-48 !mb-4 overflow-hidden rounded-lg group">
                    <span className="absolute top-3 left-3 z-10 bg-[#99bbad] text-white text-xs font-semibold !px-3 !py-[2px] rounded-full">
                      New
                    </span>
                    {/* Product Image */}
                    <Image
                      src={hoveredProduct === 3
                        ? "/product-view/product-img3-hover.jpg"
                        : "/product-view/product-img3.jpg"}
                      alt="Ultra Bass Headphone"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Hover Icons */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 
  opacity-0 group-hover:opacity-100 transition duration-300
  md:opacity-0 md:group-hover:opacity-100 opacity-100 md:opacity-0">

                      {/* Search */}
                      <div className="relative group/icon cursor-pointer">

                        {/* Tooltip */}
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
    bg-[var(--primary)] text-white text-xs !px-2 !py-1 rounded opacity-0 
    group-hover/icon:opacity-100 group-hover/icon:-translate-y-1 
    transition-all duration-200">

                          Quick View

                        </span>

                        {/* Icon */}
                        <div className="bg-white !p-2 rounded-full shadow text-[var(--primary)]
    hover:bg-[var(--primary)] hover:text-white 
    group-hover/icon:-translate-y-1 transition-all duration-200">

                          <Search size={18} />

                        </div>

                      </div>


                      {/* Wishlist */}
                      <div className="relative group/icon cursor-pointer">

                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
   bg-[var(--primary)] text-white text-xs !px-2 !py-1 rounded opacity-0 
    group-hover/icon:opacity-100 group-hover/icon:-translate-y-1 
    transition-all duration-200">

                          Add to Wishlist

                        </span>

                        <div className="bg-white !p-2 rounded-full shadow text-[var(--primary)]
    hover:bg-[var(--primary)] hover:text-white 
    group-hover/icon:-translate-y-1 transition-all duration-200">

                          <Heart size={18} />

                        </div>

                      </div>


                      {/* Compare */}
                      <div className="relative group/icon cursor-pointer">

                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
  bg-[var(--primary)] text-white text-xs !px-2 !py-1 rounded opacity-0 
    group-hover/icon:opacity-100 group-hover/icon:-translate-y-1 
    transition-all duration-200">

                          Compare

                        </span>

                        <div className="bg-white !p-2 rounded-full shadow text-[var(--primary)]
    hover:bg-[var(--primary)] hover:text-white 
    group-hover/icon:-translate-y-1 transition-all duration-200">

                          <Repeat size={18} />

                        </div>

                      </div>

                    </div>

                  </div>

                  <h3 className="font-medium text-sm sm:text-base !mb-2 px-2" style={{ color: 'var(--text-main)' }}>
                    HomeSpeak 12UEA Goole
                  </h3>

                  <div className="flex items-center justify-center gap-2 !mb-2">
                    <div className="flex" style={{ color: 'var(--star-rating)' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pb-4">
                    <p className="font-bold text-lg" style={{ color: 'var(--primary)' }}>$738.85</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>$945.8</span>
                    </div>
                  </div>
                </div>

                {/* Product 4 */}
                <div
                  className=" rounded-lg group cursor-pointer hover:shadow-lg transition-all duration-300 text-center"

                  onMouseEnter={() => setHoveredProduct(4)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative w-full h-40 sm:h-48 !mb-4 overflow-hidden rounded-lg group">
                    <span className="absolute top-3 left-3 z-10 bg-[#ff75a0] text-white text-xs font-semibold !px-3 !py-[2px] rounded-full">
                      Hot
                    </span>
                    {/* Product Image */}
                    <Image
                      src={hoveredProduct === 4
                        ? "/product-view/product-img4-hover.jpg"
                        : "/product-view/product-img4.jpg"}
                      alt="Ultra Bass Headphone"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Hover Icons */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 
  opacity-0 group-hover:opacity-100 transition duration-300
  md:opacity-0 md:group-hover:opacity-100 opacity-100 md:opacity-0">

                      {/* Search */}
                      <div className="relative group/icon cursor-pointer">

                        {/* Tooltip */}
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
    bg-[var(--primary)] text-white text-xs !px-2 !py-1 rounded opacity-0 
    group-hover/icon:opacity-100 group-hover/icon:-translate-y-1 
    transition-all duration-200">

                          Quick View

                        </span>

                        {/* Icon */}
                        <div className="bg-white !p-2 rounded-full shadow text-[var(--primary)]
    hover:bg-[var(--primary)] hover:text-white 
    group-hover/icon:-translate-y-1 transition-all duration-200">

                          <Search size={18} />

                        </div>

                      </div>


                      {/* Wishlist */}
                      <div className="relative group/icon cursor-pointer">

                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
   bg-[var(--primary)] text-white text-xs !px-2 !py-1 rounded opacity-0 
    group-hover/icon:opacity-100 group-hover/icon:-translate-y-1 
    transition-all duration-200">

                          Add to Wishlist

                        </span>

                        <div className="bg-white !p-2 rounded-full shadow text-[var(--primary)]
    hover:bg-[var(--primary)] hover:text-white 
    group-hover/icon:-translate-y-1 transition-all duration-200">

                          <Heart size={18} />

                        </div>

                      </div>


                      {/* Compare */}
                      <div className="relative group/icon cursor-pointer">

                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
  bg-[var(--primary)] text-white text-xs !px-2 !py-1 rounded opacity-0 
    group-hover/icon:opacity-100 group-hover/icon:-translate-y-1 
    transition-all duration-200">

                          Compare

                        </span>

                        <div className="bg-white !p-2 rounded-full shadow text-[var(--primary)]
    hover:bg-[var(--primary)] hover:text-white 
    group-hover/icon:-translate-y-1 transition-all duration-200">

                          <Repeat size={18} />

                        </div>

                      </div>

                    </div>

                  </div>

                  <h3 className="font-medium text-sm sm:text-base !mb-2 px-2 " style={{ color: 'var(--text-main)' }}>
                    Dadua Camera 4K 2026EF
                  </h3>

                  <div className="flex items-center justify-center gap-2 !mb-2">
                    <div className="flex" style={{ color: 'var(--star-rating)' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pb-4">
                    <p className="font-bold text-lg" style={{ color: 'var(--primary)' }}>$238.85</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>$245.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Repair Services Banner */}
            <div
              className="!mb-8  w-full h-[150px] sm:h-[120px] md:h-[200px] border rounded-lg relative overflow-hidden group"
              style={{
                borderColor: "var(--border-color)",
              }}
            >

              {/* Image */}
              <img
                src="/product-view/banner1.png"
                alt="Repair Services"
                className="absolute inset-0 w-full h-full object-cotain rounded-lg"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-white/20 transition-all duration-300 rounded-lg"></div>

              {/* Content */}
              <div className="relative z-10 !px-6 md:!px-12 flex flex-col justify-center h-full">

                <h3
                  className="text-lg sm:text-xl md:text-2xl mb-2 transition-transform duration-300 group-hover:translate-x-4"
                  style={{ color: "var(--text-main)" }}
                >
                  Repair Services
                </h3>

                <p
                  className="font-bold text-xl sm:text-2xl md:text-3xl leading-tight"
                  style={{ color: "var(--text-main)" }}
                >
                  We're an Apple
                </p>

                <p
                  className="font-bold text-xl sm:text-2xl md:text-3xl leading-tight"
                  style={{ color: "var(--text-main)" }}
                >
                  Authorised Service Provider
                </p>

              </div>

            </div>

          </div>

          {/* Right Sidebar */}
          <div className="col-span-1 lg:col-span-3 order-2 lg:order-2 mb-6 lg:mb-0 sticky top-0 h-fit">
            <div className="grid   lg:grid-cols-1 gap-6 lg:gap-15">
              <div className="mb-0 lg:mb-8 border rounded-lg !p-5 " style={{ borderColor: 'var(--border-color)' }} >
                <div className="relative">
                  <h2 className="font-bold text-base sm:text-lg !mb-4 sm:mb-5 !pb-3" style={{
                    color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)'
                  }}>  Category</h2>

                  <div className="absolute bottom-0 left-0 w-1/2 h-[2px]" style={{ backgroundColor: 'var(--primary)' }}></div>
                </div>

                <ul className="!space-y-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <li className="hover:text-[var(--primary)]  cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1 ">Shoes & Bags</li>
                  <li className="hover:text-[var(--primary)]  cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1">Blouses & Shirts</li>
                  <li className="hover:text-[var(--primary)]  cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1">Dresses</li>
                  <li className="hover:text-[var(--primary)] cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1">Swimwear</li>
                  <li className="hover:text-[var(--primary)] cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1">Beauty</li>
                  <li className="hover:text-[var(--primary)] cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1">Jewelry & Watch</li>
                  <li className="hover:text-[var(--primary)] cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1">Accessories</li>
                </ul>
              </div>

              <div className="mb-0 lg:mb-8 border rounded-lg !p-5" style={{ borderColor: 'var(--border-color)' }}>
                <div className="!mb-6">
                  <div className="relative">
                    <h2
                      className="font-bold text-base sm:text-lg !mb-4 sm:!mb-5 !pb-3"
                      style={{
                        color: 'var(--text-main)',
                        borderBottom: '1px solid var(--border-color)'
                      }}
                    >
                      FILL BY PRICE
                    </h2>
                    <input
                      type="range"
                      className="w-full !mb-8"
                      style={{ accentColor: 'var(--primary)' }}

                    />
                  </div>
                  <div>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>Range:</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>$16 - $300</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="font-bold text-base sm:text-lg !mb-4 sm:mb-5 !mt-5" style={{ color: 'var(--text-main)' }}>Color</h2>
                  <ul className="!space-y-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <li className="flex items-center gap-2 cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                      <span>Red (56)</span>
                    </li>
                    <li className="flex items-center gap-2 cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                      <span>Green (78)</span>
                    </li>
                    <li className="flex items-center gap-2 cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                      <span>Blue (54)</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h2 className="font-bold text-base sm:text-lg !mb-4 sm:mb-5 !mt-5" style={{ color: 'var(--text-main)' }}>Item Condition</h2>
                  <ul className="!space-y-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <li className="flex items-center gap-2 cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                      <span>New (1506)</span>
                    </li>
                    <li className="flex items-center gap-2 cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                      <span>Refurbished (27)</span>
                    </li>
                    <li className="flex items-center gap-2 cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                      <span>Used (17)</span>
                    </li>
                    <button
                      className="!px-10 !py-2 !mt-6 rounded text-white flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'var(--primary)' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                    >
                      <Filter size={18} />
                      Filter
                    </button>
                  </ul>
                </div>
              </div>

              <div className="mb-0 lg:mb-8 border rounded-lg !p-6" style={{ borderColor: 'var(--border-color)' }}>

                <div className="mb-6">
                  <div className="relative">
                    <h2 className="font-bold text-base sm:text-lg !mb-4 sm:mb-5 !pb-3"
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
                          src="/product-view/product11.jpg"
                          alt="Product"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium mb-1 line-clamp-2 " style={{ color: 'var(--primary)' }}>
                          Chen Cardigan
                        </h4>

                        <p className="text-sm font-semibold" >
                          $99.50
                        </p>
                        <div className="flex items-center gap-1 mb-1">
                          <div className="flex" style={{ color: 'var(--star-rating)' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* Product 2 */}
                    <div className="flex gap-3 items-center group cursor-pointer !pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src="/product-view/product12.jpg"
                          alt="Product"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium mb-1 line-clamp-2 " style={{ color: 'var(--primary)' }}>
                          Chen Sweater
                        </h4>

                        <p className="text-sm font-semibold" >
                          $89.50
                        </p>
                        {/* Star Rating */}
                        <div className="flex items-center gap-1 mb-1">
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" style={{ color: 'var(--star-rating)' }} />
                            ))}
                            {/* 5th star - plain/gray */}
                            <Star className="w-3 h-3" style={{ color: '#d1d5db' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product 3 */}
                    <div className="flex gap-3 items-center group cursor-pointer">
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src="/product-view/product13.jpg"
                          alt="Product"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium mb-1 line-clamp-2 " style={{ color: 'var(--primary)' }}>
                          Colorful Jacket
                        </h4>

                        <p className="text-sm font-semibold">
                          $25
                        </p>
                        {/* Star Rating */}
                        <div className="flex items-center gap-1 mb-1">
                          <div className="flex">
                            {[...Array(3)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" style={{ color: 'var(--star-rating)' }} />
                            ))}
                            {/* 5th star - plain/gray */}
                            <Star className="w-3 h-3" style={{ color: '#d1d5db' }} />
                            <Star className="w-3 h-3" style={{ color: '#d1d5db' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Women Zone Banner */}
              <div
                className="relative rounded-lg overflow-hidden bg-cover bg-center p-6 mb-6  group"
                style={{

                  backgroundImage: 'url("/product-view/banner2.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: '380px',
                }}
              >

                <div className="absolute inset-0 bg-black/0 group-hover:bg-white/20 transition-all duration-300"></div>
                {/* Content */}
                <div className="relative z-10 !p-5 flex flex-col justify-center h-full min-h-[380px]">
                  <h3 className="text-sm mb-3" style={{ color: 'var(--text-main)' }}>Women Zone</h3>
                  <p className="text-xl font-bold mb-3 transform transition-transform duration-300 group-hover:translate-x-4">
                    Save 17% on
                  </p>
                  <p className="text-xl font-bold mb-3 transform transition-transform duration-300 group-hover:translate-x-4">
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
        </div>

      </div>
    </main>
  );
}