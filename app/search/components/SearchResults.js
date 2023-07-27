"use client";
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
        <div key={song.id}>
          <MediaItem data={song} onClick={(id) => onPlay(id)} key={song.id} />
        </div>
      ))}
    </div>
  );
}
