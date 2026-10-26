import gsap from 'gsap'
import { useLanguage } from '../context/LanguageContext'
import { skillsData } from '../data/content'
import { useGsap } from '../hooks/useAnimations'
import './Skills.css'

const Skills = () => {
  const { t } = useLanguage()
  const ref = useGsap((el) => {
    gsap.from(el.querySelectorAll('.skill-row'), {
      y: 24, opacity: 0, duration: 0.7, stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 80%' }
    })
  })

  return (
    <section id="stack" className="skills wrap" ref={ref}>
      <div className="section-header">
        <div>
          <p className="section-tag">{t.skills.tag}</p>
          <h2 className="section-title">{t.skills.title}</h2>
        </div>
        <p className="section-subtitle">{t.skills.subtitle}</p>
      </div>
      <div>
        {skillsData.map((skill, i) => (
          <div className="skill-row" key={i}>
            <span className="skill-index mono">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{t.skills.rows[i].title}</h3>
              <p>{t.skills.rows[i].description}</p>
            </div>
            <div className="skill-tags">
              {skill.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
