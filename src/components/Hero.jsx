import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLanguage } from '../context/LanguageContext'
import { personalInfo } from '../data/content'
import { ArrowIcon } from './Icons'
import Terminal from './Terminal'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef(null)
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-badge", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8 }
      )
      
      gsap.fromTo(".hero h1", 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 1 }
      )
      
      gsap.fromTo(".hero-description", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2 }
      )
      
      gsap.fromTo(".hero-cta", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.4 }
      )
      
      gsap.fromTo(".stats .stat", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 1.6 }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="inicio" ref={heroRef}>
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <span className="badge-dot" />
            {t.hero.badge}
          </div>
          
          <h1>
            {t.hero.greeting} <span className="name">{personalInfo.name}</span><br/>
            {t.hero.role}
          </h1>
          
          <p className="hero-description">
            {t.hero.description}
          </p>
          
          <div className="hero-cta">
            <a href="#proyectos" className="btn btn-primary">
              {t.hero.viewProjects} <ArrowIcon />
            </a>
            <a href="#contacto" className="btn btn-secondary">
              {t.hero.contactMe}
            </a>
          </div>
          
          <div className="stats">
            <div className="stat">
              <div className="stat-number">{personalInfo.yearsExperience}</div>
              <div className="stat-label">{t.hero.stats.experience}</div>
            </div>
            <div className="stat">
              <div className="stat-number">{personalInfo.projectsCount}</div>
              <div className="stat-label">{t.hero.stats.projects}</div>
            </div>
            <div className="stat">
              <div className="stat-number">{personalInfo.dedication}</div>
              <div className="stat-label">{t.hero.stats.dedication}</div>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <Terminal />
        </div>
      </div>
    </section>
  )
}

export default Hero
