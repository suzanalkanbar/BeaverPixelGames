// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {

    this.load.spritesheet('walking', 
      'j-pikmin_Mario/assets/pikmin-walk-sheet.png',
      {frameWidth: 64, frameHeigth: 66})
  }

  create() {

    this.pikmin = this.physics.add.sprite(200, 200, 'walking')

    this.anims.create({
      key: 'walkRigth',
      frames: this.anims.generateFrameNumbers('walking', { start: 1, end: 2}),
      framerate: 4,
      repeat: -1
    })

    this.pikmin.play('walkRight')

  }
  update() {

  }

  /* VVV Put any other functions and code down here VVV */

}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#5dba2f', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

