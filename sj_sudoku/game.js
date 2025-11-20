// Create the mainScene
class mainScene {
  // The three methods currently empty


  preload() {
    /*     
    This method is called once at the beginning
    It will load all the assets, like sprites and sounds
    */

  }

  create() {
    /* 
    This method is called once, just after preload()
    It will initialize our scene, like the positions of the sprites
    */

    // creating grid:
    const whiteColor = 0xffffff
    const blackColor = 0x000000
    
    this.add.rectangle(350, 200, 360, 360, whiteColor, 1)
    for (var i = 0; i < 10; i++) {
      this.add.line((i * 40) + 170, 200, 0, 0, 0, 361, blackColor, 1).setLineWidth(2)
    }
    for (var i = 0; i < 10; i++) {
      this.add.line(350, (i * 40) + 20, 361, 0, 0, 0, blackColor, 1).setLineWidth(2)
    }
    const alpha = 0.5
    this.add.rectangle(230, 80, 116, 116, whiteColor, alpha) // 1
    this.add.rectangle(350, 80, 116, 116, whiteColor, alpha) // 2
    this.add.rectangle(470, 80, 116, 116, whiteColor, alpha) // 3
    this.add.rectangle(230, 200, 116, 116, whiteColor, alpha) // 4
    this.add.rectangle(350, 200, 116, 116, whiteColor, alpha) // 5
    this.add.rectangle(470, 200, 116, 116, whiteColor, alpha) // 6
    this.add.rectangle(230, 320, 116, 116, whiteColor, alpha) // 7
    this.add.rectangle(350, 320, 116, 116, whiteColor, alpha) // 8
    this.add.rectangle(470, 320, 116, 116, whiteColor, alpha) // 9
    
    this.leftScoreLabel = this.add.text(190, 40, '1', {
      fontSize: 38, color: 'black'
    }).setOrigin(0.5, 0.5)

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
  backgroundColor: '#919191', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

