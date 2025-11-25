// Create the mainScene
class mainScene {
  // The three methods currently empty 

  preload() {
    /*     
    This method is called once at the beginning
    It will load all the assets, like sprites and sounds
    */

  }

  create() {
    /* 
    This method is called once, just after preload()
    It will initialize our scene, like the positions of the sprites
    */

    const whiteColor = 0xffffff
    const blackColor = 0x000000

    // create grid + board:
    if (true) {
      this.add.rectangle(350, 200, 360, 360, whiteColor, 1)
      for (var i = 0; i < 10; i++) {
        this.add.line((i * 40) + 170, 200, 0, 0, 0, 361, blackColor, 1).setLineWidth(2)
      }
      for (var i = 0; i < 10; i++) {
        this.add.line(350, (i * 40) + 20, 361, 0, 0, 0, blackColor, 1).setLineWidth(2)
      }
      const alpha = 0.5
      this.add.rectangle(230, 80, 116, 116, whiteColor, alpha) // 1
      this.add.rectangle(350, 80, 116, 116, whiteColor, alpha) // 2
      this.add.rectangle(470, 80, 116, 116, whiteColor, alpha) // 3
      this.add.rectangle(230, 200, 116, 116, whiteColor, alpha) // 4
      this.add.rectangle(350, 200, 116, 116, whiteColor, alpha) // 5
      this.add.rectangle(470, 200, 116, 116, whiteColor, alpha) // 6
      this.add.rectangle(230, 320, 116, 116, whiteColor, alpha) // 7
      this.add.rectangle(350, 320, 116, 116, whiteColor, alpha) // 8
      this.add.rectangle(470, 320, 116, 116, whiteColor, alpha) // 9
    }

    // create text:
    if (true) {
      this.boardLabel = this.add.text(177, 22, '0', { fontSize: 43, color: 'black' }).setOrigin(0, 0)

      // this.Hor1Label = this.add.text(190, 200, 'text', {
      //   fontSize: 43, color: 'black'
      // }).setOrigin(0.5, 0.5)
      // this.Hor2Label = this.add.text(230, 200, 'text', {
      //   fontSize: 43, color: 'black'
      // }).setOrigin(0.5, 0.5)
      // this.Hor3Label = this.add.text(270, 200, 'text', {
      //   fontSize: 43, color: 'black'
      // }).setOrigin(0.5, 0.5)
      // this.Hor4Label = this.add.text(310, 200, 'text', {
      //   fontSize: 43, color: 'black'
      // }).setOrigin(0.5, 0.5)
      // this.Hor5Label = this.add.text(350, 200, 'text', {
      //   fontSize: 43, color: 'black'
      // }).setOrigin(0.5, 0.5)
      // this.Hor6Label = this.add.text(390, 200, 'text', {
      //   fontSize: 43, color: 'black'
      // }).setOrigin(0.5, 0.5)
      // this.Hor7Label = this.add.text(430, 200, 'text', {
      //   fontSize: 43, color: 'black'
      // }).setOrigin(0.5, 0.5)
      // this.Hor8Label = this.add.text(470, 200, 'text', {
      //   fontSize: 43, color: 'black'
      // }).setOrigin(0.5, 0.5)
      // this.Hor9Label = this.add.text(510, 200, 'text', {
      //   fontSize: 43, color: 'black'
      // }).setOrigin(0.5, 0.5)
    }

    // create rectangles for interaction:
    this.board = this.add.rectangle(350, 200, 360, 360, '', 0)
    this.physics.add.existing(this.board).setInteractive().on('pointerdown', this.getTile, this)


  }
  update() {
    this.solution = {
      Hor1: [1, 2, 7, 8, 6, 9, 5, 3, 4],
      Hor2: [9, 4, 3, 5, 1, 7, 8, 2, 6],
      Hor3: [5, 6, 8, 4, 3, 2, 9, 7, 1],
      Hor4: [8, 3, 5, 1, 9, 4, 7, 6, 2],
      Hor5: [7, 1, 4, 6, 2, 8, 3, 5, 9],
      Hor6: [6, 9, 2, 7, 5, 3, 4, 1, 8],
      Hor7: [2, 7, 1, 9, 4, 5, 6, 8, 3],
      Hor8: [4, 8, 6, 3, 7, 1, 2, 9, 5],
      Hor9: [3, 5, 9, 2, 8, 6, 1, 4, 7]
    }

    this.gameBoard = {
      Hor1: [1, 0, 7, 8, 6, 0, 5, 0, 4],
      Hor2: [0, 0, 3, 5, 0, 7, 0, 0, 0],
      Hor3: [5, 0, 8, 0, 0, 0, 0, 0, 0],
      Hor4: [8, 0, 0, 0, 0, 0, 7, 6, 0],
      Hor5: [0, 0, 4, 0, 2, 8, 3, 0, 9],
      Hor6: [6, 9, 2, 7, 0, 3, 0, 0, 8],
      Hor7: [0, 7, 1, 9, 0, 5, 6, 0, 3],
      Hor8: [0, 0, 6, 0, 0, 0, 0, 9, 5],
      Hor9: [3, 0, 9, 2, 8, 0, 1, 4, 7]
    }

    this.drawBoard(this.gameBoard)

  }

  /* VVV Put any other functions and code down here VVV */

  drawBoard(board) { // draw/ update board text
    var horNames = ["Hor1", "Hor2", "Hor3", "Hor4", "Hor5", "Hor6", "Hor7", "Hor8", "Hor9"]

    for(var i = 0; i < 81; i ++) {
      var currentIndex = Math.floor(i / 9)
      var text = ""
      text = text + this.gameBoard[horNames[currentIndex]][currentIndex]
    }
    this.boardLabel.setText(text)

    // this.Hor1Label.setText(board.Hor1)
    // this.Hor2Label.setText(board.Hor2)
    // this.Hor3Label.setText(board.Hor3)
    // this.Hor4Label.setText(board.Hor4)
    // this.Hor5Label.setText(board.Hor5)
    // this.Hor6Label.setText(board.Hor6)
    // this.Hor7Label.setText(board.Hor7)
    // this.Hor8Label.setText(board.Hor8)
    // this.Hor9Label.setText(board.Hor9)
  }

  getTile(input) {
    var xPos = input.downX
    var yPos = input.downY
    //console.log(xPos, yPos)

    this.inputVert = Math.floor((yPos - 20) / 40)
    // console.log(this.inputVert)

    var horNames = ["Hor1", "Hor2", "Hor3", "Hor4", "Hor5", "Hor6", "Hor7", "Hor8", "Hor9"]
    var inputHor = Math.floor((xPos - 170) / 40)
    this.inputHorName = horNames[inputHor]
    // console.log(this.inputVertName)

    console.log(this.gameBoard[this.inputHorName][this.inputVert])


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

