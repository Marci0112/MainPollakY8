const Database = require("better-sqlite3");
const db = new Database("DataBase/database.db"); // ← itt a baj

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
