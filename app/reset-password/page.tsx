"use client";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
  password: "",
  confirmPassword: "",
});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);
const [validToken, setValidToken] = useState(false);


useEffect(() => {
  if (!token) {
    router.replace("/login");
    return;
  }

  const checkToken = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/validate-reset-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!data.valid) {
        Swal.fire("Error", data.message, "error");

        setTimeout(() => {
          router.replace("/login");
        }, 2000);
      } else {
        setValidToken(true);
      }
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  checkToken();
}, [token]);

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
    password: validatePassword(password),
    confirmPassword: "",
  };

  if (!confirmPassword) {
    newErrors.confirmPassword = "Confirm password is required";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(newErrors);

  return !newErrors.password && !newErrors.confirmPassword;
};

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/users/userResetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
            newPassword: password,
            }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.message || "Something went wrong", "error");
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: "Your password has been changed successfully",
      });

      router.push("/login");
    } catch {
      Swal.fire("Error", "Server error", "error");
    }
  };
  if (loading) {
  return <p className="text-center mt-20">Checking link...</p>;
}

if (!validToken) {
  return null;
}

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f7f7f7] px-4">
      
      <div className="w-full max-w-xl bg-white p-12 md:p-14 rounded-2xl shadow-2xl">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-12">
          <img src="/home/logo.svg" alt="Logo" className="w-40 mb-15" />
          <h1 className="text-3xl font-extrabold text-[var(--primary)]">
            RESET PASSWORD
          </h1>
        </div>

        {/* NEW PASSWORD */}
        <div className="mb-6">
          <div className="relative border-b border-gray-300 pb-3 mt-1">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password..."
                value={password}
                onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    setErrors((prev) => ({
                        ...prev,
                        password: validatePassword(value),
                    }));
                    }}
                className="w-full bg-transparent outline-none text-lg pr-10"
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1 text-gray-500"
            >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
            </div>
            {errors.password && (<p className="text-red-500 mt-2">{errors.password}</p>)}
        </div>  

        {/* CONFIRM PASSWORD */}
        <div className="mb-4">
          <div className="relative border-b border-gray-300 pb-3 mt-1">
            <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password..."
                value={confirmPassword}
                onChange={(e) => {
                    const value = e.target.value;
                    setConfirmPassword(value);
                    setErrors((prev) => ({
                        ...prev,
                        confirmPassword:
                        value !== password ? "Passwords do not match" : "",
                    }));
                    }}
                className="w-full bg-transparent outline-none text-lg pr-10"
            />
            <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-1 text-gray-500"
            >
                {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
            </div>
             {errors.confirmPassword && (<p className="text-red-500 mt-2">{errors.confirmPassword}</p>)}
        </div>

        {/* BUTTON */}
        <div className="flex flex-col gap-4">
          <p
            onClick={() => router.push("/login")}
            className="text-sm text-[var(--primary)] cursor-pointer text-right"
          >
            Back to Login?
          </p>

          <button
            onClick={handleSubmit}
            className="w-full py-3 text-white bg-[var(--primary)] rounded-[10px]"
          >
            UPDATE PASSWORD
          </button>
        </div>

      </div>
    </div>
  );
}
