import { projets, disciplines, type Discipline, type Projet } from '../data/projets'

type Filter = Discipline | 'all'

const ARROW = '<svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'

let filter: Filter = 'all'

function visibleProjets(): Projet[] {
  if (filter === 'all') return projets
  return projets.filter((p) => p.discipline === filter)
}

function num(i: number): string {
  return String(i + 1).padStart(2, '0')
}

function tag(p: Projet): string {
  return `<span class="tag"><span class="dot dot--${p.discipline}" aria-hidden="true"></span>${p.label} · ${p.year}</span>`
}

function rowHTML(p: Projet, i: number): string {
  const inner = `
    <span class="row__num">${num(i)}</span>
    <span class="row__text">${tag(p)}<span class="row__title">${p.title}</span></span>
  `
  if (p.href) {
    return `<li style="--i:${i}"><a class="row" href="${p.href}">${inner}<span class="row__arrow">${ARROW}</span></a></li>`
  }
  return `<li style="--i:${i}"><div class="row" tabindex="0">${inner}<span class="soon">À venir</span></div></li>`
}

function filterHTML(id: Filter, label: string, count: number): string {
  const pressed = id === filter ? 'true' : 'false'
  return `<button type="button" class="chip chip--${id}" data-filter="${id}" aria-pressed="${pressed}"><span class="chip__ink" aria-hidden="true"></span><span class="chip__dot" aria-hidden="true"></span>${label}<sup>${String(count).padStart(2, '0')}</sup></button>`
}

function el<T extends HTMLElement>(selector: string, root: ParentNode = document): T {
  const found = root.querySelector<T>(selector)
  if (!found) throw new Error(`Élément introuvable : ${selector}`)
  return found
}

export function initIndex(): void {
  const list = el<HTMLOListElement>('[data-index-list]')
  const filters = el('[data-index-filters]')
  const count = el('[data-index-count]')
  const preview = el('[data-preview]')
  const img = el<HTMLImageElement>('[data-preview-img]', preview)
  const pNum = el('[data-preview-num]', preview)
  const pTag = el('[data-preview-tag]', preview)
  const pTitle = el('[data-preview-title]', preview)
  const pDesc = el('[data-preview-desc]', preview)
  const pTools = el('[data-preview-tools]', preview)
  const pAction = el('[data-preview-action]', preview)

  count.textContent = `(${String(projets.length).padStart(2, '0')})`

  const setActive = (i: number): void => {
    const p = visibleProjets()[i]
    if (!p) return

    list.querySelectorAll('.row').forEach((row, j) => {
      row.setAttribute('aria-current', j === i ? 'true' : 'false')
    })

    preview.dataset.discipline = p.discipline
    pNum.textContent = num(i)
    pTag.innerHTML = tag(p)
    pTitle.textContent = p.title
    pDesc.textContent = p.description
    pTools.textContent = p.tools ?? ''
    pAction.innerHTML = p.href
      ? `<a href="${p.href}" class="btn btn--primary">Voir le projet<span class="btn__dot" aria-hidden="true">${ARROW}</span></a>`
      : '<span class="soon">Étude de cas à venir</span>'

    const position = p.imagePosition ?? '50% 50%'
    if (img.getAttribute('src') === p.image && img.style.objectPosition === position) return

    const show = (): void => img.classList.add('is-in')
    img.classList.remove('is-in')
    img.src = p.image
    img.style.objectPosition = position
    if (img.complete) requestAnimationFrame(() => requestAnimationFrame(show))
    else img.onload = show
  }

  const renderFilters = (): void => {
    const ids = Object.keys(disciplines) as Discipline[]
    filters.innerHTML =
      filterHTML('all', 'Tout', projets.length) +
      ids.map((id) => filterHTML(id, disciplines[id], projets.filter((p) => p.discipline === id).length)).join('')
  }

  const renderList = (): void => {
    list.innerHTML = visibleProjets().map(rowHTML).join('')
    list.querySelectorAll<HTMLElement>('.row').forEach((row, i) => {
      row.addEventListener('mouseenter', () => setActive(i))
      row.addEventListener('focus', () => setActive(i))
    })
    setActive(0)
  }

  filters.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-filter]')
    if (!button) return
    filter = button.dataset.filter as Filter
    renderFilters()
    renderList()
  })

  renderFilters()
  renderList()
}

initIndex()
