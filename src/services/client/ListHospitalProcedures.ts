import { HospitalProcedure } from "@prisma/client"
import axios from "axios"
import { ListHospitalProceduresResponse } from "../../model/DataModel"
import { TableItem } from "../../model/TableModel"

export const listHospitalProcedures = async (
  cptCodes?: number[],
  hospitalNames?: string[]
): Promise<TableItem<HospitalProcedure>[]> => {
  const request = { cptCodes, hospitalNames }
  const response = await axios.post(
    "http://localhost:3000/api/hospitalProcedures",
    request
  )
  const json: ListHospitalProceduresResponse = response.data
  const hospitalProcedures = json.hospitalProcedures.map((item) => ({
    ...item,
    key: item.id.toString(),
  }))
  return hospitalProcedures
}
