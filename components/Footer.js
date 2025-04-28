import Link from 'next/link'

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">Roxom</div>
        <div className="footer-links">
          <Link href="/markets">Markets</Link>
          <Link href="/trade">Trade</Link>
          <Link href="https://roxom.com/competitions">Competitions</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="social-media">
          <a href="https://twitter.com/roxom" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://t.me/roxom" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="https://discord.gg/roxom" target="_blank" rel="noopener noreferrer">Discord</a>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Roxom. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer 