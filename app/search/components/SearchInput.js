"use client";
import qs from "query-string";

import { useEffect, useState } from "react";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    // /search?title=cioccolato
    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue]);

  return (
    <input
      className="flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
      placeholder="Inizia la ricerca..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
