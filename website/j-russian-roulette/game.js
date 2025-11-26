// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    this.load.spritesheet('restart','j-russian-roulette/assets/Restart roulette.png', 
      {frameWidth: 50, frameHeight: 23}
    )
    this.load.spritesheet('players','j-russian-roulette/assets/players.png', 
      {frameWidth: 32, frameHeight: 32}
    )

    this.load.image('shoot','j-russian-roulette/assets/shoot button.png')
    this.load.image('reload', 'j-russian-roulette/assets/reload button.png')

    this.load.audio('shot','j-russian-roulette/assets/shot.mp3')
    this.load.audio('blank', 'j-russian-roulette/assets/blank.mp3')
    this.load.audio('reload', 'j-russian-roulette/assets/clean-revolver-reload-6889.mp3')
   
  }

  create() {
    this.round = 0
    this.currentShot = 1
    this.totalPlayers = 8
    this.players = this.totalPlayers
    this.playerX = 50
    this.playerXMove = (600 / (this.totalPlayers - 1))
    this.playerY = 250
    this.playerArray = []
    this.playerIndex = 0

    this.turnArrow = this.add.image(this.playerX, this.playerY - 64, 'players', 0).setOrigin(0.5, 0.5).setScale(2);

    for(let i = 0; i < this.totalPlayers; i++){
      Phaser.Utils.Array.Add(this.playerArray, this.physics.add.sprite(this.playerX, this.playerY, 'players', 1).setScale(2));
      this.playerX += this.playerXMove
    }
    console.log(this.playerArray)

    this.anims.create({
        key: 'blooddrip',
        frames: this.anims.generateFrameNumbers('restart', { frames: [0, 1, 2, 3, 4] }),
        frameRate: 8,
    });

    this.shootButton = this.physics.add.sprite(350, 350, 'shoot', 0).setOrigin(0.5, 0.5).setScale(2).setInteractive().on('pointerdown', this.shoot, this)
    this.shootButton.depth = -1

    this.restart = this.physics.add.sprite(350, 350, 'restart', 0).setOrigin(0.5, 0.5).setScale(2).setInteractive().on('pointerdown', this.reset, this)
    this.restart.depth = -1
    this.restart.visible = false

    this.reload = this.physics.add.sprite(350, 350, 'reload', 0).setOrigin(0.5, 0.5).setScale(2)
    this.reload.depth = -1
    this.reload.visible = false

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.style = { font: '70px Arial', fill: '#eeedecff' };
    this.shotsRoundText = this.add.text(350, 50, '0 out of 6 shot', this.style).setOrigin(0.5, 0.5);
    this.shotsRoundText.depth = 1;

    this.playersLeft = this.add.text(350, 130, this.players + ' out of ' + this.totalPlayers + ' players left', this.style).setOrigin(0.5, 0.5);

    this.startRound()
    
  }
  update() {

    if(this.spacebar.isDown){
      this.sound.play('shot')
    }
  }

  /* VVV Put any other functions and code down here VVV */

  startRound(){
    this.bullet = Phaser.Math.Between(1, 6)
    console.log('here is the bullet: ' + this.bullet)
    this.sound.play('reload')
  }

  shoot(){
    console.log(this.currentShot)
    if(this.currentShot == this.bullet){
      this.shotsRoundText.setText('you are dead')
      this.players -= 1
      this.playersLeft.setText(this.players + ' out of ' + this.totalPlayers + ' players left')
      this.sound.play('shot')

      this.playerArray[this.playerIndex].destroy()
      Phaser.Utils.Array.RemoveAt(this.playerArray, this.playerIndex)
      console.log(this.playerArray)
      if(this.playerIndex > (this.players - 1)){
        this.playerIndex = 0
      }
      this.turnArrow.x = this.playerArray[this.playerIndex].x

      this.shootButton.visible = false
      this.restart.visible = true
      this.restart.play('blooddrip')
    }else{
      this.currentShot++

      if(this.playerIndex < (this.players - 1)){
        this.playerIndex++
      }else{
        this.playerIndex = 0
      }
      this.turnArrow.x = this.playerArray[this.playerIndex].x

      this.sound.play('blank')
      this.shotsRoundText.setText((this.currentShot - 1) + ' out of ' + (6) + ' shot')
    }
  }

  reset(){
    if(this.round < (this.totalPlayers - 2)){
      this.currentShot = 1
      this.round++
      this.shotsRoundText.setText((this.currentShot - 1) + ' out of ' + (6) + ' shot')
      this.restart.visible = false
      this.reload.visible = true
      // this.delayTimer = this.time.addEvent({
      //     delay: 3200,
      //     callback: ()=>{
            this.shootButton.visible = true
            this.reload.visible = false
        //   },
        //   loop: false
        // })
      this.startRound()
    }else{
      this.round = 0
      console.log('restarted')
      this.players = this.totalPlayers
      this.playersLeft.setText(this.players + ' out of ' + this.totalPlayers + ' players left')
      this.currentShot = 1
      this.shotsRoundText.setText((this.currentShot - 1) + ' out of ' + (6 - this.round) + ' shot')

      this.playerArray[this.playerIndex].destroy()
      this.playerIndex = 0
      for(let i = 0; i < this.totalPlayers; i++){
        Phaser.Utils.Array.Add(this.playerArray, this.physics.add.sprite(this.playerX, this.playerY, 'players', 1).setScale(2));
        this.playerX += this.playerXMove
      }
      this.turnArrow.x = this.playerArray[this.playerIndex].x

      this.restart.visible = false
      this.reload.visible = true
      this.startRound()
      this.delayTimer = this.time.addEvent({
          delay: 3200,
          callback: ()=>{
            this.shootButton.visible = true
            this.reload.visible = false
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