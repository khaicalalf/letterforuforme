import { supabase } from "../library/supabaseClient";

// Simpan pesan ke DB
export async function submitLetter(content: string) {
  const { error } = await supabase.from("letters").insert([{ content }]);
  if (error) throw error;
  return true;
}

// Ambil 1 pesan random dari DB
export async function getRandomLetter() {
  const { data, error } = await supabase.from("letters").select("content");

  if (error) throw error;

  if (data && data.length > 0) {
    const random = data[Math.floor(Math.random() * data.length)];
    return random.content;
  }
  return null;
}
