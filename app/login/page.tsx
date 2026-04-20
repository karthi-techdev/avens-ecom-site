"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: ""
  });

  const [registerErrors, setRegisterErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: ""
  });

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

  const validateLogin = () => {
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setLoginErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const validateRegister = () => {
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

    setRegisterErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;

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
        setLoginErrors({
          email: data.error === "Email not found" ? data.error : "",
          password: data.error !== "Email not found" ? data.error : "",
        });
        return;
      }

      localStorage.setItem("loginSuccess", "true");
      localStorage.setItem("showLoginAlert", "true"); 
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/"); 
      
      setTimeout(() => router.push("/"), 1500);
    } catch {
      Swal.fire("Error", "Server error", "error");
    }
  };

 const handleRegister = async () => {
  if (!validateRegister()) return;

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

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("loginSuccess", "true");

    Swal.fire({
      icon: "success",
      title: `Welcome ${username} 🎉`,
      text: "Your account is created & welcome email sent!",
      showConfirmButton: false,
    });

    setTimeout(() => {
      router.push("/")
  } ,1500)
  }
  catch {
    Swal.fire("Error", "Server error", "error");
  }
};

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
            <div onClick={() => setIsLogin(true)}>
              <div className={`w-[210px] h-[110px] flex items-center justify-center cursor-pointer ${isLogin ? "bg-white rounded-l-[60px]" : ""}`}>
                <span className={`${isLogin ? "text-[var(--text-main)]" : "text-white"} text-[24px] font-bold uppercase`}>
                  Login
                </span>
              </div>
            </div>

            <div onClick={() => setIsLogin(false)}>
              <div className={`w-[210px] h-[110px] flex items-center justify-center cursor-pointer ${!isLogin ? "bg-white rounded-l-[60px]" : ""}`}>
                <span className={`${!isLogin ? "text-[var(--text-main)]" : "text-white"} text-[22px] font-bold uppercase`}>
                  Sign Up
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-screen bg-[#f7f7f7] flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center px-12 md:px-20 py-10">
            <div className="w-full max-w-xl">

              <div className="flex flex-col items-center mb-10">
                <img src="/home/logo.svg" className="w-44 h-44 object-contain mb-1 drop-shadow-md" />
                <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] uppercase">
                  {isLogin ? "Login" : "Register"}
                </h1>
              </div>

              {!isLogin && (
                <div className="mb-10">
                  <div className="border-b pb-4">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-transparent outline-none text-xl" />
                  </div>
                  {registerErrors.username && <p className="text-red-500 mt-2">{registerErrors.username}</p>}
                </div>
              )}

              <div className="mb-10">
                <div className="border-b pb-4">
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent outline-none text-xl" />
                </div>
                {(isLogin ? loginErrors.email : registerErrors.email) && (
                  <p className="text-red-500 mt-2">
                    {isLogin ? loginErrors.email : registerErrors.email}
                  </p>
                )}
              </div>

              <div className="mb-10">
                <div className="flex items-center border-b pb-4 relative">
                  <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent outline-none text-xl pr-10" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
                {(isLogin ? loginErrors.password : registerErrors.password) && (
                  <p className="text-red-500 mt-2">
                    {isLogin ? loginErrors.password : registerErrors.password}
                  </p>
                )}
              </div>

              {!isLogin && (
                <>
                  <div className="mb-10">
                    <div className="flex items-center border-b pb-4 relative">
                      <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-transparent outline-none text-xl pr-10" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </div>
                    </div>
                    {registerErrors.confirmPassword && <p className="text-red-500 mt-2">{registerErrors.confirmPassword}</p>}
                  </div>

                  <div className="mb-6 flex items-center gap-2">
                    <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                    <span>I agree to terms</span>
                  </div>
                  {registerErrors.agreeTerms && <p className="text-red-500 mb-4">{registerErrors.agreeTerms}</p>}
                </>
              )}

              <button onClick={isLogin ? handleLogin : handleRegister} className="px-12 py-4 text-white bg-[var(--primary)] rounded-full">
                SUBMIT
              </button>

              <p className="text-center mt-10">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span onClick={() => setIsLogin(!isLogin)} className="text-[var(--primary)] cursor-pointer">
                  {isLogin ? "Register now" : "Login now"}
                </span>
              </p>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}