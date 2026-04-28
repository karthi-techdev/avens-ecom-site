import "./globals.css";
import ClientLayout from "./clientlayout";
import { ToastContainer } from "react-toastify";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
         <ToastContainer 
          position="top-right"
          autoClose={3000}
        />
       
      </body>
    </html>
  );
}