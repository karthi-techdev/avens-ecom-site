"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const validateEmail = (value: string): string => {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email";
    return "";
  };

  const handleSubmit = async () => {
    const err = validateEmail(email);
    setError(err);

    if (err) return;

    try {
      const res = await fetch("http://localhost:5000/api/users/userForgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success("Check your mail for reset link");
      setIsDisabled(true);
      setTimer(60);

    } catch {
      toast.error("Server error");
    }
  };
   useEffect(() => {
  if (timer <= 0) return;

  const interval = setInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer]);

useEffect(() => {
  if (timer === 0) {
    setIsDisabled(false);
  }
}, [timer]);

  return (
  <div className="min-h-screen w-full flex items-center justify-center bg-[#f7f7f7] px-4">
    
    <div className="w-full max-w-xl bg-white p-12 md:p-14 rounded-2xl shadow-2xl">

      {/* LOGO */}
      <div className="flex flex-col items-center mb-15">
        <img src="/home/logo.svg" alt="Logo" className="w-40 mb-15" />
        <h1 className="text-3xl font-extrabold text-[var(--primary)]">
          FORGOT PASSWORD
        </h1>
      </div>

      {/* EMAIL INPUT */}
      <div className="mb-4">
        <div className="border-b border-gray-300 pb-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              setError(validateEmail(value));
            }}
            className="w-full bg-transparent outline-none text-lg"
          />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* BUTTON */}
      <div className="flex flex-col gap-4">
        <p
          onClick={() => router.push("/login")}
          className="text-sm text-[var(--primary)] cursor-pointer  text-right"
        >
          Login?
        </p>
        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`w-full py-3 text-white rounded-[10px] ${
            isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[var(--primary)]"
          }`}
        >
          {isDisabled ? `Resend in ${timer}s` : "RESET PASSWORD"}
        </button>

      </div>

    </div>
  </div>
);
}