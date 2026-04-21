const form = document.getElementById('contact-form');
const confirm = document.getElementById('confirm');
const envoyer = document.getElementById('envoyer');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const prenom = document.getElementById('prenom').value.trim();
    const projet = document.getElementById('projet').value.trim();
    const email = document.getElementById('email').value.trim();
    const replytoHidden = document.getElementById('replyto-hidden');

    if (!prenom || !projet || !email) {
        confirm.textContent = 'Merci de remplir tous les champs.';
        confirm.style.color = '#c47c5a';
        return;
    }

    const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValide) {
        confirm.textContent = 'Merci de saisir une adresse email valide.';
        confirm.style.color = '#c47c5a';
        return;
    }

    replytoHidden.value = email;

    envoyer.disabled = true;
    envoyer.textContent = 'Envoi...';
    confirm.textContent = '';

    try {
        const response = await fetch('https://formspree.io/f/TON_VRAI_ID_ICI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                prenom,
                projet,
                email,
                _subject: 'Nouveau message depuis le portfolio',
                _replyto: email,
                message: `Je m'appelle ${prenom} et j'aimerais collaborer sur un projet de ${projet}. Mon email : ${email}`
            })
        });

        const data = await response.json();

        if (response.ok) {
            confirm.textContent = 'Message envoyé ! Je vous réponds sous 24h.';
            confirm.style.color = '#888';
            form.reset();
        } else {
            confirm.textContent = data?.errors?.[0]?.message || 'Une erreur est survenue. Réessayez.';
            confirm.style.color = '#c47c5a';
        }
    } catch (error) {
        confirm.textContent = 'Impossible d’envoyer le message. Vérifie la connexion ou l’identifiant Formspree.';
        confirm.style.color = '#c47c5a';
    } finally {
        envoyer.disabled = false;
        envoyer.textContent = 'Envoyer le message';
    }
});