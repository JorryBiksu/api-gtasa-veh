import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === "GET") {
    // Assuming you have some authentication logic to get the user ID
    const userId = getUserIdFromSomeLogic(); // Replace with your logic

    try {
      const userDetails = await prisma.user.findOne({
        where: {
          id: userId,
        },
      });

      if (!userDetails) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(userDetails);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
