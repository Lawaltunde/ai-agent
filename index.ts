
import { config } from "dotenv";
config();
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";


// specify the model to user for generating text and a prompt
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

const { text } = await generateText({
    model: google("gemini-1.5-pro"),
    prompt: "What is an AI agent?",
});


console.log(text);