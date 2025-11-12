// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {

    this.load.image('whiteKey', 'piano/assets/White Key.png');
    this.load.image('blackKey', 'piano/assets/Black Key.png');

    this.load.audio('cNote', 'piano/assets/c6-102822.mp3')
    this.load.audio('dNote', 'piano/assets/d6-82020.mp3')
    this.load.audio('eNote', 'piano/assets/e6-82016.mp3')
    this.load.audio('fNote', 'piano/assets/f6-102819.mp3')
    this.load.audio('gNote', 'piano/assets/g6-82013.mp3')
    this.load.audio('aNote', 'piano/assets/a6-82015.mp3')
    this.load.audio('bNote', 'piano/assets/b6-82017.mp3')
  }

  create() {


    this.firstKeyX = 50
    this.firstKeyY = 200

    this.blackX = this.firstKeyX + 18
    this.blackY = this.firstKeyY - 36

    this.cKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive(this.input.makePixelPerfect());   
    this.cKey.body.setSize(38, 204, false)
    this.firstKeyX += 38
    this.dKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive(this.input.makePixelPerfect());   
    this.dKey.body.setSize(38, 204, false)
    this.firstKeyX += 38
    this.eKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive(this.input.makePixelPerfect());   
    this.eKey.body.setSize(38, 204, false)
    this.firstKeyX += 38
    this.fKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive(this.input.makePixelPerfect());   
    this.fKey.body.setSize(38, 204, false)
    this.firstKeyX += 38
    this.gKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive(this.input.makePixelPerfect());   
    this.gKey.body.setSize(38, 204, false)
    this.firstKeyX += 38
    this.aKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive(this.input.makePixelPerfect());   
    this.aKey.body.setSize(38, 204, false)
    this.firstKeyX += 38
    this.bKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive(this.input.makePixelPerfect());   
    this.bKey.body.setSize(38, 204, false)

    
    this.cBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive(this.input.makePixelPerfect());
    this.blackX += 38
    this.dBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive(this.input.makePixelPerfect());
    this.blackX += 76
    this.fBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive(this.input.makePixelPerfect());
    this.blackX += 38
    this.gBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive(this.input.makePixelPerfect());
    this.blackX += 38
    this.aBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive(this.input.makePixelPerfect());


    this.cKey.sound = this.sound.add('cNote')
    this.dKey.sound = this.sound.add('dNote')
    this.eKey.sound = this.sound.add('eNote')
    this.fKey.sound = this.sound.add('fNote')
    this.gKey.sound = this.sound.add('gNote')
    this.aKey.sound = this.sound.add('aNote')
    this.bKey.sound = this.sound.add('bNote')


  }
  update() {

  }

  /* VVV Put any other functions and code down here VVV */

}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#167782', // The background color
  scene: mainScene, // The name of the scene we created
  physics: { 
    default: 'arcade', 
    arcade: {
      debug: true
    }
  }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

