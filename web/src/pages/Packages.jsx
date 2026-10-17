import { Info } from 'lucide-react'
import InnerPage from '../components/layout/InnerPage'
import DataTable from '../components/ui/DataTable'
import SectionHeading from '../components/ui/SectionHeading'
import Tabs from '../components/ui/Tabs'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { pages } from '../data/routes'
import { activityPackages, massagePackages, personalTraining, trainerCategories } from '../data/pricing'

function TrainerTable({ duration }) {
  return (
    <div className="table-wrap">
      <table className="data-table data-table--grouped">
        <caption className="sr-only">{duration.label} personal training packages in rupees</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Trainer</th>
            {personalTraining.columns.map((c) => <th key={c} scope="col">{c}</th>)}
          </tr>
        </thead>
        {trainerCategories.map(({ category, trainers }) => (
          <tbody key={category} className={`tier tier--${category.toLowerCase()}`}>
            {trainers.map((t, i) => (
              <tr key={t}>
                {i === 0 && (
                  <th scope="rowgroup" rowSpan={trainers.length} className="tier__label">
                    <span className="tier__badge">{category}</span>
                  </th>
                )}
                <th scope="row">{t}</th>
                {duration.prices[t].map((p, j) => <td key={j}>₹{p}</td>)}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  )
}

function PackageCard({ pkg }) {
  return (
    <article className="package-card" aria-labelledby={`pkg-${pkg.id}`}>
      <h3 id={`pkg-${pkg.id}`} className="package-card__title">{pkg.title}</h3>
      <DataTable
        caption={`${pkg.title} prices in rupees`}
        captionHidden
        columns={pkg.columns}
        rows={pkg.rows.map((r) => r.map((cell, i) => (i === r.length - 1 ? `₹${cell}` : cell)))}
      />
      {pkg.notes?.length > 0 && (
        <ul className="notes notes--compact">
          {pkg.notes.map((n) => <li key={n}><Info aria-hidden="true" size={14} />{n}</li>)}
        </ul>
      )}
    </article>
  )
}

export default function Packages() {
  return (
    <InnerPage page={pages.packages} image="gymphotos/Screenshot_20161226-090752~2.jpg">
      <section className="section" aria-labelledby="pt-title">
        <div className="container">
          <SectionHeading id="pt-title" eyebrow="Personal training" title="Trainer packages" lead="Prices per trainer for a single member, a couple or a group of four." />
          <Reveal>
            <Tabs
              label="Package duration"
              className="tabs--pill"
              tabs={personalTraining.durations.map((d) => ({ id: d.id, label: `${d.label} Packages`, content: <TrainerTable duration={d} /> }))}
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--surface" aria-labelledby="activity-title">
        <div className="container">
          <SectionHeading id="activity-title" eyebrow="Classes & services" title="Activity packages" />
          <RevealGroup className="package-grid">
            {activityPackages.map((p) => (
              <RevealItem key={p.id}><PackageCard pkg={p} /></RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section" id="massage" aria-labelledby="massage-title">
        <div className="container">
          <SectionHeading id="massage-title" eyebrow="Massage Centre" title="Massage packages" />
          <RevealGroup className="package-grid package-grid--two">
            {massagePackages.map((p) => (
              <RevealItem key={p.id}><PackageCard pkg={p} /></RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </InnerPage>
  )
}
