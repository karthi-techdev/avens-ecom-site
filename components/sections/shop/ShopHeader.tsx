'use client';
import { LayoutGrid, List, Grid3X3, ChevronDown, Check, ArrowUpDown } from "lucide-react";
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

interface ShopHeaderProps {
    totalItems: number;
}

const ShopHeader = ({ totalItems }: ShopHeaderProps) => {
    const router = useRouter();
    const pathname = usePathname();
    
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isShowOpen, setIsShowOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [showSelected, setShowSelected] = useState("50");
    const [sortSelected, setSortSelected] = useState('Featured');

    const showOptions = ["50", "100", "150", "200", "All"];
    const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Release Date', 'Avg. Rating'];

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 !mb-6">
            <p className="text-[var(--text-muted)] text-sm sm:text-lg font-semibold">
                We found <span className="text-[var(--primary)] font-bold">{totalItems}</span> items for you!
            </p>

            <div className="flex items-center gap-2">
                {/* View Toggle */}
                <div className="hidden lg:block relative text-left">
                    <button onClick={() => setIsViewOpen(!isViewOpen)} className="flex items-center gap-2 !px-5 !py-3 border border-gray-200 rounded-full bg-white transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                        {pathname.includes('list') ? <List size={16} /> : <Grid3X3 size={16} />}
                        <span className="text-sm text-[var(--text-muted)]">View:</span>
                        <span className="text-sm text-[var(--text-main)]">{pathname.includes('list') ? 'List' : 'Grid'}</span>
                        <ChevronDown size={14} className={`transition-transform ${isViewOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isViewOpen && (
                        <ul className="absolute left-0 z-50 !mt-2 w-full min-w-[150px] bg-white border rounded-[10px] shadow-xl !py-2 animate-in fade-in zoom-in duration-200" style={{ borderColor: 'var(--border-color)' }}>
                            <li onClick={() => { router.push('/shop-grid-left'); setIsViewOpen(false); }} className="group flex items-center !px-4 !py-2.5 text-sm hover:bg-[var(--primary)] hover:text-white cursor-pointer">
                                <div className="w-5">{!pathname.includes('list') && <Check size={14} />}</div>
                                <span>Grid View</span>
                            </li>
                            <li onClick={() => { router.push('/shop-list-left'); setIsViewOpen(false); }} className="group flex items-center !px-4 !py-2.5 text-sm hover:bg-[var(--primary)] hover:text-white cursor-pointer">
                                <div className="w-5">{pathname.includes('list') && <Check size={14} />}</div>
                                <span>List View</span>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Show Items Count */}
                <div className="relative inline-block text-left">
                    <button onClick={() => setIsShowOpen(!isShowOpen)} className="flex items-center gap-2 !px-5 !py-3 border border-gray-200 rounded-full bg-white transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                        <LayoutGrid size={16} />
                        <span className="text-sm text-[var(--text-muted)]">Show:</span>
                        <span className="text-sm text-[var(--text-main)]">{showSelected}</span>
                        <ChevronDown size={14} className={`transition-transform ${isShowOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isShowOpen && (
                        <ul className="absolute left-0 z-50 !mt-2 w-full min-w-[120px] bg-white border rounded-[10px] shadow-xl !py-2 animate-in fade-in zoom-in duration-200" style={{ borderColor: 'var(--border-color)' }}>
                            {showOptions.map((option) => (
                                <li key={option} onClick={() => { setShowSelected(option); setIsShowOpen(false); }} className="group flex items-center !px-4 !py-2.5 text-sm hover:bg-[var(--primary)] hover:text-white cursor-pointer">
                                    <div className="w-5">{showSelected === option && <Check size={14} />}</div>
                                    <span>{option}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Sort By */}
                <div className="relative inline-block text-left">
                    <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-2 !px-5 !py-3 border border-gray-200 rounded-full bg-white transition-colors" style={{ borderColor: 'var(--border-color)' }}>
                        <ArrowUpDown size={16} />
                        <span className="text-sm text-[var(--text-muted)]">Sort by:</span>
                        <span className="text-sm text-[var(--text-main)]">{sortSelected}</span>
                        <ChevronDown size={14} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isSortOpen && (
                        <ul className="absolute left-0 z-50 !mt-2 w-56 bg-white border rounded-[10px] shadow-xl !py-2 animate-in fade-in zoom-in duration-200" style={{ borderColor: 'var(--border-color)' }}>
                            {sortOptions.map((option) => (
                                <li key={option} onClick={() => { setSortSelected(option); setIsSortOpen(false); }} className="group flex items-center !px-4 !py-2.5 text-sm hover:bg-[var(--primary)] hover:text-white cursor-pointer">
                                    <div className="w-5">{sortSelected === option && <Check size={14} />}</div>
                                    <span>{option}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopHeader;
