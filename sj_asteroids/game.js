// https://freeasteroids.org/ <- inspiratie

// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    /*     
    This method is called once at the beginning
    It will load all the assets, like sprites and sounds
    */
    this.load.spritesheet('player', 'sj_asteroids/assets/bullet_hell_player_ship.png', { frameWidth: 32, frameHeigth: 32 })
    this.load.image('asteroid', 'sj_asteroids/assets/asteroid.png')
    this.load.image('bullet', 'sj_asteroids/assets/bullet.png')
  }

  create() {
    /* 
    This method is called once, just after preload()
    It will initialize our scene, like the positions of the sprites
    */

    const width = this.cameras.main.width
    const height = this.cameras.main.height

    this.score = 0

    this.player = this.physics.add.sprite(350, 200, 'player', 0)
    //this.player.body.setSize(32,32)
    this.player.setDrag(0.99)
    this.player.setMaxVelocity(150)
    this.player.setCollideWorldBounds(true)

    

    this.asteroidGroup = this.physics.add.group()
    this.asteroidArray = []

    // add bunch of rocks 
    for (var i = 0; i < 10; i++) {
      var scale = Phaser.Math.FloatBetween(1, 3)
      const asteroid = this.physics.add.sprite(Phaser.Math.Between(0, width), Phaser.Math.Between(0, height), 'asteroid').setScale(scale)

      this.asteroidGroup.add(asteroid, true)
      this.asteroidArray.push(asteroid)
    }

    this.physics.add.collider(this.player, this.asteroidGroup, function () {
      console.log('hit')
    }
    )

    this.scoreText = this.add.text(width - 100, 20, 'Score: 0000').setOrigin(0.5)

    this.arrow = this.input.keyboard.createCursorKeys()

  }
  update() {
    /* 
    This method is called 60 times per second after create() 
    It will handle all the game's logic, like movements
    */

    if (this.arrow.up.isDown) {
      this.physics.velocityFromRotation(this.player.rotation, 150, this.player.body.acceleration)
      this.player.setFrame(1)
    } else {
      this.player.setAcceleration(0)
      this.player.setFrame(0)
    }

    if (this.arrow.right.isDown) {
      this.player.setAngularVelocity(300)
    } else if (this.arrow.left.isDown) {
      this.player.setAngularVelocity(-300)
    } else {
      this.player.setAngularVelocity(0)
    }

    this.scoreText.setText('Score: ' + this.score)

    /* VVV Put any other functions and code down here VVV */

  }
}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#000000', // The background color (black)
  scene: mainScene, // The name of the scene we created
  physics: {
    default: 'arcade',
    arcade: { debug: true }
  }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

