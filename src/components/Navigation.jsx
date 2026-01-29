import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import './Navigation.css'

const Navigation = () => {
  const navRef = useRef(null)
  const { t } = useLanguage()

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    )
  }, [])

  return (
    <nav ref={navRef} className="navigation">
      <div className="logo">
        <span className="logo-bracket">&lt;</span>
        Daiv.code
        <span className="logo-bracket">/&gt;</span>
      </div>
      
      <ul className="nav-links">
        <li><a href="#inicio">{t.nav.home}</a></li>
        <li><a href="#skills">{t.nav.skills}</a></li>
        <li><a href="#proyectos">{t.nav.projects}</a></li>
        <li><a href="#sobre-mi">{t.nav.about}</a></li>
        <li><a href="#contacto">{t.nav.contact}</a></li>
      </ul>
      
      <div className="nav-right">
        <LanguageSwitcher />
      </div>
    </nav>
  )
}

export default Navigation
