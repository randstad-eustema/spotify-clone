import "./globals.css";
import { Figtree } from "next/font/google";

import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";

import Sidebar from "@/components/Sidebar";
import AppContent from "@/components/AppContent";
import { getSongsByUserId } from "@/services/songs";
import Player from "@/components/Player";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Spotify clone using nextjs",
};

export default async function RootLayout({ children }) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={`${font.className} flex p-2 gap-2`}>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}></Sidebar>
            <AppContent>{children}</AppContent>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
