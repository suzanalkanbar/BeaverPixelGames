// created by following https://www.youtube.com/playlist?list=PLNwtXgWIx3rg_fv93PMDFfXahzhXxGe5Z tutorial
// progress: [####      ] 40%

// Create the mainScene
class mainScene {
  // The three methods currently empty

  init() {
    this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0)

    this.leftScore = 0
    this.rightScore = 0
  }

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

    this.physics.world.setBounds(-100,0,900,400)

    this.ball = this.add.circle(350, 200, 10, 0xffffff, 1) // creates circle
    this.physics.add.existing(this.ball) // adds physics to ball

    this.ball.body.setBounceX(1) // add bounce to ball
    this.ball.body.setBounceY(1)
    this.ball.body.setCollideWorldBounds() // allows ball to collide with bounds

    this.resetBall()

    // add left paddle
    this.paddleLeft = this.add.rectangle(50, 200, 30, 100, 0xffffff, 1)
    this.physics.add.existing(this.paddleLeft, true)

    // add right paddle
    this.paddleRight = this.add.rectangle(650, 200, 30, 100, 0xffffff, 1)
    this.physics.add.existing(this.paddleRight, true)

    // add collider to ball n paddle
    this.physics.add.collider(this.paddleLeft, this.ball)
    this.physics.add.collider(this.paddleRight, this.ball)

    // create scoreboard
    this.leftScoreLabel = this.add.text(100,25, '0', {
      fontSize: 48
    }).setOrigin(0.5,0.5)

    this.rightScoreLabel = this.add.text(550,375, '0', {
      fontSize: 48
    }).setOrigin(0.5,0.5) 

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

    const diff = this.ball.y - this.paddleRight.y
    if (Math.abs(diff) < 10) {
      return
    }

    const aiSpeed = 3
    if (diff < 0) {
      // ball above paddle
      this.paddleRightVelocity.y = -aiSpeed
      if (this.paddleRightVelocity.y < -10) {
        this.paddleRightVelocity.y = -10
      }
    } else if (diff > 0) {
      // ball below paddle
      this.paddleRightVelocity.y = aiSpeed
      if (this.paddleRightVelocity.y > 10) {
        this.paddleRightVelocity.y = 10
      }
    }

    this.paddleRight.y += this.paddleRightVelocity.y
    this.paddleRight.body.updateFromGameObject()

    if (this.ball.x < -30) {
      // scored on left side
      this.resetBall()
      this.incrementLeftScore()
    } if (this.ball.x > 730) {
      // scored on right side
      this.resetBall()
      this.incrementRightScore()
    }

  }

  incrementLeftScore(){
    this.leftScore += 1
    this.leftScoreLabel.text = this.leftScore
  }

  incrementRightScore() {
    this.rightScore += 1
    this.rightScoreLabel.text = this.rightScore
  }

  resetBall() {
    this.ball.setPosition(350, 200)

    const angle = Phaser.Math.Between(0, 360) // pick an angle
    const vec = this.physics.velocityFromAngle(angle, 200)

    this.ball.body.setVelocity(vec.x, vec.y) // gives the ball basic velocity
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

