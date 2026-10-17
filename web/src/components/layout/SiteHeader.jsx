import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { navigation } from '../../data/routes'
import { branches, contact } from '../../data/site'
import { Logo, PartnerLogo } from '../ui/Brand'
import { EASE } from '../../lib/motion'

const isGroupActive = (group, pathname) => group.items?.some((item) => item.path === pathname)

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

function DesktopGroup({ group, pathname }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const menuId = useId()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onPointer = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        ref.current?.querySelector('button')?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <li
      ref={ref}
      className={`nav__item nav__item--group ${isGroupActive(group, pathname) ? 'is-active' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => !ref.current?.contains(e.relatedTarget) && setOpen(false)}
    >
      <button type="button" className="nav__link" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((o) => !o)}>
        {group.label}
        <ChevronDown aria-hidden="true" size={16} className="nav__chevron" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={menuId}
            className="nav__menu"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: EASE }}
          >
            {group.items.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className="nav__menu-link" end>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}

function MobileMenu({ open, onClose, onEscape, pathname }) {
  const [expanded, setExpanded] = useState(() => navigation.find((g) => isGroupActive(g, pathname))?.label ?? null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    document.body.classList.add('no-scroll')
    panelRef.current?.querySelector('a, button')?.focus()
    const onKey = (e) => e.key === 'Escape' && onEscape()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('no-scroll')
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onEscape])

  // Portalled to <body>: the header's backdrop-filter would otherwise become
  // the containing block for this fixed-position overlay.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-menu"
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.nav
            ref={panelRef}
            aria-label="Main"
            className="mobile-menu__panel"
            initial={{ y: -16 }}
            animate={{ y: 0 }}
            exit={{ y: -16 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ul className="mobile-menu__list">
              {navigation.map((group, i) => (
                <motion.li
                  key={group.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.3, ease: EASE }}
                >
                  {group.to ? (
                    <NavLink to={group.to} className="mobile-menu__link" end onClick={onClose}>
                      {group.label}
                    </NavLink>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={`mobile-menu__link ${isGroupActive(group, pathname) ? 'is-active' : ''}`}
                        aria-expanded={expanded === group.label}
                        aria-controls={`mm-${i}`}
                        onClick={() => setExpanded((cur) => (cur === group.label ? null : group.label))}
                      >
                        {group.label}
                        <ChevronDown aria-hidden="true" size={20} className="mobile-menu__chevron" />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === group.label && (
                          <motion.ul
                            id={`mm-${i}`}
                            className="mobile-menu__sub"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                          >
                            {group.items.map((item) => (
                              <li key={item.path}>
                                <NavLink to={item.path} end onClick={onClose}>
                                  {item.label}
                                </NavLink>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="mobile-menu__contact">
              <a href={contact.mainPhone.href} className="btn btn--primary btn--block">
                <Phone aria-hidden="true" size={18} /> <span>Call {contact.mainPhone.display}</span>
              </a>
              <a href={contact.email.href} className="btn btn--ghost btn--block">
                <Mail aria-hidden="true" size={18} /> <span>{contact.email.display}</span>
              </a>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default function SiteHeader({ overlay = false }) {
  const { pathname } = useLocation()
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const escapeMenu = useCallback(() => {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  const solid = !overlay || scrolled || menuOpen

  return (
    <header className={`site-header ${solid ? 'is-solid' : 'is-overlay'} ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="topbar">
        <div className="container topbar__inner">
          <ul className="topbar__info">
            <li>
              <Link to="/contact#branches">
                <MapPin aria-hidden="true" size={15} />
                {branches.map((b) => b.name + (b.hours ? ' (24×7)' : '')).join(' · ')}
              </Link>
            </li>
            <li>
              <a href={contact.email.href}><Mail aria-hidden="true" size={15} />{contact.email.display}</a>
            </li>
            <li>
              <a href={contact.mainPhone.href}><Phone aria-hidden="true" size={15} />{contact.mainPhone.display}</a>
            </li>
          </ul>
          <PartnerLogo className="topbar__partner" />
        </div>
      </div>

      <div className="container site-header__bar">
        <Logo className="site-header__logo" />

        <nav aria-label="Main" className="nav">
          <ul className="nav__list">
            {navigation.map((group) =>
              group.to ? (
                <li key={group.label} className="nav__item">
                  <NavLink to={group.to} className="nav__link" end>
                    {group.label}
                  </NavLink>
                </li>
              ) : (
                <DesktopGroup key={group.label} group={group} pathname={pathname} />
              ),
            )}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a href={contact.mainPhone.href} className="btn btn--primary btn--sm site-header__call" aria-label={`Call Bob’s Gym on ${contact.mainPhone.display}`}>
            <Phone aria-hidden="true" size={16} />
            <span>Call now</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="icon-btn site-header__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} onEscape={escapeMenu} pathname={pathname} />
    </header>
  )
}
