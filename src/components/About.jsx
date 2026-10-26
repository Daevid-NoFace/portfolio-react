import gsap from 'gsap'
import { useLanguage } from '../context/LanguageContext'
import { useGsap } from '../hooks/useAnimations'
import './About.css'

const About = () => {
  const { t } = useLanguage()
  const [before, grey, after] = t.about.heading
  const ref = useGsap((el) => {
    gsap.from(el.querySelector('.about-photo'), { x: -40, opacity: 0, duration: 0.9, scrollTrigger: { trigger: el, start: 'top 70%' } })
    gsap.from(el.querySelector('.about-text'), { x: 40, opacity: 0, duration: 0.9, scrollTrigger: { trigger: el, start: 'top 70%' } })
  })

  return (
    <section id="about" className="about wrap" ref={ref}>
      <p className="section-tag about-tag">{t.about.tag}</p>
      <div className="about-grid">
        <div className="about-photo">
          <img src="david.webp" alt={t.about.photoAlt} loading="lazy" width="800" height="1000" />
          <span className="badge about-origin">{t.about.origin}</span>
        </div>
        <div className="about-text">
          <h2>{before}<span className="about-grey">{grey}</span>{after}</h2>
          {t.about.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <ul className="about-highlights">
            {t.about.highlights.map((h, i) => (
              <li key={h}><span className="mono about-index">{String(i + 1).padStart(2, '0')}</span>{h}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
