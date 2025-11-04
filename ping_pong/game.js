// created by following https://www.youtube.com/watch?v=f7c9mM7w2fc&t=256s tutorial

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

    const ball = this.add.circle(400,250,10, 0xffffff,1) // creates circle
    this.physics.add.existing(ball) // adds physics to ball

    ball.body.setBounceX(1)
    ball.body.setBounceY(1)

    ball.body.setCollideWorldBounds() // allows ball to bounce/ collide with bounds

    ball.body.setVelocity(200,200) // gives the ball basic velocity
  }
  update() {


    /* 
    This method is called 60 times per second after create() 
    It will handle all the game's logic, like movements
    */

    /* Handle horizontal and vertical movements of "this.player"
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
  backgroundColor: '#7c805f', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' ,
    arcade: {
      gravity: {y:0},
      debug: true // debug is true.
    }
  }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

