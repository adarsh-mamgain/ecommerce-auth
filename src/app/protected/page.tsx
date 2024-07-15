"use client";
import Header from "../_components/Header";
import chevronRight from "../../../public/assets/chevron-right.svg";
import chevronLeft from "../../../public/assets/chevron-left.svg";
import anglesRight from "../../../public/assets/angles-right.svg";
import anglesLeft from "../../../public/assets/angles-left.svg";
import Image from "next/image";

export default function Login() {
  return (
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

          <nav
            aria-label="Pagination"
            className="mt-16 flex items-center justify-center gap-2 text-xl"
          >
            <button
              aria-label="First page"
              className="text-[#ACACAC] hover:text-black"
            >
              <Image src={anglesLeft} alt="" height={16} />
            </button>
            <button
              aria-label="Previous page"
              className="text-[#ACACAC] hover:text-black"
            >
              <Image src={chevronLeft} alt="" height={15} />
            </button>
            <ul className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                <li key={page}>
                  <button
                    className={`text-[#ACACAC] hover:text-black ${page === 4 ? "font-bold" : ""}`}
                    aria-current={page === 4 ? "page" : undefined}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li>
                <span className="text-[#ACACAC]">...</span>
              </li>
            </ul>
            <button
              aria-label="Next page"
              className="text-[#ACACAC] hover:text-black"
            >
              <Image src={chevronRight} alt="" height={15} />
            </button>
            <button
              aria-label="Last page"
              className="text-[#ACACAC] hover:text-black"
            >
              <Image src={anglesRight} alt="" height={16} />
            </button>
          </nav>
        </div>
      </div>
    </main>
  );
}
