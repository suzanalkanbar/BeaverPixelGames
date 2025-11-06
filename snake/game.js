// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {

    this.load.image('snakeHead', 'snake/assets/snakehead.png');
    this.load.spritesheet('snakeSheet', 
        'snake/assets/snakesheet.png',
        { frameWidth: 40, frameHeight:40,}
    );
    this.load.image('snakeBody', 'snake/assets/snakebody.png');
    this.load.image('apple', 'snake/assets/apple.png');
  }

  create() {
    this.velocity = 50 //the speed at which the snake moves


    this.player = this.physics.add.sprite(300,200, 'snakeSheet', 0);
    this.body = this.physics.add.sprite(300, 240, 'snakeBody');
    this.apple = this.physics.add.sprite(100, 100, 'apple');

    this.arrow = this.input.keyboard.createCursorKeys(); 

    this.player.setVelocityY(-this.velocity) 
    this.body.setVelocityY(-this.velocity) 

    this.player.setCollideWorldBounds(true);

    this.score = 2;

    // The style of the text 
    // A lot of options are available, these are the most important ones
    let style = { font: '20px Arial', fill: '#fff' };

    // Display the score in the top left corner
    // Parameters: x position, y position, text, style
    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
    this.speedText = this.add.text(40, 40, this.velocity, style);
  }

  update() {

    if (this.arrow.right.isDown) {
        // If the right arrow is pressed, move to the right
        this.resetVelocity();
        this.player.setVelocityX(this.velocity);
        this.player.setFrame(1);
        this.body.setVelocityX(this.velocity);
      } else if (this.arrow.left.isDown) {
        // If the left arrow is pressed, move to the left
        this.resetVelocity();
        this.player.setVelocityX(-this.velocity);
        this.player.setFrame(3);
        this.body.setVelocityX(-this.velocity);
      } 
       // Do the same for vertical movements
      if (this.arrow.down.isDown) {
        this.resetVelocity();
        this.player.setVelocityY(this.velocity);
        this.player.setFrame(2);
        this.body.setVelocityY(this.velocity);
      } else if (this.arrow.up.isDown) {
        this.resetVelocity();
        this.player.setVelocityY(-this.velocity);
        this.player.setFrame(0);
        this.body.setVelocityY(-this.velocity);
      } 

      if (this.physics.overlap(this.player, this.apple)) {
        // call the apple eaten function
        this.eaten();
      }
    }


       /* VVV Put any other functions and code down here VVV */

    eaten(){
      this.apple.x = Phaser.Math.Between(100, 600);
      this.apple.y = Phaser.Math.Between(100, 300);
      this.score += 1
      this.scoreText.setText('score: ' + this.score);
      // slowly speeds up the snake until reaching a velocity of 150
      if(this.score < 29){
        this.velocity = 50 + (25 * (this.score/7)); 
        this.speedText.setText(this.velocity);
      }
    }

    resetVelocity(){
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
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

