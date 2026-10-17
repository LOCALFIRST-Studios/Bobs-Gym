import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import App from './App'
import { pages } from './data/routes'
import { branches, contact } from './data/site'
import ContactForm from './components/sections/ContactForm'

function LocationProbe() {
  return <span data-testid="path">{useLocation().pathname}</span>
}

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <LocationProbe />
    </MemoryRouter>,
  )

describe('routing', () => {
  it.each(Object.values(pages))('renders $path with a single h1 and its title', async (page) => {
    renderAt(page.path)
    await waitFor(() => expect(document.title).toBe(page.title))
    expect(document.querySelectorAll('h1')).toHaveLength(1)
  })

  it.each([
    ['/about.aspx', '/about'],
    ['/Massageandspa.aspx', '/massage-spa'],
    ['/BMICALCULETOR.ASPX', '/bmi-calculator'],
    ['/index.aspx', '/'],
  ])('redirects legacy URL %s to %s', async (from, to) => {
    renderAt(from)
    await waitFor(() => expect(screen.getByTestId('path')).toHaveTextContent(to))
  })

  it('shows the 404 page for unknown URLs', async () => {
    renderAt('/nope')
    expect(await screen.findByText('This page skipped leg day.')).toBeInTheDocument()
  })
})

describe('home page content', () => {
  it('links every branch phone number and the main contact details', () => {
    renderAt('/')
    for (const b of branches) {
      for (const p of b.phones) expect(document.querySelector(`a[href="${p.href}"]`)).not.toBeNull()
    }
    expect(document.querySelector(`a[href="${contact.email.href}"]`)).not.toBeNull()
    expect(document.querySelector(`a[href="${contact.facebook}"]`)).not.toBeNull()
  })

  it('preserves the original logo file and alt text', () => {
    renderAt('/')
    const logos = screen.getAllByAltText("Bob's Gym — good health keeps you ahead")
    expect(logos[0]).toHaveAttribute('src', '/images/lg.png')
  })

  it('switches timetable days with the keyboard', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const tablist = screen.getByRole('tablist', { name: 'Day of the week' })
    await user.click(within(tablist).getByRole('tab', { name: 'Sunday' }))
    expect(screen.getByText('Closed for the rest of the day')).toBeInTheDocument()
    await user.keyboard('{Home}')
    expect(within(tablist).getByRole('tab', { name: 'Monday' })).toHaveAttribute('aria-selected', 'true')
  })

  it('does not show testimonials that name another business', () => {
    renderAt('/')
    expect(screen.queryByText(/Gym n Tonic/)).toBeNull()
  })
})

describe('contact form', () => {
  it('reports success only after the endpoint responds OK', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, status: 200 })
    render(<MemoryRouter><ContactForm endpoint="/api/contact" /></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: /send message/i }))
    expect(screen.getByText('Please enter your name.')).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()

    await user.type(screen.getByLabelText(/your name/i), 'Asha')
    await user.type(screen.getByLabelText(/^email/i), 'asha@example.com')
    await user.type(screen.getByLabelText(/your message/i), 'Hello')
    await user.click(screen.getByRole('button', { name: /send message/i }))
    expect(await screen.findByText(/your message has been sent/i)).toBeInTheDocument()
    fetchMock.mockRestore()
  })

  it('shows an error, not success, when the endpoint fails', async () => {
    const user = userEvent.setup()
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false, status: 503 })
    render(<MemoryRouter><ContactForm endpoint="/api/contact" /></MemoryRouter>)
    await user.type(screen.getByLabelText(/your name/i), 'Asha')
    await user.type(screen.getByLabelText(/^email/i), 'asha@example.com')
    await user.type(screen.getByLabelText(/your message/i), 'Hello')
    await user.click(screen.getByRole('button', { name: /send message/i }))
    expect(await screen.findByText(/could not be sent/i)).toBeInTheDocument()
    expect(screen.queryByText(/has been sent/i)).toBeNull()
    fetchMock.mockRestore()
  })
})
