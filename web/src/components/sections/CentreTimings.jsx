import { Clock } from 'lucide-react'
import Reveal from '../ui/Reveal'

/** Class timings box used on the Yoga and Aerobics pages. */
export default function CentreTimings({ title, timings }) {
  return (
    <Reveal as="aside" className="timings" aria-label={title}>
      <h3 className="timings__title"><Clock aria-hidden="true" size={20} />{title}</h3>
      <table className="timings__table">
        <thead>
          <tr><th scope="col">Time</th><th scope="col">Duration</th></tr>
        </thead>
        <tbody>
          {timings.map((t) => (
            <tr key={t.time}><td>{t.time}</td><td>{t.duration}</td></tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  )
}
