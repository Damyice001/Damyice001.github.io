const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const themeToggle = document.querySelector("#theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
const initialTheme = savedTheme === "dark" ? "dark" : "light";

document.body.dataset.theme = initialTheme;

if (themeToggle instanceof HTMLButtonElement) {
  const updateThemeButton = () => {
    const isDark = document.body.dataset.theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    const nextMode = isDark ? "light" : "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${nextMode} mode`);
    themeToggle.title = `Switch to ${nextMode} mode`;
    themeToggle.querySelector(".theme-toggle-label").textContent = `${nextMode === "light" ? "Light" : "Dark"} mode`;
  };

  updateThemeButton();
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = nextTheme;
    localStorage.setItem("portfolio-theme", nextTheme);
    updateThemeButton();
  });
}

const typedLine = document.querySelector("#typed-line");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typedLine instanceof HTMLElement && !prefersReducedMotion) {
  const fullText = typedLine.textContent;
  let position = 0;
  typedLine.textContent = "";

  const typeNextCharacter = () => {
    typedLine.textContent = fullText.slice(0, position + 1);
    position += 1;

    if (position < fullText.length) {
      window.setTimeout(typeNextCharacter, 42);
    }
  };

  window.setTimeout(typeNextCharacter, 350);
}

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealTargets = document.querySelectorAll(".section-block, .highlights");

  revealTargets.forEach((element) => {
    element.dataset.reveal = "";
  });
  document.documentElement.classList.add("reveal-ready");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element) => revealObserver.observe(element));
}

const contactForm = document.querySelector("#contact-form");

if (contactForm instanceof HTMLFormElement) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name")).trim();
    const email = String(formData.get("email")).trim();
    const message = String(formData.get("message")).trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:Babsonblamo@gmail.com?subject=${subject}&body=${body}`;
  });
}