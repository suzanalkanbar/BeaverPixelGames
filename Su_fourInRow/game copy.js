// === GLOBAL VARIABLES ===
var COLS = 7;
var ROWS = 6;
var CELL_SIZE = 55;

var OFFSET_X = 160;
var OFFSET_Y = 40;

var gameover = false;

// === MAIN SCENE ===
class mainScene {
  preload() {}

  create() {

    // players
    this.humanPlayer = 1;
    this.aiPlayer = 2;
    this.currentPlayer = this.humanPlayer;
    this.isAiTurn = false;

    gameover = false;

    // empty board array
    this.board = [];
    for (var r = 0; r < ROWS; r++) {
      this.board[r] = [];
      for (var c = 0; c < COLS; c++) {
        this.board[r][c] = 0;
      }
    }

    // HEADER BAR
    this.infoBG = this.add.rectangle(350, 30, 300, 30, 0x167782, 0);
    this.infoBG.setDepth(5);

    this.infoText = this.add.text(350, 35, "Your turn", {
      font: "18px Arial Black",
      fill: "#FFFFFF",
      stroke: "#E17E3B",
      strokeThickness: 4
    })
    .setOrigin(0.5)
    .setShadow(2, 2, "#000000", 1)
    .setDepth(6);

    // RESULT PANEL (hidden at start)
    this.resultPanel = this.add.rectangle(350, 200, 360, 150, 0xE17E3B, 0.95)
    this.resultText = this.add.text(350, 185, "", {
      font: "44px Arial Black",
      fill: "#FFFFFF",
      stroke: "#000000",
      strokeThickness: 6,
      align: "center"
    }).setOrigin(0.5);

    this.resultSubText = this.add.text(350, 255, "Press START to play again", {
      font: "20px Arial",

    }).setOrigin(0.5);

    this.resultPanel.setDepth(20);
    this.resultText.setDepth(21);
    this.resultSubText.setDepth(21);

    this.resultPanel.setVisible(false);
    this.resultText.setVisible(false);
    this.resultSubText.setVisible(false);

    // board background
    this.boardGraphics = this.add.graphics();
    this.boardGraphics.fillStyle(0x167782, 1); // teal
    this.boardGraphics.fillRect(
      OFFSET_X - 10,
      OFFSET_Y - 10,
      COLS * CELL_SIZE + 20,
      ROWS * CELL_SIZE + 20
    );

    // holes (beige/dun)
    this.boardGraphics.fillStyle(0xD5C9A8, 1);
    for (var rr = 0; rr < ROWS; rr++) {
      for (var cc = 0; cc < COLS; cc++) {
        var x = OFFSET_X + cc * CELL_SIZE + CELL_SIZE / 2;
        var y = OFFSET_Y + rr * CELL_SIZE + CELL_SIZE / 2;
        this.boardGraphics.fillCircle(x, y, CELL_SIZE / 2 - 5);
      }
    }

    // discs layer
    this.discs = this.add.graphics();

    // mouse click — only player can click
    this.input.on(
      "pointerdown",
      function (pointer) {
        if (gameover) return;
        if (this.currentPlayer !== this.humanPlayer) return;

        var col = Math.floor((pointer.x - OFFSET_X) / CELL_SIZE);
        if (col < 0 || col >= COLS) return;

        this.handleMove(col);
      },
      this
    );
  }

