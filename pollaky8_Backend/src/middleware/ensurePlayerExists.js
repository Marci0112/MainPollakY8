/**
 * Middleware: ha a felhasználónak még nincs sora a pontok táblában
 * az adott játékhoz, létrehoz egyet 0 ponttal.
 *
 * Használat: router.use(ensurePlayerExists(db, jatekId))
 */
module.exports = (db, jatekId) => (req, res, next) => {
  const username = req.params.username ?? req.body.username;

  if (!username) {
    return res.status(400).json({ success: false, reason: "missing_username" });
  }

  const user = db.prepare(
    "SELECT id FROM szemelyek WHERE username = ?"
  ).get(username);

  if (!user) {
    return res.status(404).json({ success: false, reason: "user_not_found" });
  }

  // INSERT OR IGNORE: csak akkor szúr be, ha még nem létezik a sor
  db.prepare(
    "INSERT OR IGNORE INTO pontok (user_id, jatek_id, points) VALUES (?, ?, 0)"
  ).run(user.id, jatekId);

  req.userId = user.id;
  next();
};
