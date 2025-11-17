// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {

    this.load.image('whiteKey', 'j-piano/assets/White Key.png');
    this.load.image('whiteKeyLeft', 'j-piano/assets/White Key Left.png');
    this.load.image('whiteKeyMiddle', 'j-piano/assets/White Key Middle.png');
    this.load.image('whiteKeyRight', 'j-piano/assets/White Key Right.png');
    this.load.image('blackKey', 'j-piano/assets/Black Key.png');

    this.load.audio('cNote', 'j-piano/assets/C.m4a')
    this.load.audio('cisNote', 'j-piano/assets/Cblack.m4a')
    this.load.audio('dNote', 'j-piano/assets/D.m4a')
    this.load.audio('disNote', 'j-piano/assets/Dblack.m4a')
    this.load.audio('eNote', 'j-piano/assets/E.m4a')
    this.load.audio('fNote', 'j-piano/assets/F.m4a')
    this.load.audio('fisNote', 'j-piano/assets/Fblack.m4a')
    this.load.audio('gNote', 'j-piano/assets/G.m4a')
    this.load.audio('gisNote', 'j-piano/assets/Gblack.m4a')
    this.load.audio('aNote', 'j-piano/assets/A.m4a')
    this.load.audio('aisNote', 'j-piano/assets/Ablack.m4a')
    this.load.audio('bNote', 'j-piano/assets/B.m4a')

    this.load.audio('^cNote', 'j-piano/assets/^C.m4a')
    this.load.audio('^cisNote', 'j-piano/assets/^Cblack.m4a')
    this.load.audio('^dNote', 'j-piano/assets/^D.m4a')
    this.load.audio('^disNote', 'j-piano/assets/^Dblack.m4a')
    this.load.audio('^eNote', 'j-piano/assets/^E.m4a')
    this.load.audio('^fNote', 'j-piano/assets/^F.m4a')
    this.load.audio('^fisNote', 'j-piano/assets/^Fblack.m4a')
    this.load.audio('^gNote', 'j-piano/assets/^G.m4a')
    this.load.audio('^gisNote', 'j-piano/assets/^Gblack.m4a')
    this.load.audio('^aNote', 'j-piano/assets/^A.m4a')
    this.load.audio('^aisNote', 'j-piano/assets/^Ablack.m4a')
    this.load.audio('^bNote', 'j-piano/assets/^B.m4a')
  }

  create() {

    this.cOnce = false;
    this.cBOnce = false;
    this.dOnce = false;
    this.dBOnce = false;
    this.eOnce = false;
    this.fOnce = false;
    this.fBOnce = false;
    this.gOnce = false;
    this.gBOnce = false;
    this.aOnce = false;
    this.aBOnce = false;
    this.bOnce = false;
    this.highCOnce = false;
    this.highCBOnce = false;
    this.highDOnce = false;
    this.highDBOnce = false;
    this.highEOnce = false;
    this.highFOnce = false;
    this.highFBOnce = false;
    this.highGOnce = false;
    this.highGBOnce = false;
    this.highAOnce = false;
    this.highABOnce = false;
    this.highBOnce = false;

    this.style = { font: '30px Arial', fill: '#000000' };
    this.blackStyle = { font: '15px Arial', fill: '#ffffffff' };


    this.firstKeyX = 100
    this.firstKeyY = 200

    this.blackX = this.firstKeyX + 18
    this.blackY = this.firstKeyY - 36


    this.cExtra = this.physics.add.sprite(this.firstKeyX + 12, this.firstKeyY + 65, 'whiteKeyRight').setInteractive()
    this.cKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()
    this.cKey.input.hitArea.setTo(0, 0, 24, 204)
    this.cText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'A', this.style);
    this.firstKeyX += 38

    this.dExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 65, 'whiteKeyMiddle').setInteractive()
    this.dKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()  
    this.dKey.input.hitArea.setTo(13, 0, 10, 130)
    this.dText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'S', this.style);
    this.firstKeyX += 38

    this.eExtra = this.physics.add.sprite(this.firstKeyX - 12, this.firstKeyY + 65, 'whiteKeyLeft').setInteractive()
    this.eKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()  
    this.eKey.input.hitArea.setTo(11, 0, 24, 204) 
    this.eText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'D', this.style);
    this.firstKeyX += 38

    this.fExtra = this.physics.add.sprite(this.firstKeyX + 12, this.firstKeyY + 65, 'whiteKeyRight').setInteractive()
    this.fKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()  
    this.fKey.input.hitArea.setTo(0, 0, 24, 204)
    this.fText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'F', this.style);
    this.firstKeyX += 38

    this.gExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 65, 'whiteKeyMiddle').setInteractive()
    this.gKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()
    this.gKey.input.hitArea.setTo(13, 0, 10, 130)
    this.gText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'H', this.style);
    this.firstKeyX += 38

    this.aExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 65, 'whiteKeyMiddle').setInteractive() 
    this.aKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()   
    this.aKey.input.hitArea.setTo(13, 0, 10, 130)
    this.aText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'J', this.style);
    this.firstKeyX += 38

    this.bExtra = this.physics.add.sprite(this.firstKeyX - 12, this.firstKeyY + 65, 'whiteKeyLeft').setInteractive()
    this.bKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()      
    this.bKey.input.hitArea.setTo(11, 0, 24, 204) 
    this.bText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'K', this.style);
    this.firstKeyX += 38

    this.highCExtra = this.physics.add.sprite(this.firstKeyX + 12, this.firstKeyY + 65, 'whiteKeyRight').setInteractive()
    this.highCKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()
    this.highCKey.input.hitArea.setTo(0, 0, 24, 204)
    this.highCText = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'L', this.style);
    this.firstKeyX += 38

    this.highDExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 65, 'whiteKeyMiddle').setInteractive()
    this.highDKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()  
    this.highDKey.input.hitArea.setTo(13, 0, 10, 130)
    this.Text = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'Z', this.style);
    this.firstKeyX += 38

    this.highEExtra = this.physics.add.sprite(this.firstKeyX - 12, this.firstKeyY + 65, 'whiteKeyLeft').setInteractive()
    this.highEKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()  
    this.highEKey.input.hitArea.setTo(11, 0, 24, 204) 
    this.Text = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'X', this.style);
    this.firstKeyX += 38

    this.highFExtra = this.physics.add.sprite(this.firstKeyX + 12, this.firstKeyY + 65, 'whiteKeyRight').setInteractive()
    this.highFKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()  
    this.highFKey.input.hitArea.setTo(0, 0, 24, 204)
    this.Text = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'C', this.style);
    this.firstKeyX += 38

    this.highGExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 65, 'whiteKeyMiddle').setInteractive()
    this.highGKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()
    this.highGKey.input.hitArea.setTo(13, 0, 10, 130)
    this.Text = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'B', this.style);
    this.firstKeyX += 38

    this.highAExtra = this.physics.add.sprite(this.firstKeyX, this.firstKeyY + 65, 'whiteKeyMiddle').setInteractive() 
    this.highAKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()   
    this.highAKey.input.hitArea.setTo(13, 0, 10, 130)
    this.Text = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'N', this.style);
    this.firstKeyX += 38

    this.highBExtra = this.physics.add.sprite(this.firstKeyX - 12, this.firstKeyY + 65, 'whiteKeyLeft').setInteractive()
    this.highBKey = this.physics.add.sprite(this.firstKeyX, this.firstKeyY, 'whiteKey').setInteractive()      
    this.highBKey.input.hitArea.setTo(11, 0, 24, 204) 
    this.Text = this.add.text(this.firstKeyX -10, this.firstKeyY + 50, 'M', this.style);


    this.cExtra.on('pointerdown', function(){
          this.cKey.sound.play();
        }, this); 
    this.cKey.on('pointerdown', function(){
          this.cKey.sound.play();
        }, this);
    this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);


    this.dExtra.on('pointerdown', function(){
          this.dKey.sound.play();
        }, this); 
    this.dKey.on('pointerdown', function(){
          this.dKey.sound.play();
        }, this);
    this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


    this.eExtra.on('pointerdown', function(){
          this.eKey.sound.play();
        }, this); 
    this.eKey.on('pointerdown', function(){
          this.eKey.sound.play();
        }, this);
    this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    this.fExtra.on('pointerdown', function(){
          this.fKey.sound.play();
        }, this); 
    this.fKey.on('pointerdown', function(){
          this.fKey.sound.play();
        }, this);
    this.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        
    this.gExtra.on('pointerdown', function(){
          this.gKey.sound.play();
        }, this); 
    this.gKey.on('pointerdown', function(){
          this.gKey.sound.play();
        }, this);
    this.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);


    this.aExtra.on('pointerdown', function(){
          this.aKey.sound.play();
        }, this); 
    this.aKey.on('pointerdown', function(){
          this.aKey.sound.play();
        }, this);
    this.JKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);


    this.bExtra.on('pointerdown', function(){
          this.bKey.sound.play();
        }, this); 
    this.bKey.on('pointerdown', function(){
          this.bKey.sound.play();
        }, this);
    this.KKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

    this.highCExtra.on('pointerdown', function(){
          this.highCKey.sound.play();
        }, this); 
    this.highCKey.on('pointerdown', function(){
          this.highCKey.sound.play();
        }, this);
    this.LKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

    this.highDExtra.on('pointerdown', function(){
          this.highDKey.sound.play();
        }, this); 
    this.highDKey.on('pointerdown', function(){
          this.highDKey.sound.play();
        }, this);
    this.ZKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    this.highEExtra.on('pointerdown', function(){
          this.highEKey.sound.play();
        }, this); 
    this.highEKey.on('pointerdown', function(){
          this.highEKey.sound.play();
        }, this);
    this.XKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    this.highFExtra.on('pointerdown', function(){
          this.highFKey.sound.play();
        }, this); 
    this.highFKey.on('pointerdown', function(){
          this.highFKey.sound.play();
        }, this);
    this.CKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    this.highGExtra.on('pointerdown', function(){
          this.highGKey.sound.play();
        }, this); 
    this.highGKey.on('pointerdown', function(){
          this.highGKey.sound.play();
        }, this);
    this.BKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

    this.highAExtra.on('pointerdown', function(){
          this.highAKey.sound.play();
        }, this); 
    this.highAKey.on('pointerdown', function(){
          this.highAKey.sound.play();
        }, this);
    this.NKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

    this.highBExtra.on('pointerdown', function(){
          this.highBKey.sound.play();
        }, this); 
    this.highBKey.on('pointerdown', function(){
          this.highBKey.sound.play();
        }, this);
    this.MKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    
    this.cBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive();
    this.cBText = this.add.text(this.blackX -8, this.blackY + 40, 'W', this.blackStyle);
    this.blackX += 38
    this.dBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive();
    this.dBText = this.add.text(this.blackX -6, this.blackY + 40, 'E', this.blackStyle);
    this.blackX += 76
    this.fBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive();
    this.fBText = this.add.text(this.blackX -6, this.blackY + 40, 'Y', this.blackStyle);
    this.blackX += 38
    this.gBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive();
    this.gBText = this.add.text(this.blackX -6, this.blackY + 40, 'U', this.blackStyle);
    this.blackX += 38
    this.aBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive();
    this.aBText = this.add.text(this.blackX -2, this.blackY + 40, 'I', this.blackStyle);
    this.blackX += 76

    this.highCBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive();
    this.Text = this.add.text(this.blackX -6, this.blackY + 40, 'Q', this.blackStyle);
    this.blackX += 38
    this.highDBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive();
    this.Text = this.add.text(this.blackX -6, this.blackY + 40, 'R', this.blackStyle);
    this.blackX += 76
    this.highFBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive();
    this.Text = this.add.text(this.blackX -6, this.blackY + 40, 'V', this.blackStyle);
    this.blackX += 38
    this.highGBlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive();
    this.Text = this.add.text(this.blackX -6, this.blackY + 40, 'T', this.blackStyle);
    this.blackX += 38
    this.highABlack = this.physics.add.sprite(this.blackX, this.blackY, 'blackKey').setInteractive();
    this.Text = this.add.text(this.blackX -6, this.blackY + 40, 'P', this.blackStyle);

    this.cBlack.on('pointerdown', function(){
          this.cBlack.sound.play();
        }, this);
    this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    this.dBlack.on('pointerdown', function(){
          this.dBlack.sound.play();
        }, this);
    this.EKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.fBlack.on('pointerdown', function(){
          this.fBlack.sound.play();
        }, this);
    this.YKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);

    this.gBlack.on('pointerdown', function(){
          this.gBlack.sound.play();
        }, this);
    this.UKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);

    this.aBlack.on('pointerdown', function(){
          this.aBlack.sound.play();
        }, this);
    this.IKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

    this.highCBlack.on('pointerdown', function(){
          this.highCBlack.sound.play();
        }, this);
    this.QKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    this.highDBlack.on('pointerdown', function(){
          this.highDBlack.sound.play();
        }, this);
    this.RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    this.highFBlack.on('pointerdown', function(){
          this.highFBlack.sound.play();
        }, this);
    this.VKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);

    this.highGBlack.on('pointerdown', function(){
          this.highGBlack.sound.play();
        }, this);
    this.TKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

    this.highABlack.on('pointerdown', function(){
          this.highABlack.sound.play();
        }, this);
    this.PKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);



    this.cKey.sound = this.sound.add('cNote', {volume: 20})
    this.cBlack.sound = this.sound.add('cisNote', {volume: 20})
    this.dKey.sound = this.sound.add('dNote', {volume: 20})
    this.dBlack.sound = this.sound.add('disNote', {volume: 20})
    this.eKey.sound = this.sound.add('eNote', {volume: 20})
    this.fKey.sound = this.sound.add('fNote', {volume: 20})
    this.fBlack.sound = this.sound.add('fisNote', {volume: 20})
    this.gKey.sound = this.sound.add('gNote', {volume: 20})
    this.gBlack.sound = this.sound.add('gisNote', {volume: 20})
    this.aKey.sound = this.sound.add('aNote', {volume: 20})
    this.aBlack.sound = this.sound.add('aisNote', {volume: 20})
    this.bKey.sound = this.sound.add('bNote', {volume: 20})
    this.highCKey.sound = this.sound.add('^cNote', {volume: 20})
    this.highCBlack.sound = this.sound.add('^cisNote', {volume: 20})
    this.highDKey.sound = this.sound.add('^dNote', {volume: 20})
    this.highDBlack.sound = this.sound.add('^disNote', {volume: 20})
    this.highEKey.sound = this.sound.add('^eNote', {volume: 20})
    this.highFKey.sound = this.sound.add('^fNote', {volume: 20})
    this.highFBlack.sound = this.sound.add('^fisNote', {volume: 20})
    this.highGKey.sound = this.sound.add('^gNote', {volume: 20})
    this.highGBlack.sound = this.sound.add('^gisNote', {volume: 20})
    this.highAKey.sound = this.sound.add('^aNote', {volume: 20})
    this.highABlack.sound = this.sound.add('^aisNote', {volume: 20})
    this.highBKey.sound = this.sound.add('^bNote', {volume: 20})


  }
  update() {

    if(this.AKey.isDown){
      if(!this.cOnce){
      this.cKey.sound.play()
      this.cOnce = true
      }
    }else{
      this.cOnce = false
    }
    if(this.WKey.isDown){
      if(!this.cBOnce){
      this.cBlack.sound.play()
      this.cBOnce = true
      }
    }else{
      this.cBOnce = false
    }

    if(this.SKey.isDown){
      if(!this.dOnce){
        this.dKey.sound.play()
        this.dOnce = true
      }
    }else{
      this.dOnce = false
    }
    if(this.EKey.isDown){
      if(!this.dBOnce){
      this.dBlack.sound.play()
      this.dBOnce = true
      }
    }else{
      this.dBOnce = false
    }

    if(this.DKey.isDown){
      if(!this.eOnce){
      this.eKey.sound.play()
      this.eOnce = true
      }
    }else{
      this.eOnce = false
    }

    if(this.FKey.isDown){
      if(!this.fOnce){
      this.fKey.sound.play()
      this.fOnce = true
      }
    }else{
      this.fOnce = false
    }
    if(this.YKey.isDown){
      if(!this.fBOnce){
      this.fBlack.sound.play()
      this.fBOnce = true
      }
    }else{
      this.fBOnce = false
    }

    if(this.HKey.isDown){
      if(!this.gOnce){
      this.gKey.sound.play()
      this.gOnce = true
      }
    }else{
      this.gOnce = false
    }
    if(this.UKey.isDown){
      if(!this.gBOnce){
      this.gBlack.sound.play()
      this.gBOnce = true
      }
    }else{
      this.gBOnce = false
    }

    if(this.JKey.isDown){
      if(!this.aOnce){
      this.aKey.sound.play()
      this.aOnce = true
      }
    }else{
      this.aOnce = false
    }
    if(this.IKey.isDown){
      if(!this.aBOnce){
      this.aBlack.sound.play()
      this.aBOnce = true
      }
    }else{
      this.aBOnce = false
    }

    if(this.KKey.isDown){
      if(!this.bOnce){
      this.bKey.sound.play()
      this.bOnce = true
      }
    }else{
      this.bOnce = false
    }

    if(this.LKey.isDown){
      if(!this.highCOnce){
      this.highCKey.sound.play()
      this.highCOnce = true
      }
    }else{
      this.highCOnce = false
    }
    if(this.QKey.isDown){
      if(!this.highCBOnce){
      this.highCBlack.sound.play()
      this.highCBOnce = true
      }
    }else{
      this.highCBOnce = false
    }

    if(this.ZKey.isDown){
      if(!this.highDOnce){
      this.highDKey.sound.play()
      this.highDOnce = true
      }
    }else{
      this.highDOnce = false
    }
    if(this.RKey.isDown){
      if(!this.highDBOnce){
      this.highDBlack.sound.play()
      this.highDBOnce = true
      }
    }else{
      this.highDBOnce = false
    }

    if(this.XKey.isDown){
      if(!this.highEOnce){
      this.highEKey.sound.play()
      this.highEOnce = true
      }
    }else{
      this.highEOnce = false
    }

    if(this.CKey.isDown){
      if(!this.highFOnce){
      this.highFKey.sound.play()
      this.highFOnce = true
      }
    }else{
      this.highFOnce = false
    }
    if(this.VKey.isDown){
      if(!this.highFBOnce){
      this.highFBlack.sound.play()
      this.highFBOnce = true
      }
    }else{
      this.highFBOnce = false
    }

    if(this.BKey.isDown){
      if(!this.highGOnce){
      this.highGKey.sound.play()
      this.highGOnce = true
      }
    }else{
      this.highGOnce = false
    }
    if(this.TKey.isDown){
      if(!this.highGBOnce){
      this.highGBlack.sound.play()
      this.highGBOnce = true
      }
    }else{
      this.highGBOnce = false
    }

    if(this.NKey.isDown){
      if(!this.highAOnce){
      this.highAKey.sound.play()
      this.highAOnce = true
      }
    }else{
      this.highAOnce = false
    }
    if(this.PKey.isDown){
      if(!this.highABOnce){
      this.highABlack.sound.play()
      this.highABOnce = true
      }
    }else{
      this.highABOnce = false
    }

    if(this.MKey.isDown){
      if(!this.highBOnce){
      this.highBKey.sound.play()
      this.highBOnce = true
      }
    }else{
      this.highBOnce = false
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

