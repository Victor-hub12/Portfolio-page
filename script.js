document.documentElement.classList.add("js");

const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.setAttribute("aria-pressed", "true");
  themeToggle.setAttribute("aria-label", "Toggle dark theme");
}

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light");
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", isLight ? "Toggle dark theme" : "Toggle light theme");
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    const activeFilter = document.querySelector(".filter.active");
    if (activeFilter) activeFilter.classList.remove("active");
    button.classList.add("active");

    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const progressBar = document.querySelector(".scroll-progress");
const updateScrollProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressBar.style.width = `${Math.min(progress * 100, 100)}%`;
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
  document.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
  }, { passive: true });

  document.querySelectorAll(".project-preview").forEach((preview) => {
    preview.addEventListener("pointermove", (event) => {
      const bounds = preview.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const rotateY = (x - 0.5) * 5;
      const rotateX = (0.5 - y) * 5;
      preview.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    });
    preview.addEventListener("pointerleave", () => {
      preview.style.transform = "";
    });
  });
}

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name").toString().trim();
  const email = formData.get("email").toString().trim();
  const message = formData.get("message").toString().trim();
  const recipient = contactForm.dataset.recipient;
  const subject = `Portfolio inquiry from ${name}`;
  const body = `Hi Victor,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  contactForm.querySelector(".form-status").textContent = "Opening your email app…";
  window.location.href = mailto;
});

document.getElementById("year").textContent = new Date().getFullYear();
