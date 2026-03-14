
import { MessageSquareText, ChevronRight, Eye, Usb, ArrowRight, Clock, Search } from "lucide-react"
import Image from "next/image";
import blogimageone from "@/public/images/blog-6.png"
import blogimagetwo from "@/public/images/blog-7.png"
import blogimagethree from "@/public/images/blog-8.png"
import blogimagefour from "@/public/images/blog-2.png"
import blogimagefive from "@/public/images/blog-3.png"
import blogimagesix from "@/public/images/blog-4.png"
import blogimageseven from "@/public/images/blog-9.png"
import blogimagerightone from "@/public/images/blog-1.jpg"
import blogimagerighttwo from "@/public/images/blog-2.png"
import blogimagerightthree from "@/public/images/blog-3.png"
import blogimagerightfour from "@/public/images/blog-4.png"
import blogimagerightfive from "@/public/images/blog-5.png"
import blogimagerightsix from "@/public/images/offer.png"

const BlogtechnologyPage = () => {
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
                        <ul className="text-[12px] lg:text-sm flex gap-5 !mt-3 font-medium text-[var(--blog-text)]">
                            <li >32 Sub Categories </li>
                            <li className="relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full ">1020k Article </li>
                            <li className="relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full ">3480 Authors </li>
                            <li className="relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full "> 29M Views</li>
                        </ul>
                        <div className="!mt-10  border border-[var(--border-color)] !pb-5
                        transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ">
                            <div className="group overflow-hidden ">
                                 <Image
                                src={blogimageone}
                                alt="images"
                                className=" w-full object-cover transition duration-300 ease-in-out group-hover:scale-110 " />
                            </div>
                           
                            <ul className="flex justify-between !p-4">
                                <li className="text-sm uppercase font-bold relative !pl-4 before:content-[''] before:absolute before:left-0 before:top-1 before:w-2 before:h-2 before:border  before:border-[var(--border-color)] before:rounded-full !text-[var(--blog-text)] ">Mobile Phone</li>
                                <li className="flex"><span className="!pr-10 font-small flex text-[var(--blog-text)] "><Eye size={25} className="!p-1" />23k</span> <span className="!pr-8 font-small flex !text-[var(--blog-text)]"><MessageSquareText size={25} className="!p-1" />18k</span> <span className="!pr-6 font-small flex !text-[var(--blog-text)]"><Usb size={23} className="!p-1" />17k</span></li>
                            </ul>
                            <h1 className="!p-4 text-3xl font-bold hover:text-[var(--blog-text)] ">Barcelona: marathan; south korean pulls away for a grueling surprise</h1>
                            <p className="!p-4 font-small">These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi-million dollar home currently.</p>
                            <ul className="flex justify-between !p-4">
                                <li className=" text-[12px] lg:text-sm text-[var(--blog-text)]">By <a href="" className="">Azimeto</a> 12/07/2026 09:35 EST 8 mins read <span className="block text-sm">Updated 18/08/2026 07:12 EST</span></li>
                                <li className="text-[var(--white)]"><a href="" className="w-35 h-12 flex justify-center items-center !bg-[var(--blog-text)] rounded-lg border-2 border-white text-sm font-bold hover:!bg-[var(--blog-hover)] ">Read More<ArrowRight size={16} className="!ml-2" /></a></li>
                            </ul>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 !mt-5">
                            <div className="w-full md:w-1/2 border border-[var(--border-color)] !pb-2 relative
                            transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                                <div className="w-20 h-9 flex justify-center items-center bg-[var(--blog-text)] rounded-lg  text-sm font-bold capitalize text-[var(--white)] absolute top-4 left-3 z-10"> Politic</div>
                                <div className="group overflow-hidden ">
                                    <Image
                                    src={blogimagetwo}
                                    alt="images"
                                    className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110" />
                                </div>
                                
                                <h1 className="!p-2 text-2xl font-bold hover:text-[var(--blog-text)]">The litigants on the screen are not actors</h1>
                                <p className="!p-2">These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell one multi.</p>
                                <ul className="flex justify-between !p-4" >
                                    <li className="text-sm flex text-[var(--blog-text)]"><Clock size={14} /> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></li>
                                    <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                                </ul>
                            </div>
                            <div className="w-full md:w-1/2 border border-[var(--border-color)] !pb-2 relative
                            transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                             <div className="w-20 h-9 flex justify-center items-center bg-[var(--blog-text)] rounded-lg  text-sm font-bold capitalize text-[var(--white)] absolute top-4 left-3 z-10">global</div>
                             <div className="group overflow-hidden ">
                                <Image
                                    src={blogimagethree}
                                    alt="images"
                                    className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110" />
                             </div>
                                
                                <h1 className="!p-2 text-2xl font-bold hover:text-[var(--blog-text)]">Essential Qualities of Highly Successful Music</h1>
                                <p className="!p-2">Graduating from a top accelerator or incubator can be as career-defining for a startup founder as an elite university diploma. The intensive programmes, which</p>
                                <ul className="flex justify-between !p-4" >
                                    <li className="text-sm flex text-[var(--blog-text)]"><Clock size={14} /> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></li>
                                    <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 !mt-3">
                            <div className="w-full md:w-1/2 border border-[var(--border-color)] !pb-2 relative
                            transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                             <div className="w-20 h-9 flex justify-center items-center bg-[var(--blog-text)] rounded-lg  text-sm font-bold capitalize text-[var(--white)] absolute top-4 left-3 z-10"> sport</div>
                             <div className="group overflow-hidden ">
                                <Image
                                    src={blogimagefour}
                                    alt="images"
                                    className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110" />
                             </div>
                                
                                <h1 className="!p-2 text-2xl font-bold hover:text-[var(--blog-text)]">9 Things I Love About Shaving My Head</h1>
                                <p className="!p-2">At the Emmys, broadcast scripted shows created by people of color gained ground relative to those pitched by White show creators, while broadcast scripted shows.</p>
                                <ul className="flex justify-between !p-4" >
                                    <li className="text-sm flex text-[var(--blog-text)]"><Clock size={14} /> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></li>
                                    <li className="flex text-sm text-[var(--blog-text)]" ><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a></li>
                                </ul>
                            </div>
                            <div className="w-full md:w-1/2 border border-[var(--border-color)] !pb-2 relative
                            transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                             <div className="w-25 h-9 flex justify-center items-center bg-[var(--blog-text)] rounded-lg  text-sm font-bold capitalize text-[var(--white)] absolute top-4 left-3 z-10">Technology</div>
                             <div className="group overflow-hidden ">
                                <Image
                                    src={blogimagefive}
                                    alt="images"
                                    className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110" />
                             </div>
                                
                                <h1 className="!p-2 text-2xl font-bold hover:text-[var(--blog-text)]">Why Teamwork Really Makes The Dream Work</h1>
                                <p className="!p-2">We live in a world where disruption and dynamism reign supreme and businesses must be ready to adapt to the many unpredictable changes that come with this.</p>
                                <ul className="flex justify-between !p-4" >
                                    <li className="text-sm flex text-[var(--blog-text)]"><Clock size={14} /> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></li>
                                    <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 !mt-3">
                            <div className="w-full md:w-1/2 border border-[var(--border-color)] !pb-2 relative
                            transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                             <div className="w-20 h-9 flex justify-center items-center bg-[var(--blog-text)] rounded-lg  text-sm font-bold capitalize text-[var(--white)] absolute top-4 left-3 z-10">watch</div>
                             <div className="group overflow-hidden ">
                                <Image
                                    src={blogimagesix}
                                    alt="images"
                                    className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110" />
                             </div>
                                
                                <h1 className="!p-2 text-3xl font-bold hover:text-[var(--blog-text)]">The World Caters to Average People</h1>
                                <p className="!p-2">These people envy me for having a lifestyle they don’t have, but the truth is, sometimes I envy their lifestyle instead. Struggling to sell oney.</p>
                                <ul className="flex justify-between !p-4" >
                                    <li className="text-sm flex text-[var(--blog-text)]"><Clock size={14} /> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></li>
                                    <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                                </ul>
                            </div>
                            <div className="w-full md:w-1/2 border border-[var(--border-color)] !pb-2 relative  transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                             <div className="w-20 h-9 flex justify-center items-center bg-[var(--blog-text)] rounded-lg  text-sm font-bold capitalize text-[var(--white)] absolute top-4 left-3 z-10"> Politic</div>
                             <div className="group overflow-hidden ">
                                <Image
                                    src={blogimageseven}
                                    alt="images"
                                    className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-110" />
                             </div>
                                
                                <h1 className="!p-2 text-2xl font-bold hover:text-[var(--blog-text)]">Essential Qualities of Highly Successful Music</h1>
                                <p className="!p-2">Graduating from a top accelerator or incubator can be as career-defining for a startup founder as an elite university diploma. The intensive programmes, which...</p>
                                <ul className="flex justify-between !p-4" >
                                    <li className="text-sm flex text-[var(--blog-text)]"><Clock size={14} /> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></li>
                                    <li className="flex text-sm text-[var(--blog-text)]"><a href="" className="flex">Read More<ArrowRight size={16} className="!mt-1" /></a> </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3 !mt-10">
                        <div className="w-8 h-8  flex justify-center items-center bg-[var(--blog-text)] rounded-lg text-md font-extrabold text-[var(--white)] "><a href="">01</a></div>
                        <div className="w-8 h-8 flex justify-center items-center rounded-lg text-md font-extrabold text-[var(--text-muted)] hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="">02</a></div>
                        <div className="w-8 h-8 flex justify-center items-center rounded-lg text-md font-extrabold text-[var(--text-muted)] hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="" >03</a></div>
                        <div className="w-8 h-8 flex justify-center items-center rounded-lg text-md font-extrabold text-[var(--text-muted)] hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="" >...</a></div>
                        <div  className="w-8 h-8 flex justify-center items-center rounded-lg text-md font-extrabold text-[var(--text-muted)] hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="">16</a></div>
                        <div  className="w-8 h-8 flex justify-center items-center  text-md font-extrabold text-[var(--text-muted)] rounded-l-none rounded-r-full hover:bg-[var(--blog-text)] hover:text-[var(--white)]"><a href="" className="flex"><ChevronRight size={16}/><ChevronRight size={16}/></a></div>
                        </div>

                    </div>

                    <div className="lg:col-span-1"> 
                        <div className="sticky top-5 ">
                            <div className="relative w-full  lg:max-w-sm !mt-3">
                                <input
                                    type="text"
                                    placeholder="Search ..."
                                    className="w-full !pl-7 !pr-4 !py-2 border border-[var(--border-color)]  focus:outline-none focus:ring-1 focus:ring-[var(--blog-text)]"
                                />
                                <div className=" !p-3 absolute top-0 left-87 lg:left-63  hover:bg-[var(--blog-text)] hover:text-[var(--white)] hover:rounded-lg"><Search  size={16}/></div>
                            </div>
                            <div className="w-full border-b-1 border-[var(--border-color)] !mt-9 ">
                                <h1 className="uppercase font-bold !pb-2">Categories</h1>
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
                                <h1 className="uppercase font-bold !pb-2">Trending Now</h1>
                            </div>
                            <div className="w-full">
                                <div className="group overflow-hidden ">
                                     <Image
                                    src={blogimagerightone}
                                    alt="images"
                                    className=" w-full object-cover rounded-lg !mt-3 transition duration-300 ease-in-out group-hover:scale-110" />
                                </div>
                               
                                <h1 className="text-xl font-bold leading-tight !mt-3">The litigants on the screen are not actors</h1>
                                <p className="text-sm flex !mt-1 text-[var(--blog-text)]"> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></p>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 !mt-5">
                                <div className="w-full md:w-1/2">
                                <div className="group overflow-hidden ">
                                    <Image
                                        src={blogimagerighttwo}
                                        alt="images"
                                        className=" w-full object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110" />
                                </div>
                                    
                                    <h1 className="text-sm font-bold !mt-1">Water Partners With Rag & Bone To Consume</h1>
                                    <p className="text-[10px] flex !mt-1 font-semibold text-[var(--blog-text)]"> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-1 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></p>
                                </div>
                                <div className="w-full md:w-1/2">
                                <div className="group overflow-hidden ">
                                     <Image
                                        src={blogimagerightthree}
                                        alt="images"
                                        className=" w-full object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110" />
                                </div>
                                   
                                    <h1 className="text-sm font-bold !mt-1">The loss is not all that surprising</h1>
                                    <p className="text-[10px] flex !mt-1 font-semibold text-[var(--blog-text)]"> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-1 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></p>
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
                                    
                                    <h1 className="text-sm font-semibold !mt-1">We got a right to pick a little fight, Bonanza</h1>
                                    <p className="text-[10px] flex !mt-1 font-bold text-[var(--blog-text)]"> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-1 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></p>
                                </div>
                                <div className="w-full md:w-1/2">
                                <div className="group overflow-hidden ">
                                    <Image
                                        src={blogimagerightfive}
                                        alt="images"
                                        className=" w-full object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110" />
                                </div>
                                    
                                    <h1 className="text-sm font-bold !mt-1">My entrance exam was on a book of matches</h1>
                                    <p className="text-[10px] flex !mt-1 font-semibold text-[var(--blog-text)] "> 25 April 2026 <span className=" relative !pl-4 before:content-[''] before:absolute before:left-1 before:top-1 before:w-1 before:h-1 before:bg-gray-500 before:rounded-full">126k Views</span></p>
                                </div>

                            </div>
                            <div className="w-full !mt-6">
                                    <div className="relative">
                                        <div className="absolute !mt-[100px] !ml-9 ">
                                            <p >Women Zone</p>
                                            <div className="transition-all duration-300 hover:translate-x-4">
                                              <h1 className="text-xl font-bold">Save 17% on</h1>
                                               <h1 className="text-xl font-bold">Office Dress</h1>
                                            </div>
                                            <a href="" className="flex !mt-6 !text-[var(--blog-text)] ">Shop Now <ArrowRight size={16} className="!mt-1"/></a>
                                        </div>
                                      <Image
                                       src={blogimagerightsix}
                                       alt="images"
                                      className=" w-full object-cover"/>
                                    </div>
                                    
                            </div>
                            <div className="w-full border-b-1 border-[var(--border-color)] !mt-9 ">
                                <h1 className="uppercase font-bold !pb-2">Popular tags</h1>
                            </div>
                            <div className="w-full flex flex-col md:flex-row lg:flex-col">
                                <div className="flex gap-3">
                                    <a href="" className="text-sm flex border-1 !border-[var(--border-color)] rounded-md w-20 h-8 justify-center items-center !mt-3">beautiful</a>
                                    <a href="" className="text-sm flex border-1 !border-[var(--border-color)] rounded-md w-20 h-8 justify-center items-center !mt-3">New York</a>
                                    <a href="" className="text-sm flex border-1 !border-[var(--border-color)] rounded-md w-20 h-8 justify-center items-center !mt-3">droll</a>
                                </div>
                                <div className="flex gap-3">
                                    <a href="" className="text-sm flex border-1 !border-[var(--border-color)] rounded-md w-20 h-8 justify-center items-center !mt-2">intimate</a>
                                    <a href="" className="text-sm flex border-1 !border-[var(--border-color)] rounded-md w-20 h-8 justify-center items-center !mt-2">loving</a>
                                    <a href="" className="text-sm flex border-1 !border-[var(--border-color)] rounded-md w-20 h-8 justify-center items-center !mt-2">travel</a>
                                </div>
                            </div>
                            <div>
                                <a href="" className=" flex border-1 !border-[var(--border-color)] rounded-md w-20 h-8 justify-center items-center !mt-2">fighting</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
}


export default BlogtechnologyPage;