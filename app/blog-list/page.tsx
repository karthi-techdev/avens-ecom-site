
import { ChevronRight, ArrowRight, Clock, Search } from "lucide-react"
import Image from "next/image";
import blogimageone from "@/public/images/blog-7.png"
import blogimagerightone from "@/public/images/blog-1.jpg"
import blogimagerighttwo from "@/public/images/blog-2.png"
import blogimagerightthree from "@/public/images/blog-3.png"
import blogimagerightfour from "@/public/images/blog-4.png"
import blogimagerightfive from "@/public/images/blog-5.png"
import blogimagerightsix from "@/public/images/offer.png"

const BloglistPage = () => {
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
                        <div className="flex flex-col md:flex-row !mt-10 border rounded-lg border-[var(--border-color)] transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                            <div className="lg:flex-[1.3] flex-1 relative ">
                                <Image
                                    src={blogimageone}
                                    alt="images"
                                    className="w-full h-full object-cover" />
                                <div className=" flex absolute top-4 left-5 text-[var(--white)] bg-[var(--blog-text)] w-26 h-8 font-medium rounded items-center justify-center text-sm">Technology</div>
                            </div>
                            <div className="lg:flex-[2] flex-1 !p-4">
                                <h1 className="text-2xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)]">Ettitude — Beautifully Designed Bamboo Sheets & Sleep Wear-Home Décor Holiday Gift Guide</h1>
                                <p className="text-md !pt-3 font-medium">These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi-million dollar home currently.</p>
                                <ul className="flex justify-between !pt-5 !pb-3">
                                    <li className="text-sm flex text-[var(--blog-text)]"><Clock size={14} /> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></li>
                                    <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row !mt-10 border rounded-lg border-[var(--border-color)] transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                            <div className="lg:flex-[1.3] flex-1 relative ">
                                <Image
                                    src={blogimagerightone}
                                    alt="images"
                                    className="w-full h-full object-cover" />
                                <div className=" flex absolute top-4 left-5 text-[var(--white)] bg-[var(--blog-text)] w-23 h-8 font-medium rounded items-center justify-center text-sm">Phone</div>
                            </div>
                            <div className="lg:flex-[2] flex-1 !p-4">
                                <h1 className="text-2xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)]">Low-Cost Steroid Is First Drug Shown to Reduce Virus Deaths, Study Says</h1>
                                <p className="text-md !pt-3 font-medium">These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi-million dollar home currently.</p>
                                <ul className="flex justify-between !pt-5 !pb-3">
                                    <li className="text-sm flex text-[var(--blog-text)]"><Clock size={14} />  12 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">125k Views</span></li>
                                    <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row !mt-10 border rounded-lg border-[var(--border-color)] transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                            <div className="lg:flex-[1.3] flex-1 relative ">
                                <Image
                                    src={blogimagerighttwo}
                                    alt="images"
                                    className="w-full h-full object-cover" />
                                <div className=" flex absolute top-4 left-5 text-[var(--white)] bg-[var(--blog-text)] w-26 h-8 font-medium rounded items-center justify-center text-sm">Technology</div>
                            </div>
                            <div className="lg:flex-[2] flex-1 !p-4">
                                <h1 className="text-2xl font-bold  text-[var(--text-main)] hover:text-[var(--blog-text)] !pt-3">The litigants on the screen are not actors</h1>
                                <p className="text-md !pt-5 font-medium ">These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi-million dollar home currently.</p>
                                <ul className="flex justify-between !pt-5 !pb-3">
                                    <li className="text-sm flex text-[var(--blog-text)]"><Clock size={14} /> 14 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">12M Views</span></li>
                                    <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row !mt-10 border rounded-lg border-[var(--border-color)] transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ">
                            <div className="lg:flex-[1.3] flex-1 relative ">
                                <Image
                                    src={blogimagerightthree}
                                    alt="images"
                                    className="w-full h-full object-cover" />
                                <div className=" flex absolute top-4 left-5 text-[var(--white)] bg-[var(--blog-text)] w-20 h-8 font-medium rounded items-center justify-center text-sm">Sport</div>
                            </div>
                            <div className="lg:flex-[2] flex-1 !p-4">
                                <h1 className="text-2xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)] !pt-3">Essential Qualities of Highly Successful Music</h1>
                                <p className="text-md !pt-5 font-medium">These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi-million dollar home currently.</p>
                                <ul className="flex justify-between !pt-5 !pb-3">
                                    <li className="text-sm flex text-[var(--blog-text)]"><Clock size={14} />  16 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">136k Views</span></li>
                                    <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row !mt-10 border rounded-lg border-[var(--border-color)] transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                            <div className="lg:flex-[1.3] flex-1 relative ">
                                <Image
                                    src={blogimagerightfour}
                                    alt="images"
                                    className="w-full h-full object-cover" />
                                <div className=" flex absolute top-4 left-5 text-[var(--white)] bg-[var(--blog-text)] w-26 h-8 font-medium rounded items-center justify-center text-sm">Fashion</div>
                            </div>
                            <div className="lg:flex-[2] flex-1 !p-4">
                                <h1 className="text-2xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)] !pt-3">9 Things I Love About Shaving My Head</h1>
                                <p className="text-md !pt-5 font-medium">These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi-million dollar home currently.</p>
                                <ul className="flex justify-between !pt-5 !pb-3">
                                    <li className="text-sm flex text-[var(--blog-text)]"><Clock size={14} /> 18 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">24k Views</span></li>
                                    <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row !mt-10 border rounded-lg border-[var(--border-color)] transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                            <div className="lg:flex-[1.3] flex-1 relative ">
                                <Image
                                    src={blogimagerightfive}
                                    alt="images"
                                    className="w-full h-full object-cover" />
                                <div className=" flex absolute top-4 left-5 text-[var(--white)] bg-[var(--blog-text)] w-18 h-8 font-medium rounded items-center justify-center text-sm">Global</div>
                            </div>
                            <div className="lg:flex-[2] flex-1 !p-4">
                                <h1 className="text-2xl font-bold text-[var(--text-main)] hover:text-[var(--blog-text)]">Why Teamwork Really Makes The Dream Work
                                </h1>
                                <p className="text-md !pt-3 font-medium">These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi-million dollar home currently.</p>
                                <ul className="flex justify-between !pt-5 !pb-3">
                                    <li className="text-sm flex text-[var(--blog-text)]"><Clock size={14} />22 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">17k Views</span></li>
                                    <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 !mt-10">
                            <div className="w-8 h-8  flex justify-center items-center bg-[var(--blog-text)] rounded-lg text-md font-extrabold text-[var(--white)] "><a href="">01</a></div>
                            <div className="w-8 h-8 flex justify-center items-center rounded-lg text-md font-extrabold text-[var(--text-muted)] hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="">02</a></div>
                            <div className="w-8 h-8 flex justify-center items-center rounded-lg text-md font-extrabold text-[var(--text-muted)] hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="" >03</a></div>
                            <div className="w-8 h-8 flex justify-center items-center rounded-lg text-md font-extrabold text-[var(--text-muted)] hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="" >...</a></div>
                            <div className="w-8 h-8 flex justify-center items-center rounded-lg text-md font-extrabold text-[var(--text-muted)] hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="">16</a></div>
                            <div className="w-8 h-8 flex justify-center items-center  text-md font-extrabold text-[var(--text-muted)] rounded-l-none rounded-r-full hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="" className="flex"><ChevronRight size={16} /><ChevronRight size={16} /></a></div>
                        </div>

                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-5 ">
                                                    <div className="relative w-full  lg:max-w-sm !mt-3">
                                                        <input
                                                            type="text"
                                                            placeholder="Search ..."
                                                            className="w-full !pl-10 !pr-4 !py-2 border border-[var(--border-color)]  focus:outline-none focus:ring-1 focus:ring-[var(--blog-text)]"
                                                        />
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 "><Search size={16} /></div>
                                                    </div>
                                                    <div className="w-full border-b-1 border-[var(--border-color)] !mt-9 ">
                                                        <h1 className="uppercase font-bold text-[var(--text-main)] !pb-2">Categories</h1>
                                                    </div>
                                                    <div className="w-full border-b-1 border-dotted border-[var(--border-color)] !mt-8">
                                                        <ul className="flex justify-between">
                                                            <li><a href="" className="!text-[var(--blog-text)]">Beauty</a></li>
                                                            <li>(3)</li>
                                                        </ul>
                                                    </div>
                                                    <div className="w-full border-b-1 border-dotted border-[var(--border-color)] !mt-4">
                                                        <ul className="flex justify-between  ">
                                                            <li><a href="" className=" !text-[var(--blog-text)]">Book</a></li>
                                                            <li>(6)</li>
                                                        </ul>
                                                    </div>
                                                    <div className="w-full border-b-1 border-dotted border-[var(--border-color)] !mt-4">
                                                        <ul className="flex justify-between">
                                                            <li><a href="" className=" !text-[var(--blog-text)]">Design</a></li>
                                                            <li>(4)</li>
                                                        </ul>
                                                    </div>
                                                    <div className="w-full border-b-1 border-dotted border-[var(--border-color)] !mt-4">
                                                        <ul className="flex justify-between">
                                                            <li><a href="" className="!text-[var(--blog-text)]">Fashion</a></li>
                                                            <li>(3)</li>
                                                        </ul>
                                                    </div>
                                                    <div className="w-full border-b-1 border-dotted border-[var(--border-color)] !mt-4">
                                                        <ul className="flex justify-between">
                                                            <li><a href="" className="!text-[var(--blog-text)]">Lifestyle</a></li>
                                                            <li>(6)</li>
                                                        </ul>
                                                    </div>
                                                    <div className="w-full !mt-4">
                                                        <ul className="flex justify-between">
                                                            <li><a href="" className="!text-[var(--blog-text)]">Travel</a></li>
                                                            <li>(2)</li>
                                                        </ul>
                                                    </div>
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


export default BloglistPage;