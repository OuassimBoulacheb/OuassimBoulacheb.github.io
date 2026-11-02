const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* Année du footer, lueur souris, barre de progression, header au scroll */
$('#year')?.append(new Date().getFullYear());
if (!reduit) addEventListener('pointermove', e => {
  document.body.style.setProperty('--mx', e.clientX + 'px');
  document.body.style.setProperty('--my', e.clientY + 'px');
});
addEventListener('scroll', () => {
  const h = document.documentElement;
  $('#progress').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  $('header').classList.toggle('scrolled', h.scrollTop > 10);
}, { passive: true });

/* Titre : découpe en lettres pour l'animation d'entrée */
const h1 = $('h1[data-split]');
if (h1) {
  const mots = h1.dataset.split.split('|'); let i = 0;
  h1.setAttribute('aria-label', mots.join(' '));
  h1.innerHTML = mots.map(m => `<span class="word" aria-hidden="true">${[...m].map(c => `<span class="ch" style="--i:${i++}">${c}</span>`).join('')}</span>`).join('');
}

/* Grille de points réactive à la souris (hero) */
const cv = $('#dots');
if (cv) {
  const c = cv.getContext('2d'), GAP = 28, R = 150;
  let w, h, dots = [], m = { x: -999, y: -999 }, visible = true;
  const taille = () => {
    const r = cv.parentElement.getBoundingClientRect(), d = devicePixelRatio || 1;
    w = r.width; h = r.height; cv.width = w * d; cv.height = h * d; c.setTransform(d, 0, 0, d, 0, 0);
    dots = [];
    for (let x = GAP / 2; x < w; x += GAP) for (let y = GAP / 2; y < h; y += GAP) dots.push({ x, y, ox: x, oy: y });
  };
  const dessiner = () => {
    c.clearRect(0, 0, w, h);
    for (const p of dots) {
      const dx = p.ox - m.x, dy = p.oy - m.y, d = Math.hypot(dx, dy), f = d < R ? 1 - d / R : 0;
      p.x += (p.ox + dx / (d || 1) * f * 20 - p.x) * .15;
      p.y += (p.oy + dy / (d || 1) * f * 20 - p.y) * .15;
      c.fillStyle = `rgba(142,155,255,${.16 + f * .75})`;
      c.beginPath(); c.arc(p.x, p.y, 1.3 + f * 2, 0, 6.283); c.fill();
    }
    if (!reduit && visible) requestAnimationFrame(dessiner);
  };
  taille(); dessiner();
  addEventListener('resize', () => { taille(); if (reduit) dessiner(); });
  const hero = cv.parentElement;
  hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; });
  hero.addEventListener('pointerleave', () => m = { x: -999, y: -999 });
  new IntersectionObserver(([e]) => { const was = visible; visible = e.isIntersecting; if (visible && !was) dessiner(); }).observe(hero);
}

/* Apparition au scroll */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
$$('.reveal, .skill').forEach(el => io.observe(el));

/* Lien actif selon la section visible (accueil) */
const liens = $$('nav a[href*="#"]');
if (liens.length) {
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) liens.forEach(a => a.classList.toggle('active', a.hash === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => so.observe(s));
}

/* Filtre des compétences */
$$('.skill-filters button').forEach(b => b.onclick = () => {
  $$('.skill-filters button').forEach(x => x.setAttribute('aria-pressed', x === b));
  $$('.skill').forEach(s => s.hidden = b.dataset.cat !== 'all' && s.dataset.cat !== b.dataset.cat);
});

/* Projets */
const liste = $('#projets'), dlg = $('#detail');
const tags = p => `<ul class="tags">${p.tags.map(t => `<li>${t}</li>`).join('')}</ul>`;
function afficher(filtre = 'all', limit = Infinity) {
  const items = PROJETS.filter(p => filtre === 'all' || p.cat === filtre).slice(0, limit);
  liste.innerHTML = '';
  if (!items.length) { liste.innerHTML = '<li class="vide"><strong>Les projets arrivent bientôt</strong>Je prépare les études de cas, repasse un peu plus tard.</li>'; return; }
  items.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<button type="button"><span class="p-title">${p.titre}</span><span class="p-year">${p.annee}</span><span class="p-sum">${p.resume}</span>${tags(p)}</button>`;
    li.querySelector('button').onclick = () => ouvrir(p);
    liste.append(li);
  });
}
function ouvrir(p) {
  dlg.innerHTML = `${p.image ? `<img src="${p.image}" alt="${p.alt || p.titre}" loading="lazy">` : ''}<h3>${p.titre}</h3><p>${p.details}</p>${tags(p)}<div class="actions">${p.lien ? `<a class="btn primary" href="${p.lien}" target="_blank" rel="noopener">Voir le projet</a>` : ''}<button class="btn" type="button" id="fermer">Fermer</button></div>`;
  $('#fermer').onclick = () => dlg.close(); dlg.showModal();
}
dlg?.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
if (liste) {
  afficher('all', +liste.dataset.limit || Infinity);
  $$('.proj-filters button').forEach(b => b.onclick = () => {
    $$('.proj-filters button').forEach(x => x.setAttribute('aria-pressed', x === b));
    afficher(b.dataset.cat);
  });
}

/* Copier l'email */
$('#copier')?.addEventListener('click', async e => {
  e.preventDefault();
  try { await navigator.clipboard.writeText('boulachebouassim@gmail.com'); } catch {}
  const t = $('#toast'); t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 1800);
});
