import { useRef } from 'react'
import useReveal from '../hooks/useReveal.js'
import './Contact.css'

export default function Contact() {
  const ref = useRef(null)
  const visible = useReveal(ref)

  return (
    <section id="contact" className="section">
      <div ref={ref} className={`section__inner ${visible ? 'revealed' : ''}`}>
        <div className="contact__box">
          <p className="section__eyebrow" style={{ textAlign: 'center' }}>Liên hệ</p>
          <h2 className="section__heading contact__heading">
            Sẵn sàng bắt đầu chưa?
          </h2>
          <p className="contact__desc">
            Liên hệ với The Guide Team để biết thêm thông tin về lịch học và nội dung.
          </p>
          {/* PLACEHOLDER: replace href="#" with your Facebook / Zalo / email link */}
          <a href="#" className="btn btn--primary">
            Liên hệ The Guide Team
          </a>
        </div>
      </div>
    </section>
  )
}
