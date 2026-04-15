const express = require("express");
const router = express.Router();
const ensurePlayerExists = require("../middleware/ensurePlayerExists");

const PAC_MAN_ID = 4;

module.exports = (db) => {
    const ensure = ensurePlayerExists(db, PAC_MAN_ID);

    // Snake pontok lekérése
    router.get("/points/:username", ensure, (req, res) => {
        const row = db.prepare(`
      SELECT points FROM pontok
      WHERE user_id = ? AND jatek_id = ?
    `).get(req.userId, PAC_MAN_ID);

        res.json({ "pac_man_points": row?.points ?? 0 });
    });

    // Snake pontok mentése
    router.post("/points", ensure, (req, res) => {
        const { pac_man_points } = req.body;

        db.prepare(`
      UPDATE pontok SET points = ?
      WHERE user_id = ? AND jatek_id = ?
    `).run(pac_man_points, req.userId, PAC_MAN_ID);

        res.json({ success: true });
    });

    return router;
};
