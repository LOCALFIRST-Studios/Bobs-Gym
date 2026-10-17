import InnerPage, { Article } from '../../components/layout/InnerPage'
import CentreTimings from '../../components/sections/CentreTimings'
import { pages } from '../../data/routes'
import { yogaCentreTimings } from '../../data/schedule'

export default function Yoga() {
  return (
    <InnerPage page={pages.yoga} heading="Yoga" image="images/photos/Yoga-01.jpg" crumbs={['Facilities']}>
      <Article image="images/photos/Yoga_Class_at_a_Gym4.JPG" imageAlt="">
        <h2 className="display-quote">Along with the “Zero”, Yoga is, perhaps ancient India’s most important cultural export to the world.</h2>
        <p className="lead">
          Yoga is a traditional meditative practice and physical and mental discipline originating in India. In a non-religious context, it is used as a form of meditation, a form of alternative medicine, and as low-impact physical exercise.
        </p>
        <p>
          Yoga has been studied as an intervention for many conditions, including pain, stress, and depression. Both the meditative and the exercise components of yoga show promise for non-specific health benefits.
        </p>
        <p>
          As our lives continue to get busier and more stressful, Yoga is an excellent medium for exercise and holistic healing of our minds and bodies. Today, there is a Yoga expert on every other television channel, but the true benefit of Yoga can be imbibed only through regular practice, strict discipline and determination to be the master of one’s own mind and body.
        </p>
        <p>
          At Bob’s Gym we have conceived of a Yoga Centre that aims to relax our members and ease them into making Yoga an integral part of their lives – not as merely a form of exercise but more deeply as a lifestyle choice.
        </p>
        <p>
          Our Yoga instructors have years of experience and our Yoga centre is equipped with everything you could imagine for a perfect mind and body experience, every single time.
        </p>
        <CentreTimings title="Timings for classes at the Yoga Centre" timings={yogaCentreTimings} />
        <p className="mantra">Come to the Bob’s Gym Yoga Centre and enjoy the process of healing yourself from within.</p>
      </Article>
    </InnerPage>
  )
}
