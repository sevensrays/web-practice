document.addEventListener("DOMContentLoaded", () => {
  // Mobile burger menu
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      burger.classList.toggle("open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Scroll-to-top button
  const scrollTopBtn = document.querySelector(".scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 300);
    });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Modal dialog and form validation
  const modal = document.getElementById("contactModal");
  const openBtns = document.querySelectorAll("[data-open-modal]");
  const closeBtn = document.querySelector("[data-close-modal]");
  const contactForm = document.getElementById("contactForm");

  const openModal = () => {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    if (!modal) return;
    // Blur focused element inside modal before hiding it to avoid aria-hidden focus warnings
    if (document.activeElement && modal.contains(document.activeElement)) {
      document.activeElement.blur();
    }
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  openBtns.forEach((btn) => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("modalName");
      const email = document.getElementById("modalEmail");
      const message = document.getElementById("modalMessage");

      const nameErr = document.getElementById("nameError");
      const emailErr = document.getElementById("emailError");
      const msgErr = document.getElementById("messageError");
      const success = document.getElementById("formSuccess");

      nameErr.textContent = "";
      emailErr.textContent = "";
      msgErr.textContent = "";
      success.textContent = "";

      let valid = true;
      if (name.value.trim().length < 2) {
        nameErr.textContent = "Введіть ім'я (мінімум 2 символи).";
        valid = false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        emailErr.textContent = "Введіть коректний e-mail.";
        valid = false;
      }
      if (message.value.trim().length < 10) {
        msgErr.textContent = "Мінімум 10 символів у повідомленні.";
        valid = false;
      }

      if (valid) {
        success.textContent = "Дякуємо! Заявку успішно надіслано.";
        contactForm.reset();
      }
    });
  }

  // Newsletter form validation
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input[type='email']");
      const status = document.querySelector(".newsletter-status");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        status.textContent = "Будь ласка, введіть коректну електронну пошту.";
        return;
      }
      status.textContent = "Ви успішно підписалися на розсилку!";
      newsletterForm.reset();
    });
  }
});
