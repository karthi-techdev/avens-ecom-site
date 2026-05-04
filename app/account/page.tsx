"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { CiLocationOn, CiShoppingCart, CiUser } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { VscSettings } from "react-icons/vsc";
import { IoIosLogOut } from "react-icons/io";
import { Country, State, City } from "country-state-city";
import { useSearchParams } from "next/navigation";


import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

 import { isValidPhoneNumber } from "react-phone-number-input";
import Select from "react-select";


export default function AccountPage() {


  const [activeTab, setActiveTab] = useState("dashboard");
    const searchParams = useSearchParams();
  useEffect(() => {
  const tab = searchParams.get("tab");
  if (tab === "address") {
    setActiveTab("address");
  }
}, [searchParams]);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);


  // --- DYNAMIC DATA STATES ---
  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  // Address State
  const [addresses, setAddresses] = useState<any[]>([]);
  const [addressErrors, setAddressErrors] = useState<any>({});
  const [newAddress, setNewAddress] = useState({
    type: "",
    fullName: "",
    phone: "",
    street: "",
    country: "",
    countryCode: "", // Added for logic
    state: "",
    stateCode: "",   // Added for logic
    city: "",
    pincode: ""
  });
  // Dynamic Change Handlers
  const [maxPhoneLength, setMaxPhoneLength] = useState<number>(15);
const countryOptions = countries.map(item => {
  return {
     value: item.isoCode, label: item.name 
  }
})

const stateOptions = useMemo(() => {
  if(newAddress.countryCode) {
    return states.map(item => {
      return {
        value: item.isoCode, label: item.name 
      }
    })
  } 
  return []
},[newAddress.countryCode])


