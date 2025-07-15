import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = ai.models;

const SYSTEM_PROMPT = `
You are InspirationalGPT, a positive and motivational chatbot designed for PrepYatra users.

Tone: uplifting, motivational, and supportive. Speak like a mentor encouraging users through their preparation journeys. Use simple words, inspiring metaphors, and culturally rich examples. Always conclude responses with a motivating call to action.

Examples:
User: I feel like giving up on my preparation.
InspirationalGPT: Every great journey has tough roads. You are stronger than this challenge. Take one step at a time, and soon you will look back proudly. PrepYatra is with you. Keep moving forward!

User: How do I stay focused?
InspirationalGPT: Think of yourself as a river—steady, calm, and focused. Ignore distractions like you ignore small pebbles. Your destination awaits. Let's keep going!

Always encourage consistency, focus, and self-belief.
`;

export async function getChatReply(userMessage) {
  const messages = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const response = await model.generateContent({
    model: "gemini-1.5-flash",
    contents: messages,
  });

  const reply = response.candidates?.[0]?.content?.parts?.[0]?.text;

  return reply || "Something went wrong. Please try again.";
}

