import { twMerge } from "tailwind-merge";

export default function Box({ children, className }) {
  return (
    <div
      className={twMerge("bg-neutral-900 rounded-lg w-full h-fit", className)}
    >
      {children}
    </div>
  );
}
