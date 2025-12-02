// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    this.load.image('ground', 't_dinoGame/assets/ground.png')
    this.load.image('beaver', 't_dinoGame/assets/beaver.png')
    this.load.image('treeTrunk', 't_dinoGame/assets/treeTrunk.png')
    this.load.spritesheet('walking_beaver',
      't_dinoGame/assets/walking_beaver.png',
      { frameWidth: 112, frameHeight: 122 }
    )
  }

  create() {
    this.gameSpeed = 8
    this.respawnTime = 0

    this.ground = this.add.tileSprite(0, 350, 1400, 100, 'ground')
    this.beaver = this.physics.add.sprite(0, 350, 'walking_beaver')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(5000)
    .setSize(79,115)

    

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('walking_beaver', { start: 0, end: 1}),
      frameRate: 10,
      repeat: -1
    })

    this.beaver.anims.play('walk', true)

    this.obstacles = this.physics.add.group()

    this.handleInputs()
    this.addCollision()
    
  }

  handleInputs() {
    this.input.keyboard.on('keydown_SPACE', () => {

      if (!this.beaver.body.onFloor()) {return}
      this.beaver.setVelocityY(-1500)
    })
  }

  placeObstacle() {
    const distance = Phaser.Math.Between (600, 900)

    let obstacle 
    obstacle = this.obstacles.create(1400 + distance, 400, 'treeTrunk')
    .setSize(65, 70) // this is the perfect size for the hitbox of the tree trunk
      console.log('trunk')
      console.log(distance)
    
  }

  addCollision() {
      this.physics.add.collider(this.beaver, this.obstacles, () => {
      this.physics.pause()
      this.beaver.anims.pause()
      this.respawnTime = 0
      this.gameSpeed = 0
      console.log('game over')
    }, null, this)
  }
  



  update(time, delta) {

    this.ground.tilePositionX += this.gameSpeed
    Phaser.Actions.IncX(this.obstacles.getChildren(), -this.gameSpeed)

    this.respawnTime += delta * this.gameSpeed * 0.08

    if (this.respawnTime >= 1500){
      this.placeObstacle()
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
      debug: true
    } 
  }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

