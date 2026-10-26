import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { socialLinks } from '../data/content'
import LanguageSwitcher from './LanguageSwitcher'
import { GitHubIcon, MenuIcon, CloseIcon } from './Icons'
import './Navigation.css'

const ids = ['home', 'stack', 'work', 'about', 'contact']
const observed = [...ids, 'stats']
const clock = () => new Date().toLocaleTimeString('en-GB', { hour12: false })

const Navigation = () => {
  const { t } = useLanguage()
  const [time, setTime] = useState(clock)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const id = setInterval(() => setTime(clock()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id === 'stats' ? 'home' : e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    observed.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <nav aria-label="Main" className="nav wrap" onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      <span className="nav-clock mono">{time}</span>
      <div id="nav-links" className={'nav-links' + (open ? ' open' : '')}>
        {ids.map((id) => (
          <a key={id} className={'navpill' + (active === id ? ' on' : '')} href={`#${id}`} onClick={() => setOpen(false)}>
            {t.nav[id]}
          </a>
        ))}
      </div>
      <div className="nav-right">
        <LanguageSwitcher />
        <a className="nav-github icon-btn" href={socialLinks.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
        </a>
        <button
          type="button"
          className="nav-menu-btn hit44"
          aria-label={open ? t.nav.closeMenu : t.nav.menu}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </nav>
  )
}

export default Navigation
