"use client";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { RiCoupon5Line } from "react-icons/ri";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";
import { useShippingStore } from "../../store/shippingStore";
import { API } from "@/lib/urls";
import Swal from "sweetalert2";

const staticAddresses = [
  {
    id: 1,
    type: "Home",
    fullName: "Kanika Sri",
    street: "123 Main Street",
    city: "Addanki",
    state: "Andhra Pradesh",
    country: "India",
    pincode: "607002",
    phone: "+91 8825607688"
  },
  {
    id: 2,
    type: "Office",
    fullName: "Kanika Sri",
    street: "Tech Park Road",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    pincode: "600096",
    phone: "+91 8825607688"
  },
  {
    id: 3,
    type: "Hostel",
    fullName: "Kanika Sri",
    street: "Near College",
    city: "Villupuram",
    state: "Tamil Nadu",
    country: "India",
    pincode: "605602",
    phone: "+91 8825607688"
  },
  {
    id: 4,
    type: "Other",
    fullName: "Kanika Sri",
    street: "Some Street",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    pincode: "560001",
    phone: "+91 8825607688"
  },
  {
    id: 5,
    type: "Home",
    fullName: "Kanika Sri",
    street: "123 Main Street",
    city: "Addanki",
    state: "Andhra Pradesh",
    country: "India",
    pincode: "607002",
    phone: "+91 8825607688"
  },
  {
    id: 6,
    type: "Office",
    fullName: "Kanika Sri",
    street: "Tech Park Road",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    pincode: "600096",
    phone: "+91 8825607688"
  },
  {
    id: 7,
    type: "Hostel",
    fullName: "Kanika Sri",
    street: "Near College",
    city: "Villupuram",
    state: "Tamil Nadu",
    country: "India",
    pincode: "605602",
    phone: "+91 8825607688"
  },
  {
    id: 8,
    type: "Other",
    fullName: "Kanika Sri",
    street: "Some Street",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    pincode: "560001",
    phone: "+91 8825607688"
  }
    
];
export default function checkoutPage() {

  const handlePlaceOrder = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user?._id) {
  Swal.fire("Error", "User not logged in", "error");
  return;
}

if (!selectedShipment) {
  Swal.fire("Error", "Please select shipping method", "warning");
  return;
}

