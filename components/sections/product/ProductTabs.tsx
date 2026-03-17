'use client';
import { useState } from 'react';
import { Star, MessageCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface ProductTabsProps {
    description?: string;
    additionalInfo?: any;
    reviews?: any[];
}

const ProductTabs = ({ description, additionalInfo, reviews }: ProductTabsProps) => {
    const [activeTab, setActiveTab] = useState("DESCRIPTION");

    const tabs = [
        { id: "DESCRIPTION", label: "DESCRIPTION" },
        { id: "ADDITIONAL", label: "ADDITIONAL INFO" },
        { id: "REVIEWS", label: "REVIEWS (3)" },
    ];

    return (
        <div className="!mt-10">
            <div className="relative !mb-6 border-b border-[var(--border-color)]">
                <div className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-3 relative font-semibold text-sm transition-all duration-200 ${
                                activeTab === tab.id ? "text-[var(--primary)]" : "text-[var(--text-main)]"
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--primary)]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="!mb-10">
                {activeTab === "DESCRIPTION" && (
                    <div className="animate-in fade-in duration-300">
                        <p className="text-sm md:text-base leading-relaxed !mb-4 text-[var(--text-muted)]">
                            {description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et scelerisque lorem bibendum."}
                        </p>
                        <ul className="!space-y-3 text-sm text-[var(--text-muted)] mt-6">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] !mt-2 flex-shrink-0"></span>
                                <span className="font-medium w-32 text-[var(--text-main)]">Type Of Packing</span>
                                <span>Bottle</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] !mt-2 flex-shrink-0"></span>
                                <span className="font-medium w-32 text-[var(--text-main)]">Color</span>
                                <span>Green, Pink, Powder Blue, Purple</span>
                            </li>
                        </ul>
                    </div>
                )}

                {activeTab === "ADDITIONAL" && (
                    <div className="border rounded-lg overflow-hidden animate-in fade-in duration-300 border-[var(--border-color)]">
                        <table className="w-full text-sm text-[var(--text-main)]">
                            <tbody>
                                {[
                                    ["Frame", "Aluminum"],
                                    ["Weight", "20 LBS"],
                                    ["Color", "Black, Blue, Red, White"],
                                    ["Size", "M, S"]
                                ].map(([label, value], i) => (
                                    <tr key={i} className="border-b last:border-0 border-[var(--border-color)]">
                                        <td className="!py-3 !px-4 font-medium border-r border-[var(--border-color)] bg-[var(--bg-light)] w-1/3">{label}</td>
                                        <td className="!py-3 !px-4">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "REVIEWS" && (
                    <div className="animate-in fade-in duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-xl font-bold !mb-6 text-[var(--text-main)]">Customer reviews</h3>
                                {[1, 2].map((review) => (
                                    <div key={review} className="!mb-6 pb-6 border-b last:border-0 border-[var(--border-color)] flex gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                            <div className="w-full h-full bg-[var(--primary)] flex items-center justify-center text-white font-bold">U</div>
                                        </div>
                                        <div>
                                            <div className="flex text-[#ffb703] !mb-1">
                                                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                            </div>
                                            <p className="text-sm font-semibold text-[var(--text-main)]">John Doe</p>
                                            <p className="text-xs text-[var(--text-muted)] !mb-2">December 4, 2026</p>
                                            <p className="text-sm text-[var(--text-muted)]">Great product, highly recommend!</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold !mb-6 text-[var(--text-main)]">Add a review</h3>
                                <div className="space-y-4">
                                    <textarea rows={4} className="w-full !p-3 border rounded-lg text-sm border-[var(--border-color)] focus:outline-none focus:border-[var(--primary)]" placeholder="Write your review..."></textarea>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" className="!p-3 border rounded-lg text-sm border-[var(--border-color)] focus:outline-none focus:border-[var(--primary)]" placeholder="Name" />
                                        <input type="email" className="!p-3 border rounded-lg text-sm border-[var(--border-color)] focus:outline-none focus:border-[var(--primary)]" placeholder="Email" />
                                    </div>
                                    <button className="!px-8 !py-3 rounded bg-[var(--primary)] text-white font-bold hover:bg-[#29a56c] transition-all">Submit Review</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;
