// =============================================
//  PORTFOLIO — VEDANTI DALVI
//  script.js  |  All interactions
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────
  // 1. PAGE LOADER
  // ─────────────────────────────────────
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 1600);


  // ─────────────────────────────────────
  // 2. CUSTOM CURSOR
  // ─────────────────────────────────────
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let rx = 0, ry = 0, mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .proj-card, .skill-card, .chip, input, textarea, select').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
  });

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '0.7'; });


  // ─────────────────────────────────────
  // 3. STICKY NAV
  // ─────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });


  // ─────────────────────────────────────
  // 4. MOBILE MENU
  // ─────────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobOverlay = document.getElementById('mobOverlay');
  const mobClose   = document.getElementById('mobClose');
  let menuOpen = false;

  function openMenu() {
    menuOpen = true;
    mobOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
  }

  window.closeMenu = function () {
    menuOpen = false;
    mobOverlay.classList.remove('open');
    document.body.style.overflow = '';
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
  };

  hamburger.addEventListener('click', () => menuOpen ? window.closeMenu() : openMenu());
  mobClose.addEventListener('click', window.closeMenu);


  // ─────────────────────────────────────
  // 5. SCROLL REVEAL
  // ─────────────────────────────────────
  const slideEls = document.querySelectorAll('.slide-up');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.querySelectorAll('.slide-up:not(.visible)')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), Math.max(0, idx * 80));
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  slideEls.forEach(el => revealObs.observe(el));


  // ─────────────────────────────────────
  // 6. ANIMATED COUNTERS
  // ─────────────────────────────────────
  const counters = document.querySelectorAll('.hstat-num');

  function runCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const dur = 1800, step = 16;
    const inc = target / (dur / step);
    let cur = 0;
    const id = setInterval(() => {
      cur += inc;
      if (cur >= target) { cur = target; clearInterval(id); }
      el.textContent = Math.floor(cur);
    }, step);
  }

  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && e.target.textContent === '0') {
        runCounter(e.target);
        cntObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.7 });

  counters.forEach(c => cntObs.observe(c));


  // ─────────────────────────────────────
  // 7. SKILL BAR ANIMATION
  // ─────────────────────────────────────
  const fills = document.querySelectorAll('.skill-fill');

  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const width = e.target.dataset.width;
        e.target.style.width = width + '%';
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(f => barObs.observe(f));


  // ─────────────────────────────────────
  // 8. SMOOTH SCROLL
  // ─────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    });
  });


  // ─────────────────────────────────────
  // 9. ACTIVE NAV LINK HIGHLIGHT
  // ─────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const activeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--white)';
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => activeObs.observe(s));


  // ─────────────────────────────────────
  // ─────────────────────────────────────
// 10. CONTACT FORM (CONNECTED TO BACKEND)
// ─────────────────────────────────────
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const btn = form.querySelector('.submit-btn');
  const label = btn.querySelector('.btn-label');

  label.textContent = 'Sending…';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  const data = {
    fname: document.getElementById('fname').value,
    lname: document.getElementById('lname').value,
    email: document.getElementById('email').value,
    budget: document.getElementById('budget').value,
    message: document.getElementById('message').value
  };

  fetch('http://localhost:5000/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(response => {
    console.log(response);

    label.textContent = 'Send Message';
    btn.disabled = false;
    btn.style.opacity = '1';

    success.classList.add('show');
    form.reset();

    setTimeout(() => success.classList.remove('show'), 6000);
  })
  .catch(err => {
    console.log(err);
    label.textContent = 'Error ❌';
    btn.disabled = false;
  });
});


  // ─────────────────────────────────────
  // 11. HERO PARALLAX
  // ─────────────────────────────────────
  const heroFrame = document.querySelector('.hero-img-frame img');
  if (heroFrame) {
    window.addEventListener('scroll', () => {
      heroFrame.style.transform = `translateY(${window.scrollY * 0.07}px)`;
    }, { passive: true });
  }


  // ─────────────────────────────────────
  // 12. MARQUEE PAUSE ON HOVER
  // ─────────────────────────────────────
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => marqueeTrack.style.animationPlayState = 'paused');
    marqueeTrack.addEventListener('mouseleave', () => marqueeTrack.style.animationPlayState = 'running');
  }


  console.log('%c✦ Vedanti Dalvi — Portfolio Loaded', 'background:linear-gradient(135deg,#7c3aed,#ec4899);color:#fff;padding:6px 16px;border-radius:4px;font-weight:600;');
});
