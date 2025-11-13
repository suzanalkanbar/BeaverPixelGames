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

// vlag om te checken of game.js al geladen is
window.snakeLoaded = false;

document.addEventListener("DOMContentLoaded", () => {
  const game1 = document.getElementById("game-1");
  if (game1) {
    game1.addEventListener("click", openGamePopup);
  }
});

function openGamePopup() {
  // oude overlay sluiten
  const old = document.querySelector(".modal-overlay");
  if (old) old.remove();

  // overlay
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  // sluit-knop
  const closeBtn = document.createElement("button");
  closeBtn.className = "modal-close";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => overlay.remove());

  // venster + console
  const modal = document.createElement("div");
  modal.className = "modal";

  const consoleEl = document.createElement("div");
  consoleEl.className = "console";

  // --- SCHERM: hier komt de Phaser-game in ---
  const screen = document.createElement("div");
  screen.className = "console-screen";

  const gameContainer = document.createElement("div");
  gameContainer.id = "game";          // belangrijk: parent: 'game' in game.js
  gameContainer.style.width = "700px";
  gameContainer.style.height = "400px";

  screen.appendChild(gameContainer);

  // --- BODY met knoppen ---
  const body = document.createElement("div");
  body.className = "console-body";

  // links: D-pad (4 knoppen)
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

  // midden: RESET / START
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
      script.src = "game.js";        // zelfde map als index.html
      script.onload = () => {
        window.snakeLoaded = true;
        console.log("Snake game geladen en gestart");
        // game.js doet zelf: new Phaser.Game({ parent: 'game', ... })
      };
      document.body.appendChild(script);
    } else {
      console.log("Snake game was al geladen");
    }
  });

  // Simpele RESET: hele pagina opnieuw laden
  resetBtn.addEventListener("click", () => {
    location.reload();
  });

  // D-pad / A / B doen nu nog niks in de game-logica,
  // maar je kunt hier later acties aan koppelen.
}
