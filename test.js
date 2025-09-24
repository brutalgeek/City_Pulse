import pkg from 'pg';
const { Pool } = pkg;

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "City_Pulse",
  password: "Harinavi@148",
  port: 7000,
});

(async () => {
  await db.connect();

  const res = await db.query(
    "INSERT INTO public.users (email, password, name, role) VALUES ($1,$2,$3,$4) RETURNING *",
    ["check@example.com","hashedpass","Check User","user"]
  );
  console.log("Inserted:", res.rows[0]);

  const all = await db.query("SELECT * FROM public.users");
  console.log("All users now:", all.rows);

  await db.end();
})();
