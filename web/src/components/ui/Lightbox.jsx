import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Img from './Img'

/**
 * Modal image viewer. `images`: [{ src, alt }]; `index` null when closed.
 * Escape closes, arrow keys navigate, focus is trapped and restored on close.
 */
export default function Lightbox({ images, index, onChange, onClose }) {
  const open = index !== null && index !== undefined
  const dialogRef = useRef(null)
  const restoreRef = useRef(null)

  const go = useCallback((step) => onChange((index + step + images.length) % images.length), [index, images.length, onChange])

  // Lock scroll and move focus in on open; restore focus to the opener on close.
  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement
    document.body.classList.add('no-scroll')
    dialogRef.current?.querySelector('[data-autofocus]')?.focus()
    return () => {
      document.body.classList.remove('no-scroll')
      restoreRef.current?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab') {
        const focusable = dialogRef.current.querySelectorAll('button')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, go, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} of ${images.length}`}
          ref={dialogRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <button type="button" className="lightbox__close icon-btn" onClick={onClose} aria-label="Close photo viewer" data-autofocus>
            <X aria-hidden="true" />
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--prev icon-btn" onClick={() => go(-1)} aria-label="Previous photo">
            <ChevronLeft aria-hidden="true" />
          </button>
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={images[index].src}
              className="lightbox__figure"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <Img src={images[index].src} alt={images[index].alt} sizes="90vw" priority />
              <figcaption>
                {images[index].alt} <span className="lightbox__count">{index + 1} / {images.length}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <button type="button" className="lightbox__nav lightbox__nav--next icon-btn" onClick={() => go(1)} aria-label="Next photo">
            <ChevronRight aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
