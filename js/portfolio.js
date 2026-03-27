const filtres = document.querySelectorAll('.portfolio__filtre');
const cartes = document.querySelectorAll('.portfolio__carte');

filtres.forEach(btn => {
    btn.addEventListener('click', () => {
        filtres.forEach(b => b.classList.remove('actif'));
        btn.classList.add('actif');

        const filtre = btn.dataset.filtre;
        cartes.forEach(carte => {
            if (filtre === 'tous' || carte.dataset.categorie === filtre) {
                carte.style.display = 'block';
            } else {
                carte.style.display = 'none';
            }
        });
    });
});