/**
 * Business facts for Bob's Gym, transcribed from https://bobsgym.org/ (audited
 * Oct 2026). Keep this file as the single source of truth for contact details.
 *
 * Spelling-only corrections versus the original site are marked "typo fix".
 * Nothing here should be added unless it can be verified with the client.
 */

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://bobsgym.org').replace(/\/$/, '')

export const brand = {
  name: "Bob's Gym",
  tagline: 'Good health keeps you ahead',
  city: 'Varanasi',
  intro:
    'Bobs Gym - The Biggest & Best Gym in Varanasi! World Class Equipment, Health Food Bar, Massage Centre, Spa, Aerobics, training bikes such as Sole Fitness SB700, Yoga and much more for you to explore! Are you a member yet? Get in touch and get the Bobs Gym Advantage today!',
  championBanner: 'Train with World Champion Wong Hong at Bob’s Gym!',
  hero: {
    heading: ['Find The Best', 'Classes For Your Health'],
    subheading: 'We offer guaranteed upfront pricing and savings up to 30%',
  },
  // Verified from the History and Founder's Message pages.
  founded: { year: 1995, date: '11th September 1995' },
  logo: { src: '/images/lg.png', width: 241, height: 70 },
}

export const contact = {
  mainPhone: { display: '+91 9696899989', href: 'tel:+919696899989' },
  email: { display: 'support@bobsgym.org', href: 'mailto:support@bobsgym.org' },
  facebook: 'https://www.facebook.com/thebobsgym?fref=ts',
}

const tel = (n) => `tel:${n.replace(/[^\d+]/g, '')}`
const mapsUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

const branch = (b) => ({
  ...b,
  phones: b.phones.map((p) => ({ display: p, href: tel(p) })),
  mapUrl: mapsUrl(b.mapQuery),
})

export const branches = [
  branch({
    id: 'sigra',
    name: 'Sigra',
    address: ['D-58 / 520-B, Sigra – Mehmoorganj Road', 'Varanasi - 221010'],
    mapQuery: "Bob's Gym, D-58/520-B, Sigra - Mehmoorganj Road, Varanasi 221010",
    phones: ['+91-9918401617', '+91-9696899989'],
    hours: null,
  }),
  branch({
    id: 'hathua-market',
    name: 'Hathua Market',
    // typo fix: original reads "Hathuamarkrt"
    address: ['3rd Floor, Hathua Market, Chetganj', 'Varanasi'],
    mapQuery: "Bob's Gym, Hathua Market, Chetganj, Varanasi",
    phones: ['+91-6392753019', '+91-9696899989'],
    hours: null,
  }),
  branch({
    id: 'lanka',
    name: 'Lanka',
    address: ['Swastik Plaza, 3rd Floor, Lanka', 'Varanasi'],
    mapQuery: "Bob's Gym, Swastik Plaza, Lanka, Varanasi",
    phones: ['+91-9918401640', '+91-9696899989'],
    hours: 'Open 24×7',
  }),
]

export const careersContact = {
  role: 'HR Manager – Bob’s Gym',
  phone: { display: '0542 222 3052', href: 'tel:+915422223052' },
  // Listed on the original Careers page with a .com domain (other pages use .org).
  email: { display: 'contact@bobsgym.com', href: 'mailto:contact@bobsgym.com' },
}

export const partner = {
  name: 'More Gains',
  url: 'https://moregains.in/',
  logo: { src: '/gymphotos/web-logo.png', width: 902, height: 125 },
  image: 'gymphotos/123.jpg',
  note: 'Powered by Bob’s Gym Ltd.',
}

export const patrons = [
  { name: 'Asian Body Building Federation', short: 'ABBF', url: 'http://abbf.asia/', logo: '/images/abbf (1).png' },
  { name: 'Indian Body Building Federation', short: 'IBBF', url: 'http://ibbf.in/', logo: '/images/ibbf_1.jpg' },
  { name: 'World Bodybuilding & Physique Sports Federation', short: 'WBPF', url: 'http://wbpsf.org/', logo: '/images/wbpf (1).png' },
]

// Headlines from the original footer. The originals had no article pages
// (links were javascript:void(0)), so they are shown as text only.
export const latestNews = [
  'Mr. Madhukar Talwalkar graces Bob’s Gym Varanasi',
  'History in the making!',
  'Be a Gym Gentleman',
  'Back to finish the job…',
]

