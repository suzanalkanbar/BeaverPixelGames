// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {

    this.load.spritesheet('walking', 
      'j-pikmin_Mario/assets/pikmin-walk-sheet.png',
      {frameWidth: 64, frameHeigth: 66})

      this.load.spritesheet('grass', 'j-pikmin_Mario/assets/grass-spritesheet.png',
        {frameWidth: 30, frameHeigth: 30}
      )
  }

  create() {

    this.arrow = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'walkRigth',
      frames: this.anims.generateFrameNumbers('walking', {start: 1, end: 2}),
      frameRate: 4,
      repeat: -1
    });

    this.player = this.physics.add.sprite(200, 200, 'walking', 0);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(300);

    this.grass = this.physics.add.staticGroup()

    this.grassX = 15
    this.spritelength = 30 - 3
    this.onStart

    for(let i = 0; i < 26; i++){
      this.grass.create(this.grassX, 385, 'grass', 13)
      this.grassX += this.spritelength
    }

    this.physics.add.collider(this.player, this.grass)

  }
  update() {

    if (this.arrow.right.isDown) {
      this.player.setVelocityX(160);
      this.player.setFrame(1);
      // this.player.play('walkRight', true);
    }else if (this.arrow.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.setFrame(3);
    }else {
      this.player.setVelocityX(0);
      this.player.setFrame(0);
    }

    if (this.arrow.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-200);
    }

  }

  /* VVV Put any other functions and code down here VVV */

}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#5dba2f', // The background color
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

