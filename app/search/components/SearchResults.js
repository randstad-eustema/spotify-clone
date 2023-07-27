"use client";
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";

import useOnPlay from "@/hooks/useOnPlay";

export default function SearchResults({ songs }) {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <h2>La ricerca non ha prodotto risultati</h2>;
  }

  return (
    <div className="flex flex-col w-full px-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center w-full">
          <MediaItem data={song} onClick={(id) => onPlay(id)} key={song.id} />
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
}
