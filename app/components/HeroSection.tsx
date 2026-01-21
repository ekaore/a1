'use client'

export default function HeroSection() {
  const handleConsultationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}></div>
          ))}
        </div>
        <div className="hero-grid"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Интернет для вашего бизнеса
            <span className="hero-title-accent"> на скорости будущего</span>
          </h1>
          
          <p className="hero-description">
            Предоставляем быстрый и надежный доступ к сети интернет и IP телефонии 
            для повышения продуктивности
          </p>
          
          <div className="hero-cta">
            <a href="#tariffs" className="hero-button primary">
              Подключить интернет
              <svg className="button-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#contact" className="hero-button secondary" onClick={handleConsultationClick}>
              Получить консультацию
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Довольных клиентов</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24ч</div>
              <div className="stat-label">Подключение</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Доступность сети</div>
            </div>
          </div>
        </div>
        
        <div className="hero-features">
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <div className="feature-content">
              <span className="feature-title">Высокая скорость</span>
              <span className="feature-desc">До 1 Гбит/с</span>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="feature-content">
              <span className="feature-title">Надежность</span>
              <span className="feature-desc">99.9% uptime</span>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="feature-content">
              <span className="feature-title">Поддержка 24/7</span>
              <span className="feature-desc">Всегда на связи</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
