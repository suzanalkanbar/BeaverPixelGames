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


//advertenties


document.addEventListener("DOMContentLoaded", () => {
  const adSlots = document.querySelectorAll(".ad-card");
  if (!adSlots.length) return;

  const ADS = [
    { img: "imgs/hiringevent-add.jpg", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", label: "Ad 1" },
    { img: "imgs/summercamp-add.jpg", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", label: "Ad 2" },
    { img: "imgs/travel-add.avif", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", label: "Ad 3" },
    { img: "imgs/blackfriday-add.jpg", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", label: "Ad 4" },
    { img: "imgs/ijs-add.jpg", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", label: "Ad 5" },
    { img: "imgs/mac-add2.jpg", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", label: "Ad 6" },
    { img: "imgs/coke.jpg", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", label: "Ad 7" },
    { img: "imgs/banner-ad-example-travel.webp", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", label: "Ad 8" }
  ];

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pickRandomAd(currentUrl) {
    const pool = ADS.filter(ad => ad.url !== currentUrl);
    return pool.length
      ? pool[Math.floor(Math.random() * pool.length)]
      : ADS[Math.floor(Math.random() * ADS.length)];
  }

  function applyAd(el, ad) {
    if (!ad) return;

    el.style.backgroundImage = `url('${ad.img}')`;
    el.setAttribute("aria-label", ad.label);

    el.onclick = (e) => {
      e.preventDefault();      // stopt <a>-gedrag
      e.stopPropagation();     // stopt bubbling
      window.open(ad.url, "_blank", "noopener,noreferrer");
    };
  }

  function scheduleNextSwap(el, currentAd) {
    const delay = randomBetween(3000, 18000);

    setTimeout(() => {
      const nextAd = pickRandomAd(currentAd.url);
      applyAd(el, nextAd);
      scheduleNextSwap(el, nextAd);
    }, delay);
  }

  adSlots.forEach(el => {
    const startAd = ADS[Math.floor(Math.random() * ADS.length)];
    applyAd(el, startAd);

    setTimeout(
      () => scheduleNextSwap(el, startAd),
      randomBetween(1000, 5000)
    );
  });
});