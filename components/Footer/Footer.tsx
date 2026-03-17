"use client"
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <>
      <section className="bg-[#D8E4E1] py-10 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Icon and Heading */}
        <div className="flex items-center gap-4">
          <Mail size={40} className="text-[#253D4E] opacity-70" />
          <h2 className="text-[24px] font-bold text-[#253D4E]">
            Sign up to Newsletter
          </h2>
        </div>

        {/* Center: Promo Text */}
        <div className="hidden xl:block">
          <p className="text-[#253D4E] font-medium">
            ...and receive $25 coupon for first shopping.
          </p>
        </div>

        {/* Right Side: Input and Button */}
        <div className="w-full max-w-[500px] flex items-center bg-white rounded-md overflow-hidden">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 outline-none text-[14px] text-gray-600"
          />
          <button className="bg-[#253D4E] text-white px-8 py-3 text-[14px] font-bold hover:bg-[#3BB77E] transition-all">
            Subscribe
          </button>
        </div>

      </div>
    </section>

      <footer className="bg-[var(--bg-light)]">
  <div className="max-w-7xl mx-auto px-10 lg:px-16 py-14">
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.7fr] gap-8 lg:gap-10">
      
      {/* Column 1 */}
      <div className="space-y-4">
        <img
          src="/evara.svg"
          alt="Evora Logo"
          className="h-8 object-contain"
        />

        <p className="font-semibold text-[var(--text-muted)]">Contact</p>

        <div className="text-[15px] leading-relaxed space-y-0">
          <p>
            <span className="font-semibold text-[var(--text-main)]">
              Address:
            </span>{" "}
            562 Wellington Road, Street 32, San Francisco
          </p>

          <p>
            <span className="font-semibold text-[var(--text-main)]">
              Phone:
            </span>{" "}
            +01 2222 365 / (+91) 01 2345 6789
          </p>

          <p>
            <span className="font-semibold text-[var(--text-main)]">
              Hours:
            </span>{" "}
            10:00 - 18:00, Mon - Sat
          </p>
        </div>

        <div>
          <p className="font-semibold text-[var(--text-muted)] mb-3">
            Follow Us
          </p>

          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
              <div
                key={index}
                className="p-2 bg-[var(--white)] rounded-full 
                hover:bg-[var(--primary)] 
                hover:text-white 
                transition cursor-pointer shadow-sm"
              >
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Column 2 */}
      <div>
        <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4">
          About
        </h3>

        <ul className="space-y-2 text-[15px]">
          {[
            "About Us",
            "Delivery Information",
            "Privacy Policy",
            "Terms & Conditions",
            "Contact Us",
            "Support Center",
          ].map((item, index) => (
            <li key={index} className="font-medium hover:text-[var(--primary)]">
              <Link
                href="#"
                className="block text-[var(--text-main)] 
                 
                transition-all duration-300 hover:translate-x-1"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 3 */}
      <div>
        <h3 className="text-xl font-semibold text-[var(--text-main)] mb-4">
          My Account
        </h3>

        <ul className="space-y-2 text-[15px]">
          {[
            "Sign In",
            "View Cart",
            "My Wishlist",
            "Track My Order",
            "Help",
            "Order",
          ].map((item, index) => (
            <li key={index} className="font-medium hover:text-[var(--primary)]">
              <Link
                href="#"
                className="block text-[var(--text-main)] 
                hover:text-[var(--primary)] 
                transition-all duration-300 hover:translate-x-1"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 4 (IMAGES KEPT ✅) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-[var(--text-main)] mb-3">
            Install App
          </h3>

          <p className="text-sm mb-3 font-semibold text-[var(--text-muted)] pb-4">
            From App Store or Google Play
          </p>

          <div className="flex gap-4 sm:flex-col sm:gap-4">
            <button className="flex justify-start">
              <img
                src="/app-store.jpeg"
                alt="Download on the App Store"
                className="h-11 object-contain border rounded-sm 
                border-transparent hover:border-[var(--primary)] 
                hover:scale-105 transition"
              />
            </button>

            <button className="flex justify-start">
              <img
                src="/google-play.jpeg"
                alt="Get it on Google Play"
                className="h-11 object-contain border rounded-sm 
                border-transparent hover:border-[var(--primary)] 
                hover:scale-105 transition"
              />
            </button>
          </div>
        </div>

        <div>
          <p className="font-semibold text-[var(--text-main)] mb-3 text-sm">
            Secured Payment Gateways
          </p>

          <div className="flex items-center gap-4 flex-wrap pt-4">
            {["visa.png", "visa.png", "maestro.png", "visa.png"].map(
              (img, index) => (
                <img
                  key={index}
                  src={`/${img}`}
                  alt="Payment"
                  className="h-6 object-contain"
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="border-t border-[var(--border-color)]">
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-[var(--text-muted)]">
      <p>
        © 2026, Evora - HTML Ecommerce Template
      </p>

      <p>
        Designed by{" "}
        <span className="text-[var(--primary)] font-medium">
          Alithemes.com
        </span>
        . All rights reserved
      </p>
    </div>
  </div>
</footer>
    </>
  );
};

export default Footer;