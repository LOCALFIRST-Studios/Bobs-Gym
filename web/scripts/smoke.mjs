/**
 * Browser smoke test against a running server (default: `npm run preview`).
 *
 *   npm run build && npx vite preview --port 4173 &
 *   npm run smoke -- [baseUrl] [screenshotDir]
 *
 * For every route and viewport it checks for console/page errors, failed
 * same-origin requests, broken images, horizontal overflow and a single <h1>,
 * then exercises the main interactions. Exits non-zero on any failure.
 */
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'
import { pages } from '../src/data/routes.js'

const BASE = (process.argv[2] || 'http://localhost:4173').replace(/\/$/, '')
const SHOTS = process.argv[3] || ''
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

const failures = []
const fail = (msg) => failures.push(msg)

async function scrollThrough(page) {
  // Trigger whileInView reveals and lazy images before measuring.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.6) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(700)
}

async function auditRoute(context, route, vp) {
  const page = await context.newPage()
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('response', (r) => {
    if (r.url().startsWith(BASE) && r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url()}`)
  })

  await page.goto(BASE + route, { waitUntil: 'networkidle' })
  await scrollThrough(page)

  const report = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    h1: document.querySelectorAll('h1').length,
    brokenImages: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
    title: document.title,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
  }))

  const tag = `${route} @${vp.name}`
  if (errors.length) fail(`${tag}: console/network errors:\n    ${errors.join('\n    ')}`)
  if (report.overflow > 1) fail(`${tag}: horizontal overflow of ${report.overflow}px`)
  if (report.h1 !== 1) fail(`${tag}: expected 1 <h1>, found ${report.h1}`)
  if (report.brokenImages.length) fail(`${tag}: broken images ${report.brokenImages.join(', ')}`)

  if (SHOTS) {
    const name = (route === '/' ? 'home' : route.slice(1)).replace(/\//g, '_')
    await page.screenshot({ path: `${SHOTS}/${name}-${vp.name}.png`, fullPage: true })
  }
  await page.close()
  return report
}

async function interactions(browser) {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))

  // Mobile menu opens, expands a group, navigates and closes.
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('button', { name: 'Facilities' }).click()
  await page.locator('#mobile-menu').getByRole('link', { name: 'Yoga' }).click()
  await page.waitForURL('**/yoga')
  const menuGone = () => page.locator('#mobile-menu').waitFor({ state: 'detached', timeout: 2000 }).then(() => true, () => false)
  if (!(await menuGone())) fail('mobile menu: still open after navigating')
  if ((await page.locator('h1').textContent()).trim() !== 'Yoga') fail('mobile menu: did not reach Yoga page')

  // Escape closes the menu and returns focus to the toggle.
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.keyboard.press('Escape')
  if (!(await menuGone())) fail('mobile menu: Escape did not close it')
  const focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))
  if (focused !== 'Open menu') fail(`mobile menu: focus not returned to toggle (got ${focused})`)

  // Timetable tabs switch with the keyboard.
  await page.goto(BASE + '/#classtimetable', { waitUntil: 'networkidle' })
  const tablist = page.getByRole('tablist', { name: 'Day of the week' })
  await tablist.getByRole('tab', { name: 'Sunday' }).click()
  if (!(await page.getByRole('tabpanel').filter({ hasText: 'Closed for the rest of the day' }).count())) fail('timetable: Sunday panel missing')
  await page.keyboard.press('Home')
  const sel = await tablist.locator('[aria-selected="true"]').textContent()
  if (!sel.includes('Monday')) fail(`timetable: Home key did not select Monday (got ${sel})`)

  // Lightbox opens, navigates and closes with Escape.
  await page.goto(BASE + '/gallery', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /^Open photo:/ }).first().click()
  const dialog = page.getByRole('dialog')
  await dialog.waitFor()
  await page.keyboard.press('ArrowRight')
  if (!(await dialog.getAttribute('aria-label')).startsWith('Photo 2')) fail('lightbox: ArrowRight did not advance')
  await page.keyboard.press('Escape')
  await dialog.waitFor({ state: 'detached' })

  // BMI calculator validates and computes.
  await page.goto(BASE + '/bmi-calculator', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Calculate' }).click()
  if (!(await page.getByText('Enter an age between 15 and 100 years.').count())) fail('bmi: missing validation error')
  await page.getByLabel('Age (years)').fill('30')
  await page.getByLabel('Height in centimetres').fill('175')
  await page.getByLabel('Weight (kg)').fill('70')
  await page.getByRole('button', { name: 'Calculate' }).click()
  await page.getByText('22.9').waitFor()

  // Contact form validates before opening the mail app.
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Send/ }).click()
  if (!(await page.getByText('Please enter your name.').count())) fail('contact: missing name validation')
  const nameFocused = await page.evaluate(() => document.activeElement?.id)
  if (nameFocused !== 'contact-name') fail('contact: focus not moved to first invalid field')

  // Legacy ASP.NET URLs redirect.
  for (const p of [pages.about, pages.spa, pages.bmi, pages.contact]) {
    await page.goto(`${BASE}/${p.legacy.replace(/^./, (c) => c.toUpperCase())}`, { waitUntil: 'networkidle' })
    if (new URL(page.url()).pathname !== p.path) fail(`legacy redirect: ${p.legacy} → ${page.url()}`)
  }

  // Unknown URLs render the 404 page.
  await page.goto(BASE + '/does-not-exist', { waitUntil: 'networkidle' })
  if (!(await page.getByText('This page skipped leg day.').count())) fail('404 page not rendered')

  if (errors.length) fail(`interactions: page errors ${errors.join('; ')}`)
  await ctx.close()
}

const browser = await chromium.launch()
if (SHOTS) await mkdir(SHOTS, { recursive: true })
const routes = [...Object.values(pages).map((p) => p.path), '/does-not-exist']

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
  for (const route of routes) await auditRoute(context, route, vp)
  await context.close()
  console.log(`✓ audited ${routes.length} routes at ${vp.name} (${vp.width}px)`)
}
await interactions(browser)
console.log('✓ interaction checks complete')
await browser.close()

if (failures.length) {
  console.error(`\n✗ ${failures.length} problem(s):\n- ${failures.join('\n- ')}`)
  process.exit(1)
}
console.log('\nAll smoke checks passed.')
