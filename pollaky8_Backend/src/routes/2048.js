const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // 2048game pontok lekérése
  router.get("/points/:username", (req, res) => {
    const { username } = req.params;
    const row = db.prepare(`
      SELECT p.game2048_points
      FROM pontok p
      JOIN szemelyek s ON s.id = p.user_id
      WHERE s.username = ?
    `).get(username);
    
    res.json({ "2048_points": row ? row["2048_points"] : 0 });
  });

  // mentés
  router.post("/points", (req, res) => {
    const { username, game2048_points} = req.body;
    
    db.prepare(`
      UPDATE pontok 
      SET game2048_points = ?
      WHERE user_id = (SELECT id FROM szemelyek WHERE username = ?)
    `).run(game2048_points, username);
    
    res.json({ success: true });
  });

  return router;
};