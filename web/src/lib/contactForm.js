/**
 * Contact form handling.
 *
 * The original site posted the form to its ASP.NET backend (contact.aspx),
 * which is not part of this frontend. Two honest delivery modes are supported:
 *
 *  - VITE_CONTACT_ENDPOINT set: the message is POSTed as JSON to that URL
 *    (e.g. a form service or the gym's own API). Success is reported only for
 *    a 2xx response.
 *  - Not set: the visitor's email app opens with the message pre-filled and
 *    addressed to the gym. No success is claimed, since sending is up to them.
 */
import { contact } from '../data/site'

export const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || ''

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact({ name, email, message }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Please enter your name.'
  if (!email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(email.trim())) errors.email = 'Please enter a valid email address, like name@example.com.'
  if (!message.trim()) errors.message = 'Please enter your message.'
  return errors
}

export function buildMailto({ name, email, subject, message }) {
  const params = new URLSearchParams({
    subject: subject.trim() || `Website enquiry from ${name.trim()}`,
    body: `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`,
  })
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `${contact.email.href}?${params.toString().replace(/\+/g, '%20')}`
}

/** Sends to the configured endpoint. Resolves on a 2xx response, throws otherwise. */
export async function postContact(values, endpoint = CONTACT_ENDPOINT, fetchImpl = fetch) {
  const res = await fetchImpl(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(values),
  })
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
}
