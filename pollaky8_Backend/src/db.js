const path = require("path");
const Database = require("better-sqlite3");
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

console.log("Végül ezt az adatbázis fájlt nyitjuk:", dbPath);

const db = new Database(dbPath, {
  verbose: console.log,
});

module.exports = db;
