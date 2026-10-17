import InnerPage, { Article } from '../../components/layout/InnerPage'
import Reveal, { RevealGroup, RevealItem } from '../../components/ui/Reveal'
import { pages } from '../../data/routes'

const milestones = [
  { date: '1995', title: 'Fitness Lifestyle opens', text: 'Inaugurated on 11th September 1995 by former Mr. Universe Prem Chandra Degra and Manohar Aich, the Pocket Hercules of India.' },
  { date: 'Version 1.0', title: 'A revolution in standards', text: 'Fitness Lifestyle sparked off a revolution in the standards of health and fitness development centers in this holy town.' },
  { date: 'Upgrade', title: 'Bob’s Gym is born', text: 'All new equipment, trainers and a new name and look & feel.' },
  { date: '9 Feb 2011', title: 'I’M BACK!', text: 'Master Passang, the venerated Buddhist monk, blessed the gym with sacred prayers and rituals.' },
]

export default function History() {
  return (
    <InnerPage page={pages.history} image="gymphotos/Screenshot_20161226-090752~2.jpg" crumbs={['About']}>
      <Article image="gymphotos/IMG_13361.jpg" imageAlt="Visitors posing for a photo at Bob’s Gym">
        <h2>An iconic landmark in physique sports</h2>
        <p className="lead">
          Bob’s Gym has been an iconic landmark in the history of physique sports in Varanasi. In 1995, Dr. Baba Madhok, President of the Indian Body Building Federation and one of Varanasi’s leading lights, threw open the doors of Bob’s Gym.
        </p>
        <p>
          Launched then under the name of ‘Fitness Lifestyle’, it was inaugurated on 11th September 1995, by two legends – former Mr. Universe and physique sports guru Prem Chandra Degra and bodybuilding colossus Manohar Aich, popularly known as the Pocket Hercules Of India.
        </p>
        <p>
          Fitness Lifestyle (or Bob’s Gym Version 1.0) sparked off a revolution in the standards of health and fitness development centers in this holy town and was a resounding success.
        </p>
        <p>
          As with all things, the passage of time necessitated an upgrade. Featuring all new equipment, trainers and sporting a new name and look & feel, Bob’s Gym was born.
        </p>
        <p>
          Over the past sixteen years, the patronage of Bob’s Gym has included stalwarts from all disciplines. Former World Bodybuilding champions Wong Hong and Daniel Toth have trained at the world-class facilities at Bob’s Gym. So have Indian bodybuilding champions like Amit Swami, Sunil Walia and Arvind Madhok. Bob’s Gym has even attracted Bollywood stars like Amrish Puri, Gulshan Grover and Ashmit Patel and even found the satisfied patronage of India’s legendary cricketer Kapil Dev.
        </p>
        <p>
          On the February 9th 2011, Master Passang, the venerated Buddhist monk, blessed the gym with sacred prayers and rituals – and Bob’s Gym returned with open arms to welcome the fitness freaks of Varanasi with its catch phrase – <strong className="text-accent">I’M BACK!</strong>
        </p>
      </Article>

      <section className="section section--surface" aria-labelledby="timeline-title">
        <div className="container">
          <Reveal>
            <h2 id="timeline-title" className="section-heading__title">Milestones</h2>
          </Reveal>
          <RevealGroup as="ol" className="timeline">
            {milestones.map((m) => (
              <RevealItem as="li" key={m.title} className="timeline__item">
                <span className="timeline__date">{m.date}</span>
                <h3 className="timeline__title">{m.title}</h3>
                <p>{m.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </InnerPage>
  )
}
