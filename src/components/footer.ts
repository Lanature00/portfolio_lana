import { url } from '../utils/url'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

const pages: FooterLink[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Projets', href: '/projets.html' },
  { label: 'À propos', href: '/a-propos.html' },
  { label: 'Contact', href: '/contact.html' },
]

const socials: FooterLink[] = [
  { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/lana-gilbart-lagy27061401', external: true },
  { label: 'GitHub ↗', href: 'https://github.com/lanature00', external: true },
  { label: 'CV (PDF) ↓', href: '/cv/lana-gilbart-cv.pdf' },
]

function linkList(links: FooterLink[]): string {
  return links
    .map((link) => {
      const target = link.external ? ' target="_blank" rel="noopener"' : ''
      const href = link.external ? link.href : url(link.href)
      return `<a class="lnk" href="${href}"${target}>${link.label}</a>`
    })
    .join('')
}

export function parisTime(): string {
  return new Date().toLocaleTimeString('fr-FR', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function renderFooter(): void {
  const target = document.querySelector<HTMLElement>('[data-footer]')
  if (!target) return

  target.outerHTML = `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__top">
          <div>
            <p class="site-footer__thanks">Merci pour la visite</p>
            <p class="site-footer__ask">Une question, une alternance, un projet ? <a class="lnk site-footer__mail" href="mailto:lanagilbart@gmail.com">lanagilbart@gmail.com</a></p>
          </div>
          <a href="#top" class="site-footer__up" aria-label="Revenir en haut de la page">
            <svg width="20" height="20" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>

        <div class="site-footer__cols">
          <nav aria-label="Pied de page">
            <span class="eyebrow">Pages</span>
            ${linkList(pages)}
          </nav>
          <nav aria-label="Réseaux">
            <span class="eyebrow">Réseaux</span>
            ${linkList(socials)}
          </nav>
          <div>
            <span class="eyebrow">En ce moment</span>
            <span class="site-footer__status">En recherche d'alternance</span>
            <span class="site-footer__time">Paris · <time data-clock>${parisTime()}</time></span>
          </div>
          <div>
            <span class="eyebrow">Les couleurs</span>
            <ul class="site-footer__colors">
              <li><span class="dot dot--graphisme" aria-hidden="true"></span>Graphisme</li>
              <li><span class="dot dot--ui" aria-hidden="true"></span>UI/UX</li>
              <li><span class="dot dot--code" aria-hidden="true"></span>Code</li>
              <li><span class="dot dot--data" aria-hidden="true"></span>Data</li>
            </ul>
          </div>
        </div>

        <div class="site-footer__bottom">
          <span>© 2026 Lana Gilbart</span>
          <span class="site-footer__motto">Coder sa créativité</span>
          <span>Maquetté dans Figma · codé à la main</span>
        </div>
      </div>
    </footer>
  `

  const clock = document.querySelector<HTMLElement>('[data-clock]')
  if (!clock) return

  window.setInterval(() => {
    clock.textContent = parisTime()
  }, 30000)
}
