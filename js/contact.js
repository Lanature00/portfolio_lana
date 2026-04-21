document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const successBanner = document.getElementById('contact-success');

    if (!form || !successBanner) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            if (response.ok) {
                // Réinitialise le formulaire
                form.reset();

                // Affiche le banner
                successBanner.style.display = 'block';
                setTimeout(() => {
                    successBanner.classList.add('contact__success--visible');
                }, 50);

                // Masque le banner après 5 secondes
                setTimeout(() => {
                    successBanner.classList.remove('contact__success--visible');
                    setTimeout(() => {
                        successBanner.style.display = 'none';
                    }, 300);
                }, 5000);

            } else {
                alert('Une erreur est survenue, veuillez réessayer.');
            }

        } catch (error) {
            alert('Une erreur est survenue, veuillez réessayer.');
        }
    });
});