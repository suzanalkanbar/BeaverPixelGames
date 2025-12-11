// https://www.youtube.com/watch?v=n0jZRlhLtt0 <- guide used
// Create the mainScene
class mainScene {

  init() {
    // colours
    this.white = 0xffffff
    this.darkgrey = 0x5f5f5f
    this.lightgrey = 0xc0c0c0
    this.green = 0x29f500
    this.darkgreen = 0x0f5a00
    this.blue = 0x0000ff
    this.red = 0xff0000
    this.yellow = 0x00ff00
    this.bgcolour = 0xced25e

    // constants
    this.screenWidth = 700
    this.screenHeight = 400

    this.tilescale = 1.6
    this.tilesize = 16 * this.tilescale // original img is 16x16 px
    this.rowsX = 15
    this.colsY = 15
    this.amount_mines = 5 // 30 in normal game
    this.witdh = this.tilesize * this.rowsX
    this.height = this.tilesize * this.colsY
  }

  preload() {
    this.load.image('Tile1', 'sj_minesweeper/assets/Tile1.png')
    this.load.image('Tile2', 'sj_minesweeper/assets/Tile2.png')
    this.load.image('Tile3', 'sj_minesweeper/assets/Tile3.png')
    this.load.image('Tile4', 'sj_minesweeper/assets/Tile4.png')
    this.load.image('Tile5', 'sj_minesweeper/assets/Tile5.png')
    this.load.image('Tile6', 'sj_minesweeper/assets/Tile6.png')
    this.load.image('Tile7', 'sj_minesweeper/assets/Tile7.png')
    this.load.image('Tile8', 'sj_minesweeper/assets/Tile8.png')

    this.load.image('TileEmpty', 'sj_minesweeper/assets/TileEmpty.png')
    this.load.image('TileExploded', 'sj_minesweeper/assets/TileExploded.png')
    this.load.image('TileFlag', 'sj_minesweeper/assets/TileFlag.png')
    this.load.image('TileMine', 'sj_minesweeper/assets/TileMine.png')
    this.load.image('TileNotMine', 'sj_minesweeper/assets/TileNotMine.png')
    this.load.image('TileUnknown', 'sj_minesweeper/assets/TileUnknown.png')
  }

  create() {

    // tile numbers (makkelijker te gebruiken)
    this.tile_numbers = ['Tile1', 'Tile2', 'Tile3', 'Tile4', 'Tile5', 'Tile6', 'Tile7', 'Tile8']
    this.TileEmpty = 'TileEmpty'
    this.TileExploded = 'TileExploded'
    this.TileFlag = 'TileFlag'
    this.TileMine = 'TileMine'
    this.TileNotMine = 'TileNotMine'
    this.TileUnknown = 'TileUnknown'

    // add interactive square
    this.interactiveBoard = this.add.rectangle(
      (this.screenWidth / 2 - this.witdh / 2 + this.tilesize / 2),
      (this.screenHeight / 2 - this.height / 2),
      this.witdh, this.height, this.white, 1).setOrigin(0, 0)
    this.physics.add.existing(this.interactiveBoard).setInteractive().on('pointerdown', this.getTile, this)

    this.gameGrid = []
    this.createEmptyGrid()
    this.placeMines()
    this.placeClues()

    // voor single console log :3 as a treat
    this.n = 0
  }

  update() {

    // voor single console log :3 as a treat
    if (this.n == 0) {
      console.log(this.gameGrid[0].frame.texture.key)
    }
    this.n = 1


  }

  /* VVV Put any other functions and code down here VVV */
  createTile(object, x, y, imgName, type) {
    // Types list for grid:
    //    '.' -> unknown
    //    'X' -> mine
    //    'C' -> clue
    //    '/' -> empty 
    object = this.add.image(0, 0, imgName).setScale(this.tilescale)
    object.x = this.tilesize * x + (this.screenWidth / 2 - this.witdh / 2 + this.tilesize)
    object.y = this.tilesize * y + (this.screenHeight / 2 - this.height / 2 + this.tilesize / 2)
    object.type = type

    object.revealed = false
    object.flagged = false

    return object
  }

  createEmptyGrid() {
    var imageName = this.TileEmpty

    for (var n = 0; n < this.rowsX; n++) {
      for (var i = 0; i < this.colsY; i++) {
        this.currentTile
        this.newTile = this.createTile(this.currentTile, n, i, imageName, '.')

        this.gameGrid.push(this.newTile)
      }
    }
  }

  placeMines() {
    for (var i = 0; i < this.amount_mines; i++) {
      while (true) {
        var x = Phaser.Math.Between(0, this.rowsX - 1)
        var y = Phaser.Math.Between(0, this.colsY - 1)
        var index = y * this.colsY + x
        //console.log(index)

        if (this.gameGrid[index].type == '.') {
          this.gameGrid[index] = this.add.image(
            this.tilesize * x + (this.screenWidth / 2 - this.witdh / 2 + this.tilesize),
            this.tilesize * y + (this.screenHeight / 2 - this.height / 2 + this.tilesize / 2),
            this.TileMine) // <- change to unknown when not testing. this.TileMine when testing
            .setScale(this.tilescale)
          this.gameGrid[index].type = 'X'
          //console.log(this.gameGrid[index])
          break
        }
      }
    }
  }

  placeClues() {
    for (var x = 0; x < this.rowsX; x++) {
      for (var y = 0; y < this.colsY; y++) {
        var currentIndex = y * this.colsY + x
        if (this.gameGrid[currentIndex].type != 'X') {
          this.total_mines = this.check_neighbours(x,y)
          console.log(this.total_mines)
        }
      }
    }
  }

  is_inside(x, y) {
    return 0 <= x <= this.rowsX && 0 <= y <= this.colsY
  }

  check_neighbours(x, y) {
    var total_mines = 0
    for (var x_offset = -1; x_offset < 2; x_offset++) {
      for (var y_offset = -1; y_offset < 2; y_offset++) {
        var neighbour_x = x + x_offset
        var neighbour_y = y + y_offset

        
        var currentIndex = neighbour_y  + neighbour_x +2
        //console.log(currentIndex) // <- wrong!

        if (this.is_inside(neighbour_x, neighbour_y) && this.gameGrid[currentIndex].type == 'X') {
          total_mines += 1
        }
      }
    }
    return total_mines
  }

  getTile(input) {
    var xPos = input.downX
    var yPos = input.downY

    var inputX = Math.floor((xPos - (((this.screenWidth - this.witdh) / 2) + this.tilesize / 2)) / this.tilesize)
    var inputY = Math.floor((yPos - ((this.screenHeight - this.height) / 2)) / this.tilesize)

    var currentIndex = inputY * this.colsY + inputX
    var currentTile = this.gameGrid[currentIndex]

    console.log(currentTile)

    // if (currentTile != 0) {
    //     this.sound.play('missClick')
    //   } else {
    //     this.sound.play('tileClick')
    //     this.changeNumber(inputRowName, inputX)
    //   }
  }
}

// Create the game
window.game = new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#919191', // The background color (grey)
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

