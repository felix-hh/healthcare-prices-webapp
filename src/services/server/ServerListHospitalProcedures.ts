import { PAGE_SIZE_LIST_HOSPITAL_PROCEDURES } from "./../../utils/AppConstants"
import { prismaClient } from "./Database"

export const serverListHospitalProcedures = async (
  cptCodes?: string[],
  hospitalNames?: string[]
) => {
  let hospitalProceduresData = await prismaClient.hospitalProcedure.findMany({
    take: PAGE_SIZE_LIST_HOSPITAL_PROCEDURES,
    orderBy: [
      {
        average_charge: "desc",
      },
    ],
    ...((hospitalNames || cptCodes) && {
      where: {
        ...(hospitalNames ? { hospital_name: { in: hospitalNames } } : {}),
        ...(cptCodes ? { cpt_code: { in: cptCodes } } : {}),
      },
    }),
  })
  hospitalProceduresData = hospitalProceduresData.map((item) => {
    return {
      ...item,
      procedure_name: item.procedure_name?.trim() || "",
    }
  })
  return hospitalProceduresData
}

export const serverListDistinctHospitalNames = async () => {
  const hospitalNames = await prismaClient.hospitalProcedure.findMany({
    distinct: "hospital_name",
    select: {
      hospital_name: true,
    },
    orderBy: {
      hospital_name: "asc",
    },
  })
  return hospitalNames.map((item) => item.hospital_name)
}

export const serverListDistinctCPTCodes = async () => {
  const cptCodes = await prismaClient.hospitalProcedure.findMany({
    distinct: "cpt_code",
    select: {
      cpt_code: true,
    },
    orderBy: {
      cpt_code: "asc",
    },
  })
  return cptCodes.map((item) => String(item.cpt_code).padStart(5, "0"))
}
