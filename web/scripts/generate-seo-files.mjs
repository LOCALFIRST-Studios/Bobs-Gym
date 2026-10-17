/**
 * Generates public/sitemap.xml, public/robots.txt and the hosting redirect
 * files (vercel.json, public/_redirects) from src/data/routes.js, so the
 * legacy *.aspx URLs keep resolving with permanent redirects.
 * Runs automatically before `npm run build`.
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pages } from '../src/data/routes.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITE_URL = (process.env.VITE_SITE_URL || 'https://bobsgym.org').replace(/\/$/, '')
const list = Object.values(pages)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${list.map((p) => `  <url><loc>${SITE_URL}${p.path}</loc></url>`).join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

// Old URLs were case-insensitive on IIS; cover the common spellings.
const legacyVariants = (legacy) => [...new Set([legacy, legacy.toLowerCase(), legacy[0].toUpperCase() + legacy.slice(1)])]

const vercel = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  cleanUrls: true,
  redirects: list.flatMap((p) => legacyVariants(p.legacy).map((l) => ({ source: `/${l}`, destination: p.path, permanent: true }))),
  rewrites: [{ source: '/((?!assets/|optimized/|gymphotos/|images/).*)', destination: '/index.html' }],
  headers: [
    { source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    { source: '/optimized/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }] },
  ],
}

const netlify = [
  ...list.flatMap((p) => legacyVariants(p.legacy).map((l) => `/${l}  ${p.path}  301`)),
  '/*  /index.html  200',
  '',
].join('\n')

await writeFile(path.join(root, 'public/sitemap.xml'), sitemap)
await writeFile(path.join(root, 'public/robots.txt'), robots)
await writeFile(path.join(root, 'vercel.json'), JSON.stringify(vercel, null, 2) + '\n')
await writeFile(path.join(root, 'public/_redirects'), netlify)
console.log(`SEO + redirect files written for ${list.length} pages (${SITE_URL})`)
