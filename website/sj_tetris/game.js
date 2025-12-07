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
    this.load.image('blue_ricky', 'sj_tetris/assets/blue_ricky.png')
    this.load.image('cleveland_z', 'sj_tetris/assets/cleveland_z.png')
    this.load.image('hero', 'sj_tetris/assets/hero.png')
    this.load.image('orange_ricky', 'sj_tetris/assets/orange_ricky.png')
    this.load.image('rhode_island_z', 'sj_tetris/assets/rhode_island_z.png')
    this.load.image('smashboy', 'sj_tetris/assets/smashboy.png')
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
    this.add.text(575, 65, "Next:", { fontSize: 28, color: 'white' }).setOrigin(0.5, 0.5)

    // hold
    this.next = this.add.rectangle(125, 125, 100, 150, blackColor, 1)
    this.add.text(127, 65, "Hold:", { fontSize: 28, color: 'white' }).setOrigin(0.5, 0.5)

    // score
    this.next = this.add.rectangle(125, 300, 225, 150, blackColor, 1)
    this.scoreLabel = this.add.text(25, 235, "Score: 000,000", { fontSize: 24, color: 'white' })
    this.levelLabel = this.add.text(25, 285, "Level: 0", { fontSize: 24, color: 'white' })
    this.linesLabel = this.add.text(25, 335, "Lines: 0", { fontSize: 24, color: 'white' })

    this.score = 0
    this.level = 0
    this.lines = 0

    // create the blocks
    

  }

  update() {

  }

  /* VVV Put any other functions and code down here VVV */
  increaseScore(points) {
    this.score += points
    this.scoreLabel.setText("Score: " + this.score)
  }

  increaseLevel() {
    this.level += 1
    this.levelLabel.setText("Level: " + this.level)
  }

  increaseLines(numbLines) {
    this.lines += numbLines
    this.linesLabel.setText("Lines: " + this.lines)
  }
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

