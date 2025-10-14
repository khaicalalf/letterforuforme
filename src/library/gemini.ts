import { GoogleGenerativeAI } from "@google/generative-ai";

export const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function checkBadwordGemini(text: string): Promise<boolean> {
  const prompt = `
Kamu adalah filter teks. 
Jika input mengandung kata kasar, cabul, diskriminatif, politis, berbau politik atau ofensif dalam bahasa Indonesia maupun bahasa Inggris, jawab hanya dengan "true". 
Jika aman, jawab "false".
Teks: ${text}
`;

  const result = await model.generateContent(prompt);
  const response = result.response.text().trim().toLowerCase();
  return response === "true";
}
