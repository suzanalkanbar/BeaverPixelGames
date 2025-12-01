/*
TO DO 
  [ ] 10 x 20 grid where tetris blocks move
  [ ] blocks themselves: orange ricky, blue ricky, hero, teewee, cleveland Z, rhode island Z, smashboy
  [ ] Block falling down + going faster with higher points
  [ ] tweens (?) for when row is done
  [ ] user input:
    [ ] rotate when arrow up OR scroll
    [ ] drop on space bar or lmb press
    [ ] go left/ right with arrows OR follow mouse movement
    [ ] rmb -> store in other grid thing
    [ ] block go down faster on arrow down
  [ ] delay before placing -> do with rotating u can shove it in a nook
  [ ] lose screen -> when block placed higher than grid limit
  [ ] ...
*/

class mainScene {

  preload() {

  }

  create() {
    const whiteColor = 0xffffff
    const blackColor = 0x000000


    // create grid
    this.grid = this.add.rectangle(350, 200, 200, 400, blackColor, 1)

    const alpha = 0.2
    for (var i = 0; i <= 10; i++) {
      this.add.line((i * 20) + 250, 200, 0, 0, 0, 400, whiteColor, alpha).setLineWidth(1)
    }
    for (var i = 0; i <= 20; i++) {
      this.add.line(350, (i * 20) + 20, 200, 0, 0, 0, whiteColor, alpha).setLineWidth(1)
    }

    // next
    this.next = this.add.rectangle(575, 150, 100, 200, blackColor, 1)

    // hold

    // score


  }

  update() {

  }

  /* VVV Put any other functions and code down here VVV */

}

// Create the game
window.game = new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#d5d5d5', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

window.restartActiveGame = function () {
  if (window.game && window.game.scene.scenes[0]) {
    window.game.scene.scenes[0].scene.restart();
    gameover = false;
  }
};

