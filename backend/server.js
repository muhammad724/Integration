import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({}); // reads GEMINI_API_KEY from .env

// ✅ /ask route
app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash", // free model
      contents: prompt,
    });

    // Safe access to text
    const text =
      result?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.json({ answer: text });
  } catch (error) {
    console.error("ERROR DETAILS:", error);
    res.status(500).json({ error: error.message });
  }
});

// Optional test route
app.get("/", (req, res) => res.send("Gemini API Server is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));