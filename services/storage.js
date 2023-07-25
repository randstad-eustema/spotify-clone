import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function loadImage(imagePath) {
  if (!imagePath) return;

  const supabaseClient = useSupabaseClient();

  const { data } = supabaseClient.storage
    .from("images")
    .getPublicUrl(imagePath);

  return data.publicUrl;
}
