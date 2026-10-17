import { ArrowRight } from 'lucide-react'
import InnerPage, { Article } from '../../components/layout/InnerPage'
import Button from '../../components/ui/Button'
import { pages } from '../../data/routes'

const massages = ['Thai massages', 'Balm Massages', 'Oil Massages', 'Dry Massages', 'Urdh Vardham Massages']

export default function MassageSpa() {
  return (
    <InnerPage page={pages.spa} heading="Massage and Spa" image="images/photos/photo3.jpg" crumbs={['Facilities']}>
      <Article image="images/photos/Massage-Spa.jpg" imageAlt="">
        <p className="eyebrow">Massage Centre</p>
        <h2>Sweat out. Then relax.</h2>
        <p className="lead">
          There are few things in life as relaxing and soothing as a well delivered massage. Working out is about sweating out but being healthy is also about being relaxed. At Bob’s Gym we understand the stresses and strains of life that our members experience and we have tried to take some of that away from them.
        </p>
        <p>
          To round off the holistic body care promise of Bob’s Gym, a specialized Massage Centre has been established as well. The Massage Centre is staffed by trained professionals and experienced practitioners. Massages on offer include Thai massages, Balm Massages, Oil Massages, Dry Massages and even the South Indian speciality – Urdh Vardham Massages.
        </p>
        <ul className="chip-list" aria-label="Massages on offer">
          {massages.map((m) => <li key={m} className="chip">{m}</li>)}
        </ul>
        <p>Lay back, relax and be transported to a world of tranquility and calm at the Bob’s Gym Massage Centre.</p>
      </Article>
      <Article className="section--surface">
        <p className="eyebrow">Spa Services</p>
        <h2>A quiet cocoon for your soul</h2>
        <p className="lead">
          A state of art Spa facility has been provided at Bob’s Gym completely outfitted with separate locker rooms for men and women, abundant steam bath facilities and sauna arrangements.
        </p>
        <p>
          At the Bob’s Gym Spa, you will find ways to relax and rejuvenate your senses and be connected with your inner self. We have taken maximum care to provide a quiet cocoon for your soul.
        </p>
        <div className="prose__actions">
          <Button to="/packages#massage" iconEnd={ArrowRight}>Massage packages</Button>
        </div>
      </Article>
    </InnerPage>
  )
}
