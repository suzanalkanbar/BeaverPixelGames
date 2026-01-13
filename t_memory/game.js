// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {

   this.load.image('backside', 't_memory/assets/backside.png')
   this.load.image('card1', 't_memory/assets/card1.png')
   this.load.image('card2', 't_memory/assets/card2.png')
   this.load.image('card3', 't_memory/assets/card3.png')
   this.load.image('card4', 't_memory/assets/card4.png')
   this.load.image('card5', 't_memory/assets/card5.png')
   this.load.image('card6', 't_memory/assets/card6.png')
   this.load.image('card7', 't_memory/assets/card7.png')
   this.load.image('card8', 't_memory/assets/card8.png')
   this.load.image('card9', 't_memory/assets/card9.png')
   this.load.image('card10', 't_memory/assets/card10.png')
  }

  create() {

    // een array met de 10 verschillende kaarten (x2)
    this.cardValues = Phaser.Utils.Array.Shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) 


    this.firstCard = null
    this.secondCard = null
    this.canMove = true

    this.score = 0
    this.matches = 0

    this.scoreText = this.add.text(20, 15, 'Tries: 0', {fontSize: '20px', font: '900 25px Courier'})
    this.matchesText = this.add.text (500, 15, 'Matches: 0/10', {fontSize: '20px', font: '900 25px Courier'})

    let index = 0
    // 4 rijen en 5 kolommen
    for (let row = 0; row < 4; row++){
      for (let column = 0; column < 5; column++){
        let cardNumber = this.cardValues[index]
        this.placeCard(column, row, cardNumber)
        index++
      }
    }
    

  }


  placeCard(column, row, cardNumber)
    {
      this.xCoor = 100 + (column * 120)
      this.yCoor = 80 + (row * 80)
    
      const card = this.add.image(this.xCoor, this.yCoor, 'backside')
      card.setScale(68/587)
      card.setInteractive({useHandCursor: true})

      card.cardId = cardNumber

      card.on('pointerdown', ()=>{
      this.handleClick(card)
      })
    
    
  }

    
  flipToFront(card) {
    this.tweens.add({
      targets: card,
      scaleX: 0,
      duration: 150,
      onComplete: () => {
        card.setTexture('card' + card.cardId)
        this.tweens.add({
          targets: card,
          scaleX: 68/587,
          duration: 150
        })
      }
    })
  }

   flipToBack(card) {
    this.tweens.add({
      targets: card,
      scaleX: 0,
      duration: 150,
      onComplete: () => {
        card.setTexture('backside')
        this.tweens.add({
          targets: card,
          scaleX: 68/587,
          duration: 150
        })
      }
    })
  }

    handleClick(card) {
      if (!this.canMove || card.isFlipped) return

      card.isFlipped = true
      this.flipToFront(card)

      if (!this.firstCard) {
        this.firstCard = card
      } 
      else {
        this.secondCard = card
        this.canMove = false
        this.checkMatch()
      }
    }

    gameOver(){
      this.add.text(350, 200, 'Victory!', {fontSize: '150px', font: '900 100px Courier'})
          .setOrigin(0.5)
      
          this.restartButton = this.add.text (350, 350, 'Restart', {fontSize: '150px', font: '900 30px Courier'})
          .setOrigin(0.5)
          .setInteractive({ useHandCursor: true })

          this.restartButton.on('pointerdown', () => {
            this.scene.restart()
          })
    }


    checkMatch() {

      this.score++
      this.scoreText.setText('Tries: ' + this.score)

      if (this.firstCard.cardId == this.secondCard.cardId) {
        this.matches++
        this.matchesText.setText('Matches:' + this.matches + '/10')

        this.firstCard = null
        this.secondCard = null
        this.canMove = true

        if (this.matches == 10){
          this.gameOver()
        }
      }
      else {
        this.time.delayedCall(1000, () => {
          this.flipToBack(this.firstCard)
          this.flipToBack(this.secondCard)
          this.firstCard.isFlipped = false
          this.secondCard.isFlipped = false
          this.firstCard = null
          this.secondCard = null
          this.canMove = true
        })

      }
    }


    

  update() {


  }

  /* VVV Put any other functions and code down here VVV */

}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#62b103', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

