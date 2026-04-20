'use client';
import { useState } from 'react';
import Hero from '@/components/sections/home/Hero';
import PromotionSection from '@/components/sections/home/PromotionSection';
import ProductsListing from '@/components/sections/home/ProductsListing';
import ServicesBanner from '@/components/sections/home/ServicesBanner';
import CategoriesCarousel from '@/components/sections/home/CategoriesCarousel';
import OfferBoxes from '@/components/sections/home/OfferBoxes';
import NewArrivals from '@/components/sections/home/NewArrivals';
import OfferTimings from '@/components/sections/home/OfferTimings';
import BrandsCarousel from '@/components/sections/home/BrandsCarousel';
import MonthlyBestSell from '@/components/sections/home/MonthlyBestSell';
import BlogSection from '@/components/sections/home/BlogSection';
import SaleBanner from '@/components/sections/home/SaleBanner';
import TopSellingGrid from '@/components/sections/home/TopSellingGrid';
import QuickViewModal from '@/components/ui/QuickViewModal';



export default function Home() {
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const openQuickView = () => setIsQuickViewOpen(true);
    const closeQuickView = () => setIsQuickViewOpen(false);

    return (
        <>
            <Hero />
            <PromotionSection />
            <ProductsListing onQuickView={openQuickView} />
            <ServicesBanner />
            <CategoriesCarousel />

            <OfferBoxes />
            <NewArrivals onQuickView={openQuickView} />
            <OfferTimings />
            <BrandsCarousel />

            <MonthlyBestSell onQuickView={openQuickView} />
            <BlogSection />
            <SaleBanner />
            <TopSellingGrid />

            <QuickViewModal isOpen={isQuickViewOpen} onClose={closeQuickView} />
        </>
    );
}
