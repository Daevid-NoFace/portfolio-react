import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage or default to English
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-lang')
      return saved || 'en'
    }
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-lang', language)
    document.documentElement.lang = language
  }, [language])

  const t = translations[language]

  const toggleLanguage = (lang) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
