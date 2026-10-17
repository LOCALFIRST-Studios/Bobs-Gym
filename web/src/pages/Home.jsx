import { ArrowRight } from 'lucide-react'
import Hero from '../components/sections/Hero'
import PopularClasses from '../components/sections/PopularClasses'
import Welcome from '../components/sections/Welcome'
import Facilities from '../components/sections/Facilities'
import Timetable from '../components/sections/Timetable'
import MembershipPricing from '../components/sections/MembershipPricing'
import TrainingCta from '../components/sections/TrainingCta'
import Branches from '../components/sections/Branches'
import PhotoGrid from '../components/sections/PhotoGrid'
import Testimonials from '../components/sections/Testimonials'
import PartnerBand from '../components/sections/PartnerBand'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import usePageMeta from '../lib/usePageMeta'
import { pages } from '../data/routes'
import { brand, homeGallery } from '../data/site'
import { gymPhotoAlts } from '../data/gallery'

export default function Home() {
  usePageMeta(pages.home)

  return (
    <>
      <Hero />
      <PopularClasses />
      <Welcome />
      <Facilities />
      <Timetable />
      <MembershipPricing />
      <TrainingCta />
      <Branches />
      <section className="section" aria-labelledby="gallery-title">
        <div className="container">
          <div className="section-split">
            <SectionHeading id="gallery-title" eyebrow={brand.tagline} title="Bob’s Gym Gallery" />
            <Button to="/gallery" variant="ghost" iconEnd={ArrowRight}>View full gallery</Button>
          </div>
          <PhotoGrid images={homeGallery.map((src) => ({ src, alt: gymPhotoAlts[src] }))} className="photo-grid--mosaic" />
        </div>
      </section>
      <Testimonials />
      <PartnerBand />
    </>
  )
}
