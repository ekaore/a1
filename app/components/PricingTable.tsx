'use client'

import { useState, useMemo } from 'react'

interface PriceItem {
  number: string
  direction: string
  price: number
  country: string
  type: 'стационарные' | 'мобильные' | 'другие'
}

export default function PricingTable() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')

  // Импортируем данные из pricing/page.tsx - используем только часть для примера
  // В реальности лучше вынести данные в отдельный файл
  const prices: PriceItem[] = [
    { number: '81081', direction: 'Япония, стационарные', price: 5.1264, country: 'Япония', type: 'стационарные' },
    { number: '81081[789]0', direction: 'Япония, мобильные', price: 19.224, country: 'Япония', type: 'мобильные' },
    { number: '81082', direction: 'Южная Корея, стационарные', price: 4.984, country: 'Южная Корея', type: 'стационарные' },
    { number: '810822[0-689]', direction: 'Южная Корея, Сеул', price: 5.696, country: 'Южная Корея', type: 'другие' },
    { number: '810372', direction: 'Эстония, стационарные', price: 4.628, country: 'Эстония', type: 'стационарные' },
    { number: '8103725', direction: 'Эстония, мобильные', price: 27.056, country: 'Эстония', type: 'мобильные' },
    { number: '81046', direction: 'Швеция, стационарные', price: 3.56, country: 'Швеция', type: 'стационарные' },
    { number: '810467[0136]', direction: 'Швеция, мобильные', price: 22.784, country: 'Швеция', type: 'мобильные' },
    { number: '81041', direction: 'Швейцария, стационарные', price: 2.9904, country: 'Швейцария', type: 'стационарные' },
    { number: '81041[78]', direction: 'Швейцария, мобильные', price: 22.784, country: 'Швейцария', type: 'мобильные' },
    { number: '810420', direction: 'Чехия, стационарные', price: 3.9872, country: 'Чехия', type: 'стационарные' },
    { number: '8104207', direction: 'Чехия, мобильные', price: 22.784, country: 'Чехия', type: 'мобильные' },
    { number: '81042060', direction: 'Чехия, мобильные', price: 22.784, country: 'Чехия', type: 'мобильные' },
    { number: '8104209[36]', direction: 'Чехия, мобильные', price: 22.784, country: 'Чехия', type: 'мобильные' },
    { number: '8104202', direction: 'Чехия, Прага', price: 5.696, country: 'Чехия', type: 'другие' },
    { number: '810235', direction: 'Чад, стационарные', price: 79.661, country: 'Чад', type: 'стационарные' },
    { number: '810385', direction: 'Хорватия, стационарные', price: 4.272, country: 'Хорватия', type: 'стационарные' },
    { number: '81033', direction: 'Франция, стационарные', price: 3.56, country: 'Франция', type: 'стационарные' },
    { number: '810336', direction: 'Франция, мобильные', price: 21.36, country: 'Франция', type: 'мобильные' },
    { number: '810331', direction: 'Франция, Париж', price: 3.1328, country: 'Франция', type: 'другие' },
    { number: '810358', direction: 'Финляндия, стационарные', price: 5.696, country: 'Финляндия', type: 'стационарные' },
    { number: '81035850', direction: 'Финляндия, мобильные', price: 14.24, country: 'Финляндия', type: 'мобильные' },
    { number: '810380', direction: 'Украина, стационарные', price: 21.36, country: 'Украина', type: 'стационарные' },
    { number: '81038039', direction: 'Украина, мобильные', price: 28.48, country: 'Украина', type: 'мобильные' },
    { number: '810380[569]', direction: 'Украина, мобильные', price: 28.48, country: 'Украина', type: 'мобильные' },
    { number: '810998', direction: 'Узбекистан, стационарные', price: 18.512, country: 'Узбекистан', type: 'стационарные' },
    { number: '81090', direction: 'Турция, стационарные', price: 7.12, country: 'Турция', type: 'стационарные' },
    { number: '810905', direction: 'Турция, мобильные', price: 24.208, country: 'Турция', type: 'мобильные' },
    { number: '810993', direction: 'Туркменистан, стационарные', price: 17.088, country: 'Туркменистан', type: 'стационарные' },
    { number: '810216', direction: 'Тунис, стационарные', price: 93.869, country: 'Тунис', type: 'стационарные' },
    { number: '810886', direction: 'Тайвань, стационарные', price: 2.136, country: 'Тайвань', type: 'стационарные' },
    { number: '810992', direction: 'Таджикистан, стационарные', price: 14.24, country: 'Таджикистан', type: 'стационарные' },
    { number: '8109929[1235]', direction: 'Таджикистан, мобильные', price: 14.24, country: 'Таджикистан', type: 'мобильные' },
    { number: '810386', direction: 'Словения, стационарные', price: 4.984, country: 'Словения', type: 'стационарные' },
    { number: '810421', direction: 'Словакия, стационарные', price: 6.1232, country: 'Словакия', type: 'стационарные' },
    { number: '810381', direction: 'Сербия и Черногория, стационарные', price: 14.24, country: 'Сербия и Черногория', type: 'стационарные' },
    { number: '8103816[1-79]', direction: 'Сербия и Черногория, мобильные', price: 27.768, country: 'Сербия и Черногория', type: 'мобильные' },
    { number: '8101', direction: 'США и Канада, стационарные и мобильные', price: 2.4208, country: 'США и Канада', type: 'стационарные' },
    { number: '81040', direction: 'Румыния, стационарные', price: 9.6832, country: 'Румыния', type: 'стационарные' },
    { number: '810407[2468]', direction: 'Румыния, мобильные', price: 28.48, country: 'Румыния', type: 'мобильные' },
    { number: '8104021', direction: 'Румыния, Бухарест', price: 8.2592, country: 'Румыния', type: 'другие' },
    { number: '8', direction: 'Россия, стационарные', price: 6.408, country: 'Россия', type: 'стационарные' },
    { number: '89', direction: 'Россия, мобильные', price: 3, country: 'Россия', type: 'мобильные' },
    { number: '810351', direction: 'Португалия, стационарные', price: 1, country: 'Португалия', type: 'стационарные' },
    { number: '810351[69]', direction: 'Португалия, мобильные', price: 7, country: 'Португалия', type: 'мобильные' },
    { number: '81048', direction: 'Польша, стационарные', price: 3.56, country: 'Польша', type: 'стационарные' },
    { number: '8104888[0789]', direction: 'Польша, мобильные', price: 17.088, country: 'Польша', type: 'мобильные' },
    { number: '8104822', direction: 'Польша, Варшава', price: 4.272, country: 'Польша', type: 'другие' },
    { number: '81049', direction: 'Германия, стационарные', price: 5.34, country: 'Германия', type: 'стационарные' },
    { number: '8104917[025679]', direction: 'Германия, мобильные', price: 32.04, country: 'Германия', type: 'мобильные' },
    { number: '8104930[0-9][0-9]', direction: 'Германия, Берлин', price: 2.848, country: 'Германия', type: 'другие' },
    { number: '81034', direction: 'Испания, стационарные', price: 4.272, country: 'Испания', type: 'стационарные' },
    { number: '810346', direction: 'Испания, мобильные', price: 28.48, country: 'Испания', type: 'мобильные' },
    { number: '81039', direction: 'Италия, стационарные', price: 3.56, country: 'Италия', type: 'стационарные' },
    { number: '810393', direction: 'Италия, мобильные', price: 28.48, country: 'Италия', type: 'мобильные' },
    { number: '81044[12][0-9]', direction: 'Великобритания, стационарные', price: 3, country: 'Великобритания', type: 'стационарные' },
    { number: '81044[789]', direction: 'Великобритания, мобильные', price: 25, country: 'Великобритания', type: 'мобильные' },
    { number: '810375', direction: 'Беларусь, стационарные', price: 21.36, country: 'Беларусь', type: 'стационарные' },
    { number: '81037533[0-9]', direction: 'Беларусь, мобильные MTS', price: 24.92, country: 'Беларусь', type: 'мобильные' },
    { number: '810374', direction: 'Армения, стационарные', price: 21.22, country: 'Армения', type: 'стационарные' },
    { number: '81037477', direction: 'Армения, мобильные', price: 26.31, country: 'Армения', type: 'мобильные' },
    { number: '810994', direction: 'Азербайджан, стационарные', price: 26, country: 'Азербайджан', type: 'стационарные' },
    { number: '8109945[015]', direction: 'Азербайджан, мобильные', price: 35, country: 'Азербайджан', type: 'мобильные' },
    { number: '81043', direction: 'Австрия, стационарные', price: 4.272, country: 'Австрия', type: 'стационарные' },
    { number: '81061', direction: 'Австралия, стационарные', price: 4.272, country: 'Австралия', type: 'стационарные' },
  ]


  const getRegionByCountry = (country: string): string => {
    const russiaCountries = ['Россия', 'Беларусь', 'Украина', 'Армения', 'Азербайджан', 'Узбекистан', 'Туркменистан', 'Таджикистан']
    const europeCountries = ['Эстония', 'Швеция', 'Швейцария', 'Чехия', 'Хорватия', 'Франция', 'Финляндия', 'Румыния', 'Португалия', 'Польша', 'Германия', 'Испания', 'Италия', 'Великобритания', 'Словения', 'Словакия', 'Сербия и Черногория', 'Австрия']
    const asiaCountries = ['Япония', 'Южная Корея', 'Турция', 'Тайвань']
    const americaCountries = ['США и Канада']

    if (russiaCountries.includes(country)) return 'Россия'
    if (europeCountries.includes(country)) return 'Европа'
    if (asiaCountries.includes(country)) return 'Азия'
    if (americaCountries.includes(country)) return 'Америка'
    return 'Другие'
  }

  const filteredPrices = useMemo(() => {
    return prices.filter(price => {
      const matchesSearch = price.direction.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           price.number.includes(searchQuery) ||
                           price.country.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = selectedType === 'all' || price.type === selectedType
      const matchesRegion = selectedRegion === 'all' || getRegionByCountry(price.country) === selectedRegion
      return matchesSearch && matchesType && matchesRegion
    })
  }, [searchQuery, selectedType, selectedRegion])

  const groupedByCountry = useMemo(() => {
    const grouped: { [key: string]: PriceItem[] } = {}
    filteredPrices.forEach(price => {
      if (!grouped[price.country]) {
        grouped[price.country] = []
      }
      grouped[price.country].push(price)
    })
    return grouped
  }, [filteredPrices])

  return (
    <div className="pricing-table-section">
      <div className="pricing-table-header">
        <h2 className="pricing-table-title">Цены по основным направлениям</h2>
        <p className="pricing-table-subtitle">В рамках договора ИП "Григорян"</p>
      </div>

      <div className="pricing-filters-horizontal">
        <div className="filter-search">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Поиск…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-horizontal"
            />
          </div>
        </div>

        <div className="filter-regions">
          <button
            className={`filter-tab ${selectedRegion === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('all')}
          >
            Все направления
          </button>
          <button
            className={`filter-tab ${selectedRegion === 'Россия' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('Россия')}
          >
            Россия
          </button>
          <button
            className={`filter-tab ${selectedRegion === 'Европа' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('Европа')}
          >
            Европа
          </button>
          <button
            className={`filter-tab ${selectedRegion === 'Азия' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('Азия')}
          >
            Азия
          </button>
          <button
            className={`filter-tab ${selectedRegion === 'Америка' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('Америка')}
          >
            Америка
          </button>
          <button
            className={`filter-tab ${selectedRegion === 'Другие' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('Другие')}
          >
            Другие
          </button>
        </div>

        <div className="filter-types">
          <button
            className={`filter-tab ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            Все типы
          </button>
          <button
            className={`filter-tab ${selectedType === 'стационарные' ? 'active' : ''}`}
            onClick={() => setSelectedType('стационарные')}
          >
            Стационарные
          </button>
          <button
            className={`filter-tab ${selectedType === 'мобильные' ? 'active' : ''}`}
            onClick={() => setSelectedType('мобильные')}
          >
            Мобильные
          </button>
          <button
            className={`filter-tab ${selectedType === 'другие' ? 'active' : ''}`}
            onClick={() => setSelectedType('другие')}
          >
            Другие
          </button>
        </div>
      </div>

      <div className="pricing-results">
        <div className="pricing-cards-container">
          {Object.entries(groupedByCountry).map(([country, countryPrices]) => (
            <div key={country} className="country-group">
              <h3 className="country-title">{country}</h3>
              <div className="country-prices-grid">
                {countryPrices.map((price, index) => (
                  <div key={`${price.number}-${index}`} className="price-card">
                    <div className="price-card-header">
                      <div className="price-number">{price.number}</div>
                      <div className={`price-type-badge ${price.type}`}>
                        {price.type === 'стационарные' && '📞'}
                        {price.type === 'мобильные' && '📱'}
                        {price.type === 'другие' && '📍'}
                      </div>
                    </div>
                    <div className="price-direction">{price.direction}</div>
                    <div className="price-value">
                      <span className="price-amount">{price.price.toFixed(4)}</span>
                      <span className="price-currency">₽/мин</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
