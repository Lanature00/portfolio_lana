(function () {
  'use strict';

  const track = document.getElementById('track');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const dotsEl = document.getElementById('dots');

  if (!track || !prev || !next || !dotsEl) return;

  const items = track.querySelectorAll('.carousel__item');
  const total = items.length;
  const gap = 24;
  let visible = 3;
  let idx = 0;

  function getVisible() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, total - visible);
  }

  function createDots() {
    dotsEl.innerHTML = '';

    for (let i = 0; i <= getMaxIndex(); i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel__dot');

      if (i === idx) {
        dot.classList.add('actif');
      }

      dot.addEventListener('click', () => {
        goTo(i);
      });

      dotsEl.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsEl.querySelectorAll('.carousel__dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('actif', i === idx);
    });
  }

  function goTo(n) {
    idx = Math.max(0, Math.min(n, getMaxIndex()));

    const itemWidth = items[0].offsetWidth + gap;
    track.style.transform = `translateX(-${idx * itemWidth}px)`;

    updateDots();
  }

  function updateCarousel() {
    visible = getVisible();

    if (idx > getMaxIndex()) {
      idx = getMaxIndex();
    }

    createDots();
    goTo(idx);
  }

  next.addEventListener('click', () => {
    if (idx >= getMaxIndex()) {
      goTo(0);
    } else {
      goTo(idx + 1);
    }
  });

  prev.addEventListener('click', () => {
    if (idx <= 0) {
      goTo(getMaxIndex());
    } else {
      goTo(idx - 1);
    }
  });

  window.addEventListener('resize', updateCarousel);

  updateCarousel();
})();