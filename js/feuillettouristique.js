(function initCarousel() {
    const track   = document.getElementById('track');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const dotsEl  = document.getElementById('dots');

    if (!track) return;

    const items = Array.from(track.children);

    let current = 0;

    function getVisible() {
        const w = window.innerWidth;
        if (w <= 768) return 1;
        if (w <= 1024) return 2;
        return 3;
    }

    function getGap() {
        const style = window.getComputedStyle(track);
        return parseInt(style.gap) || 0;
    }

    function getItemWidth() {
        return items[0].offsetWidth + getGap();
    }

    function getMaxIndex() {
        return items.length - getVisible();
    }

    function goTo(index) {
        current = Math.max(0, Math.min(index, getMaxIndex()));
        track.style.transform = `translateX(-${current * getItemWidth()}px)`;
        updateDots();
    }

    function buildDots() {
        dotsEl.innerHTML = '';
        for (let i = 0; i <= getMaxIndex(); i++) {
            const btn = document.createElement('button');
            btn.className = 'carousel__dot';
            if (i === current) btn.classList.add('actif');

            btn.addEventListener('click', () => goTo(i));
            dotsEl.appendChild(btn);
        }
    }

    function updateDots() {
        [...dotsEl.children].forEach((dot, i) => {
            dot.classList.toggle('actif', i === current);
        });
    }

    prevBtn.addEventListener('click', () => {
        goTo(current - 1);
    });

    nextBtn.addEventListener('click', () => {
        goTo(current + 1);
    });

    window.addEventListener('resize', () => {
        buildDots();
        goTo(current);
    });

    buildDots();
    goTo(0);
})();