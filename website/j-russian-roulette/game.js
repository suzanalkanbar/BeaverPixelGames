// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    this.load.spritesheet('restart','j-russian-roulette/assets/Restart roulette.png', 
      {frameWidth: 50, frameHeight: 23}
    )

    this.load.image('shoot','j-russian-roulette/assets/shoot button.png')

    this.load.audio('shot','j-russian-roulette/assets/shot.mp3')
   
  }

  create() {
    this.round = 0
    this.currentShot = 1

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

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.style = { font: '70px Arial', fill: '#eeedecff' };
    this.shotsRoundText = this.add.text(130, 100, '0 out of 6 shot', this.style);
    this.shotsRoundText.depth = 1;

    this.startRound()
    
  }
  update() {

    if(this.spacebar.isDown){
      this.sound.play('shot')
    }
  }

  /* VVV Put any other functions and code down here VVV */

  startRound(){
    this.bullet = Phaser.Math.Between(1, 6 - this.round)
    console.log('here is the bullet: ' + this.bullet)
  }

  shoot(){
    console.log(this.currentShot)
    if(this.currentShot == this.bullet){
      this.shotsRoundText.setText('you are dead')
      this.sound.play('shot')
      this.shootButton.visible = false
      this.restart.visible = true
      this.restart.play('blooddrip')
    }else{
      this.currentShot++
      this.shotsRoundText.setText((this.currentShot - 1) + ' out of ' + (6 - this.round) + ' shot')
    }
  }

  reset(){
    if(this.round < 4){
      this.currentShot = 1
      this.round++
      this.shotsRoundText.setText((this.currentShot - 1) + ' out of ' + (6 - this.round) + ' shot')
      this.restart.visible = false
      this.shootButton.visible = true
      this.startRound()
    }else{
      this.round = 0
      console.log('restarted')
      this.currentShot = 1
      this.shotsRoundText.setText((this.currentShot - 1) + ' out of ' + (6 - this.round) + ' shot')
      this.restart.visible = false
      this.shootButton.visible = true
      this.startRound()
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