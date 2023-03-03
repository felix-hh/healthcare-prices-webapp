import type { NextApiRequest, NextApiResponse } from "next"
import { ListHospitalProceduresResponse } from "../../../model/DataModel"
import { serverListHospitalProcedures } from "../../../services/server/ServerListHospitalProcedures"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ListHospitalProceduresResponse>
) => {
  let { cptCodes, hospitalNames } = req.body
  cptCodes =
    Array.isArray(cptCodes) && cptCodes.length > 0 ? cptCodes : undefined
  hospitalNames =
    Array.isArray(hospitalNames) && hospitalNames.length > 0
      ? hospitalNames
      : undefined

  const hospitalProcedures = await serverListHospitalProcedures(
    cptCodes,
    hospitalNames
  )

  res.status(200).json({ hospitalProcedures })
}

export default handler
