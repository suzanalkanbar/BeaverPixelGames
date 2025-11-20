// https://freeasteroids.org/ <- inspiratie

// TO DO
// [ ] add player death if player and asteroid collision
// [ ] add asteroid death if asteroid and bullet collision
// [ ] add bullet inactive if asteroid andd bullet collision
// [ ] add sound of bullet shooting


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
    this.load.audio('bomb', 'sj_asteroids/assets/8bit_bomb_explosion.wav')
    this.load.audio('laser', 'sj_asteroids/assets/laser1.wav')
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
    this.player.setDrag(0.99)
    this.player.setMaxVelocity(150)
    this.player.setCollideWorldBounds(true)

    this.asteroidGroup = this.physics.add.group()
    this.asteroidArray = []

    // add bunch of rocks 
    for (var i = 0; i < 10; i++) {
      // meteor constructor
      var scale = Phaser.Math.FloatBetween(1, 3)
      const asteroid = this.physics.add.sprite(200, 200, 'asteroid').setScale(scale)
      asteroid.speed = Phaser.Math.GetSpeed(100, 1)
      asteroid.direction = Phaser.Math.RND.angle()
      asteroid.angleRotation = Phaser.Math.RND.between(0.8, 2.5)
      asteroid.active = true
      asteroid.visible = true
      asteroid.factor = 1

      const xPos = Phaser.Math.RND.between(0, width)
      const yPos = Phaser.Math.RND.between(0, height)
      asteroid.setPosition(xPos, yPos)

      this.asteroidGroup.add(asteroid, true)
      this.asteroidArray.push(asteroid)
    }

    this.bullet = this.physics.add.sprite(200, 200, 'bullet').setScale(0.3)
    this.bullet.active = false
    this.bullet.speed = Phaser.Math.GetSpeed(500, 1)

    // this.bulletGroup = this.physics.add.group({
    //   classType: Phaser.GameObjects.Sprite, // NOT EQUAL TO VIDEO
    //   maxSize: 1,
    //   runChildUpdate: true
    // })

    // !!!!!!!!
    this.physics.add.overlap(this.player, this.asteroidGroup, function () {
      console.log('hit')

    }
    )

    this.physics.add.overlap(this.bullet, this.asteroidGroup, this.bulletAsteroidCollision, undefined, this)
    

    this.scoreText = this.add.text(width - 100, 20, 'Score: 0000').setOrigin(0.5)

    this.arrow = this.input.keyboard.createCursorKeys()

  }
  update(time, delta) {
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


    if (this.arrow.space.isDown) {

      if (!this.bullet.active) { // <- UNCOMMENT TO ENABLE ONE BULLET...
      this.sound.play('laser')
      this.bullet.setPosition(this.player.x, this.player.y)
      this.bullet.setActive(true)
      this.bullet.setVisible(true)

      this.bullet.direction = this.player.rotation
      this.bullet.rotation = this.bullet.direction
      }
    }

    this.bullet.x += Math.cos(this.bullet.direction) * this.bullet.speed * delta
    this.bullet.y += Math.sin(this.bullet.direction) * this.bullet.speed * delta

    for (const asteroid of this.asteroidArray) {
      if (asteroid.active) {
        asteroid.x += asteroid.factor * Math.cos(asteroid.direction) * asteroid.speed * delta
        asteroid.y += Math.cos(asteroid.direction) * asteroid.speed * delta
        asteroid.angle += asteroid.angleRotation

        if (asteroid.x < 0) {
          asteroid.x = 700
        } else if (asteroid.x > 700) {
          asteroid.x = 0
        }

        if (asteroid.y < 0) {
          asteroid.y = 400
        } else if (asteroid.y > 400) {
          asteroid.y = 0
        }
      }
    }

    this.scoreText.setText('Score: ' + this.score)


  }
  /* VVV Put any other functions and code down here VVV */
  bulletAsteroidCollision(bullet, asteroid) {
    console.log('bullet hit')
    bullet.active = false
    asteroid.destroy()
    this.score += 10
    this.sound.play('bomb')
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
  parent: 'asteroids', // Create the game inside the <div id="game"> 
});

