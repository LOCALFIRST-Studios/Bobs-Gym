import InnerPage, { Article } from '../../components/layout/InnerPage'
import { pages } from '../../data/routes'

export default function BobsMantra() {
  return (
    <InnerPage page={pages.mantra} heading="Bob’s Mantra" image="gymphotos/Screenshot_20161226-090757~2.jpg" crumbs={['About']}>
      <Article image="images/parallax/image-3.jpg" imageAlt="">
        <h2 className="display-quote">Your body is a temple but when is the last time you worshipped it?</h2>
        <p className="lead">
          In the Kalyug of the information age, time has become the most scarce commodity of all! If you can claim to eat meals on time, have regulated sleep cycles and a regular exercise routine, you are one-in-a-million. Most of us have become vulnerable to a myriad of lifestyle diseases – obesity, diabetes, heart disorders, cholesterol…
        </p>
        <p>How then can one attain unity of the body, mind and soul? Allow us.</p>
        <p>
          Bob’s Gym sole objective is to give to the people of Varanasi world-class gym facilities. With expert trainers and comprehensive advice and suggestions on lifestyle changes, you can take control of the downwards spiral.
        </p>
        <p className="mantra">Become the priest of your body temple.</p>
      </Article>
    </InnerPage>
  )
}
