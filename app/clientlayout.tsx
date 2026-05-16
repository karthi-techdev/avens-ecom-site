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
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Pages accessible without a token (Public)
  const publicRoutes = ["/", "/product-list", "/product-view-full", "/product-view"];
  
  // Auth-specific pages (Hidden Header/Footer and redirected if logged in)
  const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

  // Determine if we should hide Header and Footer
  const hideLayout = authRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    const token = localStorage.getItem("loginSuccess");

    // Check if the current path is a public route or an auth route
    const isPublic = publicRoutes.some((route) => 
      route === "/" ? pathname === "/" : pathname.startsWith(route)
    );
    
    const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));

    // Logic 1: No token + trying to access a protected route
    if (!token && !isPublic && !isAuthPage) {
      router.replace("/login");
    } 
    // Logic 2: Token exists + trying to access login/register/forgot-password
    else if (token && isAuthPage) {
      router.replace("/");
    } 
    // Logic 3: All good
    else {
      setCheckingAuth(false);
    }
  }, [pathname, router]);

  // Prevent UI flicker while checking authentication
  if (checkingAuth) return null;

  return (
    <>
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </>
  );
}