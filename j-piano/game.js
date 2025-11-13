// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {

    this.load.image('whiteKey', 'j-piano/assets/White Key.png');
    this.load.image('whiteKeyLeft', 'j-piano/assets/White Key Left.png');
    this.load.image('whiteKeyMiddle', 'j-piano/assets/White Key Middle.png');
    this.load.image('whiteKeyRight', 'j-piano/assets/White Key Right.png');
    this.load.image('blackKey', 'j-piano/assets/Black Key.png');

    this.load.audio('cNote', 'j-piano/assets/c6-102822.mp3')
    this.load.audio('dNote', 'j-piano/assets/d6-82020.mp3')
    this.load.audio('eNote', 'j-piano/assets/e6-82016.mp3')
    this.load.audio('fNote', 'j-piano/assets/f6-102819.mp3')
    this.load.audio('gNote', 'j-piano/assets/g6-82013.mp3')
    this.load.audio('aNote', 'j-piano/assets/a6-82015.mp3') // a en b zijn vals
    this.load.audio('bNote', 'j-piano/assets/b6-82017.mp3')
  }

  create() {


    this.firstKeyX = 50
    this.firstKeyY = 200

    this.blackX = this.firstKeyX + 18
    this.blackY = this.firstKeyY - 36


    this.cExtra = this.physics.add.sprite(this.firstKeyX + 24, this.firstKeyY + 130, 'whiteKeyLeft').setInteractive()
    this.cKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()
    this.cKey.input.hitArea.setTo(0, 0, 24, 204)
    this.firstKeyX += 38
    this.dExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 130, 'whiteKeyMiddle').setInteractive().on('pointerdown', function(){
          //this.dKey.sound.play();
        }, this);
    this.dKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive().on('pointerdown', function(){
          //this.dKey.sound.play();
        }, this);      
    this.dKey.body.setSize(10, 130)
    this.dKey.body.setOffset(14, 0)
    this.firstKeyX += 38
    this.eExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 130, 'whiteKeyRight').setInteractive().on('pointerdown', function(){
          this.eKey.sound.play();
        }, this);
    this.eKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive().on('pointerdown', function(){
          this.eKey.sound.play();
        }, this);      
    this.eKey.body.setSize(24, 204)
    this.eKey.body.setOffset(14, 0)
    this.firstKeyX += 38
    this.fExtra = this.physics.add.sprite(this.firstKeyX + 24, this.firstKeyY + 130, 'whiteKeyLeft').setInteractive().on('pointerdown', function(){
          this.fKey.sound.play();
        }, this);   
    this.fKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive().on('pointerdown', function(){
          this.fKey.sound.play();
        }, this);      
    this.fKey.body.setSize(24, 204, false)
    this.firstKeyX += 38
    this.gExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 130, 'whiteKeyMiddle').setInteractive().on('pointerdown', function(){
          this.gKey.sound.play();
        }, this);   
    this.gExtra.body.setSize(38, 72, false)
    this.gKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive().on('pointerdown', function(){
          this.gKey.sound.play();
        }, this);     
    this.gKey.body.setSize(10, 130)
    this.gKey.body.setOffset(14, 0)
    this.firstKeyX += 38
    this.aExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 130, 'whiteKey').setInteractive().on('pointerdown', function(){
          this.aKey.sound.play();
        }, this);   
    this.aExtra.body.setSize(38, 72, false)
    this.aKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive().on('pointerdown', function(){
          this.aKey.sound.play();
        }, this);      
    this.aKey.body.setSize(10, 130)
    this.aKey.body.setOffset(14, 0)
    this.firstKeyX += 38
    this.bExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 130, 'whiteKey').setInteractive().on('pointerdown', function(){
          this.bKey.sound.play();
        }, this);   
    this.bExtra.body.setSize(14, 72, false)
    this.bKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive().on('pointerdown', function(){
          this.bKey.sound.play();
        }, this);      
    this.bKey.body.setSize(24, 204)
    this.bKey.body.setOffset(14, 0)


    this.cExtra.on('pointerdown', function(){
          this.cKey.sound.play();
        }, this); 
    this.cKey.on('pointerdown', function(){
          this.cKey.sound.play();
        }, this);

    
    this.cBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');
    this.blackX += 38
    this.dBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');
    this.blackX += 76
    this.fBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');
    this.blackX += 38
    this.gBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');
    this.blackX += 38
    this.aBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');

    
    //this.cExtra.alpha = 0;
    this.dExtra.alpha = 0;
    this.eExtra.alpha = 0;
    this.fExtra.alpha = 0;
    this.gExtra.alpha = 0;
    this.aExtra.alpha = 0;
    this.bExtra.alpha = 0;


    this.cKey.sound = this.sound.add('cNote', {volume: 50})
    this.dKey.sound = this.sound.add('dNote', {volume: 50})
    this.eKey.sound = this.sound.add('eNote', {volume: 50})
    this.fKey.sound = this.sound.add('fNote', {volume: 50})
    this.gKey.sound = this.sound.add('gNote', {volume: 50})
    this.aKey.sound = this.sound.add('aNote', {volume: 50})
    this.bKey.sound = this.sound.add('bNote', {volume: 50})


  }
  update() {
    this.cExtra.input.alwaysEnabled = true;
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

