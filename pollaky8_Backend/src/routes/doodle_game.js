const express = require("express");
const router = express.Router();
const ensurePlayerExists = require("../middleware/ensurePlayerExists");

const DOODLE_GAME_ID = 6;

module.exports = (db) => {
  const ensure = ensurePlayerExists(db, DOODLE_GAME_ID);

  // Pontok lekérése
  router.get("/points/:username", ensure, (req, res) => {
    const row = db
      .prepare(
        `
      SELECT points FROM pontok
      WHERE user_id = ? AND jatek_id = ?
    `,
      )
      .get(req.userId, DOODLE_GAME_ID);

    res.json({ doodle_game_points: row?.points ?? 0 });
  });

  // Pontok mentése (csak ha jobb az új)
  router.post("/points", ensure, (req, res) => {
    const { doodle_game_points } = req.body;

    const current = db
      .prepare(
        `
      SELECT points FROM pontok
      WHERE user_id = ? AND jatek_id = ?
    `,
      )
      .get(req.userId, DOODLE_GAME_ID);

    if (doodle_game_points > (current?.points ?? 0)) {
      db.prepare(
        `
        UPDATE pontok SET points = ?
        WHERE user_id = ? AND jatek_id = ?
      `,
      ).run(doodle_game_points, req.userId, DOODLE_GAME_ID);
    }

    res.json({ success: true });
  });

  return router;
};
