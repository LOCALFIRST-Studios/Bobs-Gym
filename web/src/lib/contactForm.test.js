import { describe, expect, it, vi } from 'vitest'
import { buildMailto, postContact, validateContact } from './contactForm'

const valid = { name: 'Asha', email: 'asha@example.com', subject: '', message: 'Membership details please' }

describe('validateContact', () => {
  it('accepts a complete message with an optional subject', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('flags missing and malformed fields', () => {
    const errors = validateContact({ name: ' ', email: 'not-an-email', subject: '', message: '' })
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name'])
  })
})

describe('buildMailto', () => {
  it('addresses the gym and encodes spaces as %20, not +', () => {
    const href = buildMailto(valid)
    expect(href.startsWith('mailto:support@bobsgym.org?')).toBe(true)
    expect(href).toContain('subject=Website%20enquiry%20from%20Asha')
    expect(href).not.toContain('+')
  })
})

describe('postContact', () => {
  it('resolves only for a successful response', async () => {
    const ok = vi.fn().mockResolvedValue({ ok: true, status: 200 })
    await expect(postContact(valid, '/api/contact', ok)).resolves.toBeUndefined()
    expect(JSON.parse(ok.mock.calls[0][1].body)).toEqual(valid)
  })

  it('throws for an error response so no false success is shown', async () => {
    const bad = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    await expect(postContact(valid, '/api/contact', bad)).rejects.toThrow('500')
  })
})
