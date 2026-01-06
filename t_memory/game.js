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

    

    

    // // x and y coordinates
    // const card1 = this.add.image(68, 68, 'backside')
    // // change the scale so it fits the card
    // card1.setScale(68/587)

    // card1.setInteractive({useHandCursor: true})

    // card1.on('pointerdown', ()=>{
    //   this.flip(card1, 'card1')
    // })

    // const card2 = this.add.image(146, 68, 'backside')
    // card2.setScale(68/587)

    // card2.setInteractive({useHandCursor: true})

    // card2.on('pointerdown', ()=>{
    //   this.flip(card2, 'card2')
    // })
   this.placeCard(1, 1)
   this.placeCard(2, 1)
   this.placeCard(3, 1)
   this.placeCard(4, 1)
   this.placeCard(5, 1)
   this.placeCard(6, 2)
   this.placeCard(7, 2)
   this.placeCard(8, 2)
   this.placeCard(9, 2)
   this.placeCard(10, 2)
  }


  placeCard(number, rowNumber)
    {
      this.xCoor = 100*number
    
      if (number >= 6){
        this.xCoor = (100*number)-340
      }
      const card = this.add.image(this.xCoor + 50, (100* rowNumber), 'backside')
      card.setScale(68/587)
      card.setInteractive({useHandCursor: true})
      card.on('pointerdown', ()=>{
      this.flip(card, ('card' + number))
      
    })
    
    // }
  }

    
  

   flip(card, source)
    {
        const timeline = this.tweens.timeline({
            onComplete: () => {
                timeline.destroy()
            }
        })
        timeline.add({
            targets: card,
            scale: 68/587,
            duration: 300
        })

        timeline.add({
            targets: card,
            scaleX: 0,
            duration: 300,
            delay: 200,
            onComplete: () => {
                card.setTexture(source)
            }
        })

        timeline.add({
            targets: card,
            scaleX: 68/587,
            duration: 300,
            delay: 200
        })

        timeline.add({
          targets: card,
          scaleX: 0,
          duration: 300,
          delay: 200,
          onComplete: () => {
            card.setTexture('backside')
          }
          })

          timeline.add({
            targets: card,
            scaleX: 68/587,
            duration: 300,
            delay: 200
          })

        

        timeline.play()
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

