import { el, all } from '../utils/dom'

const zOrder = ['me', 'gra', 'data', 'ui', 'dev']

function initFan(): void {
  const fan = el('[data-fan]')
  const cards = all('[data-fan-card]')
  const chips = all<HTMLButtonElement>('[data-card]')
  const caption = el('[data-fan-caption]')
  let selected = 'me'
  let open = false

  function render(): void {
    cards.forEach((card) => {
      const id = card.dataset.fanCard ?? ''
      const isOn = id === selected
      const baseRotation = Number(card.style.getPropertyValue('--rot'))
      const rotation = isOn ? 0 : baseRotation * (open ? 1.45 : 1)

      card.style.setProperty('--r', `${rotation}deg`)
      card.style.setProperty('--ty', isOn ? '-56px' : '0px')
      card.style.zIndex = String(isOn ? 10 : 5 - zOrder.indexOf(id))
    })

    chips.forEach((chip) => chip.setAttribute('aria-pressed', String(chip.dataset.card === selected)))

    const current = el(`[data-fan-card="${selected}"]`)
    const number = el('.fan__meta span', current).textContent ?? ''
    const title = el('.fan__title', current).textContent ?? ''
    caption.textContent = `Nuance ${number.replace('N° ', '')} · ${title}`
  }

  function select(id: string): void {
    selected = id
    render()
  }

  chips.forEach((chip) => chip.addEventListener('click', () => select(chip.dataset.card ?? 'me')))
  cards.forEach((card) => card.addEventListener('click', () => select(card.dataset.fanCard ?? 'me')))

  fan.addEventListener('mouseenter', () => {
    open = true
    render()
  })

  fan.addEventListener('mouseleave', () => {
    open = false
    render()
  })

  render()
}

initFan()
