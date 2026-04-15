const express = require("express");
const router = express.Router();
const ensurePlayerExists = require("../middleware/ensurePlayerExists");

const SNAKE_ID = 1;

module.exports = (db) => {
  const ensure = ensurePlayerExists(db, SNAKE_ID);

  // Snake pontok lekérése
  router.get("/points/:username", ensure, (req, res) => {
    const row = db.prepare(`
      SELECT points FROM pontok
      WHERE user_id = ? AND jatek_id = ?
    `).get(req.userId, SNAKE_ID);

    res.json({ snake_points: row?.points ?? 0 });
  });

  // Snake pontok mentése
  router.post("/points", ensure, (req, res) => {
    const { snake_points } = req.body;

    db.prepare(`
      UPDATE pontok SET points = ?
      WHERE user_id = ? AND jatek_id = ?
    `).run(snake_points, req.userId, SNAKE_ID);

    res.json({ success: true });
  });

  return router;
};
