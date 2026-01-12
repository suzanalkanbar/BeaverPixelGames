// !!!!!! add win and lose screen  !!!! juliann!!!

// Create the mainScene
class mainScene {
  // The three methods currently empty 

  preload() {
    this.load.audio('missClick', 'sj_sudoku/assets/error_CDOxCYm.mp3')
    this.load.audio('tileClick', 'sj_sudoku/assets/tf2-button-click.mp3')
    this.load.audio('wrong', 'sj_sudoku/assets/wrong.mp3')
  }

  create() {
    const whiteColor = 0xffffff
    const blackColor = 0x000000

    // create grid + board:
    if (true) {
      this.board = this.add.rectangle(350, 200, 360, 360, whiteColor, 1)
      this.physics.add.existing(this.board).setInteractive().on('pointerdown', this.getTile, this)

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
    }

    // create tiles + numbers:
    if (true) {
      this.numbers = this.add.rectangle(40, 200, 40, (40 * 9), whiteColor, 1)
      this.physics.add.existing(this.numbers).setInteractive().on('pointerdown', this.getNumber, this)

      for (var i = 0; i < 2; i++) {
        this.add.line((i * 40) + 20, 200, 0, 0, 0, 361, blackColor, 1).setLineWidth(2)
        this.add.line(40, 20 + (i * 360), 44, 0, 0, 0, blackColor, 1).setLineWidth(2)
      }
      for (var i = 0; i < 10; i++) {
        this.add.line(40, 20 + (i * 40), 44, 0, 0, 0, blackColor, 1).setLineWidth(2)
        if (i == 0) { }
        else { this.add.text(28, (i * 40) - 20, i, { fontSize: 43, color: 'black' }) }
      }
    }
    this.selection = this.add.rectangle(40, 200, 36, 36, 0xacfffd, 0.5)
    this.selection.visible = false

    // create text:
    this.boardLabel = this.add.text(350, 200, '0', { fontSize: 43, color: 'black' }).setOrigin(0.5, 0.5).setScale(1.5, 1)

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

    this.errorLabel = this.add.text(620, 40, 'Mistakes: \n0/3', { fontSize: 20, color: 'black' }).setOrigin(0.5, 0.5)
    this.errors = 0
    this.gameover = false

    this.style = { font: '60px Arial', fill: '#1742dc' }
    this.victoryText = this.add.text(350, 200, 'SUDOKU SOLVED!', this.style).setOrigin(0.5, 0.5)
    this.victoryText.depth = 1
    this.victoryText.visible = false

    this.style = { font: '60px Arial', fill: '#e20a0a' }
    this.deathText = this.add.text(350, 200, 'SUDOKU FAILED!', this.style).setOrigin(0.5, 0.5)
    this.deathText.depth = 1
    this.deathText.visible = false

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
    if (!this.gameover) {
      var xPos = input.downX
      var yPos = input.downY

      var inputY = Math.floor((yPos - 20) / 40)  // nummer van 0 - 8
      var inputX = Math.floor((xPos - 170) / 40) // nummer van 0 - 8
      var inputRowName = this.RowNames[inputY]

      var currentTile = this.gameBoard[inputRowName][inputX] // number on tile at mouseclick

      // console.log(currentTile)

      if (currentTile != 0) {
        this.sound.play('missClick')
      } else {
        this.sound.play('tileClick')
        this.changeNumber(inputRowName, inputX)
      }
    }
  }

  getNumber(input) {
    if (!this.gameover) {
      this.sound.play('tileClick')
      var yPos = input.downY
      this.inputNumberY = Math.floor((yPos - 20) / 40) + 1
      // console.log(this.inputNumberY)

      this.selection.setY((this.inputNumberY * 40))
      this.selection.visible = true
    }
  }

  changeNumber(rowName, index) {
    if (this.inputNumberY != undefined) {
      this.gameBoard[rowName][index] = this.inputNumberY

      if (this.gameBoard[rowName][index] != this.solution[rowName][index]) {
        this.delayTimer = this.time.addEvent({
          delay: 500,
          callback: () => { this.gameBoard[rowName][index] = 0 },
          loop: false
        })
        this.sound.play('wrong')
        this.errors++
        this.checkLoseState()
      }
      else {
        this.checkWinState()

      }
    }
  }

  checkWinState() {
    this.winState = true

    for (var n = 0; n < 9; n++) {
      var currentRow = this.RowNames[n]
      for (var i = 0; i < 9; i++) {
        var currentNumb = this.gameBoard[currentRow][i]
        if (currentNumb == 0) {
          this.winState = false
        }
      }
    }
    console.log('winState is: ' + this.winState)

    if (this.winState == true) {
      this.victoryText.visible = true
    }
  }

  checkLoseState() {
    this.errorLabel.setText('Mistakes: \n' + this.errors + '/3')
    if (this.errors > 3) {
      this.deathText.visible = true
      this.gameover = true
    }
  }

}

// Create the game
window.game = new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#919191', // The background color (grey)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade', arcade: { debug: false } }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});

window.restartActiveGame = function () {
  if (window.game && window.game.scene.scenes[0]) {
    window.game.scene.scenes[0].scene.restart();
    gameover = false;
  }
};