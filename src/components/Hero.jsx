import { useLanguage } from '../context/LanguageContext'
import { socialLinks, location } from '../data/content'
import { useGsap } from '../hooks/useAnimations'
import gsap from 'gsap'
import { BoltIcon, ArrowDownRightIcon } from './Icons'
import './Hero.css'

const Hero = () => {
  const { t } = useLanguage()
  const ref = useGsap((el) => {
    gsap.from(el.querySelectorAll('.hero-line'), { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 })
    gsap.from(el.querySelectorAll('.hero-micro, .hero-foot, .hero-available'), { opacity: 0, y: 12, duration: 0.6, delay: 0.5, stagger: 0.08 })
  })

  return (
    <section id="home" className="hero wrap" ref={ref}>
      <p className="hero-available mono"><span className="badge-dot" />{t.hero.available}</p>
      <div className="hero-grid">
        <p className="hero-micro hero-micro-left">{t.hero.intro}</p>
        <h1 className="hero-title">
          <span className="hero-line">{t.hero.lines[0]} <br className="hero-br" />{t.hero.lines[1]}</span>
          <span className="hero-line">
            <span aria-hidden="true">Soft<BoltIcon />ware</span>
            <span className="sr-only">{t.hero.software}</span>
          </span>
          <span className="hero-line">{t.hero.lines[2]}</span>
        </h1>
        <p className="hero-micro hero-micro-right">{t.hero.open}</p>
      </div>
      <div className="hero-foot mono">
        <a className="hero-handle" href={socialLinks.github} target="_blank" rel="noopener noreferrer">
          {socialLinks.github.replace('https://', '')}
        </a>
        <span>{location} — {new Date().getFullYear()}</span>
        <a href="#stats" className="hero-scroll" aria-label={t.hero.scrollDown}><ArrowDownRightIcon /></a>
      </div>
    </section>
  )
}

export default Hero
