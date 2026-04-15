const express = require("express");
const cors = require("cors");
const path = require("path");
const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const registerRoutes = require("./routes/index");

const dotenvResult = dotenv.config({
  path: path.join(__dirname, "..", ".env"),
});

if (dotenvResult.error) {
  console.error(
    "HIBA: .env fájl betöltése sikertelen!",
    dotenvResult.error.message,
  );
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

  if (!username || !password) {
    return res.status(400).json({ success: false, reason: "missing_fields" });
  }

  const user = db.prepare(`
    SELECT id, password_hash FROM szemelyek WHERE username = ?
  `).get(username);

  if (!user) {
    return res.status(401).json({ success: false, reason: "not_found" });
  }

  const helyes = await bcrypt.compare(password, user.password_hash);
  if (!helyes) {
    return res.status(401).json({ success: false, reason: "wrong_password" });
  }

  res.json({
    success: true,
    username: username,
  });
});

// REGISZTRÁCIÓ endpoint
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, reason: "missing_fields" });
  }

  const hash = await bcrypt.hash(password, 12);

  try {
    db.prepare(
      "INSERT INTO szemelyek (username, password_hash) VALUES (?, ?)",
    ).run(username, hash);

    res.json({ success: true });
  } catch (err) {
    if (err.message.includes("UNIQUE constraint")) {
      res.status(409).json({ success: false, reason: "taken" });
    } else {
      console.error("Regisztrációs hiba:", err.message);
      res.status(500).json({ success: false, reason: "db_error" });
    }
  }
});

// Összes játék route regisztrálása
registerRoutes(app, db);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Szerver fut: http://localhost:${PORT}`));
