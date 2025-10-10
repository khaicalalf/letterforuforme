import { supabase } from "../library/supabaseClient";
//import { isSafeWithGemini } from "./geminiService";
import { leetMap } from "../utils/leetMap";
import { banned } from "../utils/banned";
//const API_URL = import.meta.env.VITE_API_URL; // misal http://localhost:8080

// export async function submitLetter(content: string) {
//   const res = await fetch(`${API_URL}/letters`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ content }),
//   });
//   return res.json();
// }

function normalizeWord(word: string): string {
  let w = word.toLowerCase();
  w = w.replace(/[0-9]/g, (d) => leetMap[d] ?? d);
  w = w.replace(/[.,!?;:()"'`]/g, "");
  w = w.replace(/^([a-z])\1+/, "$1");
  w = w.replace(/([a-z])\1+/g, "$1");
  return w;
}

function isSafe(text: string): boolean {
  const words = text.split(/\s+/);
  for (const word of words) {
    const norm = normalizeWord(word);
    if (banned.includes(norm)) {
      return false;
    }
  }
  return true;
}

// export async function getRandomLetter(): Promise<string> {
//   let tries = 0;
//   const maxTries = 10; // biar gak infinite loop

//   while (tries < maxTries) {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/letters/random`);
//     const data = await res.json();

//     const content = data.letter ?? data.message ?? "";

//     if (isSafe(content)) {
//       return content;
//     }

//     tries++;
//   }

//   return "Belum ada pesan aman 😢";
// }

//Simpan pesan ke DB
export async function submitLetter(content: string) {
  const safe = isSafe(content);
  if (!safe) throw new Error("Pesan mengandung kata terlarang");
  const { error } = await supabase.from("letters").insert([{ content }]);
  if (error) throw error;
  return true;
}

// Ambil 1 pesan random dari DB
export async function getRandomLetter() {
  const { data, error } = await supabase.from("letters").select("content");

  if (error) throw error;

  if (data && data.length > 0) {
    let tries = 0;
    const maxTries = 10; // biar gak infinite loop

    while (tries < maxTries) {
      //console.log("data :", data);
      const random = data[Math.floor(Math.random() * data.length)];
      if (isSafe(random.content)) {
        //console.log("random ", random);
        return random.content;
      }

      tries++;
    }

    return "Belum ada pesan aman 😢";
  }

  // const { data, error } = await supabase.from("letters").select("content");
  // if (error) throw error;

  // const safeData = [];
  // for (const row of data) {
  //   const safe = await isSafeWithGemini(row.content);
  //   if (safe) safeData.push(row);
  // }

  // if (safeData.length > 0) {
  //   const random = safeData[Math.floor(Math.random() * safeData.length)];
  //   return random.content;
  // }
  // return "Belum ada pesan aman di database 😢";
}
