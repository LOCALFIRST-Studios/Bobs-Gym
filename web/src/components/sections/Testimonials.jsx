import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { brand, visibleTestimonials as items } from '../../data/site'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const go = (step) => {
    setDirection(step)
    setIndex((i) => (i + step + items.length) % items.length)
  }
  const t = items[index]

  return (
    <section className="section testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading id="testimonials-title" eyebrow={brand.tagline} title="What Our Clients Say" align="center" />
        <Reveal className="testimonial" role="group" aria-roledescription="carousel" aria-label="Client testimonials">
          <Quote aria-hidden="true" className="testimonial__mark" size={56} />
          <div className="testimonial__viewport" aria-live="polite">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.figure
                key={t.name}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                aria-label={`Testimonial ${index + 1} of ${items.length}`}
              >
                <blockquote className="testimonial__quote">
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="testimonial__author">
                  <span className="testimonial__avatar" aria-hidden="true">{t.name.split(' ').map((w) => w[0]).join('')}</span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="testimonial__controls">
            <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous testimonial">
              <ChevronLeft aria-hidden="true" />
            </button>
            <div className="testimonial__dots" role="group" aria-label="Choose testimonial">
              {items.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  className={`hero__dot ${i === index ? 'is-active' : ''}`}
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-pressed={i === index}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                />
              ))}
            </div>
            <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next testimonial">
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
