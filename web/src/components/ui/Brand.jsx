import { Link } from 'react-router-dom'
import { brand, partner } from '../../data/site'

/**
 * The original Bob's Gym logo, unaltered. Its black wordmark was designed for
 * light backgrounds, so it sits on a light plate rather than being recoloured.
 */
export function Logo({ className = '', linked = true }) {
  const img = <img src={brand.logo.src} width={brand.logo.width} height={brand.logo.height} alt="Bob's Gym — good health keeps you ahead" />
  if (!linked) return <span className={`logo-plate ${className}`}>{img}</span>
  return (
    <Link to="/" className={`logo-plate ${className}`} aria-label="Bob's Gym home">
      {img}
    </Link>
  )
}

export function PartnerLogo({ className = '' }) {
  return (
    <a href={partner.url} className={`logo-plate logo-plate--partner ${className}`} target="_blank" rel="noopener noreferrer">
      <img src={partner.logo.src} width={partner.logo.width} height={partner.logo.height} alt="More Gains — powered by Bob's Gym Ltd. (opens in a new tab)" />
    </a>
  )
}

/** Facebook "f" mark (lucide-react no longer ships brand icons). */
export function FacebookIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.55V4.63A20.8 20.8 0 0 0 14.25 4.5c-2.24 0-3.77 1.37-3.77 3.88v2.18H7.95v2.94h2.53V21h3.02Z" />
    </svg>
  )
}
