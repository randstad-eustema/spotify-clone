import SongItem from "@/components/SongItem";

export default function PageContent({ songs }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid:cols-8 gap-4 mt-4">
      {songs.map((song) => (
        <SongItem data={song} />
      ))}
    </div>
  );
}
