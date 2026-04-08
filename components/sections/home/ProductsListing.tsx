'use client';
import { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { useEffect } from 'react';
import { useProductStore } from '@/store/useProductStore';

const ProductsListing = ({ onQuickView }: { onQuickView: () => void }) => {
    const products = useProductStore((state) => state.products);
    const activeTab = useProductStore((state) => state.activeTab);
    const setActiveTab = useProductStore((state) => state.setActiveTab);
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    useEffect(() => {
        fetchProducts(activeTab);
    }, [activeTab]);
    return (
        <section className={`!px-[1rem] relative !py-[0.8rem] sm:!px-[2rem] sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem]`}>
            <div className='flex justify-between items-center'>
                <div className='grid grid-cols-3 gap-[0.6rem]'>
                    <button type='button' className={`${activeTab==='featured'?'bg-[var(--orange-light)] ml-1':'bg-[var(--border-color)] ml-1'} rounded-md !py-[0.4rem] !px-[1.2rem] text-[1.1rem] font-semibold capitalize ${activeTab==='featured'?'text-[var(--primary)]':'' } hover:-translate-y-2 transition-all duration-500 hover:text-[var(--primary)] hover:bg-[var(--orange-light)] cursor-pointer`} onClick={()=>setActiveTab('featured')}>Featured</button>
                    <button type='button' className={`${activeTab==='popular'?'bg-[var(--orange-light)] ml-1':'bg-[var(--border-color)] ml-1'} rounded-md !py-[0.4rem] !px-[1.2rem] text-[1.1rem] font-semibold capitalize ${activeTab==='popular'?'text-[var(--primary)]':'' } hover:-translate-y-2 transition-all duration-500 hover:text-[var(--primary)]  hover:bg-[var(--orange-light)] cursor-pointer`} onClick={()=>setActiveTab('popular')}>Popular</button>
                    <button type='button' className={`${activeTab==='new'?'bg-[var(--orange-light)] ml-1':'bg-[var(--border-color)] ml-1'} rounded-md !py-[0.4rem] !px-[1.2rem] text-[1.1rem] font-semibold capitalize ${activeTab==='new'?'text-[var(--primary)]':'' } hover:-translate-y-2 transition-all duration-500 hover:text-[var(--primary)]  hover:bg-[var(--orange-light)] cursor-pointer`} onClick={()=>setActiveTab('new')} >New added</button>
                </div>
                <div className='hidden md:block'>
                    <a href='#' className='!text-[var(--primary)] font-semibold !underline underline-offset-3 !decoration-[var(--green-border)] decoration-2 inline-block'>View more &gt;&gt;</a>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 !mt-[2rem] gap-[1.5rem]'>
                {products.map((prod) => {
                    // console.log("🟡 EACH PRODUCT:", prod);
                    return (
                        <ProductCard 
                            key={prod._id} 
                            product={prod} 
                            onQuickView={onQuickView} 
                        />
                    );
                })}
            </div>
        </section>                                     
    );
};

export default ProductsListing;