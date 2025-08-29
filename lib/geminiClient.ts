// lib/geminiClient.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function getGeminiResponse(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5" }); // Ajustar conforme o modelo disponível
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}