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
    this.load.spritesheet('nectarEgg', 
      'j-pikmin_Mario/assets/nectar egg.png',
      {frameWidth: 19, frameHeight: 27}
    )

    this.load.audio('cry', 'j-pikmin_Mario/assets/cry.mp3')
    this.load.audio('slurp', 'j-pikmin_Mario/assets/slurp.m4a')
    this.load.audio('jump', 'j-pikmin_Mario/assets/jump.mp3')
    this.load.audio('forest of hope', 'j-pikmin_Mario/assets/The Forest of Hope.mp3')
    this.load.audio('distant spring', 'j-pikmin_Mario/assets/The Distant Spring.mp3')
    this.load.audio('forest navel', 'j-pikmin_Mario/assets/The Forest Navel.mp3')
    this.load.audio('hit', 'j-pikmin_Mario/assets/hit.mp3')
  }

  create() {

    this.sound.play('forest of hope', {loop: true})

    this.delay = 0;
    this.flowered = false;
    this.invincible = false;

    this.arrow = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.anims.create({
        key: 'splash',
        frames: this.anims.generateFrameNumbers('nectar', { frames: [0, 1, 2] }),
        frameRate: 8,
    });

    this.anims.create({
        key: 'crack',
        frames: this.anims.generateFrameNumbers('nectarEgg', { frames: [0, 1, 2, 3] }),
        frameRate: 4,
    });

    this.backgroundX = -350
    this.background = this.add.image(this.backgroundX, 200, 'background')
    this.background.depth = -1
    for(let i = 0; i < 10; i++){
      this.backgroundX += 700
      this.background = this.add.image(this.backgroundX, 200, 'background')
      this.background.depth = -1
    }
    

    this.player = this.physics.add.sprite(200, 200, 'walking', 0);
    this.player.body.setSize(26, 66)
    this.player.body.setGravityY(300);
    this.cameras.main.scrollX = this.player.x - 350

    this.redOnion = this.add.image(1500, 315, 'onion', 0)

    this.bulborb = this.physics.add.group()
    this.bulborb = this.physics.add.sprite(600, 328, 'bulborb', 0).setScale(1.2)

    this.egg = this.physics.add.group()
    this.egg = this.physics.add.sprite(100, 333, 'nectarEgg', 0).setImmovable(true)
    this.egg.depth = 0.1

    

    this.grass = this.physics.add.staticGroup()

    this.grassX = 15
    this.grassY = 360
    this.spritelength = 30 - 3

    for(let i; i< 2; i++){
      this.grass.create(this.grassX - this.spritelength, this.grassY + this.spritelength, 'grass', 50)
      // this.grassY += this.spritelength
    }

    this.grassY = 360
    for(let i = 0; i < 13; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'grass', 50)
      this.grassX += this.spritelength
    }

    this.grassX += this.spritelength * 3

    for(let i = 0; i < 50; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'grass', 50)
      this.grassX += this.spritelength
    }

    this.physics.add.collider(this.player, this.grass)
    this.physics.add.collider(this.player, this.egg, ()=>{
      this.egg.play('crack')
      this.physics.world.colliders.getActive().find(function(i){ return i.name == 'eggcrack'; }).destroy();
      this.crackTimer = this.time.addEvent({
          delay: 1000,
          callback: ()=>{
            this.egg.destroy() 
            this.nectar = this.physics.add.sprite(100 ,343, 'nectar', 0)
            this.nectar.play('splash')
            this.nectar.sound = this.sound.add('slurp', {volume: 5})
          },
          loop: false
        })
    }).name = 'eggcrack'
  }

  update() {

  if(this.spacebar.isDown){
    console.log(this.player.x)
  }

  if(!this.flowered){
    if (this.arrow.right.isDown) {
      this.player.setVelocityX(160);  
      this.cameras.main.scrollX = this.player.x - 350
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
      this.cameras.main.scrollX = this.player.x - 350
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
  }else if(this.flowered){
    if (this.arrow.right.isDown) {
      this.player.setVelocityX(160);
      this.cameras.main.scrollX = this.player.x - 350
       if(this.delay < 15){
        this.player.setFrame(6);
      }else if(this.delay < 30){
        this.player.setFrame(7);
      }else {
        this.delay = 0
      }
      if(this.player.body.touching.down){
        this.delay++
      }
     
    }else if (this.arrow.left.isDown) {
      this.player.setVelocityX(-160);   
      this.cameras.main.scrollX = this.player.x - 350
      if(this.delay < 15){
        this.player.setFrame(8);
      }else if(this.delay < 30){
        this.player.setFrame(9);
      }else {
        this.delay = 0
      }
      if(this.player.body.touching.down){
        this.delay++
      }
    }else {
      this.player.setVelocityX(0);
      this.player.setFrame(5);
    }

    if (this.arrow.up.isDown && this.player.body.touching.down) {
      this.sound.play('jump')
      this.delay = 0
      this.player.setVelocityY(-200);
    }
  }

    if(this.player.y >= 400){
      this.death()
    }

    if (this.physics.overlap(this.player, this.nectar)) {
        this.powerUp();
      }

    if(!this.flowered && !this.invincible){ 
      if(this.physics.overlap(this.player, this.bulborb)){
        this.death()
      }
    }else if(this.flowered){
      if(this.physics.overlap(this.player, this.bulborb)){
        this.sound.play('hit')
        this.invincible = true
        this.flowered = false
        this.invincTimer = this.time.addEvent({
          delay: 1500,
          callback: ()=>{
            this.invincible = false      
          },
          loop: false
        })
      }
      
    }

  }

  /* VVV Put any other functions and code down here VVV */

  powerUp(){
    this.flowered = true;
    this.nectar.sound.play()
    this.nectar.destroy()
  }

  death(){
    this.flowered = false;
    this.player.x = 200
    this.cameras.main.scrollX = this.player.x - 350
    this.player.y = 200
    this.sound.play('cry')
  }

}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#e4a426', // The background color
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade'
    // arcade: { debug: true }
  }, // The physics engine to use
  parent: 'pikmin platformer', // Create the game inside the <div id="game"> 
});

