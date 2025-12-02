// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    this.load.image('background', 'j-typefast-horror/assets/scary background.png')
    this.load.image('arrow', 'j-typefast-horror/assets/arrow down.png')

    this.load.audio('laugh', 'j-typefast-horror/assets/fnaf laugh.mp3')
    
  }

  create() {
    this.background = this.add.image(350, 200, 'background').setOrigin(0.5, 0.5)

    this.theText = ['I', ' ', 'w', 'i', 'l', 'l', ' ','k' , 'i' , 'l', 'l', ' ', 'y', 'o', 'u', ' ', 'i', 'f', ' ', 'y', 'o', 'u', ' ', 'd', 'o', ' ', 'n', 'o', 't', ' ', 't', 'y', 'p', 'e', ' ', 't', 'h', 'i', 's', ' ', 'f', 'a', 's', 't', ' ', 'e', 'n', 'o', 'u', 'g', 'h', '.', ' ', 'S', 'o', ' ', 'y', 'o', 'u', ' ', 'b', 'e', 't', 't', 'e', 'r', ' ', 'n', 'o', 't', ' ', 'm', 'a', 'k', 'e', ' ', 'a', ' ', 'm', 'i', 's', 't', 'a', 'k', 'e', '.']

    this.index = 0
    this.endIndex = this.theText.length - 1
    
    console.log(this.theText[this.index])


    this.style = { font: '50px Helvetica', fill: '#fff' }
    this.timeLeft = 30
    this.timer = this.add.text(350, 200, this.timeLeft + ' SECONDS LEFT', this.style).setOrigin(0.5, 0.5)
    this.delayTimer = this.time.addEvent({
          delay: 1000,
          callback: ()=>{
            this.timeLeft--
            this.timer.setText(this.timeLeft + ' SECONDS LEFT')
          },
          repeat: this.timeLeft - 1
        })

    this.style = { font: '15px Helvetica', fill: '#fff' }
    this.ArrayText = this.add.text(350, 340, this.theText.join(''), this.style).setOrigin(0.5, 0.5)
    this.arrow = this.add.image(198, 330, 'arrow').setOrigin(0.5, 0.5)

    this.input.keyboard.on('keydown', event =>
        {
          
            this.typing(event.key);

        });
    
  }

  update() {

    if (Phaser.Math.Between(0, 5000) == 1) {
        this.sound.play('laugh')
    }

    if(this.timeLeft == 0){
      //jumpscare
      this.timer.setColor('red')
      this.timer.setText('YOU LOST YOUR LIFE')
    }
  }

  /* VVV Put any other functions and code down here VVV */

  typing(key){
    if(key == this.theText[this.index]){
      console.log('key correct')
      if(this.index < this.endIndex){
        this.arrow.x += 5
        this.index++
      }else{
        this.ArrayText.setText('you win this round, but do not get your hopes up')
        this.timer.setColor('green')
        this.timer.setText('YOU HAD ' + this.timeLeft + ' SECONDS LEFT')
        this.arrow.visible = false
        this.delayTimer.remove()
      }
    }else{
      console.log('wrong key')
    } 
  }

}

// Create the game
window.game = new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#919191ff', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

window.restartActiveGame = function () {
  if (window.game && window.game.scene.scenes[0]) {
    window.game.scene.scenes[0].scene.restart();
    gameover = false;
  }
};

