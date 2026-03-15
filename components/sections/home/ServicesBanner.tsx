import { MdOutlineArrowRightAlt } from "react-icons/md";
import serviceBanner from '../../../public/home/banner-4.png';

const ServicesBanner = () => {
    return (
        <section className='!mx-[1rem] group sm:!mx-[3rem] md:!mx-[4rem] lg:!mx-[6rem] relative !my-[0.8rem] sm:!my-[1rem] md:!my-[1rem] lg:!my-[2rem] bg-center h-[13rem] sm:h-[14rem] md:h-[15rem] lg:h-[18rem] !ps-[0.5rem] sm:!ps-[1rem] md:!ps-[1.5rem] lg:!ps-[2rem] !pt-[1rem] sm:!pt-[2rem] md:!pt-[3rem] lg:!pt-[4rem] !pb-[1rem] sm:!pb-[1.2rem] md:!pb-[2rem] bg-cover' style={{backgroundImage:`url(${serviceBanner.src})`}}>
            <div className='absolute'>
                <h3 className='text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 !mb-[1rem] font-semibold text-[var(--primary)]'>Repair Services</h3>
                <h1 className='font-semibold text-[1.5rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] !text-black leading-[1.6rem]'>We're an Apple</h1>
                <h1 className='font-semibold text-[1.5rem] sm:text-[1.7rem] md:text-[2rem] lg:text-[2.5rem] !text-black'>Authorised Service Provider</h1>
                <a href='#' className='!mt-[1rem] inline-block bg-[var(--primary)] text-[0.8rem] font-semibold !text-white hover:bg-[var(--primary-hover)] group/button transition-all duration-500 !py-[0.7rem] capitalize !px-[1.4rem] rounded-sm'>
                    Learn more<MdOutlineArrowRightAlt className='inline-block transition-all duration-500 group-hover/button:!ml-[0.8rem] !ml-[0.4rem]'/>
                </a>
            </div>
        </section>
    );
};

export default ServicesBanner;
