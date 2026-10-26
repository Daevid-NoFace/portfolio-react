import { useLanguage } from '../context/LanguageContext'
import './LanguageSwitcher.css'

const LanguageSwitcher = () => {
  const { language, toggleLanguage, t } = useLanguage()
  return (
    <button
      type="button"
      className="lang-btn mono hit44"
      aria-label={t.nav.switchLang}
      onClick={() => toggleLanguage(language === 'en' ? 'es' : 'en')}
    >
      <span className={language === 'en' ? 'on' : ''}>EN</span>
      <span className="lang-sep"> / </span>
      <span className={language === 'es' ? 'on' : ''}>ES</span>
    </button>
  )
}

export default LanguageSwitcher
