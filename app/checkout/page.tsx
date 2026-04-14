"use client";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { RiCoupon5Line } from "react-icons/ri";

export default function checkoutPage(){
    return(
        <main className="!py-[3rem] !mx-[6rem]">
            <div className="flex gap-[3rem] justify-between ">
                <div className="flex items-center !px-[1rem] !py-[1.3rem] border bg-[var(--bg-light)] border-[var(--border-color)] w-full !rounded-[0.6rem] text-[0.9rem]">
                   <CiUser/> <h1 className="text-[var(--text-muted)] !ml-[0.6rem] font-medium">Already have an account? <Link className="!text-[var(--primary)]" href="#">Click here to login</Link></h1>
                </div>
                <div className="flex items-center !px-[1rem] !py-[1.3rem] border bg-[var(--bg-light)] border-[var(--border-color)] w-full rounded-[0.6rem] text-[0.9rem]">
                    <RiCoupon5Line/><h1 className="text-[var(--text-muted)] !ml-[0.6rem] font-medium">Have a coupon? <Link className="!text-[var(--primary)]" href="#">Click here to enter your code</Link></h1>
                </div>
            </div>
            <div className=" !my-[3rem] before:content-[''] before:block before:h-[0.15rem] before:w-full before:bg-[var(--bg-light)] after:!mt-[0.1rem] after:content-[''] after:block after:h-[0.15rem] after:w-full after:bg-[var(--bg-light)]"></div>
            <div className="flex gap-[1rem]">
                <div className="flex-1">
                    <h1 className="font-semibold text-[var(--black)] mb-[1.5rem] text-[1.2rem]">Billing Details</h1>
                    <form>
                        <input type="text" placeholder="First Name*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="Last Name*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="Company Name*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="Address*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="Address line2" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="City/Town*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="State/Country*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="Postcode/ZIP*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="tel" placeholder="Phone*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="email" placeholder="Email address*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                    </form>
                </div>
                <div className="flex-1"></div>
            </div>
        </main>
    )
}