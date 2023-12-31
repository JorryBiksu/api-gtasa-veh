import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)

  if (req.method === "GET") {
    const { skip }= req.query;
    try {
      const list = await prisma.user.findMany({
        skip: parseInt(skip),
        take:10,
        orderBy: {
          createdAt: "desc",
        },
      });

      const countData = await prisma.user.count()

      res.status(200).json({ message:"success get user", totalData: countData, user: list });
    } catch (e) {
      res.status(500).json(e);
    }
  }else{
    res.status(405).json({message: "method not allowed"})
  }
}