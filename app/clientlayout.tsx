// "use client";

// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ClientLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const hideLayout = pathname === "/login" || pathname === "/register";
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("loginSuccess");

//     if (!token && pathname !== "/login" && pathname !== "/register") {
//       router.replace("/login");
//       router.replace("/");
//       // router.replace("/product-list");
//       // router.replace("/login");

//     }

//     if (token && (pathname === "/login" || pathname === "/register")) {
//       router.replace("/");
//     }

//     setCheckingAuth(false);
//   }, [pathname]);

//   if (checkingAuth) return null;

//   return (
//     <>
//       {!hideLayout && <Header />}
//       {children}
//       {!hideLayout && <Footer />}
//     </>
//   );
// }

// "use client";

// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ClientLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const pathname = usePathname();
//   const router = useRouter();

//   // Pages accessible without token
//   const publicRoutes = ["/", "/product-list", "/login", "/product-view-full","/product-view", "/register"];

//   const hideLayout =
//     pathname === "/login" || pathname === "/register";

//   const [checkingAuth, setCheckingAuth] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("loginSuccess");

//     // Check if current page is public
//     const isPublicRoute = publicRoutes.includes(pathname);

//     // No token + protected route
//     if (!token && !isPublicRoute) {
//       router.replace("/login");
//       return;
//     }

//     // Token exists + trying to access login/register
//     if (
//       token &&
//       (pathname === "/login" || pathname === "/register")
//     ) {
//       router.replace("/");
//       return;
//     }

//     setCheckingAuth(false);
//   }, [pathname, router]);

//   if (checkingAuth) return null;

//   return (
//     <>
//       {!hideLayout && <Header />}
//       {children}
//       {!hideLayout && <Footer />}
//     </>
//   );
// }

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

  // Pages accessible without token
  const publicRoutes = ["/", "/product-list", "/login", "/product-view-full", "/product-view", "/register"];

  const hideLayout = pathname === "/login" || pathname === "/register";

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("loginSuccess");

    // FIX: Check if the current pathname matches or starts with any of the public routes
    // We use .some() to check if the current path starts with a public route prefix
    const isPublicRoute = publicRoutes.some((route) => {
      if (route === "/") return pathname === "/"; // Strict check for home page
      return pathname.startsWith(route); // Prefix check for dynamic routes like /product-view/[slug]
    });

    // No token + protected route
    if (!token && !isPublicRoute) {
      router.replace("/login");
      return;
    }

    // Token exists + trying to access login/register
    if (token && (pathname === "/login" || pathname === "/register")) {
      router.replace("/");
      return;
    }

    setCheckingAuth(false);
  }, [pathname, router]);

  if (checkingAuth) return null;

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}