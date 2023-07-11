import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

export default function Library() {
  return (
    <>
      <div className="flex justify-between items-center text-neutral-400">
        <div className="flex gap-x-4">
          <TbPlaylist size={26} />
          <p className="text-md font-medium">Your Library</p>
        </div>
        <AiOutlinePlus className="cursor-pointer hover:text-white transition" />
      </div>
      <div className="mt-4 px-3">Lista Canzoni</div>
    </>
  );
}
