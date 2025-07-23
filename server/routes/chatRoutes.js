import express from "express";
import { getChatReply } from "../services/geminiService.js";
const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });
  try {
    const reply = await getChatReply(message);
    res.json({ reply });
  } catch (error) {
    console.error("💥 Gemini Error:", error); // Detailed log
    res.status(500).json({ error: "Something went wrong on the server" });
  }


});

export default router;
