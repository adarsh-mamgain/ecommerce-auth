// import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import Link from "next/link";
import Header from "./_components/Header";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main>
        <Header />

        {true && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="mt-10 w-[576px] rounded-[20px] border px-16 pb-24 pt-10">
              <h1 className="mb-8 text-center text-[32px] font-semibold">
                Create your account
              </h1>
              <form action="" method="post">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter"
                      className="rounded-[6px] border border-[#C1C1C1] p-4"
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
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter"
                      className="rounded-[6px] border border-[#C1C1C1] p-4"
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
        )}

        {true && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="mt-10 w-[576px] rounded-[20px] border px-16 pb-12 pt-10">
              <h1 className="mb-8 text-center text-[32px] font-semibold">
                Verify your email
              </h1>
              <p className="mb-8 text-center">
                Enter the 8 digit code you have received on{" "}
                <span className="font-medium">swa***@gmail.com</span>
              </p>
              <form action="" method="post">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="code">Code</label>
                    {/* <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter"
                      className="rounded-[6px] border border-[#C1C1C1] p-4"
                    /> */}
                    <div id="otp-input">
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="9"
                        autoComplete="no"
                        pattern="\d*"
                        className="rounded-[6px] border border-[#C1C1C1] p-4"
                      />
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="9"
                        autoComplete="no"
                        pattern="\d*"
                        className="rounded-[6px] border border-[#C1C1C1] p-4"
                      />
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="9"
                        autoComplete="no"
                        pattern="\d*"
                        className="rounded-[6px] border border-[#C1C1C1] p-4"
                      />
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="9"
                        autoComplete="no"
                        pattern="\d*"
                        className="rounded-[6px] border border-[#C1C1C1] p-4"
                      />
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="9"
                        autoComplete="no"
                        pattern="\d*"
                        className="rounded-[6px] border border-[#C1C1C1] p-4"
                      />
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="9"
                        autoComplete="no"
                        pattern="\d*"
                        className="rounded-[6px] border border-[#C1C1C1] p-4"
                      />
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="9"
                        autoComplete="no"
                        pattern="\d*"
                        className="rounded-[6px] border border-[#C1C1C1] p-4"
                      />
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="9"
                        autoComplete="no"
                        pattern="\d*"
                        className="rounded-[6px] border border-[#C1C1C1] p-4"
                      />
                    </div>
                    <input type="hidden" name="otp" />
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
        )}
      </main>
    </HydrateClient>
  );
}
