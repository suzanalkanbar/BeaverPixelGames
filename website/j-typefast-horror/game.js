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
    this.load.audio('foxy scream', 'j-typefast-horror/assets/foxy scream.mp3')
    
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


    this.introText = ['You wake up in an abandoned warehouse, confused', 'Suddenly you hear a voice over a speaker say:', 'I want to play a little game', 'show me your typing skills, and if you\'re fast enough i will let you live', 'good luck']
    this.secondDialogue = ['Congrats on surviving the first round', 'perhaps you are good enough to survive', 'But don\'t get your hopes up', 'There is still a long way to go', 'So get ready for the next round']

    this.testText = [{letter: 'Y', color: 'white', x: 0}, {letter: 'o', color: 'white', x: 0}, {letter: 'u', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'b', color: 'white', x: 0}, {letter: 'e', color: 'white', x: 0}, {letter: 't', color: 'white', x: 0}, {letter: 't', color: 'white', x: 0}, {letter: 'e', color: 'white', x: 0}, {letter: 'r', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 't', color: 'white', x: 0}, {letter: 'y', color: 'white', x: 0}, {letter: 'p', color: 'white', x: 0}, {letter: 'e', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'a', color: 'white', x: 0}, {letter: 's', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'f', color: 'white', x: 0}, {letter: 'a', color: 'white', x: 0}, {letter: 's', color: 'white', x: 0}, {letter: 't', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'a', color: 'white', x: 0}, {letter: 's', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'p', color: 'white', x: 0}, {letter: 'o', color: 'white', x: 0}, {letter: 's', color: 'white', x: 0}, {letter: 's', color: 'white', x: 0}, {letter: 'i', color: 'white', x: 0}, {letter: 'b', color: 'white', x: 0}, {letter: 'l', color: 'white', x: 0}, {letter: 'e', color: 'white', x: 0}, {letter: '.', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'O', color: 'white', x: 0}, {letter: 'r', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'e', color: 'white', x: 0}, {letter: 'l', color: 'white', x: 0}, {letter: 's', color: 'white', x: 0}, {letter: 'e', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'y', color: 'white', x: 0}, {letter: 'o', color: 'white', x: 0}, {letter: 'u', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'a', color: 'white', x: 0}, {letter: 'n', color: 'white', x: 0}, {letter: 'd', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'y', color: 'white', x: 0}, {letter: 'o', color: 'white', x: 0}, {letter: 'u', color: 'white', x: 0}, {letter: 'r', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'f', color: 'white', x: 0}, {letter: 'r', color: 'white', x: 0}, {letter: 'i', color: 'white', x: 0}, {letter: 'e', color: 'white', x: 0}, {letter: 'n', color: 'white', x: 0}, {letter: 'd', color: 'white', x: 0}, {letter: 's', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'w', color: 'white', x: 0}, {letter: 'i', color: 'white', x: 0}, {letter: 'l', color: 'white', x: 0}, {letter: 'l', color: 'white', x: 0}, {letter: ' ', color: 'white', x: 0}, {letter: 'd', color: 'white', x: 0}, {letter: 'i', color: 'white', x: 0}, {letter: 'e', color: 'white', x: 0}, {letter: '.', color: 'white', x: 0}]

    this.index = 0
    this.endIndex = this.testText.length - 1
    this.once = 0
    this.currentSentence = 0
    this.mistakes = 0
    this.totalMistakes = 0

    
    this.timer = this.add.text(350, 200, this.introText[this.index], this.style).setOrigin(0.5, 0.5)

    this.mistakeText = this.add.text(650, 20, this.mistakes + ' mistakes', { font: '15px Helvetica', fill: '#fff' }).setOrigin(0.5, 0.5)

    this.projectSentence()
  }

  update() {

    if (Phaser.Math.Between(0, 10000) == 1) {
        this.sound.play('laugh')
    }

    if(this.timeLeft == 0){
      this.timer.setColor('red')
      this.timer.setText('BYE BYE')
      this.foxyScare.depth = 1
      if(this.once == 0){
        this.once = 1
        this.sound.play('foxy scream')
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
      this.ArrayText = this.add.text(this.testText[this.index].x, this.arrayY, this.testText[this.index].letter, this.style).setOrigin(0.5, 0.5)
      if(this.index < this.endIndex){
        this.index++
        this.arrow.x = this.testText[this.index].x
        if(this.index == 57){
          this.arrow.y = 345
          this.arrayY += 15
        }
      }else{
        this.timer.setColor('green')
        this.timer.setText('YOU HAD ' + this.timeLeft + ' SECONDS LEFT')
        this.totalMistakes += this.mistakes
        this.mistakes = 0
        this.arrow.visible = false
        this.delayTimer.remove()
        this.keyInput.destroy()
        this.delayTimer = this.time.addEvent({
            delay: 3000,
            callback: ()=>{
                this.currentSentence += 1
                this.index = 0
                this.projectSentence()
              
            },
          })
      }
    }else{
      console.log('wrong key')
      this.testText[this.index].color = 'red'
      this.mistakes++
      this.mistakeText.setText(this.mistakes + ' mistakes')
      this.style = { font: '15px Helvetica', fill: this.testText[this.index].color }
      this.ArrayText = this.add.text(this.testText[this.index].x, this.arrayY, this.testText[this.index].letter, this.style).setOrigin(0.5, 0.5)
    } 
  }

  projectSentence(){
    if(this.currentSentence == 0){
      this.delayTimer = this.time.addEvent({
            delay: 3000,
            callback: ()=>{
              this.timer.setText(this.introText[this.index])
              this.index++
              if(this.index > this.introText.length){
                this.currentSentence += 1
                this.index = 0
                this.projectSentence()
              }
            },
            repeat: this.introText.length
          })
          
          
    }else if(this.currentSentence == 1){
      this.keyInput = this.input.keyboard.on('keydown', event =>
          {
            if(event.key != 'Shift'){
              this.typing(event.key);
            }

          });

      
      this.timeLeft = 40

      this.letterX = 70
      this.letterY = 340
      this.arrayY = 340
      for(let i = 0; i < this.testText.length; i++){
        this.style = { font: '15px Helvetica', fill: this.testText[i].color }
        this.ArrayText = this.add.text(this.letterX, this.letterY, this.testText[i].letter, this.style).setOrigin(0.5, 0.5)
        this.testText[i].x = this.letterX
        this.letterX += 10
        if(i == 57){
          this.letterX = 70
          this.letterY += 15
        }
      }

    this.arrow = this.add.image(this.testText[this.index].x, 330, 'arrow').setOrigin(0.5, 0.5)
      
      this.delayTimer = this.time.addEvent({
            delay: 1000,
            callback: ()=>{
              this.timeLeft--
              if(this.timeLeft < 6){
                this.timer.setText('')
              }else{
              this.timer.setText(this.timeLeft + ' SECONDS LEFT')
              }
            },
            repeat: this.timeLeft - 1
          })
    }else if(this.currentSentence == 2){
      this.delayTimer = this.time.addEvent({
            delay: 3000,
            callback: ()=>{
              this.timer.setColor('white')
              this.timer.setText(this.secondDialogue[this.index])
              this.index++
              if(this.index > this.secondDialogue.length){
                this.currentSentence +=  1
                this.index = 0
                this.projectSentence()
              }
            },
            repeat: this.secondDialogue.length
          })
    }else if(this.currentSentence == 3){
      this.timer.setText('next Sentence')
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

