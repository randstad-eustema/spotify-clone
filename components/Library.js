import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { useUser } from "@/providers/UserProvider";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";

export default function Library() {
  const { user } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  function onClick() {
    // se l'utente non è loggato api la modale di autenticazione
    if (!user) {
      authModal.onOpen();
    } else {
      // altrimenti apri la modale per aggiugnere una canzone
      uploadModal.onOpen();
    }
  }

  return (
    <>
      <div className="flex justify-between items-center text-neutral-400">
        <div className="flex gap-x-4">
          <TbPlaylist size={26} />
          <p className="text-md font-medium">Your Library</p>
        </div>
        <AiOutlinePlus
          className="cursor-pointer hover:text-white transition"
          onClick={onClick}
        />
      </div>
      <div className="mt-4 px-3">Lista Canzoni</div>
    </>
  );
}
