"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../_components/Header";
import { api } from "~/trpc/react";

export default function Protected() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const router = useRouter();

  const utils = api.useUtils();

  const {
    data,
    isLoading: categoriesLoading,
    error,
  } = api.category.getCategories.useQuery(
    { page, pageSize },
    {
      enabled: !isLoading,
    },
  );

  const updateCategory = api.category.updateUserCategory.useMutation({
    onSuccess: async () => {
      await utils.category.getCategories.invalidate({ page, pageSize });
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleCategoryToggle = (categoryId: number, selected: boolean) => {
    updateCategory.mutate({ categoryId, selected: !selected });
  };

  if (isLoading || categoriesLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center text-2xl font-medium">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

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
          <div className="flex flex-col gap-6">
            {data?.categories.map((category) => (
              <div key={category.id} className="flex gap-3">
                <input
                  type="checkbox"
                  name="checkbox"
                  id={`category-${category.id}`}
                  checked={category.selected}
                  onChange={() =>
                    handleCategoryToggle(category.id, category.selected)
                  }
                  className="h-6 w-6 rounded-[4px] rounded-[6px] border border-[#C1C1C1] bg-[#CCCCCC] p-4 accent-black"
                />
                <label htmlFor={`category-${category.id}`}>
                  {category.name}
                </label>
              </div>
            ))}
          </div>

          <nav
            aria-label="Pagination"
            className="mt-16 flex items-center justify-center gap-2 text-xl"
          >
            <button onClick={() => setPage(1)}>
              <img src="/assets/angles-left.svg" width={15} alt="angles-left" />
            </button>
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
              <img
                src="/assets/chevron-left.svg"
                width={15}
                alt="chevron-left"
              />
            </button>
            <ul className="flex gap-2">
              {Array.from(
                { length: data?.totalPages ?? 0 },
                (_, i) => i + 1,
              ).map((pageNum) => (
                <li key={pageNum}>
                  <button
                    className={`text-[#ACACAC] hover:text-black ${pageNum === page ? "font-bold" : ""}`}
                    aria-current={pageNum === page ? "page" : undefined}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, data?.totalPages ?? 1))
              }
            >
              <img
                src="/assets/chevron-right.svg"
                width={15}
                alt="chevron-right"
              />
            </button>
            <button onClick={() => setPage(data?.totalPages ?? 1)}>
              <img
                src="/assets/angles-right.svg"
                width={15}
                alt="angles-right"
              />
            </button>
          </nav>
        </div>
      </div>
    </main>
  );
}
