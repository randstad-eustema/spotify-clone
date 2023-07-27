import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function loadImage(imagePath) {
  const supabaseClient = useSupabaseClient();

  if (!imagePath) return;

  const { data } = supabaseClient.storage
    .from("images")
    .getPublicUrl(imagePath);

  return data.publicUrl;
}

export function loadSong(songPath) {
  const supabaseClient = useSupabaseClient();

  if (!songPath) return;

  const { data } = supabaseClient.storage.from("songs").getPublicUrl(songPath);

  return data.publicUrl;
}
