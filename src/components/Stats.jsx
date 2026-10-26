import gsap from 'gsap'
import { useLanguage } from '../context/LanguageContext'
import { stats } from '../data/content'
import { useGsap } from '../hooks/useAnimations'
import './Stats.css'

const Stats = () => {
  const { t } = useLanguage()
  const [before, accent, after] = t.stats.headline
  const ref = useGsap((el) => {
    gsap.from(el.querySelectorAll('[data-count]'), {
      textContent: 0, snap: { textContent: 1 }, duration: 1.4, ease: 'power2.out', stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 80%', once: true }
    })
  })

  return (
    <section id="stats" className="stats wrap" ref={ref}>
      <span className="badge stats-badge"><span className="badge-dot" />{t.stats.badge}</span>
      <h2 className="stats-title">{before}<span className="stats-accent">{accent}</span>{after}</h2>
      <dl className="stats-grid">
        {stats.map((s, i) => (
          <div key={i}>
            <dt className="mono">
              <span className="stat-label-long">{t.stats.items[i].label}</span>
              <span className="stat-label-short">{t.stats.items[i].short}</span>
            </dt>
            <dd>
              {typeof s.value === 'number' ? (
                <><span data-count={s.value}>{s.value}</span><span>{s.suffix}</span></>
              ) : s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default Stats
