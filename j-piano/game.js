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

    this.cOnce = false;
    this.dOnce = false;
    this.eOnce = false;
    this.fOnce = false;
    this.gOnce = false;
    this.aOnce = false;
    this.bOnce = false;

    this.style = { font: '30px Arial', fill: '#000000' };


    this.firstKeyX = 100
    this.firstKeyY = 200

    this.blackX = this.firstKeyX + 18
    this.blackY = this.firstKeyY - 36


    this.cExtra = this.physics.add.sprite(this.firstKeyX + 12, this.firstKeyY + 65, 'whiteKeyRight').setInteractive()
    this.cKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()
    this.cKey.input.hitArea.setTo(0, 0, 24, 204)
    this.cText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'S', this.style);
    this.firstKeyX += 38

    this.dExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 65, 'whiteKeyMiddle').setInteractive()
    this.dKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()  
    this.dKey.input.hitArea.setTo(13, 0, 10, 130)
    this.dText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'D', this.style);
    this.firstKeyX += 38

    this.eExtra = this.physics.add.sprite(this.firstKeyX - 12, this.firstKeyY + 65, 'whiteKeyLeft').setInteractive()
    this.eKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()  
    this.eKey.input.hitArea.setTo(11, 0, 24, 204) 
    this.eText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'F', this.style);
    this.firstKeyX += 38

    this.fExtra = this.physics.add.sprite(this.firstKeyX + 12, this.firstKeyY + 65, 'whiteKeyRight').setInteractive()
    this.fKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()  
    this.fKey.input.hitArea.setTo(0, 0, 24, 204)
    this.fText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'H', this.style);
    this.firstKeyX += 38

    this.gExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 65, 'whiteKeyMiddle').setInteractive()
    this.gKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()
    this.gKey.input.hitArea.setTo(13, 0, 10, 130)
    this.gText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'J', this.style);
    this.firstKeyX += 38

    this.aExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 65, 'whiteKeyMiddle').setInteractive() 
    this.aKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()   
    this.aKey.input.hitArea.setTo(13, 0, 10, 130)
    this.aText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'K', this.style);
    this.firstKeyX += 38

    this.bExtra = this.physics.add.sprite(this.firstKeyX - 12, this.firstKeyY + 65, 'whiteKeyLeft').setInteractive()
    this.bKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()      
    this.bKey.input.hitArea.setTo(11, 0, 24, 204) 
    this.bText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'L', this.style);
    this.firstKeyX += 38

    this.highCExtra = this.physics.add.sprite(this.firstKeyX + 12, this.firstKeyY + 65, 'whiteKeyRight').setInteractive()
    this.highCKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()
    this.highCKey.input.hitArea.setTo(0, 0, 24, 204)
    this.firstKeyX += 38

    this.highDExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 65, 'whiteKeyMiddle').setInteractive()
    this.highDKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()  
    this.highDKey.input.hitArea.setTo(13, 0, 10, 130)
    this.firstKeyX += 38

    this.highEExtra = this.physics.add.sprite(this.firstKeyX - 12, this.firstKeyY + 65, 'whiteKeyLeft').setInteractive()
    this.highEKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()  
    this.highEKey.input.hitArea.setTo(11, 0, 24, 204) 
    this.firstKeyX += 38

    this.highFExtra = this.physics.add.sprite(this.firstKeyX + 12, this.firstKeyY + 65, 'whiteKeyRight').setInteractive()
    this.highFKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()  
    this.highFKey.input.hitArea.setTo(0, 0, 24, 204)
    this.firstKeyX += 38

    this.highGExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 65, 'whiteKeyMiddle').setInteractive()
    this.highGKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()
    this.highGKey.input.hitArea.setTo(13, 0, 10, 130)
    this.firstKeyX += 38

    this.highAExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 65, 'whiteKeyMiddle').setInteractive() 
    this.highAKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()   
    this.highAKey.input.hitArea.setTo(13, 0, 10, 130)
    this.firstKeyX += 38

    this.highBExtra = this.physics.add.sprite(this.firstKeyX - 12, this.firstKeyY + 65, 'whiteKeyLeft').setInteractive()
    this.highBKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()      
    this.highBKey.input.hitArea.setTo(11, 0, 24, 204) 


    this.cExtra.on('pointerdown', function(){
          this.cKey.sound.play();
        }, this); 
    this.cKey.on('pointerdown', function(){
          this.cKey.sound.play();
        }, this);
    this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


    this.dExtra.on('pointerdown', function(){
          this.dKey.sound.play();
        }, this); 
    this.dKey.on('pointerdown', function(){
          this.dKey.sound.play();
        }, this);
    this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    this.eExtra.on('pointerdown', function(){
          this.eKey.sound.play();
        }, this); 
    this.eKey.on('pointerdown', function(){
          this.eKey.sound.play();
        }, this);
    this.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);


    this.fExtra.on('pointerdown', function(){
          this.fKey.sound.play();
        }, this); 
    this.fKey.on('pointerdown', function(){
          this.fKey.sound.play();
        }, this);
    this.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

        
    this.gExtra.on('pointerdown', function(){
          this.gKey.sound.play();
        }, this); 
    this.gKey.on('pointerdown', function(){
          this.gKey.sound.play();
        }, this);
    this.JKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);


    this.aExtra.on('pointerdown', function(){
          this.aKey.sound.play();
        }, this); 
    this.aKey.on('pointerdown', function(){
          this.aKey.sound.play();
        }, this);
    this.KKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);


    this.bExtra.on('pointerdown', function(){
          this.bKey.sound.play();
        }, this); 
    this.bKey.on('pointerdown', function(){
          this.bKey.sound.play();
        }, this);
    this.LKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

    
    this.cBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');
    this.blackX += 38
    this.dBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');
    this.blackX += 76
    this.fBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');
    this.blackX += 38
    this.gBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');
    this.blackX += 38
    this.aBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');
    this.blackX += 76

    this.highCBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');
    this.blackX += 38
    this.highDBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');
    this.blackX += 76
    this.highFBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');
    this.blackX += 38
    this.highGBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');
    this.blackX += 38
    this.highABlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey');


    this.cKey.sound = this.sound.add('cNote', {volume: 50})
    this.dKey.sound = this.sound.add('dNote', {volume: 50})
    this.eKey.sound = this.sound.add('eNote', {volume: 50})
    this.fKey.sound = this.sound.add('fNote', {volume: 50})
    this.gKey.sound = this.sound.add('gNote', {volume: 50})
    this.aKey.sound = this.sound.add('aNote', {volume: 50})
    this.bKey.sound = this.sound.add('bNote', {volume: 50})


  }
  update() {

    if(this.SKey.isDown){
      if(!this.cOnce){
      this.cKey.sound.play()
      this.cOnce = true
      }
    }else{
      this.cOnce = false
    }

    if(this.DKey.isDown){
      if(!this.dOnce){
        this.dKey.sound.play()
        this.dOnce = true
      }
    }else{
      this.dOnce = false
    }

    if(this.FKey.isDown){
      if(!this.eOnce){
      this.eKey.sound.play()
      this.eOnce = true
      }
    }else{
      this.eOnce = false
    }

    if(this.HKey.isDown){
      if(!this.fOnce){
      this.fKey.sound.play()
      this.fOnce = true
      }
    }else{
      this.fOnce = false
    }

    if(this.JKey.isDown){
      if(!this.gOnce){
      this.gKey.sound.play()
      this.gOnce = true
      }
    }else{
      this.gOnce = false
    }

    if(this.KKey.isDown){
      if(!this.aOnce){
      this.aKey.sound.play()
      this.aOnce = true
      }
    }else{
      this.aOnce = false
    }

    if(this.LKey.isDown){
      if(!this.bOnce){
      this.bKey.sound.play()
      this.bOnce = true
      }
    }else{
      this.bOnce = false
    }
  }

  /* VVV Put any other functions and code down here VVV */


}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#000000ff', // The background color
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade',}, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

