"use client";
import { ChevronRight, Facebook, Twitter, Instagram, MessageCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";


export default function AboutPage() {
    const swiperRef = useRef<SwiperType | null>(null);


    return (
        <>
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm !mb-6 !px-8 sm:!px-18 !py-4  rounded bg-[var(--bg-light)] text-[var(--text-muted)] ">
                <a href="/" className="!text-[var(--primary)] ">Home</a>
                <span className="!mx-2">
                    <ChevronRight size={16} />
                </span>
                <a href="/" >Pages</a>
                <span className="!mx-2">
                    <ChevronRight size={16} />
                </span>
                <a href="/" > About us</a>
            </nav>
            <main className="main">
                <div className="max-w-[1400px] mx-auto !px-3 sm:!px-6 md:!px-10 lg:!px-[60px] !py-5 ">
                    {/* Main*/}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-18">
                        {/* full content  */}
                        <div className="col-span-1 lg:col-span-12 ">


                            {/* content + img*/}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 !mb-18">
                                {/* content */}
                                <div className="order-1 lg:order-1">
                                    <h2 className="text-lg font-semibold tracking-wider text-[var(--primary)] !mb-3">
                                        OUR COMPANY
                                    </h2>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-dark)] !mb-12">
                                        We are Building The Destination For Getting Things Done
                                    </h1>
                                    <p className="text-base sm:text-lg text-[var(--text-muted)] !mb-4">
                                        Tempus ultricies augue luctus et ut suscipit. Morbi arcu, ultrices purus dolor erat bibendum sapien metus.
                                    </p>
                                    <p className="text-base sm:text-lg text-[var(--text-muted)]">
                                        Tempus ultricies augue luctus et ut suscipit. Morbi arcu, ultrices purus dolor erat bibendum sapien metus. Sit mi, pharetra, morbi arcu id. Pellentesque dapibus nibh augue senectus.
                                    </p>
                                </div>
                                {/* img */}
                                <div className="order-1 lg:order-2">
                                    <img
                                        src="/about/about-1.png"
                                        alt="About Us"
                                        className="w-full h-auto "
                                    />
                                </div>
                            </div>

                            {/* experts*/}
                            <div>
                                <div className="!mb-8">
                                    <h2 className="text-lg font-semibold tracking-wider text-[var(--primary)] !mb-3">
                                        Our Team
                                    </h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 !mb-15">
                                        <div>
                                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-dark)] !mb-12">
                                                Top team of experts
                                            </h1>
                                            <p className="text-base sm:text-lg text-[var(--text-muted)] !mb-4">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione optio perferendis sequi mollitia quis autem ea cupiditate possimus!
                                            </p>


                                        </div>
                                        <div className="flex justify-start lg:justify-end items-start">
                                            <div className="border border-[var(--primary)] rounded-lg !px-4 !py-2.5 text-lg text-[var(--primary)] font-bold bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
                                                All Members
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        {/* Team Members Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                                            {/* Member 1 - Patric Adams */}
                                            <div className="bg-white rounded-lg overflow-hidden transition-shadow">
                                                <div className="overflow-hidden">
                                                    <img
                                                        src="/about/expert-1.jpg"
                                                        alt="Patric Adams"
                                                        className="w-full h-auto object-cover transition-transform duration-300 hover:-translate-y-2"
                                                    />
                                                </div>
                                                <div className="!p-4 text-center">
                                                    <h3 className="font-bold text-lg text-[var(--text-main)] !mb-3">Patric Adams</h3>
                                                    <p className="text-lg text-[var(--primary)] !mb-3">CEO & Co-Founder</p>

                                                    {/* Social Icons */}
                                                    <div className="flex items-center justify-center gap-3 ">
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="Facebook">
                                                            <Facebook size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="Twitter">
                                                            <Twitter size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="LinkedIn">
                                                            <Instagram size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="Email">
                                                            <MessageCircle size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Member 2 - Dilan Specter */}
                                            <div className="bg-white rounded-lg overflow-hidden transition-shadow">
                                                <div className="overflow-hidden">
                                                    <img
                                                        src="/about/expert-2.jpg"
                                                        alt="Dilan Specter"
                                                        className="w-full h-auto object-cover transition-transform duration-300 hover:-translate-y-2"
                                                    />
                                                </div>
                                                <div className="!p-4 text-center">
                                                    <h3 className="font-bold text-lg text-[var(--text-main)] !mb-3">Dilan Specter</h3>
                                                    <p className="text-lg text-[var(--primary)] !mb-3">Head Engineer</p>

                                                    {/* Social Icons */}
                                                    <div className="flex items-center justify-center gap-3">
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="Facebook">
                                                            <Facebook size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="Twitter">
                                                            <Twitter size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="LinkedIn">
                                                            <Instagram size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="Email">
                                                            <MessageCircle size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Member 3 - Tomas Baker */}
                                            <div className="bg-white rounded-lg overflow-hidden transition-shadow">
                                                <div className="overflow-hidden">
                                                    <img
                                                        src="/about/expert-3.jpg"
                                                        alt="Tomas Baker"
                                                        className="w-full h-auto object-cover transition-transform duration-300 hover:-translate-y-2"
                                                    />
                                                </div>
                                                <div className="!p-4 text-center">
                                                    <h3 className="font-bold text-lg text-[var(--text-main)] !mb-3">Tomas Baker</h3>
                                                    <p className="text-lg text-[var(--primary)] !mb-3">Senior Planner</p>

                                                    {/* Social Icons */}
                                                    <div className="flex items-center justify-center gap-3">
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="Facebook">
                                                            <Facebook size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="Twitter">
                                                            <Twitter size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="LinkedIn">
                                                            <Instagram size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="Email">
                                                            <MessageCircle size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Member 4 - Norton Mendos */}
                                            <div className="bg-white rounded-lg overflow-hidden transition-shadow">
                                                <div className="overflow-hidden">
                                                    <img
                                                        src="/about/expert-4.jpg"
                                                        alt="Norton Mendos"
                                                        className="w-full h-auto object-cover transition-transform duration-300 hover:-translate-y-2"
                                                    />
                                                </div>
                                                <div className="!p-4 text-center">
                                                    <h3 className="font-bold text-lg text-[var(--text-main)] !mb-3">Norton Mendos</h3>
                                                    <p className="text-lg text-[var(--primary)] !mb-3">Project Manager</p>

                                                    {/* Social Icons */}
                                                    <div className="flex items-center justify-center gap-3">
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="Facebook">
                                                            <Facebook size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="Twitter">
                                                            <Twitter size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="LinkedIn">
                                                            <Instagram size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                        <a href="#" className="hover:scale-110 transition-transform" aria-label="Email">
                                                            <MessageCircle size={18} className="text-[var(--text-muted)] " />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* branches*/}
                            <div className="!mt-20">
                                {/* Header */}
                                <div className="text-center !mb-12 lg:!px-80">
                                    <h2 className="text-lg font-semibold tracking-wider text-[var(--primary)] !mb-3"> Evara Coporation</h2>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-dark)] !mb-8">
                                        Our main branches around the world
                                    </h1>
                                    <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-3xl mx-auto">
                                        At vero eos et accusamus et iusto odio dignissimos ducimus quiblanditiis praesentium. ebitis nesciunt voluptatum dicta reprehenderit accusamus
                                    </p>
                                </div>

                                {/* Branches Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {/* one */}
                                    <div className="bg-white rounded-lg overflow-hidden ">
                                        <img
                                            src="/about/company-1.jpg"
                                            alt="New York branch"
                                            className="w-full h-auto object-cover transition-transform duration-300 hover:-translate-y-2"
                                        />
                                        <div className="!p-6 text-center">
                                            <h3 className="font-bold text-xl text-[var(--text-dark)]! mb-3">New York, USA</h3>
                                            <p className="text-[var(--text-muted)] leading-relaxed">
                                                27 Division St, New York<br />
                                                NY 10002, USA
                                            </p>
                                        </div>
                                    </div>

                                    {/* two */}
                                    <div className="bg-white rounded-lg overflow-hidden ">
                                        <img
                                            src="/about/company-2.jpg"
                                            alt="Paris branch"
                                            className="w-full h-auto object-cover transition-transform duration-300 hover:-translate-y-2"
                                        />
                                        <div className="!p-6 text-center">
                                            <h3 className="font-bold text-xl text-[var(--text-dark)] !mb-3">Paris, France</h3>
                                            <p className="text-[var(--text-muted)] leading-relaxed">
                                                22 Rue des Carmes<br />
                                                75005 Paris
                                            </p>
                                        </div>
                                    </div>

                                    {/* three */}
                                    <div className="bg-white rounded-lg overflow-hidden ">
                                        <img
                                            src="/about/company-3.jpg"
                                            alt="Jakarta branch"
                                            className="w-full h-auto object-cover transition-transform duration-300 hover:-translate-y-2 "
                                        />
                                        <div className="!p-6 text-center">
                                            <h3 className="font-bold text-xl text-[var(--text-dark)] !mb-3">Jakarta, Indonesia</h3>
                                            <p className="text-[var(--text-muted)] leading-relaxed">
                                                2476 Raya Yogyakarta,<br />
                                                89090 Indonesia
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* facts */}
                            <div className="!mt-20">

                                <div className="text-center !mb-12 lg:!px-80">
                                    <h2 className="text-lg font-semibold tracking-wider text-[var(--primary)] !mb-3"> Some Facts</h2>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-dark)] !mb-8">
                                        Take a look what
                                        our clients say about us
                                    </h1>
                                    <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-3xl mx-auto">
                                        At vero eos et accusamus et iusto odio dignissimos ducimus quiblanditiis praesentium. ebitis nesciunt voluptatum dicta reprehenderit accusamus
                                    </p>
                                </div>

                                {/* fact Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {/* one */}

                                    <div className="bg-white rounded-lg overflow-hidden flex gap-8 !p-10 transition-transform duration-300 hover:-translate-y-2 border border-gray-200 hover:border-[var(--primary)]">
                                        {/* Image - Left side */}
                                        <div className="flex-shrink-0 mt-1">
                                            <img
                                                src="/about/expert-1.jpg"
                                                alt="J. Bezos"
                                                className="w-15 h-20 object-cover"
                                            />
                                        </div>

                                        {/* Content - Right side */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-[var(--text-main)] !mb-2">J. Bezos</h3>
                                            <p className="text-lg text-[var(--text-muted)] !mb-3">Adobe Jsc</p>
                                            <p className="text-sm md:text-base text-[var(--text-main)]">
                                                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta reprehenderit accusamus voluptatibus voluptas."
                                            </p>
                                        </div>
                                    </div>


                                    {/* two */}
                                    <div className="bg-white rounded-lg overflow-hidden flex gap-8 !p-10 transition-transform duration-300 hover:-translate-y-2 border border-gray-200 hover:border-[var(--primary)]">
                                        {/* Image - Left side */}
                                        <div className="flex-shrink-0 mt-1">
                                            <img
                                                src="/about/expert-2.jpg"
                                                alt="J. Bezos"
                                                className="w-15 h-20 object-cover"
                                            />
                                        </div>

                                        {/* Content - Right side */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-[var(--text-main)] !mb-2">B.Gates</h3>
                                            <p className="text-lg text-[var(--text-muted)] !mb-3">Adobe Jsc</p>
                                            <p className="text-sm md:text-base text-[var(--text-main)]">
                                                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta reprehenderit accusamus voluptatibus voluptas."
                                            </p>
                                        </div>
                                    </div>

                                    {/* three */}
                                    <div className="bg-white rounded-lg overflow-hidden flex gap-8 !p-10 transition-transform duration-300 hover:-translate-y-2 border border-gray-200 hover:border-[var(--primary)]">
                                        {/* Image - Left side */}
                                        <div className="flex-shrink-0 mt-1">
                                            <img
                                                src="/about/expert-3.jpg"
                                                alt="J. Bezos"
                                                className="w-15 h-20 object-cover"
                                            />
                                        </div>

                                        {/* Content - Right side */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-[var(--text-main)] !mb-2">B. Meyers</h3>
                                            <p className="text-lg text-[var(--text-muted)] !mb-3">Adobe Jsc</p>
                                            <p className="text-sm md:text-base text-[var(--text-main)]">
                                                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta reprehenderit accusamus voluptatibus voluptas."
                                            </p>
                                        </div>
                                    </div>

                                    {/* four */}
                                    <div className="bg-white rounded-lg overflow-hidden flex gap-8 !p-10 transition-transform duration-300 hover:-translate-y-2 border border-gray-200 hover:border-[var(--primary)]">
                                        {/* Image - Left side */}
                                        <div className="flex-shrink-0 mt-1">
                                            <img
                                                src="/about/expert-4.jpg"
                                                alt="J. Bezos"
                                                className="w-15 h-20 object-cover"
                                            />
                                        </div>

                                        {/* Content - Right side */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-[var(--text-main)] !mb-2">J. Bezos</h3>
                                            <p className="text-lg text-[var(--text-muted)] !mb-3">Adobe Jsc</p>
                                            <p className="text-sm md:text-base text-[var(--text-main)]">
                                                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta reprehenderit accusamus voluptatibus voluptas."
                                            </p>
                                        </div>
                                    </div>

                                    {/* five */}
                                    <div className="bg-white rounded-lg overflow-hidden flex gap-8 !p-10 transition-transform duration-300 hover:-translate-y-2 border border-gray-200 hover:border-[var(--primary)]">
                                        {/* Image - Left side */}
                                        <div className="flex-shrink-0 mt-1">
                                            <img
                                                src="/about/expert-3.jpg"
                                                alt="J. Bezos"
                                                className="w-15 h-20 object-cover"
                                            />
                                        </div>

                                        {/* Content - Right side */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-[var(--text-main)] !mb-2">B.Gates</h3>
                                            <p className="text-lg text-[var(--text-muted)] !mb-3">Adobe Jsc</p>
                                            <p className="text-sm md:text-base text-[var(--text-main)]">
                                                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta reprehenderit accusamus voluptatibus voluptas."
                                            </p>
                                        </div>
                                    </div>

                                    {/* six */}
                                    <div className="bg-white rounded-lg overflow-hidden flex gap-8 !p-10 transition-transform duration-300 hover:-translate-y-2 border border-gray-200 hover:border-[var(--primary)]">
                                        {/* Image - Left side */}
                                        <div className="flex-shrink-0 mt-1">
                                            <img
                                                src="/about/expert-1.jpg"
                                                alt="J. Bezos"
                                                className="w-15 h-20 object-cover"
                                            />
                                        </div>

                                        {/* Content - Right side */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-[var(--text-main)] !mb-2">B. Meyers</h3>
                                            <p className="text-lg text-[var(--text-muted)] !mb-3">Adobe Jsc</p>
                                            <p className="text-sm md:text-base text-[var(--text-main)]">
                                                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta reprehenderit accusamus voluptatibus voluptas."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* logo */}
                            <div className="!mt-15">
                                <div className="flex justify-center items-center">
                                    <div className="border border-[var(--primary)] rounded-lg !px-4 !py-2.5 text-lg text-white font-bold bg-[var(--primary)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">
                                        View more
                                    </div>

                                </div>
                                <div className="text-center !mt-8 !mb-12">
                                    <h2 className="text-2xl sm:text-3xl md:text-3xl font-semibold tracking-wider !mb-3">
                                        <span className="text-[var(--primary)]">Featured</span>{' '}
                                        <span className="text-[var(--text-main)]">Clients</span>
                                    </h2>
                                </div>

                                <div className="!mt-10 !mb-10">
                                    <Swiper
                                        modules={[Autoplay]}
                                        spaceBetween={30}
                                        slidesPerView={1}
                                        speed={1000}
                                        autoplay={{
                                            delay: 2000,
                                            disableOnInteraction: false,
                                            pauseOnMouseEnter: true,
                                        }}
                                        loop={true}
                                        breakpoints={{
                                            640: { slidesPerView: 3 },
                                            768: { slidesPerView: 4 },
                                            1024: { slidesPerView: 6 },
                                        }}
                                        className="logos-carousel"
                                        onSwiper={(swiper) => {
                                            swiperRef.current = swiper;
                                        }}
                                        onMouseEnter={() => {
                                            swiperRef.current?.autoplay?.stop();
                                        }}
                                        onMouseLeave={() => {
                                            swiperRef.current?.autoplay?.start();
                                        }}
                                    >


                                        <SwiperSlide>
                                            <div className="flex justify-center items-center">
                                                <img
                                                    src="/about/logo-5.png"
                                                    alt="The BACKYARD"
                                                    className="w-auto h-auto opacity-60 brightness-75 hover:opacity-100 hover:brightness-100 transition-all duration-500 hover:scale-105 cursor-pointer"
                                                />
                                            </div>
                                        </SwiperSlide>


                                        <SwiperSlide>
                                            <div className="flex justify-center items-center">
                                                <img
                                                    src="/about/logo-6.png"
                                                    alt="SHUTTER SPEED"
                                                    className="w-auto h-auto opacity-60 brightness-75 hover:opacity-100 hover:brightness-100 transition-all duration-500 hover:scale-105 cursor-pointer"
                                                />
                                            </div>
                                        </SwiperSlide>


                                        <SwiperSlide>
                                            <div className="flex justify-center items-center">
                                                <img
                                                    src="/about/logo-4.png"
                                                    alt="travel"
                                                    className="w-auto h-auto opacity-60 brightness-75 hover:opacity-100 hover:brightness-100 transition-all duration-500 hover:scale-105 cursor-pointer"
                                                />
                                            </div>
                                        </SwiperSlide>


                                        <SwiperSlide>
                                            <div className="flex justify-center items-center">
                                                <img
                                                    src="/about/logo-1.png"
                                                    alt="THE RETRO STUDIO"
                                                    className="w-auto h-auto opacity-60 brightness-75 hover:opacity-100 hover:brightness-100 transition-all duration-500 hover:scale-105 cursor-pointer"
                                                />
                                            </div>
                                        </SwiperSlide>


                                        <SwiperSlide>
                                            <div className="flex justify-center items-center">
                                                <img
                                                    src="/about/logo-2.png"
                                                    alt="A travel"
                                                    className="w-auto h-auto opacity-60 brightness-75 hover:opacity-100 hover:brightness-100 transition-all duration-500 hover:scale-105 cursor-pointer"
                                                />
                                            </div>
                                        </SwiperSlide>


                                        <SwiperSlide>
                                            <div className="flex justify-center items-center">
                                                <img
                                                    src="/about/logo-3.png"
                                                    alt="DESIGN HUB"
                                                    className="w-auto h-auto opacity-60 brightness-75 hover:opacity-100 hover:brightness-100 transition-all duration-500 hover:scale-105 cursor-pointer"
                                                />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="flex justify-center items-center">
                                                <img
                                                    src="/about/logo-4.png"
                                                    alt="DESIGN HUB"
                                                    className="w-auto h-auto opacity-60 brightness-75 hover:opacity-100 hover:brightness-100 transition-all duration-500 hover:scale-105 cursor-pointer"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>

                            </div>

                            
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}