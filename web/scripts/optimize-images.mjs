/**
 * Generates responsive WebP variants of the original Bob's Gym photographs.
 *
 * Originals in public/gymphotos and public/images are never modified — they
 * remain the <picture> fallback and keep the legacy image URLs working.
 * Output: public/optimized/<slug>-<width>.webp + src/data/image-manifest.json
 *
 * Run with: npm run images
 */
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')
const outDir = path.join(publicDir, 'optimized')
const SOURCE_DIRS = ['gymphotos', 'images']
const WIDTHS = [480, 960, 1600, 2000]
const RASTER = /\.(jpe?g|png)$/i

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name)
      return e.isDirectory() ? walk(full) : [full]
    }),
  )
  return files.flat()
}

const slugify = (relPath) =>
  relPath
    .replace(RASTER, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

await mkdir(outDir, { recursive: true })
const manifest = {}

for (const dir of SOURCE_DIRS) {
  for (const file of await walk(path.join(publicDir, dir))) {
    if (!RASTER.test(file)) continue
    const rel = path.relative(publicDir, file).split(path.sep).join('/')
    const image = sharp(file, { failOn: 'none' }).rotate()
    const { width, height } = await image.metadata()
    const slug = slugify(rel)
    // Standard breakpoints below the source width, plus the native width when it
    // is within the 2000px cap (so small images still get one variant).
    const widths = WIDTHS.filter((w) => w < width)
    if (width <= WIDTHS.at(-1)) widths.push(width)

    for (const w of widths) {
      const target = path.join(outDir, `${slug}-${w}.webp`)
      const exists = await stat(target).catch(() => null)
      if (!exists) await image.clone().resize({ width: w }).webp({ quality: 74 }).toFile(target)
    }
    manifest[rel] = { slug, width, height, widths }
  }
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
await writeFile(path.join(root, 'src/data/image-manifest.json'), JSON.stringify(sorted, null, 2) + '\n')
console.log(`Optimised ${Object.keys(sorted).length} images into public/optimized`)
