// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {

   this.load.image('card-back', 't_memory/assets/card-back.png')
   this.load.image('simonSays', 't_memory/assets/simonSaysFront.png')
  }

  create() {
    /* 
    This method is called once, just after preload()
    It will initialize our scene, like the positions of the sprites
    */

    // const {width, height} = this.scale

    const card = this.add.sprite(68, 68, 'card-back')

    card.setInteractive({useHandCursor: true})

    card.on('pointerdown', ()=>{
      this.flip(card)
    })

   
  }

   flip(card)
    {
        const timeline = this.tweens.timeline({
            onComplete: () => {
                timeline.destroy()
            }
        })
        timeline.add({
            targets: card,
            scale: 1.1,
            duration: 300
        })

        timeline.add({
            targets: card,
            scaleX: 0,
            duration: 300,
            delay: 200,
            onComplete: () => {
                card.setTexture('simonSays')
            }
        })

        timeline.add({
            targets: card,
            scaleX: 1,
            duration: 300,
            delay: 200
        })

        timeline.add({
          targets: card,
          scaleX: 0,
          duration: 300,
          delay: 200,
          onComplete: () => {
            card.setTexture('card-back')
          }
          })

          timeline.add({
            targets: card,
            scaleX: 1,
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
  backgroundColor: '#62b103ff', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

