class mainScene {

  preload() {

    this.load.image('background', 'j-pikmin_Mario/assets/landscape.png')
    this.load.image('easterEgg', 'j-pikmin_Mario/assets/my_avatar-1.png.png')
    this.load.image('bench', 'j-pikmin_Mario/assets/bench.png')
    this.load.image('next', 'j-pikmin_Mario/assets/next.png')
    this.load.image('sky', 'j-pikmin_Mario/assets/sky.png')
    this.load.image('underwater', 'j-pikmin_Mario/assets/underwater.png')
    this.load.image('fish', 'j-pikmin_Mario/assets/fish.png')

    this.load.spritesheet('walking', 
      'j-pikmin_Mario/assets/pikmin.png',
      {frameWidth: 66, frameHeight: 66}
    )

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

    this.load.spritesheet('skyground', 
      'j-pikmin_Mario/assets/skyground.png',
      {frameWidth: 30, frameHeight: 30}
    )

    this.load.spritesheet('sand', 
      'j-pikmin_Mario/assets/sand.png',
      {frameWidth: 30, frameHeight: 30}
    )

    this.load.spritesheet('autumn', 
      'j-pikmin_Mario/assets/autumn.png',
      {frameWidth: 30, frameHeight: 30}
    )

    this.load.spritesheet('boss', 
      'j-pikmin_Mario/assets/big boss.png',
      {frameWidth: 124, frameHeight: 112}
    )

    this.load.spritesheet('ship', 
      'j-pikmin_Mario/assets/ss dolphin.png',
      {frameWidth: 32, frameHeight: 50}
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
    this.load.audio('boss hit', 'j-pikmin_Mario/assets/boss hit.wav')
    this.load.audio('boss defeated', 'j-pikmin_Mario/assets/boss defeated.mp3')
    this.load.audio('beat the game', 'j-pikmin_Mario/assets/victory.mp3')
    this.load.audio('boss music', 'j-pikmin_Mario/assets/boss music.mp3')
  }

  create() {
    this.style = {font: '50px Arial', fill: '#e4a426' };
    this.levelCompleteText = this.add.text(1300, 100, 'Level Complete', this.style);
    this.levelCompleteText.depth = 1;
    this.levelCompleteText.visible = false

    // music //

    this.backgroundMusic = this.sound.add('forest of hope')
    this.backgroundMusic.play({loop: true})

    // variables //

    this.once = 0
    this.delay = 0;
    this.flowered = false;
    this.invincible = false;
    this.levelComplete = false;
    this.level = 1;
    this.bossAlive = true
    this.bossHP = 3

    // next level //

    this.nextLevelButton = this.add.image(0, 300, 'next').setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
      this.level += 1
      this.flowered = false
      this.player.visible = true
      if(this.level == 2){
        this.redOnion.destroy()
        this.player.x = 3750
        this.backgroundMusic = this.sound.add('forest of hope')
        this.backgroundMusic.play({loop: true})
      }else if(this.level == 3){
        this.player.x = 10400
        this.player.y = 330
        this.backgroundMusic = this.sound.add('forest navel')
        this.backgroundMusic.play({loop: true})
        this.fish1.setVelocityX(-30)
        this.fish2.setVelocityX(-30)
        this.fish3.setVelocityX(-30)
        this.fish4.setVelocityX(-30)
        this.fish5.setVelocityX(-30)
        this.fish6.setVelocityX(-30)
        this.fish7.setVelocityX(-30)
        this.fish8.setVelocityX(-30)
        this.fish9.setVelocityX(-30)
        this.fish10.setVelocityX(-30)
        this.fish11.setVelocityX(-30)
        this.fish12.setVelocityX(-30)
        this.fish13.setVelocityX(-30)
        this.fish14.setVelocityX(-30)
        this.fish15.setVelocityX(-30)
        this.fish16.setVelocityX(-30)
        this.fish17.setVelocityX(-30)
        this.fish18.setVelocityX(-30)
        this.fish19.setVelocityX(-30)
        this.fish20.setVelocityX(-30)
        this.fish21.setVelocityX(-30)
        this.fish22.setVelocityX(-30)
        this.fish23.setVelocityX(-30)
      }else if(this.level == 4){
        this.player.x = 15500
        this.player.y = 315
        this.egg.x = 15659
        this.egg.y = 332
        this.egg.setFrame(0)
        this.egg.visible = true
        this.egg.enableBody()
      }
      this.cameras.main.scrollX = this.player.x - 350
      this.levelCompleteText.setText('')
      this.levelComplete = false
    })
    this.nextLevelButton.depth = 10
    this.nextLevelButton.visible = false

    // key inputs //

