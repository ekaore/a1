'use client'

import { useState, useMemo, useEffect } from 'react'

interface PriceItem {
  number: string
  direction: string
  price: number
  country: string
  type: 'стационарные' | 'мобильные' | 'другие'
}

interface ApiTariff {
  destination: string
  regex: string
  cost: number
  currency: string
}

export default function PricingTable() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [tariffs, setTariffs] = useState<ApiTariff[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Загрузка данных напрямую с клиента
  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Добавляем таймаут для клиентского запроса
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 секунд
        
        try {
          // Прямой запрос к внешнему API
          const response = await fetch('https://voipapi.tagan.ru/statistic/rgbl/tariffs', {
            method: 'GET',
            headers: {
              'accept': 'application/json'
            },
            signal: controller.signal
          })
          
          clearTimeout(timeoutId)
          
          if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`)
          }

          const data = await response.json()

          // Проверяем структуру ответа
          if (data.status && data.data && Array.isArray(data.data)) {
            setTariffs(data.data)
          } else {
            throw new Error('Неверный формат данных от сервера')
          }
        } catch (fetchError) {
          clearTimeout(timeoutId)
          if (fetchError instanceof Error && fetchError.name === 'AbortError') {
            throw new Error('Превышено время ожидания. Сервер не отвечает. Попробуйте обновить страницу.')
          }
          if (fetchError instanceof Error && fetchError.message.includes('Failed to fetch')) {
            throw new Error('Не удалось подключиться к серверу тарифов. Проверьте подключение к интернету.')
          }
          throw fetchError
        }
      } catch (err) {
        console.error('Error fetching tariffs:', err)
        setError(err instanceof Error ? err.message : 'Ошибка при загрузке тарифов')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTariffs()
  }, [])

  // Преобразуем tariffs из API в PriceItem[]
  const prices: PriceItem[] = useMemo(() => {
    if (!tariffs || tariffs.length === 0) {
      return []
    }

    return tariffs.map(tariff => {
      // Извлекаем страну из destination (первая часть до запятой)
      const countryMatch = tariff.destination.match(/^([^,]+)/)
      const country = countryMatch ? countryMatch[1].trim() : 'Другие'
      
      // Определяем тип на основе destination
      let type: 'стационарные' | 'мобильные' | 'другие' = 'другие'
      const destinationLower = tariff.destination.toLowerCase()
      if (destinationLower.includes('стационарные') || destinationLower.includes('стационарн')) {
        type = 'стационарные'
      } else if (destinationLower.includes('мобильные') || destinationLower.includes('мобильн')) {
        type = 'мобильные'
      }

      return {
        number: tariff.regex,
        direction: tariff.destination,
        price: tariff.cost || 0,
        country: country,
        type: type
      }
    })
  }, [tariffs])

  const getRegionByCountry = (country: string): string => {
    if (!country) return 'Другие'
    
    const countryLower = country.toLowerCase().trim()
    
    // ТОЛЬКО Россия
    if (countryLower === 'россия' || countryLower.startsWith('россия')) {
      return 'Россия'
    }
    
    // Европейские страны
    const europeCountries = [
      'эстония', 'швеция', 'швейцария', 'чехия', 'хорватия', 
      'франция', 'финляндия', 'румыния', 'португалия', 'польша', 
      'германия', 'испания', 'италия', 'великобритания', 'словения', 
      'словакия', 'сербия', 'черногория', 'австрия', 'бельгия',
      'нидерланды', 'голландия', 'греция', 'венгрия', 'литва',
      'латвия', 'норвегия', 'дания', 'ирландия', 'исландия',
      'люксембург', 'мальта', 'кипр', 'албания', 'болгария',
      'босния', 'герцеговина', 'лихтенштейн', 'македония'
    ]
    
    // Азиатские страны
    const asiaCountries = [
      'япония', 'южная корея', 'корея', 'турция', 'тайвань',
      'китай', 'кнр', 'индия', 'пакистан', 'афганистан',
      'бангладеш', 'вьетнам', 'индонезия', 'таиланд', 'филиппины',
      'малайзия', 'сингапур', 'монголия', 'иран', 'ирак',
      'саудовская аравия', 'оаэ', 'объединенные арабские эмираты',
      'израиль', 'палестина', 'ливан', 'оман', 'мьянма',
      'непал', 'шри-ланка', 'мальдивы'
    ]
    
    // Страны Америки
    const americaCountries = [
      'сша', 'канада', 'мексика', 'бразилия',
      'аргентина', 'чили', 'колумбия', 'перу', 'венесуэла',
      'куба', 'ямайка'
    ]

    // Проверяем европейские страны
    for (const europeCountry of europeCountries) {
      if (countryLower === europeCountry || countryLower.startsWith(europeCountry) || countryLower.includes(europeCountry)) {
        return 'Европа'
      }
    }
    
    // Проверяем азиатские страны
    for (const asiaCountry of asiaCountries) {
      if (countryLower === asiaCountry || countryLower.startsWith(asiaCountry) || countryLower.includes(asiaCountry)) {
        return 'Азия'
      }
    }
    
    // Проверяем страны Америки
    for (const americaCountry of americaCountries) {
      if (countryLower === americaCountry || countryLower.startsWith(americaCountry) || countryLower.includes(americaCountry)) {
        return 'Америка'
      }
    }
    
    // Все остальное (включая страны СНГ, которые не Россия) - в "Другие"
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
  }, [prices, searchQuery, selectedType, selectedRegion])

  return (
    <div className="pricing-table-section">
      <div className="pricing-table-header">
        <h2 className="pricing-table-title">Цены по основным направлениям</h2>
        <p className="pricing-table-subtitle">В рамках договора <span style={{ color: 'red', fontSize: '1.2em', fontWeight: 'bold' }}>а1</span></p>
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
        {isLoading ? (
          <div className="pricing-loading">
            <svg className="spinner" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            <p>Загрузка тарифов...</p>
          </div>
        ) : error ? (
          <div className="pricing-error">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="pricing-retry-button"
            >
              Попробовать снова
            </button>
          </div>
        ) : (
          <>
            <div className="pricing-table-wrapper">
              <table className="pricing-table">
                <thead>
                  <tr className="pricing-table-header-row">
                    <th className="pricing-table-th">Номер (шаблон)</th>
                    <th className="pricing-table-th">Направление</th>
                    <th className="pricing-table-th pricing-table-th-right">Цена, руб (без НДС)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrices.length > 0 ? (
                    filteredPrices.map((price, index) => (
                      <tr
                        key={`${price.number}-${index}`}
                        className="pricing-table-row"
                      >
                        <td className="pricing-table-td pricing-table-td-pattern">
                          {price.number}
                        </td>
                        <td className="pricing-table-td pricing-table-td-direction">
                          {price.direction}
                        </td>
                        <td className="pricing-table-td pricing-table-td-price">
                          {price.price.toFixed(4)} ₽/мин
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="pricing-table-empty">
                        Тарифы не найдены
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pricing-results-count">
              Найдено тарифов: <span className="pricing-results-count-number">{filteredPrices.length}</span> из {prices.length}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
