(function initCarousel() {
    const track = document.getElementById('bonheur-track');
    const prevBtn = document.getElementById('bonheur-prev');
    const nextBtn = document.getElementById('bonheur-next');
    const dotsWrap = document.getElementById('bonheur-dots');

    if (!track || !prevBtn || !nextBtn || !dotsWrap) return;

    const items = Array.from(
        track.querySelectorAll('.p-bonheur__carousel-item')
    );

    if (!items.length) return;

    let current = 0;
    let visible = getVisible();
    let maxIndex = Math.max(0, items.length - visible);

    function getVisible() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 1000) return 2;
        return 3;
    }

    function buildDots() {
        dotsWrap.innerHTML = '';

        const count = maxIndex + 1;

        for (let i = 0; i < count; i++) {
            const dot = document.createElement('button');

            dot.className = 'p-bonheur__carousel-dot';

            if (i === current) {
                dot.classList.add('active');
            }

            dot.setAttribute('aria-label', `Aller à la page ${i + 1}`);

            dot.addEventListener('click', () => {
                goTo(i);
            });

            dotsWrap.appendChild(dot);
        }
    }

    function update() {
        if (!items[0]) return;

        const gap = 24;
        const itemWidth = items[0].offsetWidth + gap;

        track.style.transform = `translateX(-${current * itemWidth}px)`;

        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === maxIndex;

        const dots = dotsWrap.querySelectorAll(
            '.p-bonheur__carousel-dot'
        );

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === current);
        });
    }

    function goTo(index) {
        current = Math.max(0, Math.min(index, maxIndex));
        update();
    }

    prevBtn.addEventListener('click', () => {
        goTo(current - 1);
    });

    nextBtn.addEventListener('click', () => {
        goTo(current + 1);
    });

    window.addEventListener('resize', () => {
        visible = getVisible();
        maxIndex = Math.max(0, items.length - visible);
        current = Math.min(current, maxIndex);

        buildDots();
        update();
    });

    buildDots();
    update();
})();