if (!paymentMethod) {
  Swal.fire("Error", "Please select payment method", "warning");
  return;
}



    
    const address = staticAddresses.find(a => a.id === selectedAddress);

    if (!address) {
  Swal.fire("Error", "Please select address", "warning");
  return;
}

    const products = cartItems.map((item: any) => ({
      productId: item.productId._id,
      productName: item.productId.name,
      quantity: item.quantity,
      price: item.productId.price
    }));

    const orderData = {
      customerId: user._id,
      customerName: address.fullName,
      customerEmail: user.email, 
      customerPhone: address.phone,
      shippingAddress: `${address.street}, ${address.city}, ${address.state}, ${address.country} - ${address.pincode}`,
      products,
      totalAmount: finalTotal,
      shippingMethod: selectedShipment.name,
      shippingPrice: selectedShipment.price,
      paymentMethod: paymentMethod,
    };

    const res = await fetch(API.createOrder, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (data.success) {
     Swal.fire({
    icon: "success",
    title: "Order Placed!",
    text: "Your order has been placed successfully 🎉",
    confirmButtonColor: "var(--primary)",
  });
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    Swal.fire({
    icon: "error",
    title: "Something went wrong",
    text: "Please try again later",
  });
  }
};

  const {
    shipmentMethods,
    selectedShipment,
    fetchShipmentMethods,
    setSelectedShipment
  } = useShippingStore();

  useEffect(() => {
    fetchShipmentMethods();
  }, []);
  const { cartItems, getAllCart } = useCartStore();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user?._id) {
      router.replace("/");
      return;
    }

    getAllCart(user._id);
  }, []);
  const [countries] = useState(Country.getAllCountries());
  const [loginOption, setLoginOption] = useState(false);
  const [couponOption, setCouponOption] = useState(false);
  const [accountOption, setAccountOption] = useState(false);
  const [shipmentOption, setShipmentOption] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const router = useRouter();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user") || '{}');
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
    const code = selectedCountryItem.value;
    const countryName = Country.getCountryByCode(code)?.name || "";
    const phoneCode = Country.getCountryByCode(code)?.phonecode || "";


  };

  const totalAmount = cartItems.reduce((total, item: any) => {

    const price =
      item.productId.discountPrice > 0
        ? item.productId.price - item.productId.discountPrice
        : item.productId.price;

    return total + price * item.quantity;
  }, 0);
  const shippingPrice = Number(selectedShipment?.price ?? 0);
  const finalTotal = totalAmount + shippingPrice;
  

  return (
    <main className="!py-[3rem] !mx-[2rem] md:!mx-[3rem] lg:!mx-[6rem]">
      <div className="flex flex-col lg:flex-row gap-[3rem] justify-between ">
        <div className="flex flex-col w-full gap-[2rem]">
          <div className="flex items-center !px-[1rem] !py-[1.3rem] border bg-[var(--bg-light)] border-[var(--border-color)] w-full !rounded-[0.6rem] text-[0.9rem]">
            <CiUser /> <h1 className="text-[var(--text-muted)] !ml-[0.6rem] font-medium">Already have an account? <button className="!text-[var(--primary)] cursor-pointer" onClick={() => { setLoginOption(!loginOption) }}>Click here to login</button></h1>
          </div>{
            loginOption ? <div className="border border-[var(--border-color)] p-[2rem] rounded-[0.8rem]">
              <p className="text-[0.8rem] font-semibold text-[var(--black)] mb-[2rem]">If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing & Shipping section.</p>
              <form>
                <input type="text" placeholder="Username or Email" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]" />
                <input type="password" placeholder="Password" className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]" />
                <div className="flex justify-between mb-[1rem]">
                  <div className="flex items-center">
                    <input type='checkbox' /><span className="text-[0.9rem] ml-[0.5rem]">Remember me</span>

                  </div>
                  <div>
                    <Link href={""} className="!text-[var(--primary)] font-semibold text-[0.8rem]">Forgot Password?</Link>
                  </div>
                </div>
                <button type="button" className="bg-[var(--primary)] rounded-[0.3rem] px-[1.3rem] text-center py-[0.7rem] font-semibold text-[var(--white)] hover:bg-[var(--primary-hover)] cursor-pointer">Login</button>
              </form>
            </div> : ""
          }

        </div>
        <div className="flex flex-col w-full gap-[2rem]">
          <div className="flex items-center !px-[1rem] !py-[1.3rem] border bg-[var(--bg-light)] border-[var(--border-color)] w-full rounded-[0.6rem] text-[0.9rem]">
            <RiCoupon5Line /><h1 className="text-[var(--text-muted)] !ml-[0.6rem] font-medium">Have a coupon? <button className="!text-[var(--primary)] cursor-pointer" onClick={() => { setCouponOption(!couponOption) }} >Click here to enter your code</button></h1>
          </div>{
            couponOption ? <div className="border border-[var(--border-color)] p-[2rem] rounded-[0.8rem]">
              <p className="text-[0.8rem] font-semibold text-[var(--black)] mb-[2rem]">If you have a coupon code, please apply it below.</p>
              <form>
                <input type="text" placeholder="Enter Coupon Code..." className="w-full rounded-[0.3rem] py-[0.6rem] px-[1rem] placeholder:text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]" />
                <button type="button" className="bg-[var(--primary)] rounded-[0.3rem] px-[1.3rem] text-center py-[0.7rem] font-semibold text-[var(--white)] hover:bg-[var(--primary-hover)] cursor-pointer">Apply Coupon</button>
              </form>
            </div> : ""
          }

        </div>
      </div>
      <div className=" !my-[3rem] before:content-[''] before:block before:h-[0.15rem] before:w-full before:bg-[var(--bg-light)] after:!mt-[0.1rem] after:content-[''] after:block after:h-[0.15rem] after:w-full after:bg-[var(--bg-light)]"></div>
      <div className="flex flex-col lg:flex-row gap-[2rem] items-start">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-[1.5rem]">
  <h1 className="font-semibold text-[var(--black)] text-[1.2rem]">
    Own Address
  </h1>

  <button
    type="button"
    onClick={() => router.push("/account?tab=address")}
    className="bg-[var(--primary)] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[var(--primary-hover)]"
  >
     Add New Address
  </button>
