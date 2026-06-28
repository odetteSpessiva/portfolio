import { useRef } from 'react'
import useReveal from '../hooks/useReveal.js'
import './WhoIsItFor.css'

const ITEMS = [
  'Học sinh đang học C++ và muốn bắt đầu nghiêm túc với lập trình thi đấu.',
  'Người đã biết cơ bản nhưng cần hệ thống hóa tư duy giải bài và lấp lỗ hổng kiến thức.',
  'Học sinh đang chuẩn bị cho kỳ thi HSG Tin cấp thành phố hoặc tỉnh.',
]

export default function WhoIsItFor() {
  const ref = useRef(null)
  const visible = useReveal(ref)

  return (
    <section id="who" className="section">
      <div ref={ref} className={`section__inner ${visible ? 'revealed' : ''}`}>
        <p className="section__eyebrow">Đối tượng</p>
        <h2 className="section__heading">Bạn có phải người chúng mình đang tìm?</h2>
        <p className="who__sub">
          The Guide Team phù hợp nhất với những bạn đang ở các giai đoạn sau:
        </p>
        <ul className="who__list">
          {ITEMS.map((text, i) => (
            <li key={i} className="who__item">
              <span className="who__check">✓</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
