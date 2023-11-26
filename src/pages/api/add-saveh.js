// pages/api/create-new.js
import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  if (req.method === "POST") {
    const {name, description, image, category, createBy} = req.body
    try {
      const savehs = await prisma.saveh.create({
        data: {
          name, 
          description, 
          image, 
          category, 
          createBy,
        },
      });
      res.status(201).json({message:"success created item", savehs});
    } catch (e) {
      res.status(500).json(e);
    }
  }else{
    res.status(405).json({message: "method not allowed"})
  }
}
