'use client';
import { Filter, Star } from 'lucide-react';
import Image from 'next/image';

const ShopSidebar = () => {
    return (
        <div className="!space-y-6 lg:!space-y-8 ">
            {/* Categories */}
            <div className="!mb-0 lg:!mb-8 border rounded-lg !p-5 " style={{ borderColor: 'var(--border-color)' }} >
                <div className="relative !mb-4 sm:!mb-5">
                    <h2 className="font-bold text-base !pb-3 border-b" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>
                        Category
                    </h2>
                    <span className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-[var(--primary)]"></span>
                </div>
                <ul className="!space-y-4 sm:!space-y-5 text-sm" style={{ color: 'var(--text-muted)' }}>
                    {['Shoes & Bags', 'Blouses & Shirts', 'Dresses', 'Swimwear', 'Beauty', 'Jewelry & Watch', 'Accessories'].map((cat) => (
                        <li key={cat} className="hover:text-[var(--primary)] cursor-pointer transition-colors transition-all duration-200 bg-white hover:translate-x-1 ">
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Fill by Price */}
            <div className="!mb-0 lg:!mb-8 border rounded-lg !p-5" style={{ borderColor: 'var(--border-color)' }}>
                <div className="!mb-6">
                    <div className="relative">
                        <h2 className="font-bold text-base sm:text-lg !mb-4 sm:!mb-5 !pb-3" style={{ color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)' }}>
                            FILL BY PRICE
                        </h2>
                    </div>
                    <div>
                        <p className="text-sm !mb-3" style={{ color: 'var(--text-muted)' }}>Range:</p>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>$0 - $1000</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="font-bold text-base sm:text-lg !mb-4 sm:!mb-5 !mt-5" style={{ color: 'var(--text-main)' }}>Color</h2>
                    <ul className="!space-y-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                        {['Red (56)', 'Green (78)', 'Blue (54)'].map((color) => (
                            <li key={color} className="flex items-center gap-2 cursor-pointer transition-colors">
                                <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                                <span>{color}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mb-6">
                    <h2 className="font-bold text-base sm:text-lg !mb-4 sm:!mb-5 !mt-5" style={{ color: 'var(--text-main)' }}>Item Condition</h2>
                    <ul className="!space-y-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                        {['New (1056)', 'Refurbished (27)', 'Used (45)'].map((condition) => (
                            <li key={condition} className="flex items-center gap-2 cursor-pointer transition-colors">
                                <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" />
                                <span>{condition}</span>
                            </li>
                        ))}
                        <button className="!px-10 !py-2 !mt-6 rounded text-white flex items-center justify-center gap-2 w-full" 
                                style={{ backgroundColor: 'var(--primary)' }}>
                            <Filter size={18} />
                            Filter
                        </button>
                    </ul>
                </div>
            </div>

            {/* New Products */}
            <div className="!mb-0 lg:!mb-8 border rounded-lg !p-6" style={{ borderColor: 'var(--border-color)' }}>
                <div className="relative">
                    <h2 className="font-bold text-base sm:text-lg !mb-4 sm:!mb-5 !pb-3" style={{ color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)' }}>
                        New Products
                    </h2>
                </div>
                <div className="!space-y-6">
                    {[
                        { name: 'Chen Cardigan', price: '$99.50', img: '/shop/new-product-1.jpg', rating: 5 },
                        { name: 'Chen Sweater', price: '$89.50', img: '/shop/new-product-2.jpg', rating: 4 },
                        { name: 'Colorful Jacket', price: '$25', img: '/shop/new-product-3.jpg', rating: 3 },
                    ].map((product, idx) => (
                        <div key={idx} className="flex gap-3 items-center group cursor-pointer !pb-4 border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
                            <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                <Image src={product.img} alt={product.name} width={64} height={64} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-medium !mb-1 line-clamp-2" style={{ color: 'var(--primary)' }}>{product.name}</h4>
                                <p className="text-sm font-semibold">{product.price}</p>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'fill-current text-[#ffb703]' : 'text-[#d1d5db]'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Banner */}
            <div className="relative z-10 p-5 flex flex-col justify-center h-full min-h-[380px] rounded-lg overflow-hidden group"
                 style={{ backgroundImage: 'url("/shop/new-product-4.jpg")', backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-white/10 transition-all duration-300"></div>
                <div className="relative z-10">
                    <h3 className="text-sm !mb-3" style={{ color: 'var(--text-main)' }}>Women Zone</h3>
                    <p className="text-xl font-bold !mb-3 transform transition-transform duration-300 group-hover:translate-x-2">Save 17% on</p>
                    <p className="text-xl font-bold !mb-3 transform transition-transform duration-300 group-hover:translate-x-2">Office Dress</p>
                    <a href="#" className="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all duration-300 text-sm" style={{ color: 'var(--primary)' }}>
                        Shop Now <span className="text-2xl">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ShopSidebar;
