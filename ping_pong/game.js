// created by following https://www.youtube.com/playlist?list=PLNwtXgWIx3rg_fv93PMDFfXahzhXxGe5Z tutorial
// progress: [##        ] 20%

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

    const ball = this.add.circle(350, 200, 10, 0xffffff, 1) // creates circle
    this.physics.add.existing(ball) // adds physics to ball

    ball.body.setBounceX(1) // add bounce
    ball.body.setBounceY(1)
    ball.body.setCollideWorldBounds() // allows ball to collide with bounds

    ball.body.setVelocity(200, 0) // gives the ball basic velocity

    this.paddleLeft = this.add.rectangle(50, 200, 30, 100, 0xffffff, 1)
    this.physics.add.existing(this.paddleLeft, true)

    this.physics.add.collider(this.paddleLeft, ball) // add collider to ball n paddle

    this.cursors = this.input.keyboard.createCursorKeys() // add keyboard input
  }
  update() {
    /* 
    This method is called 60 times per second after create() 
    It will handle all the game's logic, like movements
    */

    if (this.cursors.up.isDown) {
      this.paddleLeft.y -= 3
      this.paddleLeft.body.updateFromGameObject()
    } else if (this.cursors.down.isDown) {
      this.paddleLeft.y += 3
      this.paddleLeft.body.updateFromGameObject()
    }

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
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true // debug is true.
    }
  }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

