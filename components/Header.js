import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

import Button from "./Button";
import NavButton from "./NavButton";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

export default function Header({ children }) {
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
          <Button className="bg-transparent text-white">Sign up</Button>
          <Button className="bg-white">Login</Button>
        </div>
      </div>
      {children}
    </header>
  );
}
