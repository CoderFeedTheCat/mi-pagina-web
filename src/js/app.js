import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { initHeroThreeJS } from './hero-three'

import imgEnfoque from '../assets/card-1/card-1.webp'
import imgAliat from '../assets/card-2/card-2.webp'
import imgClinica from '../assets/card-3/card-3.webp'
import imgEduc1 from '../assets/card-4/card-4.webp'
import imgOrganiz from '../assets/card-5/card-5.webp'
import imgInvestig from '../assets/card-6/card-6.webp'
import imgManuales from '../assets/card-7/card-7.webp'
import imgCompromiso from '../assets/card-8/card-8.webp'
import imgPsicometria from '../assets/card-9/card-9.webp'

import descEnfoque from '../assets/card-1/descripcion.txt'
import descAliat from '../assets/card-2/descripcion.txt'
import descClinica from '../assets/card-3/descripcion.txt'
import descEduc from '../assets/card-4/descripcion.txt'
import descOrganiz from '../assets/card-5/descripcion.txt'
import descInvestig from '../assets/card-6/descripcion.txt'
import descManuales from '../assets/card-7/descripcion.txt'
import descCompromiso from '../assets/card-8/descripcion.txt'
import descPsicometria from '../assets/card-9/descripcion.txt'

import isologoUrl from '../assets/images/isologo_imagen.webp'
import descAcerca from '../assets/acerca-de-mi/descripcion.txt'

const LOGO = '/branding/logo-sello-circular.webp'
const ICON = isologoUrl

const MODAL_CARDS = {
  enfoque:        { imgUrl: imgEnfoque,     w: 421,  h: 237,  raw: descEnfoque },
  aliat:          { imgUrl: imgAliat,       w: 1024, h: 799,  raw: descAliat },
  clinica:        { imgUrl: imgClinica,     w: 1024, h: 559,  raw: descClinica },
  educativa1:     { imgUrl: imgEduc1,       w: 1024, h: 559,  raw: descEduc },
  psicometria:    { imgUrl: imgPsicometria, w: 1024, h: 559,  raw: descPsicometria },
  organizacional: { imgUrl: imgOrganiz,     w: 1024, h: 559,  raw: descOrganiz },
  investigacion:  { imgUrl: imgInvestig,    w: 1024, h: 559,  raw: descInvestig },
  manuales:       { imgUrl: imgManuales,    w: 1024, h: 559,  raw: descManuales },
  compromiso2:    { imgUrl: imgCompromiso,  w: 1024, h: 559,  raw: descCompromiso },
  acerca:         { raw: descAcerca }
}

function parseDescripcion(raw) {
  const lines = raw.split('\n')
  let title = ''
  let paragraphs = []
  let listHeading = ''
  let bullets = []

  let state = 'pre-info'
  let paraBuf = []

  for (const line of lines) {
    const trimmed = line.trim()

    if (state === 'pre-info') {
      const titleMatch = trimmed.match(/(?:ítulo|itulo)\s*:\s*(.+)/i)
      if (titleMatch) {
        title = titleMatch[1].trim()
      }
      if (/^texto\s+informativo\s*:/i.test(trimmed)) {
        state = 'paragraphs'
      }
      continue
    }

    if (state === 'paragraphs') {
      if (/^[A-ZÁÉÍÓÚÜ].*:\s*$/.test(trimmed) && trimmed.length < 80) {
        if (paraBuf.length) paragraphs.push(paraBuf.join(' ').trim())
        paraBuf = []
        listHeading = trimmed.replace(/:\s*$/, '')
        state = 'bullets'
        continue
      }
      if (trimmed === '') {
        if (paraBuf.length) paragraphs.push(paraBuf.join(' ').trim())
        paraBuf = []
      } else {
        paraBuf.push(trimmed)
      }
      continue
    }

    if (state === 'bullets') {
      if (trimmed === '') continue
      const bMatch = trimmed.match(/^(.+?):\s*(.+)/)
      if (bMatch) {
        bullets.push({ label: bMatch[1].trim(), text: bMatch[2].trim() })
      } else if (trimmed) {
        bullets.push({ label: '', text: trimmed })
      }
    }
  }

  if (paraBuf.length) paragraphs.push(paraBuf.join(' ').trim())

  return { title, paragraphs, listHeading, bullets }
}

