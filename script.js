
/* =========================================
   WEBHUB4U — JAVASCRIPT
   VERSION 1.0
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTS
  const loader = document.querySelector("#loader");
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".scroll-progress");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const year = document.querySelector("#year");

  // 1. PAGE LOADER
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader?.classList.add("hide");
    }, 500);
  });

  // Fallback in case the load event already fired
  if (document.readyState === "complete") {
    setTimeout(() => loader?.classList.add("hide"), 500);
  }

  // 2. SCROLL PROGRESS + HEADER
  function updateScroll() {

    const scrollTop = window.scrollY;

    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage = pageHeight > 0
      ? (scrollTop / pageHeight) * 100
      : 0;

    if (progress) {
      progress.style.width = percentage + "%";
    }

    if (header) {
      header.classList.toggle("scrolled", scrollTop > 40);
    }

  }

  window.addEventListener("scroll", updateScroll, {
    passive: true
  });

  updateScroll();

  // 3. MOBILE NAVIGATION
  function closeMenu() {

    nav?.classList.remove("open");

    menuToggle?.setAttribute("aria-expanded", "false");

    menuToggle?.setAttribute(
      "aria-label",
      "Open navigation"
    );

  }

  menuToggle?.addEventListener("click", () => {

    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation" : "Close navigation"
    );

    nav?.classList.toggle("open", !isOpen);

  });

  navLinks.forEach(link => {

    link.addEventListener("click", closeMenu);

  });

  // Close navigation when clicking outside
  document.addEventListener("click", event => {

    if (
      nav?.classList.contains("open") &&
      !nav.contains(event.target) &&
      !menuToggle?.contains(event.target)
    ) {
      closeMenu();
    }

  });

  // Close menu with Escape key
  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });

  // 4. SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });

  }

  // 5. PRICING PACKAGE SELECTION
  const packageSelect = document.querySelector("#package-select");

  const packageButtons = document.querySelectorAll("[data-plan]");

  packageButtons.forEach(button => {

    button.addEventListener("click", () => {

      const selectedPlan = button.dataset.plan;

      const contactSection = document.querySelector("#contact");

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth"
        });
      }

      // Store selected package for future form integration
      sessionStorage.setItem(
        "webhub4u_selected_plan",
        selectedPlan
      );

      if (packageSelect) {

        const matchingOption = Array.from(packageSelect.options)
          .find(option =>
            option.value.toLowerCase() === selectedPlan.toLowerCase()
          );

        if (matchingOption) {
          packageSelect.value = matchingOption.value;
        }

      }

    });

  });

  // 6. AUTOMATIC COPYRIGHT YEAR
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 7. CLOSE MENU WHEN SCREEN RESIZES TO DESKTOP
  window.addEventListener("resize", () => {

    if (window.innerWidth > 700) {
      closeMenu();
    }

  });

  // 8. SMOOTH INTERNAL NAVIGATION
  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        history.replaceState(null, "", targetId);

      }

    });

  });

  console.log("Webhub4u website initialized successfully.");

});
