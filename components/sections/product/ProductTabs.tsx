'use client';
import { useState, useEffect } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { useAddInfoStore } from "@/store/useAddInfoStore";

interface ProductTabsProps {
    description?: string;
    product?: any;
}

interface Review {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    status: string;
    userId: string;
    createdAt?: string;
}

const formatReviewDate = (dateString: string) => {
    const date = new Date(dateString);

    const datePart = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(date);

    const timePart = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).format(date).toLowerCase();

    return `${datePart} at ${timePart}`;
};


const ProductTabs = ({ description, product }: ProductTabsProps) => {
    const [activeTab, setActiveTab] = useState("DESCRIPTION");
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [guestId, setGuestId] = useState("");
    const [form, setForm] = useState({
        name: '',
        email: '',
        comment: '',
        website: ''
    });
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        let id = localStorage.getItem("guestId");

        if (!id) {
            id = "guest_" + Date.now();
            localStorage.setItem("guestId", id);
        }

        setGuestId(id);
    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!product || !product._id) {
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/api/v1/admin/reviews?productId=${product._id}`);
                const reviewData = response.data?.data?.data || [];
                const activeReviews = reviewData.filter((r: Review) => r.status === "active");

                const onlyActive = reviewData.filter((r: Review) => r.status === "active");
                setReviews(onlyActive);

                // setReviews(reviewData);
            } catch (error: any) {
                console.error("Reviews load error:", error.response?.status);
            }
        };

        if (activeTab === "REVIEWS") {
            fetchReviews();
        }
    }, [activeTab, product?._id]);

    const handleDelete = async (reviewId: string) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/v1/admin/reviews/${reviewId}`,
                { data: { userId: guestId } }
            );

            // UI update
            setReviews(prev => prev.filter(r => r._id !== reviewId));
        } catch (error: any) {
            console.error("Delete failed:", error.response?.data);
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const validate = () => {
        let newErrors: any = {};
        if (!rating) newErrors.rating = "Please select rating";
        if (!form.comment.trim()) newErrors.comment = "Comment is required";
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        if (!product?._id) {
            alert("Error: Product ID is missing. Cannot submit review.");
            return;
        }

        setIsSubmitting(true);

        const newReviewData = {
            name: form.name,
            email: form.email,
            rating: rating,
            comment: form.comment,
            website: form.website || "",
            productId: product._id,
            userId: guestId,
            status: "active"
        };

        try {

            const response = await axios.post('http://localhost:5000/api/v1/admin/reviews', newReviewData);

            console.log("Backend Response:", response.data);

            if (response.status === 201 || response.status === 200) {
                const savedReview = response.data.data;
                setReviews(prev => [savedReview, ...prev]);
                setForm({ name: '', email: '', comment: '', website: '' });
                setRating(0);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            }
        } catch (error: any) {

            console.error("Submission failed:", error.response?.data);
            alert("Database-la save aagala: " + (error.response?.data?.message || "Unknown error"));
        } finally {
            setIsSubmitting(false);
        }
    };
     const { addInfos, fetchAddInfos, isLoading } = useAddInfoStore();
       useEffect(() => {
        fetchAddInfos();
    }, [fetchAddInfos]);

    if (isLoading) return <div>Loading details...</div>;

    return (
        <div className="mt-10">
            <div className="border-b mb-6 flex gap-8 border-[#ececec]">
                {["DESCRIPTION", "ADDITIONAL", "REVIEWS"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 font-semibold text-sm transition-all ${activeTab === tab
                            ? "text-green-600 border-b-2 border-green-600"
                            : "text-gray-400"
                            }`}
                    >
                        {tab === "ADDITIONAL" ? "ADDITIONAL INFO" : tab}
                        {tab === "REVIEWS" && ` (${reviews.length})`}
                    </button>
                ))}
            </div>

            <div className="min-h-[200px]">
                {activeTab === "DESCRIPTION" && (
                    <p className="text-gray-500 leading-relaxed max-w-3xl">
                        {description || "No description available"}
                    </p>
                )}

                {activeTab === "ADDITIONAL" && (
                <div className="overflow-hidden border rounded-lg border-[#ececec] max-w-3xl">
                    <table className="w-full text-sm">
                        <tbody>
                            {addInfos.length > 0 ? (
                                addInfos.map((item, index) => (
                                    <tr 
                                        key={item._id || index} 
                                        className={`border-b border-[#ececec]`}
                                    >
                                        <td className="p-4 font-medium w-1/3 border-r border-[#ececec]">
                                            {item.key} 
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {item.value}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="p-4 text-gray-400">No additional information available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                )}

                {activeTab === "REVIEWS" && (
                    <div className="max-w-3xl">
                        <h3 className="font-semibold text-lg mb-4">Customer Reviews</h3>

                        {reviews.length > 0 ? (
                            reviews.map((rev) => (
                                <div key={rev._id} className="border-b border-[#ececec] pb-6 mb-6 flex gap-6">
                                    <div className="flex flex-col items-center gap-2 flex-shrink-0 w-24">
                                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                                            <img
                                                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                                alt="User"
                                                className="w-full h-full object-cover opacity-70"
                                            />
                                        </div>
                                        <span className="font-bold text-xs text-gray-800 text-center break-words w-full">
                                            {rev.name}
                                        </span>
                                    </div>

                                    <div className="flex-1 pt-1">
                                        <div className="flex mb-2">
                                            {[...Array(5)].map((_, index) => (
                                                <Star
                                                    key={index}
                                                    size={14}
                                                    stroke="none"
                                                    fill={index < rev.rating ? "#ffc107" : "#dddddd"}
                                                />
                                            ))}
                                        </div>

                                        <span className="text-xs text-gray-400 mb-2 block font-medium">
                                            {rev.createdAt ? formatReviewDate(rev.createdAt) : 'Recent'}
                                        </span>
                                        <p className="text-sm text-gray-600 leading-relaxed">{rev.comment}</p>
                                    </div>

                                    {rev.userId === guestId && (
                                        <button
                                            onClick={() => handleDelete(rev._id)}
                                            className="text-red-500 text-xs ml-4"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 mb-4">No reviews yet.</p>
                        )}

                        <div className="mt-8 p-6 bg-gray-50 rounded-lg relative">
                            <h3 className="font-semibold text-lg mb-3">Add a review</h3>

                            {showSuccess && (
                                <div className="flex items-center gap-2 mb-4 p-3 bg-green-100 text-green-700 border border-green-200 rounded-md">
                                    <CheckCircle2 size={18} />
                                    <span className="text-sm font-medium">Review submitted successfully!</span>
                                </div>
                            )}

                            <div className="flex mb-4 items-center gap-2">
                                <span className="text-sm font-medium">Your Rating:</span>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => {
                                        const value = i + 1;
                                        return (
                                            <Star
                                                key={i}
                                                size={20}
                                                className="cursor-pointer"
                                                stroke={value <= (hover || rating) ? "#ffc107" : "#dddddd"}
                                                fill={value <= (hover || rating) ? "#ffc107" : "none"}
                                                onClick={() => setRating(value)}
                                                onMouseEnter={() => setHover(value)}
                                                onMouseLeave={() => setHover(0)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            {errors.rating && <p className="text-red-500 text-xs mb-2">{errors.rating}</p>}

                            <textarea
                                name="comment"
                                value={form.comment}
                                onChange={handleChange}
                                placeholder="Write Comment *"
                                className="w-full border border-[#ececec] p-3 mb-4 h-32 focus:outline-none focus:border-green-500 bg-white"
                            />
                            {errors.comment && <p className="text-red-500 text-xs mb-2">{errors.comment}</p>}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Name *"
                                        className="border border-[#ececec] p-3 w-full focus:outline-none focus:border-green-500 bg-white"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email *"
                                        className="border border-[#ececec] p-3 w-full focus:outline-none focus:border-green-500 bg-white"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="mb-6">
                                <input
                                    type="text"
                                    name="website"
                                    value={form.website}
                                    onChange={handleChange}
                                    placeholder="Website"
                                    className="w-full border border-[#ececec] p-3 focus:outline-none focus:border-green-500 bg-white"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`bg-green-600 text-white px-8 py-3 font-semibold hover:bg-green-700 transition rounded shadow-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? "Submitting..." : "Submit Review"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;
