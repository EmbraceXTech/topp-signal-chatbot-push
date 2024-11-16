import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const HYPERBOLIC_API_KEY = process.env.HYPERBOLIC_API_KEY;

const client = new OpenAI({
  apiKey: HYPERBOLIC_API_KEY,
  baseURL: "https://api.hyperbolic.xyz/v1",
});

export const runHyperbolic = async (message: string) => {
  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Hey! You're hosting a crypto prediction game. Keep it casual and fun! Your job:
- Chat about price predictions
- Your answer must one sentence, word not more than 5
- Get players excited to compete
- Notice cool predictions
- Ask why they think that
- Remind them to join in
- Keep it fun and flowing
Just jump right in like you're already chatting!`,
      },
      {
        role: "user",
        content: `Here are the recent messages from our prediction game chat. Please respond naturally to continue the discussion:

${message}`,
      },
    ],
    model: "meta-llama/Meta-Llama-3-70B-Instruct",
  });

  return response.choices[0].message.content;
};
