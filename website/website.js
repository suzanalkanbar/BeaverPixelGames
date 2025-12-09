// --- NAV / BURGER MENU ---
const nav = document.querySelector(".nav");
const btn = document.getElementById("burger");

if (nav && btn) {
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

// === GAMES: kaart klikken -> nieuwe pagina met gameboy ===
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".game").forEach((card) => {
    card.addEventListener("click", () => {
      const gamePath = card.dataset.game;
      if (!gamePath) {
        console.warn("Geen data-game attribuut op dit element.");
        return;
      }

      // Ga naar gameboy pagina en geef het pad van de game mee
      const url = `gameboy.html?game=${encodeURIComponent(gamePath)}`;
      window.location.href = url;
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const allGames = Array.from(document.querySelectorAll(".game"));
  const seeMoreBtn = document.getElementById("seeMoreBtn");

    if (!allGames || allGames.length === 0 || !seeMoreBtn) {
    console.warn("No games or See More button found — skipping batch loader.");
    return;
  }

  if (!seeMoreBtn) {
    console.warn("see More button missing.")
    return;
  }
  
  let visibleCount = 6;  
  const batchSize = 3;    

  allGames.forEach(game => game.style.display = "none");

  function showGames() {
    for (let i = 0; i < visibleCount; i++) {
      if (allGames[i]) {
        allGames[i].style.display = "flex";
      }
    }

    if (visibleCount >= allGames.length) {
      seeMoreBtn.style.display = "none";
    }
  }

  showGames();

  // on click "See More"
  seeMoreBtn.addEventListener("click", () => {
    visibleCount += batchSize;
    showGames();
  });
});
