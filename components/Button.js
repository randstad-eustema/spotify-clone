"use client";

import { twMerge } from "tailwind-merge";

export default function Button({ children, className, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "w-full rounded-full bg-green-500 border border-transparent p-3 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition",
        className
      )}
    >
      {children}
    </button>
  );
}
