import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { initHeroThreeJS } from './hero-three'

document.addEventListener('DOMContentLoaded', () => {
  initBentoModals()
  initHoverEffects()
  initSmoothScroll()
  initHeroThreeJS()
})

function initBentoModals() {
  const modalElement = document.getElementById('bentoModal')
  if (!modalElement) return

  const modal = new bootstrap.Modal(modalElement)
  const modalTitle = document.getElementById('bentoModalLabel')
  const modalBody = document.getElementById('bentoModalBody')

  document.querySelectorAll('[data-modal]').forEach(card => {
    if (card.classList.contains('hero-section') || card.classList.contains('cta-section')) return

    card.addEventListener('click', () => {
      const title = card.getAttribute('data-modal-title')
      const content = card.getAttribute('data-modal-content')

      if (modalTitle) modalTitle.textContent = title
      if (modalBody) modalBody.textContent = content

      modal.show()
    })
  })

  modalElement.addEventListener('hidden.bs.modal', () => {
    if (modalTitle) modalTitle.textContent = ''
    if (modalBody) modalBody.textContent = ''
  })
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
