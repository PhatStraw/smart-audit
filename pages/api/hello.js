require("dotenv").config();
import { OpenAI } from "langchain/llms/openai";

const openai = new OpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_CHAT_GPT,
  temperature: 0
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { code } = req.body;
    try {
      const response = await openai.predict(
        `you are a senior blockchain developer, interviewing for a high paying position. given this smart contract how could I be exploited? 
        
        smart contract: ${code}
      `
      );
      res.status(200).json({ response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
