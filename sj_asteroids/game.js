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

    this.player = this.physics.add.sprite(350, 200, 'player')

    this.arrow = this.input.keyboard.createCursorKeys()

  }
  update() {
    /* 
    This method is called 60 times per second after create() 
    It will handle all the game's logic, like movements
    */

    // fix hitbox not updating
    if (this.arrow.right.isDown) {
      this.player.angle += 1
    } else if (this.arrow.left.isDown) {
      this.player.angle -= 1
    }

    this.player.setVelocity(0)

    if (this.arrow.up.isDown) {

      if (0 <= this.player.angle < 90) {
        console.log("1")
        this.player.setVelocity(Math.sin(this.player.angle) * 100, Math.sin(this.player.angle) * 100)
      } else if (90 <= this.player.angle < 180) {
        console.log("2")
        this.player.setVelocity(Math.cos(this.player.angle) * 100, Math.sin(this.player.angle) * 100)
      } else if (-180 <= this.player.angle > -90) {
        console.log("3")
        this.player.setVelocity(Math.cos(this.player.angle) * 100, Math.sin(this.player.angle) * 100)
      } else if (0 > this.player.angle >= -90) {
        console.log("4")
        this.player.setVelocity(Math.cos(this.player.angle) * 100, Math.sin(this.player.angle) * 100)
      }
    }

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

