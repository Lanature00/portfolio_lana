const track = document.getElementById('track');
const viewport = track.parentElement;
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const dotsEl = document.getElementById('dots');

const items = track.querySelectorAll('.carousel__item');
const total = items.length;
let idx = 0;

function getVisible() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function buildDots() {
    dotsEl.innerHTML = '';
    const visible = getVisible();
    const count = total - visible;

    for (let i = 0; i <= count; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel__dot');
        if (i === 0) dot.classList.add('actif');
        dot.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(dot);
    }
}

function getDots() {
    return dotsEl.querySelectorAll('.carousel__dot');
}

function goTo(n) {
    const visible = getVisible();
    idx = Math.max(0, Math.min(n, total - visible));
    const itemWidth = items[0].offsetWidth + 24;
    track.style.transform = `translateX(-${idx * itemWidth}px)`;
    getDots().forEach((d, i) => d.classList.toggle('actif', i === idx));
}

next.addEventListener('click', () => {
    const visible = getVisible();
    goTo(idx + 1 > total - visible ? 0 : idx + 1);
});

prev.addEventListener('click', () => {
    const visible = getVisible();
    goTo(idx - 1 < 0 ? total - visible : idx - 1);
});

window.addEventListener('resize', () => {
    buildDots();
    goTo(0);
});

// Init
buildDots();