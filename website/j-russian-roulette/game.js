// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    this.load.spritesheet('restart','j-russian-roulette/assets/Restart roulette.png', 
      {frameWidth: 50, frameHeight: 23}
    )
    this.load.spritesheet('turn arrow', 'j-russian-roulette/assets/players.png',
      {frameWidth: 32, frameHeight: 32}
    )
    this.load.spritesheet('man yellow','j-russian-roulette/assets/man gele hoed.png', 
      {frameWidth: 165, frameHeight: 279}
    )
    this.load.spritesheet('woman blue','j-russian-roulette/assets/vrouw blauwe sieraden.png', 
      {frameWidth: 165, frameHeight: 279}
    )
    this.load.spritesheet('man green','j-russian-roulette/assets/man groene zonnebril.png', 
      {frameWidth: 165, frameHeight: 279}
    )
    this.load.spritesheet('man pink','j-russian-roulette/assets/man roze stropdas.png', 
      {frameWidth: 165, frameHeight: 279}
    )


    this.load.image('shoot','j-russian-roulette/assets/shoot button.png')
    this.load.image('reloading', 'j-russian-roulette/assets/reloading button.png')
    this.load.image('reload', 'j-russian-roulette/assets/reload button.png')
    this.load.image('background', 'j-russian-roulette/assets/background bar.png')
    this.load.image('table', 'j-russian-roulette/assets/table.png')
    this.load.image('start', 'j-russian-roulette/assets/start.png')
    this.load.image('shoot yourself', 'j-russian-roulette/assets/shoot yourself.png')
    this.load.image('flash', 'j-russian-roulette/assets/flashbang.png')
    this.load.image('mag', 'j-russian-roulette/assets/empty.png')
    this.load.image('shadow', 'j-russian-roulette/assets/silhouet.png')

    this.load.audio('shot','j-russian-roulette/assets/shot.mp3')
    this.load.audio('blank', 'j-russian-roulette/assets/blank.mp3')
    this.load.audio('reload', 'j-russian-roulette/assets/clean-revolver-reload-6889.mp3')
    this.load.audio('yipee', 'j-russian-roulette/assets/yippeee.mp3')
   
  }

  create() {
    this.background = this.add.image(350, 200, 'background').setOrigin(0.5, 0.5)
    this.background.depth = -1

    this.table = this.add.image(350, 385, 'table').setOrigin(0.5, 0.5)
    this.table.depth = 0.1

    this.selfShot = this.add.image(550, 240, 'shoot yourself').setOrigin(0.5, 0.5)
    this.selfShot.depth = 1
    this.selfShot.visible = false
    this.flash = this.physics.add.sprite(350, 200, 'flash').setOrigin(0.5, 0.5)
    this.flash.depth = 10
    this.flash.visible = false

    this.round = 0
    this.currentShot = 1
    this.totalPlayers = 5
    this.players = this.totalPlayers
    this.playerX = 80
    this.playerXMove = 180
    this.playerY = 250
    this.playerNumber = 2
    this.playerArray = []
    this.playerIndex = Phaser.Math.Between(0, this.totalPlayers - 1)

    Phaser.Utils.Array.Add(this.playerArray, this.physics.add.sprite(-500, -600, 'turn arrow', 0))

    Phaser.Utils.Array.Add(this.playerArray, this.physics.add.sprite(this.playerX, this.playerY, 'man green', 0));
    this.playerArray[1].name = 'man green'
    this.playerX += this.playerXMove
    Phaser.Utils.Array.Add(this.playerArray, this.physics.add.sprite(this.playerX, this.playerY, 'woman blue', 0));
    this.playerArray[2].name = 'woman blue'
    this.playerX += this.playerXMove
    Phaser.Utils.Array.Add(this.playerArray, this.physics.add.sprite(this.playerX, this.playerY, 'man yellow', 0));
    this.playerArray[3].name = 'man yellow'
    this.playerX += this.playerXMove
    Phaser.Utils.Array.Add(this.playerArray, this.physics.add.sprite(this.playerX, this.playerY, 'man pink', 0));
    this.playerArray[4].name = 'man pink'
    this.playerX += this.playerXMove

    console.log(this.playerArray)
    
    if(this.playerIndex == 0){
      this.turnArrow = this.add.image(350, 300, 'turn arrow', 0).setOrigin(0.5, 0.5).setScale(2);
      this.selfShot.visible = true
    }else{
      this.turnArrow = this.add.image(this.playerArray[this.playerIndex].x, this.playerY - 64, 'turn arrow', 1).setOrigin(0.5, 0.5).setScale(2);
    }
    this.turnArrow.depth = 0.3
    

    this.anims.create({
        key: 'blooddrip',
        frames: this.anims.generateFrameNumbers('restart', { frames: [0, 1, 2, 3, 4] }),
        frameRate: 4,
    });

    this.buttonY = 360

    
    this.shootButton = this.physics.add.sprite(350, this.buttonY, 'shoot', 0).setOrigin(0.5, 0.5).setScale(2).setInteractive().on('pointerdown', this.shoot, this)
    this.shootButton.depth = 0.2

    this.restart = this.physics.add.sprite(350, this.buttonY, 'restart', 0).setOrigin(0.5, 0.5).setScale(2)
    this.restart.depth = 0.2
    this.restart.visible = false

    this.reloading = this.physics.add.sprite(350, this.buttonY, 'reloading', 0).setOrigin(0.5, 0.5).setScale(2)
    this.reloading.depth = 0.2
    this.reloading.visible = false

    this.reload = this.physics.add.sprite(350, this.buttonY, 'reload', ).setOrigin(0.5, 0.5).setScale(2).setInteractive().on('pointerdown', this.reset, this)
    this.reload.depth = 0.2
    this.reload.visible = false

    this.start = this.physics.add.sprite(350, this.buttonY, 'start', ).setOrigin(0.5, 0.5).setScale(2).setInteractive().on('pointerdown', this.startRound, this)
    this.start.depth = 0.2

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.add.image(600, 30, 'mag').setOrigin(0.5, 0.5).setScale(1.2)
    this.style = { font: '40px Arial', fill: '#ffffffff' };
    this.shotsRoundText = this.add.text(650, 30, '0/6', this.style).setOrigin(0.5, 0.5);
    this.shotsRoundText.depth = 1;

    this.add.image(602, 65, 'shadow').setOrigin(0.5, 0.5).setScale(1.2)
    this.playersLeft = this.add.text(650, 70, this.players + '/' + this.totalPlayers, this.style).setOrigin(0.5, 0.5);
  }

  update() {


  }

  /* VVV Put any other functions and code down here VVV */

  startRound(){
    this.start.visible = false
    this.start.disableInteractive()
    this.reloading.visible = true
    this.shootButton.visible = false
      this.delayTimer = this.time.addEvent({
          delay: 3200,
          callback: ()=>{
            this.shootButton.visible = true
            this.reloading.visible = false
          },
          loop: false
        })
    this.bullet = Phaser.Math.Between(1, 6)
    console.log('here is the bullet: ' + this.bullet)
    this.sound.play('reload')
  }

  shoot(){
    console.log(this.currentShot)
    //if the bullet is shot
    if(this.currentShot == this.bullet){
      
      //lose by dying
      if(this.playerIndex == 0){
        this.playerArray[this.playerIndex].destroy()
        this.shootButton.visible = false
        this.sound.play('shot')
        this.flash.visible = true
        this.delayTimer = this.time.addEvent({
          delay: 500,
          callback: ()=>{
            this.flash.visible = false
            this.restart.visible = true
            this.restart.play('blooddrip')
          },
          loop: false
        })
        //a computer dies
      }else{
        this.players -= 1
        this.sound.play('shot')
        this.playersLeft.setText(this.players + '/' + this.totalPlayers)
        this.playerArray[this.playerIndex].setFrame(1)
        this.delayTimer = this.time.addEvent({
          delay: 1000,
          callback: ()=>{
            if(this.playerArray[this.playerIndex].name == 'man green'){
            this.add.image(this.playerArray[this.playerIndex].x, this.playerArray[this.playerIndex].y, 'man green', 1)
            }else if(this.playerArray[this.playerIndex].name == 'woman blue'){
            this.add.image(this.playerArray[this.playerIndex].x, this.playerArray[this.playerIndex].y, 'woman blue', 1)
            }else if(this.playerArray[this.playerIndex].name == 'man yellow'){
            this.add.image(this.playerArray[this.playerIndex].x, this.playerArray[this.playerIndex].y, 'man yellow', 1)
            }else if(this.playerArray[this.playerIndex].name == 'man pink'){
            this.add.image(this.playerArray[this.playerIndex].x, this.playerArray[this.playerIndex].y, 'man pink', 1)
            }
             this.playerArray[this.playerIndex].destroy()
          Phaser.Utils.Array.RemoveAt(this.playerArray, this.playerIndex)
          console.log(this.playerArray)
          if(this.playerIndex > (this.players - 1)){
            this.playerIndex = 0
          }
          if(this.playerIndex == 0){
            this.selfShot.visible = true
            this.turnArrow.setFrame(0)
            this.turnArrow.x = 350
            this.turnArrow.y = 300
          }else{
            this.selfShot.visible = false
            this.turnArrow.setFrame(1)
            this.turnArrow.y = this.playerY - 64
            this.turnArrow.x = this.playerArray[this.playerIndex].x
          }

          this.shootButton.visible = false
          },
          loop: false
        })
       
        // if you win
        if(this.players == 1){
          this.delayTimer = this.time.addEvent({
          delay: 300,
          callback: ()=>{
            this.sound.play('yipee')
          },
          loop: false
        })
        this.delayTimer = this.time.addEvent({
          delay: 1000,
          callback: ()=>{
            this.selfShot.visible = false
          },
          loop: false
        })
          //if there are still others left
        }else{
          this.reload.visible = true
        }
      
    }
    //if it was a blank
    }else{
      this.currentShot++

      if(this.playerIndex < (this.players - 1)){
        this.playerIndex++
      }else{
        this.playerIndex = 0
      }
      if(this.playerIndex == 0){
        this.selfShot.visible = true
        this.turnArrow.setFrame(0)
            this.turnArrow.x = 350
            this.turnArrow.y = 300
          }else{
            this.selfShot.visible = false
            this.turnArrow.setFrame(1)
            this.turnArrow.y = this.playerY - 64
            this.turnArrow.x = this.playerArray[this.playerIndex].x
          }

      this.sound.play('blank')
      this.shotsRoundText.setText((this.currentShot - 1) + '/6')
    }
  }

  reset(){
    //restarts the round if more than 1 player is left
    if(this.round < (this.totalPlayers - 2)){
      this.currentShot = 1
      this.round++
      this.shotsRoundText.setText((this.currentShot - 1) + '/6')
      this.restart.visible = false
      this.shootButton.visible = false
      this.reload.visible = false
      this.reloading.visible = true
      this.delayTimer = this.time.addEvent({
          delay: 3200,
          callback: ()=>{
            this.shootButton.visible = true
            this.reloading.visible = false
          },
          loop: false
        })
      this.startRound()
      //could restart the game if 1 player remains, but doesn't work yet
    }else{
      this.round = 0
      console.log('restarted')
      this.players = this.totalPlayers
      this.playersLeft.setText(this.players + '/' + this.totalPlayers)
      this.currentShot = 1
      this.shotsRoundText.setText((this.currentShot - 1) + '/6')

      this.playerArray[this.playerIndex].destroy()
      this.playerIndex = 0
      for(let i = 0; i < this.totalPlayers; i++){
        Phaser.Utils.Array.Add(this.playerArray, this.physics.add.sprite(this.playerX, this.playerY, 'players', 1).setScale(2));
        this.playerX += this.playerXMove
      }
      if(this.playerIndex == 0){
        this.selfShot.visible = true
        this.turnArrow.setFrame(0)
            this.turnArrow.x = 350
            this.turnArrow.y = 300
          }else{
            this.selfShot.visible = false
            this.turnArrow.setFrame(1)
            this.turnArrow.y = this.playerY - 64
            this.turnArrow.x = this.playerArray[this.playerIndex].x
          }

      this.restart.visible = false
      this.reloading.visible = true
      this.startRound()
      this.delayTimer = this.time.addEvent({
          delay: 3200,
          callback: ()=>{
            this.shootButton.visible = true
            this.reloading.visible = false
          },
          loop: false
        })
    }
  }
}

// Create the game
window.game = new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#774625', // The background color
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