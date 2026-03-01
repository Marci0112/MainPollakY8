const path = require("path");
const Database = require("better-sqlite3");
require("dotenv").config();

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

console.log("Végül ezt az adatbázis fájlt nyitjuk:", dbPath);

const db = new Database(dbPath, {
  verbose: console.log,
});

module.exports = db;
