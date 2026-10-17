import { Link } from 'react-router-dom'
import { ArrowUpRight, Trophy } from 'lucide-react'
import PageHero from './PageHero'
import Img from '../ui/Img'
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal'
import TrainingCta from '../sections/TrainingCta'
import usePageMeta from '../../lib/usePageMeta'
import { brand, popularClasses } from '../../data/site'

// The four class tiles that closed every inner page on the original site.
const exploreTiles = ['Running Class', 'Weight Loss', 'Aerobics', 'Gym Fitness'].map((t) => popularClasses.find((c) => c.title === t))

function ExploreStrip() {
  return (
    <section className="section section--tight" aria-labelledby="explore-title">
      <div className="container">
        <h2 id="explore-title" className="explore__title">Explore Bob’s Gym</h2>
        <RevealGroup as="ul" className="explore">
          {exploreTiles.map((c) => (
            <RevealItem as="li" key={c.title}>
              <Link to={c.to} className="explore__tile">
                <Img src={c.thumb} alt="" sizes="(min-width: 900px) 25vw, 50vw" />
                <span>{c.title} <ArrowUpRight aria-hidden="true" size={16} /></span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export function ChampionBanner() {
  return (
    <Reveal className="champion">
      <Trophy aria-hidden="true" size={22} />
      <p>{brand.championBanner}</p>
    </Reveal>
  )
}

/**
 * Shared structure for inner pages: hero banner, page content, then the
 * training call to action and explore strip.
 */
export default function InnerPage({ page, heading, image, imageAlt, crumbs, champion = true, explore = true, cta = true, children }) {
  usePageMeta({ title: page.title, description: page.description, path: page.path, image: `/${image}` })

  return (
    <>
      <PageHero title={heading ?? page.label} image={image} imageAlt={imageAlt} crumbs={crumbs} />
      {champion && (
        <div className="container">
          <ChampionBanner />
        </div>
      )}
      {children}
      {cta && <TrainingCta />}
      {explore && <ExploreStrip />}
    </>
  )
}

/** Two-column article: long-form copy beside a sticky original image. */
export function Article({ children, image, imageAlt, caption, reverse = false, className = '' }) {
  return (
    <section className={`section article ${reverse ? 'article--reverse' : ''} ${className}`}>
      <div className="container article__grid">
        <Reveal className="prose">{children}</Reveal>
        {image && (
          <Reveal as="figure" className="article__figure" delay={0.1}>
            <Img src={image} alt={imageAlt} sizes="(min-width: 960px) 40vw, 100vw" />
            {caption && <figcaption>{caption}</figcaption>}
          </Reveal>
        )}
      </div>
    </section>
  )
}
