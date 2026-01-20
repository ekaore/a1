import Link from 'next/link'

export default function PricingSection() {
  const tariffs = [
    {
      speed: '100 Мбит/с',
      price: '3300₽',
      popular: false,
      description: 'Идеально подходит для малого бизнеса и офисов с базовыми потребностями в интернете.'
    },
    {
      speed: '1 Гбит/с',
      price: '5500₽',
      popular: true,
      description: 'Максимальная скорость для крупных компаний и работы с большими объемами данных.'
    },
    {
      speed: 'IP-Телефония',
      price: 'по запросу',
      popular: false,
      description: 'Современные решения для корпоративной связи с расширенным функционалом.'
    }
  ]

  return (
    <section id="tariffs" className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2 className="pricing-title">Тарифы</h2>
          <p className="pricing-subtitle">Выгодные условия для бизнеса</p>
        </div>
        
        <div className="pricing-cards">
          {tariffs.map((tariff, index) => (
            <div 
              key={index} 
              className={`pricing-card ${tariff.popular ? 'popular' : ''}`}
            >
              {tariff.popular && (
                <div className="popular-badge">
                  <span>Популярный</span>
                </div>
              )}
              
              <div className="card-glow"></div>
              
              <div className="card-content">
                <h3 className="card-speed">{tariff.speed}</h3>
                <div className="card-price">
                  <span className="price-amount">{tariff.price}</span>
                  {tariff.price !== 'по запросу' && (
                    <span className="price-period">/месяц</span>
                  )}
                </div>
                <p className="card-description">{tariff.description}</p>
              </div>
              
              {tariff.speed === 'IP-Телефония' ? (
                <Link href="/tariffs" className="card-button">
                  Подробнее о тарифах
                  <svg className="button-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              ) : (
                <button className="card-button">
                  Подробнее
                  <svg className="button-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
