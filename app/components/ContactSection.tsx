'use client'

import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    message: ''
  })
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')

  const formatPhoneNumber = (value: string): string => {
    // Удаляем все нецифровые символы
    let digits = value.replace(/\D/g, '')
    
    // Если начинается с 8, заменяем на 7
    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1)
    }
    
    // Если не начинается с 7 и есть цифры, добавляем 7 в начало
    if (digits.length > 0 && !digits.startsWith('7')) {
      digits = '7' + digits
    }
    
    // Ограничиваем до 11 цифр (7 + 10)
    digits = digits.slice(0, 11)
    
    // Форматируем: +7 (___) ___-__-__
    if (digits.length === 0) return ''
    if (digits.length === 1) return `+${digits}`
    if (digits.length <= 4) return `+7 (${digits.slice(1)}`
    if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
    if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData({
      ...formData,
      phone: formatted
    })
    
    // Валидация: должен быть полный номер +7 (___) ___-__-__
    const digits = formatted.replace(/\D/g, '')
    if (formatted && digits.length !== 11) {
      setPhoneError('Введите полный номер телефона')
    } else {
      setPhoneError('')
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({
      ...formData,
      email: value
    })
    
    // Валидация email
    if (value && !validateEmail(value)) {
      setEmailError('Введите корректный email адрес')
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Финальная валидация
    const digits = formData.phone.replace(/\D/g, '')
    if (digits.length !== 11) {
      setPhoneError('Введите полный номер телефона')
      return
    }
    
    if (!validateEmail(formData.email)) {
      setEmailError('Введите корректный email адрес')
      return
    }
    
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'phone') {
      handlePhoneChange(e as React.ChangeEvent<HTMLInputElement>)
    } else if (e.target.name === 'email') {
      handleEmailChange(e as React.ChangeEvent<HTMLInputElement>)
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  return (
    <section
      id="contact"
      className="contact-section"
      style={{ minHeight: '75vh', scrollMarginTop: '80px' }}
    >
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Связаться с нами</h2>
          <p className="contact-subtitle">Мы готовы ответить на все ваши вопросы</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-info-item">
              <div className="contact-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="contact-info-text">
                <h3 className="contact-info-title">Телефон</h3>
                <p className="contact-info-value">+7 863 445 33 33</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="contact-info-text">
                <h3 className="contact-info-title">Email</h3>
                <p className="contact-info-value">info@a1-telecom.ru</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="contact-info-text">
                <h3 className="contact-info-title">Адрес</h3>
                <p className="contact-info-value">г. Таганрог, пер. Лермонтовский, 8</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Введите ваше имя"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">Адрес подключения</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                placeholder="Введите адрес подключения"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input ${phoneError ? 'form-input-error' : ''}`}
                placeholder="+7 (___) ___-__-__"
                required
              />
              {phoneError && <span className="form-error">{phoneError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${emailError ? 'form-input-error' : ''}`}
                placeholder="your@email.com"
                required
              />
              {emailError && <span className="form-error">{emailError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Сообщение</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Расскажите о вашем вопросе..."
                rows={5}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  id="privacy-checkbox"
                  checked={agreedToPrivacy}
                  onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                  className="form-checkbox"
                />
                <span className="form-checkbox-text">
                  Я согласен(а) с{' '}
                  <a 
                    href="#" 
                    className="form-checkbox-link" 
                    onClick={(e) => {
                      e.preventDefault()
                      setAgreedToPrivacy(!agreedToPrivacy)
                    }}
                  >
                    политикой обработки персональных данных
                  </a>
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className="contact-submit-button"
              disabled={!agreedToPrivacy}
            >
              Отправить сообщение
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13"/>
                <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
