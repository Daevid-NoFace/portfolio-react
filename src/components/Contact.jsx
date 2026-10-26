import gsap from 'gsap'
import { useLanguage } from '../context/LanguageContext'
import { socialLinks } from '../data/content'
import { useGsap } from '../hooks/useAnimations'
import { MailIcon } from './Icons'
import './Contact.css'

const words = (text, extra = '') =>
  text.split(' ').filter(Boolean).map((w, i) => (
    <span key={i}><span className={'cta-word ' + extra}>{w}</span>{' '}</span>
  ))

const Contact = () => {
  const { t } = useLanguage()
  const [before, grey, after] = t.contact.heading
  const ref = useGsap((el) => {
    gsap.from(el.querySelectorAll('.cta-word'), {
      y: 16, opacity: 0, duration: 0.6, stagger: 0.05, scrollTrigger: { trigger: el, start: 'top 80%' }
    })
  })
  const mail = `mailto:${socialLinks.email}`

  return (
    <section id="contact" className="cta wrap" ref={ref}>
      <h2 className="cta-title">{words(before)}{words(grey, 'cta-grey')}{words(after)}</h2>
      <p>{t.contact.description}</p>
      <div className="cta-actions">
        <a className="btn-solid" href={mail}><MailIcon />{t.contact.hire}</a>
      </div>
      <a className="cta-email mono" href={mail}>{socialLinks.email}</a>
    </section>
  )
}

export default Contact
