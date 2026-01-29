import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

const Footer = () => {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">&lt;David/&gt;</div>
        <p className="footer-text">
          {t.footer.designed} 💚 {t.footer.using}<br/>
          © {currentYear} David. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}

export default Footer
