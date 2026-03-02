const express = require("express");
const cors = require("cors");
const path = require("path");
const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const dotenvResult = dotenv.config({
  path: path.join(__dirname, "..", ".env"),
});

if (dotenvResult.error) {
  console.error(
    "HIBA: .env fájl betöltése sikertelen!",
    dotenvResult.error.message,
  );
  // opcionális: process.exit(1);   // ha élesben akarod, hogy leálljon
} else {
  console.log("dotenv betöltve ✓");
}

const dbPathFromEnv = process.env.DB_PATH;
console.log("DB_PATH az env-ből:", dbPathFromEnv);

let dbPath;

if (dbPathFromEnv) {
  dbPath = path.join(__dirname, "..", dbPathFromEnv);
} else {
  console.warn(
    "FIGYELEM: DB_PATH nincs .env-ben → keményen beírt útvonalat használok",
  );
  dbPath = path.join(__dirname, "..", "DataBase", "database.db");
}
const db = new Database(dbPath, { verbose: console.log });
console.log("DB kapcsolódva ✓");

const app = express();
app.use(cors());
app.use(express.json());

// LOGIN endpoint
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const row = db
    .prepare("SELECT password_hash, points FROM szemelyek WHERE username = ?")
    .get(username);

  if (!row) {
    return res.status(401).json({ success: false, reason: "not_found" });
  }

  const helyes = await bcrypt.compare(password, row.password_hash);
  if (helyes) {
    res.json({ success: true, username: username, points: row.points }); // Visszaküldi az adatotak
  } else {
    res.status(401).json({ success: false, reason: "wrong_password" });
  }
});

// REGISZTRÁCIÓ endpoint
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);

  try {
    db.prepare(
      "INSERT INTO szemelyek (username, password_hash, points) VALUES (?, ?, ?)",
    ).run(username, hash, 0);
    const user = db
      .prepare(
        "SELECT id, username, password_hash, points FROM szemelyek WHERE username = ?",
      )
      .get(username);
    console.log(user.points);
    res.json({ success: true });
  } catch (err) {
    if (err.message.includes("UNIQUE constraint")) {
      res.status(409).json({ success: false, reason: "taken" });
    } else {
      res.status(500).json({ success: false, reason: "db_error" });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Szerver fut: http://localhost:${PORT}`));
