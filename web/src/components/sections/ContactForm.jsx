import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { CONTACT_ENDPOINT, buildMailto, postContact, validateContact } from '../../lib/contactForm'
import { contact } from '../../data/site'

const EMPTY = { name: '', email: '', subject: '', message: '' }

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', required: false },
]

export default function ContactForm({ endpoint = CONTACT_ENDPOINT }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  // idle | sending | sent | error | mail-app
  const [status, setStatus] = useState('idle')

  const update = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }

    if (!endpoint) {
      window.location.href = buildMailto(values)
      setStatus('mail-app')
      return
    }

    setStatus('sending')
    try {
      await postContact(values, endpoint)
      setStatus('sent')
      setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: update,
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  })

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate aria-labelledby="contact-form-title">
      <h2 id="contact-form-title" className="contact-form__title">Send us a message</h2>
      <p className="contact-form__intro">Fields marked * are required.</p>

      <div className="contact-form__grid">
        {FIELDS.map((f) => (
          <div key={f.name} className={`field ${errors[f.name] ? 'has-error' : ''} ${f.name === 'subject' ? 'field--wide' : ''}`}>
            <label htmlFor={`contact-${f.name}`}>{f.label}{f.required && ' *'}</label>
            <input type={f.type} autoComplete={f.autoComplete} required={f.required} {...fieldProps(f.name)} />
            {errors[f.name] && <small className="field__error" id={`contact-${f.name}-error`}>{errors[f.name]}</small>}
          </div>
        ))}
        <div className={`field field--wide ${errors.message ? 'has-error' : ''}`}>
          <label htmlFor="contact-message">Your message *</label>
          <textarea rows={6} required {...fieldProps('message')} />
          {errors.message && <small className="field__error" id="contact-message-error">{errors.message}</small>}
        </div>
      </div>

      <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'sending'}>
        {status === 'sending' ? <Loader2 aria-hidden="true" size={18} className="spin" /> : endpoint ? <Send aria-hidden="true" size={18} /> : <Mail aria-hidden="true" size={18} />}
        <span>{status === 'sending' ? 'Sending…' : endpoint ? 'Send message' : 'Send via email'}</span>
      </button>
      {!endpoint && status === 'idle' && (
        <p className="contact-form__hint">This opens your email app with your message addressed to {contact.email.display}.</p>
      )}

      <div role="status" aria-live="polite" className="contact-form__status">
        {status === 'sent' && (
          <p className="alert alert--success"><CheckCircle2 aria-hidden="true" size={18} />Thank you — your message has been sent. We’ll be in touch soon.</p>
        )}
        {status === 'error' && (
          <p className="alert alert--error">
            <AlertCircle aria-hidden="true" size={18} />
            <span>Sorry, your message could not be sent. Please call <a href={contact.mainPhone.href}>{contact.mainPhone.display}</a> or email <a href={contact.email.href}>{contact.email.display}</a>.</span>
          </p>
        )}
        {status === 'mail-app' && (
          <p className="alert">
            <Mail aria-hidden="true" size={18} />
            <span>Your email app should now be open with your message ready to send. If nothing opened, email us at <a href={contact.email.href}>{contact.email.display}</a>.</span>
          </p>
        )}
      </div>
    </form>
  )
}
