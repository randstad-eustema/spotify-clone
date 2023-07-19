import Header from "@/components/Header";
import { getSongs } from "@/services/songs";

import PageContent from "./components/PageContent";

export default async function Home() {
  const songs = await getSongs();

  return (
    <>
      <Header>
        <h1 className="font-medium text-3xl">Bentornato!</h1>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <PageContent songs={songs} />
      </div>
    </>
  );
}
