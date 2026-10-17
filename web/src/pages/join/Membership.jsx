import { ArrowRight, Scale, UserRound } from 'lucide-react'
import InnerPage from '../../components/layout/InnerPage'
import DataTable from '../../components/ui/DataTable'
import Button from '../../components/ui/Button'
import Img from '../../components/ui/Img'
import Reveal from '../../components/ui/Reveal'
import { pages } from '../../data/routes'
import { personalTrainerPrograms, weightLossProgram } from '../../data/pricing'

export default function Membership() {
  return (
    <InnerPage page={pages.membership} heading="Membership @ Bob’s" image="gymphotos/Screenshot_20161226-090845~2.jpg" crumbs={['Join Us']}>
      <section className="section">
        <div className="container program-grid">
          <Reveal as="article" className="program" aria-labelledby="weight-loss-title">
            <span className="feature-card__icon"><Scale aria-hidden="true" size={24} /></span>
            <h2 id="weight-loss-title" className="program__title">Weight loss programs</h2>
            <p className="lead">Bob’s Gym offers you specialised weight loss programs. Our expert instructors will help you get back in shape in no time!</p>
            <DataTable caption="Weight loss program prices in rupees. Duration in months." captionHidden columns={weightLossProgram.columns} rows={weightLossProgram.rows} />
          </Reveal>
          <Reveal as="article" className="program" delay={0.1} aria-labelledby="pt-title">
            <span className="feature-card__icon"><UserRound aria-hidden="true" size={24} /></span>
            <h2 id="pt-title" className="program__title">Personal trainers</h2>
            <p className="lead">In case you think you need more attention than the average Joe, our personal trainers are perfect for you.</p>
            <DataTable caption="Personal trainer program prices in rupees" captionHidden columns={personalTrainerPrograms.columns} rows={personalTrainerPrograms.rows} />
            <div className="prose__actions">
              <Button to="/packages" iconEnd={ArrowRight}>Personal training packages by trainer</Button>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section section--surface">
        <div className="container media-banner">
          <Reveal className="media-banner__img">
            <Img src="images/photos/member.jpg" alt="" sizes="(min-width: 900px) 50vw, 100vw" />
          </Reveal>
          <Reveal className="prose" delay={0.1}>
            <h2>Are you a member yet?</h2>
            <p className="lead">Get in touch and get the Bobs Gym Advantage today!</p>
            <div className="prose__actions">
              <Button to="/#prices" iconEnd={ArrowRight}>Membership prices</Button>
              <Button to="/contact" variant="ghost">Contact us</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </InnerPage>
  )
}
