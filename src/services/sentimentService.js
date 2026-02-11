import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyseImage = async (imagePath) => {
  try {
    const buffer = fs.readFileSync(imagePath);
    const base64Data = buffer.toString("base64");

    const ext = path.extname(imagePath).toLowerCase();
    const mimeType = "image/png";

    const prompt = `Return ONLY valid JSON:
        {
          "scene": "...",
          "mood": "...",
          "tags": ["..."]
        }`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            { inlineData: { mimeType, data: base64Data } },
          ],
        },
      ],
      generationConfig: { responseMimeType: "application/json" },
    });

    const text =
      result.text || result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Empty Gemini response");

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini error:", error);
    throw new Error("Image analysis failed");
  }
};
