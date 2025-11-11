// Create our only scene called mainScene, in the game.js file
class mainScene {
  // The three methods currently empty
    // hit function
  hit() {
    this.coin.x = Phaser.Math.Between(100, 600)
    this.coin.y = Phaser.Math.Between(100, 300)
    this.score += 10
    this.scoreText.setText('score: ' + this.score)
    
    this.tweens.add({
      targets: this.player,
      duration: 200, 
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true,
    })
  }

  preload() {
    // This method is called once at the beginning
    // It will load all the assets, like sprites and sounds  
  this.load.image('player', 'assets/player.png')
  this.load.image('coin', 'assets/coin.png')
}
  create() {
    // This method is called once, just after preload()
    // It will initialize our scene, like the positions of the sprites
    this.player = this.physics.add.sprite(100, 100, 'player')
    this.coin = this.physics.add.sprite(300, 300, 'coin')

    //score
    this.score = 0
    let style = { font: '20px Arial', fill: '#ff1'}
    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style)

  this.arrow = this.input.keyboard.createCursorKeys()

  
}
  update() {
    // This method is called 60 times per second after create() 
    // It will handle all the game's logic, like movements

    if (this.physics.overlap(this.player, this.coin)){
      this.hit()
    }

    //handle movement
  if (this.arrow.right.isDown){
    this.player.x += 3
  }else if (this.arrow.left.isDown){
    this.player.x -= 3
  }

  if (this.arrow.down.isDown){
    this.player.y += 3
  }else if (this.arrow.up.isDown){
    this.player.y -= 3
  }

  }

  }

new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#3498db', // The background color (blue)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});