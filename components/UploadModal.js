import Button from "./Button";
import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";

export default function UploadModal() {
  const { isOpen, onClose } = useUploadModal();
  // chiude la modale
  function onChange(open) {
    if (!open) onClose();
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log("submit");
    // upload del file mp3 nel bucket "songs"
    // upload dell'immagine nel bucket "images"

    // insert nella tabella "songs" tutti i dati del form + i path ai file

    // reset del form
    // Messaggio tutto ok
  }

  return (
    <Modal
      title="Carica una canzone"
      description="descrizione"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={onSubmit}>
        <input id="title" type="text" placeholder="titolo della canzone" />
        <input id="author" type="text" placeholder="autore della canzone" />
        <input id="song" type="file" accept=".mp3" />
        <input id="image" type="file" accept="image/*" />
        <Button>Crea</Button>
      </form>
    </Modal>
  );
}
