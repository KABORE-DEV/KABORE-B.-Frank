/**
 * Logique principale du portfolio
 * Remplit le contenu depuis config.js et gère les interactions
 */

(function () {
  const config = PORTFOLIO_CONFIG;
  const {
    personal,
    social,
    skills,
    projects,
    education,
    experience,
    nav,
    skillLevels,
  } = config;

  // --- Icônes SVG ---
  const icons = {
    github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.065 2.065 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
    location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>`,
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  };

  // --- Logos des langages / outils (Devicon, open-source MIT, via CDN) ---
  const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
  const TECH_ICON_SLUGS = {
    html: "html5",
    html5: "html5",
    css: "css3",
    css3: "css3",
    javascript: "javascript",
    js: "javascript",
    php: "php",
    java: "java",
    sql: "mysql",
    mysql: "mysql",
    git: "git",
    github: "github",
    figma: "figma",
    react: "react",
    c: "c",
  };

  function techIconUrl(slug) {
    return `${DEVICON_BASE}/${slug}/${slug}-original.svg`;
  }

  // Découpe un nom comme "HTML / CSS" ou "Git / GitHub" en plusieurs icônes
  function getTechIcons(name) {
    return name
      .split(/[/,]/)
      .map((part) => part.trim().toLowerCase())
      .map((key) => TECH_ICON_SLUGS[key])
      .filter(Boolean)
      .map((slug) => ({ slug, url: techIconUrl(slug) }));
  }

  function renderTechIcons(name, className) {
    const found = getTechIcons(name);
    if (!found.length) return "";
    return found
      .map(
        ({ slug, url }) =>
          `<img src="${url}" alt="${slug}" class="${className}" loading="lazy" />`,
      )
      .join("");
  }

  // --- Photo (hero + à propos) ---
  function populatePhoto() {
    const initials = `${personal.firstName[0]}${personal.lastName[0]}`;

    if (personal.avatar) {
      const heroAvatar = document.getElementById("hero-avatar");
      heroAvatar.innerHTML = `<img src="${personal.avatar}" alt="Photo de ${personal.firstName} ${personal.lastName}">`;

      const aboutPhoto = document.getElementById("about-photo");
      aboutPhoto.innerHTML = `<img src="${personal.avatar}" alt="Photo de ${personal.firstName} ${personal.lastName}" class="about__photo-img">`;

      const hint = document.querySelector(".about__photo-hint");
      if (hint) hint.style.display = "none";
    } else {
      document.getElementById("hero-initials").textContent = initials;
      const aboutPhoto = document.getElementById("about-photo");
      if (aboutPhoto) {
        aboutPhoto.innerHTML = `<div class="about__photo-placeholder"><span class="about__photo-initials">${initials}</span></div>`;
      }
    }
  }

  // --- Remplir le Hero ---
  function populateHero() {
    document.getElementById("hero-firstname").textContent = personal.firstName;
    document.getElementById("hero-lastname").textContent = personal.lastName;
    document.getElementById("hero-title").textContent = personal.title;
    document.getElementById("hero-subtitle").textContent = personal.subtitle;
    document.getElementById("code-name").textContent =
      `"${personal.firstName}"`;
    document.getElementById("code-role").textContent =
      `"${personal.title.split(" ").slice(-2).join(" ")}"`;

    populatePhoto();

    const socialContainer = document.getElementById("hero-social");
    socialContainer.innerHTML = Object.entries(social)
      .filter(([, url]) => url)
      .map(
        ([name, url]) => `
        <a href="${url}" class="hero__social-link" target="_blank" rel="noopener noreferrer" aria-label="${name}">
          ${icons[name] || icons.external}
        </a>
      `,
      )
      .join("");
  }

  // --- Navigation ---
  function populateNav() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.innerHTML = nav
      .map(
        (item) => `
      <li><a href="#${item.id}" class="nav__link">${item.label}</a></li>
    `,
      )
      .join("");
  }

  // --- À propos ---
  function populateAbout() {
    document.getElementById("about-bio").textContent = personal.bio.trim();

    const infoItems = [
      { label: "Email", value: personal.email },
      { label: "Téléphone", value: personal.phone },
      { label: "Localisation", value: personal.location },
    ].filter((item) => item.value);

    document.getElementById("about-info").innerHTML = infoItems
      .map(
        (item) => `
      <li class="about__info-item">
        <span class="about__info-label">${item.label} :</span>
        <span class="about__info-value">${item.value}</span>
      </li>
    `,
      )
      .join("");

    // Mettre à jour les compteurs
    const statNumbers = document.querySelectorAll(".stat-card__number");
    if (statNumbers[1]) statNumbers[1].dataset.count = projects.length;
    if (statNumbers[2]) statNumbers[2].dataset.count = skills.length;
  }

  // --- Compétences (badges de niveau, sans pourcentages) ---
  function populateSkills() {
    const grid = document.getElementById("skills-grid");

    function renderSkills(filter = "all") {
      const filtered =
        filter === "all" ? skills : skills.filter((s) => s.category === filter);

      grid.innerHTML = filtered
        .map(
          (skill) => `
        <div class="skill-card" data-category="${skill.category}">
          <div class="skill-card__header">
            <div class="skill-card__name-group">
              <span class="skill-card__icons">${renderTechIcons(skill.name, "skill-card__icon")}</span>
              <span class="skill-card__name">${skill.name}</span>
            </div>
            <span class="skill-card__badge skill-card__badge--${skill.level}">
              ${skillLevels[skill.level] || skill.level}
            </span>
          </div>
          ${skill.context ? `<p class="skill-card__context">${skill.context}</p>` : ""}
        </div>
      `,
        )
        .join("");

      document.dispatchEvent(new Event("skillsUpdated"));
    }

    renderSkills();

    document.querySelectorAll(".skills__filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".skills__filter")
          .forEach((b) => b.classList.remove("skills__filter--active"));
        btn.classList.add("skills__filter--active");
        renderSkills(btn.dataset.filter);
      });
    });
  }

  // --- Projets (cartes + modal détail) ---
  function populateProjects() {
    const grid = document.getElementById("projects-grid");

    grid.innerHTML = projects
      .map(
        (project, index) => `
      <article class="project-card ${project.featured ? "project-card--featured" : ""}" data-project-index="${index}">
        <div class="project-card__image">
          ${
            project.image
              ? `<img src="${project.image}" alt="${project.title}">`
              : `<span class="project-card__image-placeholder">${icons.code}</span>`
          }
          ${project.featured ? '<span class="project-card__badge">Projet phare</span>' : ""}
        </div>
        <div class="project-card__body">
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__desc">${project.description}</p>
          <div class="project-card__techs">
            ${project.technologies
              .slice(0, 3)
              .map((tech) => `<span class="project-card__tech">${renderTechIcons(tech, "project-card__tech-icon")}${tech}</span>`)
              .join("")}
            ${project.technologies.length > 3 ? `<span class="project-card__tech">+${project.technologies.length - 3}</span>` : ""}
          </div>
          <button class="btn btn--outline btn--sm project-card__detail-btn" data-project-index="${index}">
            ${icons.eye} Voir les détails
          </button>
        </div>
      </article>
    `,
      )
      .join("");

    grid.querySelectorAll(".project-card__detail-btn").forEach((btn) => {
      btn.addEventListener("click", () =>
        openProjectModal(parseInt(btn.dataset.projectIndex, 10)),
      );
    });
  }

  function openProjectModal(index) {
    const project = projects[index];
    if (!project) return;

    const modal = document.getElementById("project-modal");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalFeatures = document.getElementById("modal-features");
    const modalTechs = document.getElementById("modal-techs");
    const modalActions = document.getElementById("modal-actions");

    modalImage.innerHTML = project.image
      ? `<img src="${project.image}" alt="${project.title}">`
      : `<div class="modal__image-placeholder">${icons.code}</div>`;

    modalTitle.textContent = project.title;
    modalDesc.textContent = project.longDescription || project.description;

    modalFeatures.innerHTML = (project.features || [])
      .map((f) => `<li>${f}</li>`)
      .join("");

    modalTechs.innerHTML = project.technologies
      .map((tech) => `<span class="project-card__tech">${renderTechIcons(tech, "project-card__tech-icon")}${tech}</span>`)
      .join("");

    modalActions.innerHTML = `
      ${
        project.github
          ? `
        <a href="${project.github}" class="btn btn--outline" target="_blank" rel="noopener noreferrer">
          ${icons.github} Voir sur GitHub
        </a>
      `
          : ""
      }
      ${
        project.demo
          ? `
        <a href="${project.demo}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">
          ${icons.external} Voir la démo
        </a>
      `
          : ""
      }
    `;

    modal.classList.add("modal--open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    const modal = document.getElementById("project-modal");
    modal.classList.remove("modal--open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function initProjectModal() {
    document
      .getElementById("modal-close")
      .addEventListener("click", closeProjectModal);
    document
      .getElementById("modal-overlay")
      .addEventListener("click", closeProjectModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeProjectModal();
    });
  }

  // --- Parcours ---
  function populateTimeline() {
    document.getElementById("education-list").innerHTML = education
      .map(
        (item) => `
      <div class="timeline__item">
        <span class="timeline__period">${item.period || ""}</span>
        <h4 class="timeline__degree">${item.degree}</h4>
        <p class="timeline__school">${item.school}</p>
        <p class="timeline__desc">${item.description}</p>
      </div>
    `,
      )
      .join("");

    document.getElementById("experience-list").innerHTML = experience.length
      ? experience
          .map(
            (item) => `
          <div class="timeline__item">
            <span class="timeline__period">${item.period}</span>
            <h4 class="timeline__role">${item.role}</h4>
            <p class="timeline__company">${item.company}</p>
            <p class="timeline__desc">${item.description}</p>
          </div>
        `,
          )
          .join("")
      : `<p style="color: var(--color-text-dim); font-size: var(--text-sm);">
        Aucune expérience pour le moment — à venir !
      </p>`;
  }

  // --- Contact ---
  function populateContact() {
    const details = [
      { icon: "mail", text: personal.email },
      { icon: "phone", text: personal.phone },
      { icon: "location", text: personal.location },
    ].filter((d) => d.text);

    document.getElementById("contact-details").innerHTML = details
      .map(
        (d) => `
      <div class="contact__detail">
        <div class="contact__detail-icon">${icons[d.icon]}</div>
        <span class="contact__detail-text">${d.text}</span>
      </div>
    `,
      )
      .join("");

    document.getElementById("contact-social").innerHTML = Object.entries(social)
      .filter(([, url]) => url)
      .map(
        ([name, url]) => `
        <a href="${url}" class="hero__social-link" target="_blank" rel="noopener noreferrer" aria-label="${name}">
          ${icons[name] || icons.external}
        </a>
      `,
      )
      .join("");
  }

  // --- Footer ---
  function populateFooter() {
    document.getElementById("footer-name").textContent = personal.firstName;
    document.getElementById("footer-year").textContent =
      `© ${new Date().getFullYear()}`;
  }

  // --- Menu mobile ---
  function initMobileMenu() {
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("nav__menu--open");
      toggle.classList.toggle("nav__toggle--active");
      toggle.setAttribute("aria-expanded", isOpen);
    });

    menu.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("nav__menu--open");
        toggle.classList.remove("nav__toggle--active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- Navigation active au scroll ---
  function initActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav__link");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                "nav__link--active",
                link.getAttribute("href") === `#${entry.target.id}`,
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
  }

  // --- Formulaire de contact ---
  function initContactForm() {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      const subject = encodeURIComponent(`Portfolio — Message de ${name}`);
      const body = encodeURIComponent(
        `Nom: ${name}\nEmail: ${email}\n\n${message}`,
      );
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;

      form.reset();
    });
  }

  // --- Initialisation ---
  function init() {
    populateNav();
    populateHero();
    populateAbout();
    populateSkills();
    populateProjects();
    populateTimeline();
    populateContact();
    populateFooter();
    initMobileMenu();
    initActiveNav();
    initContactForm();
    initProjectModal();

    document.dispatchEvent(new Event("portfolioReady"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();