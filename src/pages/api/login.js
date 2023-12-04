// pages/api/login.
import { cors, runMiddleware } from "@/helpers/cors-middleware";
import prisma from "../../../prisma/client";
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';


export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    // Set token sebagai cookie di sisi klien
    Cookies.set('token', token, { expires: 1 / 24 }); // Cookie kedaluwarsa dalam 1 jam

    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
