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
/* ============ SIGNUP ============ */
app.post("/signup", async (req, res) => {
  const { email, name, password, role } = req.body;
    console.log("Received signup data:", req.body);
  try {
    // Check if email exists
    const checkResult = await db.query(
      "SELECT * FROM public.users WHERE email = $1",
      [email]
    );

    if (checkResult.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Email already exists. Try logging in." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user with RETURNING *
    const result = await db.query(
      `INSERT INTO public.users (email, password, name, role) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [email, hashedPassword, name, role]
    );

    console.log("Inserted user:", result.rows[0]);

    // Send back success with inserted row
    res.status(201).json({ message: "Signup successful!", user: result.rows[0] });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Report Issue

app.post("/report-issue", upload.array("images"), async (req, res) => {
  try {
    const { title, description, category, location } = req.body;
    const images = req.files; // array of uploaded files

    // Check required fields
    if (!title || !description || !category || !location) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    // Convert files to bytea for PostgreSQL
    const imageBuffers = images.map(file => file.buffer);

    // Insert into database
    const result = await db.query(
      `INSERT INTO report (title, detailed_description, category, location, media) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, category, location, imageBuffers]
    );

    console.log("Inserted Report:", result.rows[0]);
    res.status(201).json({ message: "Report submitted successfully!", report: result.rows[0] });

  } catch (err) {
    console.error("Error submitting report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});