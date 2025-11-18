// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {

    this.load.spritesheet('walking', 
      'j-pikmin_Mario/assets/pikmin-walk-sheet.png',
      {frameWidth: 66, frameHeigth: 66})

      this.load.spritesheet('grass', 'j-pikmin_Mario/assets/grass-spritesheet.png',
        {frameWidth: 30, frameHeigth: 30}
      )
  }

  create() {

    this.delay = 0

    this.arrow = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'walkRigth',
      frames: this.anims.generateFrameNumbers('walking', {start: 1, end: 2}),
      frameRate: 4,
      repeat: -1
    });

    this.player = this.physics.add.sprite(200, 200, 'walking', 0);
    this.player.body.setSize(26, 66)
    this.player.body.setGravityY(300);

    this.grass = this.physics.add.staticGroup()

    this.grassX = 15
    this.grassY = 360
    this.spritelength = 30 - 3
    this.onStart

    for(let i = 0; i < 13; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + 27, 'grass', 50)
      this.grassX += this.spritelength
    }

    this.grassX += this.spritelength * 2

    for(let i = 0; i < 13; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + 27, 'grass', 50)
      this.grassX += this.spritelength
    }

    this.physics.add.collider(this.player, this.grass)


  }
  update() {

    if (this.arrow.right.isDown) {
      this.player.setVelocityX(160);
      if(this.delay < 15){
        this.player.setFrame(1);
      }else if(this.delay < 30){
        this.player.setFrame(2);
      }else {
        this.delay = 0
      }
      if(this.player.body.touching.down){
        this.delay++
      }
    }else if (this.arrow.left.isDown) {
      this.player.setVelocityX(-160);   
      if(this.delay < 15){
        this.player.setFrame(3);
      }else if(this.delay < 30){
        this.player.setFrame(4);
      }else {
        this.delay = 0
      }
      if(this.player.body.touching.down){
        this.delay++
      }
    }else {
      this.player.setVelocityX(0);
      this.player.setFrame(0);
    }

    if (this.arrow.up.isDown && this.player.body.touching.down) {
      this.delay = 0
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

