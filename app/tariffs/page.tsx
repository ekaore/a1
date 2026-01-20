import PricingTable from '../components/PricingTable'

export default function TariffsPage() {
  const tariffInfo = [
    {
      title: 'Минимальная длительность',
      description: 'Минимальная длительность сеанса связи составляет 1 сек., дальнейшее приращение длительности сеанса связи осуществляется временными интервалами по 1 сек.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      )
    },
    {
      title: 'Статистические данные',
      description: 'При тарификации используются исключительно статистические данные Исполнителя.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18"/>
          <path d="M7 16l4-4 4 4 6-6"/>
        </svg>
      )
    },
    {
      title: 'Списание стоимости',
      description: 'После завершения сеанса связи с лицевого счета Заказчика списывается фактическая стоимость сеанса связи, равная длительности сеанса связи в минутах, умноженной на цену Направления.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    },
    {
      title: 'Начало сеанса связи',
      description: 'Началом сеанса связи считается момент получения подтверждения на SIP-сообщение ACK.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      )
    },
    {
      title: 'Стоимость других услуг',
      description: 'Стоимость остальных услуг оказываемых Исполнителем заказчику списывается с лицевого счета в начале учетного периода действия услуги.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="9" y1="21" x2="9" y2="9"/>
        </svg>
      )
    }
  ]

  return (
    <main className="tariffs-page">
      <div className="tariffs-page-container">
        <div className="tariffs-page-header">
          <h1 className="tariffs-page-title">Общая информация</h1>
          <p className="tariffs-page-subtitle">Условия тарификации и предоставления услуг</p>
        </div>

        <div className="tariff-info-grid">
          {tariffInfo.map((info, index) => (
            <div key={index} className="tariff-info-card">
              <div className="tariff-info-icon">
                {info.icon}
              </div>
              <h3 className="tariff-info-title">{info.title}</h3>
              <p className="tariff-info-description">{info.description}</p>
            </div>
          ))}
        </div>

        <div className="tariff-process">
          <h2 className="tariff-process-title">Процесс тарификации</h2>
          <div className="tariff-process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Начало сеанса</h4>
                <p>Получение подтверждения SIP-сообщения ACK</p>
              </div>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Длительность</h4>
                <p>Минимальная длительность 1 сек, приращение по 1 сек</p>
              </div>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Завершение</h4>
                <p>Списание стоимости с лицевого счета</p>
              </div>
            </div>
          </div>
        </div>

        <PricingTable />
      </div>
    </main>
  )
}
