const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = "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",
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
