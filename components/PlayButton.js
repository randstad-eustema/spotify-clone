import { FaPlay } from "react-icons/fa";

export default function PlayButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
    >
      <FaPlay />
    </button>
  );
}
