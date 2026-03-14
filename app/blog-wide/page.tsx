import { ChevronRight, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import blogimageone from "@/public/images/blog-1.jpg"
import blogimagetwo from "@/public/images/blog-7.png"
import blogimagethree from "@/public/images/blog-2.png"
import blogimagefour from "@/public/images/blog-3.png"
import blogimagefive from "@/public/images/blog-4.png"
import blogimagesix from "@/public/images/blog-6.png"
import blogimageseven from "@/public/images/blog-8.png"
import blogimageeight from "@/public/images/blog-9.png"

const BlogwidePage = () => {
    return (
        <section>
            <div className="w-full bg-[var(--bg-light)] ">
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
            <div className="flex flex-col items-center justify-center w-full !mt-10 !mb-10">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[var(--blog-text)] ">Our Blog</h1>
                <ul className="text-[12px] lg:text-sm flex gap-5 !mt-3 font-medium text-[var(--text-muted)]">
                    <li >32 Sub Categories </li>
                    <li className="relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-[var(--text-muted)] before:rounded-full ">1020k Article </li>
                    <li className="relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-[var(--text-muted)] before:rounded-full ">3480 Authors </li>
                    <li className="relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-[var(--text-muted)] before:rounded-full "> 29M Views</li>
                </ul>
            </div>
            <div className="!pr-3 !pl-3 lg:!pl-[110px] lg:!pr-[110px]  w-full">
                <div className="flex flex-col md:flex-col lg:flex-row gap-4">
                    <div className="border border-[var(--border-color)]  rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                        <div className="group overflow-hidden relative">
                            <Image
                                src={blogimageone}
                                alt="images"
                                className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110" />
                            <div className="flex absolute w-20 h-8 justify-center items-center text-[var(--white)] bg-[var(--blog-text)] top-5 left-4 rounded ">Sport</div>
                        </div>
                        <h1 className="text-2xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)] !p-4">9 Things I Love About Shaving My Head</h1>
                        <p className="text-md  font-medium  !pl-4 !pr-4">At the Emmys, broadcast scripted shows created by people of color gained ground relative to those pitched by White show creators, while broadcast scripted shows.</p>
                        <ul className="flex justify-between !pr-4 !pl-4 !pb-6 !pt-5">
                            <li className="text-sm flex text-[var(--text-muted)]"><Clock size={14} />22 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">17k Views</span></li>
                            <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                        </ul>
                    </div>
                    <div className="border border-[var(--border-color)]  rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                        <div className="group overflow-hidden relative">
                            <Image
                                src={blogimagetwo}
                                alt="images"
                                className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110" />

                            <div className="flex absolute w-20 h-8 justify-center items-center text-[var(--white)] bg-[var(--blog-text)] top-5 left-4 rounded ">Sport</div>
                        </div>
                        <h1 className="text-2xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)] !p-4">The World Caters to Average People</h1>
                        <p className="text-md  font-medium  !pl-4 !pr-4">At the Emmys, broadcast scripted shows created by people of color gained ground relative to those pitched by White show creators, while broadcast scripted shows.</p>
                        <ul className="flex justify-between !pr-4 !pl-4 !pb-6 !pt-5">
                            <li className="text-sm flex text-[var(--text-muted)]"><Clock size={14} />22 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">17k Views</span></li>
                            <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                        </ul>
                    </div>
                    <div className="border border-[var(--border-color)]  rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                        <div className="group overflow-hidden relative">
                            <Image
                                src={blogimagethree}
                                alt="images"
                                className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110" />
                            <div className="flex absolute w-20 h-8 justify-center items-center text-[var(--white)] bg-[var(--blog-text)] top-5 left-4 rounded ">Politic</div>
                        </div>
                        <h1 className="text-2xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)] !p-4">The litigants on the screen are not actors</h1>
                        <p className="text-md  font-medium  !pl-4 !pr-4">At the Emmys, broadcast scripted shows created by people of color gained ground relative to those pitched by White show creators, while broadcast scripted shows.</p>
                        <ul className="flex justify-between !pr-4 !pl-4 !pb-6 !pt-5">
                            <li className="text-sm flex text-[var(--text-muted)]"><Clock size={14} />22 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">17k Views</span></li>
                            <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-col lg:flex-row gap-4 !mt-8">
                    <div className="border border-[var(--border-color)]  rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ">
                        <div className="group overflow-hidden relative">
                            <Image
                                src={blogimagefour}
                                alt="images"
                                className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110 " />
                            <div className="flex absolute w-20 h-8 justify-center items-center text-[var(--white)] bg-[var(--blog-text)] top-5 left-4 rounded ">Global</div>
                        </div>
                        <h1 className="text-xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)] !p-4">Essential Qualities of Highly Successful Music</h1>
                        <p className="text-md  font-medium  !pl-4 !pr-4">Graduating from a top accelerator or incubator can be as career-defining for a startup founder ah</p>
                        <p className="flex text-md font-bold  text-[var(--blog-text)] !p-4"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </p>
                    </div>
                    <div className="border border-[var(--border-color)]  rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ">
                        <div className="group overflow-hidden relative">
                            <Image
                                src={blogimagefive}
                                alt="images"
                                className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110 " />
                            <div className="flex absolute w-25 h-8 justify-center items-center text-[var(--white)] bg-[var(--blog-text)] top-5 left-4 rounded ">Techonolay</div>
                        </div>
                        <h1 className="text-xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)] !p-4">9 Things I Love About Shaving My Head</h1>
                        <p className="text-md  font-medium  !pl-4 !pr-4">Graduating from a top accelerator or incubator can be as career-defining for a startup founder ah</p>
                        <p className="flex text-md font-bold  text-[var(--blog-text)] !p-4"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </p>
                    </div>
                    <div className="border border-[var(--border-color)]  rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ">
                        <div className="group overflow-hidden relative">
                            <Image
                                src={blogimagesix}
                                alt="images"
                                className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110 " />
                            <div className="flex absolute w-20 h-8 justify-center items-center text-[var(--white)] bg-[var(--blog-text)] top-5 left-4 rounded ">Global</div>
                        </div>
                        <h1 className="text-xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)] !p-4">Why Teamwork Really Makes The Dream Work</h1>
                        <p className="text-md  font-medium  !pl-4 !pr-4">Graduating from a top accelerator or incubator can be as career-defining for a startup founder ah</p>
                        <p className="flex text-md font-bold  text-[var(--blog-text)] !p-4"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </p>
                    </div>
                    <div className="border border-[var(--border-color)]  rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ">
                        <div className="group overflow-hidden relative">
                            <Image
                                src={blogimageone}
                                alt="images"
                                className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110 " />
                            <div className="flex absolute w-20 h-8 justify-center items-center text-[var(--white)] bg-[var(--blog-text)] top-5 left-4 rounded ">Watch</div>
                        </div>
                        <h1 className="text-xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)] !p-4">The World Caters to Average People</h1>
                        <p className="text-md  font-medium  !pl-4 !pr-4">Graduating from a top accelerator or incubator can be as career-defining for a startup founder ah</p>
                        <p className="flex text-md font-bold  text-[var(--blog-text)] !p-4"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-col lg:flex-row gap-4 !mt-8">
                    <div className="border border-[var(--border-color)]  rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ">
                        <div className="group overflow-hidden relative">
                            <Image
                                src={blogimageseven}
                                alt="images"
                                className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110 " />
                            <div className="flex absolute w-20 h-8 justify-center items-center text-[var(--white)] bg-[var(--blog-text)] top-5 left-4 rounded ">Global</div>
                        </div>
                        <h1 className="text-xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)] !p-4">Essential Qualities of Highly Successful Music</h1>
                        <p className="text-md  font-medium  !pl-4 !pr-4">Graduating from a top accelerator or incubator can be as career-defining for a startup founder ah</p>
                        <p className="flex text-md font-bold  text-[var(--blog-text)] !p-4"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </p>
                    </div>
                    <div className="border border-[var(--border-color)]  rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ">
                        <div className="group overflow-hidden relative">
                            <Image
                                src={blogimageeight}
                                alt="images"
                                className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110 " />
                            <div className="flex absolute w-25 h-8 justify-center items-center text-[var(--white)] bg-[var(--blog-text)] top-5 left-4 rounded ">Techonolay</div>
                        </div>
                        <h1 className="text-xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)] !p-4">9 Things I Love About Shaving My Head</h1>
                        <p className="text-md  font-medium  !pl-4 !pr-4">Graduating from a top accelerator or incubator can be as career-defining for a startup founder ah</p>
                        <p className="flex text-md font-bold  text-[var(--blog-text)] !p-4"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </p>
                    </div>
                    <div className="border border-[var(--border-color)]  rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ">
                        <div className="group overflow-hidden relative">
                            <Image
                                src={blogimageone}
                                alt="images"
                                className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110 " />
                            <div className="flex absolute w-20 h-8 justify-center items-center text-[var(--white)] bg-[var(--blog-text)] top-5 left-4 rounded ">Global</div>
                        </div>
                        <h1 className="text-xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)] !p-4">Why Teamwork Really Makes The Dream Work</h1>
                        <p className="text-md  font-medium  !pl-4 !pr-4">Graduating from a top accelerator or incubator can be as career-defining for a startup founder ah</p>
                        <p className="flex text-md font-bold  text-[var(--blog-text)] !p-4"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </p>
                    </div>
                    <div className="border border-[var(--border-color)]  rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ">
                        <div className="group overflow-hidden relative">
                            <Image
                                src={blogimagetwo}
                                alt="images"
                                className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110 " />
                            <div className="flex absolute w-20 h-8 justify-center items-center text-[var(--white)] bg-[var(--blog-text)] top-5 left-4 rounded ">Watch</div>
                        </div>
                        <h1 className="text-xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)] !p-4">The World Caters to Average People</h1>
                        <p className="text-md  font-medium  !pl-4 !pr-4">Graduating from a top accelerator or incubator can be as career-defining for a startup founder ah</p>
                        <p className="flex text-md font-bold  text-[var(--blog-text)] !p-4"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 !mt-10 !pb-5">
                    <div className="w-8 h-8  flex justify-center items-center bg-[var(--blog-text)] rounded-lg text-md font-extrabold text-[var(--white)] "><a href="">01</a></div>
                    <div className="w-8 h-8 flex justify-center items-center rounded-lg text-md font-extrabold text-[var(--text-muted)] hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="">02</a></div>
                    <div className="w-8 h-8 flex justify-center items-center rounded-lg text-md font-extrabold text-[var(--text-muted)] hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="" >03</a></div>
                    <div className="w-8 h-8 flex justify-center items-center rounded-lg text-md font-extrabold text-[var(--text-muted)] hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="" >...</a></div>
                    <div className="w-8 h-8 flex justify-center items-center rounded-lg text-md font-extrabold text-[var(--text-muted)] hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="">16</a></div>
                    <div className="w-8 h-8 flex justify-center items-center  text-md font-extrabold text-[var(--text-muted)] rounded-l-none rounded-r-full hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="" className="flex"><ChevronRight size={16} /><ChevronRight size={16} /></a></div>
                </div>
            </div>


        </section>
    )
}

export default BlogwidePage;