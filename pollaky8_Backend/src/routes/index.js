const snakeRoutes = require("./snake");
const game2048Routes = require("./2048");
const towerBlocksRoutes = require("./tower_blocks");
const pacManRoutes = require("./pac_man");
const flappy_bird = require("./flappy_bird");

module.exports = (app, db) => {
  app.use("/api/snake", snakeRoutes(db));
  app.use("/api/2048", game2048Routes(db));
  app.use("/api/tower_blocks", towerBlocksRoutes(db));
  app.use("/api/pac_man", pacManRoutes(db));
  app.use("/api/flappy_bird", flappy_bird(db));
  // Új játék hozzáadásához: app.use("/api/ujjatek", ujjatekRoutes(db));
};
