"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: ""
  });

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("loginSuccess");

  //   if (isLoggedIn) {
  //     router.replace("/");
  //   } else {
  //     setCheckingAuth(false);
  //   }
  // }, []);

  const validate = () => {
    let newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: ""
    };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!password || password.length < 6) {
      newErrors.password = "Minimum 6 characters";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "Accept terms";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.error || "Registration failed", "error");
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Registered Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => router.push("/login"), 1500);

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
              <div className="w-[210px] h-[110px] flex items-center justify-center cursor-pointer hover:scale-105 transition">
                <span className="text-white text-[24px] font-bold uppercase">
                  Login
                </span>
              </div>
            </Link>

            <div className="bg-white w-[210px] h-[110px] rounded-l-[60px] flex items-center justify-center shadow-md">
              <span className="text-[var(--text-main)] text-[22px] font-bold uppercase">
                Sign Up
              </span>
            </div>
          </div>
        </div>

        <div className="min-h-screen bg-[#f7f7f7] flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center px-12 md:px-20 py-10">
            <div className="w-full max-w-xl">

              <div className="flex flex-col items-center mb-10">
                <img
                  src="/home/logo.svg"
                  alt="Logo"
                  className="w-44 h-44 object-contain mb-1 drop-shadow-md"
                />
                <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] uppercase">
                  Register
                </h1>
              </div>

              <div className="mb-10">
                <div className="border-b pb-4">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent outline-none text-xl"
                  />
                </div>
                {errors.username && <p className="text-red-500 mt-2">{errors.username}</p>}
              </div>

              <div className="mb-10">
                <div className="border-b pb-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent outline-none text-xl"
                  />
                </div>
                {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
              </div>

              <div className="mb-10">
                <div className="flex items-center border-b pb-4 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="mb-10">
                <div className="flex items-center border-b pb-4 relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent outline-none text-xl pr-10"
                  />

                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
                {errors.confirmPassword && <p className="text-red-500 mt-2">{errors.confirmPassword}</p>}
              </div>

              <div className="mb-6 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to terms</span>
              </div>
              {errors.agreeTerms && <p className="text-red-500 mb-4">{errors.agreeTerms}</p>}

              <button
                onClick={handleSubmit}
                className="px-12 py-4 text-white bg-[var(--primary)] rounded-full"
              >
                REGISTER
              </button>

              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                <span className="text-sm text-gray-500">OR</span>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 text-white py-3 rounded-md font-semibold bg-black">
                  Login With Facebook
                </button>
                <button className="flex-1 text-white py-3 rounded-md font-semibold bg-red-500">
                  Login With Google
                </button>
              </div>

              <p className="text-center mt-10">
                Already have an account?{" "}
                <Link href="/login" className="text-[var(--primary)]">
                  Login now
                </Link>
              </p>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}