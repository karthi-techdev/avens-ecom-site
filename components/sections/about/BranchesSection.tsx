const BranchesSection = () => {
    const branches = [
        { name: 'New York, USA', address: '27 Division St, New York NY 10002, USA', img: '/about/company-1.jpg' },
        { name: 'Paris, France', address: '22 Rue des Carmes 75005 Paris', img: '/about/company-2.jpg' },
        { name: 'Jakarta, Indonesia', address: '2476 Raya Yogyakarta, 89090 Indonesia', img: '/about/company-3.jpg' },
    ];

    return (
        <div className="!mt-20">
            <div className="text-center !mb-12 lg:!px-80">
                <h2 className="text-lg font-semibold tracking-wider text-[var(--primary)] !mb-3"> Evara Coporation</h2>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-dark)] !mb-8">Our main branches around the world</h1>
                <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-3xl mx-auto">At vero eos et accusamus et iusto odio dignissimos ducimus quiblanditiis praesentium. ebitis nesciunt voluptatum dicta reprehenderit accusamus</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {branches.map((branch, idx) => (
                    <div key={idx} className="bg-white rounded-lg overflow-hidden ">
                        <img src={branch.img} alt={branch.name} className="w-full h-auto object-cover transition-transform duration-300 hover:-translate-y-2" />
                        <div className="!p-6 text-center">
                            <h3 className="font-bold text-xl text-[var(--text-dark)]! mb-3">{branch.name}</h3>
                            <p className="text-[var(--text-muted)] leading-relaxed">{branch.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BranchesSection;
