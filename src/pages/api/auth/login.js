import { runMiddleware } from "@/helpers/cors-middleware";
import authenticateUser from "@/controllers/authController"; // Sesuaikan path ini

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const user = await authenticateUser(username, password);

      // Generate token or handle successful authentication as needed
      res.status(200).json({ message: "Login successful", user });
    } catch (e) {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
