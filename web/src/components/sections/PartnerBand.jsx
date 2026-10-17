import { ExternalLink } from 'lucide-react'
import Button from '../ui/Button'
import Img from '../ui/Img'
import Reveal from '../ui/Reveal'
import { PartnerLogo } from '../ui/Brand'
import { partner } from '../../data/site'

/** More Gains — the sister site linked from the original header and hero slider. */
export default function PartnerBand() {
  return (
    <section className="section partner" aria-labelledby="partner-title">
      <div className="container partner__grid">
        <Reveal className="partner__media">
          <Img src={partner.image} alt="Shelves of supplements and nutrition products" sizes="(min-width: 900px) 50vw, 100vw" />
        </Reveal>
        <Reveal className="partner__copy" delay={0.1}>
          <p className="eyebrow">{partner.note}</p>
          <h2 id="partner-title" className="partner__title">
            <span className="sr-only">More Gains</span>
            <PartnerLogo className="partner__logo" />
          </h2>
          <Button href={partner.url} iconEnd={ExternalLink}>
            Visit website<span className="sr-only"> (opens in a new tab)</span>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
