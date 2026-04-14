"use client";
import { ChevronRight, Trash, Handbag, Shuffle, X, Tag, CreditCard, FingerprintPattern } from "lucide-react";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { getNames } from "country-list";
import {toast,Bounce,ToastContainer} from 'react-toastify';
import { useCartStore } from "../../store/cartStore";
import Swal from "sweetalert2";
export default function CartPage() {
  const countries = getNames();
 interface ProductDetails {
  name: string;
  price: number;
  thumbnail: string;
  stockQuantity: number;
  discountPrice: number;
  shortDescription: string;
}

interface CartItem {
  _id: string;
  quantity: number;
  productId: ProductDetails;
}
  const token=JSON.parse(localStorage.getItem("user")||'{}');
   const router = useRouter();
  const {getAllCart,removeCart,cartItems,updateQuantity,updateCart}=useCartStore();
  useEffect(()=>{
     if (token?._id) {
    getAllCart(token._id);
   
  }
   else
      router.replace("/");
}, [token._id]);
  const deleteCartItem=async(id:string)=>{
   
      const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "!bg-[var(--red-color)] !p-[1rem] !text-[var(--white)] text-[1.1rem] font-semibold",
    cancelButton: "!bg-[var(--primary)] !p-[1rem] !text-[var(--white)] !mr-[0.6rem] text-[1.1rem] font-semibold  "
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed)
  {
    removeCart(id);
    swalWithBootstrapButtons.fire({
    title: "Deleted!",
    text: "Your cart item has been deleted.",
    icon: "success"
  });
  }
     
  else if (result.dismiss === Swal.DismissReason.cancel) swalWithBootstrapButtons.fire({
    title: "Cancelled",
    text: "Your cart item is safe :)",
    icon: "error"
  });
});
    
  }

    const increaseFunc=async(id:string)=>{
      let filterCart=cartItems.find(item=>item._id===id);
      let value=Number(filterCart?.quantity);
      value++;
      if(filterCart && value>filterCart.productId.stockQuantity){
        toast.warn('Stock max reached');
        return;
      } 
      updateQuantity(id,value)
      if(filterCart){
         await updateCart(id,{'quantity':value,'userId':token._id,'price':((filterCart.productId.price-(filterCart.productId.price*(filterCart.productId.discountPrice/100))) * (value)).toFixed(2)})
      }
    }
    const decreaseFunc=async(id:string)=>{
      let filterCart = cartItems.find(item => item._id == id);
      let quants=Number(filterCart?.quantity);
     let value=Math.max(1,--quants);
     console.log(value)
      updateQuantity(id,value);
      if(filterCart)
      await updateCart(id,{'quantity':value,'userId':token._id,'price':((filterCart.productId.price-(filterCart.productId.price*(filterCart.productId.discountPrice/100))) * (value)).toFixed(2)})
    }


  return (
    <>
     <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
      {/* Breadcrumb */}
      {cartItems.length==0?<p className="text-center mt-20 text-xl">No items</p>:(<>
        <nav className="flex items-center text-sm !mb-6 !px-8 sm:!px-18 !py-4 rounded bg-[var(--bg-light)] text-[var(--text-muted)]">
        <a href="/" className="!text-[var(--primary)]">Home</a>
        <span className="!mx-2">
          <ChevronRight size={16} />
        </span>
        <a href="/">Shop</a>
        <span className="!mx-2">
          <ChevronRight size={16} />
        </span>
        <a href="/">Your Cart</a>
      </nav>

      <main className="main">
        <div className="max-w-[1400px] mx-auto !px-3 sm:!px-6 md:!px-10 lg:!px-[60px] !py-5">
     

          {/* table*/}
          <div >
            <table className="w-full border-collapse">
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-t border-[var(--border-color)]">
                  <th className="text-center border-r border-l border-[var(--border-color)] !py-4 !px-2 text-lg font-semibold text-[var(--text-main)]" colSpan={2}>Product</th>
                  <th className="text-center border-r border-[var(--border-color)] !py-4 !px-2 text-lg font-semibold text-[var(--text-main)]">Price</th>
                  <th className="text-center border-r border-[var(--border-color)] !py-4 !px-2 text-lg font-semibold text-[var(--text-main)]">Quantity</th>
                  <th className="text-center border-r border-[var(--border-color)] !py-4 !px-2 text-lg font-semibold text-[var(--text-main)]">Subtotal</th>
                  <th className="text-center border-r border-[var(--border-color)] !py-4 !px-2 text-lg font-semibold text-[var(--text-main)]">Stock Status</th>
                  <th className="text-center border-r border-[var(--border-color)] !py-4 !px-2 text-lg font-semibold text-[var(--text-main)]">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item:any) => (
                  <tr key={item._id} className="border border-[var(--border-color)] md:table-row block !mb-6 md:mb-0">
                    {/* Image Column */}
                    <td className="block md:table-cell text-center !py-4 border-b md:border-r border-[var(--border-color)]">
                      <div className="flex justify-center">
                        <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                          <img src={`http://localhost:5000${item.productId.thumbnail}`} alt={item.name} className="w-full h-full object-cover rounded" />
                        </div>
                      </div>
                    </td>

                    {/* Product Details Column */}
                    <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)] !px-5">
                      <div>
                        <h3 className="font-semibold text-[var(--primary)] !mb-1">{item.productId.name}</h3>
                        <p className="text-sm text-[var(--text-muted)] ">{item.productId.shortDescription.length<=50?item.productId.shortDescription:item.productId.shortDescription.substring(0,47)+"..."}</p>
                      </div>
                    </td>

                    <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)]">
                      <div className="relative">

                        <span className="md:hidden font-semibold absolute left-3">
                          Price:
                        </span>

                        <span className="block text-center">
                          ${(item.productId.price-(item.productId.price*(item.productId.discountPrice/100))).toFixed(2)}
                        </span>

                      </div>
                    </td>

                    {/* Quantity Column */}
                    <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)]">
                      <div className="relative">

                        <span className="md:hidden font-semibold absolute left-3">
                          Quantity:
                        </span>

                        <div className="flex justify-center">
                             <div className="flex items-center border border-[var(--border-color)] rounded-lg px-4 py-2">
                    {/* Decrease Button: Price reduces when clicked */}
                    <button onClick={() => decreaseFunc(item._id)} disabled={item.quantity==1} className="px-2 font-bold cursor-pointer">-</button>
                    <span className="w-12 text-center font-bold">{item.quantity}</span>
                    {/* Increase Button: Price increases when clicked */}
                    <button  onClick={()=>increaseFunc(item._id)}  className="px-2 font-bold cursor-pointer">+</button>
                </div>
                        </div>

                      </div>
                    </td>

                    {/* Subtotal Column */}
                    <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)]">
                      <div className="relative">

                        <span className="md:hidden font-semibold absolute left-3">
                          Subtotal:
                        </span>

                        <span className="text-[var(--primary)] font-semibold">
                          ${((item.productId.price-(item.productId.price*(item.productId.discountPrice/100))) * (item.quantity)).toFixed(2)}
                        </span>

                      </div>
                    </td>
                    <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)]">
                      <div className="relative">

                        <span className="md:hidden font-semibold absolute left-3">
                          Subtotal:
                        </span>
                                                {item.quantity>item.productId.stockQuantity?

                        <span className="text-[var(--red-color)] font-semibold">Out of Stock
                        </span>:<span className=" font-semibold">In Stock
                        </span>
}

                      </div>
                    </td>



                    {/* Remove Column */}
                    <td className="block md:table-cell text-center !py-2 border-b md:border-r border-[var(--border-color)]">
                      <div className="relative">

                        <span className="md:hidden font-semibold absolute left-3">
                          Remove:
                        </span>

                        <div className="flex justify-center">
                          <button onClick={()=>deleteCartItem(item._id)} className="inline-flex justify-center text-[var(--text-muted)] hover:text-[var(--red-color)] cursor-pointer transition-colors">
                            <Trash size={18} />
                          </button>
                        </div>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right !mt-6">
              {/* <div className="flex items-center justify-end sm:justify-end w-full sm:w-auto cursor-pointer text-[var(--text-muted)]">
                <X size={18} className="mr-2" />
                <button type="button" onClick={clearCartData} className="cursor-pointer"><span>Clear Cart</span></button>
              </div> */}

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-end sm:justify-end !mt-6">
                <button
                  className="!px-5 !py-3 bg-[var(--primary)] text-white rounded hover:bg-[var(--primary-hover)] transition-colors flex-1 sm:flex-none inline-flex items-center justify-center gap-2"
                >
                  <Shuffle size={16} />
                  Update Cart
                </button>
                <button
                  className="!px-5 !py-3 bg-[var(--primary)] text-white rounded hover:bg-[var(--primary-hover)] transition-colors flex-1 sm:flex-none inline-flex items-center justify-center gap-2"
                >
                  <Handbag size={16} />
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* icon  */}
          <div className="relative flex items-center !my-8">
            <div className="flex-grow border-t border-[var(--border-color)]"></div>
            <div className="flex-shrink-0 mx-4">
              <FingerprintPattern size={30} className="text-[var(--text-muted)]" />
            </div>
            <div className="flex-grow border-t border-[var(--border-color)]"></div>
          </div>
          
          {/* Cart  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 !mt-10">
            {/* Left Column */}
            <div className="flex flex-col gap-6">

              <div className="!p-6">
                <h3 className="text-lg font-semibold !mb-4">Calculate Shipping</h3>
                <div className="!mb-4">
                  <span className="text-sm text-[var(--text-muted)]">Flat rate: </span>
                  <span className="font-semibold text-[var(--primary)]">5%</span>
                </div>

                <select className="w-full sm:w-64 md:w-60 border border-[var(--border-color)] rounded !p-3 !mb-3 text-[var(--text-muted)] bg-white" >
                  <option>Choose a option...</option>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                <div className="flex flex-col sm:flex-row gap-3 !mb-4">
                  <input
                    type="text"
                    placeholder="State / Country"
                    className="w-full sm:flex-1 border border-[var(--border-color)] rounded !p-3 text-[var(--text-muted)]"
                  />
                  <input
                    type="text"
                    placeholder="PostCode / ZIP"
                    className="w-full sm:flex-1 border border-[var(--border-color)] rounded !p-3 text-[var(--text-muted)]"
                  />
                </div>

                <button className="w-full sm:w-auto !px-5 !py-3 bg-[var(--primary)] text-white rounded hover:bg-[var(--primary-hover)] transition-colors inline-flex items-center justify-center gap-2">
                  <Shuffle size={16} />
                  Update Cart
                </button>
              </div>

              <div className="!p-6">
                <h3 className="text-lg font-semibold !mb-4">Apply Coupon</h3>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Enter Your Coupon"
                    className="w-full sm:flex-1 border border-[var(--border-color)] rounded !p-3 text-[var(--text-muted)]"
                  />
                  <button className="w-full sm:w-auto !px-5 !py-3 bg-[var(--primary)] text-white rounded hover:bg-[var(--primary-hover)] transition-colors inline-flex items-center justify-center gap-2">
                    <Tag size={16} />
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="border border-[var(--border-color)] rounded !p-6 h-fit">
              <h3 className="text-lg font-semibold !mb-4">Cart Totals</h3>
              <table className="w-full border-collapse border border-[var(--border-color)]">
                <tbody>
                  <tr className="border-b border-[var(--border-color)]">
                    <td className="border-r border-[var(--border-color)] !py-3 !px-4 text-[var(--text-muted)]">Cart Subtotal</td>
                    <td className="!py-3 !px-4 text-left font-semibold text-lg text-[var(--primary)]">
                      ${cartItems.reduce((total, item:any) => total + (item.price * item.quantity), 0).toFixed(2)}
                    </td>
                  </tr>

                  <tr className="border-b border-[var(--border-color)]">
                    <td className="border-r border-[var(--border-color)] !py-3 !px-4 text-[var(--text-muted)]">Shipping</td>
                    <td className="!py-3 !px-4 text-left text-[var(--text-muted)]">Free Shipping</td>
                  </tr>

                  <tr>
                    <td className="border-r border-[var(--border-color)] !py-3 !px-4 text-[var(--text-muted)] ">Total</td>
                    <td className="!py-3 !px-4 text-leftt font-semibold text-lg text-[var(--primary)]">
                      ${cartItems.reduce((total, item:any) => total + (item.price * item.quantity), 0).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                className=" w-full !px-5 !py-3 !mt-7 bg-[var(--primary)] text-white rounded hover:bg-[var(--primary-hover)] transition-colors flex-1 sm:flex-none inline-flex items-center justify-center gap-2"
              >
                <CreditCard size={16} />
                Proceed to Ckeckout
              </button>
            </div>
          </div>


        </div>
      </main >
      </>)}
      

    </>
  )
}