// uneligne.js - Carousel moderne
(function () {
  'use strict';

  const track = document.getElementById('track');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const dotsEl = document.getElementById('dots');

  if (!track || !prev || !next || !dotsEl) return;

  const items = track.querySelectorAll('.carousel__item');
  const total = items.length;
  let visible = 3;
  let idx = 0;

  function updateVisibleCount() {
    if (window.innerWidth < 768) visible = 1;
    else if (window.innerWidth < 1024) visible = 2;
    else visible = 3;
  }

  // Création des dots
  dotsEl.innerHTML = '';
  for (let i = 0; i <= Math.max(0, total - visible); i++) {
    const dot = document.createElement('button');
    dot.classList.add('carousel__dot');
    if (i === 0) dot.classList.add('actif');
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  }
  const dots = dotsEl.querySelectorAll('.carousel__dot');

  function goTo(n) {
    idx = Math.max(0, Math.min(n, total - visible));
    const itemWidth = items[0].offsetWidth + 24;
    track.style.transform = `translateX(-${idx * itemWidth}px)`;

    dots.forEach((d, i) => {
      d.classList.toggle('actif', i === idx);
    });
  }

  next.addEventListener('click', () => {
    goTo(idx + 1 > total - visible ? 0 : idx + 1);
  });

  prev.addEventListener('click', () => {
    goTo(idx - 1 < 0 ? total - visible : idx - 1);
  });

  window.addEventListener('resize', () => {
    updateVisibleCount();
    goTo(idx);
  });

  // Initialisation
  updateVisibleCount();
  goTo(0);
})();