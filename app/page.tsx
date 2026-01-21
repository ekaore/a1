'use client'

import { useEffect } from 'react'
import HeroSection from './components/HeroSection'
import PricingSection from './components/PricingSection'
import AdvantagesSection from './components/AdvantagesSection'
import ContactSection from './components/ContactSection'

export default function Home() {
  useEffect(() => {
    // Проверяем, есть ли сохраненный якорь для прокрутки
    const scrollAnchor = sessionStorage.getItem('scrollAnchor')
    if (scrollAnchor) {
      // Небольшая задержка для загрузки страницы
      setTimeout(() => {
        if (scrollAnchor === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          const element = document.querySelector(scrollAnchor)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
        // Удаляем якорь после использования
        sessionStorage.removeItem('scrollAnchor')
      }, 100)
    }
  }, [])

  return (
    <main>
      <HeroSection />
      <PricingSection />
      <AdvantagesSection />
      <ContactSection />
    </main>
  )
}
