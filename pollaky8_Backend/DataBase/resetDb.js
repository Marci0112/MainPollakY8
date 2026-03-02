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

try {
  // 1. Minden sor törlése a táblából
  const torles = db.prepare("DELETE FROM szemelyek");
  const toroltSorok = torles.run();

  console.log(`Törölt sorok száma: ${toroltSorok.changes}`);

  db.exec(`
    DELETE FROM sqlite_sequence 
    WHERE name = 'szemelyek'
  `);

  console.log('A "szemelyek" tábla kiürítve és az ID számláló visszaállítva.');
} catch (err) {
  console.error("Hiba történt a törlés során:", err.message);
}

db.close();
