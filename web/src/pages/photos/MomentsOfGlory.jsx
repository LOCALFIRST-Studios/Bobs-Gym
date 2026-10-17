import InnerPage from '../../components/layout/InnerPage'
import ThumbnailWall from '../../components/sections/ThumbnailWall'
import SectionHeading from '../../components/ui/SectionHeading'
import { pages } from '../../data/routes'
import { momentsPhotos } from '../../data/gallery'

export default function MomentsOfGlory() {
  return (
    <InnerPage page={pages.moments} image="gymphotos/untitled.jpg" crumbs={['Photos']} cta={false}>
      <section className="section" aria-labelledby="moments-title">
        <div className="container">
          <SectionHeading
            id="moments-title"
            eyebrow="Physique sports"
            title="Championships, stages & celebrations"
            lead="Moments from Bob’s Gym’s place in the history of physique sports in Varanasi."
          />
          <ThumbnailWall images={momentsPhotos} label="Moments of Glory photos" />
        </div>
      </section>
    </InnerPage>
  )
}
