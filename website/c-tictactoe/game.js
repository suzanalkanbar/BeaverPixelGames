class mainScene extends Phaser.Scene {
  constructor() {
    super("mainScene");
  }

  preload() {}

  create() {
    const GRID = 3;
    const CELL = 120;          
    const BOARD = GRID * CELL; // 360
    const HUD = 72;
    const WIDTH = BOARD;
    const HEIGHT = BOARD + HUD;

    this.GRID = GRID;
    this.CELL = CELL;
    this.BOARD = BOARD;

    this.board = Array.from({ length: GRID }, () => Array(GRID).fill(""));
    this.currentPlayer = "X";
    this.gameOver = false;

    this.gridGfx = this.add.graphics({ lineStyle: { width: 4, color: 0x000000 } });
    this.overlayGfx = this.add.graphics();

    this.marks = [];

    // teken grid
    this.gridGfx.strokeLineShape(new Phaser.Geom.Line(CELL, 0, CELL, BOARD));
    this.gridGfx.strokeLineShape(new Phaser.Geom.Line(CELL * 2, 0, CELL * 2, BOARD));
    this.gridGfx.strokeLineShape(new Phaser.Geom.Line(0, CELL, BOARD, CELL));
    this.gridGfx.strokeLineShape(new Phaser.Geom.Line(0, CELL * 2, BOARD, CELL * 2));

    // HUD text
    this.statusText = this.add.text(WIDTH / 2, BOARD + 12, "Player X's turn", {
      fontSize: "20px",
      color: "#111",
      fontFamily: "Arial"
    }).setOrigin(0.5, 0);

    this.restartText = this.add.text(WIDTH / 2, BOARD + 38, "Restart", {
      fontSize: "18px",
      color: "#fec23fff",
      fontFamily: "Arial"
    }).setOrigin(0.5, 0).setInteractive({ useHandCursor: true });

    this.restartText.on("pointerup", () => this.restartGame());

    this.input.on("pointerdown", (p) => this.onPointerDown(p));
  }

  restartGame() {
    this.board = Array.from({ length: this.GRID }, () => Array(this.GRID).fill(""));
    this.currentPlayer = "X";
    this.gameOver = false;

    this.overlayGfx.clear();

    for (const t of this.marks) t.destroy();
    this.marks = [];

    this.statusText.setText("Player X's turn");
  }

  onPointerDown(pointer) {
    if (this.gameOver) return;
    if (pointer.y > this.BOARD) return;

    const col = Math.floor(pointer.x / this.CELL);
    const row = Math.floor(pointer.y / this.CELL);

    if (this.board[row][col] !== "") return;

    this.placeMark(row, col);

    const win = this.checkWin();
    if (win) {
      this.gameOver = true;
      this.drawWinLine(win);
      this.statusText.setText(`Player ${this.currentPlayer} wins!`);
      return;
    }

    if (this.isFull()) {
      this.gameOver = true;
      this.statusText.setText("Draw!");
      return;
    }

    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.statusText.setText(`Player ${this.currentPlayer}'s turn`);
  }

  placeMark(row, col) {
    this.board[row][col] = this.currentPlayer;

    const cx = col * this.CELL + this.CELL / 2;
    const cy = row * this.CELL + this.CELL / 2;

    const t = this.add.text(cx, cy, this.currentPlayer, {
      fontSize: Math.floor(this.CELL * 0.66) + "px",
      color: "#111",
      fontFamily: "Arial"
    }).setOrigin(0.5);

    this.marks.push(t);
  }

  isFull() {
    return this.board.every(row => row.every(c => c !== ""));
  }

  checkWin() {
    const b = this.board;
    const G = this.GRID;

    // rows
    for (let r = 0; r < G; r++) {
      if (b[r][0] && b[r][0] === b[r][1] && b[r][1] === b[r][2]) return { kind: "row", index: r };
    }

    // cols
    for (let c = 0; c < G; c++) {
      if (b[0][c] && b[0][c] === b[1][c] && b[1][c] === b[2][c]) return { kind: "col", index: c };
    }

    // diag
    if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) return { kind: "diag" };

    // anti
    if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) return { kind: "anti" };

    return null;
  }

  drawWinLine(win) {
    const pad = 14;
    const half = this.CELL / 2;
    const B = this.BOARD;

    this.overlayGfx.clear();
    this.overlayGfx.lineStyle(6, 0xef4444, 1);

    if (win.kind === "row") {
      const y = win.index * this.CELL + half;
      this.overlayGfx.strokeLineShape(new Phaser.Geom.Line(pad, y, B - pad, y));
    }

    else if (win.kind === "col") {
      const x = win.index * this.CELL + half;
      this.overlayGfx.strokeLineShape(new Phaser.Geom.Line(x, pad, x, B - pad));
    }

    else if (win.kind === "diag") {
      this.overlayGfx.strokeLineShape(new Phaser.Geom.Line(pad, pad, B - pad, B - pad));
    }

    else if (win.kind === "anti") {
      this.overlayGfx.strokeLineShape(new Phaser.Geom.Line(B - pad, pad, pad, B - pad));
    }
  }
}

window.game = new Phaser.Game({
  width: 700, // Width of the game in pixels
  height: 400, // Height of the game in pixels
  backgroundColor: '#3498db', // The background color (blue)
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