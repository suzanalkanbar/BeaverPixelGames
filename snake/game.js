var player;
var gameover = false;

// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {

    this.load.image('snakeHead', 'snake/assets/snakehead.png');
    this.load.spritesheet('snakeSheet', 
        'snake/assets/snakesheet.png',
        { frameWidth: 40, frameHeight:40,}
    );
    this.load.image('horborder', 'snake/assets/horizontal border.png');
    this.load.image('verborder', 'snake/assets/vertical border.png');
    this.load.image('snakeBody', 'snake/assets/snakebody.png');
    this.load.image('apple', 'snake/assets/apple.png');
    this.load.image('reset', 'snake/assets/restart.png');

    this.load.audio('applecrunch', 'snake/assets/apple_bite.wav');
    this.load.audio('snakeHiss', 'snake/assets/snake-hissing-6092.wav');
  }

  create() {

    this.ateApple = this.sound.add('applecrunch');
    this.snakeHiss = this.sound.add('snakeHiss');

    this.borders = this.physics.add.staticGroup();

    this.borders.create(380, -33.5, "horborder");
    this.borders.create(380, 553.5, "horborder");
    this.borders.create(-24, 260, "verborder");
    this.borders.create(784, 260, "verborder");

    this.resetButton = this.physics.add.sprite(380, 260, 'reset')
    this.resetButton.depth = 1;

    player = this.physics.add.sprite(300,340, 'snakeSheet', 0);
    this.body = []
    Phaser.Utils.Array.Add(this.body, this.physics.add.sprite(300, 380, 'snakeBody'));
    this.apple = this.physics.add.sprite(100, 100, 'apple');

    this.xApple = [20, 60, 100, 140, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540, 580, 620, 660, 700, 740]
    this.yApple = [20, 60, 100, 140, 180, 220, 260, 300, 340, 380, 420, 460, 500]

    this.arrow = this.input.keyboard.createCursorKeys(); 

    this.score = 0;
    this.direction = "up";
    this.staggered = 0;

    // The style of the text 
    // A lot of options are available, these are the most important ones
    let style = { font: '20px Arial', fill: '#fff' };

    // Display the score in the top left corner
    // Parameters: x position, y position, text, style
    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
    this.scoreText.depth = 1;
  }

  update() {

  if(!gameover){ 
    this.resetButton.visible = false;
    if(Phaser.Math.Between(0, 300) == 1){
      this.snakeHiss.play()
    }

    if (this.arrow.right.isDown && this.direction != "left") {
        this.direction = "right"
      } else if (this.arrow.left.isDown && this.direction != "right") {
        this.direction = "left"
      } else if (this.arrow.down.isDown && this.direction != "up") {
        this.direction = "down"
      } else if (this.arrow.up.isDown && this.direction != "down") {
        this.direction = "up"
      } 

      this.xDiff = Math.abs(player.x - this.apple.x)
      this.yDiff = Math.abs(player.y - this.apple.y) 


      if(this.score < 18){
      this.faster = 1* this.score
      }
      
      if(this.staggered == (28 - this.faster)){
      this.move();
      this.staggered = 0;
      }

      this.staggered += 1

      if(this.xDiff < 41 && this.yDiff < 41){
        if(this.direction == 'up'){
      player.setFrame(8);
      }else if(this.direction == 'left'){
        player.setFrame(9)
      }else if(this.direction == 'down'){
        player.setFrame(10)
      }else if(this.direction == 'right'){
        player.setFrame(11)
      }
      }
      

      if (this.physics.overlap(player, this.apple)) {
        // call the apple eaten function
        this.eaten();
      }
      if(this.physics.overlap(this.body, this.apple)){
        this.apple.x = this.xApple[Phaser.Math.Between(0, this.xApple.length - 1)];
        this.apple.y = this.yApple[Phaser.Math.Between(0, this.yApple.length - 1)];
      }

    }else{ 
      this.resetButton.visible = true;
      this.resetButton.setInteractive().on('pointerdown', function(){
        for(this.i = 0; this.i < this.body.length; this.i++){
          this.body[this.i].destroy()
        }
        player.setFrame(0);
        this.body = []
        Phaser.Utils.Array.Add(this.body, this.physics.add.sprite(300, 380, 'snakeBody'));
        player.x = 300;
        player.y = 340;
        this.apple.x = 100;
        this.apple.y = 100;
        this.score = 0;
        this.scoreText.setText('score: ' + this.score);
        this.resetButton.disableInteractive()
        this.resetButton.visible = false;
        this.direction = "up"
        gameover = false;
      }, this)
    }
    }


       /* VVV Put any other functions and code down here VVV */

    move(){
      this.previousX = player.x
      this.previousY = player.y
      if(this.direction == 'up'){
        player.setFrame(0);
        player.y = player.y - 40
        if(player.y <= 0){
          player.y += 40
          this.borderHit()
        }
      }else if(this.direction == 'down'){
        player.setFrame(2);
        player.y += 40
        if(player.y >= 520){
          player.y = player.y - 40
          this.borderHit()
        }
      }else if(this.direction == 'left'){
        player.setFrame(3);
        player.x = player.x - 40
        if(player.x <= 0){
          player.x += 40
          this.borderHit()
        }
      }else if(this.direction == 'right'){
        player.setFrame(1);
        player.x += 40
        if(player.x >= 760){
          player.x = player.x - 40
          this.borderHit()
        }
      }
      for(this.i = 0; this.i < this.body.length; this.i++){
        if(player.x == this.body[this.i].x && player.y == this.body[this.i].y){
          if(this.direction == 'up'){
              player.y += 40
              this.borderHit()
          }else if(this.direction == 'down'){
              player.y = player.y - 40
              this.borderHit()
          }else if(this.direction == 'left'){
              player.x += 40
              this.borderHit()
          }else if(this.direction == 'right'){
              player.x = player.x - 40
              this.borderHit()
          }
        }
      }
      if(!gameover){
        for(this.i = 0; this.i < this.body.length; this.i++){
          this.moveToX = this.previousX
          this.moveToY = this.previousY
          this.previousX = this.body[this.i].x
          this.previousY = this.body[this.i].y
          this.body[this.i].x = this.moveToX
          this.body[this.i].y = this.moveToY
        }
      }
      
    }

    eaten(){
      this.ateApple.play();
      this.apple.x = this.xApple[Phaser.Math.Between(0, this.xApple.length - 1)];
      this.apple.y = this.yApple[Phaser.Math.Between(0, this.yApple.length - 1)];
      this.score += 1
      this.scoreText.setText('score: ' + this.score);
      Phaser.Utils.Array.Add(this.body, this.physics.add.sprite(this.previousX, this.previousY, 'snakeBody'));
    }

    borderHit(){
      if(this.direction == 'up'){
      player.setFrame(4);
      }else if(this.direction == 'left'){
        player.setFrame(5)
      }else if(this.direction == 'down'){
        player.setFrame(6)
      }else if(this.direction == 'right'){
        player.setFrame(7)
      }
      gameover = true;
      alert("game over!");
      }
}

// Create the game
new Phaser.Game({
  width: 760, // Width of the game in pixels
  height: 520, // Height of the game in pixels
  backgroundColor: '#ecdf7b', // The background color (light yellow)
  scene: mainScene, // The name of the scene we created
  physics: {default: 'arcade',}, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

