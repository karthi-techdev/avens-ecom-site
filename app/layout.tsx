"use client";
import Header from "@/components/Header/Header";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login" || pathname === "/register";
  return (
    <html lang="en">
      <body>
         {!hideLayout && <Header />} 
        {children}
        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}
