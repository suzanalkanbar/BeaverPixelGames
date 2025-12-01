// https://freeasteroids.org/ <- inspiratie

// TO DO
// [ ] add player death
// [ ] add reset after player death
// [ ] add winning screen
// BUG: player only vulnerable after shooting bullet

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
    this.load.audio('rocket', 'sj_asteroids/assets/rocket_engine.wav')
    this.load.audio('death', 'sj_asteroids/assets/DeathFlash.wav')
  }

  create() {
    /* 
    This method is called once, just after preload()
    It will initialize our scene, like the positions of the sprites
    */

    this.style = { font: '40px Arial', fill: '#1742dcff' };
    this.victoryText = this.add.text(100, 100, 'ASTEROIDS DESTROYED!', this.style);
    this.victoryText.depth = 1;
    this.victoryText.visible = false

    this.style = { font: '40px Arial', fill: '#e20a0aff' };
    this.deathText = this.add.text(170, 100, 'SHIP DESTROYED!', this.style);
    this.deathText.depth = 1;
    this.deathText.visible = false

    const width = this.cameras.main.width
    const height = this.cameras.main.height

    this.score = 0
    this.gameover = false

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

    this.physics.add.overlap(this.player, this.asteroidGroup, this.playerAsteroidCollision, undefined, this)

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
      this.sound.play('rocket')
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

    if (!this.gameover) {
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
    }

    this.bullet.x += Math.cos(this.bullet.direction) * this.bullet.speed * delta
    this.bullet.y += Math.sin(this.bullet.direction) * this.bullet.speed * delta

    if (this.bullet.x < 0) {
      this.bullet.active = false
    } else if (this.bullet.x > 700) {
      this.bullet.active = false
    }

    if (this.bullet.y < 0) {
      this.bullet.active = false
    } else if (this.bullet.y > 400) {
      this.bullet.active = false
    }

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

    if (this.score == 100) {
      this.victoryText.visible = true
    }


  }
  /* VVV Put any other functions and code down here VVV */
  bulletAsteroidCollision(bullet, asteroid) {
    console.log('bullet hit')
    bullet.active = false
    asteroid.destroy()
    this.score += 10
    this.sound.play('bomb')
  }

  playerAsteroidCollision(player, asteroid) {
    console.log('hit')
    this.sound.play('death')
    this.gameover = true
    this.player.visible = false
    this.player.disableBody()
    this.deathText.visible = true
  }
}

// Create the game
window.game = new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#000000', // The background color (black)
  scene: mainScene, // The name of the scene we created
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});
// Create the game

window.restartActiveGame = function () {
  if (window.game && window.game.scene.scenes[0]) {
    window.game.scene.scenes[0].scene.restart();
    gameover = false;
  }
};

