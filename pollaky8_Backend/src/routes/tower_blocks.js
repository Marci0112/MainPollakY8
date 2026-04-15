const express = require("express");
const router = express.Router();
const ensurePlayerExists = require("../middleware/ensurePlayerExists");

const TOWER_BLOCKS_ID = 3;

module.exports = (db) => {
  const ensure = ensurePlayerExists(db, TOWER_BLOCKS_ID);

  // Tower Blocks pontok lekérése
  router.get("/points/:username", ensure, (req, res) => {
    const row = db.prepare(`
      SELECT points FROM pontok
      WHERE user_id = ? AND jatek_id = ?
    `).get(req.userId, TOWER_BLOCKS_ID);

    res.json({ "tower_blocks_points": row?.points ?? 0 });
  });

  // Tower Blocks pontok mentése
  router.post("/points", ensure, (req, res) => {
    const { tower_blocks_points } = req.body;

    db.prepare(`
      UPDATE pontok SET points = ?
      WHERE user_id = ? AND jatek_id = ?
    `).run(tower_blocks_points, req.userId, TOWER_BLOCKS_ID);

    res.json({ success: true });
  });

  return router;
};
