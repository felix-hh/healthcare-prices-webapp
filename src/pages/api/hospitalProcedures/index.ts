// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { HospitalProcedure, PrismaClient } from "@prisma/client";

type Data = {
  hospitalProcedures: HospitalProcedure[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const prisma = new PrismaClient();
  const hospitalProcedures = await prisma.hospitalProcedure.findMany();

  res.status(200).json({ hospitalProcedures });
};

export default handler;
