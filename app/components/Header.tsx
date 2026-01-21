 'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault()
    
    if (pathname === '/') {
      // Если уже на главной странице, просто скроллим
      if (anchor === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const element = document.querySelector(anchor)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    } else {
      // Если не на главной, переходим на главную и сохраняем якорь
      if (anchor) {
        sessionStorage.setItem('scrollAnchor', anchor)
      } else {
        sessionStorage.setItem('scrollAnchor', 'top')
      }
      router.push('/')
    }
  }

  return (
    <header className="header">
      <div className="header-left">
        <Link href="/" className="header-logo">
          <Image 
            src="/logo.png" 
            alt="a1" 
            width={40} 
            height={40}
            className="logo-image"
          />
        </Link>
        <Link href="/" className="header-title-link">
          <span className="header-title">Интернет для бизнеса</span>
        </Link>
      </div>

      <nav className="header-nav" aria-label="Навигация">
        <a
          href="/"
          className="nav-link"
          onClick={(e) => handleAnchorClick(e, '')}
        >
          Главная
        </a>
        <a 
          href="/#tariffs" 
          className="nav-link"
          onClick={(e) => handleAnchorClick(e, '#tariffs')}
        >
          Тарифы
        </a>
        <a 
          href="/#advantages" 
          className="nav-link"
          onClick={(e) => handleAnchorClick(e, '#advantages')}
        >
          Преимущества
        </a>
        <Link href="/tariffs" className="nav-link">Телефония</Link>
        <a 
          href="/#contact" 
          className="nav-link"
          onClick={(e) => handleAnchorClick(e, '#contact')}
        >
          Контакты
        </a>
      </nav>

      <div className="header-right">
        <div className="header-phone">
          <svg className="phone-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <div className="phone-text">
            <span className="phone-label">Служба продаж</span>
            <span className="phone-number">+7 863 445 33 33</span>
          </div>
        </div>
        <a 
          href="https://acct.rgbl61.ru/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="header-button"
        >
          <svg className="button-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Личный кабинет
        </a>
      </div>
    </header>
  )
}
