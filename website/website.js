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
