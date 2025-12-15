// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    this.load.image('ground', 't_dinoGame/assets/ground.png')
    this.load.image('treeTrunk', 't_dinoGame/assets/treeTrunk.png')
    this.load.image('game-over', 't_dinoGame/assets/game-over.png')
    this.load.image('restart', 't_dinoGame/assets/restart.png')
    this.load.image('forest', 't_dinoGame/assets/forest.png')

    this.load.spritesheet('walking_beaver',
      't_dinoGame/assets/walking_beaver.png',
      { frameWidth: 112, frameHeight: 122 }
    )
    this.load.spritesheet('crawling_beaver',
      't_dinoGame/assets/crawling_beaver.png',
      { frameWidth: 200, frameHeight: 100 }
    )
    this.load.spritesheet('flying_bird',
      't_dinoGame/assets/flying_bird.png',
      { frameWidth: 120, frameHeight: 90 }
    )
  }

  create() {
    // how fast the game moves
    this.gameSpeed = 7

    this.respawnTime = 0
    this.score = 0
    this.highscore = 0
    this.isGameRunning = false
    this.gameStart = false

    this.forest = this.add.tileSprite (0, 400, 1400, 400, 'forest')
    .setOrigin(0, 1)
    this.ground = this.add.tileSprite(0, 395, 1400, 100, 'ground')
    this.beaver = this.physics.add.sprite(0, 350, 'walking_beaver')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(5000)
    .setSize(79,115)

    this.scoreText = this.add
    .text(700, 0, 'score: ' +  '00000', {fill: '#f0f0f0ff', font: '900 25px Courier'})
    .setOrigin(1, 0)

    this.highscoreText = this.add
    .text(700, 25, 'highscore:' + '00000', {fill: '#f0f0f0ff', font: '900 25px Courier'})
    .setOrigin(1, 0)



    this.gameOverScreen = this.add.container(350, 150).setAlpha(0)
    this.gameOverText = this.add.image(0, 0, 'game-over')
    this.restart = this.add.image (0, 80, 'restart').setInteractive()

    this.gameOverScreen.add([
      this.gameOverText, this.restart
    ])

    
    // the animations

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('walking_beaver', { start: 0, end: 1}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'crawl',
      frames: this.anims.generateFrameNumbers('crawling_beaver', { start: 0, end: 1}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'flybird',
      frames: this.anims.generateFrameNumbers('flying_bird', { start: 0, end: 1}),
      frameRate: 10,
      repeat: -1
    })

    // let the beaver have the walk animation
    this.beaver.anims.play('walk', true)


    this.obstacles = this.physics.add.group()

    this.handleInputs()
    this.addCollision()
    this.handleScore()
    // this.handleHighscore()

    this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

    // pause the physics until the game starts
    this.physics.pause() 
    
  }

  startGame() {
    this.gameStart = true
    this.isGameRunning = true
    this.physics.resume()
    this.beaver.setVelocityY(-1300)

  }
  handleScore() {
    this.time.addEvent({
      delay:1000/10,
      loop: true,
      callbackScope: this,
      callback: () => {
        if (!this.isGameRunning) { return }
        // increase the score
        this.score++
        // increase the gamespeed
        this.gameSpeed += 0.01

        const score = Array.from(String(this.score), Number)
        for (let i = 0; i < 5 - String(this.score).length; i++ ) {
          // this makes sure that zeroes are added in frote of the score
          score.unshift(0)
        }
        this.scoreText.setText('score: ' + score.join(''))
        this.handleHighscore()
      }
    })
  }

  handleHighscore() {
    if (this.score >= this.highscore){
      this.highscore = this.score

      const highscore = Array.from(String(this.highscore), Number)
      for (let i = 0; i < 5 - String(this.highscore).length; i++ ){
        highscore.unshift(0)
      }
      this.highscoreText.setText('highscore: ' + highscore.join(''))
    }
  }







  handleInputs() {

    // when the reset button is clicked the game resets.
    this.restart.on('pointerdown', () => {
      this.score = 0
      this.beaver.setVelocityY(0)
      this.beaver.body.height = 115
      this.beaver.body.offset.y = 0
      // this.physics.resume()
      this.obstacles.clear(true, true)

      this.isGameRunning = false
      this.gameStart = false
      this.physics.pause()

      this.gameOverScreen.setAlpha(0)
      this.anims.resumeAll()
      this.gameSpeed = 7
    })

    this.input.keyboard.on('keydown_SPACE', () => {

      if (!this.gameStart) {
        this.startGame()
        return
      }

      // no jumping allowed while in the air
      if (!this.beaver.body.onFloor()) {return}

      // no jumping allowed while crawling
      if(this.downKey.isDown) {return}

      this.beaver.setVelocityY(-1300)
    })

    this.input.keyboard.on('keydown_DOWN', () => {

      // no crawling allowed while in the air
      if (!this.beaver.body.onFloor()) {return}

      this.beaver.anims.play('crawl', true)
      this.beaver.body.height = 75
      this.beaver.body.width = 155
      this.beaver.body.offset.y = 25
    })

    this.input.keyboard.on('keyup_DOWN', () => {

      this.beaver.anims.play('walk', true)
      this.beaver.body.height = 115
      this.beaver.body.width = 79
      this.beaver.body.offset.y = 0
    })
  }

  placeBird(){
    // a random distance between 600 and 900
    const distance = Phaser.Math.Between (600, 900)
    
    let bird = this.obstacles.create(1400 + distance, 300, 'flying_bird')
    .setSize(100, 70)
    .setOrigin(0, 1)

    bird.anims.play('flybird', true)
    
    console.log('bird')
    console.log(distance)
  }

  placeTree() {
    const distance = Phaser.Math.Between (600, 900)

    let tree = this.obstacles.create(1400 + distance, 400, 'treeTrunk')
    .setSize(65, 70) // this is the perfect size for the hitbox of the tree trunk
      console.log('tree')
      console.log(distance)
    
  }

  addCollision() {
      this.physics.add.collider(this.beaver, this.obstacles, () => {
      this.physics.pause()
      this.isGameRunning = false
      this.anims.pauseAll()
      this.respawnTime = 0
      this.gameSpeed = 0
      this.gameOverScreen.setAlpha(1)
      console.log('game over')
    }, null, this)
  }
  



  update(time, delta) {
    if (!this.isGameRunning) { return }

    this.ground.tilePositionX += this.gameSpeed
    this.forest.tilePositionX += this.gameSpeed

    Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed)

    this.respawnTime += delta * this.gameSpeed * 0.08

    if (this.respawnTime >= 1500){
      if (Phaser.Math.Between(0, 10) > 6){
        this.placeBird()

      } else {
      this.placeTree()
      }
      
      this.respawnTime = 0
    }
    

  }

  /* VVV Put any other functions and code down here VVV */

}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#dba101', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { 
    default: 'arcade',
    arcade: {
      debug: false
    } 
  }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

