import feature1 from '../../../public/home/feature-1.png';
import feature2 from '../../../public/home/feature-2.png';
import feature3 from '../../../public/home/feature-3.png';
import feature4 from '../../../public/home/feature-4.png';
import feature5 from '../../../public/home/feature-5.png';
import feature6 from '../../../public/home/feature-6.png';

const Features = () => {
    const featureData = [
        { img: feature1.src, title: 'Free shipping', bgColor: '#fddde4' },
        { img: feature2.src, title: 'Online Order', bgColor: '#d1e8f2' },
        { img: feature3.src, title: 'Save Money', bgColor: '#cdebbc' },
        { img: feature4.src, title: 'Promotions', bgColor: '#cdd4f8' },
        { img: feature5.src, title: 'Happy Sell', bgColor: '#f6dbf6' },
        { img: feature6.src, title: '24/7 Support', bgColor: '#fff2e5' },
    ];

    return (
        <section className='!px-[1rem] !py-[0.8rem] sm:!px-[2rem]  sm:!py-[1rem] md:!px-[4rem] md:!py-[1rem] lg:!px-[6rem] lg:!py-[2rem]'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1.5rem] text-[var(--primary)]'>
                {featureData.map((feature, index) => (
                    <div key={index} className='text-center hover:-translate-y-2 transtion-all duration-500 border rounded-md border-[var(--green-border)] !p-[0.8rem]'>
                        <div className='flex justify-center'>
                            <img src={feature.img} alt={feature.title} />
                        </div>
                        <h4 className='!mt-[1rem] rounded-md inline-block font-bold capitalize !py-[0.3rem] !px-[0.6rem]' style={{ backgroundColor: feature.bgColor }}>
                            {feature.title}
                        </h4>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
