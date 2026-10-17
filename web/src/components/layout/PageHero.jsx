import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Img from '../ui/Img'
import { EASE } from '../../lib/motion'
import { brand } from '../../data/site'

/** Banner shown at the top of every inner page: title, breadcrumb and the site tagline. */
export default function PageHero({ title, image, imageAlt = '', crumbs = [], eyebrow = brand.tagline }) {
  const reduce = useReducedMotion()
  const enter = (delay) => (reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: EASE, delay } })

  return (
    <section className="page-hero">
      <div className="page-hero__media" aria-hidden={imageAlt ? undefined : 'true'}>
        <Img src={image} alt={imageAlt} priority sizes="100vw" />
      </div>
      <div className="container page-hero__content">
        <motion.nav aria-label="Breadcrumb" className="breadcrumb" {...enter(0)}>
          <ol>
            <li><Link to="/">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c}>
                <ChevronRight aria-hidden="true" size={14} />
                <span>{c}</span>
              </li>
            ))}
            <li aria-current="page">
              <ChevronRight aria-hidden="true" size={14} />
              <span>{title}</span>
            </li>
          </ol>
        </motion.nav>
        <motion.h1 className="page-hero__title" {...enter(0.08)}>{title}</motion.h1>
        <motion.p className="page-hero__eyebrow" {...enter(0.16)}>“{eyebrow}”</motion.p>
      </div>
    </section>
  )
}
