import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { id: 'about',      label: 'Về chúng mình' },
  { id: 'topics',     label: 'Nội dung' },
  { id: 'who',        label: 'Đối tượng' },
  { id: 'team',       label: 'Thành viên' },
  { id: 'contact',    label: 'Liên hệ' },
]

export default function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => scrollTo('hero')}>
          <span className="navbar__logo-bracket">[</span>
          tgt
          <span className="navbar__logo-bracket">]</span>
        </button>

        <ul className="navbar__links">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                className={`navbar__link ${active === id ? 'navbar__link--active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>

      {menuOpen && (
        <div className="navbar__mobile-menu">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              className="navbar__mobile-link"
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
