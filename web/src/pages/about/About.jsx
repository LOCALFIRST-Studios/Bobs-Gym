import { ArrowRight } from 'lucide-react'
import InnerPage, { Article } from '../../components/layout/InnerPage'
import Facilities from '../../components/sections/Facilities'
import Button from '../../components/ui/Button'
import { pages } from '../../data/routes'
import { brand } from '../../data/site'

export default function About() {
  return (
    <InnerPage page={pages.about} image="gymphotos/Screenshot_20161226-090711~2.jpg" crumbs={['About']}>
      <Article image="gymphotos/IMG_1320.jpg" imageAlt="Trainer and member on the cardio floor at Bob’s Gym">
        <p className="eyebrow">Bob’s Gym Varanasi</p>
        <h2>The biggest & best gym in Varanasi</h2>
        <p className="lead">{brand.intro}</p>
        <div className="prose__actions">
          <Button to="/history" iconEnd={ArrowRight}>Our history</Button>
          <Button to="/founders-message" variant="ghost">Founder’s message</Button>
        </div>
      </Article>
      <Facilities />
    </InnerPage>
  )
}
