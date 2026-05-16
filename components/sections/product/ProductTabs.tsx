'use client';

import { useState, useEffect } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { useAddInfoStore } from "@/store/useAddInfoStore";
import { useReviewStore } from "@/store/useReviewStore";

interface ProductTabsProps {
    description?: string;
    product?: any;
}

const formatReviewDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
    }).format(date) + " at " + new Intl.DateTimeFormat('en-US', {
        hour: 'numeric', minute: 'numeric', hour12: true
    }).format(date).toLowerCase();
};

const ProductTabs = ({ description, product }: ProductTabsProps) => {
    const [activeTab, setActiveTab] = useState("DESCRIPTION");
    const [showSuccess, setShowSuccess] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [currentUserId, setCurrentUserId] = useState("");
    
    const [form, setForm] = useState({
        name: '',
        email: '',
        comment: '',
        website: ''
    });
    const [errors, setErrors] = useState<any>({});

    // Store logic
    const { addInfos, fetchAddInfos, isLoading: isInfoLoading } = useAddInfoStore();
    const { 
        activeProductReviews, 
        fetchActiveReviews, 
        addReview, 
        removeReview, 
        isLoading: isReviewLoading 
    } = useReviewStore();

    // Initialize User ID and fetch global additional info
    useEffect(() => {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("user");
            const user = userData ? JSON.parse(userData) : null;
            let id = user?._id || user?.id || localStorage.getItem("guestId");
            if (!id) {
                id = "guest_" + Math.random().toString(36).substr(2, 9);
                localStorage.setItem("guestId", id);
            }
            setCurrentUserId(id);
        }
        fetchAddInfos();
    }, [fetchAddInfos]);

    // Fetch reviews when tab switches to REVIEWS or product changes
    useEffect(() => {
        if (activeTab === "REVIEWS" && product?._id) {
            fetchActiveReviews(product._id);
        }
    }, [activeTab, product?._id, fetchActiveReviews]);

    const handleDelete = async (reviewId: string) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            await removeReview(reviewId, currentUserId);
        }
    };

    const validate = () => {
        let newErrors: any = {};
        if (!rating) newErrors.rating = "Please select rating";
        if (!form.comment.trim()) newErrors.comment = "Comment is required";
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate() || !product?._id) return;

        const payload = {
            productId: product._id,
            userId: currentUserId,
            name: form.name,
            email: form.email,
            rating: rating,
            comment: form.comment,
            website: form.website,
            status: "active" as const 
        };

        try {
            await addReview(payload);
            setForm({ name: '', email: '', comment: '', website: '' });
            setRating(0);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
            fetchActiveReviews(product._id);
        } catch (error) {
            console.error("Submission failed", error);
        }
    };

    return (
        <div className="mt-10">
            {/* Tab Headers */}
            <div className="border-b mb-6 flex gap-8 border-[#ececec]">
                {["DESCRIPTION", "ADDITIONAL", "REVIEWS"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 font-semibold text-sm transition-all outline-none ${activeTab === tab
                            ? "text-green-600 border-b-2 border-green-600"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        {tab === "ADDITIONAL" ? "ADDITIONAL INFO" : tab}
                        {tab === "REVIEWS" && ` (${activeProductReviews.length})`}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
                {activeTab === "DESCRIPTION" && (
                    <div className="text-gray-500 leading-relaxed max-w-3xl whitespace-pre-line">
                        {description || "No description available."}
                    </div>
                )}

                {activeTab === "ADDITIONAL" && (
                    <div className="overflow-hidden border rounded-lg border-[#ececec] max-w-3xl">
                        {isInfoLoading ? (
                             <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto" /></div>
                        ) : (
                            <table className="w-full text-sm">
                                <tbody>
                                    {addInfos.length > 0 ? (
                                        addInfos.map((item, index) => (
                                            <tr key={item._id || index} className="border-b last:border-0 border-[#ececec]">
                                                <td className="p-4 font-semibold text-[#253D4E] w-1/3 bg-gray-50/50 border-r border-[#ececec]">
                                                    {item.key}
                                                </td>
                                                <td className="p-4 text-gray-600">
                                                    {item.value}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="p-4 text-gray-400 text-center">No additional information available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {activeTab === "REVIEWS" && (
                    <div className="max-w-3xl">
                        {isReviewLoading && activeProductReviews.length === 0 ? (
                             <div className="flex items-center gap-2 text-gray-400 py-10"><Loader2 className="animate-spin" /> Loading reviews...</div>
                        ) : (
                            <>
                                {activeProductReviews.map((rev) => (
                                    <div key={rev._id} className="border border-[#ececec] p-6 rounded-xl mb-6 flex gap-6">
                                        <div className="flex flex-col items-center gap-2 flex-shrink-0 w-24">
                                            <img 
                                                src={`https://ui-avatars.com/api/?name=${rev.name}&background=random`} 
                                                className="w-12 h-12 rounded-full" 
                                                alt="avatar" 
                                            />
                                            <span className="font-bold text-xs text-[#253D4E] text-center">{rev.name}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} fill={i < rev.rating ? "#ffc107" : "#dddddd"} stroke="none" />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-400">{formatReviewDate(rev.createdAt)}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-2">{rev.comment}</p>
                                            {rev.userId === currentUserId && (
                                                <button 
                                                    onClick={() => handleDelete(rev._id)} 
                                                    className="text-red-400 text-xs mt-2 hover:underline"
                                                >
                                                    Delete my review
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {activeProductReviews.length === 0 && !isReviewLoading && (
                                    <p className="text-gray-400 mb-8 italic">No reviews yet. Be the first to review!</p>
                                )}
                            </>
                        )}

                        {/* Review Form */}
                        <div className="mt-12 p-8 border border-[#ececec] rounded-2xl bg-white shadow-sm">
                            <h3 className="font-bold text-2xl text-[#253D4E] mb-4">Add a review</h3>
                            
                            {showSuccess && (
                                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
                                    Review submitted successfully! It will appear after moderation.
                                </div>
                            )}
                            
                            <div className="flex mb-6 items-center gap-4">
                                <span className="text-sm font-bold">Your Rating:</span>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((v) => (
                                        <Star 
                                            key={v} 
                                            size={22} 
                                            className="cursor-pointer transition-colors"
                                            fill={v <= (hover || rating) ? "#ffc107" : "none"}
                                            stroke={v <= (hover || rating) ? "#ffc107" : "#dddddd"}
                                            onClick={() => setRating(v)}
                                            onMouseEnter={() => setHover(v)}
                                            onMouseLeave={() => setHover(0)}
                                        />
                                    ))}
                                </div>
                                {errors.rating && <span className="text-red-500 text-xs">{errors.rating}</span>}
                            </div>

                            <textarea 
                                name="comment" 
                                value={form.comment} 
                                onChange={(e) => setForm({...form, comment: e.target.value})} 
                                placeholder="Write Comment *" 
                                className={`w-full border p-4 mb-4 h-32 rounded-xl focus:border-green-400 outline-none transition-all ${errors.comment ? 'border-red-300' : 'border-[#ececec]'}`} 
                            />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder="Name *" 
                                        value={form.name} 
                                        onChange={(e) => setForm({...form, name: e.target.value})} 
                                        className={`w-full border p-4 rounded-xl outline-none focus:border-green-400 ${errors.name ? 'border-red-300' : 'border-[#ececec]'}`} 
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="email" 
                                        placeholder="Email *" 
                                        value={form.email} 
                                        onChange={(e) => setForm({...form, email: e.target.value})} 
                                        className={`w-full border p-4 rounded-xl outline-none focus:border-green-400 ${errors.email ? 'border-red-300' : 'border-[#ececec]'}`} 
                                    />
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleSubmit} 
                                disabled={isReviewLoading} 
                                className="bg-[#3BB77E] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#29A56C] transition-colors disabled:bg-gray-300"
                            >
                                {isReviewLoading ? "Submitting..." : "Submit Review"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;