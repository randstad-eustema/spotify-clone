import "./globals.css";
import { Figtree } from "next/font/google";

import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";

import Sidebar from "@/components/Sidebar";
import AppContent from "@/components/AppContent";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description: "Spotify clone using nextjs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className} flex p-2 gap-2`}>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar></Sidebar>
            <AppContent>{children}</AppContent>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
