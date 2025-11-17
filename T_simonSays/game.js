// Create the mainScene
class mainScene {
  // The three methods currently empty

      setupTile(colorName) {
        if (this.playerInputIndex < this.pattern.size){
      const tile = this[colorName]
    tile.setInteractive({useHandCursor: true})
    tile.on('pointerdown', ()=>{
      if (tile.isAnimating) return
      tile.isAnimating = true
      this.tweens.add({
      targets: tile,
      duration: 200, 
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true,
      onComplete: () => { tile.isAnimating = false}
    })
    this.playerPattern.push(colorName)
    this.playerInputIndex++
    console.log(this.playerInputIndex)
    console.log(this.playerPattern)
  })
    }}

  preload() {
    /*     
    This method is called once at the beginning
    It will load all the assets, like sprites and sounds
    */

    this.load.image('red', 't_simonSays/assets/red.jpg')
    this.load.image('blue', 't_simonSays/assets/blue.jpg')
    this.load.image('yellow', 't_simonSays/assets/yellow.jpg')
    this.load.image('green', 't_simonSays/assets/green.jpg')
  }

  create() {
    /* 
    This method is called once, just after preload()
    It will initialize our scene, like the positions of the sprites
    */

    this.colors = ['yellow', 'red', 'blue', 'green']
    this.pattern = [] // the pattern the AI is making
    this.playerPattern = []
    this.playerInputIndex = 0
    this.aiTurn = false
    this.playerTurn = false

    // starting positions of the tiles
    this.yellow = this.physics.add.sprite(280, 130, 'yellow')
    this.red = this.physics.add.sprite(420, 130, 'red')
    this.blue = this.physics.add.sprite(280, 270, 'blue')
    this.green = this.physics.add.sprite(420, 270, 'green')

    //make sure the tiles are immovable
    this.yellow.body.setImmovable(true)
    this.red.body.setImmovable(true)
    this.blue.body.setImmovable(true)
    this.green.body.setImmovable(true)

    // set the colors interactive
    this.setupTile('yellow')
    this.setupTile('red')
    this.setupTile('blue')
    this.setupTile('green')
    
    // score
    this.score = 0
    let style = { font: '20px Arial', fill: '#ffffff'}
    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style)
    




  } // end create()
  
  
  update() {
    /* 
    This method is called 60 times per second after create() 
    It will handle all the game's logic, like movements
  /* VVV Put any other functions and code down here VVV */


    // add new color to the pattern of the AI
    const newColor = Phaser.Utils.Array.GetRandom(this.colors)
    this.pattern.push(newColor)
    

} // end update ()

} // end class mainscene

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#000000ff', // The background color
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

