// created by following https://www.youtube.com/playlist?list=PLNwtXgWIx3rg_fv93PMDFfXahzhXxGe5Z tutorial
// progress: [########  ] 80%

// Create the mainScene
class mainScene {
  // The three methods currently empty

  init() {
    this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0)
    this.leftScore = 0
    this.rightScore = 0
    this.paused = false
  }

  preload() {
    /*     
    This method is called once at the beginning
    It will load all the assets, like sprites and sounds
    */
    this.load.audio('pong-beep','ping_pong/assets/pong_beep.wav')
    this.load.audio('pong-plop','ping_pong/assets/pong_plop.wav')
  }

  create() {
    /* 
    This method is called once, just after preload()
    It will initialize our scene, like the positions of the sprites
    */

    // constants
    const whiteColor = 0xffffff

    // create background
    this.add.line(350, 200, 0, 0, 0, 400, whiteColor, 1).setLineWidth(2)
    this.add.circle(350, 200, 50).setStrokeStyle(4, whiteColor, 1)

    // create world stuffs
    this.physics.world.setBounds(-100, 0, 900, 400)

    this.ball = this.add.circle(350, 200, 10, whiteColor, 1) // creates circle
    this.physics.add.existing(this.ball) // adds physics to ball
    this.ball.body.setCircle(10)

    this.ball.body.setBounceX(1) // add bounce to ball
    this.ball.body.setBounceY(1)
    this.ball.body.setCollideWorldBounds() // allows ball to collide with bounds

    // add left paddle
    this.paddleLeft = this.add.rectangle(50, 200, 30, 100, whiteColor, 1)
    this.physics.add.existing(this.paddleLeft, true)

    // add right paddle
    this.paddleRight = this.add.rectangle(650, 200, 30, 100, whiteColor, 1)
    this.physics.add.existing(this.paddleRight, true)

    // add collider to ball n paddle
    this.physics.add.collider(this.paddleLeft, this.ball)
    this.physics.add.collider(this.paddleRight, this.ball)

    // create scoreboard left n right
    this.leftScoreLabel = this.add.text(100, 25, '0', {
      fontSize: 48
    }).setOrigin(0.5, 0.5)

    this.rightScoreLabel = this.add.text(550, 375, '0', {
      fontSize: 48
    }).setOrigin(0.5, 0.5)

    // add keyboard input
    this.cursors = this.input.keyboard.createCursorKeys()

    this.time.delayedCall(1000, () => { // delays ball moving
      this.resetBall()
    })
  }

  update() {
    /* 
    This method is called 60 times per second after create() 
    It will handle all the game's logic, like movements
    */

    if (this.paused) {
      return
    }

    this.processPlayerInput()
    this.updateAi()
    this.checkScore()

  }

  processPlayerInput() {
    if (this.cursors.up.isDown) {
      this.paddleLeft.y -= 3
      this.paddleLeft.body.updateFromGameObject()
    } else if (this.cursors.down.isDown) {
      this.paddleLeft.y += 3
      this.paddleLeft.body.updateFromGameObject()
    }
  }

  checkScore() {

    const x = this.ball.x
    const leftBound = -30
    const rightBound = 730
    if (x >= leftBound && x <= rightBound) {
      return
    }

    if (this.ball.x < leftBound) {
      // scored on left side
      this.incrementRightScore()
    } if (this.ball.x > rightBound) {
      // scored on right side
      this.incrementLeftScore()
    }

    const maxScore = 1
    if (this.leftScore >= maxScore) {
      // player won
      this.paused = true
      this.add.text(350, 200, 'Player won!', {
        fontSize: 48
      }).setOrigin(0.5, 0.5)

    } else if (this.rightScore >= maxScore) {
      // AI won
      this.paused = true
      this.add.text(350, 200, 'AI won!', {
        fontSize: 48
      }).setOrigin(0.5, 0.5)
    }

    if (!this.paused) {
      this.resetBall()
    }
    else {
      this.ball.active = false
      this.physics.world.remove(this.ball.body)
    }
  }

  updateAi() {
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
  }

  incrementLeftScore() {
    this.leftScore += 1
    this.leftScoreLabel.text = this.leftScore
  }

  incrementRightScore() {
    this.rightScore += 1
    this.rightScoreLabel.text = this.rightScore
  }

  resetBall() {
    this.ball.setPosition(350, 200)

    const angle = Phaser.Math.Between(0, 359) // pick an angle
    const vec = this.physics.velocityFromAngle(angle, 200)

    this.ball.body.setVelocity(vec.x, vec.y) // gives the ball basic velocity
  }

  /* VVV Put any other functions and code down here VVV */

}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#000000', // The background color (black)
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