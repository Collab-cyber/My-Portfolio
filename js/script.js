// ===== Mobile nav toggle =====
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Scroll reveal + skill bar fill =====
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // if this reveal contains skill bars, animate them
        entry.target.querySelectorAll('.skill-bar__fill').forEach(fill => {
          const pct = fill.getAttribute('data-fill');
          requestAnimationFrame(() => { fill.style.width = pct + '%'; });
        });

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  // fallback: show everything immediately
  revealEls.forEach(el => el.classList.add('is-visible'));
  document.querySelectorAll('.skill-bar__fill').forEach(fill => {
    fill.style.width = fill.getAttribute('data-fill') + '%';
  });
}

// ===== Contact form -> mailto =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    window.location.href = `mailto:jeanneekeegabuat@gmail.com?subject=${subject}&body=${body}`;
  });
}
