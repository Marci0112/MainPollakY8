const express = require("express");
const cors = require("cors");
const path = require("path");
const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const snakeRoutes = require("./routes/snake");
const game2048Rutes = require("./routes/2048");
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

  const row = db.prepare(`
    SELECT s.password_hash, p.snake_points, p.game2048_points 
    FROM szemelyek s
    LEFT JOIN pontok p ON p.user_id = s.id
    WHERE s.username = ?
  `).get(username);

  if (!row) {
    return res.status(401).json({ success: false, reason: "not_found" });
  }

  const helyes = await bcrypt.compare(password, row.password_hash);
  if (helyes) {
    res.json({ 
      success: true, 
      username: username, 
      snake_points: row.snake_points ?? 0,
      game2048_points: row.game2048_points ?? 0
    });
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
      "INSERT INTO szemelyek (username, password_hash) VALUES (?, ?)",
    ).run(username, hash);

    const lastId = db.prepare("SELECT last_insert_rowid() AS id").get().id;

    db.prepare(
      "INSERT INTO pontok (user_id, snake_points, game2048_points) VALUES (?, ?, ?)",
    ).run(lastId, 0, 0);

    res.json({ success: true });
  } catch (err) {
    if (err.message.includes("UNIQUE constraint")) {
      res.status(409).json({ success: false, reason: "taken" });
    } else {
      res.status(500).json({ success: false, reason: "db_error" });
    }
  }
});
app.use("/api/snake", snakeRoutes(db));
app.use("/api/2048", game2048Rutes(db));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Szerver fut: http://localhost:${PORT}`));
