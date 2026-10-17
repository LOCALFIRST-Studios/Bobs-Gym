import { Mail, Phone, UserRound } from 'lucide-react'
import InnerPage, { Article } from '../../components/layout/InnerPage'
import { pages } from '../../data/routes'
import { careersContact } from '../../data/site'

export default function Careers() {
  return (
    <InnerPage page={pages.careers} heading="Careers" image="gymphotos/Screenshot_20161226-090802~2.jpg" crumbs={['Join Us']}>
      <Article image="images/photos/career-sign.jpg" imageAlt="">
        <h2>Join Bob’s Team</h2>
        <p className="lead">
          Bob’s Gym is constantly on the lookout for fit and enthusiastic members of the fitness community who join our family. If you think you’ve got what it takes to be a part of Bob’s Team, get in touch with us now!
        </p>
        <div className="contact-card">
          <p className="eyebrow">Contact</p>
          <p className="contact-card__role"><UserRound aria-hidden="true" size={20} />{careersContact.role}</p>
          <ul>
            <li><a href={careersContact.phone.href}><Phone aria-hidden="true" size={18} />{careersContact.phone.display}</a></li>
            <li><a href={careersContact.email.href}><Mail aria-hidden="true" size={18} />{careersContact.email.display}</a></li>
          </ul>
        </div>
      </Article>
    </InnerPage>
  )
}
