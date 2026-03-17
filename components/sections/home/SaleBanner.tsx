import banner8 from '../../../public/home/banner-8.jpg';

const SaleBanner = () => {
    return (
        <section className='!mx-[1rem]  sm:!px-[2rem] md:!px-[4rem] lg:!mx-[6rem]  relative !my-[0.8rem] !my-[1rem] md:!my-[1.5re,] lg:!my-[2rem] bg-center  h-[10rem] !ps-[2rem]  sm:!ps-[3rem] !py-[2rem] sm:!py-[3rem] bg-cover' style={{backgroundImage:`url(${banner8.src})`}}>
            <div className='absolute'>
                <h3 className=' !mb-[0.7rem] font-semibold text-[var(--text-muted)]'>Shop Today’s Deals</h3>
                <h1 className='font-bold text-[1.3rem] w-full max-w-[15rem] sm:max-w-full sm:text-[1.5rem] md:text-[2rem] !text-black leading-[1.6rem]'>Happy <span className='text-[var(--primary)]'> Mother's Day</span>. Big Sale Up to 40%</h1>
            </div>
        </section>
    );
};

export default SaleBanner;
