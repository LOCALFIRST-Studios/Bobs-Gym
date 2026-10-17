import { Check } from 'lucide-react'
import InnerPage, { Article } from '../../components/layout/InnerPage'
import PhotoGrid from '../../components/sections/PhotoGrid'
import Reveal from '../../components/ui/Reveal'
import { pages } from '../../data/routes'
import { gymPhotoAlts } from '../../data/gallery'

const equipment = [
  'Single Stations',
  'Treadmills',
  'Recumbent bikes',
  'Cross trainers',
  'Arc trainers',
  'Olympic benches for chest and shoulders',
  'Smith machines',
  'Free weights',
  'Pro series fixed dumbbells ranging from 1 kg to 60 kg each side',
]

const photos = [
  'gymphotos/Screenshot_20161226-090711~2.jpg',
  'gymphotos/Screenshot_20161226-090659~2.jpg',
  'gymphotos/Screenshot_20161226-090808~2.jpg',
  'gymphotos/Screenshot_20161226-090802~2.jpg',
  'gymphotos/Screenshot_20161226-090845~2.jpg',
  'gymphotos/Screenshot_20161226-090716~2.jpg',
].map((src) => ({ src, alt: gymPhotoAlts[src] }))

export default function Equipment() {
  return (
    <InnerPage page={pages.equipment} image="gymphotos/Screenshot_20161226-090716~2.jpg" crumbs={['Facilities']}>
      <Article image="gymphotos/hqdefault.jpg" imageAlt="Member training on a machine at Bob’s Gym">
        <h2>The finest purpose built gymnasium in Varanasi</h2>
        <p className="lead">
          Bob’s Gym is the finest purpose built gymnasium and fitness centre in Varanasi and is equipped with the best fixtures that one could imagine. The range of workout equipment and facilities available at Bob’s Gym is virtually unmatched in Uttar Pradesh and is among the finest in the entire country.
        </p>
        <p>The plethora of machinery and equipment at Bob’s Gym includes the following:</p>
        <ul className="check-list check-list--columns">
          {equipment.map((e) => (
            <li key={e}><Check aria-hidden="true" size={18} />{e}</li>
          ))}
        </ul>
        <p>
          Besides the heavy-duty hardware, Bob’s has also put in place state-of-the-art body tracking software. This can be used to monitor your Basal Metabolic Rate and biorhythm on a regular basis, giving you a clear idea of the progress you’ve made! Combined with the Bob’s Gym Aerobics Centre, the Yoga Centre and the emphasis on dedicated instructors and personal trainers, Bob’s Gym offers to its members a complete fitness package like none else.
        </p>
      </Article>
      <section className="section section--surface" aria-labelledby="floor-title">
        <div className="container">
          <Reveal>
            <h2 id="floor-title" className="section-heading__title">On the floor</h2>
          </Reveal>
          <PhotoGrid images={photos} />
        </div>
      </section>
    </InnerPage>
  )
}
