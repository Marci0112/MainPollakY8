const express = require("express");
const router = express.Router();
const ensurePlayerExists = require("../middleware/ensurePlayerExists");

const FLAPPY_BIRD_ID = 5;

module.exports = (db) => {
  const ensure = ensurePlayerExists(db, FLAPPY_BIRD_ID);

  // Pontok lekérése
  router.get("/points/:username", ensure, (req, res) => {
    const row = db
      .prepare(
        `
      SELECT points FROM pontok
      WHERE user_id = ? AND jatek_id = ?
    `,
      )
      .get(req.userId, FLAPPY_BIRD_ID);

    res.json({ flappy_bird_points: row?.points ?? 0 });
  });

  // Pontok mentése (csak ha jobb az új)
  router.post("/points", ensure, (req, res) => {
    const { flappy_bird_points } = req.body;

    const current = db
      .prepare(
        `
      SELECT points FROM pontok
      WHERE user_id = ? AND jatek_id = ?
    `,
      )
      .get(req.userId, FLAPPY_BIRD_ID);

    if (flappy_bird_points > (current?.points ?? 0)) {
      db.prepare(
        `
        UPDATE pontok SET points = ?
        WHERE user_id = ? AND jatek_id = ?
      `,
      ).run(flappy_bird_points, req.userId, FLAPPY_BIRD_ID);
    }

    res.json({ success: true });
  });

  return router;
};
