// Navigation et Footer dynamiques + Fil d'ariane (Breadcrumb)
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

// ============================================================
// FIL D'ARIANE (BREADCRUMB) - Détection automatique par page
// ============================================================

function generateBreadcrumb() {
    const breadcrumbEl = document.getElementById('breadcrumb');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const breadcrumbConfig = {
        'index.html': { label: 'Accueil', path: 'index.html' },
        '': { label: 'Accueil', path: 'index.html' },
        'portfolio.html': { label: 'Portfolio', path: 'portfolio.html' },
        'apropos.html': { label: 'À propos', path: 'apropos.html' },
        'contact.html': { label: 'Contact', path: 'contact.html' },
        'feuillettouristique.html': { label: 'Feuillet touristique', path: 'feuillettouristique.html', parent: 'portfolio.html' },
        'appareil.html': { label: 'Appareil photo', path: 'appareil.html', parent: 'portfolio.html' },
        'formedamis.html': { label: 'Forme d\'amis', path: 'formedamis.html', parent: 'portfolio.html' },
        'uneligne.html': { label: 'Une Ligne et des Âmes', path: 'uneligne.html', parent: 'portfolio.html' },
        'cd.html': { label: 'Pochette CD', path: 'cd.html', parent: 'portfolio.html' }
    };

    const pageConfig = breadcrumbConfig[currentPage];
    
    if (!pageConfig) return; // Pas de breadcrumb pour cette page
    
    let html = '<div class="breadcrumb__container">';
    html += '<a href="index.html" class="breadcrumb__item">Accueil</a>';
    html += '<span class="breadcrumb__separator">/</span>';
    
    // Si c'est un projet (sous-page de portfolio)
    if (pageConfig.parent === 'portfolio.html' && currentPage !== 'portfolio.html') {
        html += '<a href="portfolio.html" class="breadcrumb__item">Portfolio</a>';
        html += '<span class="breadcrumb__separator">/</span>';
        html += `<span class="breadcrumb__item breadcrumb__item--current">${pageConfig.label}</span>`;
    } else {
        html += `<span class="breadcrumb__item breadcrumb__item--current">${pageConfig.label}</span>`;
    }
    
    html += '</div>';
    breadcrumbEl.innerHTML = html;
}

// Générer le breadcrumb au chargement
document.addEventListener('DOMContentLoaded', generateBreadcrumb);
