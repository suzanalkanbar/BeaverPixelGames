// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    this.load.image('background', 'j-typefast-horror/assets/scary background.png')
    this.load.image('arrow', 'j-typefast-horror/assets/arrow down.png')

    this.load.spritesheet('foxy jumpscare', 'j-typefast-horror/assets/foxy jumpscare.png',
      {frameWidth: 700, frameHeight: 400}
    )

    this.load.audio('laugh', 'j-typefast-horror/assets/fnaf laugh.mp3')
    
  }

  create() {
    this.background = this.add.image(350, 200, 'background').setOrigin(0.5, 0.5)

    this.foxyScare = this.physics.add.sprite(350, 200, 'foxy jumpscare', 0).setOrigin(0.5, 0.5)
    this.foxyScare.depth = -1

    this.anims.create({
        key: 'foxyscare',
        frames: this.anims.generateFrameNumbers('foxy jumpscare', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }),
        frameRate: 30,
    });


    this.theText = ['I', ' ', 'w', 'i', 'l', 'l', ' ','k' , 'i' , 'l', 'l', ' ', 'y', 'o', 'u', ' ', 'i', 'f', ' ', 'y', 'o', 'u', ' ', 'd', 'o', ' ', 'n', 'o', 't', ' ', 't', 'y', 'p', 'e', ' ', 't', 'h', 'i', 's', ' ', 'f', 'a', 's', 't', ' ', 'e', 'n', 'o', 'u', 'g', 'h', '.', ' ', 'S', 'o', ' ', 'y', 'o', 'u', ' ', 'b', 'e', 't', 't', 'e', 'r', ' ', 'n', 'o', 't', ' ', 'm', 'a', 'k', 'e', ' ', 'a', ' ', 'm', 'i', 's', 't', 'a', 'k', 'e', '.']
    this.testText = [{letter: 'Y', color: 'white', x: 0}, {letter: 'o', color: 'white', x: 0}, {letter: 'u', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'b', color: 'white', x: 0}, {letter: 'e', color: 'white', x: 0}, {letter: 't', color: 'white', x: 0}, {letter: 't', color: 'white', x: 0}, {letter: 'e', color: 'white', x: 0}, {letter: 'r', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 't', color: 'white', x: 0}, {letter: 'y', color: 'white', x: 0}, {letter: 'p', color: 'white', x: 0}, {letter: 'e', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'a', color: 'white', x: 0}, {letter: 's', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'f', color: 'white', x: 0}, {letter: 'a', color: 'white', x: 0}, {letter: 's', color: 'white', x: 0}, {letter: 't', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'a', color: 'white', x: 0}, {letter: 's', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'p', color: 'white', x: 0}, {letter: 'o', color: 'white', x: 0}, {letter: 's', color: 'white', x: 0}, {letter: 's', color: 'white', x: 0}, {letter: 'i', color: 'white', x: 0}, {letter: 'b', color: 'white', x: 0}, {letter: 'l', color: 'white', x: 0}, {letter: 'e', color: 'white', x: 0}, {letter: '.', color: 'white', x: 0}]

    this.index = 0
    this.endIndex = this.testText.length - 1
    this.once = 0

    this.style = { font: '50px Helvetica', fill: '#fff' }
    this.timeLeft = 15
    this.timer = this.add.text(350, 200, this.timeLeft + ' SECONDS LEFT', this.style).setOrigin(0.5, 0.5)
    this.delayTimer = this.time.addEvent({
          delay: 1000,
          callback: ()=>{
            this.timeLeft--
            this.timer.setText(this.timeLeft + ' SECONDS LEFT')
          },
          repeat: this.timeLeft - 1
        })

    this.letterX = 70
    for(let i = 0; i < this.testText.length; i++){
      this.style = { font: '15px Helvetica', fill: this.testText[i].color }
      this.ArrayText = this.add.text(this.letterX, 340, this.testText[i].letter, this.style).setOrigin(0.5, 0.5)
      this.testText[i].x = this.letterX
      this.letterX += 10
    }
    this.arrow = this.add.image(this.testText[this.index].x, 330, 'arrow').setOrigin(0.5, 0.5)

    this.input.keyboard.on('keydown', event =>
        {
          
            this.typing(event.key);

        });
    
  }

  update() {

    if (Phaser.Math.Between(0, 10000) == 1) {
        this.sound.play('laugh')
    }

    if(this.timeLeft == 0){
      this.timer.setColor('red')
      this.timer.setText('SAY GOODBYE TO YOUR LIFE')
      this.foxyScare.depth = 1
      if(this.once == 0){
        this.once = 1
        this.foxyScare.play('foxyscare')
      }
    }
  }

  /* VVV Put any other functions and code down here VVV */

  typing(key){
    if(key == this.testText[this.index].letter){
      console.log('key correct')
      this.testText[this.index].color = 'green'
      this.style = { font: '15px Helvetica', fill: this.testText[this.index].color }
      this.ArrayText = this.add.text(this.testText[this.index].x, 340, this.testText[this.index].letter, this.style).setOrigin(0.5, 0.5)
      if(this.index < this.endIndex){
        this.index++
        this.arrow.x = this.testText[this.index].x
      }else{
        this.timer.setColor('green')
        this.timer.setText('YOU HAD ' + this.timeLeft + ' SECONDS LEFT')
        this.arrow.visible = false
        this.delayTimer.remove()
      }
    }else{
      console.log('wrong key')
      this.testText[this.index].color = 'red'
      this.style = { font: '15px Helvetica', fill: this.testText[this.index].color }
      this.ArrayText = this.add.text(this.testText[this.index].x, 340, this.testText[this.index].letter, this.style).setOrigin(0.5, 0.5)
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

