import { useState } from 'react'
import { Expand } from 'lucide-react'
import Img from '../ui/Img'
import Lightbox from '../ui/Lightbox'
import { RevealGroup, RevealItem } from '../ui/Reveal'

/** Grid of original photographs that open in an accessible lightbox. `images`: [{ src, alt }]. */
export default function PhotoGrid({ images, className = '' }) {
  const [index, setIndex] = useState(null)

  return (
    <>
      <RevealGroup as="ul" className={`photo-grid ${className}`} stagger={0.05}>
        {images.map((img, i) => (
          <RevealItem as="li" key={img.src} className="photo-grid__item">
            <button type="button" className="photo-grid__button" onClick={() => setIndex(i)} aria-label={`Open photo: ${img.alt}`}>
              <Img src={img.src} alt="" sizes="(min-width: 1000px) 33vw, 50vw" />
              <span className="photo-grid__icon" aria-hidden="true"><Expand size={20} /></span>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>
      <Lightbox images={images} index={index} onChange={setIndex} onClose={() => setIndex(null)} />
    </>
  )
}
