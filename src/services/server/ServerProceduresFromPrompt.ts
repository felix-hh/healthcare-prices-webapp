import { AxiosResponse } from "axios"
import { openai } from "../resources/OpenAI"

export async function getMedicalProcedures(
  patientQuery: string
): Promise<string> {
  const prompt = `Based on the symptoms described: '${patientQuery}', what medical procedures might be needed? Please list
  the procedures along with their CPT codes, and don't indicate any alternatives or optional procedures.`

  try {
    const response: AxiosResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 200,
    })

    const apiResponse = response.data.choices[0].text.trim()
    return apiResponse
  } catch (error) {
    console.error("Error getting medical procedures:", error)
    return ""
  }
}
