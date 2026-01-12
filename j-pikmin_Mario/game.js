class mainScene {

  preload() {

    this.load.image('background', 'j-pikmin_Mario/assets/landscape.png')
    this.load.image('easterEgg', 'j-pikmin_Mario/assets/my_avatar-1.png.png')
    this.load.image('bench', 'j-pikmin_Mario/assets/bench.png')
    this.load.image('next', 'j-pikmin_Mario/assets/next.png')
    this.load.image('sky', 'j-pikmin_Mario/assets/sky.png')

    this.load.spritesheet('walking', 
      'j-pikmin_Mario/assets/pikmin.png',
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
    this.load.spritesheet('skyground', 
      'j-pikmin_Mario/assets/skyground.png',
      {frameWidth: 30, frameHeight: 30}
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
    this.style = {font: '50px Arial', fill: '#e4a426' };
    this.levelCompleteText = this.add.text(1300, 100, 'Level Complete', this.style);
    this.levelCompleteText.depth = 1;
    this.levelCompleteText.visible = false

    // music //

    this.backgroundMusic = this.sound.add('forest of hope')
    this.backgroundMusic.play({loop: true})

    // variables //

    this.delay = 0;
    this.flowered = false;
    this.invincible = false;
    this.levelComplete = false;
    this.level = 2;

    // next level //

    this.nextLevelButton = this.add.image(0, 300, 'next').setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
      this.level += 1
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
      }
      this.cameras.main.scrollX = this.player.x - 350
      this.levelCompleteText.setText('')
      this.levelComplete = false
    })
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

    // enemy's //

    this.bulborb = this.physics.add.group()
    this.bulborb = this.physics.add.sprite(600, 328, 'bulborb', 0).setScale(1.2).setImmovable(true)

    this.bulborb2 = this.physics.add.sprite(2014, 328, 'bulborb', 0).setScale(1.2).setImmovable(true)
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

    // end of the second level //

    // start third level under water //

    this.grassX = 10200
    this.grassY = 400

    //back wall
    for(let i = 0; i < 16; i++){
    this.grass.create(this.grassX - this.spritelength, this.grassY, 'skyground', 0)
    this.grassY -= this.spritelength
    }

    this.grassY = 380

    //straight
    for(let i = 0; i < 13; i++){
      this.grass.create(this.grassX, this.grassY, 'skyground', 0)
      this.grass.create(this.grassX, this.grassY + this.spritelength, 'skyground', 0)
      this.grassX += this.spritelength
    }

    // end of the third level


    //colliders

    this.physics.add.collider(this.player, this.grass)
    this.physics.add.collider(this.player, this.egg,)

    this.physics.add.collider(this.player, this.bulborb)
    this.physics.add.collider(this.player, this.bulborb2)

    this.physics.add.collider(this.player, this.bench)

    this.physics.add.collider(this.player, this.platforms)

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
        if(this.level == 1){
          this.player.setFrame(1);
        }else if(this.level == 2){
          this.player.setFrame(11);
        }else if(this.level == 3){
          this.player.setFrame(21);
        }
      }else if(this.delay < 30){
        if(this.level == 1){
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
        if(this.level == 1){
          this.player.setFrame(3);
        }else if(this.level == 2){
          this.player.setFrame(13);
        }else if(this.level == 3){
          this.player.setFrame(23);
        }
      }else if(this.delay < 30){
        if(this.level == 1){
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
      if(this.level == 1){
          this.player.setFrame(0);
        }else if(this.level == 2){
          this.player.setFrame(10);
        }else if(this.level == 3){
          this.player.setFrame(20);
        }
    }

    if (this.arrow.up.isDown && this.player.body.touching.down) {
      this.sound.play('jump')
      this.delay = 0
      if(this.level == 2){
        this.player.setVelocityY(-250)
      }else{
        this.player.setVelocityY(-200);
      }
    }
  }else if(this.flowered){
    if (this.arrow.right.isDown) {
      this.player.setVelocityX(160);
      this.cameras.main.scrollX = this.player.x - 350
       if(this.delay < 15){
        if(this.level == 1){
          this.player.setFrame(6);
        }else if(this.level == 2){
          this.player.setFrame(16);
        }else if(this.level == 3){
          this.player.setFrame(26);
        }
      }else if(this.delay < 30){
        if(this.level == 1){
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
        if(this.level == 1){
          this.player.setFrame(8);
        }else if(this.level == 2){
          this.player.setFrame(18);
        }else if(this.level == 3){
          this.player.setFrame(28);
        }
      }else if(this.delay < 30){
        if(this.level == 1){
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
      if(this.level == 1){
          this.player.setFrame(5);
        }else if(this.level == 2){
          this.player.setFrame(15);
        }else if(this.level == 3){
          this.player.setFrame(25);
        }
    }

    if (this.arrow.up.isDown && this.player.body.touching.down) {
      this.sound.play('jump')
      this.delay = 0
      this.player.setVelocityY(-200);
    }
  }
  }

    if(this.player.y >= 400){
      this.death()
    }
    if(this.player.y <= -50){
      
      //teleport to sky level//
      this.player.x = 5700
      this.player.y = 300
      this.backgroundMusic.stop()
      this.backgroundMusic = this.sound.add('distant spring')
      this.backgroundMusic.play({loop: true})

    }

    if (this.physics.overlap(this.player, this.nectar)) {
        this.powerUp();
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
      }
 

    if(this.player.body.touching.down && this.egg.body.touching.up){
      this.player.setVelocityY(-160)
      this.egg.play('crack')
      this.crackTimer = this.time.addEvent({
          delay: 1000,
          callback: ()=>{
            this.egg.visible = false 
            this.egg.disableBody()
            this.nectar = this.physics.add.sprite(100 ,343, 'nectar', 0)
            this.nectar.play('splash')
            this.nectar.sound = this.sound.add('slurp', {volume: 5})
          },
          loop: false
        })
    }

  }

  /* VVV Put any other functions and code down here VVV */

  moveEnemyRight(){
    this.bulborb.setVelocityX(100)
    this.bulborb.play('bulbwalkclosed')
    this.bulborb.setFlipX(true)
    this.bulborb2.setVelocityX(30)
    this.bulborb2.play('bulbwalkclosed')
    this.bulborb2.setFlipX(true)
    this.walkTimer = this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            this.moveEnemyLeft()
          },
          loop: false
        })
  }

  moveEnemyLeft(){
    this.bulborb.setVelocityX(-100)
    this.bulborb.play('bulbwalkclosed')
    this.bulborb.setFlipX(false)
    this.bulborb2.setVelocityX(-30)
    this.bulborb2.play('bulbwalkclosed')
    this.bulborb2.setFlipX(false)
    this.walkTimer = this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            this.moveEnemyRight()
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
    this.player.x = 200
    this.player.y = 310
    }else if(this.level == 2){
      this.player.x = 5657
      this.player.y = 310
    }else if(this.level == 3){
      this.player.x = 10400
      this.player.y = 330
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