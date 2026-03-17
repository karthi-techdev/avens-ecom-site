const CompanyInfo = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 !mb-18">
            <div className="order-1 lg:order-1">
                <h2 className="text-lg font-semibold tracking-wider text-[var(--primary)] !mb-3">OUR COMPANY</h2>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-dark)] !mb-12">We are Building The Destination For Getting Things Done</h1>
                <p className="text-base sm:text-lg text-[var(--text-muted)] !mb-4">Tempus ultricies augue luctus et ut suscipit. Morbi arcu, ultrices purus dolor erat bibendum sapien metus.</p>
                <p className="text-base sm:text-lg text-[var(--text-muted)]">Tempus ultricies augue luctus et ut suscipit. Morbi arcu, ultrices purus dolor erat bibendum sapien metus. Sit mi, pharetra, morbi arcu id. Pellentesque dapibus nibh augue senectus.</p>
            </div>
            <div className="order-1 lg:order-2">
                <img src="/about/about-1.png" alt="About Us" className="w-full h-auto " />
            </div>
        </div>
    );
};

export default CompanyInfo;
