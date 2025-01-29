const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = "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"; // ضع هنا مفتاح API من OpenAI

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: userMessage }],
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Error connecting to OpenAI API" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
