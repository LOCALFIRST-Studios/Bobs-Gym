import { useEffect } from 'react'
import { ArrowLeft, Phone } from 'lucide-react'
import Button from '../components/ui/Button'
import usePageMeta from '../lib/usePageMeta'
import { contact } from '../data/site'

export default function NotFound() {
  usePageMeta({ title: "Page not found | Bob's Gym Varanasi", description: 'The page you were looking for could not be found.', path: '/404' })
  // Keep missing URLs out of search results.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])
  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <h1 className="not-found__title">This page skipped leg day.</h1>
        <p className="lead">We couldn’t find the page you were looking for. It may have moved when our website was updated.</p>
        <div className="prose__actions">
          <Button to="/" icon={ArrowLeft}>Back to home</Button>
          <Button href={contact.mainPhone.href} variant="ghost" icon={Phone}>{contact.mainPhone.display}</Button>
        </div>
      </div>
    </section>
  )
}
