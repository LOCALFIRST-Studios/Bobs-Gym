import { useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Accessible tabs (WAI-ARIA tabs pattern, automatic activation).
 * `tabs`: [{ id, label, content }]. Arrow keys, Home and End move between tabs.
 */
export default function Tabs({ tabs, label, defaultId, className = '' }) {
  const [active, setActive] = useState(defaultId ?? tabs[0].id)
  const baseId = useId()
  const refs = useRef({})

  const focusTab = (index) => {
    const tab = tabs[(index + tabs.length) % tabs.length]
    setActive(tab.id)
    refs.current[tab.id]?.focus()
  }

  const onKeyDown = (event, index) => {
    const keys = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 }
    if (event.key in keys) {
      event.preventDefault()
      focusTab(keys[event.key])
    }
  }

  return (
    <div className={`tabs ${className}`}>
      <div className="tabs__list" role="tablist" aria-label={label}>
        {tabs.map((tab, index) => {
          const selected = tab.id === active
          return (
            <button
              key={tab.id}
              ref={(el) => (refs.current[tab.id] = el)}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              className="tabs__tab"
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
            >
              {selected && <motion.span layoutId={`${baseId}-indicator`} className="tabs__indicator" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
              <span className="tabs__label">{tab.label}</span>
            </button>
          )
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== active}
          tabIndex={0}
          className="tabs__panel"
        >
          {tab.id === active && tab.content}
        </div>
      ))}
    </div>
  )
}
