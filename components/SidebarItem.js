import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function SidebarItem({ Icon, href, label, active }) {
  return (
    <Link
      href={href}
      className={twMerge(
        "flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1",
        active && "text-white"
      )}
    >
      <Icon size={26} /> <p>{label}</p>
    </Link>
  );
}
