import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { branches, contact } from '../../data/site'

export function BranchCard({ branch, index }) {
  return (
    <article className="branch-card" aria-labelledby={`branch-${branch.id}`}>
      <header className="branch-card__head">
        <span className="branch-card__index" aria-hidden="true">0{index + 1}</span>
        <h3 id={`branch-${branch.id}`} className="branch-card__name">{branch.name}</h3>
        {branch.hours && (
          <span className="badge badge--live"><Clock aria-hidden="true" size={14} />{branch.hours}</span>
        )}
      </header>
      <address className="branch-card__address">
        <MapPin aria-hidden="true" size={18} />
        <span>{branch.address.map((line) => <span key={line}>{line}</span>)}</span>
      </address>
      <ul className="branch-card__lines">
        {branch.phones.map((p) => (
          <li key={p.href}>
            <a href={p.href} aria-label={`Call ${branch.name} branch on ${p.display}`}><Phone aria-hidden="true" size={16} />{p.display}</a>
          </li>
        ))}
        <li>
          <a href={contact.email.href}><Mail aria-hidden="true" size={16} />{contact.email.display}</a>
        </li>
      </ul>
      <a href={branch.mapUrl} className="btn btn--ghost btn--sm branch-card__map" target="_blank" rel="noopener noreferrer">
        <Navigation aria-hidden="true" size={16} />
        <span>Get directions<span className="sr-only"> to the {branch.name} branch (opens Google Maps)</span></span>
      </a>
    </article>
  )
}

export default function Branches({ headingLevel = 'h2' }) {
  return (
    <section className="section section--surface" id="branches" aria-labelledby="branches-title">
      <div className="container">
        <SectionHeading as={headingLevel} id="branches-title" eyebrow="Find us in Varanasi" title="Three branches. One standard." lead="Sigra, Hathua Market and Lanka — with the Lanka branch open 24×7." />
        <RevealGroup className="branch-grid">
          {branches.map((b, i) => (
            <RevealItem key={b.id}>
              <BranchCard branch={b} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
