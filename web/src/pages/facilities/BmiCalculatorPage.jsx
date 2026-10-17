import InnerPage, { Article } from '../../components/layout/InnerPage'
import BmiCalculator from '../../components/sections/BmiCalculator'
import Reveal from '../../components/ui/Reveal'
import { pages } from '../../data/routes'

export default function BmiCalculatorPage() {
  return (
    <InnerPage page={pages.bmi} heading="BMI Calculator" image="gymphotos/Screenshot_20161226-090659~2.jpg" crumbs={['Facilities']}>
      <section className="section">
        <div className="container">
          <Reveal className="prose prose--intro">
            <p className="lead">
              The body mass index (BMI) is a heuristic proxy for human body fat based on an individual’s weight and height. Body mass index is defined as the individual’s body weight divided by the square of his or her height. Use the meter below and check it against the scale to determine your BMI!
            </p>
          </Reveal>
          <BmiCalculator />
        </div>
      </section>
      <Article image="images/photos/bmi.jpg" imageAlt="Body mass index chart showing underweight, healthy, overweight and obese ranges for men and women" className="section--surface">
        <dl className="definition-list">
          <div>
            <dt>BMI</dt>
            <dd>
              The Body Mass Index is a statistical measure of the weight of a person scaled according to their height. Your BMI will determine whether you’re at a healthy weight, overweight, obese or even underweight. It’s important to know and understand your BMI because if it is too high, you may be at risk of obesity related diseases.
            </dd>
          </div>
          <div>
            <dt>BMR</dt>
            <dd>
              The Basal Metabolic Rate determines just how many calories are necessary for your body to perform each day. Someone in a weight maintenance phase will require far more calories than someone trying to lose weight.
            </dd>
          </div>
          <div>
            <dt>IBW</dt>
            <dd>
              The Ideal Body Weight helps you to identify a healthy weight goal based on body type, gender, age and fitness level. You’ll be given a weight range based on four formulas representing specific body types or gender.
            </dd>
          </div>
        </dl>
        <p>
          It’s important to take these new health numbers and review them with your doctor to ensure you’re doing everything you can for safe, healthy and effective weight loss.
        </p>
      </Article>
    </InnerPage>
  )
}
