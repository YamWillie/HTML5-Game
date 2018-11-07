import "phaser";

//Configuration
var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  //Loading Assets
  this.load.image("tiles", "../assets/assets.png");
  this.load.tilemapTiledJSON("map", "../assets/level1.json");
  this.load.image("background", "../assets/water.png");
}
function create() {
  //Map
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("assets", "tiles");

  //Add
  this.add.image(0, 0, "background");

  //Layers
  const lowerLayer = map.createStaticLayer("Below Player -1", tileset, 0, 0);
  const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
  const grassLayer = map.createStaticLayer("Mushroom-flower", tileset, 0, 0);
  const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
  const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

  //Layer Properties
  lowerLayer.setCollisionByProperty({ collides: true });
  belowLayer.setCollisionByProperty({ collides: true });
  worldLayer.setCollisionByProperty({ collides: true });
  //   aboveLayer.setDepth(10);

  //Debug
  const debugGraphics = this.add.graphics().setAlpha(0.75);
  worldLayer.renderDebug(debugGraphics, {
    tileColor: null, // Color of non-colliding tiles
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  });
}

function update() {}
