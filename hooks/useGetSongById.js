import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

export default function useGetSongById(id) {
  const [song, setSong] = useState(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) return;

    async function fetchSong() {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
      }

      setSong(data);
    }

    fetchSong();
  }, [id, supabaseClient]);

  return { song };
}
