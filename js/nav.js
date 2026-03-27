document.getElementById('nav-container').innerHTML = `
    <nav class="nav">
        <span class="nav__logo">MON PORTFOLIO</span>
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
                    <div class="footer__rond"><img src="img/insram.webp" alt="Instagram"></div>
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

const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});