/* Studio Retouch Pro — site interactions */

// Typing headline in the hero/portfolio title
const typingPhrases = [
  "Clipping Path",
  "Jewelry Retouching",
  "Real Estate Editing",
  "AI Creative Studio",
  "Color Correction",
  "Ghost Mannequin"
];

function startTyping() {
  const el = document.getElementById("typing-text");
  if (!el) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 120;

  function type() {
    const currentPhrase = typingPhrases[phraseIndex];
    el.textContent = isDeleting
      ? currentPhrase.substring(0, charIndex - 1)
      : currentPhrase.substring(0, charIndex + 1);

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      typeSpeed = 400;
    } else {
      typeSpeed = isDeleting ? 40 : 120;
    }
    setTimeout(type, typeSpeed);
  }
  type();
}

// "See more / see less" toggle for service descriptions
function toggleText(btn) {
  const parentP = btn.previousElementSibling;
  const moreText = parentP.querySelector(".more-text");
  if (!moreText) return;

  const isHidden = moreText.style.display === "none" || moreText.style.display === "";
  moreText.style.display = isHidden ? "inline" : "none";
  btn.textContent = isHidden ? "See Less" : "See More";
  btn.setAttribute("aria-expanded", isHidden ? "true" : "false");
}

// FAQ accordion
function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  if (!item) return;
  const isOpen = item.classList.toggle("open");
  btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

// Sticky navbar active-link highlight on scroll
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => link.classList.remove("active"));
          const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

// ---------------------------------------------------------------------------
// Price calculator
// ---------------------------------------------------------------------------
const EUR_RATE = 0.92; // approximate USD -> EUR, for display only
let activeCurrency = "USD";

function setCurrency(code) {
  activeCurrency = code;
  document.getElementById("currency-usd").classList.toggle("active", code === "USD");
  document.getElementById("currency-eur").classList.toggle("active", code === "EUR");
  updateCalculator();
}

function formatMoney(amount) {
  const value = activeCurrency === "EUR" ? amount * EUR_RATE : amount;
  const symbol = activeCurrency === "EUR" ? "€" : "$";
  return `${symbol}${value.toFixed(2)}`;
}

function updateCalculator() {
  const serviceSelect = document.getElementById("calc-service");
  const qtyInput = document.getElementById("calc-qty");
  const turnaroundSelect = document.getElementById("calc-turnaround");
  const totalEl = document.getElementById("calc-total-amount");
  const discountNote = document.getElementById("calc-discount-note");
  if (!serviceSelect || !qtyInput || !turnaroundSelect || !totalEl) return;

  const rate = parseFloat(serviceSelect.selectedOptions[0].dataset.rate);
  let qty = parseInt(qtyInput.value, 10);
  if (isNaN(qty) || qty < 1) qty = 1;
  const turnaroundMultiplier = parseFloat(turnaroundSelect.value);

  let discount = 0;
  if (qty >= 500) discount = 0.25;
  else if (qty >= 100) discount = 0.2;
  else if (qty >= 50) discount = 0.1;

  const subtotal = rate * qty * turnaroundMultiplier;
  const total = subtotal * (1 - discount);

  totalEl.textContent = formatMoney(total);

  if (discount > 0) {
    discountNote.textContent = `Bulk discount applied: ${Math.round(discount * 100)}% off ${qty} images.`;
    discountNote.classList.add("show");
  } else {
    discountNote.classList.remove("show");
  }
}

function applyEstimateToOrderForm() {
  const serviceSelect = document.getElementById("calc-service");
  const qtyInput = document.getElementById("calc-qty");
  const turnaroundSelect = document.getElementById("calc-turnaround");
  const totalEl = document.getElementById("calc-total-amount");
  const orderService = document.getElementById("order-service");
  const orderNotes = document.getElementById("order-notes");
  const orderEstimate = document.getElementById("order-estimate");
  if (!serviceSelect || !orderService) return;

  const serviceLabel = serviceSelect.selectedOptions[0].textContent;
  const turnaroundLabel = turnaroundSelect.selectedOptions[0].textContent;

  // Match the calculator's service to the closest order-form option, if present
  for (const opt of orderService.options) {
    if (opt.value === serviceSelect.value) {
      orderService.value = opt.value;
      break;
    }
  }

  if (orderNotes) {
    orderNotes.value = `${qtyInput.value} images, ${serviceLabel}, ${turnaroundLabel}. Estimated total: ${totalEl.textContent}.`;
  }
  if (orderEstimate) {
    orderEstimate.value = totalEl.textContent;
  }
}

function initCalculator() {
  const serviceSelect = document.getElementById("calc-service");
  if (!serviceSelect) return;
  ["calc-service", "calc-qty", "calc-turnaround"].forEach((id) => {
    document.getElementById(id).addEventListener("input", updateCalculator);
  });
  updateCalculator();
}

// ---------------------------------------------------------------------------
// Scroll-reveal for editorial section heads and cards
// ---------------------------------------------------------------------------
function initReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((el) => observer.observe(el));
}

// ---------------------------------------------------------------------------
// Live chat widget
// ---------------------------------------------------------------------------
function openChat() {
  document.getElementById("chat-panel").classList.add("open");
}
function closeChat() {
  document.getElementById("chat-panel").classList.remove("open");
}

function initChatForm() {
  const form = document.getElementById("chat-form");
  const status = document.getElementById("chat-status");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (res.ok) {
        form.reset();
        form.style.display = "none";
        status.classList.add("show");
      } else {
        submitBtn.textContent = "Send Message";
        submitBtn.disabled = false;
        status.textContent = "Something went wrong — please email us directly.";
        status.classList.add("show");
      }
    } catch (err) {
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
      status.textContent = "Something went wrong — please email us directly.";
      status.classList.add("show");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  startTyping();
  initScrollSpy();
  initCalculator();
  initReveal();
  initChatForm();
});
