// https://www.youtube.com/watch?v=n0jZRlhLtt0 <- guide used
// Create the mainScene
class mainScene {

  init() {
    this.WHITE = 0xffffff
    this.DARKGREY = 0x5f5f5f 
    this.LIGHTGREY = 0xc0c0c0 
    this.GREEN = 0x29f500 
    this.DARKGREEN = 0x0f5a00 
    this.BLUE = 0x0000ff 
    this.RED = 0xff0000 
    this.YELLOW = 0x00ff00 
    this.BGCOLOUR = 0xced25e 
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

