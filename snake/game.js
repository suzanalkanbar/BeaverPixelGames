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

    this.load.audio('applecrunch', 'snake/assets/apple_bite.wav');
  }

  create() {

    this.ateApple = this.sound.add('applecrunch');

    this.borders = this.physics.add.staticGroup();

    this.borders.create(380, -33.5, "horborder");
    this.borders.create(380, 553.5, "horborder");
    this.borders.create(-24, 260, "verborder");
    this.borders.create(784, 260, "verborder");

    this.velocity = 50 //the speed at which the snake moves. also change this at the function resetGame()


    player = this.physics.add.sprite(300,200, 'snakeSheet', 0);
    //this.body = this.physics.add.sprite(300, 240, 'snakeBody');
    this.apple = this.physics.add.sprite(100, 100, 'apple');

    this.arrow = this.input.keyboard.createCursorKeys(); 

    player.setVelocityY(-this.velocity) 
    //this.body.setVelocityY(-this.velocity) 

    this.physics.add.collider(player, this.borders, this.borderHit)

    this.score = 2;
    this.direction = "up";

    // The style of the text 
    // A lot of options are available, these are the most important ones
    let style = { font: '20px Arial', fill: '#fff' };

    // Display the score in the top left corner
    // Parameters: x position, y position, text, style
    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
    this.speedText = this.add.text(40, 40, this.velocity, style);
  }

  update() {

  if(!gameover){ 
    if (this.arrow.right.isDown && this.direction != "left") {
        // If the right arrow is pressed, move to the right
        this.resetVelocity();
        player.setVelocityX(this.velocity);
        player.setFrame(1);
        this.direction = "right"
        //this.body.setVelocityX(this.velocity);
      } else if (this.arrow.left.isDown && this.direction != "right") {
        // If the left arrow is pressed, move to the left
        this.resetVelocity();
        player.setVelocityX(-this.velocity);
        player.setFrame(3);
        this.direction = "left"
        //this.body.setVelocityX(-this.velocity);
      } 
       // Do the same for vertical movements
      if (this.arrow.down.isDown && this.direction != "up") {
        this.resetVelocity();
        player.setVelocityY(this.velocity);
        player.setFrame(2);
        this.direction = "down"
        //this.body.setVelocityY(this.velocity);
      } else if (this.arrow.up.isDown && this.direction != "down") {
        this.resetVelocity();
        player.setVelocityY(-this.velocity);
        player.setFrame(0);
        this.direction = "up"
        //this.body.setVelocityY(-this.velocity);
      } 

      if (this.physics.overlap(player, this.apple)) {
        // call the apple eaten function
        this.eaten();
      }
    }else{ 
      player.setInteractive().on('pointerdown', function(){
        player.setFrame(0);
        player.x = 300;
        player.y = 200;
        this.apple.x = 100;
        this.apple.y = 100;
        this.velocity = 50;
        this.score = 2;
        player.setVelocityY(-this.velocity);
        this.speedText.setText(this.velocity);
        this.scoreText.setText('score: ' + this.score);
        player.disableInteractive()
        gameover = false;
      }, this)
    }
    }


       /* VVV Put any other functions and code down here VVV */

    eaten(){
      this.ateApple.play();
      this.apple.x = Phaser.Math.Between(100, 600);
      this.apple.y = Phaser.Math.Between(100, 300);
      this.score += 1
      this.scoreText.setText('score: ' + this.score);
      // slowly speeds up the snake (until reaching a velocity of 150 when using if)
      // if(this.score < 29){
        this.velocity = 50 + (25 * (this.score/7)); 
        this.speedText.setText(this.velocity);
      // }
    }

    resetVelocity(){
      player.setVelocityX(0);
      player.setVelocityY(0);
      //this.body.setVelocityX(0);
      //this.body.setVelocityY(0);
    }

    resetGame(){
      player.setFrame(0);
      player.x = 300;
      player.y = 200;
      this.apple.x = 100;
      this.apple.y = 100;
      this.velocity = 50;
      this.score = 2;
      player.setVelocityY(-this.velocity);
      this.speedText.setText(this.velocity);
      this.scoreText.setText('score: ' + this.score);
      player.disableInteractive()
    }

    borderHit(){
      player.setFrame(4);
      player.setVelocityX(0);
      player.setVelocityY(0);
      gameover = true;
      alert("game over!");
      //this.body.setVelocityX(0);
      //this.body.setVelocityY(0);
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

