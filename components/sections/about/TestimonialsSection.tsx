const TestimonialsSection = () => {
    const facts = [
        { name: 'J. Bezos', company: 'Adobe Jsc', img: '/about/expert-1.jpg', text: '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta reprehenderit accusamus voluptatibus voluptas."' },
        { name: 'B.Gates', company: 'Adobe Jsc', img: '/about/expert-2.jpg', text: '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta reprehenderit accusamus voluptatibus voluptas."' },
        { name: 'B. Meyers', company: 'Adobe Jsc', img: '/about/expert-3.jpg', text: '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta reprehenderit accusamus voluptatibus voluptas."' },
        { name: 'J. Bezos', company: 'Adobe Jsc', img: '/about/expert-4.jpg', text: '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta reprehenderit accusamus voluptatibus voluptas."' },
        { name: 'B.Gates', company: 'Adobe Jsc', img: '/about/expert-3.jpg', text: '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta reprehenderit accusamus voluptatibus voluptas."' },
        { name: 'B. Meyers', company: 'Adobe Jsc', img: '/about/expert-1.jpg', text: '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt voluptatum dicta reprehenderit accusamus voluptatibus voluptas."' },
    ];

    return (
        <div className="!mt-20">
            <div className="text-center !mb-12 lg:!px-80">
                <h2 className="text-lg font-semibold tracking-wider text-[var(--primary)] !mb-3"> Some Facts</h2>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-dark)] !mb-8">Take a look what our clients say about us</h1>
                <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-3xl mx-auto">At vero eos et accusamus et iusto odio dignissimos ducimus quiblanditiis praesentium. ebitis nesciunt voluptatum dicta reprehenderit accusamus</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {facts.map((fact, idx) => (
                    <div key={idx} className="bg-white rounded-lg overflow-hidden flex gap-8 !p-10 transition-transform duration-300 hover:-translate-y-2 border border-gray-200 hover:border-[var(--primary)]">
                        <div className="flex-shrink-0 mt-1">
                            <img src={fact.img} alt={fact.name} className="w-15 h-20 object-cover" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-[var(--text-main)] !mb-2">{fact.name}</h3>
                            <p className="text-lg text-[var(--text-muted)] !mb-3">{fact.company}</p>
                            <p className="text-sm md:text-base text-[var(--text-main)]">{fact.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsSection;
