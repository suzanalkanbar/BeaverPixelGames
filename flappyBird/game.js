// Create our only scene called mainScene, in the game.js file
var x = 0;
pipes = [];
var hiScore = 0;
var mode = 0;
var speed = 0;
var letGo = true;
class mainScene {
  // The three methods currently empty
  preload() {
    // This method is called once at the beginning
    // It will load all the assets, like sprites and sounds  
    this.load.image('player', 'flappyBird/assets/player.png');
  }
  create() {

    // This method is called once, just after preload()
    // It will initialize our scene, like the positions of the sprites
    this.player = this.physics.add.sprite(100, 210, 'player');
    const ph1 = this.add.rectangle(750,0,80,38,0xff0000);
    const ph2 = this.add.rectangle(1050,0,80,400,0xff0000);
    const ph3 = this.add.rectangle(1350,0,80,100,0xff0000);
    const ph4 = this.add.rectangle(750,350,80,362,0xff0000);
    const ph5 = this.add.rectangle(1050,350,80,100,0xff0000);
    const ph6 = this.add.rectangle(1350,350,80,400,0xff0000);
    pipes = [ph1,ph2,ph3,ph4,ph5,ph6];
    this.physics.world.enable(pipes,0);
    const groundHitbox = this.add.rectangle(350,400,700,100,0x00ff00);
    this.groundHitbox = this.physics.add.existing(groundHitbox,0);
    // Store the score in a variable, initialized at 0
    this.score = 0;

    // The style of the text 
    // A lot of options are available, these are the most important ones
    let style = { font: '20px Arial', fill: '#fff' };

    // Display the score in the top left corner
    // Parameters: x position, y position, text, style
    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
    this.hiScoreText = this.add.text(20, 40, 'high score: ' + hiScore, style);
    this.arrow = this.input.keyboard.createCursorKeys();


  }
  update() {
    // This method is called 60 times per second after create() 
    // It will handle all the game's logic, like movements

    // Do the same for vertical movements
    if (mode == 0) {
      speed = 0.5*Math.sin(0.03125 * x * Math.PI);
      x++
      this.player.y -= speed;
      if (this.arrow.up.isDown) {
        x = 0;
        mode = 1;
        speed = 20;
        letGo = false;
      }
    } else if (mode == 1) {
      for (var i = 0;i<6;i++){
        pipes[i].x -= 1
        if (pipes[i].x == 100){
          this.score += 0.5;
          this.scoreText.setText('score: ' + this.score);
          if (this.score > hiScore){
            hiScore = this.score
            this.hiScoreText.setText('high score: ' + hiScore)
          }
        }
        if(pipes[i].x<=-150){
          pipes[i].x = 750
          if(pipes[i].y==350){
            var newSize = 2*Math.round(Math.random()*250)
            pipes[i-3].displayHeight = newSize
            pipes[i].displayHeight = 530-pipes[i-3].displayHeight
            console.log(pipes[i-3])
            console.log(pipes[i])
          }
        }
        if (this.physics.overlap(this.player,pipes[i]) || (this.player.y<0 && pipes[i].x == 140)){
          mode = 2;
        }
      }
      if (this.physics.overlap(this.player,this.groundHitbox)){
        mode = 2;
      }
      if (this.arrow.up.isDown && letGo) {
        speed = 20;
        letGo = false;
      }
      if (!this.arrow.up.isDown) {
        letGo = true;
      }
      this.player.y -= 0.1 * speed;
      speed -= 0.8;
    } else if (mode == 2) {
      this.add.text(200,200,'Press the space bar to restart',{ font: '20px Arial', fill: '#fff' })
      if(this.physics.overlap(this.player,this.groundHitbox)){
        speed = 0;
      } else{
      this.player.y -= 0.1 * speed;
      speed -= 0.8;
      }
      if (this.arrow.space.isDown){
        this.scene.restart()
        mode = 0
      }
    }
  }
}

new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#3498db', // The background color (blue)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'Hoppy Cat', // Create the game inside the <div id="game"> 
});