"use client";

import usePlayer from "@/hooks/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";

import { loadSong } from "@/services/storage";

import PlayerContent from "./PlayerContent";

export default function Player() {
  const player = usePlayer();
  // recupero la canzone dal backend
  const { song } = useGetSongById(player.activeId);
  const songUrl = loadSong(song?.song_path);

  if (!song || !songUrl || !player.activeId) return;

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-black py-2 px-4">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
}
