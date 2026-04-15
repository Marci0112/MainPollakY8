const path = require("path");
const Database = require("better-sqlite3");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const dbPathFromEnv = process.env.DB_PATH;

let dbPath;

if (dbPathFromEnv) {
  dbPath = path.join(__dirname, "..", dbPathFromEnv);
} else {
  console.warn("DB_PATH nincs .env-ben → keményen beírt útvonalat használok");
  dbPath = path.join(__dirname, "..", "DataBase", "database.db");
}

const db = new Database(dbPath, {
  verbose: console.log,
});

// Teljes SQL szkript futtatása
const sqlScript = `
BEGIN TRANSACTION;

-- --------------------------------------------------------
-- Tábla: jatek
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS "jatek" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "jatek neve" TEXT NOT NULL
);

INSERT OR IGNORE INTO "jatek" ("id", "jatek neve") VALUES (1, 'snake');
INSERT OR IGNORE INTO "jatek" ("id", "jatek neve") VALUES (2, 'game_2048');
INSERT OR IGNORE INTO "jatek" ("id", "jatek neve") VALUES (3, 'tower_blocks');
INSERT OR IGNORE INTO "jatek" ("id", "jatek neve") VALUES (4, 'pac_man');

-- --------------------------------------------------------
-- Tábla: szemelyek
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS "szemelyek" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "username" TEXT NOT NULL UNIQUE,
  "password_hash" TEXT NOT NULL
);

-- --------------------------------------------------------
-- Tábla: pontok
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS "pontok" (
  "user_id" INTEGER NOT NULL,
  "jatek_id" INTEGER NOT NULL,
  "points" INTEGER DEFAULT 0,
  PRIMARY KEY ("user_id", "jatek_id"),
  FOREIGN KEY ("user_id") REFERENCES "szemelyek" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("jatek_id") REFERENCES "jatek" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Indexek létrehozása
CREATE INDEX IF NOT EXISTS "idx_pontok_user_id" ON "pontok" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_pontok_jatek_id" ON "pontok" ("jatek_id");

COMMIT;
`;

try {
  // Idegenkulcs megszorítások engedélyezése
  db.exec("PRAGMA foreign_keys = ON;");
  
  // Teljes szkript futtatása
  db.exec(sqlScript);
  
  console.log('Az adatbázis táblái sikeresen létrejöttek (vagy már léteztek)');
  console.log('- "jatek" tábla létrejött és feltöltve');
  console.log('- "szemelyek" tábla létrejött');
  console.log('- "pontok" tábla létrejött kapcsolatokkal és indexekkel');
} catch (error) {
  console.error('Hiba történt az adatbázis létrehozása során:', error.message);
} finally {
  db.close();
}