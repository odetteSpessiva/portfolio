import './Hero.css'

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__slash" aria-hidden="true" />
      <div className="hero__slash-line" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__tag">
          <span className="hero__tag-dot" />
          Competitive Programming · C++ · THPT Chuyên Hà Tĩnh
        </div>

        <h1 className="hero__heading">
          Học CP<br />
          đúng <span className="hero__heading-accent">cách.</span>
        </h1>

        <p className="hero__bio">
          Tư duy thuật toán thực chiến từ học sinh lớp 11 Tin,
          được trau dồi qua Codeforces, VNOJ và các kỳ thi HSG.
        </p>

        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => scrollTo('contact')}>
            Liên hệ ngay
          </button>
          <button className="btn btn--ghost" onClick={() => scrollTo('topics')}>
            Xem nội dung
          </button>
        </div>
      </div>

      <button
        className="hero__scroll-hint"
        onClick={() => scrollTo('about')}
        aria-label="Scroll down"
      >
        <span className="hero__scroll-arrow" />
      </button>
    </section>
  )
}
