"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useBlogStore } from "@/store/useBlogStore";

import { ChevronRight, ArrowRight, Search, Facebook, Twitter, Instagram, Star  } from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";


const Blogfullwidthpage = () => {

    const { slug } = useParams();
    
    const { blog, fetchBlogBySlug, isLoading } = useBlogStore();
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    useEffect(() => {
        if (slug) {
            fetchBlogBySlug(slug as string);
        }
    }, [slug]);
    if (isLoading) return <p>Loading...</p>;
    if (!blog) return <p>No blog found</p>;

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


                            <div className="!mb-6 !pb-6 border-b flex gap-6  border-[var(--border-color)] ">

                                <div className="flex flex-col items-center !w-[80px] sm:!w-[100px] md:!w-[120px] flex-shrink-0 text-center">

                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 !mb-2">
                                        <Image
                                            src="/product-view/profile1.jpg"
                                            alt="Jacky Chan"
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="font-semibold text-sm !mb-1 text-[var(--text-main)] ">Jacky Chan</span>
                                    <span className="text-xs text-[var(--text-muted)]" >Since 2012</span>
                                </div>


                                <div className="flex-1">
                                    <div className="flex !mb-2 text-[var(--star-rating)]">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-current" />
                                        ))}

                                    </div>

                                    <p className="text-sm !mb-3 text-[var(--text-muted)]">
                                        Thank you very fast shipping from Poland only 3days.
                                    </p>
                                    <div className="flex gap-4 text-xs !mb-3">
                                        <span className="text-[var(--text-muted)]">
                                            December 4, 2020 at 3:12 pm
                                        </span>
                                        <button
                                            className="text-[var(--blog-text)] hover:text-[var(--blog-text)] transition-colors inline-flex items-center gap-1"
                                        >
                                            Reply <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div className="!mb-6 !pb-6 border-b flex gap-6 border-[var(--border-color)]" >

                                <div className="flex flex-col items-center !w-[80px] sm:!w-[100px] md:!w-[120px] flex-shrink-0 text-center">

                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 !mb-2">
                                        <Image
                                            src="/product-view/profile2.jpg"
                                            alt="Ana Rosie"
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="font-semibold text-sm !mb-1 text-[var(--text-main)]">Ana Rosie</span>
                                    <span className="text-xs text-[var(--text-muted)]">Since 2019</span>
                                </div>


                                <div className="flex-1">

                                    <div className="flex !mb-2 text-[var(--star-rating)]">
                                        {[...Array(4)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-current" />
                                        ))}
                                        <Star className="w-3 h-3" style={{ color: '#d1d5db' }} />
                                    </div>
                                    <p className="text-sm !mb-3 text-[var(--text-muted)]">
                                        Great low price and works well.
                                    </p>
                                    <div className="flex gap-4 text-xs">
                                        <span className="text-[var(--text-muted)]">
                                            December 4, 2020 at 3:12 pm
                                        </span>
                                        <button
                                            className="text-[var(--blog-text)] hover:text-[var(--blog-text)] transition-colors inline-flex items-center gap-1"

                                        >
                                            Reply <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div className="!mb-6 !pb-6   flex gap-6 border-[var(--border-color)]">

                                <div className="flex flex-col items-center !w-[80px] sm:!w-[100px] md:!w-[120px] flex-shrink-0 text-center">

                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 !mb-2">
                                        <Image
                                            src="/product-view/profile3.jpg"
                                            alt="Steven Keny"
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="font-semibold text-sm !mb-1 text-[var(--text-main)]">Steven Keny</span>
                                    <span className="text-xs text-[var(--text-muted)] " >Since 2020</span>
                                </div>


                                <div className="flex-1">

                                    <div className="flex !mb-2 text-[var(--star-rating)]" >
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-current" />
                                        ))}
                                    </div>

                                    <p className="text-sm !mb-1 text-[var(--text-muted)]">
                                        Authentic and Beautiful, Love these way more than ever expected
                                    </p>

                                    <div className="flex gap-4 text-xs">
                                        <span className="text-[var(--text-muted)]">
                                            December 4, 2020 at 3:12 pm
                                        </span>
                                        <button
                                            className="text-[var(--blog-text)] hover:text-[var(--blog-text)] transition-colors inline-flex items-center gap-1"

                                        >
                                            Reply <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold !mb-6 text-[var(--text-main)]">Customer reviews</h1>


                            <div className="!mb-6">
                                <div className="flex items-center gap-3 !mb-4">

                                    <div className="flex text-[var(--star-rating)]">
                                        {[...Array(4)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-current" />
                                        ))}
                                        <Star className="w-3 h-3" style={{ color: '#d1d5db' }} />
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-[var(--text-muted)]">4</span>
                                        <span className="text-sm text-[var(--text-muted)]">out of 5</span>
                                    </div>
                                </div>


                                <div className="!space-y-3">

                                    <div className="flex items-center gap-3">
                                        <span className="text-sm w-12 text-[var(--text-main)]">5 star</span>
                                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative bg-[var(--border-color)]">
                                            <div className="h-full rounded-full flex items-center justify-center px-2" style={{ width: '50%', backgroundColor: 'var(--blog-text)' }}>
                                                <span className="text-xs text-white font-medium">50%</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex items-center gap-3">
                                        <span className="text-sm w-12 text-[var(--text-main)]">4 star</span>
                                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative bg-[var(--border-color)]">
                                            <div className="h-full rounded-full flex items-center justify-center px-2" style={{ width: '25%', backgroundColor: 'var(--blog-text)' }}>
                                                <span className="text-xs text-white font-medium">25%</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex items-center gap-3">
                                        <span className="text-sm w-12 text-[var(--text-main)]">3 star</span>
                                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative bg-[var(--border-color)]">
                                            <div className="h-full rounded-full flex items-center justify-center px-2" style={{ width: '45%', backgroundColor: 'var(--blog-text)' }}>
                                                <span className="text-xs text-white font-medium">45%</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex items-center gap-3">
                                        <span className="text-sm w-12 text-[var(--text-main)]">2 star</span>
                                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative bg-[var(--border-color)]">
                                            <div className="h-full rounded-full flex items-center justify-center px-2" style={{ width: '65%', backgroundColor: 'var(--blog-text)' }}>
                                                <span className="text-xs text-white font-medium">65%</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex items-center gap-3">
                                        <span className="text-sm w-12 text-[var(--text-main)]">1 star</span>
                                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative bg-[var(--border-color)]">
                                            <div className="h-full rounded-full flex items-center justify-center px-2" style={{ width: '85%', backgroundColor: 'var(--blog-text)' }}>
                                                <span className="text-xs text-white font-medium">85%</span>
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
                                    <Star key={i} className="w-5 h-5 fill-current cursor-pointer hover:scale-110 transition-transform" />
                                ))}
                            </div>
                        </div>
                        <div className="!space-y-4 w-full  lg:max-w-[550px] ">
                            <div>

                                <textarea
                                    rows={4}
                                    className="w-full !p-3 border  text-sm border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--blog-text)] !mt-5"
                                    placeholder="Write comment"
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>

                                    <input
                                        type="text"
                                        className="w-full !p-3 border text-sm border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--blog-text)]"
                                        placeholder="Name"
                                    />
                                </div>
                                <div>

                                    <input
                                        type="email"
                                        className="w-full !p-3 border text-sm border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--blog-text)]"
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div>

                                <input
                                    type="url"
                                    className="w-full !p-3 border text-sm border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--blog-text)]"
                                    placeholder="Website"
                                />
                            </div>
                            <button className="flex justify-center items-center h-13 w-40 bg-[var(--blog-text)] text-white font-bold rounded-lg !mb-10">
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



