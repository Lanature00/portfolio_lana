HEAD
(function initCarousel() {
    const track    = document.getElementById('track');
    const prevBtn  = document.getElementById('prev');
    const nextBtn  = document.getElementById('next');
    const dotsWrap = document.getElementById('dots');

    if (!track || !prevBtn || !nextBtn || !dotsWrap) return;

    const items = Array.from(track.querySelectorAll('.carousel__item'));
    if (items.length === 0) return;

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


    function getVisible() {
        const w = window.innerWidth;
        if (w <= 768)  return 1;
        if (w <= 1024) return 2;
        return 3;
    }

    let current  = 0;
    let visible  = getVisible();
    let maxIndex = Math.max(0, items.length - visible);

HEAD
    function buildDots() {
        dotsWrap.innerHTML = '';
        const count = maxIndex + 1;
        for (let i = 0; i < count; i++) {
            const btn = document.createElement('button');
            btn.className = 'carousel__dot' + (i === current ? ' actif' : '');
            btn.setAttribute('aria-label', `Page ${i + 1}`);
            btn.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(btn);
        }
    }

    function updateDots() {
        dotsWrap.querySelectorAll('.carousel__dot')
            .forEach((d, i) => d.classList.toggle('actif', i === current));
    }

    function goTo(index) {
        current = Math.max(0, Math.min(index, maxIndex));

        // Recalcule à chaque appel pour tenir compte du resize
        const gap       = 24;
        const itemWidth = items[0].offsetWidth + gap;
        track.style.transform = `translateX(-${current * itemWidth}px)`;

        updateDots();
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === maxIndex;
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    window.addEventListener('resize', () => {
        visible  = getVisible();
        maxIndex = Math.max(0, items.length - visible);
        current  = Math.min(current, maxIndex);
        buildDots();
        goTo(current);
    });

    // Init : buildDots PUIS goTo(0) — ordre important
    buildDots();
    goTo(0);
})();

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
