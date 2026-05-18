(function initCarousel() {
    const track    = document.getElementById('track');
    const prevBtn  = document.getElementById('prev');
    const nextBtn  = document.getElementById('next');
    const dotsWrap = document.getElementById('dots');

    if (!track || !prevBtn || !nextBtn || !dotsWrap) return;

    const items = Array.from(track.querySelectorAll('.carousel__item'));
    if (items.length === 0) return;

    function getVisible() {
        const w = window.innerWidth;
        if (w <= 768)  return 1;
        if (w <= 1024) return 2;
        return 3;
    }

    let current  = 0;
    let visible  = getVisible();
    let maxIndex = Math.max(0, items.length - visible);

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