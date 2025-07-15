import express from "express";
import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;
dotenv.config();

app.use(cors());
app.use(express.json());

const turso = createClient({
  url: process.env.TURSO_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

app.get("/", (req, res) => res.send("Gymme App"));

app.post("/waitlist", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await turso.execute({
      sql: "INSERT INTO waitlist (email, createdAt) VALUES (?, ?)",
      args: [email, new Date().toISOString()],
    });
    res.status(201).json({ message: "Email added to waitlist" });
  } catch (error) {
    console.error("Error adding email to waitlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/total-waitlist", async (req, res) => {
  const { rows } = await turso.execute({
    sql: "SELECT COUNT(*) as count FROM waitlist",
    args: [],
  });
  res.status(200).json({ total: rows[0].count });
});

app.listen(port, async () => {
  try {
    await turso.execute({ sql: "SELECT 1", args: [] });
    console.log("✅ Database connected successfully");
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
});

export default app;
