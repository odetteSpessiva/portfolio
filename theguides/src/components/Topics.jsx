import { useRef } from 'react'
import { Lightbulb, GitBranch, Zap, SearchCheck } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import './Topics.css'

const TOPICS = [
  {
    Icon: Lightbulb,
    title: 'Tư duy tiếp cận bài toán',
    desc: 'Phân tích đề, nhận dạng dạng bài, lựa chọn hướng giải phù hợp. Kỹ năng quyết định kết quả contest.',
  },
  {
    Icon: GitBranch,
    title: 'Cấu trúc dữ liệu & Giải thuật',
    desc: 'Chặt nhị phân, hai con trỏ, quy hoạch động và các kỹ thuật phổ biến trong thi đấu.',
  },
  {
    Icon: Zap,
    title: 'Debug & Tối ưu C++',
    desc: 'Xử lý lỗi, tối ưu thời gian chạy để đạt AC thay vì TLE/WA trên VNOJ và Codeforces.',
  },
  {
    Icon: SearchCheck,
    title: 'Phân tích sau contest',
    desc: 'Hiểu rõ tại sao AC, tại sao WA, tại sao TLE. Và cách không lặp lại lần sau.',
  },
]

export default function Topics() {
  const ref = useRef(null)
  const visible = useReveal(ref)

  return (
    <section id="topics" className="section">
      <div ref={ref} className={`section__inner ${visible ? 'revealed' : ''}`}>
        <p className="section__eyebrow">Nội dung chia sẻ</p>
        <h2 className="section__heading">Những gì bạn sẽ học được</h2>
        <p className="topics__sub">
          Mỗi chủ đề được thiết kế từ kinh nghiệm thi đấu thực tế, không phải từ sách giáo khoa.
        </p>
        <div className="topics__grid">
          {TOPICS.map(({ Icon, title, desc }) => (
            <div key={title} className="topic-card">
              <span className="topic-card__icon">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="topic-card__title">{title}</h3>
              <p className="topic-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
