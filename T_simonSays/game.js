// Create the mainScene
class mainScene {
  // The three methods currently empty

    startGame () {
      this.score = 0
      this.scoreText.setText('Score: ' + this.score)
      this.highscoreText.setText('Highscore: ' + this.highscore)
      this.pattern = []
      this.aiTurn = true
      this.time.delayedCall(1000, this.aiMakingPattern, [], this)
      this.startButton.visible = false
      this.gameOverText.visible = false
    }

    gameOver () {
      console.log('Game Over')
      this.gameOverText.visible = true
      this.score = 0
      this.scoreText.setText('Score: ' + this.score)
      this.startButton.setText('Restart')
      this.startButton.visible = true
      
      // return the tiles to their original position
      this.yellow.setPosition(280, 130)
      this.red.setPosition(420, 130)
      this.blue.setPosition(280, 270) 
      this.green.setPosition(420, 270)
    }

      setupTile(colorName) {
      const tile = this[colorName]
    tile.setInteractive({useHandCursor: true})
    tile.isAnimating = false

    tile.on('pointerdown', ()=>{
      if (!this.playerTurn || tile.isAnimating) return


        tile.isAnimating = true
        this.playerPattern.push(colorName)
        // console.log('the pattern of the player: ' + this.playerPattern)
        this.tileSoundPlay(colorName)
        
        this.tweens.add({
        targets: tile,
        duration: 200, 
        scaleX: 1.2,
        scaleY: 1.2,
        yoyo: true,
      onComplete: () => { if(!this.startButton.visible) {tile.isAnimating = false}
      tile.isAnimating = false}
    })
      this.checkPlayerPattern()
  })
    }
    

     aiMakingPattern(){
      if (this.aiTurn == true){    
    const newColor = Phaser.Utils.Array.GetRandom(this.colors) // newColor is a random color
    this.pattern.push(newColor) // add random color to the array
    // console.log('The pattern of the AI: ' + this.pattern)
    this.patternIndex = 0
    this.playerpattern = []
    this.aiTurn = false

    this.time.delayedCall(500, this.showAIPattern, [], this)

      }
    }

    checkPlayerPattern() {
      const currentInputIndex = this.playerPattern.length -1
      const playerColor = this.playerPattern[currentInputIndex]
      const correctColor = this.pattern[currentInputIndex]

      if (playerColor !== correctColor){
        this.gameOver ()
        
      }
      // you only get a score when you reached the same array length as the pattern array of the AI
      else if(this.playerPattern.length == this.pattern.length){
        this.score++
        this.scoreText.setText('Score: ' + this.score)
        this.updateHighscore()
        this.otherTilePos()
        this.highscoreText.setText('Highscore: ' + this.highscore)
        this.playerTurn = false
        this.aiTurn = true
        this.time.delayedCall(2000, this.aiMakingPattern, [], this)
      }
    }

    showAIPattern(){
      // every color is tweening until the full length of the array is completed
      if (this.patternIndex < this.pattern.length){
        const colorName = this.pattern[this.patternIndex]
        const tile = this[colorName]

        this.tileSoundPlay(colorName)
        
        this.tweens.add({
        targets: tile,
        duration: 300, 
        scaleX: 1.2,
        scaleY: 1.2,
        yoyo: true,
        onComplete: () => { 
        tile.isAnimating = false
        this.patternIndex++
        this.time.delayedCall(500, this.showAIPattern, [], this)
        }
        
        })
    }
    // after showing the pattern it's the player's turn, with their index and array reset 
    else {
          this.playerTurn = true
          this.playerPattern = []
          this.playerInputIndex = 0
        }
  }

  // only update the highscore when the score is higher than the highscore
  updateHighscore() {
    if(this.score >= this.highscore){
      this.highscore = this.score
    }
  }
  
  // play the sound when a tile is tweening
  tileSoundPlay(colorName){
    this.colorToPlay = colorName
      this.playIt = this.sound.add(this.colorToPlay)
      this.playIt.play()
    }

    //When you reach a score of 10 the tiles are positioned differently
   otherTilePos(){
      if (this.score >= 10){
    this.yellow.setPosition(280, 270)
    this.red.setPosition(280, 130)
    this.blue.setPosition(420, 270) 
    this.green.setPosition(420, 130)
      }
    }


  preload() {
    /*     
    This method is called once at the beginning
    It will load all the assets, like sprites and sounds
    */

    // load the tiles 
    this.load.image('red', 't_simonSays/assets/red.jpg')
    this.load.image('blue', 't_simonSays/assets/blue.jpg')
    this.load.image('yellow', 't_simonSays/assets/yellow.jpg')
    this.load.image('green', 't_simonSays/assets/green.jpg')

    // load the sounds for each tile
    this.load.audio('red', 't_simonSays/assets/red.mp3')
    this.load.audio('blue', 't_simonSays/assets/blue.mp3')
    this.load.audio('yellow', 't_simonSays/assets/yellow.mp3')
    this.load.audio('green', 't_simonSays/assets/green.mp3')
  }

  create() {
    /* 
    This method is called once, just after preload()
    It will initialize our scene, like the positions of the sprites
    */

    this.colors = ['yellow', 'red', 'blue', 'green']
    this.pattern = [] // the pattern the AI is making
    this.patternIndex = 0
    this.playerPattern = []
    this.playerInputIndex = 0
    this.aiTurn = false
    this.playerTurn = false
    this.score = 0
    this.highscore = 0

    // the x and y center of the canvas
    const centerX = 350
    const centerY = 200
    
    

    // starting positions of the tiles
    this.yellow = this.physics.add.sprite(280, 130, 'yellow')
    this.red = this.physics.add.sprite(420, 130, 'red')
    this.blue = this.physics.add.sprite(280, 270, 'blue')
    this.green = this.physics.add.sprite(420, 270, 'green')


    // set the colors interactive
    this.setupTile('yellow')
    this.setupTile('red')
    this.setupTile('blue')
    this.setupTile('green')
    
    // score and highscore
    let style = { font: '20px Arial', fill: '#ffffff'}
    this.scoreText = this.add.text(20, 20, 'Score: ' + this.score, style)
    this.highscoreText = this.add.text (20, 40, 'Highscore: ' + this.highscore, style)
    
    //the start/reset button
    let buttonStyle = {
      font: '32px Arial',
      fill: '#1a1a2e',
      backgroundColor: '#ffc107',
      padding: { x:15, y:10 }
    }
    this.startButton = this.add.text(centerX, 375, 'Start Game', buttonStyle)
    this.startButton.setOrigin(0.5)
    this.startButton.setInteractive({ useHandCursor: true})
    this.startButton.on('pointerdown', this.startGame, this)

    // game over text
    let gameOverStyle = {
      font: '40px Arial',
      fill: '#ff0000',
      padding: { x:15, y:10 }
    }

    this.gameOverText = this.add.text(215, 175, 'GAME OVER', gameOverStyle)
    this.gameOverText.visible = false
    
  } // end create()
  
  
  update() {
    /* 
    This method is called 60 times per second after create() 
    It will handle all the game's logic, like movements
  /* VVV Put any other functions and code down here VVV */


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

