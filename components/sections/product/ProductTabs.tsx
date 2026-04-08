'use client';
import { useState } from 'react';
import { Star } from 'lucide-react';

interface ProductTabsProps {
    description?: string;
    product?: any;
}

const ProductTabs = ({ description, product }: ProductTabsProps) => {
    const [activeTab, setActiveTab] = useState("DESCRIPTION");

    //  Review Form States
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [form, setForm] = useState({
        name: '',
        email: '',
        comment: '',
        website: ''
    });
    const [errors, setErrors] = useState<any>({});

    const additionalInfo = [
        { label: "Weight", value: product?.weight ? `${product.weight}kg` : "1kg" },
        { label: "Color", value: product?.colors?.join(", ") || "Black" },
        { label: "SKU", value: product?.sku || "N/A" },
        { label: "Stock Status", value: product?.stockQuantity > 0 ? "In Stock" : "Out of Stock" },
        { label: "Category", value: product?.mainCategoryId || "General" }
    ];

    //  Handle form input change + live error removal
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Remove error if value exists
        setErrors((prev: any) => {
            let newErrors = { ...prev };

            if (value.trim() !== '' && name !== 'email') {
                delete newErrors[name];
            }

            // Special handling for email
            if (name === 'email') {
                if (value.trim() === '') {
                    newErrors.email = "Email is required";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = "Invalid email";
                } else {
                    delete newErrors.email;
                }
            }

            return newErrors;
        });
    };

    //  Validate before submit
    const validate = () => {
        let newErrors: any = {};

        if (!rating) newErrors.rating = "Please select rating";
        if (!form.comment.trim()) newErrors.comment = "Comment is required";
        if (!form.name.trim()) newErrors.name = "Name is required";

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Invalid email";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //  Handle submit
    const handleSubmit = () => {
        if (!validate()) return;

        alert("Review Submitted");

        // Reset form
        setForm({ name: '', email: '', comment: '', website: '' });
        setRating(0);
        setErrors({});
    };

    return (
        <div className="mt-10">

            {/* TABS */}
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
                    </button>
                ))}
            </div>

            <div className="min-h-[200px]">

                {/* DESCRIPTION */}
                {activeTab === "DESCRIPTION" && (
                    <p className="text-gray-500 leading-relaxed max-w-3xl">
                        {description || "No description available"}
                    </p>
                )}

                {/* ADDITIONAL */}
                {activeTab === "ADDITIONAL" && (
                    <div className="overflow-hidden border rounded-lg border-[#ececec] max-w-3xl">
                        <table className="w-full text-sm">
                            <tbody>
                                {additionalInfo.map((item, index) => (
                                    <tr key={index} className={`border-b border-[#ececec] ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                        <td className="p-4 font-medium w-1/3 border-r border-[#ececec]">
                                            {item.label}
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {item.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* REVIEWS */}
                {activeTab === "REVIEWS" && (
                    <div className="max-w-3xl">

                        {/* CUSTOMER REVIEWS */}
                        <h3 className="font-semibold text-lg mb-4">Customer Reviews</h3>

                        {[1, 2].map(i => (
                            <div key={i} className="border-b border-[#ececec] pb-4 mb-4">
                                <div className="flex mb-2">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            size={14}
                                            stroke="#dddddd"
                                            fill="#ffc107"
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Good quality and fast delivery!
                                </p>
                            </div>
                        ))}

                        {/* ADD REVIEW FORM */}
                        <div className="mt-8">
                            <h3 className="font-semibold text-lg mb-3">Add a review</h3>

                            {/* INTERACTIVE STAR */}
                            <div className="flex mb-2">
                                {[...Array(5)].map((_, i) => {
                                    const value = i + 1;
                                    return (
                                        <Star
                                            key={i}
                                            size={20}
                                            className="cursor-pointer"
                                            stroke="#dddddd"
                                            fill={value <= (hover || rating) ? "#ffc107" : "none"}
                                            onClick={() => {
                                                setRating(value);
                                                setErrors((prev: any) => {
                                                    const newErrors = { ...prev };
                                                    delete newErrors.rating;
                                                    return newErrors;
                                                });
                                            }}
                                            onMouseEnter={() => setHover(value)}
                                            onMouseLeave={() => setHover(0)}
                                        />
                                    );
                                })}
                            </div>
                            {errors.rating && <p className="text-red-500 text-sm mb-2">{errors.rating}</p>}

                            {/* COMMENT */}
                            <textarea
                                name="comment"
                                value={form.comment}
                                onChange={handleChange}
                                placeholder="Write Comment"
                                className="w-full border border-[#ececec] p-3 mb-2 h-32 focus:outline-none focus:border-green-500"
                            />
                            {errors.comment && <p className="text-red-500 text-sm mb-2">{errors.comment}</p>}

                            {/* NAME + EMAIL */}
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        className="border border-[#ececec] p-3 w-full focus:outline-none focus:border-green-500"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="border border-[#ececec] p-3 w-full focus:outline-none focus:border-green-500"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>
                            </div>

                            {/* WEBSITE */}
                            <input
                                type="text"
                                name="website"
                                value={form.website}
                                onChange={handleChange}
                                placeholder="Website"
                                className="w-full border border-[#ececec] p-3 mb-4 focus:outline-none focus:border-green-500"
                            />

                            {/* SUBMIT BUTTON */}
                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 text-white px-6 py-3 font-semibold hover:bg-green-700 transition"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;