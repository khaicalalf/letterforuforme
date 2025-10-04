import { supabase } from "../library/supabaseClient";
//import { isSafeWithGemini } from "./geminiService";
//const API_URL = import.meta.env.VITE_API_URL; // misal http://localhost:8080

// export async function submitLetter(content: string) {
//   const res = await fetch(`${API_URL}/letters`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ content }),
//   });
//   return res.json();
// }

const leetMap: Record<string, string> = {
  "0": "o",
  "1": "i",
  "2": "z",
  "3": "e",
  "4": "a",
  "5": "s",
  "6": "g",
  "7": "t",
  "8": "b",
  "9": "g",
};
const banned = [
  "bodoh",
  "goblok",
  "anjing",
  "bangsat",
  "tolol",
  "babi",
  "kontol",
  "memek",
  "ngentot",
  "jancuk",
  "jancuk",
  "perek",
  "pepek",
  "puki",
  "tai",
  "tempek",
  "brengsek",
  "sialan",
  "sial",
  "bajingan",
  "kampang",
  "kampret",
  "asu",
  "bego",
  "bejad",
  "brengsek",
  "gila",
  "goblok",
  "idiot",
  "jembut",
  "jelek",
  "kampang",
  "kampret",
  "kolot",
  "kudet",
  "lonte",
  "mampus",
  "maling",
  "ngaceng",
  "ngentot",
  "pejantan",
  "perek",
  "pepek",
  "puki",
  "setan",
  "tai",
  "tempek",
  "tolol",
  "toket",
  "brengsek",
  "sialan",
  "sial",
  "bajingan",
  "kontol",
  "anjeng",
  "babi",
  "bangsat",
  "memek",
  "jancuk",
  "jancuk",
  "asu",
  "bego",
  "bejad",
  "gila",
  "idiot",
  "jembut",
  "jelek",
  "kolot",
  "kudet",
  "lonte",
  "mampus",
  "maling",
  "ngaceng",
  "pejantan",
  "setan",
  "toket",
  "projek jelek",
  "proyek jelek",
  "proyek goblok",
  "projek goblok",
  "apa",
  "kacrut",
  "kampang",
  "kampret",
  "kontol",
  "ngentot",
  "perek",
  "pepek",
  "puki",
  "tai",
  "tempek",
  "tolol",
  "toket",
  "brengsek",
  "sialan",
  "sial",
  "bajingan",
  "anjing",
  "bangsat",
  "babi",
  "memek",
  "jancuk",
  "asu",
  "bego",
  "bejad",
  "gila",
  "idiot",
  "jembut",
  "jelek",
  "kolot",
  "kudet",
  "lonte",
  "mampus",
  "maling",
  "ngaceng",
  "pejantan",
  "setan",
  "sad",
  "apa",
  "kacrut",
  "kampang",
  "jlk",
  "jlek",
  "kmprt",
  "kntol",
  "ngntot",
  "prjk",
  "ngtt",
  "tai",
  "tt",
];

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
    // daftar kata yang mau dibanned
    const banned = [
      "bodoh",
      "goblok",
      "anjing",
      "bangsat",
      "tolol",
      "babi",
      "kontol",
      "memek",
      "ngentot",
      "jancuk",
      "jancuk",
      "perek",
      "pepek",
      "puki",
      "tai",
      "tempek",
      "brengsek",
      "sialan",
      "sial",
      "bajingan",
      "kampang",
      "kampret",
      "asu",
      "bego",
      "bejad",
      "brengsek",
      "gila",
      "goblok",
      "idiot",
      "jembut",
      "jelek",
      "kampang",
      "kampret",
      "kolot",
      "kudet",
      "lonte",
      "mampus",
      "maling",
      "ngaceng",
      "ngentot",
      "pejantan",
      "perek",
      "pepek",
      "puki",
      "setan",
      "tai",
      "tempek",
      "tolol",
      "toket",
      "brengsek",
      "sialan",
      "sial",
      "bajingan",
      "kontol",
      "anjeng",
      "babi",
      "bangsat",
      "memek",
      "jancuk",
      "jancuk",
      "asu",
      "bego",
      "bejad",
      "gila",
      "idiot",
      "jembut",
      "jelek",
      "kolot",
      "kudet",
      "lonte",
      "mampus",
      "maling",
      "ngaceng",
      "pejantan",
      "setan",
      "toket",
      "projek jelek",
      "proyek jelek",
      "proyek goblok",
      "projek goblok",
      "apa",
      "kacrut",
      "kampang",
      "kampret",
      "kontol",
      "ngentot",
      "perek",
      "pepek",
      "puki",
      "tai",
      "tempek",
      "tolol",
      "toket",
      "brengsek",
      "sialan",
      "sial",
      "bajingan",
      "anjing",
      "bangsat",
      "babi",
      "memek",
      "jancuk",
      "asu",
      "bego",
      "bejad",
      "gila",
      "idiot",
      "jembut",
      "jelek",
      "kolot",
      "kudet",
      "lonte",
      "mampus",
      "maling",
      "ngaceng",
      "pejantan",
      "setan",
      "sad",
    ];

    // fungsi normalisasi kata biar variasi kayak "jjeleeekkk" tetep kena
    function normalizeWord(word: string) {
      word = word.toLowerCase();
      // ganti angka jadi huruf mirip
      const map: Record<string, string> = {
        "0": "o",
        "1": "i",
        "2": "z",
        "3": "e",
        "4": "a",
        "5": "s",
        "6": "g",
        "7": "t",
        "8": "b",
        "9": "g",
      };
      word = word.replace(/[0123456789]/g, (d) => map[d] || d);
      word = word.replace(/[.,!?;:()"'`]/g, ""); // hapus tanda baca

      // hapus huruf dobel di depan
      word = word.replace(/^([a-z])\1+/, "$1");

      // kompres huruf berulang lebih dari 2x jadi 1
      word = word.replace(/([a-z])\1+/g, "$1");

      return word;
    }

    // filter data aman
    const safeData = data.filter((row) => {
      const words = row.content.toLowerCase().split(/\s+/);
      for (const word of words) {
        const norm = normalizeWord(word);
        if (banned.includes(norm)) {
          return false; // ada kata terlarang
        }
      }
      return true;
    });

    if (safeData.length > 0) {
      const random = safeData[Math.floor(Math.random() * safeData.length)];
      return random.content;
    } else {
      return "Belum ada pesan aman 😢";
    }
  }

  return null;
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
