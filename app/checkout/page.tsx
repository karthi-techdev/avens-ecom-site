"use client";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { RiCoupon5Line } from "react-icons/ri";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import product1 from '../../public/home/product-1-1.jpg';
import Image from "next/image";
export default function checkoutPage(){
      const [countries] = useState(Country.getAllCountries());
       const [loginOption,setLoginOption]=useState(false);
    const [couponOption,setCouponOption]=useState(false);
    const [accountOption,setAccountOption]=useState(false);
    const [shipmentOption,setShipmentOption]=useState(false);
     const router = useRouter();
     useEffect(()=>{
          const token=JSON.parse(localStorage.getItem("user")||'{}');
     if (!token?._id) router.replace("/");
     else
        console.log("hii its ok to see")
}, []);
      const countryOptions = countries.map(item => {
  return {
     value: item.isoCode, label: item.name 
  }
})
 const onCountryChange = (selectedCountryItem: any) => {
    const code =selectedCountryItem.value;
    const countryName = Country.getCountryByCode(code)?.name || "";
    const phoneCode = Country.getCountryByCode(code)?.phonecode || "";
   

  };
    return(
        <main className="!py-[3rem] !mx-[2rem] md:!mx-[3rem] lg:!mx-[6rem]">
            <div className="flex flex-col lg:flex-row gap-[3rem] justify-between ">
                <div className="flex flex-col w-full gap-[2rem]">
                    <div className="flex items-center !px-[1rem] !py-[1.3rem] border bg-[var(--bg-light)] border-[var(--border-color)] w-full !rounded-[0.6rem] text-[0.9rem]">
                   <CiUser/> <h1 className="text-[var(--text-muted)] !ml-[0.6rem] font-medium">Already have an account? <button className="!text-[var(--primary)] cursor-pointer" onClick={()=>{setLoginOption(!loginOption)}}>Click here to login</button></h1>
                </div>{
                    loginOption? <div className="border border-[var(--border-color)] p-[2rem] rounded-[0.8rem]">
                    <p className="text-[0.8rem] font-semibold text-[var(--black)] mb-[2rem]">If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing & Shipping section.</p>
                    <form>
                         <input type="text" placeholder="Username or Email" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                         <input type="password" placeholder="Password" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                         <div className="flex justify-between mb-[1rem]">
                            <div className="flex items-center">
                                                          <input type='checkbox' /><span className="text-[0.9rem] ml-[0.5rem]">Remember me</span>

                            </div>
                            <div>
                                <Link href={""}  className="!text-[var(--primary)] font-semibold text-[0.8rem]">Forgot Password?</Link>
                            </div>
                         </div>
                          <button type="button" className="bg-[var(--primary)] rounded-[0.3rem] px-[1.3rem] text-center py-[0.7rem] font-semibold text-[var(--white)] hover:bg-[var(--primary-hover)] cursor-pointer">Login</button>
                    </form>
                </div>:""
                }
               
                </div>
               <div className="flex flex-col w-full gap-[2rem]">
                 <div className="flex items-center !px-[1rem] !py-[1.3rem] border bg-[var(--bg-light)] border-[var(--border-color)] w-full rounded-[0.6rem] text-[0.9rem]">
                    <RiCoupon5Line/><h1 className="text-[var(--text-muted)] !ml-[0.6rem] font-medium">Have a coupon? <button  className="!text-[var(--primary)] cursor-pointer" onClick={()=>{setCouponOption(!couponOption)}} >Click here to enter your code</button></h1>
                </div>{
                    couponOption?<div className="border border-[var(--border-color)] p-[2rem] rounded-[0.8rem]">
                    <p className="text-[0.8rem] font-semibold text-[var(--black)] mb-[2rem]">If you have a coupon code, please apply it below.</p>
                    <form>
                         <input type="text" placeholder="Enter Coupon Code..." className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                          <button type="button" className="bg-[var(--primary)] rounded-[0.3rem] px-[1.3rem] text-center py-[0.7rem] font-semibold text-[var(--white)] hover:bg-[var(--primary-hover)] cursor-pointer">Apply Coupon</button>
                    </form>
                </div>:""
                }
                
               </div>
            </div>
            <div className=" !my-[3rem] before:content-[''] before:block before:h-[0.15rem] before:w-full before:bg-[var(--bg-light)] after:!mt-[0.1rem] after:content-[''] after:block after:h-[0.15rem] after:w-full after:bg-[var(--bg-light)]"></div>
            <div className="flex flex-col lg:flex-row gap-[2rem] items-start">
                <div className="flex-1">
                    <h1 className="font-semibold text-[var(--black)] mb-[1.5rem] text-[1.2rem]">Billing Details</h1>
                    <form>
                        <input type="text" placeholder="First Name*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="Last Name*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="Company Name*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <Select 
                      options={countryOptions} onChange={onCountryChange}
                       placeholder='Select an option'
                     className="mb-[1rem] rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem]  font-semibold outline-0"  />
                        <input type="text" placeholder="Address*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="Address line2" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="City/Town*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="State/Country*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="Postcode/ZIP*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="tel" placeholder="Phone*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="email" placeholder="Email address*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <div className="mb-[1rem]">
                            <input type='checkbox' onClick={()=>{setAccountOption(!accountOption)}}/><span className="text-[0.9rem] ml-[0.5rem]">Create an account?</span>
                        </div>
                         {
                            accountOption?<input type="password" placeholder="Password*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>:""
                         }
                          <div>
                            <input type='checkbox' onClick={()=>{setShipmentOption(!shipmentOption)}} /><span className="text-[0.9rem] ml-[0.5rem]">Ship to a different address?</span>
                          </div>{
                                shipmentOption?<>
                                  <input type="text" placeholder="First Name*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 my-[1rem]"/>
                        <input type="text" placeholder="Last Name*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="Company Name*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <Select 
                      options={countryOptions} onChange={onCountryChange}
                       placeholder='Select an option'
                     className="mb-[1rem] rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem]  font-semibold outline-0"  />
                        <input type="text" placeholder="Address*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="Address line2" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="City/Town*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="State/Country*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        <input type="text" placeholder="Postcode/ZIP*" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]"/>
                        </>
                              :""
                          }
                          
                        <label className="w-full block my-[1rem] font-semibold text-[var(--black)]">Additional information</label>
                        <textarea className="w-full rounded-[0.3rem] pt-[1rem] pb-[8rem] px-[1rem] text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]" placeholder="Order Notes" />
                    </form>
                </div>
                <div className="w-[100%] lg:w-[50%] border overflow-auto border-[var(--border-color)] p-[1.5rem] rounded-[1rem] self-start">
                    <h1 className="font-semibold text-[var(--black)] mb-[1.5rem] text-[1.2rem]">Your Orders</h1>
                    <table className="border border-collapse border-[var(--border-color)] w-full">
                        <thead>
                            <tr>
                                <th className="border border-[var(--border-color)] text-[var(--black)] font-semibold py-[0.5rem]" colSpan={2}>Product</th>
                                <th className="border border-[var(--border-color)] text-[var(--black)] font-semibold">Total</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr >
                                <td className=" border border-[var(--border-color)]   ">
                                    <div className=" flex justify-center items-center">
                                        <Image src={product1} className="w-20 h-20 m-[0.6rem]" alt="product"/>
                                    </div>
                                </td>
                                <td className="text-center  border border-[var(--border-color)]">
                                    <h3 className="text-[var(--primary)] font-semibold">Yidarton Women Summer Blue</h3>
                                    <p className="text-[var(--black)] font-semibold">x 2</p>
                                </td>
                                <td className="text-center border border-[var(--border-color)]">
                                    <span className="text-[var(--black)] font-semibold">$180.00</span>
                                </td>
                            </tr>
                             <tr >
                                <td className=" border border-[var(--border-color)]   ">
                                    <div className=" flex justify-center items-center">
                                        <Image src={product1} className="w-20 h-20 m-[0.6rem]" alt="product"/>
                                    </div>
                                </td>
                                <td className="text-center  border border-[var(--border-color)]">
                                    <h3 className="text-[var(--primary)] font-semibold">Yidarton Women Summer Blue</h3>
                                    <p className="text-[var(--black)] font-semibold">x 2</p>
                                </td>
                                <td className="text-center border border-[var(--border-color)]">
                                    <span className="text-[var(--black)] font-semibold">$180.00</span>
                                </td>
                            </tr>
                             <tr >
                                <td className=" border border-[var(--border-color)]   ">
                                    <div className=" flex justify-center items-center">
                                        <Image src={product1} className="w-20 h-20 m-[0.6rem]" alt="product"/>
                                    </div>
                                </td>
                                <td className="text-center  border border-[var(--border-color)]">
                                    <h3 className="text-[var(--primary)] font-semibold">Yidarton Women Summer Blue</h3>
                                    <p className="text-[var(--black)] font-semibold">x 2</p>
                                </td>
                                <td className="text-center border border-[var(--border-color)]">
                                    <span className="text-[var(--black)] font-semibold">$180.00</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center py-[0.4rem]  border border-[var(--border-color)] text-[var(--black)] font-semibold"><span>SubTotal</span></td>
                                <td className="text-center  text-[var(--black)] font-semibold border border-[var(--border-color)]" colSpan={2}><span>$280.00</span></td>
                            </tr>
                            <tr>
                                <td className="text-center py-[0.4rem]  border border-[var(--border-color)] text-[var(--black)] font-semibold"><span>Shipping</span></td>
                                <td className="text-center py-[0.4rem]  border border-[var(--border-color)] text-[var(--black)] font-semibold" colSpan={2}><span>Free Shipping</span></td>
                            </tr>
                            <tr>
                                <td className="text-center py-[0.4rem]  border border-[var(--border-color)] text-[var(--black)] font-semibold"><span>Total</span></td>
                                <td className="text-center py-[0.4rem] text-[1.2rem] border border-[var(--border-color)] font-bold" colSpan={2}><span className="text-[var(--primary)] text-center">$280.00</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <h1 className="text-[var(--black)] font-semibold mt-[3rem] mb-[2rem]">Payment</h1>
                    <div>
                        <div className="mb-[1rem]"><input type='radio' name='payment' id='bank'  value={'Direct Bank Transfer'}/><span className="text-[var(--black)] font-semibold  ml-[0.4rem]">Direct Bank Transfer</span></div>
                    <div className="mb-[1rem]"><input type='radio' name='payment' id='check'  value={'Check Payment'}/><span className="text-[var(--black)] font-semibold  ml-[0.4rem]">Check Payment</span></div>
                    <div className="mb-[1rem]">                    <input type='radio' name='payment' id='paypal'  value={'Paypal'}/><span className="text-[var(--black)] font-semibold  ml-[0.4rem]">Paypal</span>
</div>
                    </div>
                    <div className="mt-[2rem]">
                    <button type="button" className="bg-[var(--primary)] rounded-[0.3rem] px-[1.3rem] text-center py-[0.7rem] font-semibold text-[var(--white)] hover:bg-[var(--primary-hover)] cursor-pointer">Place Order</button>

                    </div>
                </div>
            </div>
        </main>
    )
}