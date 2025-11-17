// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    /*     
    This method is called once at the beginning
    It will load all the assets, like sprites and sounds
    */

    this.load.image('red', 'simonSays/assets/red.jpg')
    this.load.image('blue', 'simonSays/assets/blue.jpg')
    this.load.image('yellow', 'simonSays/assets/yellow.jpg')
    this.load.image('green', 'simonSays/assets/green.jpg')
  }

  create() {
    /* 
    This method is called once, just after preload()
    It will initialize our scene, like the positions of the sprites
    */

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

    this.yellow.setInteractive({useHandCursor: true})
    this.yellow.on('pointerdown', ()=>{
      if (this.yellow.isAnimating) return
      this.yellow.isAnimating = true
      console.log("yellow")
      this.tweens.add({
      targets: this.yellow,
      duration: 200, 
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true,
      onComplete: () => { this.yellow.isAnimating = false}
    })
  })

    this.red.setInteractive({useHandCursor: true})
    this.red.on('pointerdown', ()=>{
      if (this.red.isAnimating) return
      this.red.isAnimating = true
      console.log("red")
      this.tweens.add({
      targets: this.red,
      duration: 200, 
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true,
      onComplete: () => { this.red.isAnimating = false}
    })
  })

    this.blue.setInteractive({useHandCursor: true})
    this.blue.on('pointerdown', ()=>{
      if (this.blue.isAnimating) return
      this.blue.isAnimating = true
      console.log("blue")
      this.tweens.add({
      targets: this.blue,
      duration: 200, 
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true,
      onComplete: () => { this.blue.isAnimating = false}
    })
  })
    this.green.setInteractive({useHandCursor: true})
    this.green.on('pointerdown', ()=>{
      if (this.green.isAnimating) return
      this.green.isAnimating = true
      console.log("green")
      this.tweens.add({
      targets: this.green,
      duration: 200, 
      scaleX: 1.2,
      scaleY: 1.2,
      yoyo: true,
      onComplete: () => { this.green.isAnimating = false}
    })
  })

    this.colors = ['yellow', 'red', 'blue', 'green']
    this.pattern = [] // the pattern the AI is making
    this.playerPattern = []
    this.playerInputIndex = 0
    this.aiTurn = false
    this.playerTurn = false

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

