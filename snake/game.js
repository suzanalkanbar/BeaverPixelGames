// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    /*     
    This method is called once at the beginning
    It will load all the assets, like sprites and sounds
    
    use this line of code to 'preload' your sprites:
    this.load.image('player', 'game_template/assets/player.png'); 

    give it a name, which is 'player' in this instance
    don't forget to change the directory (folder/folder/file.png)
    */
    this.load.image('snakeHead', 'snake/assets/snakehead.png');
    this.load.image('snakeBody', 'snake/assets/snakebody.png');
    this.load.image('apple', 'snake/assets/apple.png');
  }

  create() {
    /* 
    This method is called once, just after preload()
    It will initialize our scene, like the positions of the sprites
    
    use this line of code to 'create' your sprites at a certain position: 
    this.player = this.physics.add.sprite(100, 100, 'player');
    */
    this.velocity = 50
    this.player = this.physics.add.sprite(300, 200, 'snakeHead');
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
  }

  update() {
    /* 
    This method is called 60 times per second after create() 
    It will handle all the game's logic, like movements
    */
   

   /* VVV Put any other functions and code down here VVV */

    if (this.arrow.right.isDown) {
        // If the right arrow is pressed, move to the right
        this.resetVelocity();
        this.player.setVelocityX(this.velocity);
        this.body.setVelocityX(this.velocity);
      } else if (this.arrow.left.isDown) {
        // If the left arrow is pressed, move to the left
        this.resetVelocity();
        this.player.setVelocityX(-this.velocity);
        this.body.setVelocityX(-this.velocity);
      } 
       // Do the same for vertical movements
      if (this.arrow.down.isDown) {
        this.resetVelocity();
        this.player.setVelocityY(this.velocity);
        this.body.setVelocityY(this.velocity);
      } else if (this.arrow.up.isDown) {
        this.resetVelocity();
        this.player.setVelocityY(-this.velocity);
        this.body.setVelocityY(-this.velocity);
      } 

      if (this.physics.overlap(this.player, this.apple)) {
        // Call the new hit() method
        this.eaten();
      }
    }

    eaten(){
      this.apple.x = Phaser.Math.Between(100, 600);
      this.apple.y = Phaser.Math.Between(100, 300);
      this.score += 1
      this.scoreText.setText('score: ' + this.score);
      if(this.score == 5){
        this.velocity = 80
      }else if (this.score == 10){
        this.velocity = 100
      }else if (this.score == 15){
        this.velocity == 140
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

