import { useRef } from 'react'
import useReveal from '../hooks/useReveal.js'
import './Team.css'

const MEMBERS = [
  { initials: 'VH', name: 'Việt Hoàng' },
  { initials: 'NM', name: 'Nhật Minh' },
  { initials: 'TD', name: 'Tuấn Dũng' },
  { initials: 'HN', name: 'Hoàng Nam' },
  { initials: 'CT', name: 'Công Tài' },
]

export default function Team() {
  const ref = useRef(null)
  const visible = useReveal(ref)

  return (
    <section id="team" className="section">
      <div ref={ref} className={`section__inner ${visible ? 'revealed' : ''}`}>
        <p className="section__eyebrow">Thành viên</p>
        <h2 className="section__heading">Những người đứng sau The Guide Team</h2>
        <p className="team__sub">
          5 học sinh lớp 11 chuyên Tin, Trường THPT Chuyên Hà Tĩnh. Cùng xây dựng nội dung CP từ kinh nghiệm cá nhân.
        </p>
        <div className="team__pills">
          {MEMBERS.map(({ initials, name }) => (
            <div key={name} className="team__pill">
              <span className="team__avatar">{initials}</span>
              <span className="team__name">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
