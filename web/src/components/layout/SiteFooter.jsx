import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { brand, branches, contact, latestNews, patrons } from '../../data/site'
import { FacebookIcon, Logo, PartnerLogo } from '../ui/Brand'

const quickLinks = [
  { label: 'Our Classes', to: '/#classes' },
  { label: 'Our Courses', to: '/packages' },
  { label: 'Our Timetable', to: '/#classtimetable' },
  { label: 'Our Pricing', to: '/#prices' },
  { label: 'Contact', to: '/contact' },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo />
          <p className="site-footer__tagline">{brand.tagline}</p>
          <ul className="site-footer__contact">
            <li><a href={contact.mainPhone.href}><Phone aria-hidden="true" size={16} />{contact.mainPhone.display}</a></li>
            <li><a href={contact.email.href}><Mail aria-hidden="true" size={16} />{contact.email.display}</a></li>
          </ul>
          <a href={contact.facebook} className="social-link" target="_blank" rel="noopener noreferrer">
            <FacebookIcon size={18} /> <span>Bob’s Gym on Facebook</span>
          </a>
        </div>

        <div>
          <h2 className="site-footer__heading">Branches</h2>
          <ul className="site-footer__branches">
            {branches.map((b) => (
              <li key={b.id}>
                <span className="site-footer__branch-name">
                  {b.name} {b.hours && <span className="badge">24×7</span>}
                </span>
                {b.phones.slice(0, 1).map((p) => (
                  <a key={p.href} href={p.href}>{p.display}</a>
                ))}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="site-footer__heading">Quick Links</h2>
          <ul className="site-footer__links">
            {quickLinks.map((l) => (
              <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="site-footer__heading">Latest News</h2>
          <ul className="site-footer__news">
            {latestNews.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </div>
      </div>

      <div className="container site-footer__patrons">
        <p>Bob’s Gym proudly enjoys the patronage of:</p>
        <ul>
          {patrons.map((p) => (
            <li key={p.short}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" title={`Official website of the ${p.short}`}>
                <img src={encodeURI(p.logo)} alt={`${p.name} (opens in a new tab)`} width="72" height="72" loading="lazy" />
              </a>
            </li>
          ))}
        </ul>
        <PartnerLogo className="site-footer__partner" />
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Bob’s Gym | All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
