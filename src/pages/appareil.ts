import { el, all, pad } from '../utils/dom'

type Moment = {
  title: string
  time: string
  desc: string
}

const moments: Moment[] = [
  { title: 'Assemblé', time: '00:01', desc: "L'appareil entier, posé face caméra." },
  { title: 'Éclaté', time: '00:06', desc: "L'objectif se détache et ses pièces s'écartent." },
  { title: 'La lentille', time: '00:11', desc: 'La caméra plonge vers la lentille, qui reflète un paysage.' },
  { title: "L'écran", time: '00:16', desc: 'Retour au boîtier, côté écran.' },
  { title: "L'image", time: '00:19', desc: 'La photographie apparaît, comme sur une pellicule.' },
]

function initParts(): void {
  const buttons = all<HTMLButtonElement>('[data-part]')
  const label = el('[data-part-label]')

  function select(index: number): void {
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.part) === index))
    })

    const spot = el<HTMLButtonElement>(`.spot[data-part="${index}"]`)
    label.style.setProperty('--x', spot.style.getPropertyValue('--x'))
    label.style.setProperty('--y', spot.style.getPropertyValue('--y'))
    label.textContent = `${pad(index + 1)} · ${spot.getAttribute('aria-label')}`
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => select(Number(button.dataset.part)))
  })
}

function initMoments(): void {
  const slides = all<HTMLButtonElement>('[data-slide]')
  const bars = all<HTMLButtonElement>('[data-moment]')
  const num = el('[data-moment-num]')
  const time = el('[data-moment-time]')
  const title = el('[data-moment-title]')
  const desc = el('[data-moment-desc]')
  const total = slides.length
  let current = 0

  function render(): void {
    slides.forEach((slide, i) => {
      let distance = i - current
      if (distance > total / 2) distance -= total
      if (distance < -total / 2) distance += total
      const far = Math.min(Math.abs(distance), 2)

      slide.style.setProperty('--d', String(distance))
      slide.dataset.distance = String(far)
      slide.setAttribute('aria-current', String(far === 0))
      slide.tabIndex = far === 2 ? -1 : 0
    })

    bars.forEach((bar, i) => bar.setAttribute('aria-pressed', String(i === current)))

    const moment = moments[current]
    num.textContent = pad(current + 1)
    time.textContent = moment.time
    title.textContent = moment.title
    desc.textContent = moment.desc
  }

  function go(index: number): void {
    current = (index + total) % total
    render()
  }

  slides.forEach((slide, i) => slide.addEventListener('click', () => go(i)))
  bars.forEach((bar, i) => bar.addEventListener('click', () => go(i)))
  el('[data-moment-prev]').addEventListener('click', () => go(current - 1))
  el('[data-moment-next]').addEventListener('click', () => go(current + 1))

  render()
}

initParts()
initMoments()
