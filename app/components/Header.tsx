 'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-left">
        <Link href="/" className="header-logo" onClick={closeMenu}>
          <Image 
            src="/logo.png" 
            alt="a1" 
            width={40} 
            height={40}
            className="logo-image"
          />
        </Link>
        <Link href="/" className="header-title-link" onClick={closeMenu}>
          <span className="header-title">Интернет для бизнеса</span>
        </Link>
      </div>

      <button 
        className={`mobile-menu-toggle ${isMenuOpen ? 'hidden' : ''}`}
        onClick={toggleMenu}
        aria-label="Меню"
        aria-expanded={isMenuOpen}
      >
        <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
      </button>

      <nav className={`header-nav ${isMenuOpen ? 'mobile-open' : ''}`} aria-label="Навигация">
        <button 
          className="mobile-menu-close"
          onClick={closeMenu}
          aria-label="Закрыть меню"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="mobile-phone-banner">
          <svg className="phone-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <div className="phone-text">
            <span className="phone-label">Служба продаж</span>
            <span className="phone-number">+7 863 445 33 33</span>
          </div>
        </div>
        
        <a
          href="#home"
          className="nav-link"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            closeMenu()
          }}
        >
          Главная
        </a>
        <a href="#tariffs" className="nav-link" onClick={closeMenu}>Тарифы</a>
        <a href="#advantages" className="nav-link" onClick={closeMenu}>Преимущества</a>
        <Link href="/tariffs" className="nav-link" onClick={closeMenu}>Телефония</Link>
        <a href="#contact" className="nav-link" onClick={closeMenu}>Контакты</a>
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
