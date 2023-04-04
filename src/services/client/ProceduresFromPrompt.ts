import axios from "axios"
import { ProceduresFromPromptResponse } from "../../model/DataModel"

export const proceduresFromPrompt = async (prompt: string): Promise<string> => {
  const request = { prompt }
  const response = await axios.post("/api/proceduresFromPrompt", request)
  const json: ProceduresFromPromptResponse = response.data
  const modelResponse = json.modelResponse
  return modelResponse
}
