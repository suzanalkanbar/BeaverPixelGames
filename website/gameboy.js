document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const gamePath = params.get("game");

  if (!gamePath) {
    console.warn("Geen ?game= parameter in de URL.");
    return;
  }

  const screen = document.getElementById("console-screen");
  let containerId = "game";

  if (gamePath.includes("sj_asteroids")) {
    containerId = "asteroids";
  }

  const container = document.createElement("div");
  container.id = containerId;
  container.style.width = "700px";
  container.style.height = "400px";
  screen.appendChild(container);

  const script = document.createElement("script");
  script.src = gamePath;
  script.onload = () => {
    console.log("Game geladen:", gamePath);
  };
  document.body.appendChild(script);


  const btnStart = document.getElementById("btn-start");
  const btnReset = document.getElementById("btn-reset");

  function restartGame() {
    if (typeof window.restartActiveGame === "function") {
      window.restartActiveGame();
    } else {
      window.location.reload();
    }
  }

  if (btnStart) {
    btnStart.addEventListener("click", restartGame);
  }
  if (btnReset) {
    btnReset.addEventListener("click", restartGame);
  }
});