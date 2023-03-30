import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      return res.status(422).json({ message: "One or more invalid input" });
    }

    const client = await connectToDatabase();

    const db = client.db("plantsDatabase");

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(200).json({ message: "User already exists" });
      client.close();
      return;
    } else {
      try {
        const hashedPassword = await hashPassword(password);

        const insertedUser = { id: "" };
        const result = await db
          .collection("users")
          .insertOne({ email: email, password: hashedPassword });

        insertedUser.id = JSON.stringify(result.insertedId);

        res.status(201).json({ message: "Created user!" });
        client.close();
      } catch (error) {
        res.status(500).json({ error: "failed to register" });
      }
    }
  } else {
    res.status(500).end();
  }
}
