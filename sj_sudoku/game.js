// Create the mainScene
class mainScene {
  // The three methods currently empty 

  preload() {
    this.load.audio('missClick', 'sj_sudoku/assets/error_CDOxCYm.mp3')
    this.load.audio('tileClick', 'sj_sudoku/assets/tf2-button-click.mp3')
  }

  create() {
    const whiteColor = 0xffffff
    const blackColor = 0x000000

    // create grid + board:

    this.add.rectangle(350, 200, 360, 360, whiteColor, 1)
    for (var i = 0; i < 10; i++) {
      this.add.line((i * 40) + 170, 200, 0, 0, 0, 361, blackColor, 1).setLineWidth(2)
    }
    for (var i = 0; i < 10; i++) {
      this.add.line(350, (i * 40) + 20, 361, 0, 0, 0, blackColor, 1).setLineWidth(2)
    }
    const alpha = 0.5

    for (var n = 0; n < 3; n++) {
      var yPos = 80 + (n * 120)
      for (var i = 0; i < 3; i++) {
        this.add.rectangle(230 + (i * 120), yPos, 116, 116, whiteColor, alpha)
      }
    }

    // create text:
    this.boardLabel = this.add.text(176, 22, '0', { fontSize: 43, color: 'black' }).setOrigin(0, 0).setScale(1.5, 1)

    // create rectangles for interaction:
    this.board = this.add.rectangle(350, 200, 360, 360, '', 0)
    this.physics.add.existing(this.board).setInteractive().on('pointerdown', this.getTile, this)

    // create solution and board, prefilled. Will become empty templates later if algorithms work
    this.RowNames = ["Row1", "Row2", "Row3", "Row4", "Row5", "Row6", "Row7", "Row8", "Row9"]

    this.solution = {
      Row1: [1, 2, 7, 8, 6, 9, 5, 3, 4],
      Row2: [9, 4, 3, 5, 1, 7, 8, 2, 6],
      Row3: [5, 6, 8, 4, 3, 2, 9, 7, 1],
      Row4: [8, 3, 5, 1, 9, 4, 7, 6, 2],
      Row5: [7, 1, 4, 6, 2, 8, 3, 5, 9],
      Row6: [6, 9, 2, 7, 5, 3, 4, 1, 8],
      Row7: [2, 7, 1, 9, 4, 5, 6, 8, 3],
      Row8: [4, 8, 6, 3, 7, 1, 2, 9, 5],
      Row9: [3, 5, 9, 2, 8, 6, 1, 4, 7]
    }

    this.gameBoard = {
      Row1: [1, 0, 7, 8, 6, 0, 5, 0, 4],
      Row2: [0, 0, 3, 5, 0, 7, 0, 0, 0],
      Row3: [5, 0, 8, 0, 0, 0, 0, 0, 0],
      Row4: [8, 0, 0, 0, 0, 0, 7, 6, 0],
      Row5: [0, 0, 4, 0, 2, 8, 3, 0, 9],
      Row6: [6, 9, 2, 7, 0, 3, 0, 0, 8],
      Row7: [0, 7, 1, 9, 0, 5, 6, 0, 3],
      Row8: [0, 0, 6, 0, 0, 0, 0, 9, 5],
      Row9: [3, 0, 9, 2, 8, 0, 1, 4, 7]
    }
  }
  update() {
    this.drawGameBoard()
  }

  /* VVV Put any other functions and code down here VVV */
  drawGameBoard() { // draw/ update board text
    var stringMain = ""
    var stringSub = ""

    for (var n = 0; n < 9; n++) {
      var currentRow = this.RowNames[n]

      for (var i = 0; i < 9; i++) {
        var currentNumb = this.gameBoard[currentRow][i]
        var append
        if (currentNumb == 0) {
          append = " "
        } else {
          append = currentNumb
        }
        stringSub = stringSub + "" + append
      }
      if (n == 0) { stringMain = stringMain + stringSub }
      else { stringMain = stringMain + "\n" + stringSub }

      stringSub = ""
    }
    this.boardLabel.setText(stringMain)
  }

  getTile(input) {
    var xPos = input.downX
    var yPos = input.downY
    // console.log(xPos, yPos)

    var inputY = Math.floor((yPos - 20) / 40)  // nummer van 0 - 8
    var inputX = Math.floor((xPos - 170) / 40) // nummer van 0 - 8
    // console.log(inputY, inputX)

    var inputRowName = this.RowNames[inputY]
    // console.log(this.inputRowName)

    this.currentTile = this.gameBoard[inputRowName][inputX] // number on tile at mouseclick

    console.log(this.currentTile)

    if (this.currentTile != 0) {
      this.sound.play('missClick')
    } else if (this.currentTile == 0) {
      this.sound.play('tileClick')
    } else (
      console.log("uh oh.")
    )
  }
}

// Create the game
new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#919191', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade', arcade: { debug: true } }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

