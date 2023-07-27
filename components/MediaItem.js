"use client";

import Image from "next/image";

import { loadImage } from "@/services/storage";

export default function MediaItem({ data }) {
  const image = loadImage(data.image_path);

  return (
    <div className="flex items-center gap-x-3 cursor-pointer my-4 w-full rounded-md hover:bg-neutral-800/50">
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image className="object-cover" fill src={image} alt="Cover" />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <h3 className="text-white truncate">{data.title}</h3>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
}
