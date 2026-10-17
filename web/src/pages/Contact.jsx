import { Mail, Phone } from 'lucide-react'
import InnerPage from '../components/layout/InnerPage'
import ContactForm from '../components/sections/ContactForm'
import { BranchCard } from '../components/sections/Branches'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { FacebookIcon } from '../components/ui/Brand'
import { pages } from '../data/routes'
import { branches, contact } from '../data/site'

export default function Contact() {
  return (
    <InnerPage page={pages.contact} heading="Contact Us" image="gymphotos/Screenshot_20161226-090659~2.jpg" champion={false} cta={false}>
      <section className="section">
        <div className="container contact">
          <Reveal className="contact__form-wrap">
            <ContactForm />
          </Reveal>
          <Reveal as="aside" className="contact__info" delay={0.1} aria-labelledby="contact-info-title">
            <h2 id="contact-info-title" className="contact__info-title">Contact information</h2>
            <p>If you are in the middle of something and you don’t want to miss that important call that could be the start of an exciting new business.</p>
            <ul className="contact__quick">
              <li>
                <a href={contact.mainPhone.href} className="contact__quick-link">
                  <span className="feature-card__icon"><Phone aria-hidden="true" size={22} /></span>
                  <span><small>Call us</small>{contact.mainPhone.display}</span>
                </a>
              </li>
              <li>
                <a href={contact.email.href} className="contact__quick-link">
                  <span className="feature-card__icon"><Mail aria-hidden="true" size={22} /></span>
                  <span><small>Email us</small>{contact.email.display}</span>
                </a>
              </li>
              <li>
                <a href={contact.facebook} className="contact__quick-link" target="_blank" rel="noopener noreferrer">
                  <span className="feature-card__icon"><FacebookIcon size={22} /></span>
                  <span><small>Follow us</small>facebook.com/thebobsgym</span>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--surface" id="branches" aria-labelledby="branches-title">
        <div className="container">
          <Reveal>
            <h2 id="branches-title" className="section-heading__title">Our branches</h2>
          </Reveal>
          <RevealGroup className="branch-grid">
            {branches.map((b, i) => (
              <RevealItem key={b.id}><BranchCard branch={b} index={i} /></RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </InnerPage>
  )
}
