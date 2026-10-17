import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Img from '../ui/Img'
import SectionHeading from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { brand, popularClasses } from '../../data/site'

export default function PopularClasses() {
  return (
    <section className="section" id="classes" aria-labelledby="classes-title">
      <div className="container">
        <SectionHeading id="classes-title" eyebrow={brand.tagline} title="Our Popular Classes" />
        <RevealGroup as="ul" className="class-grid">
          {popularClasses.map((c, i) => (
            <RevealItem as="li" key={c.title} className="class-card">
              <Link to={c.to} className="class-card__link">
                <Img src={c.image} alt={c.alt} sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw" className="class-card__img" />
                <span className="class-card__index" aria-hidden="true">0{i + 1}</span>
                <span className="class-card__body">
                  <span className="class-card__title">{c.title}</span>
                  <span className="class-card__more">
                    Read more <ArrowUpRight aria-hidden="true" size={18} />
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
