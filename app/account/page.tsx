"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { CiLocationOn, CiShoppingCart, CiUser, CiLock } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { VscSettings } from "react-icons/vsc";
import { IoIosLogOut } from "react-icons/io";
import { Country, State, City } from "country-state-city";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import PhoneInput from "react-phone-number-input";
// @ts-ignore
import "react-phone-number-input/style.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
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
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // --- LOGIN / SIMULATED DB STATE ---
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ STATE FOR SEPARATE CHANGE PASSWORD VIEW
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState<any>({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  //for password
  const [showPassword, setShowPassword] = useState({
  current: false,
  new: false,
  confirm: false,
});

  // ✅ LOAD USER DATA ON MOUNT
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        displayName: user.displayName || user.firstName || "",
      }));
    }
  }, []);

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
    countryCode: "",
    state: "",
    stateCode: "",
    city: "",
    pincode: "",
  });

  const countryOptions = countries.map((item) => ({ value: item.isoCode, label: item.name }));

  const stateOptions = useMemo(() => {
    if (newAddress.countryCode) {
      return states.map((item) => ({ value: item.isoCode, label: item.name }));
    }
    return [];
  }, [newAddress.countryCode, states]);

  const cityOptions = useMemo(() => {
    if (newAddress.stateCode) {
      return cities.map((item) => ({ value: item.name, label: item.name }));
    }
    return [];
  }, [cities, newAddress.stateCode]);

  const onCountryChange = (selectedCountryItem: any) => {
    const code = selectedCountryItem.value;
    const countryName = Country.getCountryByCode(code)?.name || "";
    const phoneCode = Country.getCountryByCode(code)?.phonecode || "";

    setNewAddress({
      ...newAddress,
      country: countryName,
      countryCode: code,
      state: "",
      city: "",
      phone: `+${phoneCode} `,
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
    setNewAddress({ ...newAddress, city: cityName });
    setAddressErrors((prev: any) => ({ ...prev, city: "" }));
  };

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setFormData({
      firstName: "",
      lastName: "",
      displayName: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsLoggedIn(false);
    setIsLoggingIn(false);
    setIsChangingPassword(false);
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
        if (!value.trim()) error = "Phone number is required";
        else if (!isValidPhoneNumber(value)) error = `Please enter valid phone number`;
        break;
      case "street":
        if (!value.trim()) error = "Street address is required";
        else if (value.length < 5) error = "Minimum 5 characters required";
        break;
      case "pincode":
        if (!value.trim()) error = "Pincode is required";
        else if (/[^0-9]/.test(value)) error = "Enter only numbers";
        break;
      case "countryCode":
        if (!value.trim()) error = "Country is required";
        break;
    }
    return error;
  };

  const handleAddressChange = (e: any) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
    const errorMsg = validateAddressField(name, value);
    setAddressErrors((prev: any) => ({ ...prev, [name]: errorMsg }));
  };

  const validateAddressForm = () => {
    let tempErrors: any = {};
    let isValid = true;
    const requiredFields = ["type", "fullName", "phone", "street", "countryCode", "pincode"];
    requiredFields.forEach((field) => {
      const error = validateAddressField(field, (newAddress as any)[field]);
      if (error) {
        tempErrors[field] = error;
        isValid = false;
      }
    });
    setAddressErrors(tempErrors);
    return isValid;
  };

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
    setNewAddress({
      type: "",
      fullName: "",
      phone: "",
      street: "",
      country: "",
      countryCode: "",
      state: "",
      stateCode: "",
      city: "",
      pincode: "",
    });
    setIsAdding(false);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const validateValue = validateFormData(name, value);
    setErrors({ ...errors, [name]: validateValue });
  };

  const handleLoginChange = (e: any) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    let loginErrs: any = {};
    if (!loginFormData.email) loginErrs.email = "Email is required";
    else if (!emailRegex.test(loginFormData.email)) loginErrs.email = "Invalid email";
    if (!loginFormData.password) loginErrs.password = "Password is required";

    setLoginErrors(loginErrs);
    if (Object.keys(loginErrs).length !== 0) return;

    try {
      const res = await fetch("http://localhost:5000/api/v1/admin/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginFormData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setFormData({
        ...formData,
        firstName: data.user.firstName || "",
        lastName: data.user.lastName || "",
        email: data.user.email || "",
        displayName: data.user.displayName || data.user.firstName || "",
      });

      setIsLoggedIn(true);
      setIsLoggingIn(false);
      setIsChangingPassword(false);
      setSuccess("Logged in successfully!");
    } catch (err: any) {
      setLoginErrors({ api: err.message });
    }
  };

  function formatFieldName(name: string) {
    const formatted = name.replace(/([A-Z])/g, " $1").toLowerCase();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  // ✅ UPDATED VALIDATION FOR PASSWORDS
  function validateFormData(name: string, value: string): string {
    if (!value && name !== "lastName") return `${formatFieldName(name)} is required`;
    switch (name) {
      case "firstName":
      case "displayName":
        if (value.length < 3) return "Please enter at least 3 characters";
        break;
      case "email":
        if (!emailRegex.test(value)) return "Please enter valid email";
        break;
      case "newPassword":
        if (value.length < 6) return "Password must be at least 6 characters";
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
              <h3 className="text-[17px] font-semibold text-[#333] m-0">
                Hello {isLoggedIn ? formData.firstName : "Guest"}!
              </h3>
            </div>
            <div className="p-[22px]">
              <p className="text-[15px] leading-[1.8] text-[#555] m-0">
                From your account dashboard.you can easily check & view your{" "}
                <span className="text-[#046963] font-medium cursor-pointer hover:underline">recent orders</span>, manage
                your <span className="text-[#046963] font-medium cursor-pointer hover:underline">shipping and billing addresses</span>{" "}
                and <span className="text-[#046963] font-medium cursor-pointer hover:underline">edit your password and account details</span>.
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
                  {[
                    { id: "#1357", date: "March 45, 2020", status: "Processing", total: "$125.00 for 2 item" },
                    { id: "#2468", date: "June 29, 2020", status: "Completed", total: "$364.00 for 5 item" },
                    { id: "#2366", date: "August 02, 2020", status: "Completed", total: "$280.00 for 3 item" },
                  ].map((row, i) => (
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
                This was given to you on your receipt and in the confirmation email you should have received.
              </p>
              <label className="block mb-[6px] text-sm font-medium text-black">Order ID</label>
              <input type="text" placeholder="Found in your order confirmation email" className="w-full p-3 mb-5 border border-[#ddd] rounded outline-none focus:border-[#046963]" />
              <label className="block mb-[6px] text-sm font-medium text-black">Billing email</label>
              <input type="email" placeholder="Email you used during checkout" className="w-full p-3 mb-5 border border-[#ddd] rounded outline-none focus:border-[#046963]" />
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
                      <input name="fullName" value={newAddress.fullName} onChange={handleAddressChange} placeholder="Enter name" className={`w-full p-3 border rounded text-sm outline-none ${addressErrors.fullName ? 'border-red-500' : 'border-[#ddd]'}`} />
                      {addressErrors.fullName && <p className="text-red-600 text-[12px] mt-1">{addressErrors.fullName}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-[6px] text-black">Phone Number <span className="text-red-600">*</span></label>
                      <input name="phone" type="text" value={newAddress.phone} onChange={handleAddressChange} placeholder="Enter phone number" className={`w-full p-3 border rounded text-sm outline-none focus:border-[#046963] ${addressErrors.phone ? 'border-red-500' : 'border-[#ddd]'}`} />
                      {addressErrors.phone && <p className="text-red-600 text-[12px] mt-1">{addressErrors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-[6px] text-black">Street Address <span className="text-red-600">*</span></label>
                    <input name="street" value={newAddress.street} onChange={handleAddressChange} placeholder="Enter address" className={`w-full p-3 border rounded text-sm outline-none ${addressErrors.street ? 'border-red-500' : 'border-[#ddd]'}`} />
                    {addressErrors.street && <p className="text-red-600 text-[12px] mt-1">{addressErrors.street}</p>}
                  </div>
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">Country <span className="text-red-600">*</span></label>
                      <Select options={countryOptions} onChange={onCountryChange} styles={{ control: (provided) => ({ ...provided, minHeight: "41px", borderColor: addressErrors.countryCode ? 'red' : 'lightgrey' }) }} />
                      {addressErrors.countryCode && <p className="text-red-600 text-[12px] mt-1">{addressErrors.countryCode}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-[6px] text-black">State </label>
                      <Select options={stateOptions} onChange={onStateChange} styles={{ control: (provided) => ({ ...provided, minHeight: "41px", borderColor: addressErrors.stateCode ? 'red' : 'lightgrey' }) }} />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-[6px] text-black">City </label>
                      <Select options={cityOptions} onChange={onCityChange} isDisabled={!newAddress.stateCode} styles={{ control: (provided) => ({ ...provided, minHeight: "41px" }) }} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-[6px] text-black">Pincode <span className="text-red-600">*</span></label>
                      <input name="pincode" value={newAddress.pincode} onChange={handleAddressChange} className={`w-full p-3 border rounded text-sm outline-none ${addressErrors.pincode ? 'border-red-500' : 'border-[#ddd]'}`} />
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
              <h3 className="text-[17px] font-semibold m-0 text-black">
                {isChangingPassword ? "Change Password" : isLoggingIn ? "Login" : "Account Details"}
              </h3>
            </div>

            {isChangingPassword ? (
              <form
                className="p-[25px]"
                onSubmit={async (e) => {
                  e.preventDefault();
                  
                  // ✅ 1. VALIDATION BEFORE API CALL
                  const currentErr = validateFormData("currentPassword", formData.currentPassword);
                  const newErr = validateFormData("newPassword", formData.newPassword);
                  const confirmErr = validateFormData("confirmPassword", formData.confirmPassword);

                  if (currentErr || newErr || confirmErr) {
                    setErrors({
                      currentPassword: currentErr,
                      newPassword: newErr,
                      confirmPassword: confirmErr,
                    });
                    return;
                  }

                  try {
                    const token = localStorage.getItem("token");
                    // ✅ 2. API CALL TO UPDATE PASSWORD
                    const res = await fetch("http://localhost:5000/api/users/change-password", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                      },
                      body: JSON.stringify({
                        email: formData.email, 
                        currentPassword: formData.currentPassword,
                        newPassword: formData.newPassword,
                      }),
                    });

                    const data = await res.json();

                    if (!res.ok) {
                      throw new Error(data.message || "Failed to update password");
                    }

                    // ✅ 3. SUCCESS HANDLING
                    setSuccess("Password changed successfully!");
                    setErrors({});
                    setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
                    
                    setTimeout(() => {
                      setSuccess("");
                      setIsChangingPassword(false);
                    }, 3000);

                  } catch (err: any) {
                    setErrors({ api: err.message });
                  }
                }}
              >
                {errors.api && <p className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm font-medium border border-red-100">{errors.api}</p>}
                
                <div className="mb-5 relative">
  <label className="block text-sm font-medium mb-[6px] text-black">
    Current Password <span className="text-red-600">*</span>
  </label>

  <input
    type={showPassword.current ? "text" : "password"}
    name="currentPassword"
    value={formData.currentPassword}
    onChange={handleInputChange}
    className={`w-full p-3 pr-10 border rounded text-sm outline-none ${
      errors.currentPassword ? "border-red-500" : "border-[#ddd]"
    }`}
  />

  <span
    onClick={() =>
      setShowPassword({ ...showPassword, current: !showPassword.current })
    }
    className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
  >
    {showPassword.current ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
  </span>

  {errors.currentPassword && (
    <p className="text-red-600 text-[13px] mt-1">
      {errors.currentPassword}
    </p>
  )}
                </div>

                <div className="mb-5 relative">
                  <label className="block text-sm font-medium mb-[6px] text-black">
                    New Password <span className="text-red-600">*</span>
                  </label>

                  <input
                    type={showPassword.new ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`w-full p-3 pr-10 border rounded text-sm outline-none ${
                      errors.newPassword ? "border-red-500" : "border-[#ddd]"
                    }`}
                  />

                    <span
                      onClick={() =>
                        setShowPassword({ ...showPassword, new: !showPassword.new })
                      }
                      className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                    >
                      {showPassword.new ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>

                    {errors.newPassword && (
                      <p className="text-red-600 text-[13px] mt-1">
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                <div className="mb-5 relative">
                  <label className="block text-sm font-medium mb-[6px] text-black">
                    Confirm Password <span className="text-red-600">*</span>
                  </label>

                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full p-3 pr-10 border rounded text-sm outline-none ${
                      errors.confirmPassword ? "border-red-500" : "border-[#ddd]"
                    }`}
                  />

                  <span
                    onClick={() =>
                      setShowPassword({ ...showPassword, confirm: !showPassword.confirm })
                    }
                    className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                  >
                    {showPassword.confirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>

                  {errors.confirmPassword && (
                    <p className="text-red-600 text-[13px] mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="bg-[#046963] text-white px-[30px] py-3 rounded text-sm hover:opacity-90 font-medium">Update Password</button>
                  <button type="button" onClick={() => { setIsChangingPassword(false); setErrors({}); }} className="bg-gray-100 text-black px-[20px] py-3 rounded text-sm hover:bg-gray-200">Cancel</button>
                </div>
                {success && <p className="text-green-600 text-sm mt-[15px] font-bold">{success}</p>}
              </form>
            ) : isLoggingIn ? (
              <form className="p-[25px]" onSubmit={handleLoginSubmit}>
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-[6px] text-black">Email <span className="text-red-600">*</span></label>
                  <input name="email" value={loginFormData.email} onChange={handleLoginChange} className={`w-full p-3 border rounded text-sm outline-none ${loginErrors.email ? "border-red-500" : "border-[#ddd]"}`} />
                  {loginErrors.email && <p className="text-red-600 text-[13px] mt-1">{loginErrors.email}</p>}
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-[6px] text-black">Password <span className="text-red-600">*</span></label>
                  <input type="password" name="password" value={loginFormData.password} onChange={handleLoginChange} className={`w-full p-3 border rounded text-sm outline-none ${loginErrors.password ? "border-red-500" : "border-[#ddd]"}`} />
                  {loginErrors.password && <p className="text-red-600 text-[13px] mt-1">{loginErrors.password}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <button type="submit" className="bg-[#046963] text-white px-[30px] py-3 rounded text-sm hover:opacity-90">Login</button>
                  <button type="button" onClick={() => { setIsChangingPassword(true); setIsLoggingIn(false); }} className="text-sm text-[#046963] font-medium hover:underline">Change Password?</button>
                  <button type="button" onClick={() => setIsLoggingIn(false)} className="text-sm text-gray-500 hover:underline">Cancel</button>
                </div>
              </form>
            ) : (
              <form
                className="p-[25px]"
                onSubmit={async (e) => {
                  e.preventDefault();
                  let newErrors: any = {};
                  Object.keys(formData).forEach((key) => {
                    const value = (formData as any)[key];
                    if (["firstName", "lastName", "displayName", "email"].includes(key)) {
                      const error = validateFormData(key, value);
                      if (error) newErrors[key] = error;
                    }
                  });
                  setErrors(newErrors);

                  if (Object.keys(newErrors).length === 0) {
                    try {
                      const token = localStorage.getItem("token");
                      // 1. UPDATE DB via API Call
                      const res = await fetch("http://localhost:5000/api/users/update-profile", {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                          firstName: formData.firstName,
                          lastName: formData.lastName,
                          username: formData.displayName,
                        }),
                      });

                      const data = await res.json();

                      if (!res.ok) {
                        throw new Error(data.message || "Failed to update profile");
                      }

                      // 2. UPDATE LOCAL STORAGE SO DASHBOARD UPDATES
                      const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
                      const updatedUser = { 
                        ...existingUser, 
                        firstName: formData.firstName, 
                        lastName: formData.lastName, 
                        displayName: formData.displayName 
                      };
                      localStorage.setItem("user", JSON.stringify(updatedUser));

                      setSuccess("Saved successfully!");
                      setTimeout(() => setSuccess(""), 3000);
                    } catch (err: any) {
                      setErrors({ api: err.message });
                    }
                  }
                }}
              >
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
                  <label className="block text-sm font-medium mb-[6px] text-black">User Name <span className="text-red-600">*</span></label>
                  <input name="displayName" value={formData.displayName} onChange={handleInputChange} className={`w-full p-3 border rounded text-sm outline-none ${errors.displayName ? "border-red-500" : "border-[#ddd]"}`} />
                  {errors.displayName && <p className="text-red-600 text-[13px] mt-1">{errors.displayName}</p>}
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-[6px] text-black">Email <span className="text-red-600">*</span></label>
                  <input name="email" value={formData.email} readOnly={isLoggedIn} className={`w-full p-3 border rounded text-sm outline-none ${isLoggedIn ? "bg-gray-50 text-gray-500 cursor-not-allowed" : ""} ${errors.email ? "border-red-500" : "border-[#ddd]"}`} />
                  {errors.email && <p className="text-red-600 text-[13px] mt-1">{errors.email}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <button type="submit" className="bg-[#046963] text-white px-[30px] py-3 rounded text-sm hover:opacity-90">Save</button>
                </div>
                {success && <p className="text-green-600 text-sm mt-[10px] font-bold">{success}</p>}
                {errors.api && <p className="text-red-600 text-sm mt-[10px]">{errors.api}</p>}
              </form>
            )}
          </div>
        );
      default:
        return <div className="p-10 text-black text-left">Click on Sidebar menus to view content.</div>;
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
          <SidebarBtn icon={<VscSettings />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => { setActiveTab("dashboard"); setIsLoggingIn(false); setIsChangingPassword(false); }} />
          <SidebarBtn icon={<LiaShoppingBagSolid />} label="Orders" active={activeTab === "orders"} onClick={() => { setActiveTab("orders"); setIsLoggingIn(false); setIsChangingPassword(false); }} />
          <SidebarBtn icon={<CiShoppingCart />} label="Track Your Order" active={activeTab === "track"} onClick={() => { setActiveTab("track"); setIsLoggingIn(false); setIsChangingPassword(false); }} />
          <SidebarBtn icon={<CiLocationOn />} label="My Address" active={activeTab === "address"} onClick={() => { setActiveTab("address"); setIsLoggingIn(false); setIsChangingPassword(false); }} />
          <SidebarBtn icon={<CiUser />} label="Account Details" active={activeTab === "details" && !isChangingPassword} onClick={() => { setActiveTab("details"); setIsLoggingIn(false); setIsChangingPassword(false); }} />
          <SidebarBtn icon={<CiLock />} label="Change Password" active={activeTab === "details" && isChangingPassword} onClick={() => { setActiveTab("details"); setIsChangingPassword(true); setIsLoggingIn(false); }} />
          <Dialog>
            <DialogTrigger asChild>
              <Button className={`w-full justify-start px-[18px] py-7 rounded-none border-b border-[#eee] transition-all bg-white text-[#333] hover:bg-[#f5f5f5]`}>
                <div className="w-5 flex justify-center mr-[-12px]"><IoIosLogOut className="text-xl text-[#333]" /></div>
                <span className="font-medium text-sm ml-[10px]">Logout</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Are you sure?</DialogTitle><DialogDescription>You will be logged out of your account.</DialogDescription></DialogHeader>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                <Button className="bg-[#046963] text-white hover:bg-[#046963] hover:opacity-90" onClick={handleLogout}>Yes, Logout</Button>
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