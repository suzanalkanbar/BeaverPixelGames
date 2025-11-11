// Create the mainScene
class mainScene {
  // The three methods currently empty

  preload() {
    /*     
    This method is called once at the beginning
    It will load all the assets, like sprites and sounds
    */

    this.load.image('red', 'assets/red.jpg')
  }

  create() {
    /* 
    This method is called once, just after preload()
    It will initialize our scene, like the positions of the sprites
    */

    this.red = this.physics.add.sprite(60, 60, 'red')

  }
  update() {
    /* 
    This method is called 60 times per second after create() 
    It will handle all the game's logic, like movements


  }

  /* VVV Put any other functions and code down here VVV */

}
}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#167782', // The background color
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

