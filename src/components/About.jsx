import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'
import { CheckIcon } from './Icons'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-image",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      )
      
      gsap.fromTo(".about-text",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="sobre-mi" ref={sectionRef} className="about-section">
      <div className="section-header">
        <span className="section-tag">{t.about.tag}</span>
        <h2 className="section-title">{t.about.title}</h2>
      </div>
      
      <div className="about-content">
        <div className="about-image">
          <div className="about-image-frame">
            <img src="david.webp" alt="Profile" className="about-profile-image" />
          </div>
          <div className="about-decorator decorator-1" />
          <div className="about-decorator decorator-2" />
        </div>
        
        <div className="about-text">
          <h3>{t.about.heading}</h3>
          {t.about.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          
          <div className="about-highlights">
            {t.about.highlights.map((highlight, index) => (
              <div className="highlight" key={index}>
                <div className="highlight-icon"><CheckIcon /></div>
                <span className="highlight-text">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
