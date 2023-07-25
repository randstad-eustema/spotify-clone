import Header from "@/components/Header";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";

import { getSongsByTitle } from "@/services/songs";

export default async function Search({ searchParams }) {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <>
      <Header>
        <div className="flex flex-col gap-y-6">
          <h1 className="font-medium text-3xl">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <div className="px-4">
        <SearchResults songs={songs} />
      </div>
    </>
  );
}