const cityOptions = useMemo(() => {
  if (newAddress.stateCode) {
    return cities.map(item => {
      return {
        value: item.name,
        label: item.name
      }
    })
  }
  return []
}, [cities, newAddress.stateCode])

  // const onCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const code = e.target.value;
  //   const countryName = Country.getCountryByCode(code)?.name || "";
  //   const phoneCode = Country.getCountryByCode(code)?.phonecode || "";


  //   // Dynamic Max Length Calculation
  // let length = 15; // default
  // if (code === "IN") {
  //   length = 10; // India: only 10 digits
  // } else {
  //   try {
  //     const example = getExampleNumber(code, examples);
  //     if (example) {
  //       length = example.formatNational().replace(/\D/g, "").length;
  //     }
  //   } catch (error) {
  //     length = 15;
  //   }
  // }
  //  setMaxPhoneLength(length);
  //   setNewAddress({ 
  //     ...newAddress, 
  //     country: countryName, 
  //     countryCode: code, 
  //     state: "", 
  //     city: "",
  //     phone: `+${phoneCode} ` // Automatically adds country phone code
  //   });
  //   setStates(State.getStatesOfCountry(code));
  //   setCities([]);

  //   setAddressErrors((prev: any) => ({ ...prev, countryCode: "" }));
  // };

   const onCountryChange = (selectedCountryItem: any) => {
    const code =selectedCountryItem.value;
    const countryName = Country.getCountryByCode(code)?.name || "";
    const phoneCode = Country.getCountryByCode(code)?.phonecode || "";

    setNewAddress({ 
      ...newAddress, 
      country: countryName, 
      countryCode: code, 
      state: "", 
      city: "",
      phone: `+${phoneCode} ` // Automatically adds country phone code
    });
    setStates(State.getStatesOfCountry(code));
    setCities([]);
    setAddressErrors((prev: any) => ({ ...prev, countryCode: "" }));
  };

  const onStateChange = (e: any) => {
    const code = e.value;
    const stateName = State.getStateByCodeAndCountry(code, newAddress.countryCode)?.name || "";
    setNewAddress({ ...newAddress, state: stateName, stateCode: code, city: "" });
    setCities(City.getCitiesOfState(newAddress.countryCode, code));

    setAddressErrors((prev: any) => ({ ...prev, stateCode: "" }));
  };
  

  const onCityChange = (selectedCity: any) => {
  const cityName = selectedCity ? selectedCity.value : "";

  setNewAddress({
    ...newAddress,
    city: cityName
  });

  setAddressErrors((prev: any) => ({
    ...prev,
    city: ""
  }));
};

  // logout
  const router = useRouter();
  const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/");
};

  
  const validateAddressField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "type":
        if (!value.trim()) error = "Address type is required";
        break;

      case "fullName":
        if (!value.trim()) error = "Full name is required";
        else if (value.length < 3) error = "Minimum 3 characters required";
        else if (!/^[A-Za-z ]+$/.test(value)) error = "Only letters allowed";
        break;

    case "phone":
      const digitsOnly = value.replace(/\D/g, ""); 
      if (!value.trim()) {
        error = "Phone number is required";
      } else if(!isValidPhoneNumber(value)) {
        error = `Please enter valid phone number`;
      }
      break;

      case "street":
        if (!value.trim()) error = "Street address is required";
        else if (value.length < 5) error = "Minimum 5 characters required";
        break;

      case "state":
        if (!value.trim()) error = "State is required";
        break;

      case "city":
        if (cities.length > 0 && !value.trim()) {
          error = "City is required";
        }
      break;

          case "pincode":
        if (!value.trim()) {
          error = "Pincode is required";
        } 
        else if (/[^0-9]/.test(value)) {
          error = "Enter only numbers";
        } 
        
        break;

      case "country":
        if (!value.trim()) error = "Country is required";
        break;

        case "countryCode": 
        if (!value.trim()) error = "Country is required";
        break;
      case "stateCode":
        if (states.length > 0 && !value.trim()) {
          error = "State is required";
        }
        break;

    }
    return error;
  };

  // Address Input Change
 const handleAddressChange = (e: any) => {
  const { name, value } = e.target;

  setNewAddress({ ...newAddress, [name]: value });
  const errorMsg = validateAddressField(name, value);
  setAddressErrors((prev: any) => ({ ...prev, [name]: errorMsg }));
};


  // Address Validation for Save Button
  const validateAddressForm = () => {
  let tempErrors: any = {};
  let isValid = true;

  // Always required fields
  const requiredFields = [
    "type",
    "fullName",
    "phone",
    "street",
    "countryCode",
    "pincode"
  ];

  requiredFields.forEach((field) => {
    const error = validateAddressField(field, (newAddress as any)[field]);
    if (error) {
      tempErrors[field] = error;
      isValid = false;
    }
  });

  // Only validate state if states exist
  if (states.length > 0) {
    const stateError = validateAddressField("stateCode", newAddress.stateCode);
    if (stateError) {
      tempErrors.stateCode = stateError;
      isValid = false;
    }
  }

  // Only validate city if cities exist
  if (cities.length > 0 && newAddress.stateCode) {
    const cityError = validateAddressField("city", newAddress.city);
    if (cityError) {
      tempErrors.city = cityError;
      isValid = false;
    }
  }

  setAddressErrors(tempErrors);
  return isValid;
};

  // Save Address
  const handleSaveAddress = () => {
    if (!validateAddressForm()) return;

    if (editIndex !== null) {
      const updated = [...addresses];
      updated[editIndex] = newAddress;
      setAddresses(updated);
      setEditIndex(null);
    } else {
      setAddresses([...addresses, newAddress]);
    }

   setNewAddress({ type: "", fullName: "", phone: "", street: "", country: "", countryCode: "", state: "", stateCode: "", city: "", pincode: "" });
    setIsAdding(false);
   
  };


  
  // Account Details Logic
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", displayName: "", email: "", currentPassword: "", newPassword: "", confirmPassword: ""
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const validateValue = validateFormData(name, value);
    setErrors({ ...errors, [name]: validateValue });
  };

  function formatFieldName(name: string) {
    const formatted = name.replace(/([A-Z])/g, " $1").toLowerCase();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  function validateFormData(name: string, value: string): string {
    if (!value) return `${formatFieldName(name)} is required`;
    switch (name) {
      case "firstName":
      case "displayName":
        if (value.length < 3) return "Please enter atleast 3 characters";
        break;
      case "email":
        if (!emailRegex.test(value)) return "Please enter valid email";
        break;
      case "currentPassword":
      case "newPassword":
        if (!passwordRegex.test(value)) return "6+ chars, 1 number & 1 special char required";
        break;
      case "confirmPassword":
        if (value !== formData.newPassword) return "Passwords do not match";
        break;
    }
    return "";
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="border border-[#e5e5e5] rounded-md overflow-hidden bg-white mb-10 text-left">
            <div className="bg-[#f7f8f9] px-[22px] py-4 border-b border-[#e5e5e5]">
              <h3 className="text-[17px] font-semibold text-[#333] m-0">Hello Rosie!</h3>
            </div>
            <div className="p-[22px]">
              <p className="text-[15px] leading-[1.8] text-[#555] m-0">
                From your account dashboard.you can easily check & view your <span className="text-[#046963] font-medium cursor-pointer hover:underline">recent orders</span>, manage your <span className="text-[#046963] font-medium cursor-pointer hover:underline">shipping and billing addresses</span> and <span className="text-[#046963] font-medium cursor-pointer hover:underline">edit your password and account details</span>.
              </p>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="border border-[#e5e5e5] rounded-md bg-white overflow-hidden mb-10 shadow-sm text-left">
            <div className="bg-[#f7f8f9] px-[22px] py-4 border-b border-[#e5e5e5]">
              <h3 className="text-[17px] font-semibold text-[#333] m-0">Your Orders</h3>
            </div>
            <div className="p-4 md:p-5">
              <table className="w-full border-collapse block md:table">
                <thead className="hidden md:table-header-group">
                  <tr className="bg-[#f8f9fa]">
                    <th className="border border-[#ddd] p-3 text-sm font-semibold text-black">Order</th>
                    <th className="border border-[#ddd] p-3 text-sm font-semibold text-black">Date</th>
                    <th className="border border-[#ddd] p-3 text-sm font-semibold text-black">Status</th>
                    <th className="border border-[#ddd] p-3 text-sm font-semibold text-black">Total</th>
                    <th className="border border-[#ddd] p-3 text-sm font-semibold text-black">Actions</th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group">
                  {[{ id: "#1357", date: "March 45, 2020", status: "Processing", total: "$125.00 for 2 item" },
                    { id: "#2468", date: "June 29, 2020", status: "Completed", total: "$364.00 for 5 item" },
                    { id: "#2366", date: "August 02, 2020", status: "Completed", total: "$280.00 for 3 item" }].map((row, i) => (
                    <tr key={i} className="block md:table-row border border-[#eee] md:border-none mb-6 md:mb-0 rounded-lg md:rounded-none overflow-hidden text-center md:text-left">
                      <td className="block md:table-cell border-b md:border border-[#eee] md:border-[#ddd] p-3 text-sm text-[#444]">{row.id}</td>
                      <td className="block md:table-cell border-b md:border border-[#eee] md:border-[#ddd] p-3 text-sm text-[#444]">{row.date}</td>
                      <td className="block md:table-cell border-b md:border border-[#eee] md:border-[#ddd] p-3 text-sm text-[#444]">{row.status}</td>
                      <td className="block md:table-cell border-b md:border border-[#eee] md:border-[#ddd] p-3 text-sm text-[#444] font-medium">{row.total}</td>
                      <td className="block md:table-cell border-b md:border border-[#eee] md:border-[#ddd] p-3 text-sm">
                        <span className="text-[#046963] font-bold cursor-pointer hover:underline">View</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "track":
        return (
          <div className="border border-[#e5e5e5] rounded-md overflow-hidden bg-white mb-10 text-left">
            <div className="bg-[#f7f8f9] px-[22px] py-4 border-b border-[#e5e5e5]">
              <h3 className="text-[17px] font-semibold m-0">Orders tracking</h3>
            </div>
            <div className="p-[25px]">
              <p className="text-sm leading-[1.7] text-[#465b52] mb-[25px]">
                To track your order please enter your OrderID in the box below and press "Track" button. 
                <span className=" text-[#465b52]"> This was given to you on your receipt and in the confirmation email you should have received.</span>
              </p>
              <label className="block mb-[6px] text-sm font-medium text-black">Order ID</label>
              <input type="text" placeholder="Found in your order confirmation email" className="w-full p-3 mb-5 placeholder:text-sm border border-[#ddd] rounded outline-none focus:border-[#046963]" />
              <label className="block mb-[6px] text-sm font-medium text-black">Billing email</label>
              <input type="email" placeholder="Email you used during checkout" className="w-full p-3 mb-5  placeholder:text-sm border border-[#ddd] rounded outline-none focus:border-[#046963]" />
              <button className="bg-[#046963] text-white px-7 py-3 rounded text-sm hover:opacity-90">Track</button>
            </div>
          </div>
        );

      case "address":
        return (
          <div className="border border-[#e5e5e5] rounded-md bg-white overflow-hidden mb-10 text-left">
            <div className="bg-[#f7f8f9] px-[22px] py-4 border-b border-[#e5e5e5] flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <h3 className="text-[17px] font-semibold m-0">My Address</h3>
              {!isAdding && (
                <button onClick={() => { setIsAdding(true); setEditIndex(null); setAddressErrors({}); }} className="bg-[#046963] text-white px-5 py-2 rounded text-sm font-medium hover:opacity-90 w-full md:w-auto">Add New Address</button>
              )}
            </div>

            <div className="p-[25px]">
              {isAdding && (
                <div className="flex flex-col gap-5">
                  <h4 className="text-[17px] font-semibold mb-5 text-black border-b pb-3">{editIndex !== null ? "Edit Address" : "Add New Address"}</h4>
                  <div>
                    <label className="block text-sm font-medium mb-[6px] text-black">Address Type <span className="text-red-600">*</span></label>
                    <input name="type" value={newAddress.type} onChange={handleAddressChange} placeholder="Enter address type" className={`w-full p-3 border rounded text-sm outline-none focus:border-[#046963] ${addressErrors.type ? 'border-red-500' : 'border-[#ddd]'}`} />
                    {addressErrors.type && <p className="text-red-600 text-[12px] mt-1">{addressErrors.type}</p>}
                  </div>

                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-[6px] text-black">Full Name <span className="text-red-600">*</span></label>
                      <input name="fullName" value={newAddress.fullName} onChange={handleAddressChange}placeholder="Enter name" className={`w-full p-3 border rounded text-sm outline-none ${addressErrors.fullName ? 'border-red-500' : 'border-[#ddd]'}`} />
                      {addressErrors.fullName && <p className="text-red-600 text-[12px] mt-1">{addressErrors.fullName}</p>}
                    </div>
                   
                  <div className="flex-1">
                      <label className="block text-sm font-medium mb-[6px] text-black">Phone Number <span className="text-red-600">*</span></label>
                      { <input name="phone" type="text"value={newAddress.phone} min="7" max="15" onChange={handleAddressChange} placeholder="Enter phone number"className={`w-full p-3 border rounded text-sm outline-none focus:border-[#046963] ${addressErrors.phone ? 'border-red-500' : 'border-[#ddd]' }`} /> }
    
                      {addressErrors.phone && (<p className="text-red-600 text-[12px] mt-1">{addressErrors.phone}</p> )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-[6px] text-black">Street Address <span className="text-red-600">*</span></label>
                    <input name="street" value={newAddress.street} onChange={handleAddressChange} placeholder="Enter address"className={`w-full p-3 border rounded text-sm outline-none ${addressErrors.street ? 'border-red-500' : 'border-[#ddd]'}`} />
                    {addressErrors.street && <p className="text-red-600 text-[12px] mt-1">{addressErrors.street}</p>}
                  </div>

                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">Country <span className="text-red-600">*</span></label>
                      {/* <select name="countryCode" value={newAddress.countryCode} onChange={onCountryChange} className={`w-full p-3 border rounded text-sm outline-none bg-white focus:border-[#046963] 
        ${addressErrors.countryCode ? 'border-red-500' : 'border-[#ddd]'} 
        ${!newAddress.countryCode ? 'text-[#9ca3af]' : 'text-black'}`}>
                        <option value="">Select Country</option>
                        {countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                      </select> */}
                      <Select 
                      options={countryOptions} onChange={onCountryChange}
                      styles={{
                        control:(provided,state) => ({
                          ...provided,
                          minHeight: "41px",
                          borderColor: `${addressErrors.countryCode ? 'red' : 'lightgrey'}`
                        })
                      }}  
                      />
                       {addressErrors.countryCode && <p className="text-red-600 text-[12px] mt-1">{addressErrors.countryCode}</p>} 
                   
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-[6px] text-black">State </label>
                      {/* <select name="stateCode" value={newAddress.stateCode} onChange={onStateChange} disabled={!newAddress.countryCode} className={`w-full p-3 border rounded text-sm outline-none bg-white focus:border-[#046963] 
      ${addressErrors.stateCode ? 'border-red-500' : 'border-[#ddd]'} 
      ${!newAddress.stateCode ? 'text-[#9ca3af]' : 'text-black'}`}>
                        <option value="">Select State</option>
                        {states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                      </select> */}
                       <Select 
                      options={stateOptions} onChange={onStateChange}
                      styles={{
                        control:(provided,state) => ({
                          ...provided,
                          minHeight: "41px",
                          borderColor: `${addressErrors.stateCode ? 'red' : 'lightgrey'}`
                        })
                      }}  
                      />
                      {addressErrors.stateCode && (<p className="text-red-600 text-[12px] mt-1">{addressErrors.stateCode}</p>)}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1">
                     <label className="block text-sm font-medium mb-[6px] text-black">City </label>
                      {/* <select name="city" value={newAddress.city} onChange={handleAddressChange} disabled={!newAddress.stateCode} className={`w-full p-3 border rounded text-sm outline-none bg-white focus:border-[#046963] 
      ${addressErrors.city ? 'border-red-500' : 'border-[#ddd]'} 
      ${!newAddress.city ? 'text-[#9ca3af]' : 'text-black'}`}>
                        <option value="">Select City</option>
                        {cities.map(ct => <option key={ct.name} value={ct.name}>{ct.name}</option>)}
                      </select> */}
                      <Select
                      options={cityOptions} onChange={onCityChange}
                      isDisabled={!newAddress.stateCode}
                      styles={{
                        control:(provided) => ({
                          ...provided,
                          backgroundColor: "white",
                          minHeight: "41px",
                          borderColor: newAddress.stateCode && addressErrors.city ? 'red' : 'lightgrey'
                        })
                      }}  
                      />
                      {addressErrors.city && (<p className="text-red-600 text-[12px] mt-1">{addressErrors.city}</p>)}
                    </div>


                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-[6px] text-black">Pincode <span className="text-red-600">*</span></label>
                     <input name="pincode"type="text" value={newAddress.pincode} onChange={handleAddressChange} className={`w-full p-3 border rounded text-sm outline-none ${ addressErrors.pincode ? 'border-red-500' : 'border-[#ddd]' }`}/>
                      {addressErrors.pincode && <p className="text-red-600 text-[12px] mt-1">{addressErrors.pincode}</p>}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-3">
                    <button onClick={handleSaveAddress} className="bg-[#046963] text-white px-[30px] py-3 rounded text-sm hover:opacity-90">Save Address</button>
                    <button onClick={() => { setIsAdding(false); setEditIndex(null); setAddressErrors({}); }} className="bg-[#f1f1f1] text-black px-[30px] py-3 rounded text-sm">Cancel</button>
                  </div>
                </div>
              )}

              {!isAdding && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                  {addresses.map((addr, index) => (
                    <div key={index} className="border border-[#e5e5e5] rounded-md overflow-hidden bg-white">
                      <div className="bg-[#f7f8f9] px-[18px] py-3 border-b border-[#e5e5e5] font-medium text-black">{addr.type}</div>
                      <div className="p-[18px] text-sm text-[#555] leading-[1.8]">
                        <p className="font-bold text-black">{addr.fullName}</p>
                        <p>{addr.street}</p>
                        <p>{addr.city}, {addr.state}, {addr.country} - {addr.pincode}</p>
                        <p>Phone: {addr.phone}</p>
                        <button onClick={() => { setNewAddress(addr); setEditIndex(index); setIsAdding(true); }} className="text-[#046963] font-medium mt-3 hover:underline">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "details":
        return (
          <div className="border border-[#e5e5e5] rounded-md bg-white overflow-hidden mb-10 text-left">
            <div className="bg-[#f7f8f9] px-[22px] py-4 border-b border-[#e5e5e5]">
              <h3 className="text-[17px] font-semibold m-0 text-black">Account Details</h3>
            </div>
            <form className="p-[25px]" onSubmit={(e) => {
              e.preventDefault();
              let newErrors: any = {};
              (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
                const error = validateFormData(key, formData[key]);
                if (error) newErrors[key] = error;
              });
              setErrors(newErrors);
              if (Object.values(newErrors).every(err => err === "")) setSuccess("Account details saved successfully!");
              else setSuccess("");
            }}>
              <p className="text-sm mb-[25px] text-[#555]">Already have an account? <span className="text-[#046963] cursor-pointer hover:underline font-medium">Log in instead!</span></p>

              <div className="flex flex-col md:flex-row gap-5 mb-5">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-[6px] text-black">First Name <span className="text-red-600">*</span></label>
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} className={`w-full p-3 border rounded text-sm outline-none ${errors.firstName ? "border-red-500" : "border-[#ddd]"}`} />
                  {errors.firstName && <p className="text-red-600 text-[13px] mt-1">{errors.firstName}</p>}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-[6px] text-black">Last Name <span className="text-red-600">*</span></label>
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} className={`w-full p-3 border rounded text-sm outline-none ${errors.lastName ? "border-red-500" : "border-[#ddd]"}`} />
                  {errors.lastName && <p className="text-red-600 text-[13px] mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-[6px] text-black">Display Name <span className="text-red-600">*</span></label>
                <input name="displayName" value={formData.displayName} onChange={handleInputChange} className={`w-full p-3 border rounded text-sm outline-none ${errors.displayName ? "border-red-500" : "border-[#ddd]"}`} />
                {errors.displayName && <p className="text-red-600 text-[13px] mt-1">{errors.displayName}</p>}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-[6px] text-black">Email <span className="text-red-600">*</span></label>
                <input name="email" value={formData.email} onChange={handleInputChange} className={`w-full p-3 border rounded text-sm outline-none ${errors.email ? "border-red-500" : "border-[#ddd]"}`} />
                {errors.email && <p className="text-red-600 text-[13px] mt-1">{errors.email}</p>}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-[6px] text-black">Current Password <span className="text-red-600">*</span></label>
                <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleInputChange} className={`w-full p-3 border rounded text-sm outline-none ${errors.currentPassword ? "border-red-500" : "border-[#ddd]"}`} />
                {errors.currentPassword && <p className="text-red-600 text-[13px] mt-1">{errors.currentPassword}</p>}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-[6px] text-black">New Password <span className="text-red-600">*</span></label>
                <input type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} className={`w-full p-3 border rounded text-sm outline-none ${errors.newPassword ? "border-red-500" : "border-[#ddd]"}`} />
                {errors.newPassword && <p className="text-red-600 text-[13px] mt-1">{errors.newPassword}</p>}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-[6px] text-black">Confirm Password <span className="text-red-600">*</span></label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className={`w-full p-3 border rounded text-sm outline-none ${errors.confirmPassword ? "border-red-500" : "border-[#ddd]"}`} />
                {errors.confirmPassword && <p className="text-red-600 text-[13px] mt-1">{errors.confirmPassword}</p>}
              </div>

              <button type="submit" className="bg-[#046963] text-white px-[30px] py-3 rounded text-sm hover:opacity-90">Save</button>
              {success && <p className="text-green-600 text-sm mt-[10px] font-bold">{success}</p>}
            </form>
          </div>
        );
      default: return <div className="p-10 text-black text-left">Click on Sidebar menus to view content.</div>;
    }
  };

  return (
    <div className="w-full font-['Poppins',sans-serif]">
      <div className="w-full bg-[#f8f9fa] mb-[60px] p-[18px]">
        <div className="w-[100%] mx-auto text-sm text-[#777] flex items-center">
          <Link href="/" className="text-[#3bb77e] no-underline font-medium hover:underline">Home</Link>
          <span className="mx-2 text-[#aaa]">›</span><span>Pages</span><span className="mx-2 text-[#aaa]">›</span><span className="font-medium text-[#333]">Account</span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-[20px] w-full max-w-[1200px] mx-auto px-4">
        <div className="w-full lg:w-[313px] border border-[#e5e5e5] rounded-md overflow-hidden bg-white h-fit">
          <SidebarBtn icon={<VscSettings />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <SidebarBtn icon={<LiaShoppingBagSolid />} label="Orders" active={activeTab === "orders"} onClick={() => setActiveTab("orders")} />
          <SidebarBtn icon={<CiShoppingCart />} label="Track Your Order" active={activeTab === "track"} onClick={() => setActiveTab("track")} />
          <SidebarBtn icon={<CiLocationOn />} label="My Address" active={activeTab === "address"} onClick={() => setActiveTab("address")} />
          <SidebarBtn icon={<CiUser />} label="Account Details" active={activeTab === "details"} onClick={() => setActiveTab("details")} />
          <Dialog>
        <DialogTrigger asChild>
          <Button className={`w-full justify-start px-[18px] py-7 rounded-none border-b border-[#eee] transition-all 
        ${activeTab === "logout" 
          ? "!bg-[#046963] !text-white hover:!bg-[#046963] hover:!text-white" // Force Dark Green & White Text
          : "bg-white text-[#333] hover:bg-[#f5f5f5]" 
        }`}>
         
      <div className="w-5 flex justify-center mr-[-12px]">
        <IoIosLogOut className={`text-xl ${activeTab === "logout" ? "text-white" : "text-[#333]"}`} />
      </div>
      
      <span className="font-medium text-sm ml-[10px]">Logout</span>
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              You will be logged out of your account.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="ghost" className="bg-[#046963] text-white hover:bg-[#046963] hover:text-white transition-none" 
    onClick={handleLogout}>
              Yes, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        </div>
        <div className="flex-1 w-full lg:w-[650px]">{renderContent()}</div>
      </div>
    </div>
  );
}

function SidebarBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-[10px] p-[18px] text-left border-b border-[#eee] text-sm transition-all ${active ? "bg-[#046963] text-white font-medium" : "bg-white text-[#333] hover:bg-[#f5f5f5]"}`}>
      <span className="text-base">{icon}</span>{label}
    </button>
  );
}


