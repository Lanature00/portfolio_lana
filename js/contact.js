document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const successBanner = document.getElementById('contact-success');
    const inputs = document.querySelectorAll('.contact__input');

    // Fonction améliorée pour un calcul de taille ultra-précis et uniforme
    function autoResizeInput(input) {
        const span = document.createElement('span');
        
        // Si l'input est vide, on mesure la taille du placeholder
        span.textContent = input.value || input.placeholder;

        // On clone parfaitement le style pour éviter tout décalage de pixel
        const style = window.getComputedStyle(input);
        span.style.fontFamily = style.fontFamily;
        span.style.fontSize = style.fontSize;
        span.style.fontStyle = style.fontStyle;
        span.style.fontWeight = style.fontWeight;
        span.style.letterSpacing = style.letterSpacing;
        span.style.textTransform = style.textTransform;
        
        span.style.position = 'absolute';
        span.style.visibility = 'hidden';
        span.style.whiteSpace = 'pre';

        document.body.appendChild(span);
        const width = span.getBoundingClientRect().width;
        
        // Ajout d'une marge minime de sécurité (2px) pour le curseur d'écriture
        input.style.width = `${width + 2}px`;
        document.body.removeChild(span);
    }

    // Appliquer le redimensionnement automatique au chargement et durant la saisie
    if (inputs.length > 0) {
        inputs.forEach(input => {
            // Un léger délai garantit que les polices CSS personnalisées sont bien chargées
            setTimeout(() => autoResizeInput(input), 50);
            
            input.addEventListener('input', () => autoResizeInput(input));
        });
    }

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
                form.reset();

                // Recalcule la taille par défaut (placeholders) après le reset
                inputs.forEach(input => autoResizeInput(input));

                successBanner.style.display = 'block';
                setTimeout(() => {
                    successBanner.classList.add('contact__success--visible');
                }, 50);

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