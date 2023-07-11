"use client";
import { twMerge } from "tailwind-merge";

export default function NavButton({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "bg-black rounded-full hover:opacity-75 transition-opacity h-[35px] w-[35px] flex items-center justify-center",
        className
      )}
    >
      {children}
    </button>
  );
}
