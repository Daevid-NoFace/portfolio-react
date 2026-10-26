import gsap from 'gsap'
import { useLanguage } from '../context/LanguageContext'
import { projectsData, socialLinks } from '../data/content'
import { useGsap } from '../hooks/useAnimations'
import { ArrowUpRightIcon } from './Icons'
import './Projects.css'

const Projects = () => {
  const { t } = useLanguage()
  const ref = useGsap((el) => {
    gsap.from(el.querySelectorAll('.card'), {
      y: 24, opacity: 0, duration: 0.7, stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 80%' }
    })
  })

  return (
    <section id="work" className="projects wrap" ref={ref}>
      <div className="section-header">
        <div>
          <p className="section-tag">{t.projects.tag}</p>
          <h2 className="section-title">{t.projects.title}</h2>
        </div>
        <a className="projects-all mono" href={socialLinks.github} target="_blank" rel="noopener noreferrer">
          {t.projects.all} <ArrowUpRightIcon size={14} />
        </a>
      </div>
      <div className="projects-grid">
        {projectsData.map((project, i) => {
          const item = t.projects.items[i]
          return (
            <article className="card" key={i}>
              <div className="card-top">
                <span className="card-index mono">{String(i + 1).padStart(2, '0')} / {item.category}</span>
                <a className="card-arrow icon-btn hit44" href={project.demo} aria-label={`${t.projects.open} ${item.title}`}>
                  <ArrowUpRightIcon />
                </a>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="card-tags">
                {project.tech.map((tech) => <span className="tag" key={tech}>{tech}</span>)}
              </div>
              <div className="card-links mono">
                <a href={project.github}>{t.projects.code}</a>
                <a href={project.demo}>{t.projects.demo}</a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Projects
