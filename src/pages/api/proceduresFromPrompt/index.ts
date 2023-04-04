import type { NextApiRequest, NextApiResponse } from "next"
import { ProceduresFromPromptResponse } from "../../../model/DataModel"
import { getMedicalProcedures } from "../../../services/server/ServerProceduresFromPrompt"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ProceduresFromPromptResponse>
) => {
  const { prompt } = req.body

  const modelResponse = await getMedicalProcedures(prompt)

  res.status(200).json({ modelResponse })
}

export default handler