</div>
          <div className="max-h-[500px] overflow-y-auto pr-2">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            {staticAddresses.map((addr, index) => (
              <label
                key={index}
                className="border border-[#e5e5e5] rounded-md overflow-hidden bg-white cursor-pointer"
              >
                {/* Header */}
                <div className="bg-[#f7f8f9] px-[18px] py-3 border-b border-[#e5e5e5] flex items-center gap-3">

                  {/* Radio LEFT */}
                  <input
                    type="radio"
                    value={addr.id}
                    name="address"
                    checked={selectedAddress === addr.id}
                    onChange={() => setSelectedAddress(addr.id)}
                  />

                  {/* Title */}
                  <span className="font-medium text-black">{addr.type}</span>
                </div>

                {/* Body */}
                <div className="p-[18px] text-sm text-[#555] leading-[1.8]">
                  <p className="font-bold text-black">{addr.fullName}</p>
                  <p>{addr.street}</p>
                  <p>{addr.city}, {addr.state}, {addr.country} - {addr.pincode}</p>
                  <p>Phone: {addr.phone}</p>
                  <button
                    type="button"
                    className="text-[var(--primary)] font-medium mt-3 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </label>
            ))}
          </div>
          </div>
          <form>


            <label className="w-full block my-[1rem] font-semibold text-[var(--black)]">Additional information</label>
            <textarea className="w-full rounded-[0.3rem] pt-[1rem] pb-[8rem] px-[1rem] text-[0.8rem] border border-[var(--border-color)]  font-semibold outline-0 mb-[1rem]" placeholder="Order Notes" />
          </form>
        </div>
        <div className="w-[100%] lg:w-[50%] border overflow-auto border-[var(--border-color)] p-[1.5rem] rounded-[1rem] self-start">
          <h1 className="font-semibold text-[var(--black)] mb-[1.5rem] text-[1.2rem]">Your Orders</h1>
          <table className=" border border-collapse border-[var(--border-color)] w-full">
            <thead>
              <tr>
                <th className="  hidden md:table-cell border border-[var(--border-color)] text-[var(--black)] font-semibold py-[0.5rem]" colSpan={2}>Product</th>
                <th className="hidden md:table-cell border border-[var(--border-color)] text-[var(--black)] font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: any) => {
                const price =
                  item.productId.price -
                  item.productId.price * (item.productId.discountPrice / 100);

                return (
                  <tr key={item._id} className="block md:table-row  mb-4 md:mb-0">
                    {/* Image */}
                    <td className="block md:table-cell border border-[var(--border-color)] text-center">
                      <div className="flex justify-center items-center">
                        <img
                          src={`http://localhost:5000${item.productId.thumbnail}`}
                          className="w-20 h-20 m-[0.6rem]"
                          alt="product"
                        />
                      </div>
                    </td>

                    {/* Name + Quantity */}
                    <td className="block md:table-cell border border-[var(--border-color)] text-center">
                      <h3 className="text-[var(--primary)] font-semibold">
                        {item.productId.name}
                      </h3>
                      <p className="font-semibold">x {item.quantity}</p>
                    </td>

                    {/* Total */}
                    <td className="block md:table-cell border border-[var(--border-color)] text-center">
                      <span className="font-semibold">
                        ${(price * item.quantity).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td className="text-center py-[0.4rem]  border border-[var(--border-color)] text-[var(--black)] font-semibold"><span>SubTotal</span></td>
                <td className="text-center  text-[var(--black)] font-semibold border border-[var(--border-color)]" colSpan={2}><span>${totalAmount.toFixed(2)}</span></td>
              </tr>
              <tr>
                <td className="text-center py-[0.4rem]  border border-[var(--border-color)] text-[var(--black)] font-semibold"><span>Shipping</span></td>
                <td className="text-center py-[0.4rem]  border border-[var(--border-color)] text-[var(--black)] font-semibold" colSpan={2}><span>
                  {selectedShipment
                    ? `${selectedShipment.name} ($${selectedShipment.price})`
                    : "Select Shipping"}
                </span></td>
              </tr>
              <tr>
                <td className="text-center py-[0.4rem]  border border-[var(--border-color)] text-[var(--black)] font-semibold"><span>Total</span></td>
                <td className="text-center py-[0.4rem] text-[1.2rem] border border-[var(--border-color)] font-bold" colSpan={2}><span className="text-[var(--primary)] text-center">${finalTotal.toFixed(2)}</span></td>
              </tr>
            </tbody>
          </table>
          <h1 className="text-[var(--black)] font-semibold mt-[2rem] ">
            Shipping Method
          </h1>

          <div className=" rounded-[0.6rem] p-[1rem] ">
            {Array.isArray(shipmentMethods) &&
              shipmentMethods.map((method) => (
                <label
                  key={method._id}
                  className="flex justify-between items-center border border-[var(--border-color)] p-[1rem] rounded-[0.5rem] mb-[1rem] cursor-pointer md:w-[80%] sm:w-full"
                >
                  <div className="flex items-start gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      value={method._id}
                      checked={selectedShipment?._id === method._id}
                      onChange={() => setSelectedShipment(method)}
                      className="mt-1"
                    />

                    <div>
                      <p className="font-semibold">{method.name}</p>
                      <p className="text-sm text-gray-500">{method.description}</p>

                    </div>
                  </div>

                  <span className="font-semibold">${method.price}</span>
                </label>
              ))}
          </div>
          <h1 className="text-[var(--black)] font-semibold ">Payment</h1>
          <div className="rounded-[0.6rem] p-[1rem] ">

            {/* Bank Transfer */}
            <label className="flex justify-between items-center border border-[var(--border-color)] p-[1rem] rounded-[0.5rem] mb-[1rem] cursor-pointer md:w-[80%] sm:w-full">
              <div className="flex items-start gap-2">
                <input type="radio" name="payment" value="bank" className="mt-1" onChange={(e) => setPaymentMethod(e.target.value)}/>
                <p className="font-semibold">Direct Bank Transfer</p>
              </div>
            </label>

            {/* COD */}
            <label className="flex justify-between items-center border border-[var(--border-color)] p-[1rem] rounded-[0.5rem] mb-[1rem] cursor-pointer md:w-[80%] sm:w-full">
              <div className="flex items-start gap-2">
                <input type="radio" name="payment" value="cod" className="mt-1" onChange={(e) => setPaymentMethod(e.target.value)}/>
                <p className="font-semibold">Cash on Delivery</p>
              </div>
            </label>

            {/* Paypal */}
            <label className="flex justify-between items-center border border-[var(--border-color)] p-[1rem] rounded-[0.5rem] mb-[1rem] cursor-pointer md:w-[80%] sm:w-full">
              <div className="flex items-start gap-2">
                <input type="radio" name="payment" value="paypal" className="mt-1" onChange={(e) => setPaymentMethod(e.target.value)} />
                <p className="font-semibold">Paypal</p>
              </div>
            </label>

          </div>
          <div className="mt-[2rem]">
            <button
  type="button"
  onClick={handlePlaceOrder}
  className="bg-[var(--primary)] rounded-[0.3rem] px-[1.3rem] py-[0.7rem] font-semibold text-white"
>
  Place Order
</button>

          </div>
        </div>
      </div>
    </main>
  )

}
