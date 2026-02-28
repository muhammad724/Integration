// import express from "express";
// import { GoogleGenAI } from "@google/genai";

// const aiRouter = express.Router();
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// aiRouter.post("/generate", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const response = await ai.models.generateContent({
//       model: "gemini-3-flash-preview",
//       contents: prompt,
//     });

//     res.json({ result: response.text });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// export default aiRouter;