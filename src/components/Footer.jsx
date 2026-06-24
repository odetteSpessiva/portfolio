import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__logo">
          <span className="footer__bracket">[</span>chisa<span className="footer__bracket">]</span>
        </span>
        <span className="footer__copy">
          Built with React + Vite · Deployed on GitHub Pages
        </span>
      </div>
    </footer>
  )
}
