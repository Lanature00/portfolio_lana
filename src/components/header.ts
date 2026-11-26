type NavLink = {
  label: string
  href: string
}

const links: NavLink[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Projets', href: '/projets.html' },
  { label: 'À propos', href: '/a-propos.html' },
  { label: 'Contact', href: '/contact.html' },
]

function currentHref(): string {
  const path = window.location.pathname
  if (path.startsWith('/projets/')) return '/projets.html'
  if (path === '/index.html') return '/'
  return path
}

export function renderHeader(): void {
  const target = document.querySelector<HTMLElement>('[data-header]')
  if (!target) return

  const active = currentHref()

  const items = links
    .map((link, i) => {
      const num = String(i + 1).padStart(2, '0')
      const current = link.href === active ? ' aria-current="page"' : ''
      return `<a href="${link.href}"${current}><span class="num" aria-hidden="true">${num}</span>${link.label}</a>`
    })
    .join('')

  target.outerHTML = `
    <header class="site-header">
      <nav class="main-nav" aria-label="Navigation principale">${items}</nav>
    </header>
  `
}

export function initStickyHeader(): void {
  const header = document.querySelector<HTMLElement>('.site-header')
  if (!header) return

  const update = (): void => {
    header.dataset.scrolled = String(window.scrollY > 24)
  }

  window.addEventListener('scroll', update, { passive: true })
  update()
}
