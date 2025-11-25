// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {

    this.load.image('background', 'j-pikmin_Mario/assets/landscape.png')

    this.load.spritesheet('walking', 
      'j-pikmin_Mario/assets/pikmin-walk-sheet.png',
      {frameWidth: 66, frameHeight: 66})
    this.load.spritesheet('grass', 
      'j-pikmin_Mario/assets/grass-spritesheet.png',
      {frameWidth: 30, frameHeight: 30}
    )
    this.load.spritesheet('nectar',
      'j-pikmin_Mario/assets/nectar.png',
      {frameWidth: 26, frameHeight: 7}
    )
    this.load.spritesheet('bulborb', 
      'j-pikmin_Mario/assets/bulborb.png',
      {frameWidth: 31, frameHeight: 28}
    )
    this.load.spritesheet('onion', 
      'j-pikmin_Mario/assets/onion.png',
      {frameWidth: 63, frameHeight: 61}
    )

    this.load.audio('cry', 'j-pikmin_Mario/assets/cry.mp3')
    this.load.audio('slurp', 'j-pikmin_Mario/assets/slurp.m4a')
    this.load.audio('jump', 'j-pikmin_Mario/assets/jump.mp3')
    this.load.audio('background', 'j-pikmin_Mario/assets/ogg_beachtheme.ogg')
  }

  create() {

    this.sound.play('background', {loop: true})

    this.delay = 0

    this.arrow = this.input.keyboard.createCursorKeys();

    this.anims.create({
        key: 'splash',
        frames: this.anims.generateFrameNumbers('nectar', { frames: [0, 1, 2] }),
        frameRate: 8,
    });

    this.background = this.add.image(350, 200, 'background')
    this.background.depth = -1

    this.player = this.physics.add.sprite(200, 200, 'walking', 0);
    this.player.body.setSize(26, 66)
    this.player.body.setGravityY(300);

    this.redOnion = this.add.image(650, 315, 'onion', 0)

    this.bulborb= this.physics.add.group()
    this.bulborb.create(600, 328, 'bulborb', 0).setScale(1.2)

    this.nectar = this.physics.add.sprite(500 ,343, 'nectar', 0)
    this.nectar.play('splash')
    this.nectar.sound = this.sound.add('slurp', {volume: 5})

    this.grass = this.physics.add.staticGroup()

    this.grassX = 15
    this.grassY = 360
    this.spritelength = 30 - 3

    for(let i = 0; i < 13; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + 27, 'grass', 50)
      this.grassX += this.spritelength
    }

    this.grassX += this.spritelength * 3

    for(let i = 0; i < 10; i++){
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
      this.sound.play('jump')
      this.delay = 0
      this.player.setVelocityY(-200);
    }

    if(this.player.y >= 400){
      this.player.x = 200
      this.player.y = 200
      this.nectar.destroy()
      this.nectar = this.physics.add.sprite(500 ,343, 'nectar', 0)
      this.nectar.sound = this.sound.add('slurp', {volume: 5})
      this.nectar.play('splash')
      this.sound.play('cry')
    }

    if (this.physics.overlap(this.player, this.nectar)) {
        this.powerUp();
      }

    if(this.physics.overlap(this.player, this.bulborb)){
      this.player.x = 200
      this.player.y = 200
      this.sound.play('cry')
    }

  }

  /* VVV Put any other functions and code down here VVV */

  powerUp(){
    this.nectar.sound.play()
    this.nectar.destroy()
  }

}

// Create the game
window.activePhaserGame = new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#e4a426', // The background color
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade'}, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});


window.restartActiveGame = function () {
  if (window.game && window.game.scene.scenes[0]) {
      window.game.scene.scenes[0].scene.restart();
      gameover = false;
  }
};