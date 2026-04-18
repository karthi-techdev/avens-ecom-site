"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useBlogStore } from "@/store/useBlogStore";
import { ChevronRight, ArrowRight, Search, Facebook, Twitter, Instagram, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import apiClient from "@/lib/api-client";
import { API } from "@/lib/urls";

import Swal from "sweetalert2";


const Blogfullwidthpage = () => {

    const { slug } = useParams();
    const { blog, fetchBlogBySlug, isLoading } = useBlogStore();
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const [form, setForm] = useState({
        name: "",
        email: "",
        comment: "",
        website: "",
        rating: 0,
        image: null as File | null,
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        comment: "",
        rating: "",
    });
    useEffect(() => {
        if (slug) {
            fetchBlogBySlug(slug as string);
        }
    }, [slug]);
    const [comments, setComments] = useState<any[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const blogId = blog?._id;

                if (!blogId) return;

                const res = await apiClient.get(API.getCommentsByBlog(blogId));

                // FILTER + SORT + LIMIT
                const filtered = res.data.data
                    .filter((c: any) => c.isActive)
                    .sort((a: any, b: any) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );

                setComments(filtered); 

            } catch (err) {
                console.log(err);
            }
        };

        if (blog?._id) {
            fetchComments();
        }
    }, [blog]);
    if (isLoading) return <p>Loading...</p>;
    if (!blog) return <p>No blog found</p>;

    type ErrorFields = "name" | "email" | "comment" | "rating";
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const field = name as ErrorFields;

        setForm({ ...form, [field]: value });

        let errorMsg = "";

        // NAME VALIDATION
        if (field === "name") {
            if (value.trim() === "") {
                errorMsg = "Name is required";
            } else if (value.startsWith(" ")) {
                errorMsg = "Name should not start with space";
            } else if (!/^[A-Z]/.test(value)) {
                errorMsg = "First letter must be capital";
            } else if (value.length > 30) {
                errorMsg = "Max 30 characters allowed";
            }
        }

        // EMAIL VALIDATION
        if (field === "email") {
            if (!value) {
                errorMsg = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                errorMsg = "Invalid email format";
            }
        }

        // COMMENT VALIDATION
        if (field === "comment") {
            if (!value) {
                errorMsg = "Comment is required";
            } else if (value.trim().length < 10) {
                errorMsg = "Minimum 10 characters required";
            }
        }

        setErrors((prev) => ({
            ...prev,
            [field]: errorMsg
        }));
    };
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setForm({ ...form, image: e.target.files[0] });
        }
    };
    const handleRating = (value: number) => {
        setForm({ ...form, rating: value });

        setErrors((prev) => ({
            ...prev,
            rating: value ? "" : "Rating is required"
        }));
    };
    const handleSubmit = async () => {

        const newErrors = {
            name:
                !form.name
                    ? "Name is required"
                    : form.name.startsWith(" ")
                        ? "Name should not start with space"
                        : !/^[A-Z]/.test(form.name)
                            ? "First letter must be capital"
                            : form.name.length < 3
                                ? "Name must be at least 3 characters"
                                : "",

            email:
                !form.email
                    ? "Email is required"
                    : !/\S+@\S+\.\S+/.test(form.email)
                        ? "Invalid email format"
                        : "",

            comment:
                !form.comment
                    ? "Comment is required"
                    : form.comment.trim().length < 10
                        ? "Minimum 10 characters required"
                        : "",

            rating: form.rating ? "" : "Rating is required",
        };

        setErrors(newErrors);

        if (newErrors.name || newErrors.email || newErrors.comment || newErrors.rating) {
            return;
        }
        // 
        const result = await Swal.fire({
            title: "Post Comment?",
            text: "Do you want to submit this comment?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, post it!",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#6366f1",
            cancelButtonColor: "#6b7280",
        });

        const formData = new FormData();
        formData.append("blogId", blog._id);

        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("comment", form.comment);
        formData.append("website", form.website);
        formData.append("rating", String(form.rating));

        if (form.image) {
            formData.append("image", form.image);
        }

        try {
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            await apiClient.post(API.addComment, formData);
            // REFETCH COMMENTS
            const res = await apiClient.get(API.getCommentsByBlog(blog._id));

            const filtered = res.data.data
                .filter((c: any) => c.isActive)
                .sort((a: any, b: any) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
                .slice(0, 3);

            setComments(filtered);

            Swal.fire("Posted!", "Your comment has been submitted.", "success");


            setForm({
                name: "",
                email: "",
                comment: "",
                website: "",
                rating: 0,
                image: null,
            });

        } catch (error: any) {
            console.log(error.response?.data || error.message);
            Swal.fire("Error!", error.response?.data?.message || "Failed to submit comment", "error");
        }

    };
    const user = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user") || "null")
        : null;
    const handleDelete = async (commentId: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This will delete this comment permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6366f1",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await apiClient.delete(API.deleteComment(commentId));

                setComments((prev) => prev.filter((c) => c._id !== commentId));

                Swal.fire("Deleted!", "Comment deleted successfully.", "success");
            } catch (err) {
                Swal.fire("Error!", "Failed to delete comment.", "error");
            }
        }
    };
    const visibleComments = comments.slice(0, 3);
    const totalComments = comments.length;

    const ratingCounts = {
        5: comments.filter(c => c.rating === 5).length,
        4: comments.filter(c => c.rating === 4).length,
        3: comments.filter(c => c.rating === 3).length,
        2: comments.filter(c => c.rating === 2).length,
        1: comments.filter(c => c.rating === 1).length,
    };

    const getPercentage = (count: number) => {
        if (totalComments === 0) return 0;
        return Math.round((count / totalComments) * 100);
    };

    const averageRating =
        totalComments === 0
            ? 0
            : (
                comments.reduce((sum, c) => sum + c.rating, 0) / totalComments
            ).toFixed(1);

    return (
        <section>
            <div className="w-full bg-[var(--bg-light)]">

                <div className="max-w-7xl !mx-auto h-[55px] flex items-center gap-3  !pl-[10px]">

                    <a href="#" className="text-sm flex items-center gap-2 !text-[var(--blog-text)] ">
                        Home <ChevronRight size={16} />
                    </a>

                    <span className="text-sm flex items-center gap-2">
                        Blog <ChevronRight size={16} />
                    </span>

                    <span className="text-sm font-medium">
                        Technology
                    </span>

                </div>
            </div>
            <div className=" w-full !pl-10 !pr-10 md:!pl-10 md:!pr-10  lg:!pl-[200px] lg:!pr-[160px] !mt-10">
                <div className="w-full lg:max-w-[90%] mx-auto">
                    <h1 className="!py-1 text-[35px] md:text-[45px] lg:text-[45px] leading-tight font-medium text-[var(--text-main)]">{blog.name}</h1>
                    <div className="flex justify-between !mt-5 border-b-1 border-[var(--border-color)] !pb-6">
                        <ul className="text-[12px]  flex gap-3  !mt-3 font-medium text-[var(--text-muted)]">
                            <li >By <a href="" className="!text-[var(--blog-text)] ">Jonh</a></li>
                            <li className="relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-[var(--text-muted)] before:rounded-full ">9 April 2020 </li>
                            <li className="relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-[var(--text-muted)] before:rounded-full ">8 mins read</li>
                            <li className="relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-[var(--text-muted)] before:rounded-full ">29k Views</li>
                        </ul>
                        <div className="text-[var(--text-muted)] flex font-bold sm:text-sm sm:!mt-[10px] ">Share this: <span className="flex">
                            <a href={currentUrl} target="_blank"><Facebook size={16} className="text-[var(--text-muted)] hover:text-[var(--blog-text)] !m-1 " /></a>
                            <a href={currentUrl} target="_blank"><Twitter size={16} className="text-[var(--text-muted)] hover:text-[var(--blog-text)] !m-1" /></a>
                            <a href={currentUrl} target="_blank"><Instagram size={16} className="text-[var(--text-muted)] hover:text-[var(--blog-text)] !m-1" /></a>
                            <a href={currentUrl} target="_blank"><FaWhatsapp size={16} className="text-[var(--text-muted)] hover:text-[var(--blog-text)] !m-1" /></a>
                        </span>
                        </div>
                    </div>
                    <div className="w-full mt-5">
                        <Image
                            src={blog.image}

                            alt={blog.name}
                            width={1400}
                            height={600}
                            unoptimized
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                    <div className="w-full !mt-19">
                        <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-15 border-b border-[var(--border-color)] !mt-10">
                        <div>
                            <h1 className="text-xl font-bold !mb-6 text-[var(--text-main)] ">Customer questions & answers</h1>

                            {comments.length === 0 ? (
                                <p className="text-sm text-gray-500">No comments yet</p>
                            ) : (
                                visibleComments.map((c, index) => (
                                    <div
                                        key={c._id}
                                        className="!mb-6 !pb-6 border-b flex gap-6 border-[var(--border-color)]"
                                    >
                                        {/* LEFT SIDE */}
                                        <div className="flex flex-col items-center !w-[80px] sm:!w-[100px] md:!w-[120px] text-center">

                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 !mb-2">
                                                {c.image ? (
                                                    <Image
                                                        src={`http://localhost:5000/${c.image.replace(/\\/g, "/")}`}
                                                        alt={c.name}
                                                        width={48}
                                                        height={48}
                                                        unoptimized
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                                                        {c.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>

                                            <span className="font-semibold text-sm text-[var(--text-main)]">
                                                {c.name}
                                            </span>


                                        </div>

                                        {/* RIGHT SIDE */}
                                        <div className="flex-1">

                                            {/*  Rating */}
                                            {/* Rating + Delete */}
                                            <div className="flex justify-between items-center !mb-2">

                                                {/* Stars */}
                                                <div className="flex text-[var(--star-rating)]">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-3 h-3 ${i < c.rating
                                                                ? "fill-current text-yellow-400"
                                                                : "text-gray-300"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Delete Icon */}
                                                {user?._id === c.userId && (
                                                    <button
                                                        onClick={() => handleDelete(c._id)}
                                                        title="Delete comment"
                                                    >
                                                        <Trash2 className="w-4 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Comment */}
                                            <p className="text-sm !mb-3 text-[var(--text-muted)]">
                                                {c.comment}
                                            </p>

                                            <div className="flex gap-4 text-xs !mb-3">
                                                <span className="text-[var(--text-muted)]">
                                                    {new Date(c.createdAt).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}{" "}
                                                    at{" "}
                                                    {new Date(c.createdAt).toLocaleTimeString("en-US", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </span>

                                                <button className="text-[var(--blog-text)] hover:text-[var(--blog-text)] transition-colors inline-flex items-center gap-1">
                                                    Reply <ArrowRight size={16} />
                                                </button>

                                            </div>



                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold !mb-6 text-[var(--text-main)]">Customer reviews</h1>


                            <div className="!mb-6">
                                <div className="flex items-center gap-3 !mb-4">

                                    <div className="flex text-[var(--star-rating)]">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < Math.round(Number(averageRating))
                                                    ? "fill-current"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}

                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span>{averageRating}</span>
                                        <span>out of 5</span>
                                    </div>
                                </div>


                                <div className="!space-y-3">

                                    <div className="flex items-center gap-3">
                                        <span className="text-sm w-12 text-[var(--text-main)]">5 star</span>

                                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative bg-[var(--border-color)]">

                                            <div
                                                className="h-full rounded-full flex items-center justify-center px-2"
                                                style={{
                                                    width: `${getPercentage(ratingCounts[5])}%`,
                                                    backgroundColor: 'var(--blog-text)'
                                                }}
                                            >
                                                <span className="text-xs text-white font-medium">
                                                    {getPercentage(ratingCounts[5])}%
                                                </span>
                                            </div>

                                        </div>
                                    </div>


                                    <div className="flex items-center gap-3">
                                        <span className="text-sm w-12 text-[var(--text-main)]">4 star</span>

                                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative bg-[var(--border-color)]">

                                            <div
                                                className="h-full rounded-full flex items-center justify-center px-2"
                                                style={{
                                                    width: `${getPercentage(ratingCounts[4])}%`,
                                                    backgroundColor: 'var(--blog-text)'
                                                }}
                                            >
                                                <span className="text-xs text-white font-medium">
                                                    {getPercentage(ratingCounts[4])}%
                                                </span>
                                            </div>

                                        </div>
                                    </div>


                                    <div className="flex items-center gap-3">
                                        <span className="text-sm w-12 text-[var(--text-main)]">3 star</span>

                                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative bg-[var(--border-color)]">

                                            <div
                                                className="h-full rounded-full flex items-center justify-center px-2"
                                                style={{
                                                    width: `${getPercentage(ratingCounts[3])}%`,
                                                    backgroundColor: 'var(--blog-text)'
                                                }}
                                            >
                                                <span className="text-xs text-white font-medium">
                                                    {getPercentage(ratingCounts[3])}%
                                                </span>
                                            </div>

                                        </div>
                                    </div>


                                    <div className="flex items-center gap-3">
                                        <span className="text-sm w-12 text-[var(--text-main)]">2 star</span>

                                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative bg-[var(--border-color)]">

                                            <div
                                                className="h-full rounded-full flex items-center justify-center px-2"
                                                style={{
                                                    width: `${getPercentage(ratingCounts[2])}%`,
                                                    backgroundColor: 'var(--blog-text)'
                                                }}
                                            >
                                                <span className="text-xs text-white font-medium">
                                                    {getPercentage(ratingCounts[2])}%
                                                </span>
                                            </div>

                                        </div>
                                    </div>


                                    <div className="flex items-center gap-3">
                                        <span className="text-sm w-12 text-[var(--text-main)]">1 star</span>

                                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative bg-[var(--border-color)]">

                                            <div
                                                className="h-full rounded-full flex items-center justify-center px-2"
                                                style={{
                                                    width: `${getPercentage(ratingCounts[1])}%`,
                                                    backgroundColor: 'var(--blog-text)'
                                                }}
                                            >
                                                <span className="text-xs text-white font-medium">
                                                    {getPercentage(ratingCounts[1])}%
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <button className="text-sm !mt-4 hover:underline text-[var(--text-muted)]">
                                    How are ratings calculated?
                                </button>
                            </div>
                        </div>

                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-main)] !mt-5">Leave a Comment</h1>
                        <div className="!mb-6">

                            <div className="flex gap-1 !mt-3" style={{ color: '#ecece3' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        onClick={() => handleRating(i + 1)}
                                        className={`w-5 h-5 cursor-pointer ${i < form.rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            {errors.rating && (
                                <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
                            )}
                        </div>
                        <div className="!space-y-4 w-full  lg:max-w-[550px] ">
                            <div>

                                <textarea

                                    rows={4}
                                    className="w-full !p-3 border  text-sm border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--blog-text)] !mt-5"
                                    placeholder="Write comment"
                                    name="comment"
                                    onChange={handleChange}
                                ></textarea>

                                {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>

                                    <input
                                        type="text"
                                        className="w-full !p-3 border text-sm border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--blog-text)]"
                                        placeholder="Name"
                                        name="name"
                                        onChange={handleChange}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div>

                                    <input
                                        type="email"
                                        className="w-full !p-3 border text-sm border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--blog-text)]"
                                        placeholder="Email"
                                        name="email"
                                        onChange={handleChange}
                                    />

                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                            </div>
                            <div>

                                <input
                                    type="file"
                                    className="w-full !p-3 border text-sm border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--blog-text)]"
                                    placeholder="Img"
                                    onChange={handleFile}
                                />
                            </div>
                            <div>

                                <input
                                    type="url"
                                    className="w-full !p-3 border text-sm border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--blog-text)]"
                                    placeholder="Website"
                                    name="website"
                                    onChange={handleChange}
                                />
                            </div>

                            <button className="flex justify-center items-center h-13 w-40 bg-[var(--blog-text)] text-white font-bold rounded-lg !mb-10 " onClick={handleSubmit}>
                                Post Comment
                            </button>
                        </div>
                    </div>

                </div>
            </div>


        </section>
    )
}


export default Blogfullwidthpage;



