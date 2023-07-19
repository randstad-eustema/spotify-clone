import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";

import Button from "./Button";
import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/providers/UserProvider";

export default function UploadModal() {
  const { isOpen, onClose } = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  // chiude la modale
  function onChange(open) {
    if (!open) onClose();
  }

  async function onSubmit(values) {
    console.log(values);
    try {
      setIsLoading(true);

      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      if (!songFile || !imageFile) return; // TODO: throw custom error

      const uniqueID = uniqid();
      // upload del file mp3 nel bucket "songs"
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return; // TODO: throw custom error
      }

      // upload dell'immagine nel bucket "images"
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return; // TODO: throw custom error
      }

      // insert nella tabella "songs" tutti i dati del form + i path ai file
      const { error: insertError } = await supabaseClient.from("songs").insert({
        title: values.title,
        author: values.author,
        song_path: songData.path,
        image_path: imageData.path,
        user_id: user.id,
      });

      if (insertError) {
        setIsLoading(false);
        return;
      }

      // TODO: Messaggio tutto ok
      // reset del form
      reset();
      // chiudo la modale
      onClose();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Carica una canzone"
      description="descrizione"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          id="title"
          type="text"
          className="flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
          {...register("title", { required: true })}
          placeholder="titolo della canzone"
        />
        <input
          id="author"
          type="text"
          className="flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
          {...register("author", { required: true })}
          placeholder="autore della canzone"
        />
        <div>
          <label className="pb-1">Seleziona Canzone</label>
          <input
            id="song"
            type="file"
            className="flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
            {...register("song", { required: true })}
            accept=".mp3"
          />
        </div>
        <div>
          <label className="pb-1">Seleziona Cover</label>
          <input
            id="image"
            type="file"
            className="flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
            {...register("image", { required: true })}
            accept="image/*"
          />
        </div>
        <Button disabled={isLoading}>Crea</Button>
      </form>
    </Modal>
  );
}
