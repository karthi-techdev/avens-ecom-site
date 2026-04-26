'use client';
import { MessageSquareText, ChevronRight, Eye, Usb, ArrowRight, Clock, Search, ChevronDown } from "lucide-react";
import { useBlogStore } from "@/store/useBlogPageStore";
import { useBlogCategory } from "@/store/useBlogPageCategory";
import Image from "next/image";
import blogimagerightone from "@/public/images/blog-1.jpg"
import blogimagerighttwo from "@/public/images/blog-2.png"
import blogimagerightthree from "@/public/images/blog-3.png"
import blogimagerightfour from "@/public/images/blog-4.png"
import blogimagerightfive from "@/public/images/blog-5.png"
import blogimagerightsix from "@/public/images/offer.png"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const BlogtechnologyPage = () => {

    const { blogcategory, fetchBlogCategorys, loading: isCategoryLoading } = useBlogCategory();
    const { blog, fetchBlogs, isLoading: isBlogLoading } = useBlogStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const searchFirstPageTotal = 7;
    const searchOtherPageItems = 6;
    const [showAllCategories, setShowAllCategories] = useState(false);
    const firstPageTotal = 9;
    const subsequentPageItems = 10;
    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    useEffect(() => {
        fetchBlogCategorys();
    }, [fetchBlogCategorys]);

    if (isBlogLoading && blog.length === 0) {
        return null;
    }
    if (!isBlogLoading && blog.length === 0) {
        return null;
    }

    if (isCategoryLoading && blogcategory.length === 0) {
        return null;
    }
    if (!isCategoryLoading && blogcategory.length === 0) {
        return null;
    }

    const visibleCategories = showAllCategories
        ? blogcategory
        : blogcategory.slice(0, 5);

    const blogCountMap: Record<string, number> = {};

    blog.forEach((b) => {
        const catName = typeof b.categoryId === 'object' ? b.categoryId.name : b.categoryId;
        if (!catName) return;

        blogCountMap[catName] = (blogCountMap[catName] || 0) + 1;
    });

    const filteredBlogs = (() => {
        if (search.trim() === "") return blog;

        const result = blog.filter((item) => {
            const catName =
                typeof item.categoryId === "object"
                    ? item.categoryId.name
                    : item.categoryId;

            return catName
                ?.toLowerCase()
                .includes(search.toLowerCase().trim());
        });

        return result.length > 0 ? result : blog;
    })();

    const isSearching = search.trim() !== "";

    const shouldShowPagination = isSearching
        ? filteredBlogs.length > searchFirstPageTotal
        : filteredBlogs.length > firstPageTotal;

    const totalPages = isSearching
        ? filteredBlogs.length <= searchFirstPageTotal
            ? 1
            : 1 + Math.ceil((filteredBlogs.length - searchFirstPageTotal) / searchOtherPageItems)
        : filteredBlogs.length <= firstPageTotal
            ? 1
            : 1 + Math.ceil((filteredBlogs.length - firstPageTotal) / subsequentPageItems);

    let currentBlogs: typeof blog = [];

    if (isSearching) {
        if (currentPage === 1) {
            currentBlogs = filteredBlogs.slice(0, searchFirstPageTotal);
        } else {
            const startIndex =
                searchFirstPageTotal + (currentPage - 2) * searchOtherPageItems;
            const endIndex = startIndex + searchOtherPageItems;
            currentBlogs = filteredBlogs.slice(startIndex, endIndex);
        }
    } else {
        if (currentPage === 1) {
            currentBlogs = filteredBlogs.slice(0, firstPageTotal);
        } else {
            const startIndex =
                firstPageTotal + (currentPage - 2) * subsequentPageItems;
            const endIndex = startIndex + subsequentPageItems;
            currentBlogs = filteredBlogs.slice(startIndex, endIndex);
        }
    }

    const firstBlog =
    isSearching && currentPage === 1
        ? currentBlogs[0]
        : !isSearching && currentPage === 1
        ? currentBlogs[0]
        : null;

const smallBlogs =
    currentPage === 1
        ? currentBlogs.slice(1)
        : currentBlogs;

    return (
        <section className="w-full">
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
            <div className="max-w-7xl !mx-auto !px-4 !py-10 !pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">

                    <div className="lg:col-span-3 space-y-6 lg:!pr-3">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[var(--blog-text)] ">Our Blog</h1>
                        <ul className="text-[12px] lg:text-sm flex gap-5  !mt-3 font-medium text-[var(--text-muted)]">
                            <li >32 Sub Categories </li>
                            <li className="relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-[var(--text-muted)] before:rounded-full ">1020k Article </li>
                            <li className="relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-[var(--text-muted)] before:rounded-full ">3480 Authors </li>
                            <li className="relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-[var(--text-muted)] before:rounded-full "> 29M Views</li>
                        </ul>

                        {firstBlog && (

                            <div key={firstBlog._id}
                                className="!mt-10  border border-[var(--border-color)] !pb-5
                        transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ">
                                <div className="group overflow-hidden">
                                    <img

                                        src={firstBlog.image}
                                        alt="image"
                                        className=" object-cover transition duration-300 ease-in-out group-hover:scale-110 w-full" />
                                </div>

                                <ul className="flex justify-between !p-4">
                                    <li className="text-sm uppercase font-bold relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-1 before:w-2 before:h-2 before:border  before:border-[var(--blog-text)] before:rounded-full !text-[var(--blog-text)] ">Mobile Phone</li>
                                    <li className="flex"><span className="!pr-10 font-small flex text-[var(--text-muted)] "><Eye size={25} className="!p-1 !mr-1" />23k</span> <span className="!pr-8 font-small flex !text-[var(--text-muted)]"><MessageSquareText size={25} className="!p-1 !mr-1" />18k</span> <span className="!pr-6 font-small flex !text-[var(--text-muted)]"><Usb size={23} className="!p-1 !mr-1" />17k</span></li>
                                </ul>
                                <h1 className="!p-4 text-3xl font-bold hover:text-[var(--blog-text)] text-[var(--text-main)]">{firstBlog.name}</h1>
                                <h1 className="!p-4 font-small"
                                    dangerouslySetInnerHTML={{
                                        __html: (firstBlog.description || "")
                                            .replace(/<[^>]+>/g, "")
                                            .slice(0, 250) + "..."
                                    }}></h1>
                                <ul className="flex justify-between !p-4">
                                    <li className=" text-[12px] lg:text-sm text-[var(--text-muted)]">By <a href="" className="!text-[var(--blog-text)]">Azimeto</a> 12/07/2026 09:35 EST 8 mins read <span className="block text-sm">Updated 18/08/2026 07:12 EST</span></li>
                                    <li className="text-[var(--white)]"><a href="" className="w-30 h-10 flex justify-center items-center !bg-[var(--blog-text)] rounded  text-sm font-semibold hover:!bg-[var(--blog-hover)] ">Read More<ArrowRight size={16} className="!ml-2" /></a></li>
                                </ul>
                            </div>
                        )}


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 !mt-5">
                            {smallBlogs.map((item) => (
                                <div
                                    key={item._id}
                                    className="border border-[var(--border-color)] !pb-2 relative
      transition-all duration-500 hover:-translate-y-2 hover:shadow-lg "
                                >


                                    <div className="absolute top-4 left-3 z-10 bg-[var(--blog-text)] text-white px-3 py-1 rounded-lg text-sm font-bold capitalize">
                                        {item.categoryId.name || "General"}
                                    </div>


                                    <div className="group overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt="image"
                                            className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="!p-3">
                                        <h1 className="!p-2 text-1xl md:text-xl lg:text-3xl font-bold hover:text-[var(--blog-text)] text-[var(--text-main)]">
                                            {item.name}
                                        </h1>


                                        <p
                                            className="!p-2"
                                            dangerouslySetInnerHTML={{
                                                __html: (item.description || "")
                                                    .replace(/<[^>]+>/g, "")
                                                    .slice(0, 150) + "..."
                                            }}
                                        ></p>
                                        <ul className="flex justify-between !pt-5 !pb-3 ">
                                            <li className="text-sm flex text-[var(--blog-text)]"><Clock size={14} />  12 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">125k Views</span></li>
                                            <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {shouldShowPagination && (
                            <div className="flex gap-5">
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-8 h-8 flex justify-center items-center rounded-lg text-md font-extrabold cursor-pointer ${currentPage === index + 1
                                            ? "bg-[var(--blog-text)] text-white"
                                            : "text-[var(--text-muted)]"
                                            }`}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                            </div>
                        )}


                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-5 ">
                            <div className="relative w-full  lg:max-w-sm !mt-3 ">
                                <input
                                    type="text"
                                    placeholder="Search ..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full  !pl-10 !pr-4 !py-2 border border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--blog-text)] "

                                />
                                <Search size={16} className="absolute top-3 left-2" />
                            </div>
                            <div className="w-full border-b-1 border-[var(--border-color)] !mt-9 ">
                                <h1 className="uppercase font-bold text-[var(--text-main)] !pb-2">Categories</h1>
                            </div>
                            {visibleCategories.map((item, index) => (
                                <div key={item._id}
                                    className="w-full border-b-1 border-dotted border-[var(--border-color)] !mt-8">
                                    <ul className="flex justify-between">
                                        <li><a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                if ((blogCountMap[item.name] || 0) === 0) return;

                                                setSearch(item.name);
                                                setCurrentPage(1);
                                            }}
                                            className={`capitalize cursor-pointer ${(blogCountMap[item.name] || 0) === 0
                                                ? "!text-[var(--blog-text)] cursor-not-allowed"
                                                : "!text-[var(--blog-text)]"
                                                }`}
                                        >
                                            {item.name}
                                        </a></li>
                                        <li>({blogCountMap[item.name] || 0})</li>
                                    </ul>
                                </div>
                            ))}
                            {blogcategory.length > 5 && (
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => setShowAllCategories(!showAllCategories)}
                                        className="flex items-center gap-2 text-[var(--blog-text)] font-semibold"
                                    >
                                        {showAllCategories ? "Show Less" : "Show More"}

                                        <ChevronDown
                                            size={16}
                                            className={`transition-transform duration-300 ${showAllCategories ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                </div>
                            )}
                            <div className="w-full border-b-1 border-[var(--border-color)] !mt-9 ">
                                <h1 className="uppercase font-bold text-[var(--text-main)] !pb-2">Trending Now</h1>
                            </div>
                            <div className="w-full">
                                <div className="group overflow-hidden ">
                                    <Image
                                        src={blogimagerightone}
                                        alt="images"
                                        className=" w-full object-cover rounded-lg !mt-3 transition duration-300 ease-in-out group-hover:scale-110" />
                                </div>

                                <h1 className="text-xl font-bold leading-tight !mt-3 text-[var(--text-main)]">The litigants on the screen are not actors</h1>
                                <p className="text-sm flex !mt-1 text-[var(--text-muted)]"> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></p>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 !mt-5">
                                <div className="w-full md:w-1/2">
                                    <div className="group overflow-hidden ">
                                        <Image
                                            src={blogimagerighttwo}
                                            alt="images"
                                            className=" w-full object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110" />
                                    </div>

                                    <h1 className="text-xl lg:text-sm font-bold leading-tight !mt-1 text-[var(--text-main)]">Water Partners With Rag & Bone To Consume</h1>
                                    <p className="text-sm lg:text-[10px] flex !mt-1 font-semibold text-[var(--text-muted)]"> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-1 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></p>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <div className="group overflow-hidden ">
                                        <Image
                                            src={blogimagerightthree}
                                            alt="images"
                                            className=" w-full object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110" />
                                    </div>

                                    <h1 className="text-xl lg:text-sm font-bold leading-tight !mt-1 text-[var(--text-main)]">The loss is not all that surprising</h1>
                                    <p className="text-sm lg:text-[10px] flex !mt-1 font-semibold text-[var(--text-muted)]"> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-1 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></p>
                                </div>

                            </div>
                            <div className="flex flex-col md:flex-row gap-4 !mt-5">
                                <div className="w-full md:w-1/2">
                                    <div className="group overflow-hidden ">
                                        <Image
                                            src={blogimagerightfour}
                                            alt="images"
                                            className=" w-full object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110" />
                                    </div>

                                    <h1 className="text-xl lg:text-sm font-bold leading-tight !mt-1 text-[var(--text-main)]">We got a right to pick a little fight, Bonanza</h1>
                                    <p className="text-sm lg:text-[10px] flex !mt-1 font-bold text-[var(--text-muted)]"> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-1 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></p>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <div className="group overflow-hidden ">
                                        <Image
                                            src={blogimagerightfive}
                                            alt="images"
                                            className=" w-full object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110" />
                                    </div>

                                    <h1 className="text-xl lg:text-sm font-bold leading-tight !mt-1 text-[var(--text-main)]">My entrance exam was on a book of matches</h1>
                                    <p className="text-sm lg:text-[10px] flex !mt-1 font-semibold text-[var(--text-muted)]"> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-1 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></p>
                                </div>

                            </div>
                            <div className="w-full !mt-6 block md:hidden lg:block ">
                                <div className="relative">
                                    <div className="absolute !mt-[100px] !ml-9 ">
                                        <p >Women Zone</p>
                                        <div className="transition-all duration-300 hover:translate-x-4">
                                            <h1 className="text-xl font-bold text-[var(--text-main)]">Save 17% on</h1>
                                            <h1 className="text-xl font-bold text-[var(--text-main)]">Office Dress</h1>
                                        </div>
                                        <a href="" className="flex !mt-6 !text-[var(--blog-text)] ">Shop Now <ArrowRight size={16} className="!mt-1" /></a>
                                    </div>
                                    <Image
                                        src={blogimagerightsix}
                                        alt="images"
                                        className=" w-full object-cover" />
                                </div>

                            </div>
                            <div className="w-full border-b-1 border-[var(--border-color)] !mt-9 ">
                                <h1 className="uppercase font-bold !pb-2 text-[var(--text-main)]">Popular tags</h1>
                            </div>
                            <div className="w-full flex flex-col md:flex-row lg:flex-col">
                                <div className="flex gap-3">
                                    <a href="" className="text-sm flex border-1 !border-[var(--border-color)] rounded-md w-20 h-8 justify-center items-center !mt-3 text-[var(--text-main)]">beautiful</a>
                                    <a href="" className="text-sm flex border-1 !border-[var(--border-color)] rounded-md w-20 h-8 justify-center items-center !mt-3 text-[var(--text-main)]">New York</a>
                                    <a href="" className="text-sm flex border-1 !border-[var(--border-color)] rounded-md w-20 h-8 justify-center items-center !mt-3 text-[var(--text-main)]">droll</a>
                                </div>
                                <div className="flex gap-3">
                                    <a href="" className="text-sm flex border-1 !border-[var(--border-color)] rounded-md w-20 h-8 justify-center items-center !mt-2 text-[var(--text-main)]">intimate</a>
                                    <a href="" className="text-sm flex border-1 !border-[var(--border-color)] rounded-md w-20 h-8 justify-center items-center !mt-2 text-[var(--text-main)]">loving</a>
                                    <a href="" className="text-sm flex border-1 !border-[var(--border-color)] rounded-md w-20 h-8 justify-center items-center !mt-2 text-[var(--text-main)]">travel</a>
                                </div>
                            </div>
                            <div>
                                <a href="" className=" flex border-1 !border-[var(--border-color)] rounded-md w-21 h-8 justify-center items-center !mt-2 text-[var(--text-main)]">fighting</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
}


export default BlogtechnologyPage;