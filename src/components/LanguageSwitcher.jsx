import { useLanguage } from '../context/LanguageContext'
import './LanguageSwitcher.css'

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage()

  return (
    <div className="lang-switcher">
      <button 
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => toggleLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="lang-divider" />
      <button 
        className={`lang-btn ${language === 'es' ? 'active' : ''}`}
        onClick={() => toggleLanguage('es')}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  )
}

export default LanguageSwitcher
