"use client";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [checkingAuth, setCheckingAuth] = useState(true);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

 
  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("loginSuccess");

  //   if (isLoggedIn) {
  //     router.replace("/");
  //   } else {
  //     setCheckingAuth(false);
  //   }
  // }, []);

  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Minimum 6 characters";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return "Password must include a special character";
    }
    return "";
  };

  const validate = () => {
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({
          email: data.error === "Email not found" ? data.error : "",
          password: data.error !== "Email not found" ? data.error : "",
        });
        return;
      }

      localStorage.setItem("loginSuccess", "true");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push("/");
      }, 1500);

    } catch {
      Swal.fire("Error", "Server error", "error");
    }
  };

  
  // if (checkingAuth) return null;

  return (
    <div className="min-h-screen w-full bg-[var(--bg-light)]">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[38%_62%]">

      
        <div className="hidden md:block relative overflow-hidden bg-[var(--primary)] min-h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -left-20 w-[170%] h-[220px] rotate-[-45deg] bg-white/15"></div>
            <div className="absolute top-[180px] -left-28 w-[180%] h-[180px] rotate-[-45deg] bg-[var(--primary-hover)] opacity-35"></div>
            <div className="absolute bottom-[180px] -left-20 w-[170%] h-[180px] rotate-[45deg] bg-white/12"></div>
            <div className="absolute bottom-[-80px] -left-32 w-[180%] h-[250px] rotate-[45deg] bg-[var(--primary-hover)] opacity-30"></div>
          </div>

          <div className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col items-end">
            <Link href="/login">
              <div className="bg-white w-[210px] h-[110px] rounded-l-[60px] flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition">
                <span className="text-[var(--text-main)] text-[22px] font-bold uppercase tracking-wide">
                  Login
                </span>
              </div>
            </Link>

            <Link href="/register">
              <div className="w-[210px] h-[110px] flex items-center justify-center cursor-pointer hover:scale-105 transition">
                <span className="text-white text-[24px] font-bold uppercase tracking-wide">
                  Sign Up
                </span>
              </div>
            </Link>
          </div>
        </div>

        
        <div className="min-h-screen bg-[#f7f7f7] flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center px-8 sm:px-12 md:px-16 py-10">
            <div className="w-full max-w-xl">

              <div className="flex flex-col items-center mb-10">
                <img
                  src="/home/logo.svg"
                  alt="Logo"
                  className="w-44 h-44 object-contain mb-1 drop-shadow-md"
                />
                <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] uppercase leading-none">
                  Login
                </h1>
              </div>

              
              <div className="mb-10">
                <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEmail(value);
                      setErrors((prev) => ({
                        ...prev,
                        email: validateEmail(value),
                      }));
                    }}
                    className="w-full bg-transparent outline-none text-xl"
                  />
                </div>
                {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
              </div>

              <div className="mb-10">
                <div className="flex items-center gap-3 border-b pb-4 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPassword(value);
                      setErrors((prev) => ({
                        ...prev,
                        password: validatePassword(value),
                      }));
                    }}
                    className="w-full bg-transparent outline-none text-xl pr-10"
                  />

                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
                {errors.password && <p className="text-red-500 mt-2">{errors.password}</p>}
              </div>

             
              <div className="flex justify-between items-center">
                <button
                  onClick={handleSubmit}
                  className="px-12 py-4 text-white bg-[var(--primary)] rounded-full"
                >
                  LOGIN
                </button>
              </div>

              <p className="text-center mt-10">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[var(--primary)]">
                  Register now
                </Link>
              </p>

              <div className="flex gap-4 mt-7">
                <button className="flex-1 text-white py-3 rounded-md font-semibold bg-black">
                  Login With Facebook
                </button>
                <button className="flex-1 text-white py-3 rounded-md font-semibold bg-red-500">
                  Login With Google
                </button>
              </div>

            </div>
          </div>
        </div>
console.log("LOGIN RESPONSE:", data);
      </div>
    </div>
  );
}