/** Home-page hero slideshow — the original slider photographs. */
export const heroSlides = [
  { image: 'gymphotos/Screenshot_20161226-090711~2.jpg', alt: 'Strength training floor at Bob’s Gym with rows of benches and machines' },
  { image: 'gymphotos/Screenshot_20161226-090659~2.jpg', alt: 'Row of treadmills facing the windows at Bob’s Gym' },
  { image: 'gymphotos/Screenshot_20161226-090845~2.jpg', alt: 'Cable machines and resistance stations at Bob’s Gym' },
  { image: 'gymphotos/Screenshot_20161226-090752~2.jpg', alt: 'Weight training area with racks and machines at Bob’s Gym' },
  { image: 'gymphotos/Screenshot_20161226-090653~2.jpg', alt: 'Group class in the studio at Bob’s Gym' },
]

/** "Our Popular Classes" from the home page. Original "Read more" links were dead; each now points to its related page. */
export const popularClasses = [
  { title: 'Running Class', image: 'gymphotos/Screenshot_20161226-090659~2.jpg', thumb: 'gymphotos/12.jpg', to: '/equipment', alt: 'Treadmills at Bob’s Gym' },
  { title: 'Yoga Class', image: 'gymphotos/Screenshot_20161226-090653~2.jpg', thumb: 'gymphotos/6.jpg', to: '/yoga', alt: 'Members in a group class' },
  // typo fix: original reads "Body Bulding"
  { title: 'Body Building', image: 'gymphotos/Screenshot_20161226-090752~2.jpg', thumb: 'gymphotos/7.jpg', to: '/equipment', alt: 'Weight training area' },
  { title: 'Gym Fitness', image: 'gymphotos/Screenshot_20161226-090711~2.jpg', thumb: 'gymphotos/4.jpg', to: '/equipment', alt: 'Strength training floor' },
  { title: 'Aerobics', image: 'gymphotos/Screenshot_20161226-090641~2.jpg', thumb: 'gymphotos/3.jpg', to: '/aerobics', alt: 'Aerobics studio with exercise balls and mats' },
  // typo fix: original reads "Weight Loose"
  { title: 'Weight Loss', image: 'gymphotos/Screenshot_20161226-090845~2.jpg', thumb: 'gymphotos/5.jpg', to: '/membership', alt: 'Cardio and resistance machines' },
]

export const homeGallery = [
  'gymphotos/Screenshot_20161226-090802~2.jpg',
  'gymphotos/Screenshot_20161226-090711~2.jpg',
  'gymphotos/Screenshot_20161226-090752~2.jpg',
  'gymphotos/Screenshot_20161226-090653~2.jpg',
  'gymphotos/Screenshot_20161226-090659~2.jpg',
  'gymphotos/Screenshot_20161226-090845~2.jpg',
  'gymphotos/Screenshot_20161226-090757~2.jpg',
  'gymphotos/Screenshot_20161226-090808~2.jpg',
  'gymphotos/Screenshot_20161226-090716~2.jpg',
]

export const testimonials = [
  {
    quote:
      'I really did not know what to expect as I had never had personal training before and hardly exercised before last year. However, what happened in the 3 months far surpassed any expectations I had and I can only describe the experience as life changing.',
    name: 'Vinod Kumar',
    role: 'Male Body Trainer',
  },
  {
    quote: 'A small but well equipped gym with a big heart that is fueled by passion.',
    name: 'Renu Singh',
    role: 'Female Body Trainer',
  },
  {
    quote: 'This place is a secret hidden gem that I am so lucky to have discovered!',
    name: 'Preetam Sharma',
    role: 'Male Body Trainer',
  },
  {
    quote:
      'I used to go to one of the popular gym brands in Singapore and took a personal training program with them. Frankly speaking, I didn’t see much improvement in terms of weight loss nor physical fitness even though I was dieting too for over a year. I felt it was a waste of money.',
    name: 'Vivek Singh',
    role: 'Male Body Trainer',
  },
  {
    quote:
      'I look forward to come to my session every week. I also can feel that I am stronger than before, flatter tummy and my fiancee called me “an athlete” now. hahaha… I don’t think I am at that level yet but I hope eventually I can reach that level of fitness.',
    name: 'Anjali Sinha',
    role: 'Female Body Trainer',
  },
  // Held back pending client confirmation: these two quotes on the original
  // site name a different business ("Gym n Tonic" / "GnT").
  {
    hidden: true,
    quote:
      'Gym n Tonic is a great small gym with a welcoming, warm atmosphere and helpful and encouraging trainers. It is a much more comfortable environment to be in than a lot of the bigger gyms, and a great place to be whether you are just starting out, or are well on your way with your exercise journey. I would strongly recommend Gym n Tonic to anyone.',
    name: 'Harshit Patel',
    role: 'Male Body Trainer',
  },
  {
    hidden: true,
    quote:
      'GnT staff are always ready to assist when needed or when I have any questions regarding fitness and nutrition. At the same time, they allow me all the privacy to complete my workouts with no interruptions or intrusions.',
    name: 'Neetu Rai',
    role: 'Female Body Trainer',
  },
]

export const visibleTestimonials = testimonials.filter((t) => !t.hidden)
