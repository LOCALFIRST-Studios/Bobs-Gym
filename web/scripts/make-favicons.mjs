/**
 * Builds favicons by cropping the emblem from the original logo
 * (public/images/lg.png) onto its light plate colour. The logo artwork itself
 * is not redrawn or recoloured. Run with: node scripts/make-favicons.mjs
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const logo = path.join(root, 'public/images/lg.png')
// The emblem (lifter in the magenta circle) occupies the left 70×70px of the 241×70 logo.
const emblem = sharp(logo).extract({ left: 0, top: 0, width: 70, height: 70 })
const plate = { r: 247, g: 243, b: 239, alpha: 1 }

for (const [file, size] of [['favicon.png', 64], ['apple-touch-icon.png', 180]]) {
  const inner = Math.round(size * 0.86)
  const art = await emblem.clone().resize(inner, inner, { kernel: 'lanczos3' }).png().toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: plate } })
    .composite([{ input: art, gravity: 'center' }])
    .png()
    .toFile(path.join(root, 'public', file))
}
console.log('Favicons written to public/')
