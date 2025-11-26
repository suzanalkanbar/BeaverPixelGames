// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    this.load.image('ground', 't_dinoGame/assets/ground.png')
  
  }

  create() {
    this.ground = this.add.tileSprite(0, 350, 1400, 100, 'ground')

  }
  update() {

    this.ground.tilePositionX += 5
    

  }

  /* VVV Put any other functions and code down here VVV */

}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#dba101', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

