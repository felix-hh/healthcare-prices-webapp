import { HospitalProcedure } from "@prisma/client"

export const mockListHospitalProcedures: HospitalProcedure[] = [
  {
    id: 1,
    hospital_name: "hospital",
    cpt_code: "99282",
    procedure_name: "emergency lv 2",
    average_charge: 72811,
    state: "IL",
  },
]
