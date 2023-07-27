import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer";
import { useUser } from "@/providers/UserProvider";

export default function useOnPlay(songs) {
  const authModal = useAuthModal();
  const player = usePlayer();
  const { user } = useUser();

  function onPlay(id) {
    if (!user) return authModal.onOpen();

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  }

  return onPlay;
}
