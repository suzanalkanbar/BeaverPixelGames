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
    this.load.spritesheet('buttons', 'j-dress-up/assets/unclothe.png',
      {frameWidth: 32, frameHeight: 33}
    )
    
  }

  create() {
    this.room = this.add.image(350, 200, 'room').setOrigin(0.5, 0.5)
    this.room.depth = -10

    this.noHat = this.add.image(200, 380, 'buttons', 2).setOrigin(0.5, 0.5).setInteractive()
    this.noHat.depth = 5
    this.noHat.on('pointerdown', () =>{
      this.currentHat.destroy()
    })

    this.noPants = this.add.image(460, 380, 'buttons', 0).setOrigin(0.5, 0.5).setInteractive()
    this.noPants.depth = 5
    this.noPants.on('pointerdown', () =>{
      this.currentPants.destroy()
    })

    this.noShirt = this.add.image(240, 380, 'buttons', 1).setOrigin(0.5, 0.5).setInteractive()
    this.noShirt.depth = 5
    this.noShirt.on('pointerdown', () =>{
      this.currentShirt.destroy()
    })

    this.noShoes = this.add.image(500, 380, 'buttons', 3).setOrigin(0.5, 0.5).setInteractive()
    this.noShoes.depth = 5
    this.noShoes.on('pointerdown', () =>{
      this.currentShoes.destroy()
    })

    this.switchToWoman = this.add.image(350, 380, 'buttons', 5).setOrigin(0.5, 0.5).setInteractive().setScale(1.5)
    this.switchToWoman.depth = 5
    this.switchToWoman.on('pointerdown', () =>{
      this.man.visible = false
      this.woman.visible = true
      this.switchToMan.visible = true
      this.switchToWoman.visible = false
    })

    this.switchToMan = this.add.image(350, 380, 'buttons', 6).setOrigin(0.5, 0.5).setInteractive().setScale(1.5)
    this.switchToMan.depth = 5
    this.switchToMan.visible = false
    this.switchToMan.on('pointerdown', () =>{
      this.man.visible = true
      this.woman.visible = false
      this.switchToWoman.visible = true
      this.switchToMan.visible = false
    })

    //left side//
    this.manClothes = this.add.rectangle(75, 200, 200, 400, 0x006be3).setInteractive()
    this.manClothes.depth = -10

    this.hat2 = this.add.image(80, 25, 'hats', 1).setOrigin(0.5, 0.5).setInteractive()
    this.hat2.input.hitArea.setTo(50, 0, 200, 70)
    this.hat2.on('pointerdown', () => {
      this.hatOn(1)
      this.currentHat.depth = 1
    })

    this.hat3 = this.add.image(80, 90, 'hats', 2).setOrigin(0.5, 0.5).setInteractive()
    this.hat3.input.hitArea.setTo(50, 0, 200, 70)
    this.hat3.on('pointerdown', () => {
      this.hatOn(2)
      this.currentHat.depth = 1
    })

    this.hat5 = this.add.image(80, 140, 'hats', 4).setOrigin(0.5, 0.5).setInteractive()
    this.hat5.input.hitArea.setTo(50, 0, 200, 500)
    this.hat5.on('pointerdown', () => {
      this.hatOn(4)
      this.currentHat.depth = 1
    })

    this.shirt1 = this.add.image(80, 270, 'shirts', 0).setOrigin(0.5, 0.5).setInteractive()
    this.shirt1.input.hitArea.setTo(20, 100, 200, 120)
    this.shirt1.on('pointerdown', () => {
      this.shirtOn(0)
    })

    this.shirt3 = this.add.image(80, 390, 'shirts', 2).setOrigin(0.5, 0.5).setInteractive()
    this.shirt3.input.hitArea.setTo(20, 100, 200, 120)
    this.shirt3.on('pointerdown', () => {
      this.shirtOn(2)
    })

    this.shirt5 = this.add.image(80, 510, 'shirts', 4).setOrigin(0.5, 0.5).setInteractive()
    this.shirt5.input.hitArea.setTo(20, 100, 200, 120)
    this.shirt5.on('pointerdown', () => {
      this.shirtOn(4)
    })

    this.shirt6 = this.add.image(80, 630, 'shirts', 5).setOrigin(0.5, 0.5).setInteractive()
    this.shirt6.input.hitArea.setTo(20, 100, 200, 120)
    this.shirt6.on('pointerdown', () => {
      this.shirtOn(5)
    })

    this.pants1 = this.add.image(80, 650, 'pants', 0).setOrigin(0.5, 0.5).setInteractive()
    this.pants1.input.hitArea.setTo(20, 210, 200, 120)
    this.pants1.on('pointerdown', () => {
      this.pantsOn(0)
    })
    
    //right side//
    this.womanClothes = this.add.rectangle(625, 200, 200, 400, 0xff1afa)
    this.womanClothes.depth = -10

    this.hat1 = this.add.image(620, 25, 'hats', 0).setOrigin(0.5, 0.5).setInteractive()
    this.hat1.input.hitArea.setTo(50, 0, 200, 70)
    this.hat1.on('pointerdown', () => {
      this.hatOn(0)
      this.currentHat.depth = 1
    })

    this.hat4 = this.add.image(620, 60, 'hats', 3).setOrigin(0.5, 0.5).setInteractive()
    this.hat4.input.hitArea.setTo(50, 20, 200, 500)
    this.hat4.on('pointerdown', () => {
      this.hatOn(3)
      this.currentHat.depth = 1
    })

    this.hat6 = this.add.image(620, 120, 'hats', 5).setOrigin(0.5, 0.5).setInteractive()
    this.hat6.input.hitArea.setTo(50, 20, 200, 500)
    this.hat6.on('pointerdown', () => {
      this.hatOn(5)
      this.currentHat.depth = 1
    })

    this.shirt2 = this.add.image(620, 240, 'shirts', 1).setOrigin(0.5, 0.5).setInteractive()
    this.shirt2.input.hitArea.setTo(70, 100, 200, 180)
    this.shirt2.on('pointerdown', () => {
      this.shirtOn(1)
      this.currentShirt.depth = 1
    })

    this.shirt4 = this.add.image(620, 430, 'shirts', 3).setOrigin(0.5, 0.5).setInteractive()
    this.shirt4.input.hitArea.setTo(70, 100, 200, 170)
    this.shirt4.on('pointerdown', () => {
      this.shirtOn(3)
      this.currentShirt.depth = 1
    })
    //end clothes//
    
    this.man = this.add.image(350, 200, 'man').setOrigin(0.5, 0.5)
    this.man.depth = -1
    this.woman = this.add.image(350, 200, 'woman').setOrigin(0.5, 0.5)
    this.woman.depth = -1
    this.woman.visible = false

    this.currentHat = this.add.image(350, 32, 'hats', 2).setOrigin(0.5, 0.5)
    this.currentShirt = this.add.image(350, 200, 'shirts', 2).setOrigin(0.5, 0.5)
    this.currentShirt.depth = -0.9
    this.currentPants = this.add.image(350, 200, 'pants', 2).setOrigin(0.5, 0.5)
    this.currentPants.depth = -0.8
    this.currentShoes = this.add.image(350, 199, 'shoes', 2).setOrigin(0.5, 0.5)

    this.arrow = this.input.keyboard.createCursorKeys()
    this.clothesSpeed = 2
  
  }
  update() {

    if(this.arrow.down.isDown){
      this.hat1.y -= this.clothesSpeed
      this.hat2.y -= this.clothesSpeed
      this.hat3.y -= this.clothesSpeed
      this.hat4.y -= this.clothesSpeed
      this.hat5.y -= this.clothesSpeed
      this.hat6.y -= this.clothesSpeed

      this.shirt1.y -= this.clothesSpeed
      this.shirt2.y -= this.clothesSpeed
      this.shirt3.y -= this.clothesSpeed
      this.shirt4.y -= this.clothesSpeed
      this.shirt5.y -= this.clothesSpeed
      this.shirt6.y -= this.clothesSpeed

      this.pants1.y -= this.clothesSpeed
    }else if(this.arrow.up.isDown && this.hat1.y < 25){
      this.hat1.y += this.clothesSpeed
      this.hat2.y += this.clothesSpeed
      this.hat3.y += this.clothesSpeed
      this.hat4.y += this.clothesSpeed
      this.hat5.y += this.clothesSpeed
      this.hat6.y += this.clothesSpeed

      this.shirt1.y += this.clothesSpeed
      this.shirt2.y += this.clothesSpeed
      this.shirt3.y += this.clothesSpeed
      this.shirt4.y += this.clothesSpeed
      this.shirt5.y += this.clothesSpeed
      this.shirt6.y += this.clothesSpeed

      this.pants1.y += this.clothesSpeed
    }
    

  }

  /* VVV Put any other functions and code down here VVV */

  hatOn(index){
    this.currentHat.destroy()
    this.currentHat = this.add.image(350, 32, 'hats', index).setOrigin(0.5, 0.5)
  }

  shirtOn(index){
    this.currentShirt.destroy()
    this.currentShirt = this.add.image(350, 200, 'shirts', index).setOrigin(0.5, 0.5)
    this.currentShirt.depth = -0.9
  }

  pantsOn(index){
    this.currentPants.destroy()
    this.currentPants = this.add.image(350, 200, 'pants', index).setOrigin(0.5, 0.5)
    this.currentPants.depth = -0.8
  }

  shoesOn(index){
    this.currentShoes.destroy()
    this.currentShoes = this.add.image(350, 200, 'shoes', index).setOrigin(0.5, 0.5)
  }

}

// Create the game
window.game = new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#a201bb', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade',
    arcade: { debug: true }
  }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

window.restartActiveGame = function () {
  if (window.game && window.game.scene.scenes[0]) {
    window.game.scene.scenes[0].scene.restart();
    gameover = false;
  }
};

