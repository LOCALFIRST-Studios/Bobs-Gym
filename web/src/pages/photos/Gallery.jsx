import InnerPage from '../../components/layout/InnerPage'
import PhotoGrid from '../../components/sections/PhotoGrid'
import ThumbnailWall from '../../components/sections/ThumbnailWall'
import SectionHeading from '../../components/ui/SectionHeading'
import { pages } from '../../data/routes'
import { archivePhotos, gymPhotos } from '../../data/gallery'

export default function Gallery() {
  return (
    <InnerPage page={pages.gallery} image="gymphotos/Screenshot_20161226-090711~2.jpg" crumbs={['Photos']} cta={false}>
      <section className="section" aria-labelledby="gym-photos-title">
        <div className="container">
          <SectionHeading id="gym-photos-title" eyebrow="The gym" title="Inside Bob’s Gym" lead="Select a photo to view it full screen." />
          <PhotoGrid images={gymPhotos} className="photo-grid--mosaic" />
        </div>
      </section>
      <section className="section section--surface" aria-labelledby="archive-title">
        <div className="container">
          <SectionHeading id="archive-title" eyebrow="From the archive" title="Openings, guests & the gym floor" />
          <ThumbnailWall images={archivePhotos} label="Archive photos" />
        </div>
      </section>
    </InnerPage>
  )
}
