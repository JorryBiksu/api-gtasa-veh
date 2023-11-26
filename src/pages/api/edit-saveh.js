import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)

  if (req.method === "GET") {
    const { skip, createdBy } = req.query;
    try {
      const list = await prisma.saveh.findMany({
        where: {
          createdBy,
        },
        skip: parseInt(skip),
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      });

      const countData = await prisma.saveh.count({
        where: {
          createdBy,
        }
      })

      res.status(200).json({ message: "success get item", totalData: countData, saveh: list });
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(405).json({ message: "method not allowed" })
  }
}