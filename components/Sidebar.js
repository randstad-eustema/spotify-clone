"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

export default function Sidebar({ songs }) {
  const pathname = usePathname();

  const nav = useMemo(
    () => [
      {
        Icon: HiHome,
        label: "Home",
        href: "/",
        active: pathname === "/",
      },
      {
        Icon: BiSearch,
        label: "Search",
        href: "/search",
        active: pathname === "/search",
      },
      {
        Icon: AiFillHeart,
        label: "Liked",
        href: "/liked",
        active: pathname === "/liked",
      },
    ],
    [pathname]
  );

  return (
    <aside className="hidden w-[300px] md:flex flex-col gap-2">
      <Box className="p-5 flex flex-col gap-y-4">
        {nav.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </Box>
      <Box className="p-5 grow">
        <Library songs={songs} />
      </Box>
    </aside>
  );
}
