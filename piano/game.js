// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    /*     
    This method is called once at the beginning
    It will load all the assets, like sprites and sounds
    */

    this.load.image('whiteKey', 'piano/assets/White Key.png');
    this.load.image('blackKey', 'piano/assets/Black Key.png')
  }

  create() {
    /* 
    This method is called once, just after preload()
    It will initialize our scene, like the positions of the sprites
    */

    this.leftKey = this.physics.add.sprite(20, 104, 'whiteKey').setInteractive(this.input.makePixelPerfect());
    this.leftKey.body.setSize(38, 204, false)
    this.leftBlack = this.physics.add.sprite(38, 68, 'blackKey').setInteractive(this.input.makePixelPerfect());


  }
  update() {
    /* 
    This method is called 60 times per second after create() 
    It will handle all the game's logic, like movements
    */

    /* Handle horizontal and vertical movements of "this.player"
    if (this.arrow.right.isDown) {
      // If the right arrow is pressed, move to the right
      this.player.x += 3;
    } else if (this.arrow.left.isDown) {
      // If the left arrow is pressed, move to the left
      this.player.x -= 3;
    }
    if (this.arrow.down.isDown) {
      this.player.y += 3;
    } else if (this.arrow.up.isDown) {
      this.player.y -= 3;
    }
    */

  }

  /* VVV Put any other functions and code down here VVV */

}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#167782', // The background color
  scene: mainScene, // The name of the scene we created
  physics: { 
    default: 'arcade', 
    arcade: {
      debug: true
    }
  }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

