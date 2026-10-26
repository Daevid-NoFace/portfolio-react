import { useLanguage } from '../context/LanguageContext'
import { socialLinks } from '../data/content'
import './Footer.css'

const Footer = () => {
  const { t } = useLanguage()
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <footer className="footer wrap">
      <span className="footer-copy">© {new Date().getFullYear()} Daiv.code</span>
      <span className="footer-credit">{t.footer.credit}</span>
      <div className="footer-links">
        <a href={socialLinks.github} {...ext}>GitHub</a>
        <a href={socialLinks.linkedin} {...ext}>LinkedIn</a>
        <a href={`mailto:${socialLinks.email}`}>{t.footer.email}</a>
      </div>
    </footer>
  )
}

export default Footer
