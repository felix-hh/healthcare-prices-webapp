import { HospitalProcedure } from "@prisma/client"

export type ListHospitalProceduresResponse = {
  hospitalProcedures: HospitalProcedure[]
}

export type ListDistinctHospitalNames = {
  hospitalNames: string[]
}

export type ListDistinctCPTCodes = {
  cptCodes: number[]
}
