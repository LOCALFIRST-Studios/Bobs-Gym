import InnerPage from '../../components/layout/InnerPage'
import Img from '../../components/ui/Img'
import Reveal from '../../components/ui/Reveal'
import { pages } from '../../data/routes'

export default function FoundersMessage() {
  return (
    <InnerPage page={pages.founder} image="gymphotos/Screenshot_20161226-090808~2.jpg" crumbs={['About']}>
      <section className="section">
        <div className="container letter">
          <Reveal as="figure" className="letter__banner">
            <Img src="images/Untitled1.png" alt="Bob’s Gym “I’m Back” campaign artwork" sizes="(min-width: 800px) 720px, 100vw" />
          </Reveal>
          <Reveal as="article" className="prose letter__body">
            <p className="eyebrow">From the Founder’s Desk</p>
            <p className="letter__salutation">Dear friends</p>
            <blockquote className="pullquote">
              <p>There is nothing like a dream to create the future. Utopia today, flesh and blood tomorrow.</p>
              <cite>Victor Hugo, Les Misérables, 1862</cite>
            </blockquote>
            <p>The story of BOB’S GYM friends, is a story of a dream – a dream that has turned into flesh and blood today.</p>
            <p>
              I am privileged being born to wonderful parents who spared no effort or expense in making sure that my dreams never had to be restricted by compromise or limited in ambition. My father Dr. Amrit Lal Madhok, a poet and a visionary, often wrote inspirational verses about the power of dreams. My mother Mrs. Deesh Ishrat Madhok was a career educationist who taught me the virtues of dedication and determination.
            </p>
            <p>Bob’s Gym is a reality today because my parents allowed me to dream and taught me how to turn those dreams into reality.</p>
            <p>
              Many summers ago in 1986, I was a 12th grade student on my first tour to Canada with my parents. I trained in the gyms there as a young man and thus began a long love affair with pumping iron and physical fitness. That is where I first dreamt that someday, back home in India, I would have my own gym – as good if not better than the world’s best gyms.
            </p>
            <p>
              Life has been kind to me and on 11th September, 1995 I gave myself a memorable birthday gift. Bob’s Gym, my boyhood dream had turned into reality. This was the first avatar in the life of Bob’s Gym and even then it was a spectacle in the holy city of Benares and it remained the only gym of its kind in the city for several years to come.
            </p>
            <p>
              Time changed and technology took over as it rightfully must. Fortunately, I found new mentors in life who entered as guiding angels to show me the way. My Godfather Datuk Paul Chua of Singapore, the Secretary-General of the Asian Bodybuilding Federation (ABBF) and the World Bodybuilding and Physique Sports Federation (WBPF) introduced me and guided me through the world of modern bodybuilding and physique sports.
            </p>
            <p>
              Along with his grace, I was blessed with my Godmother Ms Christina Kam of Hong Kong, the Executive Director of the ABBF and the WBPF (whom I call Chris Ma with love and affection) and the duo have guided me in the ocean of life and beyond creating a belief that I can revive my dreams.
            </p>
            <p className="lead">The revival of my dreams is the ALL-NEW BOB’S GYM that you see today!</p>
            <p>
              From the bottom of my heart, I dedicate this project to my lovely wife Pooja and my assistant at work and little sister Monica Saraswat Pandey for standing by my side through the high and lows. This dream is also dedicated to my precious kids Alisha and Arnie, Gyassuddin, the chief coach at Bob’s Gym, Munna and many others who worked beyond the call of duty to realize this dream.
            </p>
            <p>
              Lastly I dedicate Bob’s Gym to the people of Varanasi and urge them to use the facilities and embrace the healthy life. Remember – Good Health Keeps You Ahead!
            </p>
            <p>
              A man like me has much to be grateful for, but if I may be a bit greedy, I ask of the almighty but one wish, that the day he decides my time is done, he must ensure that I have finished a satisfying workout that morning!
            </p>
            <p>Best wishes to all and welcome to Bob’s Gym Varanasi – I’M BACK!</p>
            <p className="letter__signoff">
              Love,
              <strong>Baba Madhok</strong>
            </p>
          </Reveal>
        </div>
      </section>
    </InnerPage>
  )
}
