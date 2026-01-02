import { GoogleGenAI } from "@google/genai";

// This service is set up for future extensibility (e.g., generating bingo themes or jokes).
// Currently not used in the core bingo logic to ensure low latency and offline capability.

export const initializeGemini = () => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found for Gemini");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};
