// pages/api/login.
import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";


export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  if (req.method === 'POST') {
    const { id, username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
			return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
