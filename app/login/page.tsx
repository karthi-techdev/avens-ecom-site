"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-light)] px-4">

      <div className="w-full max-w-md bg-[var(--white)] border border-[var(--border-color)] rounded-xl p-8">

        <h1 className="text-3xl font-bold text-[var(--text-main)] mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Your Email"
          className="w-full border border-[var(--border-color)] rounded-md px-4 py-3 mb-4 focus:outline-none focus:border-[var(--primary)]"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-[var(--border-color)] rounded-md px-4 py-3 mb-4 focus:outline-none focus:border-[var(--primary)]"
        />

        <div className="flex justify-between items-center mb-6 text-sm font-semibold text-[var( --foreground)]">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <a className="hover:text-[var(--primary)] cursor-pointer">
            Forgot password?
          </a>
        </div>

        <p className="text-center text-sm text-[var(--text-muted)] mb-4">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="!text-[var(--primary)] font-semibold hover:text-[var(--primary-hover)]"
          >
            Register now
          </Link>
        </p>

        <button className="w-full max-w-[130px] bg-[var(--primary)] text-white py-3 rounded-md font-semibold hover:bg-[var(--primary-hover)] transition">
          Log in
        </button>

      </div>

    </div>
  );
}