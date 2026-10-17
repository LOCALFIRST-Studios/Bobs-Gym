import Img from '../ui/Img'
import { RevealGroup, RevealItem } from '../ui/Reveal'

/**
 * Archive photos that only survive as 150×150 thumbnails. Shown at (close to)
 * native size rather than upscaled, and not enlargeable.
 */
export default function ThumbnailWall({ images, label }) {
  return (
    <RevealGroup as="ul" className="thumb-wall" stagger={0.025} aria-label={label}>
      {images.map((img) => (
        <RevealItem as="li" key={img.src} className="thumb-wall__item">
          <Img src={img.src} alt={img.alt} sizes="150px" />
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
