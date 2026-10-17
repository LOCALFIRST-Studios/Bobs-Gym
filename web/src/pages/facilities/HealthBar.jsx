import InnerPage, { Article } from '../../components/layout/InnerPage'
import { pages } from '../../data/routes'

export default function HealthBar() {
  return (
    <InnerPage page={pages.healthBar} image="images/photos/healthy-food.jpg" crumbs={['Facilities']}>
      <Article image="images/photos/Health-Bar-Collage.jpg" imageAlt="Collage of salads, fruit and healthy dishes from Bob’s Health Food Bar">
        <h2 className="display-quote">Good health cannot be achieved without Good eating.</h2>
        <p className="lead">
          At Bob’s Gym we have taken great care to cater to nutritional requirements of our members. The Bob’s Health Bar is our in-house café where we serve all kinds of health foods. A range of Salads, Sandwiches and Healthy snacks are on offer catering to both vegetarian and non-vegetarian members.
        </p>
        <p>
          Needless to say the food at Bob’s Health Bar is prepared from carefully selected ingredients, fresh produce and employs the highest standards of health and hygiene.
        </p>
        <p>
          The star of Bob’s Health Bar is our Master Chef Vijay who has built quite a reputation as a health food expert during his time at Mumbai. Vijay has been roped in permanently for Bob’s Health Bar and he conjures his magic in our kitchens and even turns out some delectable protein drinks, fruit juices and other healthy treats.
        </p>
      </Article>
    </InnerPage>
  )
}
