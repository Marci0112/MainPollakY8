const Database = require("better-sqlite3");

const db = new Database("pollaky8_Backend/DataBase/database.db", { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS szemelyek (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    nev   TEXT NOT NULL,
    points   INTEGER,
    email   TEXT,
    password TEXT
  )
`);

console.log('A "szemelyek" tábla létrejött (vagy már létezett)');

db.close();
