const COLS = 7;
const ROWS = 6;

const CELL_SIZE = 55;
const OFFSET_X = 155;
const OFFSET_Y = 50;

let gameover = false;


class mainScene extends Phaser.Scene {
  canWinWithMove(col, player) {
    const row = this.findRowForColumn(col);
    if (row === -1) return false; // column is full, can't play here

    // Try the move
    this.board[row][col] = player;
    const wins = this.checkWinFrom(row, col, player);
    // Undo the move
    this.board[row][col] = 0;

    return wins;
  }

  preload() {
    this.load.audio("drop", "Su_fourInRow/assets/pop-402324.mp3");

  }

  create() {
    this.drawBoard();

    this.turnText = this.add.text(350, 25, "Your turn", {
      fontSize: "18px",
      color: "#ffffff"
    });
    this.turnText.setOrigin(0.5, 0.5);
    this.turnText.setDepth(10);

    this.board = [];
    for (let r = 0; r < ROWS; r++) {
      this.board[r] = [];
      for (let c = 0; c < COLS; c++) {
        this.board[r][c] = 0;
      }
    }

    this.moveCount = 0;
    this.moveText = this.add.text(350, 45, "Moves: 0", {
      fontSize: "16px",
      color: "#ffffff"
    }).setOrigin(0.5).setDepth(9);

    this.endText = this.add.text(350, 200, "", {
      fontSize: "32px",
      color: "#ffffff"
    });
    this.endText.setOrigin(0.5, 0.5);
    this.endText.setDepth(11);

    this.currentPlayer = 1;
    this.pieces = [];

    this.input.on("pointerdown", this.handlePointer, this);

    this.hoverCircle = this.add.circle(0, 0, CELL_SIZE * 0.4, 0xffffff, 0.3).setDepth(5);

    this.hoverCircle.setVisible(false);

    this.input.on("pointermove", (p) => {
      if (gameover) {
        this.hoverCircle.setVisible(false);
        return;
      }

      const col = Math.floor((p.x - OFFSET_X) / CELL_SIZE);
      const row = Math.floor((p.y - OFFSET_Y) / CELL_SIZE);

      if (col < 0 || col >= COLS || row < 0 || row >= ROWS) {
        this.hoverCircle.setVisible(false);
        return;
      }

      if (this.board[row][col] !== 0) {
        this.hoverCircle.setVisible(false);
        return;
      }

      const x = OFFSET_X + col * CELL_SIZE + CELL_SIZE / 2;
      const y = OFFSET_Y + row * CELL_SIZE + CELL_SIZE / 2;

      this.hoverCircle.setVisible(true);
      this.hoverCircle.setPosition(x, y);
    });

  }

  update() {
  }


