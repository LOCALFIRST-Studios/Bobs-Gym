import manifest from '../../data/image-manifest.json'

const encodePath = (p) => '/' + p.split('/').map(encodeURIComponent).join('/')

/**
 * Responsive image for an original site photo. `src` is the original path
 * relative to /public (e.g. "gymphotos/12.jpg"). Serves WebP variants with the
 * untouched original as fallback.
 */
export default function Img({ src, alt, sizes = '100vw', priority = false, className, ...rest }) {
  const entry = manifest[src]
  const fallback = encodePath(src)

  if (!entry) {
    return <img src={fallback} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" className={className} {...rest} />
  }

  const srcSet = entry.widths.map((w) => `/optimized/${entry.slug}-${w}.webp ${w}w`).join(', ')

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={entry.width}
        height={entry.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        className={className}
        {...rest}
      />
    </picture>
  )
}
