/**
 * Animations fluides avec Motion (motion.dev)
 * C'est la version vanilla de Framer Motion — même équipe, même philosophie.
 * En React, on utilisera framer-motion directement.
 */

import { animate, scroll, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@11.15.0/+esm";

// --- Animations au scroll (entrée des éléments) ---
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll("[data-animate]");

  animatedElements.forEach((el) => {
    const type = el.dataset.animate;
    const delay = parseFloat(el.dataset.delay || "0");

    const animations = {
      "fade-in": { opacity: [0, 1], y: [0, 0] },
      "slide-up": { opacity: [0, 1], y: [40, 0] },
      "slide-left": { opacity: [0, 1], x: [40, 0] },
      "slide-right": { opacity: [0, 1], x: [-40, 0] },
      "scale-in": { opacity: [0, 1], scale: [0.9, 1] },
    };

    const config = animations[type] || animations["fade-in"];

    inView(el, () => {
      animate(el, config, {
        duration: 0.7,
        delay,
        easing: [0.25, 0.46, 0.45, 0.94],
      });
    }, { amount: 0.2 });
  });
}

// --- Compteurs animés (stats) ---
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.count, 10);

    inView(counter, () => {
      animate(0, target, {
        duration: 2,
        easing: [0.25, 0.46, 0.45, 0.94],
        onUpdate: (value) => {
          counter.textContent = Math.round(value);
        },
      });
    }, { amount: 0.5 });
  });
}

// --- Animation stagger des grilles (compétences, projets) ---
function animateGridChildren(selector, childSelector) {
  const grid = document.querySelector(selector);
  if (!grid) return;

  const children = grid.querySelectorAll(childSelector);
  if (children.length === 0) return;

  children.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
  });

  inView(grid, () => {
    animate(
      children,
      { opacity: [0, 1], y: [30, 0] },
      {
        duration: 0.5,
        delay: stagger(0.1),
        easing: [0.25, 0.46, 0.45, 0.94],
      }
    );
  }, { amount: 0.1 });
}

function initStaggerGrids() {
  animateGridChildren(".skills__grid", ".skill-card");
  animateGridChildren(".projects__grid", ".project-card");
  animateGridChildren(".timeline__list", ".timeline__item");

  document.addEventListener("skillsUpdated", () => {
    animateGridChildren(".skills__grid", ".skill-card");
  });
}

// --- Parallax léger sur le hero ---
function initHeroParallax() {
  const glows = document.querySelectorAll(".hero__glow");

  scroll(
    animate(glows, {
      y: [0, -80],
      opacity: [0.4, 0.1],
    }),
    { target: document.querySelector(".hero"), offset: ["start start", "end start"] }
  );
}

// --- Animation du header au scroll ---
function initHeaderAnimation() {
  const header = document.getElementById("header");

  scroll(
    (progress) => {
      if (progress > 0.05) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    },
    { target: document.body, offset: ["0px", "100px"] }
  );
}

// --- Animation des cartes au hover ---
function initCardHoverAnimations() {
  const cards = document.querySelectorAll(".project-card, .skill-card, .stat-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      animate(card, { scale: 1.02 }, { duration: 0.3, easing: "ease-out" });
    });
    card.addEventListener("mouseleave", () => {
      animate(card, { scale: 1 }, { duration: 0.3, easing: "ease-out" });
    });
  });
}

// --- Initialisation ---
function initAnimations() {
  initScrollAnimations();
  initCounters();
  initStaggerGrids();
  initHeroParallax();
  initHeaderAnimation();
  initCardHoverAnimations();
}

// Attendre que le DOM soit peuplé par main.js
document.addEventListener("portfolioReady", initAnimations);

// Fallback si l'événement a déjà été déclenché
if (document.readyState === "complete") {
  setTimeout(initAnimations, 100);
}