    this.arrow = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    // animations //

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
      frames: this.anims.generateFrameNumbers('bulborb', { frames: [1, 2] }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'bulbwalkopen',
      frames: this.anims.generateFrameNumbers('bulborb', { frames: [3, 4] }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'bosswalkclosed',
      frames: this.anims.generateFrameNumbers('boss', { frames: [1, 2] }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'bosswalkopen',
      frames: this.anims.generateFrameNumbers('boss', { frames: [3, 4] }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'bosshurt',
      frames: this.anims.generateFrameNumbers('boss', { frames: [7, 7] }),
      frameRate: 10,
    })

    this.anims.create({
      key: 'bossdeath',
      frames: this.anims.generateFrameNumbers('boss', { frames: [5, 6] }),
      frameRate: 10,
    })

    // background //

    this.backgroundX = -350
    this.background = this.add.image(this.backgroundX, 200, 'background')
    this.background.depth = -1
    for(let i = 0; i < 7; i++){
      this.backgroundX += 700
      this.background = this.add.image(this.backgroundX, 200, 'background')
      this.background.depth = -1
    }

    for(let i = 0; i < 7; i++){
      this.backgroundX += 700
      this.background = this.add.image(this.backgroundX, 200, 'sky')
      this.background.depth = -1
    }

    for(let i = 0; i < 7; i++){
      this.backgroundX += 700
      this.background = this.add.image(this.backgroundX, 200, 'underwater').setScale(2)
      this.background.depth = -1
    }

    for(let i = 0; i < 7; i++){
      this.backgroundX += 700
      this.background = this.add.image(this.backgroundX, 200, 'background')
      this.background.depth = -1
    }

    // player //
    this.player = this.physics.add.sprite(200, 310, 'walking', 0);
    this.player.body.setSize(26, 66)
    this.player.body.setGravityY(300);
    this.cameras.main.scrollX = this.player.x - 350

    //onions //

    this.redOnion = this.physics.add.sprite(3180, 315, 'onion', 0).setImmovable(true)

    this.yellowOnion = this.physics.add.sprite(9177, 345, 'onion', 1).setImmovable(true)

    this.blueOnion = this.physics.add.sprite(14105, 335, 'onion', 2).setImmovable(true)

    this.ship = this.physics.add.sprite(16756, -70, 'ship', 0).setScale(1.5)

    // enemy's //
    // level 1 //

    this.bulborb = this.physics.add.group()
    this.bulborb = this.physics.add.sprite(600, 328, 'bulborb', 0).setScale(1.2).setImmovable(true)

    this.bulborb2 = this.physics.add.sprite(2014, 328, 'bulborb', 0).setScale(1.2).setImmovable(true)

    // level 3 //

    // need to add to overlap, next level button and death
    this.fish1 = this.physics.add.sprite(11100, 240, 'fish').setImmovable(true)
    this.fish1X = this.fish1.x

    this.fish2 = this.physics.add.sprite(11800, 60, 'fish').setImmovable(true)
    this.fish2X = this.fish2.x
    this.fish3 = this.physics.add.sprite(11800, 120, 'fish').setImmovable(true)
    this.fish3X = this.fish3.x
    this.fish4 = this.physics.add.sprite(11800, 180, 'fish').setImmovable(true)
    this.fish4X = this.fish4.x

    this.fish5 = this.physics.add.sprite(12000, 380, 'fish').setImmovable(true)
    this.fish5X = this.fish5.x
    this.fish6 = this.physics.add.sprite(12000, 320, 'fish').setImmovable(true)
    this.fish6X = this.fish6.x
    this.fish7 = this.physics.add.sprite(12000, 260, 'fish').setImmovable(true)
    this.fish7X = this.fish7.x

    this.fish8 = this.physics.add.sprite(12550, 380, 'fish').setImmovable(true)
    this.fish8X = this.fish8.x
    this.fish9 = this.physics.add.sprite(12550, 320, 'fish').setImmovable(true)
    this.fish9X = this.fish9.x
    this.fish10 = this.physics.add.sprite(12550, 120, 'fish').setImmovable(true)
    this.fish10X = this.fish10.x
    this.fish11 = this.physics.add.sprite(12550, 60, 'fish').setImmovable(true)
    this.fish11X = this.fish11.x

    this.fish12 = this.physics.add.sprite(12733, 230, 'fish').setImmovable(true)
    this.fish12X = this.fish12.x
    this.fish13 = this.physics.add.sprite(12733, 300, 'fish').setImmovable(true)  
    this.fish13X = this.fish13.x
    this.fish14 = this.physics.add.sprite(12733, 160, 'fish').setImmovable(true)
    this.fish14X = this.fish14.x

    this.fish15 = this.physics.add.sprite(13100, 60, 'fish').setImmovable(true)
    this.fish15X = this.fish15.x
    this.fish16 = this.physics.add.sprite(13167, 120, 'fish').setImmovable(true)
    this.fish16X = this.fish16.x
    this.fish17 = this.physics.add.sprite(13234, 180, 'fish').setImmovable(true)
    this.fish17X = this.fish17.x
    this.fish18 = this.physics.add.sprite(13301, 240, 'fish').setImmovable(true)
    this.fish18X = this.fish18.x

    this.fish19 = this.physics.add.sprite(13500, 380, 'fish').setImmovable(true)
    this.fish19X = this.fish19.x
    this.fish20 = this.physics.add.sprite(13567, 320, 'fish').setImmovable(true)
    this.fish20X = this.fish20.x
    this.fish21 = this.physics.add.sprite(13634, 260, 'fish').setImmovable(true)
    this.fish21X = this.fish21.x
    this.fish22 = this.physics.add.sprite(13701, 200, 'fish').setImmovable(true)
    this.fish22X = this.fish22.x
    this.fish23 = this.physics.add.sprite(13768, 140, 'fish').setImmovable(true)
    this.fish23X = this.fish23.x

    // level 4 //

    this.bulborb3 = this.physics.add.sprite(15750, 328, 'bulborb', 0).setScale(1.2).setImmovable(true)

    this.bulborb4 = this.physics.add.sprite(16320, 262, 'boss', 0).setScale(1.5).setImmovable(true)

    this.moveEnemyRight()

    // egg //

    this.egg = this.physics.add.group()
    this.egg = this.physics.add.sprite(100, 333, 'nectarEgg', 0).setImmovable(true)
    this.egg.depth = 0.1
    this.nectar = this.physics.add.sprite(-330, 390, 'easterEgg', 0).setScale(0.3)

    // static groups //

    this.platforms = this.physics.add.staticGroup()

    this.grass = this.physics.add.staticGroup()

    // creating the first level //

    this.grassX = 15
    this.grassY = 387
    this.spritelength = 30 - 3

    //back wall
    for(let i = 0; i < 16; i++){
    this.grass.create(this.grassX - this.spritelength, this.grassY, 'grass', 50)
    this.grassY -= this.spritelength
    }

    
    //straight
    this.grassY = 360
    for(let i = 0; i < 13; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'grass', 50)
      this.grassX += this.spritelength
    }

    //hole
    this.grassX += this.spritelength * 3

    //straight
    for(let i = 0; i < 20; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'grass', 50)
      this.grassX += this.spritelength
    }

    //stairs up
    for(let i = 0; i < 4; i++){
      this.grassY -= this.spritelength
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.amount = (400 - this.grassY) / this.spritelength
      for(let a = 0; a < this.amount; a++){
        this.grass.create(this.grassX, this.grassY + (this.spritelength * (a+1)) , 'grass', 50)
      }
      this.grassX += this.spritelength
    }

