// Carousel optimisé pour mobile et performance
const track = document.getElementById('track');
const viewport = track.parentElement;
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const dotsEl = document.getElementById('dots');

const items = track.querySelectorAll('.carousel__item');
const total = items.length;
let idx = 0;
let isTransitioning = false;

function getVisible() {
    if (window.innerWidth <= 480) return 1;
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
    if (isTransitioning) return; // Éviter les clics pendant la transition
    
    const visible = getVisible();
    idx = Math.max(0, Math.min(n, total - visible));
    const itemWidth = items[0].offsetWidth + 24; // gap
    
    isTransitioning = true;
    track.style.transform = `translateX(-${idx * itemWidth}px)`;
    
    // Mettre à jour les dots
    getDots().forEach((d, i) => d.classList.toggle('actif', i === idx));
    
    // Réinitialiser après la transition
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

// Événements avec debounce
let nextTimeout, prevTimeout;

next.addEventListener('click', () => {
    clearTimeout(nextTimeout);
    nextTimeout = setTimeout(() => {
        const visible = getVisible();
        goTo(idx + 1 > total - visible ? 0 : idx + 1);
    }, 50);
});

prev.addEventListener('click', () => {
    clearTimeout(prevTimeout);
    prevTimeout = setTimeout(() => {
        const visible = getVisible();
        goTo(idx - 1 < 0 ? total - visible : idx - 1);
    }, 50);
});

// Gestion du redimensionnement avec debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        buildDots();
        goTo(0);
    }, 150);
});

// Lazy loading des images du carousel
const carouselImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

items.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
        carouselImageObserver.observe(img);
    }
});

// Init
buildDots();
