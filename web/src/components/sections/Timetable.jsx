import { useState } from 'react'
import { Clock } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Tabs from '../ui/Tabs'
import Reveal from '../ui/Reveal'
import { KIND_LABELS, timetable } from '../../data/schedule'
import { brand } from '../../data/site'

// JS getDay(): 0 = Sunday. Timetable starts on Monday.
const todayId = () => timetable[(new Date().getDay() + 6) % 7].short

function DaySchedule({ day }) {
  return (
    <>
      <ol className="schedule">
        {day.classes.map((c, i) => (
          <li key={i} className={`schedule__item schedule__item--${c.kind}`}>
            <span className="schedule__time">
              <Clock aria-hidden="true" size={16} />
              {c.time}
            </span>
            <span className="schedule__name">{c.name}</span>
            <span className="chip">{KIND_LABELS[c.kind]}</span>
          </li>
        ))}
      </ol>
      {day.note && <p className="schedule__note">{day.note}</p>}
    </>
  )
}

export default function Timetable() {
  const [defaultId] = useState(todayId)
  const tabs = timetable.map((day) => ({
    id: day.short,
    label: (
      <>
        <span className="tabs__label-short" aria-hidden="true">{day.short}</span>
        <span className="tabs__label-long">{day.day}</span>
      </>
    ),
    content: <DaySchedule day={day} />,
  }))

  return (
    <section className="section section--surface" id="classtimetable" aria-labelledby="timetable-title">
      <div className="container">
        <SectionHeading id="timetable-title" eyebrow={brand.tagline} title="Our Class Timetable" lead="Today’s schedule is selected — choose a day to see its classes." />
        <Reveal>
          <Tabs tabs={tabs} label="Day of the week" defaultId={defaultId} className="timetable" />
        </Reveal>
      </div>
    </section>
  )
}
