import { HeartPulse } from 'lucide-react'
import InnerPage, { Article } from '../../components/layout/InnerPage'
import CentreTimings from '../../components/sections/CentreTimings'
import Img from '../../components/ui/Img'
import Reveal, { RevealGroup, RevealItem } from '../../components/ui/Reveal'
import { pages } from '../../data/routes'
import { aerobicsCentreTimings } from '../../data/schedule'

const benefits = [
  'Strengthening the muscles involved in respiration, to facilitate the flow of air in and out of the lungs',
  'Strengthening and enlarging the heart muscle, to improve its pumping efficiency and reduce the resting heart rate, known as aerobic conditioning',
  'Strengthening muscles throughout the body',
  'Improving circulation efficiency and reducing blood pressure',
  'Increasing the total number of red blood cells in the body, facilitating transport of oxygen',
  'Improved mental health, including reducing stress and lowering the incidence of depression',
  'Reducing the risk for diabetes.',
]

export default function Aerobics() {
  return (
    <InnerPage page={pages.aerobics} heading="Aerobics" image="gymphotos/Screenshot_20161226-090641~2.jpg" crumbs={['Facilities']}>
      <Article image="gymphotos/Screenshot_20161226-090757~2.jpg" imageAlt="The aerobics studio with exercise balls">
        <h2>Exercise “with oxygen”</h2>
        <p className="lead">
          Aerobic exercise is physical exercise that intends to improve the oxygen system. Aerobic means “with oxygen”, and refers to the use of oxygen in the body’s metabolic or energy-generating process. Many types of exercise are aerobic, and by definition are performed at moderate levels of intensity for extended periods of time.
        </p>
        <p>
          Aerobics as a discipline of fitness and exercise has helped millions of individuals all over the world. At Bob’s Gym we take aerobics very seriously and have dedicated facilities and instructors to help our members derive maximum benefit from aerobic exercise.
        </p>
        <p className="stat-callout">
          <strong>2500</strong> <span>square feet — our Aerobics Centre is a dedicated space, manned by the best instructors and trained professionals who are at hand for personal guidance and help.</span>
        </p>
        <CentreTimings title="Timings for classes at the Aerobics Centre" timings={aerobicsCentreTimings} />
        <p>Try out the Aerobics Centre at Bob’s Gym and get that spring in your stride that you have always wanted.</p>
      </Article>

      <section className="section section--surface" aria-labelledby="benefits-title">
        <div className="container benefits">
          <Reveal className="benefits__intro">
            <h2 id="benefits-title" className="section-heading__title">Among the recognized benefits of doing regular aerobic exercise</h2>
            <Img src="images/photos/5.jpg" alt="" sizes="(min-width: 900px) 30vw, 100vw" className="benefits__img" />
          </Reveal>
          <RevealGroup as="ul" className="benefit-list">
            {benefits.map((b) => (
              <RevealItem as="li" key={b}>
                <HeartPulse aria-hidden="true" size={22} />
                <span>{b}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </InnerPage>
  )
}
