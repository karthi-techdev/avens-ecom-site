import { MdOutlineArrowRightAlt } from "react-icons/md";
import menuBanner1 from '../../../public/home/menu-banner-7.jpg';
import menuBanner2 from '../../../public/home/menu-banner-8.jpg';

const OfferTimings = () => {
    return (
        <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem] grid grid-cols-1 lg:grid-cols-2 gap-[0.5rem] md:gap-[1rem] lg:gap-[1.5rem]'>
            <div className='relative !py-[1rem] sm:!py-[2rem] md:!py-[3rem] h-[30rem] !ps-[1rem] sm:!ps-[2rem] md:!ps-[3rem] w-full bg-cover bg-center' style={{backgroundImage:`url(${menuBanner1.src})`}}>
                <div className='absolute '>
                    <h3 className='text-[1.7rem] font-bold !text-[var(--primary)]'>Deal of the Day</h3>
                    <h3 className='!mb-[0.3rem] !text-black'>Limited quantities.</h3>
                    <a href='#' className='text-[1.2rem] inline-block !my-[1rem] leading-[1.4rem] !text-black w-full max-w-[15rem]'>Summer Collection New Morden Design</a>
                    <h2 className='text-[#ff3551] text-[1.3rem] !mb-[1rem]'>$139.00 <span className='line-through !text-[var(--text-muted)] !ml-[0.4rem] '>$160.99</span></h2>
                    <h4 className='text-[var(--text-main)] font-medium !mb-[0.5rem]'>Hurry Up! Offer End In:</h4>
                    <div className='grid grid-cols-4 gap-[1rem] sm:gap-[2rem] '>
                        {['Days', 'Hours', 'Mins', 'Sec'].map((label, i) => (
                            <div key={label} className="flex flex-col relative ">
                                <h3 className={`relative inline-block bg-[var(--primary)] text-white text-[1.3rem] font-semibold text-center !py-[0.4rem] !px-[0.6rem] sm:!py-[0.6rem] sm:!px-[0.9rem] rounded-md ${i < 3 ? "after:content-[':'] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:text-black after:text-[1.5rem]" : ""}`}>{i === 0 ? '00' : i === 1 ? '08' : i === 2 ? '10' : '55'}</h3>
                                <span className='text-center text-[var(--text-muted)] uppercase text-[0.8rem]'>{label}</span>
                            </div>
                        ))}
                    </div>
                    <a href='#' className='!mt-[1rem] group/btn hover:-translate-y-1 inline-block border border-[var(--primary)] text-[1rem] font-bold transition-all duration-500 !text-[var(--primary)] border-2 !py-[0.5rem] capitalize !px-[0.9rem] rounded-sm'>Shop now<MdOutlineArrowRightAlt className='inline-block transition-all duration-200 !ml-[0.4rem] group-hover/btn:!ml-[0.8rem]'/></a>
                </div>
            </div>
            <div className='relative !py-[1rem] sm:!py-[2rem] md:!py-[3rem] h-[30rem] !ps-[1rem] sm:!ps-[2rem] md:!ps-[3rem] w-full bg-cover bg-center' style={{backgroundImage:`url(${menuBanner2.src})`}}>
                <div className='absolute '>
                    <h3 className='text-[1.7rem] font-bold !text-[var(--primary)]'>Men Clothing</h3>
                    <h3 className='!mb-[0.3rem] !text-black'>Shirt & Bag</h3>
                    <a href='#' className='text-[1.2rem] inline-block !my-[1rem] leading-[1.4rem] !text-black w-full max-w-[15rem]'>Try something new on vacation</a>
                    <h2 className='text-[#ff3551] text-[1.3rem] !mb-[1rem]'>$178.00 <span className='line-through !text-[var(--text-muted)] !ml-[0.4rem] '>$256.99</span></h2>
                    <h4 className='text-[var(--text-main)] font-medium !mb-[0.5rem]'>Hurry Up! Offer End In:</h4>
                    <div className='grid grid-cols-4 gap-[1rem] sm:gap-[2rem] '>
                        {['Days', 'Hours', 'Mins', 'Sec'].map((label, i) => (
                            <div key={label} className="flex flex-col relative ">
                                <h3 className={`relative inline-block bg-[var(--primary)] text-white text-[1.3rem] font-semibold text-center !py-[0.4rem] !px-[0.6rem] sm:!py-[0.6rem] sm:!px-[0.9rem] rounded-md ${i < 3 ? "after:content-[':'] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:text-black after:text-[1.5rem]" : ""}`}>{i === 0 ? '00' : i === 1 ? '08' : i === 2 ? '10' : '55'}</h3>
                                <span className='text-center text-[var(--text-muted)] uppercase text-[0.8rem]'>{label}</span>
                            </div>
                        ))}
                    </div>
                    <a href='#' className='!mt-[1rem] group/btn hover:-translate-y-1 inline-block border border-[var(--primary)] text-[1rem] font-bold !text-[var(--primary)] transition-all duration-500 border-2 !py-[0.5rem] capitalize !px-[0.9rem] rounded-sm'>Shop now<MdOutlineArrowRightAlt className='inline-block group-hover/btn:!ml-[0.8rem] !ml-[0.4rem] transition-all duration-200'/></a>
                </div>
            </div>
        </section>
    );
};

export default OfferTimings;
