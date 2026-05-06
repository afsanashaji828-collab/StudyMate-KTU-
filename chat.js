const express = require("express");
const router = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { message, subjectCode } = req.body;

    if (!message) {
      return res.json({
        success: true,
        data: { answer: "Ask a proper question." },
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are a KTU academic assistant.

Subject: ${subjectCode}

Question:
${message}

Instructions:
- Give syllabus-oriented answer
- Avoid generic answers
- 10 mark → detailed
- 5 mark → medium
- 2 mark → short

Answer:
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      data: {
        answer: text,
        reply: text,
      },
    });

  } catch (err) {
    console.error("CHAT ERROR:", err);

    res.status(500).json({
      success: false,
      data: {
        answer: "Backend error occurred",
      },
    });
  }
});

module.exports = router;
console.log("KEY:", process.env.GEMINI_API_KEY);