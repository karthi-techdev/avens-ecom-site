import { MdOutlineArrowRightAlt } from "react-icons/md";
import banner1 from '../../../public/home/banner-1.png';
import banner2 from '../../../public/home/banner-2.png';
import banner3 from '../../../public/home/banner-3.png';

const OfferBoxes = () => {
    const offers = [
        { img: banner1.src, title1: 'Save 20% on', title2: 'Woman Bag' },
        { img: banner2.src, title1: 'Save 20% on', title2: 'Woman Bag' },
        { img: banner3.src, title1: 'Save 20% on', title2: 'Woman Bag' },
    ];

    return (
        <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem]'>
            {offers.map((offer, index) => (
                <div key={index} className='relative group !py-[2rem] h-[11rem] !ps-[2rem] w-full bg-cover bg-center' style={{ backgroundImage: `url(${offer.img})` }}>
                    <div className='absolute '>
                        <h3 className='text-[0.9rem] !mb-[0.3rem] font-medium !text-[var(--text-muted)]'>Smart Offer</h3>
                        <h1 className='font-semibold text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 !text-black leading-[1rem]'>{offer.title1}</h1>
                        <h1 className='font-semibold text-[1.3rem] group-hover:!ml-[0.5rem] transition-all duration-500 !text-black'>{offer.title2}</h1>
                        <a href='#' className='!mt-[0.7rem] inline-block !text-[var(--primary)] text-[0.8rem] font-semibold capitalize rounded-sm group/icon'>
                            Shop now<MdOutlineArrowRightAlt className='inline-block !ml-[0.4rem] group-hover/icon:!ml-[0.8rem] transition-all duration-500'/>
                        </a>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default OfferBoxes;
