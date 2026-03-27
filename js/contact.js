const envoyer = document.getElementById('envoyer');
const confirm = document.getElementById('confirm');

envoyer.addEventListener('click', async () => {
    const prenom = document.getElementById('prenom').value.trim();
    const projet = document.getElementById('projet').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!prenom || !projet || !email) {
        confirm.textContent = 'Merci de remplir tous les champs.';
        confirm.style.color = '#c47c5a';
        return;
    }

    const response = await fetch('https://formspree.io/f/TONID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            prenom: prenom,
            projet: projet,
            email: email,
            message: `Je m'appelle ${prenom} et j'aimerais collaborer sur un projet de ${projet}. Mon email : ${email}`
        })
    });

    if (response.ok) {
        confirm.textContent = 'Message envoyé ! Je vous réponds sous 24h.';
        confirm.style.color = '#888';
    } else {
        confirm.textContent = 'Une erreur est survenue. Réessayez.';
        confirm.style.color = '#c47c5a';
    }
});