// pages/api/create-new.js
import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  if (req.method === "POST") {
    const {username, password, role} = req.body
    try {
      const users = await prisma.user.create({
        data: {
          username,
          password,
          role,
        },
      });
      res.status(201).json({message:"success created user", users});
    } catch (e) {
      res.status(500).json(e);
    }
  }else{
    res.status(405).json({message: "method not allowed"})
  }
}