  // === MOVE HANDLING ===
  handleMove(col) {
    if (gameover) return;

    var row = this.findLowestEmptyRow(col);
    if (row === -1) return;

    // place disc
    this.board[row][col] = this.currentPlayer;
    this.drawDiscs();

    // check win
    if (this.checkWin(row, col)) {
      if (this.currentPlayer === this.humanPlayer) {
        this.showResult("YOU WIN!", 0xE4A426);
        this.infoText.setText("You win!");
      } else {
        this.showResult("YOU LOST",);
        this.infoText.setText("You lost");
      }

      this.centerHeader();
      gameover = true;
      return;
    }

    // draw?
    if (this.isBoardFull()) {
      this.showResult("DRAW", 0x167782);
      this.infoText.setText("Draw!");
      this.centerHeader();
      gameover = true;
      return;
    }

    // switch player
    this.currentPlayer = (this.currentPlayer === this.humanPlayer ? this.aiPlayer : this.humanPlayer);

    // AI turn
    if (this.currentPlayer === this.aiPlayer) {
      this.infoText.setText("Computer is thinking...");
      this.centerHeader();
      this.isAiTurn = true;

      this.time.delayedCall(
        500,
        () => {
          if (!gameover && this.isAiTurn) this.aiMove();
        }
      );
    } else {
      this.isAiTurn = false;
      this.infoText.setText("Your turn");
      this.centerHeader();
    }
  }

  // === RESULT POPUP ===
  showResult(text, bgColor) {
    this.resultPanel.setFillStyle(bgColor, 0.95);
    this.resultText.setText(text);
    this.resultPanel.setVisible(true);
    this.resultText.setVisible(true);
    this.resultSubText.setVisible(true);
  }

  centerHeader() {
    this.infoText.x = 350;
  }

  // === AI LOGIC ===
  aiMove() {
    var col = this.chooseAiColumn();
    if (col !== null) this.handleMove(col);
  }

  chooseAiColumn() {
    // collect all columns that are not full
    var valid = [];
    for (var c = 0; c < COLS; c++) {
      if (this.board[0][c] === 0) {
        valid.push(c);
      }
    }
    if (valid.length === 0) return null;
  
    // super simple AI: just pick a random valid column
    var randomIndex = Math.floor(Math.random() * valid.length);
    return valid[randomIndex];
  }
  

  // === UTILS ===
  findLowestEmptyRow(col) {
    for (var r = ROWS - 1; r >= 0; r--) {
      if (this.board[r][col] === 0) return r;
    }
    return -1;
  }

  isBoardFull() {
    for (var c = 0; c < COLS; c++) {
      if (this.board[0][c] === 0) return false;
    }
    return true;
  }

  drawDiscs() {
    this.discs.clear();

    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        var player = this.board[r][c];
        if (player !== 0) {
          var x = OFFSET_X + c * CELL_SIZE + CELL_SIZE / 2;
          var y = OFFSET_Y + r * CELL_SIZE + CELL_SIZE / 2;
          var color = (player === 1 ? 0xE17E3B : 0xE4A426); 

          this.discs.fillStyle(color, 1);
          this.discs.fillCircle(x, y, CELL_SIZE / 2 - 8);
        }
      }
    }
  }

  checkWin(row, col) {
    var p = this.board[row][col];
    if (p === 0) return false;

    var dirs = [
      { dr: 0, dc: 1 },
      { dr: 1, dc: 0 },
      { dr: 1, dc: 1 },
      { dr: 1, dc: -1 }
    ];

    for (var i = 0; i < dirs.length; i++) {
      var d = dirs[i];
      var count = 1;

      count += this.countDirection(row, col, d.dr, d.dc, p);
      count += this.countDirection(row, col, -d.dr, -d.dc, p);

      if (count >= 4) return true;
    }
    return false;
  }

  countDirection(row, col, dr, dc, player) {
    var r = row + dr;
    var c = col + dc;
    var count = 0;

    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && this.board[r][c] === player) {
      count++;
      r += dr;
      c += dc;
    }
    return count;
  }

  update() {}
}

// === PHASER GAME ===
window.game = new Phaser.Game({
  width: 700,
  height: 400,
  backgroundColor: "#161F22",
  scene: mainScene,
  physics: { default: "arcade" },
  parent: "game"
});

// restart hook
window.restartActiveGame = function () {
  if (window.game && window.game.scene.scenes[0]) {
    window.game.scene.scenes[0].scene.restart();
    gameover = false;
  }
};
