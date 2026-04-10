// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
if (cursor && cursorRing) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
  document.querySelectorAll('a, button, .skill-card, .project-card, .contact-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      cursorRing.style.transform = 'translate(-50%,-50%) scale(1.5)';
      cursorRing.style.borderColor = 'rgba(0,245,160,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorRing.style.borderColor = 'rgba(0,245,160,0.4)';
    });
  });
}

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animationPlayState = 'running';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll('.fade-in').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// Animate skill bars on scroll
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target.querySelector('.skill-fill');
      if (fill) {
        const target = fill.dataset.width;
        setTimeout(() => { fill.style.width = target; }, 200);
      }
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => {
  const fill = card.querySelector('.skill-fill');
  if (fill) {
    const w = fill.style.width;
    fill.dataset.width = w;
    fill.style.width = '0%';
    barObserver.observe(card);
  }
});

// Typing effect on hero
const typed = document.querySelector('[data-typed]');
if (typed) {
  const texts = typed.dataset.typed.split('|');
  let ti = 0, ci = 0, deleting = false;
  function type() {
    const current = texts[ti];
    if (!deleting) {
      typed.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      typed.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; }
    }
    setTimeout(type, deleting ? 45 : 80);
  }
  type();
}

// Nav active on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current || a.getAttribute('href')?.includes(current)) {
      a.classList.add('active');
    }
  });
}, { passive: true });
