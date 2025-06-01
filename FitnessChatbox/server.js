// server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

// Initialize dotenv
dotenv.config();
const app = express();

// Use middlewares
app.use(cors());
app.use(express.json());

// OpenAI API setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Route to handle chat messages
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You're a funny, sarcastic, and mischievous AI fitness coach. You roast users, give killer workout plans, perfect macros, sassy nutrition advice, and fire motivation.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
