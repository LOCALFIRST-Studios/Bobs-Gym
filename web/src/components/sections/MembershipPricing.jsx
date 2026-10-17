import { ArrowRight, Info } from 'lucide-react'
import Button from '../ui/Button'
import Img from '../ui/Img'
import SectionHeading from '../ui/SectionHeading'
import Tabs from '../ui/Tabs'
import Reveal from '../ui/Reveal'
import { formatINR, membershipNotes, membershipPlans } from '../../data/pricing'
import { brand } from '../../data/site'

function PlanCard({ plan }) {
  const multi = plan.columns.length > 1
  return (
    <article className={`plan ${plan.featured ? 'plan--featured' : ''}`}>
      <div className="plan__media" aria-hidden="true">
        <Img src={plan.image} alt="" sizes="(min-width: 900px) 40vw, 100vw" />
      </div>
      <div className="plan__body">
        <h3 className="plan__title">
          {plan.title}
          {plan.audience === 'couples' && <span className="plan__audience">Couples</span>}
        </h3>
        <table className="plan__table">
          <caption className="sr-only">{`${plan.title}${plan.audience === 'couples' ? ' couples' : ''} membership prices in rupees`}</caption>
          <thead>
            <tr>
              <th scope="col">Duration</th>
              {plan.columns.map((c) => <th key={c} scope="col">{multi ? c : 'Price'}</th>)}
            </tr>
          </thead>
          <tbody>
            {plan.rows.map((r) => (
              <tr key={r.duration}>
                <th scope="row">{r.duration}</th>
                {r.values.map((v, i) => <td key={i}>₹{formatINR(v)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="plan__renewal">
          <strong>Renewal:</strong> {plan.renewal ?? '—'}
        </p>
      </div>
    </article>
  )
}

export default function MembershipPricing() {
  const group = (audience) => (
    <div className="plan-grid">
      {membershipPlans.filter((p) => p.audience === audience).map((p) => <PlanCard key={p.id} plan={p} />)}
    </div>
  )

  return (
    <section className="section" id="prices" aria-labelledby="prices-title">
      <div className="container">
        <SectionHeading id="prices-title" eyebrow={brand.tagline} title="Our Packages Price" />
        <Reveal>
          <Tabs
            label="Membership type"
            className="tabs--pill"
            tabs={[
              { id: 'individual', label: 'Individual', content: group('individual') },
              { id: 'couples', label: 'Couples', content: group('couples') },
            ]}
          />
        </Reveal>
        <Reveal className="pricing-footer">
          <ul className="notes">
            {membershipNotes.map((n) => (
              <li key={n}><Info aria-hidden="true" size={16} />{n}</li>
            ))}
          </ul>
          <Button to="/packages" variant="ghost" iconEnd={ArrowRight}>Personal training & other packages</Button>
        </Reveal>
      </div>
    </section>
  )
}