  drawBoard() {
    const boardWidth = COLS * CELL_SIZE + 60;
    const boardHeight = ROWS * CELL_SIZE + 60;
    const centerX = 350;
    const centerY = 200;


    const board = this.add.graphics();
    board.fillStyle(0xd48d5d, 1);
    board.fillRoundedRect(
      350 - (COLS * 55 + 60) / 2,
      200 - (ROWS * 55 + 60) / 2,
      COLS * 55 + 60,
      ROWS * 55 + 60,
      20
    );

    const holeRadius = CELL_SIZE * 0.4;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = OFFSET_X + c * CELL_SIZE + CELL_SIZE / 2;
        const y = OFFSET_Y + r * CELL_SIZE + CELL_SIZE / 2;
        this.add.circle(x, y, holeRadius, 0x167782);
      }
    }
  }


  handlePointer(pointer) {
    if (gameover) return;
    if (this.currentPlayer !== 1) return;

    const col = Math.floor((pointer.x - OFFSET_X) / CELL_SIZE);
    if (col < 0 || col >= COLS) return;

    if (!this.canDropInColumn(col)) return;

    this.playerMove(col);
  }

  canDropInColumn(col) {
    return this.board[0][col] === 0;
  }

  findRowForColumn(col) {
    for (let r = ROWS - 1; r >= 0; r--) {
      if (this.board[r][col] === 0) {
        return r;
      }
    }
    return -1;
  }


  dropPiece(col, player) {
    const row = this.findRowForColumn(col);
    if (row === -1) return -1;

    this.board[row][col] = player;
    this.moveCount++;
    this.moveText.setText("Moves: " + this.moveCount);

    const x = OFFSET_X + col * CELL_SIZE + CELL_SIZE / 2;
    const y = OFFSET_Y + row * CELL_SIZE + CELL_SIZE / 2;

    const color = (player === 1) ? 0xd6c637 : 0xd63737;
    const radius = CELL_SIZE * 0.4;

    const piece = this.add.circle(x, y, radius, color);
    this.sound.play("drop", { volume: 0.5 });

    this.pieces.push(piece);

    this.lastRow = row;
    this.lastCol = col;

    return row;


  }

  playerMove(col) {
    const row = this.dropPiece(col, 1);
    if (row === -1) return;

    if (this.checkWinFrom(this.lastRow, this.lastCol, 1)) {
      gameover = true;
      this.endText.setText("You Won!!");
      this.endText.setDepth(11);
      this.endText.setStyle({ backgroundColor: "#000000", padding: 8 });

      this.turnText.setText("");
      return;
    }

    if (this.isBoardFull()) {
      gameover = true;
      console.log("Draw!");
      return;
    }

    this.currentPlayer = 2;

    // show AI is thinking
    this.turnText.setText("AI is thinking...");

    this.time.delayedCall(400, () => {
      this.aiMove();
    });
  }

  aiMove() {
    if (gameover) return;

    const validCols = [];
    for (let c = 0; c < COLS; c++) {
      if (this.canDropInColumn(c)) {
        validCols.push(c);
      }
    }

    if (validCols.length === 0) {
      gameover = true;
      console.log("Draw!");
      return;
    }

    const WIN_CHANCE = 0.8; // 80% of the time it takes a winning move
    const BLOCK_CHANCE = 0.75; // 75% of the time it blocks your win
    const SMART_CHANCE = 0.6; // 60% of the time it prefers center

    let chosenCol = null;

    const winningMoves = [];
    for (let col of validCols) {
      if (this.canWinWithMove(col, 2)) {
        winningMoves.push(col);
      }
    }

    if (winningMoves.length > 0 && Math.random() < WIN_CHANCE) {
      const i = Math.floor(Math.random() * winningMoves.length);
      chosenCol = winningMoves[i];
    }

    if (chosenCol === null) {
      const blockingMoves = [];
      for (let col of validCols) {
        if (this.canWinWithMove(col, 1)) {
          blockingMoves.push(col);
        }
      }

      if (blockingMoves.length > 0 && Math.random() < BLOCK_CHANCE) {
        const i = Math.floor(Math.random() * blockingMoves.length);
        chosenCol = blockingMoves[i];
      }
    }

    if (chosenCol === null) {
      if (Math.random() < SMART_CHANCE) {
        const centerCol = Math.floor(COLS / 2);
        let bestCol = validCols[0];
        let bestDist = Math.abs(bestCol - centerCol);

        for (let col of validCols) {
          const dist = Math.abs(col - centerCol);
          if (dist < bestDist) {
            bestDist = dist;
            bestCol = col;
          }
        }

        chosenCol = bestCol;
      }
    }

    if (chosenCol === null) {
      const randomIndex = Math.floor(Math.random() * validCols.length);
      chosenCol = validCols[randomIndex];
    }

    const row = this.dropPiece(chosenCol, 2);

    if (row === -1) {
      this.currentPlayer = 1;
      return;
    }

    if (this.checkWinFrom(this.lastRow, this.lastCol, 2)) {
      gameover = true;
      this.endText.setText("You Lost...");
      this.endText.setDepth(11);
      this.endText.setStyle({ backgroundColor: "#000000", padding: 8 });
      this.turnText.setText("");
      return;
    }

    if (this.isBoardFull()) {
      gameover = true;
      this.endText.setText("Draw!");
      this.endText.setDepth(11);
      this.turnText.setText("");
      return;
    }

    this.currentPlayer = 1;
    this.turnText.setText("Your turn");
  }

  isBoardFull() {
    for (let c = 0; c < COLS; c++) {
      if (this.board[0][c] === 0) return false;
    }
    return true;
  }

  checkWinFrom(row, col, player) {
    if (row < 0 || col < 0) return false;

    const directions = [
      { dr: 0, dc: 1 },
      { dr: 1, dc: 0 },
      { dr: 1, dc: 1 },
      { dr: 1, dc: -1 }
    ];

    for (let d of directions) {
      let count = 1;

      count += this.countDirection(row, col, d.dr, d.dc, player);
      count += this.countDirection(row, col, -d.dr, -d.dc, player);

      if (count >= 4) {
        return true;
      }
    }
    return false;
  }

  countDirection(row, col, dr, dc, player) {
    let r = row + dr;
    let c = col + dc;
    let count = 0;

    while (r >= 0 && r < ROWS && c >= 0 && c < COLS &&
      this.board[r][c] === player) {
      count++;
      r += dr;
      c += dc;
    }

    return count;
  }
}

window.game = new Phaser.Game({
  width: 700,
  height: 400,
  backgroundColor: "#167782",
  scene: mainScene,
  physics: { default: "arcade" },
  parent: "game"
});

window.restartActiveGame = function () {
  if (window.game && window.game.scene.scenes[0]) {
    window.game.scene.scenes[0].scene.restart();
    gameover = false;
  }
};
