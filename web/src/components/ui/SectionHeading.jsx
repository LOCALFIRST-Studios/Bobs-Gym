import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, lead, align = 'start', as: Heading = 'h2', id, children }) {
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading className="section-heading__title" id={id}>{title}</Heading>
      {lead && <p className="section-heading__lead">{lead}</p>}
      {children}
    </Reveal>
  )
}
