// ========================
// LUMA STORE - FIXED APP
// ========================

// Intersection Observer для reveal анимаций
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -20px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

// ==========================================
// COUNTER ANIMATION (оптимизировано)
// ==========================================
const counters = document.querySelectorAll(".counter");
const animatedCounters = new Set();

const animateCounter = (element) => {
  if (animatedCounters.has(element)) return;
  animatedCounters.add(element);

  const target = Number(element.dataset.target || 0);
  let current = 0;
  const increment = target / 60;
  
  const update = () => {
    current += increment;
    if (current >= target) {
      element.textContent = `${target}+`;
    } else {
      element.textContent = `${Math.floor(current)}+`;
      requestAnimationFrame(update);
    }
  };
  
  update();
};

if ("IntersectionObserver" in window && counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => counterObserver.observe(counter));
}

// ==========================================
// FILTER FUNCTIONALITY
// ==========================================
const filterButtons = document.querySelectorAll("[data-filter]");
const filterCards = document.querySelectorAll("[data-category]");

if (filterButtons.length > 0 && filterCards.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const activeFilter = button.dataset.filter;
      
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      filterCards.forEach((card) => {
        const cardCategory = card.dataset.category;
        const shouldShow = activeFilter === "all" || cardCategory === activeFilter;
        card.classList.toggle("hide", !shouldShow);
      });
    });
  });
}

// ==========================================
// MAGNETIC BUTTON EFFECT (оптимизировано)
// ==========================================
const magneticButtons = document.querySelectorAll(".magnetic");

magneticButtons.forEach((button) => {
  let timeoutId = null;

  button.addEventListener("mousemove", (event) => {
    if (timeoutId) clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    }, 0);
  });

  button.addEventListener("mouseleave", () => {
    if (timeoutId) clearTimeout(timeoutId);
    button.style.transform = "translate(0, 0)";
  });
});

// ==========================================
// TILT CARD EFFECT (оптимизировано)
// ==========================================
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  let isAnimating = false;

  card.addEventListener("mousemove", (event) => {
    if (isAnimating) return;
    
    isAnimating = true;
    requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      isAnimating = false;
    });
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});

// ==========================================
// FORM HANDLING (SAFE)
// ==========================================
const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nameInput = form.querySelector('[name="name"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const messageInput = form.querySelector('[name="message"]');

    if (!nameInput || !phoneInput || !messageInput) return;

    const name = nameInput.value;
    const phone = phoneInput.value;
    const message = messageInput.value;

    if (!name || !phone || !message) {
      alert("Заполни все поля!");
      return;
    }

    alert(`Спасибо, ${name}! Мы вскоре свяжемся по номеру ${phone}`);
    form.reset();
  });
});

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==========================================
// MARQUEE ANIMATION (fix для бесконечной прокрутки)
// ==========================================
const marqueeTrack = document.querySelector(".marquee-track");
if (marqueeTrack) {
  const marqueeItems = marqueeTrack.innerHTML;
  marqueeTrack.innerHTML = marqueeItems + marqueeItems;
}

console.log("✅ App loaded successfully");
