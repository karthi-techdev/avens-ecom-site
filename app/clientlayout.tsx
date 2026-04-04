"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const hideLayout = pathname === "/login" || pathname === "/register";
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("loginSuccess");

    if (!token && pathname !== "/login" && pathname !== "/register") {
      router.replace("/login");
    }

    if (token && (pathname === "/login" || pathname === "/register")) {
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
    </>
  );
}