import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import Img from '../ui/Img'
import Reveal from '../ui/Reveal'
import { brand, branches } from '../../data/site'

// Every figure here is stated on the original site (History, Aerobics and Contact pages).
const facts = [
  { value: brand.founded.year, label: 'Doors opened in Varanasi' },
  { value: branches.length, label: 'Branches across the city' },
  { value: '24×7', label: 'Open round the clock at Lanka' },
  { value: '2500', unit: 'sq ft', label: 'Dedicated Aerobics Centre' },
]

export default function Welcome() {
  return (
    <section className="section section--surface welcome" aria-labelledby="welcome-title">
      <div className="container welcome__grid">
        <Reveal className="welcome__media">
          <Img src="gymphotos/untitled.jpg" alt="Guests and dignitaries gathered at a Bob’s Gym event" sizes="(min-width: 960px) 45vw, 100vw" />
          <p className="welcome__stamp" aria-hidden="true">
            <span>Est.</span> {brand.founded.year}
          </p>
        </Reveal>
        <div className="welcome__copy">
          <Reveal>
            <p className="eyebrow">“{brand.tagline}”</p>
            <h2 id="welcome-title" className="section-heading__title">
              Welcome to <span className="text-accent">Bob’s Gym</span>
            </h2>
            <p className="welcome__lead">{brand.intro}</p>
            <div className="welcome__actions">
              <Button to="/about" iconEnd={ArrowRight}>About us</Button>
              <Button to="/#classes" variant="ghost">Our classes</Button>
            </div>
          </Reveal>
          <Reveal as="dl" className="facts" delay={0.1}>
            {facts.map((f) => (
              <div key={f.label} className="facts__item">
                <dt>{f.label}</dt>
                <dd>
                  {f.value}
                  {f.unit && <small> {f.unit}</small>}
                </dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
