import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CalendarClock, Pause, Play } from 'lucide-react'
import Button from '../ui/Button'
import Img from '../ui/Img'
import { EASE } from '../../lib/motion'
import { brand, branches, heroSlides } from '../../data/site'

const INTERVAL = 6000

export default function Hero() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const playing = !paused && !reduce

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % heroSlides.length)
    }, INTERVAL)
    return () => clearInterval(id)
  }, [playing])

  const enter = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: EASE, delay } }

  const slide = heroSlides[index]

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.image}
            className="hero__slide"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: INTERVAL / 1000 + 1.2, ease: 'linear' } }}
          >
            <Img src={slide.image} alt={slide.alt} priority={index === 0} sizes="100vw" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container hero__content">
        <motion.p className="eyebrow hero__eyebrow" {...enter(0.1)}>
          Bob’s Gym · {brand.city} · Since {brand.founded.year}
        </motion.p>
        <h1 id="hero-title" className="hero__title">
          {brand.hero.heading.map((line, i) => (
            <motion.span key={line} className={`hero__line ${i === 1 ? 'hero__line--accent' : ''}`} {...enter(0.2 + i * 0.12)}>
              {line}
            </motion.span>
          ))}
        </h1>
        <motion.p className="hero__lead" {...enter(0.45)}>{brand.hero.subheading}</motion.p>
        <motion.div className="hero__actions" {...enter(0.55)}>
          <Button to="/#classtimetable" icon={CalendarClock}>Our class timetable</Button>
          <Button to="/contact" variant="ghost" iconEnd={ArrowRight}>Make an appointment</Button>
        </motion.div>
      </div>

      <div className="hero__footer">
        <div className="container hero__footer-inner">
          <ul className="hero__branches" aria-label="Our branches">
            {branches.map((b, i) => (
              <li key={b.id}>
                <span className="hero__branch-index">0{i + 1}</span>
                {b.name}
                {b.hours && <span className="badge">24×7</span>}
              </li>
            ))}
          </ul>

          <div className="hero__controls">
            <div className="hero__dots" role="group" aria-label="Choose slide">
              {heroSlides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  className={`hero__dot ${i === index ? 'is-active' : ''}`}
                  aria-label={`Show photo ${i + 1} of ${heroSlides.length}`}
                  aria-pressed={i === index}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            {!reduce && (
              <button type="button" className="icon-btn icon-btn--sm" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>
                {paused ? <Play aria-hidden="true" size={16} /> : <Pause aria-hidden="true" size={16} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
