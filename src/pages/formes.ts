import { el, all, pad } from '../utils/dom'

const shapes = ['Étoile', 'Triangle', 'Engrenage', 'Fleur', 'Étoile à quatre branches']
const faces = ['Émerveillé', 'Souriant', 'Cyclope', 'À lunettes']
const faceOffsets = ['0px, 4px', '0px, 22px', '0px, 0px', '0px, 0px', '0px, 10px']

function randomOther(current: number, length: number): number {
  let next = current
  while (next === current) next = Math.floor(Math.random() * length)
  return next
}

function initDraw(): void {
  const shapeGroups = all<SVGGElement>('[data-shape]')
  const faceGroups = all<SVGGElement>('[data-face]')
  const face = el<SVGGElement>('[data-draw-face]')
  const svg = el<SVGSVGElement>('[data-draw-svg]')
  const num = el('[data-draw-num]')
  const label = el('[data-draw-label]')
  let shape = 0
  let expression = 0
  let count = 1

  function show(groups: SVGGElement[], index: number): void {
    groups.forEach((group, i) => {
      if (i === index) group.removeAttribute('display')
      else group.setAttribute('display', 'none')
    })
  }

  function render(): void {
    show(shapeGroups, shape)
    show(faceGroups, expression)
    face.style.transform = `translate(${faceOffsets[shape]})`
    num.textContent = pad(count)
    label.textContent = `${shapes[shape]} · ${faces[expression]}`
    svg.setAttribute('aria-label', `Personnage : forme ${shapes[shape].toLowerCase()}, visage ${faces[expression].toLowerCase()}, avec bras et jambes.`)
  }

  el('[data-draw]').addEventListener('click', () => {
    shape = randomOther(shape, shapes.length)
    expression = randomOther(expression, faces.length)
    count += 1
    render()
  })

  render()
}

initDraw()
