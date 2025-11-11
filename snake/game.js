var player;
var gameover = false;

// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {

    this.load.image('snakeHead', 'snake/assets/snakehead.png');
    this.load.spritesheet('snakeSheet', 
        'snake/assets/snakesheet.png',
        { frameWidth: 20, frameHeight: 20,}
    );
    this.load.image('snakeBody', 'snake/assets/snakebody.png');
    this.load.image('apple', 'snake/assets/apple.png');
    this.load.image('reset', 'snake/assets/restart.png');
    this.load.image('winner', 'snake/assets/win slangetje.png');

    this.load.audio('applecrunch', 'snake/assets/apple_bite.wav');
    this.load.audio('snakeHiss', 'snake/assets/snake-hissing-6092.wav');
  }

  create() {

    this.ateApple = this.sound.add('applecrunch');
    this.snakeHiss = this.sound.add('snakeHiss');

    this.resetButton = this.physics.add.sprite(350, 300, 'reset')
    this.resetButton.depth = 1;
    this.winner = this.physics.add.sprite(350, 170, 'winner')
    this.winner.depth = 1;

    player = this.physics.add.sprite(290,350, 'snakeSheet', 0);
    this.body = []
    Phaser.Utils.Array.Add(this.body, this.physics.add.sprite(290, 370, 'snakeBody'));
    this.apple = this.physics.add.sprite(110, 110, 'apple');

    this.xApple = [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370, 390, 410, 430, 450, 470, 490, 510, 530, 550, 570, 590, 610, 630, 650, 670, 690]
    this.yApple = [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370, 390]

    this.arrow = this.input.keyboard.createCursorKeys(); 

    this.score = 0;
    this.highScore = 0;
    this.direction = "up";
    this.distance = 20;
    this.staggered = 0;

    // The style of the text 
    // A lot of options are available, these are the most important ones
    let style = { font: '15px Arial', fill: '#fff' };

    // Display the score in the top left corner
    // Parameters: x position, y position, text, style
    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
    this.scoreText.depth = 1;
    this.highScoreText = this.add.text(20, 40, 'highscore: ' + this.highScore, style);
    this.highScoreText.depth = 1;

    style = {font: '70px Arial', fill: '#e17e3b' };
    this.gameoverText = this.add.text(130, 100, 'GAME OVER!', style);
    this.gameoverText.depth = 1;

    style = {font: '50px Arial', fill: '#e4a426' };
    this.winnerText = this.add.text(250, 300, 'WINNER!', style);
    this.winnerText.depth = 1;

    style = {font: '15px Arial', fill: '#e4a426' }
    this.winnerResetText = this.add.text(270, 370, 'click the snake to restart', style);
    this.winnerResetText.depth = 1;
    
  }

  update() {

  if(!gameover){ 
    this.resetButton.visible = false;
    this.winner.visible = false;
    this.winnerText.visible = false;
    this.winnerResetText.visible = false;
    this.gameoverText.visible = false;

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


      if(this.score < 19){
      this.faster = 1* this.score
      }
      
      if(this.staggered == (25 - this.faster)){
      this.move();
      this.staggered = 0;
      }

      this.staggered += 1

      if(this.xDiff < 21 && this.yDiff < 21){
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

      if(this.score > this.highScore){
        this.highScore = this.score
        this.highScoreText.setText('highscore: ' + this.score);
      }

      if(this.score > 696){
        gameover = true;
      }

    }else{ 
      if(this.score > 696){
        this.winner.visible = true;
        this.winnerText.visible = true;
        this.winnerResetText.visible = true;
        this.winner.setInteractive().on('pointerdown', function(){
          for(this.i = 0; this.i < this.body.length; this.i++){
              this.body[this.i].destroy()
          }
          player.setFrame(0);
          this.body = []
          Phaser.Utils.Array.Add(this.body, this.physics.add.sprite(290, 370, 'snakeBody'));
          player.x = 290;
          player.y = 350;
          this.apple.x = 110;
          this.apple.y = 110;
          this.score = 0;
          this.scoreText.setText('score: ' + this.score);
          this.winner.disableInteractive()
          this.winner.visible = false;
          this.winnerText.visible = false;
          this.winnerResetText.visible = false;
          this.direction = "up"
          gameover = false;
        }, this)
      }else{
        this.resetButton.visible = true;
        this.gameoverText.visible = true;
        this.resetButton.setInteractive().on('pointerdown', function(){
          for(this.i = 0; this.i < this.body.length; this.i++){
              this.body[this.i].destroy()
          }
          player.setFrame(0);
          this.body = []
          Phaser.Utils.Array.Add(this.body, this.physics.add.sprite(290, 370, 'snakeBody'));
          player.x = 290;
          player.y = 350;
          this.apple.x = 110;
          this.apple.y = 110;
          this.score = 0;
          this.scoreText.setText('score: ' + this.score);
          this.resetButton.disableInteractive()
          this.resetButton.visible = false;
          this.gameoverText.visible = false;
          this.direction = "up"
          gameover = false;
        }, this)
      }
    }
    }


       /* VVV Put any other functions and code down here VVV */

    move(){
      this.previousX = player.x
      this.previousY = player.y
      if(this.direction == 'up'){
        player.setFrame(0);
        player.y = player.y - this.distance
        if(player.y <= 0){
          player.y += this.distance
          this.borderHit()
        }
      }else if(this.direction == 'down'){
        player.setFrame(2);
        player.y += this.distance
        if(player.y >= 400){
          player.y = player.y - this.distance
          this.borderHit()
        }
      }else if(this.direction == 'left'){
        player.setFrame(3);
        player.x = player.x - this.distance
        if(player.x <= 0){
          player.x += this.distance
          this.borderHit()
        }
      }else if(this.direction == 'right'){
        player.setFrame(1);
        player.x += this.distance
        if(player.x >= 700){
          player.x = player.x - this.distance
          this.borderHit()
        }
      }
      for(this.i = 0; this.i < this.body.length; this.i++){
        if(player.x == this.body[this.i].x && player.y == this.body[this.i].y){
          if(this.direction == 'up'){
              player.y += this.distance
              this.borderHit()
          }else if(this.direction == 'down'){
              player.y = player.y - this.distance
              this.borderHit()
          }else if(this.direction == 'left'){
              player.x += this.distance
              this.borderHit()
          }else if(this.direction == 'right'){
              player.x = player.x - this.distance
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
      }
}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#ecdf7b', // The background color (light yellow)
  scene: mainScene, // The name of the scene we created
  physics: {default: 'arcade',}, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

