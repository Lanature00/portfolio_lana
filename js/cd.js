document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.cd-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optionnel : on arrête d'observer une fois l'anim terminée
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(el => observer.observe(el));
});