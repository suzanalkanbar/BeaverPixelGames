// --- NAV / BURGER MENU ---
const nav = document.querySelector('.nav');
const btn = document.getElementById('burger');

if (nav && btn) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ===== GAME POPUP =====


window.snakeLoaded = false;

document.addEventListener("DOMContentLoaded", () => {
  const game1 = document.getElementById("game-1");
  if (game1) {
    game1.addEventListener("click", openGamePopup);
  }
});


function openGamePopup() {
  let overlay = document.querySelector(".modal-overlay");
  if (overlay) {
    overlay.style.display = "flex";
    return;
  }

  overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  // sluit-knop
  const closeBtn = document.createElement("button");
  closeBtn.className = "modal-close";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });
  // venster + console
  const modal = document.createElement("div");
  modal.className = "modal";

  const consoleEl = document.createElement("div");
  consoleEl.className = "console";

  // --- SCHERM: hier komt de Phaser-game in ---
  const screen = document.createElement("div");
  screen.className = "console-screen";

  const gameContainer = document.createElement("div");
  gameContainer.id = "game";
  gameContainer.style.width = "700px";
  gameContainer.style.height = "400px";

  screen.appendChild(gameContainer);

  const body = document.createElement("div");
  body.className = "console-body";

  const leftButtons = document.createElement("div");
  leftButtons.className = "console-buttons";

  const dpad = document.createElement("div");
  dpad.className = "dpad";

  const btnUp = document.createElement("button");
  btnUp.className = "dpad-btn dpad-up";
  btnUp.setAttribute("aria-label", "Omhoog");

  const btnDown = document.createElement("button");
  btnDown.className = "dpad-btn dpad-down";
  btnDown.setAttribute("aria-label", "Omlaag");

  const btnLeft = document.createElement("button");
  btnLeft.className = "dpad-btn dpad-left";
  btnLeft.setAttribute("aria-label", "Links");

  const btnRight = document.createElement("button");
  btnRight.className = "dpad-btn dpad-right";
  btnRight.setAttribute("aria-label", "Rechts");

  const centerDot = document.createElement("div");
  centerDot.className = "dpad-center";

  dpad.append(btnUp, btnDown, btnLeft, btnRight, centerDot);
  leftButtons.appendChild(dpad);

  const centerButtons = document.createElement("div");
  centerButtons.className = "console-buttons";

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn small";
  resetBtn.textContent = "RESET";

  const startBtn = document.createElement("button");
  startBtn.className = "btn small";
  startBtn.textContent = "START";

  centerButtons.append(resetBtn, startBtn);

  // rechts: A en B
  const rightButtons = document.createElement("div");
  rightButtons.className = "console-buttons";

  const aBtn = document.createElement("button");
  aBtn.className = "btn round";
  aBtn.textContent = "A";

  const bBtn = document.createElement("button");
  bBtn.className = "btn round";
  bBtn.textContent = "B";

  rightButtons.append(aBtn, bBtn);

  // alles in elkaar zetten
  body.append(leftButtons, centerButtons, rightButtons);
  consoleEl.append(screen, body);
  modal.appendChild(consoleEl);

  overlay.appendChild(modal);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  // ===== START knop: HIER begint je game =====
  startBtn.addEventListener("click", () => {
  if (!window.snakeLoaded) {
    const script = document.createElement("script");
    script.src = "../j-snake/game.js";
    script.onload = () => {
      window.snakeLoaded = true;
     const canvas = document.querySelector("canvas");
    if (canvas) {
     document.getElementById("game").appendChild(canvas);
     }
    };
    document.body.appendChild(script);
  } else {
    console.log("Snake game was al geladen");
  }
});


  resetBtn.addEventListener("click", () => {
    if (window.Phaser && Phaser.GAMES && Phaser.GAMES.length > 0) {
      const phaserGame = Phaser.GAMES[0];
      const scene = phaserGame.scene.scenes[0];
      window.gameover = false;
      scene.scene.restart();
    }
  });

 }
