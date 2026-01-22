export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-main">
            <h3 className="footer-title">ИП Григорян Борис Леонович</h3>
            <p className="footer-copyright">
              © 2026 ИП Григорян Борис Леонович. Все права защищены.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-group">
              <h4 className="footer-subtitle">Контакты</h4>
              <div className="footer-contacts">
                <a href="tel:+78634453333" className="footer-link">
                  <svg className="link-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>+7 863 445 33 33</span>
                </a>
                <a href="mailto:info@a1-telecom.ru" className="footer-link">
                  <svg className="link-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>info@a1-telecom.ru</span>
                </a>
              </div>
            </div>
            
            <div className="footer-group">
              <h4 className="footer-subtitle">Документы</h4>
              <div className="footer-contacts">
                <a 
                  href="/privat-polinicy.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <svg className="link-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                  <span>Закон о связи</span>
                </a>
                <a 
                  href="/privat-polinicy.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <svg className="link-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 17a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2a2 2 0 0 0 2 2z"/>
                    <path d="M6 9V7a6 6 0 1 1 12 0v2"/>
                    <rect x="5" y="9" width="14" height="12" rx="2" ry="2"/>
                  </svg>
                  <span>Политика обработки персональных данных</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
