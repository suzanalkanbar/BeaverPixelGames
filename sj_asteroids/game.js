// https://freeasteroids.org/ <- inspiratie

// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    /*     
    This method is called once at the beginning
    It will load all the assets, like sprites and sounds
    */
    this.load.image('player', 'sj_asteroids/assets/bullet_hell_player_ship.png');
  }

  create() {
    /* 
    This method is called once, just after preload()
    It will initialize our scene, like the positions of the sprites
    */

    const width = this.cameras.main.width
    const height = this.cameras.main.height

    this.score = 0

    this.player = this.physics.add.sprite(350, 200, 'player')
    this.player.setDrag(0.99)
    this.player.setMaxVelocity(150)
    this.player.setCollideWorldBounds(true)

    this.scoreText = this.add.text(width - 200, 20,'Score: 0000').setOrigin(0.5)

    this.arrow = this.input.keyboard.createCursorKeys()

  }
  update() {
    /* 
    This method is called 60 times per second after create() 
    It will handle all the game's logic, like movements
    */

    if (this.arrow.up.isDown) {
      this.physics.velocityFromRotation(this.player.rotation, 150, this.player.body.acceleration)
    } else {
      this.player.setAcceleration(0)
    }

    // fix hitbox not updating
    if (this.arrow.right.isDown) {
      this.player.setAngularVelocity(300)
    } else if (this.arrow.left.isDown) {
      this.player.setAngularVelocity(-300)
    } else {
      this.player.setAngularVelocity(0)
    }

    this.scoreText.setText('Score: '+ this.score)

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