function iconHtml() {
  return `<img src="${ICON}" width="346" height="316" loading="lazy" alt="" class="modal-card__lead-icon">`
}

function logoHtml(extraClass) {
  const cls = extraClass ? ` ${extraClass}` : ''
  return `<figure class="modal-card__logo${cls}"><img src="${LOGO}" width="445" height="294" loading="lazy" alt="Sello José Martín Ortiz Torres" class="modal-card__logo-img"></figure>`
}

function renderModalBody(key) {
  const card = MODAL_CARDS[key]
  if (!card) return ''

  const { title, paragraphs, listHeading, bullets } = parseDescripcion(card.raw)

  const parasHtml = paragraphs.map(p => `<p>${p}</p>`).join('')

  let bulletsHtml = ''
  if (bullets.length) {
    const items = bullets.map(b =>
      b.label
        ? `<li><strong>${b.label}:</strong> ${b.text}</li>`
        : `<li>${b.text}</li>`
    ).join('')
    bulletsHtml = `<h6 class="modal-card__section-heading">${listHeading}</h6><ul class="check-list modal-card__list">${items}</ul>`
  }

  const taglineHtml = key === 'acerca' ? `<span class="modal-card__lead-tagline">Ciencia, ética y rigor clínico al servicio de tu bienestar integral.</span>` : ''

  const contentHtml = `
    <div class="modal-card-content">
      <p class="modal-card__lead">${iconHtml()}${taglineHtml}${title}</p>
      ${parasHtml}
      ${bulletsHtml}
    </div>`

  if (!card.imgUrl) {
    return `
      <div class="modal-card-side modal-card-side--centered">
        ${contentHtml}
        ${logoHtml('modal-card__logo--large')}
      </div>`
  }

  const imgHtml = `<img src="${card.imgUrl}" width="${card.w}" height="${card.h}" loading="lazy" alt="${title}" class="modal-card__img">`

  return `
    <div class="modal-card-side">
      <div class="modal-card-media">${imgHtml}</div>
      ${logoHtml()}
    </div>
    ${contentHtml}`
}

function injectHeroImage() {
  const title = document.querySelector('.hero-section__title')
  if (!title) return
  const img = document.createElement('img')
  img.src = imgEnfoque
  img.alt = ''
  img.className = 'hero-section__image'
  img.width = 120
  img.height = 120
  img.loading = 'eager'
  title.parentNode.insertBefore(img, title)
}

document.addEventListener('DOMContentLoaded', () => {
  initBentoModals()
  initHoverEffects()
  initSmoothScroll()
  initHeroThreeJS()
  injectHeroImage()
})

function initBentoModals() {
  const modalElement = document.getElementById('bentoModal')
  if (!modalElement) return

  const modal = new bootstrap.Modal(modalElement)
  const modalBody = document.getElementById('bentoModalBody')

  document.querySelectorAll('[data-modal]').forEach(card => {
    if (card.classList.contains('hero-section') || card.classList.contains('cta-section')) return

    card.addEventListener('click', () => openModal(card, modal, modalBody))

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openModal(card, modal, modalBody)
      }
    })
  })

  modalElement.addEventListener('hidden.bs.modal', () => {
    if (modalBody) modalBody.innerHTML = ''
  })
}

function openModal(card, modal, modalBody) {
  const key = card.getAttribute('data-modal')
  const data = MODAL_CARDS[key]

  if (data) {
    if (modalBody) modalBody.innerHTML = renderModalBody(key)
  } else {
    return
  }

  modal.show()
}

function initHoverEffects() {
  const cards = document.querySelectorAll('.bento-card')

  cards.forEach(card => {
    if (card.classList.contains('hero-section') || card.classList.contains('cta-section') || card.classList.contains('bento-card--no-tilt')) return

    card.addEventListener('mouseenter', (e) => {
      card.style.transition = 'all 300ms ease'
    })

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
    })
  })
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })
}
