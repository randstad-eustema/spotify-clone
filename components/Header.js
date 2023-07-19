"use client";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Button from "./Button";
import NavButton from "./NavButton";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";

export default function Header({ children }) {
  const authModal = useAuthModal();
  const supabase = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
    router.refresh();
  }

  return (
    <header className="h-fit bg-gradient-to-b from-emerald-800 p-4">
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <NavButton>
            <RxCaretLeft size={35} />
          </NavButton>

          <NavButton>
            <RxCaretRight size={35} />
          </NavButton>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <NavButton className="bg-white text-black">
            <HiHome size={20} />
          </NavButton>

          <NavButton className="bg-white text-black">
            <BiSearch size={20} />
          </NavButton>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button
                className="bg-transparent text-white"
                onClick={authModal.onOpen}
              >
                Sign up
              </Button>
              <Button className="bg-white" onClick={authModal.onOpen}>
                Login
              </Button>
            </>
          )}
        </div>
      </div>
      {children}
    </header>
  );
}
