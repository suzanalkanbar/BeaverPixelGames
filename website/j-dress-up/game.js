// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    this.load.image('man', 'j-dress-up/assets/man.png')
    this.load.image('woman', 'j-dress-up/assets/woman.png')
    this.load.image('room', 'j-dress-up/assets/dressing room.png')

    this.load.spritesheet('hats', 'j-dress-up/assets/hats.png',
      {frameWidth: 200, frameHeight: 70}
    )
    this.load.spritesheet('shirts', 'j-dress-up/assets/body clothes.png',
      {frameWidth: 300, frameHeight: 400}
    )
    this.load.spritesheet('pants', 'j-dress-up/assets/pants.png',
      {frameWidth: 300, frameHeight: 400}
    )
    this.load.spritesheet('shoes', 'j-dress-up/assets/shoes.png',
      {frameWidth: 300, frameHeight: 400}
    )
    
  }

  create() {
    this.room = this.add.image(350, 200, 'room').setOrigin(0.5, 0.5)
    this.room.depth = -10
    this.manClothes = this.add.rectangle(75, 200, 200, 400, 0x006be3)
    this.womanClothes = this.add.rectangle(625, 200, 200, 400, 0xff1afa)
    
    this.man = this.add.image(350, 200, 'man').setOrigin(0.5, 0.5).setInteractive()
    this.man.depth = -1
    this.woman = this.add.image(350, 200, 'woman').setOrigin(0.5, 0.5)
    this.man.depth = -1
    this.woman.visible = false

    this.currentHat = this.add.image(350, 32, 'hats', 1).setOrigin(0.5, 0.5)
    this.currentShirt = this.add.image(350, 200, 'shirts', 2).setOrigin(0.5, 0.5)
    this.currentShirt.depth = -0.9
    this.currentPants = this.add.image(350, 200, 'pants', 2).setOrigin(0.5, 0.5)
    this.currentPants.depth = -0.8
    this.currentShoes = this.add.image(350, 199, 'shoes', 0).setOrigin(0.5, 0.5)


    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) =>
        {

          console.log('scrolling')
            man.tilePositionX += deltaX * 0.5;
            man.tilePositionY += deltaY * 0.5;

        });
  

  }
  update() {
    

  }

  /* VVV Put any other functions and code down here VVV */

}

// Create the game
window.game = new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#a201bb', // The background color (grey)
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

