const wordsPool = [
  "PHASER", "JAVASCRIPT", "GAMEBOY", "ARCADE", "PIXEL", "CANVAS", "SPRITE",
  "PUZZLE", "BUTTON", "PLAYER", "CODING", "RANDOM", "HANGMAN", "SCREEN"
];

let secretWord = "";
let goodLetters = [];
let badLetters = [];
let hearts = 6;

function newSecretWord() {
  secretWord = wordsPool[Math.floor(Math.random() * wordsPool.length)];
}

let videoOverlay = null;

class GalgjeScene extends Phaser.Scene {
  create() {
    this.ui = [];
    this.gfx = this.add.graphics();
    this.cameras.main.setBackgroundColor("#167782");

    newSecretWord();
    this.render();

    this.input.keyboard.on("keydown", (e) => {
      if (hearts <= 0) return;

      const key = (e.key || "").toUpperCase();
      if (!/^[A-Z]$/.test(key)) return;
      if (goodLetters.includes(key) || badLetters.includes(key)) return;

      if (secretWord.includes(key)) {
        goodLetters.push(key);
      } else {
        badLetters.push(key);
        hearts--;
      }

      this.render();
    });
  }

  render() {
    this.ui.forEach(x => x.destroy());
    this.ui = [];
    this.gfx.clear();

    const leftX = 150;
    const topY = 85;

    this.ui.push(
      this.add.text(leftX, topY, `Lives: ${hearts}`, {
        fontFamily: "Arial",
        fontSize: "18px",
        color: "#ffffff"
      }).setOrigin(0, 0.5)
    );

    this.ui.push(
      this.add.text(leftX, topY + 35, "Wrong:", {
        fontFamily: "Arial",
        fontSize: "16px",
        color: "#ffffff"
      }).setOrigin(0, 0.5)
    );
    
    this.ui.push(
      this.add.text(leftX + 60, topY + 35, badLetters.length ? badLetters.join(" ") : "-", {
        fontFamily: "Arial",
        fontSize: "16px",
        color: "#E36B6B"
      }).setOrigin(0, 0.5)
    );
    

    const shownWord = secretWord
      .split("")
      .map(ch => (goodLetters.includes(ch) ? ch : "_"))
      .join(" ");

    this.ui.push(
      this.add.text(leftX, 235, shownWord, {
        fontFamily: "Arial",
        fontSize: "34px",
        color: "#ffffff",
        letterSpacing: 10
      }).setOrigin(0, 0.5)
    );

    this.drawStickman();

    if (hearts <= 0) {
      this.finishScreen(`GAME OVER\n${secretWord}`);
    } else if (secretWord.split("").every(ch => goodLetters.includes(ch))) {
      this.finishScreen("YOU WIN");
    }
  }

  finishScreen(msg) {
    this.ui.push(
      this.add.text(350, 170, msg, {
        fontFamily: "Arial",
        fontSize: "34px",
        color: "#E4A426",
        fontStyle: "bold",
        align: "center"
      }).setOrigin(0.5)
    );

    this.ui.push(
      this.add.text(350, 285, "Press RESET to play again", {
        fontFamily: "Arial",
        fontSize: "16px",
        color: "#ffffff"
      }).setOrigin(0.5)
    );

    this.input.keyboard.removeAllListeners();
  }

  drawStickman() {
    const baseX = 520;
    const baseY = 300;

    this.gfx.lineStyle(6, 0xffffff, 1);

    this.gfx.beginPath();
    this.gfx.moveTo(baseX - 60, baseY);
    this.gfx.lineTo(baseX + 60, baseY);
    this.gfx.moveTo(baseX, baseY);
    this.gfx.lineTo(baseX, baseY - 220);
    this.gfx.moveTo(baseX, baseY - 220);
    this.gfx.lineTo(baseX + 80, baseY - 220);
    this.gfx.moveTo(baseX + 80, baseY - 220);
    this.gfx.lineTo(baseX + 80, baseY - 185);
    this.gfx.strokePath();

    const parts = badLetters.length;

    if (parts >= 1) this.gfx.strokeCircle(baseX + 80, baseY - 160, 20);
    if (parts >= 2) this.gfx.lineBetween(baseX + 80, baseY - 140, baseX + 80, baseY - 90);
    if (parts >= 3) this.gfx.lineBetween(baseX + 80, baseY - 130, baseX + 50, baseY - 110);
    if (parts >= 4) this.gfx.lineBetween(baseX + 80, baseY - 130, baseX + 110, baseY - 110);
    if (parts >= 5) this.gfx.lineBetween(baseX + 80, baseY - 90, baseX + 55, baseY - 55);
    if (parts >= 6) this.gfx.lineBetween(baseX + 80, baseY - 90, baseX + 105, baseY - 55);
  }
}

window.game = new Phaser.Game({
  width: 700,
  height: 400,
  backgroundColor: "#167782",
  scene: GalgjeScene,
  physics: { default: "arcade" },
  parent: "game"
});

window.restartActiveGame = function () {
  goodLetters = [];
  badLetters = [];
  hearts = 6;
  newSecretWord();

  if (videoOverlay) {
    videoOverlay.remove();
    videoOverlay = null;
  }

  if (window.game && window.game.scene.scenes[0]) {
    window.game.scene.scenes[0].scene.restart();
  }
};
