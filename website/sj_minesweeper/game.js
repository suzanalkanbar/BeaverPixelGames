// https://www.youtube.com/watch?v=n0jZRlhLtt0 <- guide used
// Create the mainScene
class mainScene {

  init() {
    // colours
    this.white = 0xffffff
    this.darkgrey = 0x5f5f5f
    this.lightgrey = 0xc0c0c0
    this.green = 0x29f500
    this.darkgreen = 0x0f5a00
    this.blue = 0x0000ff
    this.red = 0xff0000
    this.yellow = 0x00ff00
    this.bgcolour = 0xced25e

    // constants
    this.tilesize = 32
    this.rows = 15
    this.cols = 15
    this.amount_mines = 5 // 30 in normal game
    this.witdh = this.tilesize * this.rows
    this.height = this.tilesize * this.cols

    this.tile_numbers = []
    for (var i = 1; i < 9; i++) {
      tile_nu
    }
  }

  preload() {

  }

  create() {


  }
  update() {


  }

  /* VVV Put any other functions and code down here VVV */

}

// Create the game
window.game = new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#919191', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

window.restartActiveGame = function () {
  if (window.game && window.game.scene.scenes[0]) {
    window.game.scene.scenes[0].scene.restart();
    gameover = false;
  }
};

