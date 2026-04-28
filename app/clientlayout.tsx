"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const hideLayout = pathname === "/login" || pathname === "/register" ||  pathname === "/forgot-password" || pathname === "/reset-password";
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("loginSuccess");

    if (!token && pathname !== "/login" && pathname !== "/register" && pathname !== "/forgot-password" && pathname !== "/reset-password") {
      router.replace("/login");
    }

    if (token && (pathname === "/login" || pathname === "/register" || pathname === "/forgot-password") && !pathname.startsWith("/reset-password")) {
      router.replace("/");
    }

    setCheckingAuth(false);
  }, [pathname]);

  if (checkingAuth) return null;

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
      <ToastContainer position="top-right" />
    </>
  );
}