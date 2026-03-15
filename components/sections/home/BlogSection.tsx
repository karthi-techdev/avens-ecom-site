import { MdOutlineArrowRightAlt } from "react-icons/md";
import blog1 from '../../../public/home/blog-1.jpg';
import blog2 from '../../../public/home/blog-2.jpg';
import banner5 from '../../../public/home/banner-5.jpg';
import banner6 from '../../../public/home/banner-6.jpg';
import banner7 from '../../../public/home/banner-7.jpg';

const BlogSection = () => {
    return (
        <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem] gap-[1rem] grid grid-cols-1 lg:grid-cols-[1fr_1fr]'>
            <div className='grid grid-cols-1 gap-[1.5rem]'>
                <h1 className='text-[1.5rem] font-semibold !text-black'><span className='text-[var(--primary)]'>From</span> blog</h1>
                <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr]'>
                    <div><img src={blog2.src} alt="blog"/></div>
                    <div className='!p-[1rem] '>
                        <a href='#' className='block font-medium text-[0.9rem] !text-[var(--primary-hover)]'>Fashion</a>
                        <a href='#' className='text-[1.2rem] block w-full max-w-[23rem] !my-[0.5rem] leading-[1.5rem] !text-black font-medium'>Qualcomm is developing a Nintendo Switch-like console, report says</a>
                        <div className='flex justify-between text-[0.8rem] '>
                            <div className='flex'><p className='!mr-[0.7rem]'>4 April 2026</p><ul className='!pl-3 !list-disc !list-[var(--text-muted)]'><li>12M Views</li></ul></div> 
                            <a href='#' className='inline-block !text-[var(--primary-hover)]'>Read more</a>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr]'>
                    <div><img src={blog1.src} alt="blog"/></div>
                    <div className='!p-[1rem] '>
                        <a href='#' className='block font-medium text-[0.9rem] !text-[var(--primary-hover)]'>Fashion</a>
                        <a href='#' className='text-[1.2rem] block w-full max-w-[23rem] !my-[0.5rem] leading-[1.5rem] !text-black font-medium'>Qualcomm is developing a Nintendo Switch-like console, report says</a>
                        <div className='flex justify-between text-[0.8rem] '>
                            <div className='flex'><p className='!mr-[0.7rem]'>4 April 2026</p><ul className='!pl-3 !list-disc !list-[var(--text-muted)]'><li>12M Views</li></ul></div> 
                            <a href='#' className='inline-block !text-[var(--primary-hover)]'>Read more</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[1rem]'>
                <div className=' relative bg-center group h-[15rem] md:h-full !ps-[2rem] !pt-[4rem] !pb-[2rem] bg-cover' style={{backgroundImage:`url(${banner5.src})`}}>
                    <div className='absolute'>
                        <h3 className='text-[0.9rem] !mb-[0.4rem] text-[var(--text-muted)]'>Accessories</h3>
                        <h1 className='font-semibold group-hover:!ml-[0.5rem] transition-all duration-500 text-[1.3rem] w-full max-w-[10rem] !text-black leading-[1.6rem]'>Save 17% on Autumn Hat</h1>
                        <a href='#' className='!mt-[0.9rem] inline-block text-[0.9rem] !text-[var(--primary)] !py-[0.5rem] capitalize rounded-sm group/icon'>Shop now<MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem] transition-all duration-500 group-hover/icon:!ml-[0.8rem]'/></a>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-[1rem]'>
                    <div className=' relative bg-center group h-[12rem] lg:h-full !ps-[1rem] !py-[2rem] bg-cover' style={{backgroundImage:`url(${banner6.src})`}}>
                        <div className='absolute'>
                            <h3 className=' text-[0.9rem] !mb-[0.4rem] text-[var(--text-muted)]'>Big Offer</h3>
                            <h1 className='font-semibold text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 w-full max-w-[10rem] !text-black leading-[1.6rem]'>Save 20% on Women's socks</h1>
                            <a href='#' className='!mt-[0.9rem] inline-block text-[0.9rem] !text-[var(--primary)] !py-[0.5rem] capitalize group/icon rounded-sm'>Shop now<MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem] transition-all duration-500 group-hover/icon:!ml-[0.8rem]'/></a>
                        </div>
                    </div>
                    <div className=' relative bg-center h-[12rem] group lg:h-full !ps-[1rem] !py-[2rem] bg-cover' style={{backgroundImage:`url(${banner7.src})`}}>
                        <div className='absolute right-2'>
                            <h3 className=' text-[0.9rem] !mb-[0.4rem] text-[var(--text-muted)]'>Smart Offer</h3>
                            <h1 className='font-semibold text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 w-full max-w-[10rem] !text-black leading-[1.6rem]'>Save 20% on Eardrop</h1>
                            <a href='#' className='!mt-[0.9rem] inline-block text-[0.9rem] !text-[var(--primary)] !py-[0.5rem] capitalize group/icon rounded-sm'>Shop now<MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem] transition-all duration-500 group-hover/icon:!ml-[0.8rem]'/></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
