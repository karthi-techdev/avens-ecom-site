import { Facebook, Twitter, Instagram, MessageCircle } from "lucide-react";

const TeamSection = () => {
    const members = [
        { name: 'Patric Adams', role: 'CEO & Co-Founder', img: '/about/expert-1.jpg' },
        { name: 'Dilan Specter', role: 'Head Engineer', img: '/about/expert-2.jpg' },
        { name: 'Tomas Baker', role: 'Senior Planner', img: '/about/expert-3.jpg' },
        { name: 'Norton Mendos', role: 'Project Manager', img: '/about/expert-4.jpg' },
    ];

    return (
        <div className="!mb-8">
            <h2 className="text-lg font-semibold tracking-wider text-[var(--primary)] !mb-3">Our Team</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 !mb-15">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-dark)] !mb-12">Top team of experts</h1>
                    <p className="text-base sm:text-lg text-[var(--text-muted)] !mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione optio perferendis sequi mollitia quis autem ea cupiditate possimus!</p>
                </div>
                <div className="flex justify-start lg:justify-end items-start">
                    <div className="border border-[var(--primary)] rounded-lg !px-4 !py-2.5 text-lg text-[var(--primary)] font-bold bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer">All Members</div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                {members.map((member, idx) => (
                    <div key={idx} className="bg-white rounded-lg overflow-hidden transition-shadow">
                        <div className="overflow-hidden">
                            <img src={member.img} alt={member.name} className="w-full h-auto object-cover transition-transform duration-300 hover:-translate-y-2" />
                        </div>
                        <div className="!p-4 text-center">
                            <h3 className="font-bold text-lg text-[var(--text-main)] !mb-3">{member.name}</h3>
                            <p className="text-lg text-[var(--primary)] !mb-3">{member.role}</p>
                            <div className="flex items-center justify-center gap-3 ">
                                <a href="#" className="hover:scale-110 transition-transform"><Facebook size={18} className="text-[var(--text-muted)] " /></a>
                                <a href="#" className="hover:scale-110 transition-transform"><Twitter size={18} className="text-[var(--text-muted)] " /></a>
                                <a href="#" className="hover:scale-110 transition-transform"><Instagram size={18} className="text-[var(--text-muted)] " /></a>
                                <a href="#" className="hover:scale-110 transition-transform"><MessageCircle size={18} className="text-[var(--text-muted)] " /></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamSection;
