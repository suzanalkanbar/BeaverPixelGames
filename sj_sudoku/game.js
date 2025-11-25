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

    // create grid + board:
    if (true) {
      const whiteColor = 0xffffff
      const blackColor = 0x000000

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
      this.column1Label = this.add.text(190, 200, 'text', {
        fontSize: 43, color: 'black'
      }).setOrigin(0.5, 0.5)
      this.column2Label = this.add.text(230, 200, 'text', {
        fontSize: 43, color: 'black'
      }).setOrigin(0.5, 0.5)
      this.column3Label = this.add.text(270, 200, 'text', {
        fontSize: 43, color: 'black'
      }).setOrigin(0.5, 0.5)
      this.column4Label = this.add.text(310, 200, 'text', {
        fontSize: 43, color: 'black'
      }).setOrigin(0.5, 0.5)
      this.column5Label = this.add.text(350, 200, 'text', {
        fontSize: 43, color: 'black'
      }).setOrigin(0.5, 0.5)
      this.column6Label = this.add.text(390, 200, 'text', {
        fontSize: 43, color: 'black'
      }).setOrigin(0.5, 0.5)
      this.column7Label = this.add.text(430, 200, 'text', {
        fontSize: 43, color: 'black'
      }).setOrigin(0.5, 0.5)
      this.column8Label = this.add.text(470, 200, 'text', {
        fontSize: 43, color: 'black'
      }).setOrigin(0.5, 0.5)
      this.column9Label = this.add.text(510, 200, 'text', {
        fontSize: 43, color: 'black'
      }).setOrigin(0.5, 0.5)
    }



  }
  update() {
    var solution = {
      column1: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column2: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column3: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column4: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column5: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column6: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column7: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column8: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column9: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }

    var gameBoard = { // column1[0] = 3 and not 1
      column1: [3, 2, 3, 4, 5, 6, 7, 8, 9],
      column2: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column3: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column4: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column5: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column6: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column7: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column8: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      column9: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }

    this.drawBoard(gameBoard)

    this.checkSolution()
  }

  /* VVV Put any other functions and code down here VVV */
  drawBoard(board) {
    this.column1Label.setText(board.column1)
    this.column2Label.setText(board.column2)
    this.column3Label.setText(board.column3)
    this.column4Label.setText(board.column4)
    this.column5Label.setText(board.column5)
    this.column6Label.setText(board.column6)
    this.column7Label.setText(board.column7)
    this.column8Label.setText(board.column8)
    this.column9Label.setText(board.column9)
  }
  checkSolution() {

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

