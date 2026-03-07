const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Snake pontok lekérése
  router.get("/points/:username", (req, res) => {
    const { username } = req.params;
    const row = db.prepare(`
      SELECT p.snake_points 
      FROM pontok p
      JOIN szemelyek s ON s.id = p.user_id
      WHERE s.username = ?
    `).get(username);
    
    res.json({ snake_points: row ? row.snake_points : 0 });
  });

  // Snake pontok mentése
  router.post("/points", (req, res) => {
    const { username, snake_points } = req.body;
    
    db.prepare(`
      UPDATE pontok 
      SET snake_points = ?
      WHERE user_id = (SELECT id FROM szemelyek WHERE username = ?)
    `).run(snake_points, username);
    
    res.json({ success: true });
  });

  return router;
};