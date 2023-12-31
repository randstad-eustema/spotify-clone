import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getSongs() {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return data || [];
}

export async function getSongsByUserId() {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    console.log(sessionError);
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  if (error) console.log(error);

  return data || [];
}

export async function getSongsByTitle(title) {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // se non c'è il titolo allora recupero tutte le canzoni
  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  // recupero le canzoni in base al titolo
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return data || [];
}

export async function getLikedSongs() {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError);
    return [];
  }

  let ids = [];

  try {
    const resp = await fetch(
      `http://localhost:3001/api/readAllByUserId/${sessionData.session?.user.id}`
    );
    const data = await resp.json();
    if (resp.ok && data) {
      ids = data.map((elm) => elm.song_id);
    }
  } catch (error) {}

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .in("id", ids)
    .order("created_at", { ascending: false });

  if (error) console.log(error);

  return data || [];
}
