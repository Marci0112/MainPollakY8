const path = require("path");
const Database = require("better-sqlite3");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const dbPathFromEnv = process.env.DB_PATH;

let dbPath;

if (dbPathFromEnv) {
  dbPath = path.join(__dirname, "..", dbPathFromEnv);
}else {
  console.warn(
    "FIGYELEM: DB_PATH nincs .env-ben → keményen beírt útvonalat használok",
  );
  dbPath = path.join(__dirname, "..", "DataBase", "database.db");
}

const db = new Database(dbPath, {
  verbose: console.log,
});


db.exec(`
  CREATE TABLE IF NOT EXISTS szemelyek (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,           
    points   INTEGER
)
`);

console.log('A "szemelyek" tábla létrejött (vagy már létezett)');

db.close();
