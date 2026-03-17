"use client";
import { ChevronRight } from "lucide-react";
import CompanyInfo from "@/components/sections/about/CompanyInfo";
import TeamSection from "@/components/sections/about/TeamSection";
import BranchesSection from "@/components/sections/about/BranchesSection";
import TestimonialsSection from "@/components/sections/about/TestimonialsSection";
import ClientsCarousel from "@/components/sections/about/ClientsCarousel";

export default function AboutPage() {
    return (
        <>
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm !mb-6 !px-8 sm:!px-18 !py-4 rounded bg-[var(--bg-light)] text-[var(--text-muted)] ">
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
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-18">
                        <div className="col-span-1 lg:col-span-12 ">
                            <CompanyInfo />
                            <TeamSection />
                            <BranchesSection />
                            <TestimonialsSection />
                            <ClientsCarousel />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}