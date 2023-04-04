import { Configuration, OpenAIApi } from "openai"

const OPENAI_KEY = process.env.OPENAI_KEY

const configuration = new Configuration({
  apiKey: OPENAI_KEY,
})
export const openai = new OpenAIApi(configuration)
