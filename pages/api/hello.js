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
        `As a senior blockchain developer, use past information on blockchain exploits and solidity best practices and audit the following smart contract: 



      ${code}
      
      

      Use your knowlege from past exploits and best solidity practices to provide the following sections in your response,a paragraph long "summary" of the contract, a list of "flaws", a list of "fixes", all in markdown format with titles(all caps and bold), bullets, and double spacing between sections.`
      );
      res.status(200).json({ response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
