import { Configuration, OpenAIApi } from "openai"

const OPENAI_KEY = process.env.OPENAI_KEY

if (!OPENAI_KEY) {
  console.error("OpenAI API key not set in environment variables.")
}

const configuration = new Configuration({
  apiKey: OPENAI_KEY,
})
export const openai = new OpenAIApi(configuration)
