"use client";
// import { LatestPost } from "~/app/_components/post";
// import { api, HydrateClient } from "~/trpc/server";
import Link from "next/link";
import Header from "../_components/Header";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    // <HydrateClient>
    <main>
      <Header />

      <div className="flex h-full w-full items-center justify-center">
        <div className="mt-10 w-[576px] rounded-[20px] border px-16 pb-12 pt-10">
          <h1 className="mb-6 text-center text-[32px] font-semibold">
            Please mark your interests!
          </h1>
          <p className="mb-8 text-center">We will keep you notified.</p>
          <p className="mb-6 text-xl font-medium">My saved interests!</p>
          <form action="" method="post">
            <div className="flex flex-col gap-6">
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="shoes"
                  className="h-6 w-6 rounded-[4px] rounded-[6px] border border-[#C1C1C1] bg-[#CCCCCC] p-4 accent-black"
                />
                <label htmlFor="shoes">Shoes</label>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="shoes"
                  className="h-6 w-6 rounded-[4px] rounded-[6px] border border-[#C1C1C1] bg-[#CCCCCC] p-4 accent-black"
                />
                <label htmlFor="shoes">Shoes</label>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="shoes"
                  className="h-6 w-6 rounded-[4px] rounded-[6px] border border-[#C1C1C1] bg-[#CCCCCC] p-4 accent-black"
                />
                <label htmlFor="shoes">Shoes</label>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="shoes"
                  className="h-6 w-6 rounded-[4px] rounded-[6px] border border-[#C1C1C1] bg-[#CCCCCC] p-4 accent-black"
                />
                <label htmlFor="shoes">Shoes</label>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="shoes"
                  className="h-6 w-6 rounded-[4px] rounded-[6px] border border-[#C1C1C1] bg-[#CCCCCC] p-4 accent-black"
                />
                <label htmlFor="shoes">Shoes</label>
              </div>
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="shoes"
                  className="h-6 w-6 rounded-[4px] rounded-[6px] border border-[#C1C1C1] bg-[#CCCCCC] p-4 accent-black"
                />
                <label htmlFor="shoes">Shoes</label>
              </div>
            </div>
          </form>

          {/* <div >Pagination</div> */}
        </div>
      </div>
    </main>
    // </HydrateClient>
  );
}
