import { el, all } from '../utils/dom'
import { parisTime } from '../components/footer'

const EMAIL = 'lanagilbart@gmail.com'

type Topic = {
  subject: string
  placeholder: string
}

const topics: Record<string, Topic> = {
  alt: { subject: 'une alternance', placeholder: "Le poste, l'équipe, le rythme envisagé…" },
  pro: { subject: 'un projet', placeholder: "L'idée, le délai, ce dont vous avez besoin…" },
  other: { subject: 'autre chose', placeholder: 'Dites-moi tout…' },
}

function initLetter(): void {
  const form = el<HTMLFormElement>('[data-letter]')
  const thanks = el('[data-thanks]')
  const message = el<HTMLTextAreaElement>('[data-letter-message]')
  const chips = all<HTMLButtonElement>('[data-topic]')
  let topic = 'alt'

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      topic = chip.dataset.topic ?? 'alt'
      chips.forEach((other) => other.setAttribute('aria-pressed', String(other === chip)))
      message.placeholder = topics[topic].placeholder
    })
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const data = new FormData(form)
    const name = String(data.get('name'))
    const email = String(data.get('email'))
    const text = String(data.get('message'))

    const subject = `Au sujet d'${topics[topic].subject} — ${name}`
    const body = `Bonjour Lana,\n\n${text}\n\nVous pouvez me répondre à ${email}.\n\nÀ très vite,\n${name}`

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    form.hidden = true
    thanks.hidden = false
  })

  el('[data-letter-reset]').addEventListener('click', () => {
    form.reset()
    form.hidden = false
    thanks.hidden = true
  })
}

function initCopy(): void {
  const button = el<HTMLButtonElement>('[data-copy]')
  const label = el('[data-copy-label]')
  let timer = 0

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy ?? EMAIL)
      label.textContent = 'Copié'
      button.classList.add('is-copied')
    } catch {
      label.textContent = 'Sélectionnez l’adresse'
    }

    window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      label.textContent = 'Copier'
      button.classList.remove('is-copied')
    }, 1800)
  })
}

function initPostmark(): void {
  const time = el<SVGTextElement>('[data-postmark-time]')
  const update = (): void => {
    time.textContent = parisTime()
  }
  update()
  window.setInterval(update, 30000)
}

initLetter()
initCopy()
initPostmark()
