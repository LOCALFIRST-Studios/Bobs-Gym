import { ArrowRight, Phone } from 'lucide-react'
import Button from '../ui/Button'
import Img from '../ui/Img'
import Reveal from '../ui/Reveal'
import { contact } from '../../data/site'

/** "Start a personal training session" call to action from the original home page. */
export default function TrainingCta({
  title = 'Start a personal training session with one of our fitness trainers',
  image = 'gymphotos/IMG_1320.jpg',
}) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="cta-band__media" aria-hidden="true">
        <Img src={image} alt="" sizes="100vw" />
      </div>
      <div className="container cta-band__inner">
        <Reveal>
          <p className="eyebrow">Confirm your seat</p>
          <h2 id="cta-title" className="cta-band__title">{title}</h2>
        </Reveal>
        <Reveal className="cta-band__actions" delay={0.1}>
          <Button to="/contact" iconEnd={ArrowRight} size="lg">Contact us</Button>
          <Button href={contact.mainPhone.href} variant="ghost" icon={Phone} size="lg">{contact.mainPhone.display}</Button>
        </Reveal>
      </div>
    </section>
  )
}
