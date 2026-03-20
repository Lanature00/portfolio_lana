const items = document.querySelectorAll('.parcours__header');

items.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.closest('.parcours__item');
        const details = item.querySelector('.parcours__details');

        item.classList.toggle('ouvert');
        details.classList.toggle('ouvert');
    });
});