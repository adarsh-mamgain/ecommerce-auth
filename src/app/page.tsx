"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "./_components/Header";
import Notification from "./_components/Notification";
import { api } from "~/trpc/react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const router = useRouter();

  const signup = api.auth.signup.useMutation({
    onSuccess: (data) => {
      setVerificationSent(true);
      setNotification(`Your OTP is: ${data.otp}`);
    },
    onError: (error) => {
      setNotification(error.message);
    },
  });

  const verifyEmail = api.auth.verifyEmail.useMutation({
    onSuccess: () => {
      setNotification("Email verified successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 2000); // Redirect to login page after 2 seconds
    },
    onError: (error) => {
      setNotification(error.message);
    },
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup.mutate({ name, email, password });
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    verifyEmail.mutate({ email, otp });
  };

  const hideEmail = (email: string) => {
    const [username, domain] = email.split("@");
    const hiddenUsername =
      (username ?? "").length >= 3
        ? (username ?? "").slice(0, 3) + "*".repeat((username ?? "").length - 3)
        : (username ?? "") + "*".repeat((username ?? "").length - 1);
    return `${hiddenUsername}@${domain}`;
  };

  if (verificationSent) {
    return (
      <main>
        <Header />
        <div className="flex h-full w-full items-center justify-center">
          <div className="mt-10 w-[576px] rounded-[20px] border px-16 pb-12 pt-10">
            <h1 className="mb-8 text-center text-[32px] font-semibold">
              Verify your email
            </h1>
            <p className="mb-8 text-center">
              Enter the 8 digit code you have received on
              <br />
              <span className="font-medium">{hideEmail(email)}</span>
            </p>
            <form onSubmit={handleVerify}>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                  <label htmlFor="code">Code</label>
                  <input
                    type="text"
                    id="code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="rounded-[6px] border border-[#C1C1C1] p-4"
                    maxLength={8}
                  />
                </div>
                <div className="pt-[8px]">
                  <button
                    type="submit"
                    className="w-full rounded-[6px] bg-black p-4 font-medium text-white"
                  >
                    VERIFY
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}
      </main>
    );
  }

  return (
    <main>
      <Header />
      <div className="flex h-full w-full items-center justify-center">
        <div className="mt-10 w-[576px] rounded-[20px] border px-16 pb-24 pt-10">
          <h1 className="mb-8 text-center text-[32px] font-semibold">
            Create your account
          </h1>
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter"
                  className="rounded-[6px] border border-[#C1C1C1] p-4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter"
                  className="rounded-[6px] border border-[#C1C1C1] p-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter"
                  className="rounded-[6px] border border-[#C1C1C1] p-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="pt-[8px]">
                <button
                  type="submit"
                  className="w-full rounded-[6px] bg-black p-4 font-medium text-white"
                >
                  CREATE ACCOUNT
                </button>
              </div>
              <div className="text-center">
                <p>
                  Have an Account?{" "}
                  <Link href={"/login"} className="font-medium">
                    LOGIN
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </main>
  );
}
