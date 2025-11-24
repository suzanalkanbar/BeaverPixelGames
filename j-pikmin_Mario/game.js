// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {

    this.load.image('background', 'j-pikmin_Mario/assets/landscape.png')
    this.load.image('easterEgg', 'j-pikmin_Mario/assets/my_avatar-1.png.png')

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
    this.load.audio('bulborb death', 'j-pikmin_Mario/assets/bulborb-death.mp3')
    this.load.audio('victory', 'j-pikmin_Mario/assets/end of level.mp3')
  }

  create() {

    this.backgroundMusic = this.sound.add('forest of hope')
    this.backgroundMusic.play({loop: true})

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
        frameRate: 6,
    });

    this.anims.create({
      key: 'bulbdeath',
      frames: this.anims.generateFrameNumbers('bulborb', { frames: [5, 6] }),
      frameRate: 10,
    })

    this.anims.create({
      key: 'bulbwalkclosed',
      frames: this.anims.generateFrameNumbers('bulborb', { frames: [2, 3] }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'bulbwalkopen',
      frames: this.anims.generateFrameNumbers('bulborb', { frames: [4, 5] }),
      frameRate: 10,
      repeat: -1
    })

    this.backgroundX = -350
    this.background = this.add.image(this.backgroundX, 200, 'background')
    this.background.depth = -1
    for(let i = 0; i < 10; i++){
      this.backgroundX += 700
      this.background = this.add.image(this.backgroundX, 200, 'background')
      this.background.depth = -1
    }
    

    this.player = this.physics.add.sprite(200, 310, 'walking', 0);
    this.player.body.setSize(26, 66)
    this.player.body.setGravityY(300);
    this.cameras.main.scrollX = this.player.x - 350

    this.redOnion = this.physics.add.sprite(1500, 315, 'onion', 0).setImmovable(true)

    this.bulborb = this.physics.add.group()
    this.bulborb = this.physics.add.sprite(600, 328, 'bulborb', 0).setScale(1.2).setImmovable(true)


    this.egg = this.physics.add.group()
    this.egg = this.physics.add.sprite(100, 333, 'nectarEgg', 0).setImmovable(true)
    this.egg.depth = 0.1
    this.nectar = this.physics.add.sprite(-330, 390, 'easterEgg', 0).setScale(0.3)

    

    this.grass = this.physics.add.staticGroup()

    this.grassX = 15
    this.grassY = 387
    this.spritelength = 30 - 3

    for(let i = 0; i < 16; i++){
    this.grass.create(this.grassX - this.spritelength, this.grassY, 'grass', 50)
    this.grassY -= this.spritelength
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
    this.physics.add.collider(this.player, this.egg,).name = 'eggcrack'

    this.physics.add.collider(this.player, this.bulborb).name = 'bulborbhitbox'

    this.physics.add.collider(this.player, this.redOnion, ()=>{
      this.backgroundMusic.stop()
      this.sound.play('victory')
      this.physics.world.colliders.getActive().find(function(i){ return i.name == 'victory'; }).destroy();
    }).name = 'victory'
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


      if(this.player.body.touching.down && this.bulborb.body.touching.up){
        this.physics.world.colliders.getActive().find(function(i){ return i.name == 'bulborbhitbox'; }).destroy();
        this.bulborb.play('bulbdeath')
        this.sound.play('bulborb death')
        this.player.setVelocityY(-100)
        this.delayTimer = this.time.addEvent({
          delay: 500,
          callback: ()=>{
            this.bulborb.visible = false  
          },
          loop: false
        })
      }

      if(this.player.body.touching.down && (this.bulborb.body.touching.left || this.bulborb.body.touching.right)){
        if(!this.flowered && !this.invincible){  
            this.death() 
        }else if(this.flowered){
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
 

    if(this.player.body.touching.down && this.egg.body.touching.up){
      this.player.setVelocityY(-150)
      this.egg.play('crack')
      this.physics.world.colliders.getActive().find(function(i){ return i.name == 'eggcrack'; }).destroy();
      this.crackTimer = this.time.addEvent({
          delay: 1000,
          callback: ()=>{
            this.egg.visible = false 
            this.nectar = this.physics.add.sprite(100 ,343, 'nectar', 0)
            this.nectar.play('splash')
            this.nectar.sound = this.sound.add('slurp', {volume: 5})
          },
          loop: false
        })
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
    this.nectar.destroy()
    this.egg.setFrame(0)
    this.egg.visible = true
    this.bulborb.setFrame(0)
    this.bulborb.visible = true
    this.physics.add.collider(this.player, this.egg,).name = 'eggcrack'
    this.physics.add.collider(this.player, this.bulborb).name = 'bulborbhitbox'
    this.player.x = 200
    this.cameras.main.scrollX = this.player.x - 350
    this.player.y = 310
    this.sound.play('cry')
  }

}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#e4a426', // The background color
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade',
    arcade: { debug: true }
  }, // The physics engine to use
  parent: 'pikmin platformer', // Create the game inside the <div id="game"> 
});

