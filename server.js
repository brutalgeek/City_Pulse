// server.js
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import pkg from "pg";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const { Pool } = pkg;

const app = express();
const PORT = 5000;
const saltRounds = 10;

//  PostgreSQL connection
const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "City_Pulse",
  password: "Harinavi@148",
  port: 7000, // your custom port
});

db.connect()
  .then(() => console.log(" Database connected!"))
  .catch((err) => {
    console.error(" Database connection error:", err.stack);
    process.exit(1);
  });

//  Middlewares
app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
    credentials: true,
  })
);

app.use(express.json());

/* ============ SIGNUP ============ */
app.post("/signup", async (req, res) => {
  const { email, name, password,role } = req.body;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists. Try logging in." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db.query(
      "INSERT INTO users (email, password, name,role) VALUES ($1, $2, $3,$4)",
      [email, hashedPassword, name,role]
    );

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error(" Error during registration:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});