    //hole
    this.grassX += this.spritelength * 2

    //stairs down
    for(let i = 0; i < 4; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.amount = (400 - this.grassY) / this.spritelength
      for(let a = 0; a < this.amount; a++){
        this.grass.create(this.grassX, this.grassY + (this.spritelength * (a+1)) , 'grass', 50)
      }
      this.grassY += this.spritelength
      this.grassX += this.spritelength
    }

    //straight
    for(let i = 0; i < 8; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'grass', 50)
      this.grassX += this.spritelength
    }

    //bench platform
    this.bench = this.add.image(this.grassX + 120, this.grassY - 65, 'bench').setScale(1.5, 1)
    this.bench.depth = -1
    this.platform = this.add.rectangle(this.grassX + 110, this.grassY - 65, 260, 2, '#ffffff')
    this.platform.depth = -10
    this.platforms.add(this.platform)

    //hole
    this.grassX += this.spritelength * 9

    //straight
    for(let i = 0; i < 2; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'grass', 50)
      this.grassX += this.spritelength
    }

    //hole
    this.grassX += this.spritelength * 3
    this.grassY -= this.spritelength * 3

    //stairs down
    for(let i = 0; i < 3; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.amount = (400 - this.grassY) / this.spritelength
      for(let a = 0; a < this.amount; a++){
        this.grass.create(this.grassX, this.grassY + (this.spritelength * (a+1)) , 'grass', 50)
      }
      this.grassY += this.spritelength
      this.grassX += this.spritelength
    }

    //straight
    for(let i = 0; i < 7; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'grass', 50)
      this.grassX += this.spritelength
    }

    //hole
    this.grassX += this.spritelength * 2
    this.grassY -= this.spritelength * 1

    //straight
    for(let i = 0; i < 1; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'grass', 50)
      this.grassX += this.spritelength
    }

    //hole
    this.grassX += this.spritelength * 2
    this.grassY -= this.spritelength * 1

    //straight
    for(let i = 0; i < 1; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'grass', 50)
      this.grassX += this.spritelength
    }

    //hole
    this.grassX += this.spritelength * 2
    this.grassY -= this.spritelength * 1

    //straight
    for(let i = 0; i < 1; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'grass', 50)
      this.grassX += this.spritelength
    }

    //hole
    this.grassX += this.spritelength * 2
    this.grassY -= this.spritelength * 1

    //stairs down
    for(let i = 0; i < 3; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.amount = (400 - this.grassY) / this.spritelength
      for(let a = 0; a < this.amount; a++){
        this.grass.create(this.grassX, this.grassY + (this.spritelength * (a+1)) , 'grass', 50)
      }
      this.grassY += this.spritelength
      this.grassX += this.spritelength
    }

    //hole
    this.grassX += this.spritelength
    this.grassY -= this.spritelength

    //straight
    for(let i = 0; i < 1; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.amount = (400 - this.grassY) / this.spritelength
      for(let a = 0; a < this.amount; a++){
        this.grass.create(this.grassX, this.grassY + (this.spritelength * (a+1)) , 'grass', 50)
      }
      this.grassX += this.spritelength
    }

    //hole
    this.grassX += this.spritelength * 2

    //straight
    for(let i = 0; i < 1; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.amount = (400 - this.grassY) / this.spritelength
      for(let a = 0; a < this.amount; a++){
        this.grass.create(this.grassX, this.grassY + (this.spritelength * (a+1)) , 'grass', 50)
      }
      this.grassX += this.spritelength
    }

    //hole
    this.grassX += this.spritelength * 2

    //straight
    for(let i = 0; i < 1; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.amount = (400 - this.grassY) / this.spritelength
      for(let a = 0; a < this.amount; a++){
        this.grass.create(this.grassX, this.grassY + (this.spritelength * (a+1)) , 'grass', 50)
      }
      this.grassX += this.spritelength
    }

    //hole
    this.grassX += this.spritelength * 2

    //straight
    for(let i = 0; i < 1; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.amount = (400 - this.grassY) / this.spritelength
      for(let a = 0; a < this.amount; a++){
        this.grass.create(this.grassX, this.grassY + (this.spritelength * (a+1)) , 'grass', 50)
      }
      this.grassX += this.spritelength
    }

    //hole
    this.grassX += this.spritelength * 2

    //stairs down
    for(let i = 0; i < 2; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.amount = (400 - this.grassY) / this.spritelength
      for(let a = 0; a < this.amount; a++){
        this.grass.create(this.grassX, this.grassY + (this.spritelength * (a+1)) , 'grass', 50)
      }
      this.grassY += this.spritelength
      this.grassX += this.spritelength
    }

    //straight
    for(let i = 0; i < 13; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.amount = (400 - this.grassY) / this.spritelength
      for(let a = 0; a < this.amount; a++){
        this.grass.create(this.grassX, this.grassY + (this.spritelength * (a+1)) , 'grass', 50)
      }
      this.grassX += this.spritelength
    }

    // end of the first level //

    // start second level sky //

    this.grassX += this.spritelength * 14

    //back wall
    for(let i = 0; i < 16; i++){
    this.grass.create(this.grassX - this.spritelength, this.grassY, 'grass', 50)
    this.grassY -= this.spritelength
    }

    
    //straight
    this.grassY = 360
    for(let i = 0; i < 13; i++){
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'grass', 50)
      this.grassX += this.spritelength
    }

    //stairs up
    for(let i = 0; i < 15; i++){
      this.grassY -= this.spritelength
      this.grass.create(this.grassX, this.grassY, 'grass', 13)
      this.amount = (400 - this.grassY) / this.spritelength
      for(let a = 0; a < this.amount; a++){
        this.grass.create(this.grassX, this.grassY + (this.spritelength * (a+1)) , 'grass', 50)
      }
      this.grassX += this.spritelength
    }


    this.grassX = 5500
    this.grassY = 400

    //back wall
    for(let i = 0; i < 16; i++){
    this.grass.create(this.grassX - this.spritelength, this.grassY, 'skyground', 0)
    this.grassY -= this.spritelength
    }

    this.grassY = 360

    //straight
    for(let i = 0; i < 13; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    this.grassY -= 3 * this.spritelength
    //hole
    this.grassX += this.spritelength

    //straight
    for(let i = 0; i < 3; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    this.grassY -= 3 * this.spritelength
    //hole
    this.grassX += this.spritelength * 2

    //straight
    for(let i = 0; i < 2; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    //hole
    this.grassX += this.spritelength * 4

    this.grassY += this.spritelength
    //hole
    this.grassX += this.spritelength * 4

    //straight
    for(let i = 0; i < 2; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    this.grassY -= this.spritelength
    //hole
    this.grassX += this.spritelength * 5

    //straight
    for(let i = 0; i < 2; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    this.grassY += this.spritelength * 3
    //hole
    this.grassX += this.spritelength * 6

    //straight
    for(let i = 0; i < 6; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    this.grassY -= this.spritelength * 3
    //hole
    this.grassX += this.spritelength * 6

    //straight
    for(let i = 0; i < 2; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    this.grassY += this.spritelength * 2
    //hole
    this.grassX += this.spritelength * 7

    //straight
    for(let i = 0; i < 2; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    this.grassY += this.spritelength * 2
    //hole
    this.grassX += this.spritelength * 8

    //straight
    for(let i = 0; i < 7; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    this.grassY -= this.spritelength * 3 +  (this.spritelength / 2)

    //straight
    for(let i = 0; i < 2; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    this.grassY -= this.spritelength * 3 +  (this.spritelength / 2)
    this.grassX += this.spritelength

    //straight
    for(let i = 0; i < 2; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    this.grassY += this.spritelength * 5
    this.grassX += this.spritelength * 10

    //straight
    for(let i = 0; i < 3; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    this.grassY += this.spritelength 
    this.grassX += this.spritelength * 3

    //straight
    for(let i = 0; i < 2; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    this.grassY += this.spritelength * 2
    this.grassX += this.spritelength * 6

    //straight
    for(let i = 0; i < 7; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    this.grassY += this.spritelength * 2
    this.grassX += this.spritelength * 2

    //straight
    for(let i = 0; i < 20; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      // this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    //back wall
    for(let i = 0; i < 16; i++){
    this.grass.create(this.grassX - this.spritelength, this.grassY, 'skyground', 0)
    this.grassY -= this.spritelength
    }

    // end of the second level //

    // start third level under water //

    this.grassX = 10200
    this.grassY = 404

    //back wall
    for(let i = 0; i < 16; i++){
    this.grass.create(this.grassX - this.spritelength, this.grassY, 'sand', 0)
    this.grassY -= this.spritelength
    }

    this.roofX = this.grassX
    this.roofY = 10

    //roof
    for(let i = 0; i < 150; i++){
    this.grass.create(this.roofX - this.spritelength, this.roofY, 'sand', 1)
    this.roofX += this.spritelength
    }

    this.grassY = 404

    //back wall
    for(let i = 0; i < 16; i++){
    this.grass.create(this.roofX - this.spritelength, this.grassY, 'sand', 1)
    this.grassY -= this.spritelength
    }

    this.grassX += 3
    this.grassY = 380

    //straight
    for(let i = 0; i < 13; i++){
      this.grass.create(this.grassX, this.grassY, 'sand', 0)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'sand', 0)
      this.grassX += this.spritelength
    }
    this.add.image(10419, this.grassY - this.spritelength - 3, 'sand', 4)
    this.add.image(10284, this.grassY - this.spritelength - 3, 'sand', 5)

    this.grassX += this.spritelength * 7

    //rock
    this.grass.create(this.grassX, this.grassY, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength, 'sand', 1)
    this.grassY = 10
    for(let i = 0; i < 5; i++){
      this.grass.create(this.grassX, this.grassY, 'sand', 1)
      this.grassY += this.spritelength
    }

    this.grassX += this.spritelength
    this.grassY = 353


    this.grass.create(this.grassX, this.grassY, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength * 2, 'sand', 1)
    this.grassY = 10
    for(let i = 0; i < 6; i++){
      this.grass.create(this.grassX, this.grassY, 'sand', 1)
      this.grassY += this.spritelength
    }

    this.grassX += this.spritelength
    this.grassY = 353 - this.spritelength


    this.grass.create(this.grassX, this.grassY, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength * 2, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength * 3, 'sand', 1)
    this.grassY = 10
    for(let i = 0; i < 6; i++){
      this.grass.create(this.grassX, this.grassY, 'sand', 1)
      this.grassY += this.spritelength
    }

    this.grassX += this.spritelength
    this.grassY = 353 - this.spritelength


    this.grass.create(this.grassX, this.grassY, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength * 2, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength * 3, 'sand', 1)
    this.grassY = 10
    for(let i = 0; i < 5; i++){
      this.grass.create(this.grassX, this.grassY, 'sand', 1)
      this.grassY += this.spritelength
    }

    this.grassX += this.spritelength
    this.grassY = 353


    this.grass.create(this.grassX, this.grassY, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength * 2, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength * 3, 'sand', 1)
    this.grassY = 10
    for(let i = 0; i < 4; i++){
      this.grass.create(this.grassX, this.grassY, 'sand', 1)
      this.grassY += this.spritelength
    }

    this.grassX += this.spritelength
    this.grassY = 353


    this.grass.create(this.grassX, this.grassY, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength * 2, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength * 3, 'sand', 1)
    this.grassY = 10
    for(let i = 0; i < 3; i++){
      this.grass.create(this.grassX, this.grassY, 'sand', 1)
      this.grassY += this.spritelength
    }

    this.grassX += this.spritelength
    this.grassY = 353 + this.spritelength


    this.grass.create(this.grassX, this.grassY, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength * 2, 'sand', 1)
    this.grass.create(this.grassX, this.grassY + this.spritelength * 3, 'sand', 1)
    this.grassY = 10
    for(let i = 0; i < 2; i++){
      this.grass.create(this.grassX, this.grassY, 'sand', 1)
      this.grassY += this.spritelength
    }

    // coral

    this.grassY = 353
    this.grassX += this.spritelength * 6
    this.grass.create(this.grassX, this.grassY - this.spritelength, 'sand', 2)
    this.grass.create(this.grassX, this.grassY - this.spritelength * 2, 'sand', 3)    

    this.grassX += this.spritelength
    this.grassY = 380
    this.grass.create(this.grassX, this.grassY - this.spritelength, 'sand', 2)
    this.grass.create(this.grassX, this.grassY, 'sand', 2) 
    this.grass.create(this.grassX, this.grassY + this.spritelength, 'sand', 2)

    this.grassX += this.spritelength
    this.grassY = 380 - this.spritelength
    this.grass.create(this.grassX, this.grassY, 'sand', 2) 
    this.grass.create(this.grassX, this.grassY - this.spritelength * 2, 'sand', 3) 

    this.grassX += this.spritelength
    this.grass.create(this.grassX, this.grassY, 'sand', 2) 
    this.grass.create(this.grassX, this.grassY - this.spritelength, 'sand', 2)
    this.grassX += this.spritelength
    this.grass.create(this.grassX, this.grassY - this.spritelength * 2, 'sand', 3)

    this.grassY = 378
    this.grassX += this.spritelength * 5

    //straight
    for(let i = 0; i < 10; i++){
      this.grass.create(this.grassX, this.grassY, 'sand', 0)
      if(i == 3){
        this.add.image(this.grassX, this.grassY - this.spritelength - 3, 'sand', 5)
      }else if(i == 6){
        this.add.image(this.grassX, this.grassY - this.spritelength - 3, 'sand', 4)
      }
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'sand', 0)
      this.grassX += this.spritelength
    }

    // coral

    this.grassY = 353
    this.grassX += this.spritelength * 15 
    this.grass.create(this.grassX, this.grassY - this.spritelength, 'sand', 2)
    this.grass.create(this.grassX, this.grassY - this.spritelength * 2, 'sand', 3)    

    this.grassX += this.spritelength
    this.grassY = 380
    this.grass.create(this.grassX, this.grassY - this.spritelength, 'sand', 2)
    this.grass.create(this.grassX, this.grassY, 'sand', 2) 
    this.grass.create(this.grassX, this.grassY + this.spritelength, 'sand', 2)

    this.grassX += this.spritelength
    this.grassY = 380 - this.spritelength
    this.grass.create(this.grassX, this.grassY, 'sand', 2) 
    this.grass.create(this.grassX, this.grassY - this.spritelength * 2, 'sand', 3) 

    this.grassX += this.spritelength
    this.grass.create(this.grassX, this.grassY, 'sand', 2) 
    this.grass.create(this.grassX, this.grassY - this.spritelength, 'sand', 2)
    this.grassX += this.spritelength
    this.grass.create(this.grassX, this.grassY - this.spritelength * 2, 'sand', 3)

    this.grassY = 378
    this.grassX += this.spritelength * 5

    // coral

    this.grassY = 353
    this.grassX += this.spritelength * 15 
    this.grass.create(this.grassX, this.grassY - this.spritelength, 'sand', 6)
    this.grass.create(this.grassX, this.grassY - this.spritelength * 2, 'sand', 7)    

    this.grassX += this.spritelength
    this.grassY = 380
    this.grass.create(this.grassX, this.grassY - this.spritelength, 'sand', 6)
    this.grass.create(this.grassX, this.grassY, 'sand', 6) 
    this.grass.create(this.grassX, this.grassY + this.spritelength, 'sand', 6)

    this.grassX += this.spritelength
    this.grassY = 380 - this.spritelength
    this.grass.create(this.grassX, this.grassY, 'sand', 6) 
    this.grass.create(this.grassX, this.grassY - this.spritelength * 2, 'sand', 7) 

    this.grassX += this.spritelength
    this.grass.create(this.grassX, this.grassY, 'sand', 6) 
    this.grass.create(this.grassX, this.grassY - this.spritelength, 'sand', 6)
    this.grassX += this.spritelength
    this.grass.create(this.grassX, this.grassY - this.spritelength * 2, 'sand', 7)

    this.grassY = 378
    this.grassX += this.spritelength * 25

    //straight
    for(let i = 0; i < 30; i++){
      this.grass.create(this.grassX, this.grassY, 'sand', 0)
      if(i == 3){
        this.add.image(this.grassX, this.grassY - this.spritelength - 3, 'sand', 5)
      }else if(i == 6){
        this.add.image(this.grassX, this.grassY - this.spritelength - 3, 'sand', 4)
      }
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'sand', 0)
      this.grassX += this.spritelength
    }

    // end of the third level //

    // start fourth level boss fight //

    this.grassX = 15200
    this.grassY = 404

    //back wall
    for(let i = 0; i < 16; i++){
    this.grass.create(this.grassX - this.spritelength, this.grassY, 'autumn', 1)
    this.grassY -= this.spritelength
    }

    this.grass.create(16150, 310, 'autumn', 0)
    this.grass.create(16200, 260, 'autumn', 0)
    this.grass.create(16250, 220, 'autumn', 0)

    //straight
    this.grassY = 360
    for(let i = 0; i < 80; i++){
      this.grass.create(this.grassX, this.grassY, 'autumn', 0)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'autumn', 1)
      this.grassX += this.spritelength
    }

    // end of the final level //


    //colliders

    this.physics.add.collider(this.player, this.grass)
    this.physics.add.collider(this.player, this.egg,)

    this.physics.add.collider(this.player, this.bench)

    this.physics.add.collider(this.player, this.platforms)

    this.physics.add.collider(this.ship, this.grass)

    //enemy colliders
    this.physics.add.collider(this.player, this.bulborb)
    this.physics.add.collider(this.player, this.bulborb2)
    this.physics.add.collider(this.player, this.bulborb3)
    this.physics.add.collider(this.player, this.bulborb4)
    
    // onion colliders //

    // red //
    this.physics.add.collider(this.player, this.redOnion, ()=>{
      this.backgroundMusic.stop()
      this.player.setVelocityX(0)
      this.player.setFrame(0) // +10
      this.levelComplete = true
      this.sound.play('victory')
      this.levelCompleteText.x = this.player.x - 180
      this.levelCompleteText.setText('level ' + this.level + ' complete')
      this.levelCompleteText.visible = true
      this.physics.world.colliders.getActive().find(function(i){return i.name == 'onion'}).destroy();

      this.delayTimer = this.time.addEvent({
          delay: 3200,
          callback: ()=>{
            this.player.visible = false
            this.redOnion.setVelocityY(-50)
          },
          loop: false
        })

      this.nextLevel = this.time.addEvent({
            delay: 8000,
            callback: ()=>{
              this.nextLevelButton.visible = true
              this.nextLevelButton.x = this.player.x
            },
            loop: false
          })
      }).name = 'onion'

      // yellow //
      this.physics.add.collider(this.player, this.yellowOnion, ()=>{
      this.backgroundMusic.stop()
      this.player.setVelocityX(0)
      this.player.setFrame(10) // +10
      this.levelComplete = true
      this.sound.play('victory')
      this.levelCompleteText.x = this.player.x - 180
      this.levelCompleteText.setText('level ' + this.level + ' complete')
      this.levelCompleteText.visible = true
      this.physics.world.colliders.getActive().find(function(i){return i.name == 'yellowonion'}).destroy();

      this.delayTimer = this.time.addEvent({
          delay: 3200,
          callback: ()=>{
            this.player.visible = false
            this.yellowOnion.setVelocityY(-50)
          },
          loop: false
        })

      this.nextLevel = this.time.addEvent({
            delay: 8000,
            callback: ()=>{
              this.nextLevelButton.visible = true
              this.nextLevelButton.x = this.player.x
            },
            loop: false
          })
      }).name = 'yellowonion'

      // blue //
      this.physics.add.collider(this.player, this.blueOnion, ()=>{
      this.backgroundMusic.stop()
      this.player.setVelocityX(0)
      this.player.setFrame(20) // +10
      this.levelComplete = true
      this.sound.play('victory')
      this.levelCompleteText.x = this.player.x - 180
      this.levelCompleteText.setText('level ' + this.level + ' complete')
      this.levelCompleteText.visible = true
      this.physics.world.colliders.getActive().find(function(i){return i.name == 'blueonion'}).destroy();

      this.delayTimer = this.time.addEvent({
          delay: 3200,
          callback: ()=>{
            this.player.visible = false
            this.blueOnion.setVelocityY(-50)
          },
          loop: false
        })

      this.nextLevel = this.time.addEvent({
            delay: 8000,
            callback: ()=>{
              this.nextLevelButton.visible = true
              this.nextLevelButton.x = this.player.x
            },
            loop: false
          })
      }).name = 'blueonion'


      // onion colliders end // 

    
  }

  // end of create

  update() {

  if(this.spacebar.isDown){
    console.log(this.player.x)
  }

  if(!this.levelComplete){
  if(!this.flowered){
    if (this.arrow.right.isDown) {
      this.player.setVelocityX(160);  
      this.cameras.main.scrollX = this.player.x - 350
       if(this.delay < 15){
        if(this.level == 1 || this.level == 4){
          this.player.setFrame(1);
        }else if(this.level == 2){
          this.player.setFrame(11);
        }else if(this.level == 3){
          this.player.setFrame(21);
        }
      }else if(this.delay < 30){
        if(this.level == 1 || this.level == 4){
          this.player.setFrame(2);
        }else if(this.level == 2){
          this.player.setFrame(12);
        }else if(this.level == 3){
          this.player.setFrame(22);
        }
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
        if(this.level == 1 || this.level == 4){
          this.player.setFrame(3);
        }else if(this.level == 2){
          this.player.setFrame(13);
        }else if(this.level == 3){
          this.player.setFrame(23);
        }
      }else if(this.delay < 30){
        if(this.level == 1 || this.level == 4){
          this.player.setFrame(4);
        }else if(this.level == 2){
          this.player.setFrame(14);
        }else if(this.level == 3){
          this.player.setFrame(24);
        }
      }else {
        this.delay = 0
      }
      if(this.player.body.touching.down){
        this.delay++
      }
    }else {
      this.player.setVelocityX(0);
      if(this.level == 1 || this.level == 4){
          this.player.setFrame(0);
        }else if(this.level == 2){
          this.player.setFrame(10);
        }else if(this.level == 3){
          this.player.setFrame(20);
        }
    }

    if(this.level == 3){
      if(this.arrow.up.isDown){
        this.player.setVelocityY(-100)
      }
    }else{
      if (this.arrow.up.isDown && this.player.body.touching.down) {
        this.sound.play('jump')
        this.delay = 0
        if(this.level == 2){
          this.player.setVelocityY(-250);
        }else{
          this.player.setVelocityY(-200);
        }
      }
    }
  }else if(this.flowered){
    if (this.arrow.right.isDown) {
      this.player.setVelocityX(160);
      this.cameras.main.scrollX = this.player.x - 350
       if(this.delay < 15){
        if(this.level == 1 || this.level == 4){
          this.player.setFrame(6);
        }else if(this.level == 2){
          this.player.setFrame(16);
        }else if(this.level == 3){
          this.player.setFrame(26);
        }
      }else if(this.delay < 30){
        if(this.level == 1 || this.level == 4){
          this.player.setFrame(7);
        }else if(this.level == 2){
          this.player.setFrame(17);
        }else if(this.level == 3){
          this.player.setFrame(27);
        }
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
        if(this.level == 1 || this.level == 4){
          this.player.setFrame(8);
        }else if(this.level == 2){
          this.player.setFrame(18);
        }else if(this.level == 3){
          this.player.setFrame(28);
        }
      }else if(this.delay < 30){
        if(this.level == 1 || this.level == 4){
          this.player.setFrame(9);
        }else if(this.level == 2){
          this.player.setFrame(19);
        }else if(this.level == 3){
          this.player.setFrame(29);
        }
      }else {
        this.delay = 0
      }
      if(this.player.body.touching.down){
        this.delay++
      }
    }else {
      this.player.setVelocityX(0);
      if(this.level == 1 || this.level == 4){
          this.player.setFrame(5);
        }else if(this.level == 2){
          this.player.setFrame(15);
        }else if(this.level == 3){
          this.player.setFrame(25);
        }
    }

    if(this.level == 3){
      if(this.arrow.up.isDown){
        this.player.setVelocityY(-100)
      }
    }else{
      if (this.arrow.up.isDown && this.player.body.touching.down) {
        this.sound.play('jump')
        this.delay = 0
        if(this.level == 2){
          this.player.setVelocityY(-250);
        }else{
          this.player.setVelocityY(-200);
        }
      }
    }
  }
  }

    if(this.player.y >= 450){
      this.death()
    }
    if(this.player.y <= -50){
      
      //teleport to sky level//
      this.player.x = 5700
      this.player.y = 300
      this.egg.x = 11523
      this.egg.y = 350
      this.egg.setFrame(0)
      this.egg.visible = true
      this.egg.enableBody()
      this.backgroundMusic.stop()
      this.backgroundMusic = this.sound.add('distant spring')
      this.backgroundMusic.play({loop: true})

    }

    if (this.physics.overlap(this.player, this.nectar)) {
        this.powerUp();
      }

      if (this.physics.overlap(this.player, this.fish1) || this.physics.overlap(this.player, this.fish2) || this.physics.overlap(this.player, this.fish3) || this.physics.overlap(this.player, this.fish4) || this.physics.overlap(this.player, this.fish5) || this.physics.overlap(this.player, this.fish6) || this.physics.overlap(this.player, this.fish7) || this.physics.overlap(this.player, this.fish8) || this.physics.overlap(this.player, this.fish9) || this.physics.overlap(this.player, this.fish10) || this.physics.overlap(this.player, this.fish11) || this.physics.overlap(this.player, this.fish12) || this.physics.overlap(this.player, this.fish13) || this.physics.overlap(this.player, this.fish14) || this.physics.overlap(this.player, this.fish15) || this.physics.overlap(this.player, this.fish16) || this.physics.overlap(this.player, this.fish17) || this.physics.overlap(this.player, this.fish18) || this.physics.overlap(this.player, this.fish19) || this.physics.overlap(this.player, this.fish20) || this.physics.overlap(this.player, this.fish21) || this.physics.overlap(this.player, this.fish22) || this.physics.overlap(this.player, this.fish23)) {
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


      if(this.player.body.touching.down && this.bulborb.body.touching.up){
        this.bulborb.play('bulbdeath')
        this.sound.play('bulborb death')
        if(this.arrow.up.isDown){
          this.player.setVelocityY(-200)
        }else{
        this.player.setVelocityY(-100)
        }
        this.bulborb.setVelocityX(0)
        this.delayTimer = this.time.addEvent({
          delay: 500,
          callback: ()=>{
            this.bulborb.visible = false 
            this.bulborb.disableBody() 
          },
          loop: false
        })
      }else if(this.player.body.touching.down && this.bulborb2.body.touching.up){
        this.bulborb2.play('bulbdeath')
        this.sound.play('bulborb death')
        if(this.arrow.up.isDown){
          this.player.setVelocityY(-200)
        }else{
        this.player.setVelocityY(-100)
        }
        this.bulborb2.setVelocityX(0)
        this.delayTimer = this.time.addEvent({
          delay: 500,
          callback: ()=>{
            this.bulborb2.visible = false 
            this.bulborb2.disableBody() 
          },
          loop: false
        })
      }else if(this.player.body.touching.down && this.bulborb3.body.touching.up){
        this.bulborb3.play('bulbdeath')
        this.sound.play('bulborb death')
        if(this.arrow.up.isDown){
          this.player.setVelocityY(-200)
        }else{
        this.player.setVelocityY(-100)
        }
        this.bulborb3.setVelocityX(0)
        this.delayTimer = this.time.addEvent({
          delay: 500,
          callback: ()=>{
            this.bulborb3.visible = false 
            this.bulborb3.disableBody() 
          },
          loop: false
        })
      }else if(this.player.body.touching.down && this.bulborb4.body.touching.up){
        this.player.setVelocityY(-30)
        this.player.setVelocityX(-13000)
        this.bulborb3.visible = false
        this.bulborb3.disableBody()
        this.bossHP -= 1
        if(this.bossHP > 0){
          this.bulborb4.play('bosshurt')
          this.sound.play('boss hit')
        }else{
          this.bulborb4.play('bossdeath')
          this.sound.play('bulborb death')
          this.delayTimer = this.time.addEvent({
          delay: 500,
          callback: ()=>{
            this.backgroundMusic.stop()
            this.sound.play('boss defeated')
            this.bulborb4.visible = false 
            this.bulborb4.disableBody() 
            this.bossAlive = false
          },
          loop: false
        })
        }
        this.walkTimer = this.time.addEvent({
          delay: 500,
          callback: ()=>{
            this.cameras.main.scrollX = this.player.x - 350
          },
          loop: false
        })
      }

      if(this.player.body.touching && (this.bulborb.body.touching.left || this.bulborb.body.touching.right)){
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
      }else if(this.player.body.touching && (this.bulborb2.body.touching.left || this.bulborb2.body.touching.right)){
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
      }else if(this.player.body.touching && (this.bulborb3.body.touching.left || this.bulborb3.body.touching.right)){
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
      }else if(this.player.body.touching && (this.bulborb4.body.touching.left || this.bulborb4.body.touching.right)){
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
      this.player.setVelocityY(-160)
      this.egg.play('crack')
      this.crackTimer = this.time.addEvent({
          delay: 1000,
          callback: ()=>{
            this.egg.visible = false 
            this.egg.disableBody()
            this.nectar = this.physics.add.sprite(this.egg.x ,this.egg.y + 10, 'nectar', 0)
            this.nectar.play('splash')
            this.nectar.sound = this.sound.add('slurp', {volume: 5})
          },
          loop: false
        })
    }

    if(this.player.x > 16000){
      if(this.once == 0){
        this.backgroundMusic.stop()
        console.log('new music')
        this.backgroundMusic = this.sound.add('boss music')
        this.once = 1
        this.backgroundMusic.play({loop: true})
      }
    }
    // when you finish the game //
    if(this.player.x > 16656){
      this.player.setVelocity(0)
      this.player.x = 16656
      this.levelComplete = true
      this.ship.setVelocityY(50)
      this.landingTimer = this.time.addEvent({
          delay: 8000,
          callback: ()=>{
            this.ship.setVelocityY(0)
            this.ship.setFrame(1)
            this.ship.y += 17
          },
          loop: false
        })
      this.sound.play('beat the game')
      this.gameCompleteText = this.add.text(16500, 100, 'Congratulations', this.style);
      this.gameCompleteText = this.add.text(16510, 150, 'You Survived', this.style);
      this.gameCompleteText.depth = 1;
    }

  }

  /* VVV Put any other functions and code down here VVV */

  moveEnemyRight(){
    this.bulborb.setVelocityX(100)
    if(Phaser.Math.Difference(this.player.x, this.bulborb.x) > 200){
    this.bulborb.play('bulbwalkclosed')
    }else{
      this.bulborb.play('bulbwalkopen')
    }
    this.bulborb.setFlipX(true)
    this.bulborb2.setVelocityX(30)
    if(Phaser.Math.Difference(this.player.x, this.bulborb2.x) > 200){
    this.bulborb2.play('bulbwalkclosed')
    }else{
      this.bulborb2.play('bulbwalkopen')
    }
    this.bulborb2.setFlipX(true)
    this.bulborb3.setVelocityX(100)
    if(Phaser.Math.Difference(this.player.x, this.bulborb3.x) > 200){
    this.bulborb3.play('bulbwalkclosed')
    }else{
      this.bulborb3.play('bulbwalkopen')
    }
    this.bulborb3.setFlipX(true)
    this.bulborb4.setVelocityX(50)
    if(Phaser.Math.Difference(this.player.x, this.bulborb4.x) > 200){
    this.bulborb4.play('bosswalkclosed')
    }else{
      this.bulborb4.play('bosswalkopen')
    }
    this.bulborb4.setFlipX(true)
    this.walkTimer = this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            if(this.bossAlive){
            this.moveEnemyLeft()
            }
          },
          loop: false
        })
  }

  moveEnemyLeft(){
    this.bulborb.setVelocityX(-100)
    if(Phaser.Math.Difference(this.player.x, this.bulborb.x) > 200){
    this.bulborb.play('bulbwalkclosed')
    }else{
      this.bulborb.play('bulbwalkopen')
    }
    this.bulborb.setFlipX(false)
    this.bulborb2.setVelocityX(-30)
    if(Phaser.Math.Difference(this.player.x, this.bulborb2.x) > 200){
    this.bulborb2.play('bulbwalkclosed')
    }else{
      this.bulborb2.play('bulbwalkopen')
    }
    this.bulborb2.setFlipX(false)
    this.bulborb3.setVelocityX(-100)
    if(Phaser.Math.Difference(this.player.x, this.bulborb3.x) > 200){
    this.bulborb3.play('bulbwalkclosed')
    }else{
      this.bulborb3.play('bulbwalkopen')
    }
    this.bulborb3.setFlipX(false)
    this.bulborb4.setVelocityX(-50)
    if(Phaser.Math.Difference(this.player.x, this.bulborb4.x) > 100){
    this.bulborb4.play('bosswalkclosed')
    }else{
      this.bulborb4.play('bosswalkopen')
    }
    this.bulborb4.setFlipX(false)
    this.walkTimer = this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            if(this.bossAlive){
            this.moveEnemyRight()
            }
          },
          loop: false
        })
  }

  powerUp(){
    this.flowered = true;
    this.nectar.sound.play()
    this.nectar.destroy()
  }

  death(){
    if(this.level == 1){
    this.nectar.destroy()
    this.egg.setFrame(0)
    this.egg.visible = true
    this.egg.enableBody()
    this.bulborb.setFrame(0)
    this.bulborb.visible = true
    this.bulborb.enableBody()
    this.bulborb2.setFrame(0)
    this.bulborb2.visible = true
    this.bulborb2.enableBody()
    this.player.x = 200
    this.player.y = 310
    }else if(this.level == 2){
      this.player.x = 5657
      this.player.y = 310
    }else if(this.level == 3){
      this.player.x = 10400
      this.player.y = 330
      this.egg.setFrame(0)
      this.egg.visible = true
      this.egg.enableBody()
      this.fish1.x = this.fish1X
      this.fish2.x = this.fish2X
      this.fish3.x = this.fish3X
      this.fish4.x = this.fish4X
      this.fish5.x = this.fish5X
      this.fish6.x = this.fish6X
      this.fish7.x = this.fish7X
      this.fish8.x = this.fish8X
      this.fish9.x = this.fish9X
      this.fish10.x = this.fish10X
      this.fish11.x = this.fish11X
      this.fish12.x = this.fish12X
      this.fish13.x = this.fish13X
      this.fish14.x = this.fish14X
      this.fish15.x = this.fish15X
      this.fish16.x = this.fish16X
      this.fish17.x = this.fish17X
      this.fish18.x = this.fish18X
      this.fish19.x = this.fish19X
      this.fish20.x = this.fish20X
      this.fish21.x = this.fish21X
      this.fish22.x = this.fish22X
      this.fish23.x = this.fish23X
    }else if(this.level == 4){
      this.player.x = 15500
      this.player.y = 315
      this.bulborb3.setFrame(0)
      this.bulborb3.visible = true
      this.bulborb3.enableBody()
      this.bulborb4.setFrame(0)
      this.bulborb4.visible = true
      this.bulborb4.enableBody()
      this.bossHP = 3
    }

    this.cameras.main.scrollX = this.player.x - 350
    this.flowered = false;
    this.sound.play('cry')
    
  }

}

// Create the game
window.game = new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#e4a426', // The background color
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade',
    // arcade: { debug: true }
  }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

window.restartActiveGame = function () {
  if (window.game && window.game.scene.scenes[0]) {
    window.game.scene.scenes[0].scene.restart();
    gameover = false;
  }
};