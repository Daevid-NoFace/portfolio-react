import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'
import { socialLinks } from '../data/content'
import { EmailIcon, GitHubIcon, LinkedInIcon } from './Icons'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef(null)
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-wrapper",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contacto" ref={sectionRef} className="contact-section">
      <div className="contact-wrapper">
        <h2>{t.contact.title}</h2>
        <p>{t.contact.description}</p>
        <div className="contact-links">
          <a href={`mailto:${socialLinks.email}`} className="contact-link">
            <EmailIcon />
            {socialLinks.email}
          </a>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="contact-link">
            <GitHubIcon />
            GitHub
          </a>
          {/* <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
            <LinkedInIcon />
            LinkedIn
          </a> */}
        </div>
      </div>
    </section>
  )
}

export default Contact
