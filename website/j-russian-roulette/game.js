// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    this.load.image('test', 'j-russian-roulette/assets/test.png')

    this.load.audio('jump', 'j-russian-roulette/assets/jump.mp3')
   
  }

  create() {
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

    this.add.image(250, 200, 'test')
    

  }
  update() {
    if(this.A.isDown){
      alert('should make noise')
    this.sound.play('jump')
    }
  }

  /* VVV Put any other functions and code down here VVV */

}

// Create the game
window.game = new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#772525ff', // The background color (grey)
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