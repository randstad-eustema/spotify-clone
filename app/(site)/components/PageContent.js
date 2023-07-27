"use client";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";

export default function PageContent({ songs }) {
  const onPlay = useOnPlay();
  if (songs.length === 0) {
    return <h2>Non ci sono canzoni</h2>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((song) => (
        <SongItem key={song.id} onClick={(id) => onPlay(id)} data={song} />
      ))}
    </div>
  );
}
