import "./globals.css";
import ClientLayout from "./clientlayout";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
       
      </body>
    </html>
  );
}