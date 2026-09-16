document.addEventListener('DOMContentLoaded', () => {
    const heroes = document.querySelectorAll(
        '[class*="__hero"], .projet-hero-full'
    );

    if (!heroes.length) return;

    heroes.forEach((hero) => {
        if (hero.querySelector('.discover')) return;

        const discover = document.createElement('a');

        discover.className = 'discover';
        discover.href = '#';
        discover.setAttribute('aria-label', 'Découvrir le projet');

        discover.innerHTML = `
            <span>Découvrir le projet</span>
            <span class="discover__arrow">↓</span>
        `;

        hero.appendChild(discover);

        discover.addEventListener('click', (event) => {
            event.preventDefault();

            const nextSection = hero.nextElementSibling;

            if (nextSection) {
                const offset = 80;

                const position =
                    nextSection.getBoundingClientRect().top +
                    window.scrollY -
                    offset;

                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });
});