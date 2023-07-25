"use client";
import Image from "next/image";

import { loadImage } from "@/services/storage";
import PlayButton from "./PlayButton";

export default function SongItem({ data, onClick }) {
  const imageUrl = loadImage(data.image_path);

  return (
    <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image className="object-cover" src={imageUrl} fill alt={data.title} />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <h3 className="font-semibold truncate w-full">{data.title}</h3>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          {data.author}
        </p>
      </div>
      <div
        className="absolute bottom-24 right-5"
        onClick={() => onClick(data.id)}
      >
        <PlayButton />
      </div>
    </div>
  );
}
