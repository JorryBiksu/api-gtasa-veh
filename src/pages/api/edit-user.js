import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  if (req.method === "PUT") {
    const { username, password, role } = req.body
    const { id } = req.query
    try {
      const updateUser = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          username,
          password,
          role,
        },
      });
      res.status(200).json({ message: "sucess update data", updateUser });
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(405).json({ message: "method not allowed" })
  }
}
