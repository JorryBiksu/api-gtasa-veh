import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  if (req.method === "DELETE") {
    const { id } = req.query
    try {
      await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json({ message: "success deleted data" });
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(405).json({ message: "method not allowed" })
  }
}
