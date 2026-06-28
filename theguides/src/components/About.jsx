import { useRef } from 'react'
import useReveal from '../hooks/useReveal.js'
import './About.css'

const STATS = [
  { value: '5',   label: 'Thành viên sáng lập' },
  { value: 'C++', label: 'Ngôn ngữ chủ đạo' },
  { value: 'CP',  label: 'Chuyên sâu thi đấu' },
  { value: 'HSG', label: 'Định hướng thực chiến' },
]

export default function About() {
  const ref = useRef(null)
  const visible = useReveal(ref)

  return (
    <section id="about" className="section">
      <div ref={ref} className={`section__inner ${visible ? 'revealed' : ''}`}>
        <div className="about__grid">
          <div className="about__text">
            <p className="section__eyebrow">Về chúng mình</p>
            <h2 className="section__heading">
              5 người, 1 mục tiêu:<br />
              giúp bạn <span className="text-accent">giải được bài</span>
            </h2>
            <p className="about__desc">
              The Guide Team được thành lập bởi học sinh lớp 11 chuyên Tin,
              những người hiểu rõ con đường từ "biết C++" đến "AC bài CP" gian nan như thế nào.
              Chúng mình chia sẻ tư duy thực tế, không phải giáo trình.
            </p>
          </div>

          <div className="about__stats">
            {STATS.map(({ value, label }) => (
              <div key={label} className="about__stat">
                <span className="about__stat-value">{value}</span>
                <span className="about__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
