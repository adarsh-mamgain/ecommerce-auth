"use client";

import Link from "next/link";
import Header from "../_components/Header";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <main>
      <Header />

      <div className="flex h-full w-full items-center justify-center">
        <div className="mt-10 w-[576px] rounded-[20px] border px-16 pb-12 pt-10">
          <h1 className="mb-8 text-center text-[32px] font-semibold">Login</h1>
          <p className="mb-3 text-center text-2xl font-medium">
            Welcome back to ECOMMERCE
          </p>
          <p className="mb-8 text-center">The next gen business marketplace</p>
          <form action="" method="post">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter"
                  className="rounded-[6px] border border-[#C1C1C1] p-4"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter"
                  className="rounded-[6px] border border-[#C1C1C1] p-4"
                />
                <span
                  onClick={toggleShowPassword}
                  className="absolute ml-[380px] mt-11 cursor-pointer underline hover:no-underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              <div className="pt-[8px]">
                <button
                  type="submit"
                  className="w-full rounded-[6px] bg-black p-4 font-medium text-white"
                >
                  LOGIN
                </button>
              </div>
              <hr className="border-[#C1C1C1]" />
              <div className="text-center">
                <p>
                  Don&apos;t have an Account?{" "}
                  <Link href={"/"} className="font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
