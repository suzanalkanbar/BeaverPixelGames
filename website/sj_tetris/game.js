/*
TO DO 
  [ ] 10 x 20 grid where tetris blocks move
  [ ] blocks themselves: orange ricky, blue ricky, hero, teewee, cleveland Z, rhode island Z, smashboy
  [ ] Block falling down + going faster with higher points
  [ ] tweens (?) for when row is done
  [ ] user input:
    [ ] rotate when arrow up OR scroll
    [ ] drop on space bar or lmb press
    [ ] go left/ right with arrows 
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

    this.load.image('blue_ricky_block', 'sj_tetris/assets/blue_ricky_block.png')
    this.load.image('cleveland_z_block', 'sj_tetris/assets/cleveland_z_block.png')
    this.load.image('hero_block', 'sj_tetris/assets/hero_block.png')
    this.load.image('orange_ricky_block', 'sj_tetris/assets/orange_ricky_block.png')
    this.load.image('rhode_island_z_block', 'sj_tetris/assets/rhode_island_z_block.png')
    this.load.image('smashboy_block', 'sj_tetris/assets/smashboy_block.png')
  }

  create() {
    const whiteColor = 0xffffff
    const blackColor = 0x000000

    // create grid art
    this.grid = this.add.rectangle(350, 200, 200, 400, blackColor, 1)

    const alpha = 0.2
    for (var i = 0; i <= 10; i++) {
      this.add.line((i * 20) + 250, 200, 0, 0, 0, 400, whiteColor, alpha).setLineWidth(1)
    }
    for (var i = 0; i <= 20; i++) {
      this.add.line(350, (i * 20) + 20, 200, 0, 0, 0, whiteColor, alpha).setLineWidth(1)
    }

    // next art
    this.next = this.add.rectangle(575, 150, 100, 200, blackColor, 1)
    this.add.text(575, 65, "Next:", { fontSize: 28, color: 'white' }).setOrigin(0.5, 0.5)

    // hold art
    this.next = this.add.rectangle(125, 125, 100, 150, blackColor, 1)
    this.add.text(127, 65, "Hold:", { fontSize: 28, color: 'white' }).setOrigin(0.5, 0.5)

    // score art
    this.next = this.add.rectangle(125, 300, 225, 150, blackColor, 1)
    this.scoreLabel = this.add.text(25, 235, "Score: 000,000", { fontSize: 24, color: 'white' })
    this.levelLabel = this.add.text(25, 285, "Level: 0", { fontSize: 24, color: 'white' })
    this.linesLabel = this.add.text(25, 335, "Lines: 0", { fontSize: 24, color: 'white' })

    this.score = 0
    this.level = 0
    this.lines = 0

    // movement of blocks
    this.gridNames = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12', 'R13', 'R14', 'R15', 'R16', 'R17', 'R18', 'R19', 'R20',]
    this.gameGrid = { // grid of 10 x 20, R1 - R20
      R1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R11: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R12: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R13: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R14: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R15: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R16: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R17: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R18: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R19: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      R20: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    this.distance = 20
    this.staggered = 0
    this.staggerMax = 30

    // input from player
    this.arrow = this.input.keyboard.createCursorKeys()
  }

  update() {

    this.spawnBlock()

    if (this.staggered == this.staggerMax) {
      this.block.y = this.block.y + this.distance
      this.staggered = 0;
    }
    this.staggered += 1

    this.handleUserInput()
    this.checkGridPlacement()
    this.checkBorders()
  }

  /* VVV Put any other functions and code down here VVV */
  spawnBlock() {
    this.block = this.physics.add.image(260, 10, 'smashboy_block').setOrigin(0.5, 0.5)
  }

  handleUserInput() {
    if (this.arrow.right.isDown) {
      this.block.x += 20
    } else if (this.arrow.left.isDown) {
      this.block.x -= 20
    }

    if (this.arrow.down.isDown) {
      this.distance = 40
    } else {
      this.distance = 20
    }
  }

  checkGridPlacement() {
    var yPos = Math.floor((this.block.y - 10) / 20)  // nummer van 0 - 19
    var inputRowName = this.gridNames[yPos]          // string met R1 - R20

    var xPos = Math.floor((this.block.x - 260) / 20) // nummer van -1 - 10
    if (xPos <= -1) {
      xPos = 0
    } else if (xPos >= 10) {
      xPos = 9
    }
    var currentTile = this.gameGrid[inputRowName][xPos]
  }

  checkBorders() {
    if (this.block.y >= 390) {
      this.distance = 0
      this.block.y = 390
    }
    if (this.block.x >= 440) {
      this.block.x = 440
    } else if (this.block.x <= 260) {
      this.block.x = 260
    }
  }

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
  backgroundColor: '#d5c9a8', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade', arcade: { debug: true } }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

window.restartActiveGame = function () {
  if (window.game && window.game.scene.scenes[0]) {
    window.game.scene.scenes[0].scene.restart();
    gameover = false;
  }
};

