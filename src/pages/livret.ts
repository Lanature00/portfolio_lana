import { el, all, pad } from '../utils/dom'

type Page = {
  title: string
  sub: string
}

const pages: Page[] = [
  { title: 'La couverture', sub: "Gérone au bord de l'eau, et l'horaire du départ : Paris, Montpellier, Gérone, Barcelone." },
  { title: 'Mardi 3 décembre', sub: "Le TGV jusqu'à Montpellier, puis le car jusqu'à Gérone et son quartier juif." },
  { title: 'Mercredi 4 décembre', sub: 'La Colònia Güell, la Casa Bellesguard, puis le Passeig de Gràcia.' },
  { title: 'Le Passeig de Gràcia', sub: "Une pleine page de nuit sur l'avenue des maisons modernistes." },
  { title: 'Jeudi 5 décembre', sub: 'Le marché de la Boqueria, le parc de la Ciutadella et le Palau Güell.' },
  { title: 'Le quartier gothique', sub: 'Ses ruelles médiévales, et la fontaine du parc de la Ciutadella.' },
  { title: 'Le musée Dalí', sub: 'Quatre œuvres et le théâtre-musée de Figueres.' },
  { title: 'Vendredi 6 décembre', sub: 'Figueres, puis le retour : Barcelone, Montpellier, Paris.' },
]

function initFlip(): void {
  const images = all<HTMLImageElement>('[data-page]')
  const thumbs = all<HTMLButtonElement>('[data-thumb]')
  const num = el('[data-page-num]')
  const count = el('[data-page-count]')
  const title = el('[data-page-title]')
  const sub = el('[data-page-sub]')
  let current = 1

  function render(): void {
    images.forEach((image, i) => {
      image.classList.toggle('is-on', i === current)
      image.setAttribute('aria-hidden', String(i !== current))
    })

    thumbs.forEach((thumb, i) => thumb.setAttribute('aria-current', String(i === current)))

    const page = pages[current]
    num.textContent = current === 0 ? 'C' : pad(current + 1)
    count.textContent = current === 0 ? 'Couverture' : `Page ${pad(current + 1)} / 08`
    title.textContent = page.title
    sub.textContent = page.sub
  }

  function go(index: number): void {
    current = (index + pages.length) % pages.length
    render()
  }

  thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => go(i)))
  el('[data-page-prev]').addEventListener('click', () => go(current - 1))
  el('[data-page-next]').addEventListener('click', () => go(current + 1))

  render()
}

initFlip()
