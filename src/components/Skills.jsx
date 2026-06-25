import { useRef } from 'react'
import useReveal from '../hooks/useReveal.js'
import './Skills.css'

const SKILL_GROUPS = [
  {
    category: 'Languages & Systems',
    color: '#E8253A',
    items: [
      { name: 'C++', level: 92 },
      { name: 'Python', level: 88 },
      { name: 'JavaScript / TypeScript', level: 80 },
      { name: 'WebAssembly', level: 65 },
    ],
  },
  {
    category: 'Web & Backend',
    color: '#C8102E',
    items: [
      { name: 'Django / DRF', level: 88 },
      { name: 'React', level: 80 },
      { name: 'Nginx + WSGI', level: 75 },
      { name: 'REST API Design', level: 82 },
    ],
  },
  {
    category: 'DevOps & Infra',
    color: '#A00020',
    items: [
      { name: 'Docker', level: 82 },
      { name: 'WSL2 / Linux', level: 85 },
      { name: 'Tailscale / Networking', level: 72 },
      { name: 'Selenium / Automation', level: 80 },
    ],
  },
  {
    category: 'AI & ML',
    color: '#FF4060',
    items: [
      { name: 'PyTorch', level: 75 },
      { name: 'CNN / Vision', level: 72 },
      { name: 'Audio ML', level: 65 },
      { name: 'LLM Integration', level: 70 },
    ],
  },
]

export default function Skills() {
  const ref = useRef()
  const visible = useReveal(ref)

  return (
    <section id="skills" className="skills section" ref={ref}>
      <div className={`section__inner ${visible ? 'revealed' : ''}`}>
        <div className="section__eyebrow">Skills</div>
        <h2 className="section__heading">
          Tools of the trade
        </h2>
        <div className="skills__grid">
          {SKILL_GROUPS.map(({ category, color, items }) => (
            <div className="skill-card" key={category}>
              <h3 className="skill-card__category" style={{ color }}>
                {category}
              </h3>
              <div className="skill-card__items">
                {items.map(({ name, level }) => (
                  <div className="skill-item" key={name}>
                    <div className="skill-item__header">
                      <span className="skill-item__name">{name}</span>
                      <span className="skill-item__pct" style={{ color }}>{level}%</span>
                    </div>
                    <div className="skill-item__bar">
                      <div
                        className="skill-item__fill"
                        style={{
                          width: visible ? `${level}%` : '0%',
                          background: color,
                          transitionDelay: '0.2s',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
