import { Link } from 'react-router-dom'
import { Activity, ArrowRight, Calculator, Dumbbell, Flower2, Salad, Sparkles } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { pages } from '../../data/routes'

// Summaries are condensed from each facility page's original copy.
const facilities = [
  { page: pages.equipment, icon: Dumbbell, text: 'Treadmills, cross and arc trainers, Smith machines, free weights and pro series dumbbells from 1 kg to 60 kg.' },
  { page: pages.aerobics, icon: Activity, text: 'A dedicated 2500 square feet space, manned by the best instructors and trained professionals.' },
  { page: pages.yoga, icon: Flower2, text: 'Experienced instructors and a centre equipped for a perfect mind and body experience.' },
  { page: pages.healthBar, icon: Salad, text: 'Our in-house café serving salads, sandwiches, healthy snacks, protein drinks and fruit juices.' },
  { page: pages.spa, icon: Sparkles, text: 'Thai, balm, oil and dry massages, plus steam bath and sauna with separate locker rooms.' },
  { page: pages.bmi, icon: Calculator, text: 'Check your Body Mass Index, Basal Metabolic Rate and Ideal Body Weight.' },
]

export default function Facilities() {
  return (
    <section className="section" aria-labelledby="facilities-title">
      <div className="container">
        <SectionHeading
          id="facilities-title"
          eyebrow="Facilities"
          title="A complete fitness package"
          lead="Combined with the Aerobics Centre, the Yoga Centre and the emphasis on dedicated instructors and personal trainers, Bob’s Gym offers its members a complete fitness package like none else."
        />
        <RevealGroup as="ul" className="feature-grid">
          {facilities.map(({ page, icon: Icon, text }) => (
            <RevealItem as="li" key={page.path}>
              <Link to={page.path} className="feature-card">
                <span className="feature-card__icon"><Icon aria-hidden="true" size={26} strokeWidth={1.8} /></span>
                <span className="feature-card__title">{page.label}</span>
                <span className="feature-card__text">{text}</span>
                <span className="feature-card__more">
                  Explore <ArrowRight aria-hidden="true" size={16} />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
