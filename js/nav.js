document.getElementById('nav-container').innerHTML = `
    <nav class="nav">
        <a href="index.html" class="nav__logo">LANA GILBART</a>

        <button class="nav__burger" id="burger" aria-label="Ouvrir le menu">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <ul class="nav__links" id="navLinks">
            <li><a href="index.html">Accueil</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="apropos.html">À propos</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
    </nav>
`;

document.getElementById('footer-container').innerHTML = `
    <footer class="footer">
        <div class="footer__top">

            <div class="footer__gauche">
                <h3>Lana GILBART</h3>
                <p>Donnez vie à vos projets</p>
            </div>

            <div class="footer__milieu">
                <h4>Email</h4>
                <a href="mailto:lanagilbart@gmail.com">
                    lanagilbart@gmail.com
                </a>
            </div>

            <div class="footer__droite">
                <h4>Suivez moi !</h4>

                <div class="footer__reseaux">

                    <div class="footer__rond">
                        <a
                            href="https://www.instagram.com/lanagilbart/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="img/nav/instagram.webp" alt="Instagram">
                        </a>
                    </div>

                    <div class="footer__rond">
                        <a
                            href="https://www.linkedin.com/in/lana-gilbart-lagy27061401"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="img/nav/linkedin.webp" alt="LinkedIn">
                        </a>
                    </div>

                    <div class="footer__rond">
                        <a
                            href="https://github.com/Lanature00"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src="img/nav/githublogo.png" alt="GitHub">
                        </a>
                    </div>

                </div>
            </div>

        </div>

        <div class="footer__ligne"></div>

        <div class="footer__bas">
            <p>Portfolio 2026</p>
            <p>Tous droits réservés</p>
        </div>
    </footer>
`;

const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        burger.classList.toggle('active');
    });
}

const PAGE_LABELS = {
    'portfolio.html': 'Portfolio',
    'apropos.html': 'À propos',
    'contact.html': 'Contact',
    'aubonheur.html': 'Au Bonheur'
};

const PROJET_LABELS = {
    'formedamis.html': "Formes d'Amis",
    'feuillettouristique.html': 'Livret Touristique',
    'appareil.html': 'Appareil Photo 3D',
    'cd.html': 'Pochette CD',
    'uneligne.html': 'Une Ligne et des Âmes'
};

function buildBreadcrumb() {
    const container = document.getElementById('breadcrumb-container');

    if (!container) return;

    const path = window.location.pathname;

    const filename =
        path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    if (filename === 'index.html' || filename === '') {
        container.style.display = 'none';
        return;
    }

    if (PROJET_LABELS[filename]) {
        container.innerHTML = `
            <nav class="breadcrumb" aria-label="Fil d'ariane">
                <ol class="breadcrumb__list">

                    <li class="breadcrumb__item">
                        <a class="breadcrumb__link" href="index.html">
                            Accueil
                        </a>
                        <span class="breadcrumb__sep">/</span>
                    </li>

                    <li class="breadcrumb__item">
                        <a class="breadcrumb__link" href="portfolio.html">
                            Portfolio
                        </a>
                        <span class="breadcrumb__sep">/</span>
                    </li>

                    <li
                        class="breadcrumb__item breadcrumb__item--current"
                        aria-current="page"
                    >
                        <span class="breadcrumb__current">
                            ${PROJET_LABELS[filename]}
                        </span>
                    </li>

                </ol>
            </nav>
        `;

        return;
    }

    if (PAGE_LABELS[filename]) {
        container.innerHTML = `
            <nav class="breadcrumb" aria-label="Fil d'ariane">
                <ol class="breadcrumb__list">

                    <li class="breadcrumb__item">
                        <a class="breadcrumb__link" href="index.html">
                            Accueil
                        </a>
                        <span class="breadcrumb__sep">/</span>
                    </li>

                    <li
                        class="breadcrumb__item breadcrumb__item--current"
                        aria-current="page"
                    >
                        <span class="breadcrumb__current">
                            ${PAGE_LABELS[filename]}
                        </span>
                    </li>

                </ol>
            </nav>
        `;

        return;
    }

    container.style.display = 'none';
}

buildBreadcrumb();