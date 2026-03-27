const track = document.getElementById('track');
const viewport = track.parentElement;
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const dotsEl = document.getElementById('dots');

const items = track.querySelectorAll('.carousel__item');
const total = items.length;
const visible = 3;
let idx = 0;

// Crée les points
for (let i = 0; i <= total - visible; i++) {
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
    dots.forEach((d, i) => d.classList.toggle('actif', i === idx));
}

next.addEventListener('click', () => {
    goTo(idx + 1 > total - visible ? 0 : idx + 1);
});

prev.addEventListener('click', () => {
    goTo(idx - 1 < 0 ? total - visible : idx - 1);
});