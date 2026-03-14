"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function RegisterPage() {
  return (

    <div className="w-full flex justify-center py-16 px-4">

      <div className="w-full max-w-md bg-white border border-[var(--border-color)] rounded-xl p-8 shadow-sm">

        <h1 className="text-3xl font-bold mb-4">
          Create an Account
        </h1>

        <p className="text-sm mb-6 text-[var(--text-muted)]">
          Your personal data will be used to support your experience throughout this website,
          to manage access to your account, and for other purposes described in our privacy policy
        </p>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            className="w-full border border-[var(--border-color)] rounded-md px-4 py-3 focus:outline-none focus:border-[var(--primary)]"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-[var(--border-color)] rounded-md px-4 py-3 focus:outline-none focus:border-[var(--primary)]"
          />
 
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-[var(--border-color)] rounded-md px-4 py-3 focus:outline-none focus:border-[var(--primary)]"
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border border-[var(--border-color)] rounded-md px-4 py-3 focus:outline-none focus:border-[var(--primary)]"
          />

          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 text-[var(--text-muted)]">
              <input type="checkbox"/>
              I agree to terms & Policy
            </label>

            <Link
              href="#"
              className="flex items-center gap-1 !text-[var(--primary)]"
            >
              <BookOpen size={16}/>
              Learn more
            </Link>

          </div>

          <button
            className="w-full max-w-[180px] text-white py-3 rounded-md font-semibold"
            style={{background:"var(--primary)"}}
          >
            Submit & Register
          </button>

        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-[1px] bg-[var(--border-color)]"></div>
          <span className="text-sm text-[var(--text-muted)]">OR</span>
          <div className="flex-1 h-[1px] bg-[var(--border-color)]"></div>
        </div>

        <div className="flex gap-4">

          <button
            className="flex-1 text-white py-3 rounded-md font-semibold"
            style={{background:"var(--foreground)"}}
          >
            Login With Facebook
          </button>

          <button
            className="flex-1 text-white py-3 rounded-md font-semibold"
            style={{background:"var(--red-color)"}}
          >
            Login With Google
          </button>

        </div>

        <p className="text-center text-sm text-[var(--text-muted)] mt-6">
          Already have an account?
          <Link
            href="/login"
            className="!text-[var(--primary)] font-semibold ml-1"
          >
            Sign in now
          </Link>
        </p>

      </div>

    </div>

  );
}