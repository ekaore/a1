export default function AdvantagesSection() {
  const advantages = [
    {
      title: 'Высокоскоростной интернет',
      description: 'Наслаждайтесь скоростью до 1 Гб/с.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
      color: '#e31e24',
      backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
    },
    {
      title: 'Гибкие тарифные планы',
      description: 'Тарифы на любой бюджет.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      color: '#e31e24',
      backgroundImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
    },
    {
      title: 'Качественная IP-телефония',
      description: 'Современные решения для вашего бизнеса.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      color: '#e31e24',
      backgroundImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'
    },
    {
      title: 'Надежность и поддержка',
      description: 'Круглосуточная помощь для наших клиентов.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      color: '#e31e24',
      backgroundImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80'
    }
  ]

  return (
    <section id="advantages" className="advantages-section">
      <div className="advantages-container">
        <div className="advantages-header">
          <h2 className="advantages-title">Наши преимущества</h2>
          <p className="advantages-subtitle">Преимущества нашего интернет-провайдера</p>
          <p className="advantages-description">
            Выберите нас для надежного подключения к интернету и IP-телефонии. 
            Мы предлагаем высокие скорости и конкурентоспособные тарифы.
          </p>
        </div>
        
        <div className="advantages-grid">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="advantage-card with-background-image"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                backgroundImage: `url(${advantage.backgroundImage})`
              }}
            >
              <div className="card-image-overlay"></div>
              <div className="card-background"></div>
              
              <div className="card-content">
                <h3 className="card-title">{advantage.title}</h3>
                <p className="card-description">{advantage.description}</p>
              </div>
              
              <div className="card-decoration">
                <div className="decoration-circle"></div>
                <div className="decoration-circle"></div>
                <div className="decoration-circle"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
