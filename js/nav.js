// ─── NAV & FOOTER ───────────────────────────────────────────────────────────

document.getElementById('nav-container').innerHTML = `
    <nav class="nav">
        <span class="nav__logo">LANA GILBART</span>
        <button class="nav__burger" id="burger">
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
    <div class="breadcrumb" id="breadcrumb"></div>
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
                <a href="mailto:lanagilbart@gmail.com">lanagilbart@gmail.com</a>
            </div>
            <div class="footer__droite">
                <h4>Suivez moi !</h4>
                <div class="footer__reseaux">
                    <div class="footer__rond"><img src="img/instagram.webp" alt="Instagram"></div>
                    <div class="footer__rond">
                        <a href="https://www.linkedin.com/in/lana-gilbart-lagy27061401" target="_blank">
                            <img src="img/linkedin.webp" alt="LinkedIn">
                        </a>
                    </div>
                    <div class="footer__rond"><img src="img/social3.webp" alt="réseau 3"></div>
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

// Menu burger
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});


// ─── FIL D'ARIANE ────────────────────────────────────────────────────────────

// Pages principales — fil : Accueil / Page
const PAGE_LABELS = {
    'portfolio.html' : 'Portfolio',
    'apropos.html'   : 'À propos',
    'contact.html'   : 'Contact',
};

// Pages projet — fil : Accueil / Portfolio / Projet
// Ajoutez ici chaque page de cas projet.
const PROJET_LABELS = {
    'formedamis.html' : "Formes d'Amis",
    // 'branding.html'  : 'Branding',
    // 'motion.html'    : 'Motion Design',
};

function buildBreadcrumb() {
    const container = document.getElementById('breadcrumb-container');
    if (!container) return;

    const path     = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    // Accueil : pas de fil d'ariane
    if (filename === 'index.html' || filename === '') {
        container.style.display = 'none';
        return;
    }

    let html = '';

    if (PROJET_LABELS[filename]) {
        // Niveau 3 : Accueil / Portfolio / Projet
        html = `
            <nav class="breadcrumb" aria-label="Fil d'ariane">
                <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
                    <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <a class="breadcrumb__link" href="index.html" itemprop="item">
                            <span itemprop="name">Accueil</span>
                        </a>
                        <meta itemprop="position" content="1" />
                        <span class="breadcrumb__sep" aria-hidden="true">/</span>
                    </li>
                    <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <a class="breadcrumb__link" href="portfolio.html" itemprop="item">
                            <span itemprop="name">Portfolio</span>
                        </a>
                        <meta itemprop="position" content="2" />
                        <span class="breadcrumb__sep" aria-hidden="true">/</span>
                    </li>
                    <li class="breadcrumb__item breadcrumb__item--current"
                        itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"
                        aria-current="page">
                        <span class="breadcrumb__current" itemprop="name">${PROJET_LABELS[filename]}</span>
                        <meta itemprop="position" content="3" />
                    </li>
                </ol>
            </nav>`;

    } else if (PAGE_LABELS[filename]) {
        // Niveau 2 : Accueil / Page
        html = `
            <nav class="breadcrumb" aria-label="Fil d'ariane">
                <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
                    <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                        <a class="breadcrumb__link" href="index.html" itemprop="item">
                            <span itemprop="name">Accueil</span>
                        </a>
                        <meta itemprop="position" content="1" />
                        <span class="breadcrumb__sep" aria-hidden="true">/</span>
                    </li>
                    <li class="breadcrumb__item breadcrumb__item--current"
                        itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"
                        aria-current="page">
                        <span class="breadcrumb__current" itemprop="name">${PAGE_LABELS[filename]}</span>
                        <meta itemprop="position" content="2" />
                    </li>
                </ol>
            </nav>`;
    } else {
        container.style.display = 'none';
        return;
    }

    container.innerHTML = html;
}

buildBreadcrumb();
