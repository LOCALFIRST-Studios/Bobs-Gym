/**
 * Every page of the original bobsgym.org, with its legacy ASP.NET URL so old
 * links and bookmarks redirect to the new route.
 */
export const pages = {
  home: { path: '/', legacy: 'index.aspx', label: 'Home', title: "Bob's Gym Varanasi — Good health keeps you ahead", description: "Bob's Gym — the biggest & best gym in Varanasi. World class equipment, health food bar, massage centre, spa, aerobics and yoga at Sigra, Hathua Market and Lanka (24×7)." },
  about: { path: '/about', legacy: 'about.aspx', label: 'About Us', title: "About Us | Bob's Gym Varanasi", description: "Bob's Gym — the biggest & best gym in Varanasi, with world class equipment, a health food bar, massage centre, spa, aerobics and yoga." },
  history: { path: '/history', legacy: 'history.aspx', label: 'History', title: "History | Bob's Gym Varanasi", description: "Opened on 11th September 1995 as ‘Fitness Lifestyle’, Bob’s Gym has been an iconic landmark in the history of physique sports in Varanasi." },
  founder: { path: '/founders-message', legacy: 'foundersmessage.aspx', label: "Founder's Message", title: "Founder's Message | Bob's Gym Varanasi", description: "From the founder’s desk: Baba Madhok on the dream that became Bob’s Gym Varanasi." },
  mantra: { path: '/bobs-mantra', legacy: 'bobsmantra.aspx', label: "Bob's Mantra", title: "Bob's Mantra | Bob's Gym Varanasi", description: "Your body is a temple — but when is the last time you worshipped it? Bob’s Gym’s objective is world-class gym facilities for Varanasi." },
  equipment: { path: '/equipment', legacy: 'equipments.aspx', label: 'Equipment', title: "Equipment | Bob's Gym Varanasi", description: "Treadmills, recumbent bikes, cross and arc trainers, Olympic benches, Smith machines, free weights and pro series dumbbells from 1 kg to 60 kg." },
  aerobics: { path: '/aerobics', legacy: 'aerobics.aspx', label: 'Aerobics', title: "Aerobics Centre | Bob's Gym Varanasi", description: "A dedicated 2500 square feet Aerobics Centre manned by the best instructors and trained professionals." },
  yoga: { path: '/yoga', legacy: 'yoga.aspx', label: 'Yoga', title: "Yoga Centre | Bob's Gym Varanasi", description: "The Bob’s Gym Yoga Centre — experienced instructors and a centre equipped for a perfect mind and body experience." },
  healthBar: { path: '/health-bar', legacy: 'healthbar.aspx', label: 'Health Bar', title: "Health Bar | Bob's Gym Varanasi", description: "Bob’s Health Bar, our in-house café: salads, sandwiches, healthy snacks, protein drinks and fruit juices for vegetarian and non-vegetarian members." },
  spa: { path: '/massage-spa', legacy: 'massageandspa.aspx', label: 'Massage & Spa', title: "Massage & Spa | Bob's Gym Varanasi", description: "Thai, balm, oil, dry and Urdh Vardham massages, plus a spa with steam bath and sauna at Bob’s Gym." },
  bmi: { path: '/bmi-calculator', legacy: 'bmicalculetor.aspx', label: 'BMI Calculator', title: "BMI Calculator | Bob's Gym Varanasi", description: "Calculate your Body Mass Index (BMI), Basal Metabolic Rate (BMR) and Ideal Body Weight (IBW)." },
  membership: { path: '/membership', legacy: 'member.aspx', label: "Member @ Bob's", title: "Membership | Bob's Gym Varanasi", description: "Specialised weight loss programs and personal trainer programs at Bob’s Gym Varanasi." },
  careers: { path: '/careers', legacy: 'carrier.aspx', label: "Careers @ Bob's", title: "Careers | Bob's Gym Varanasi", description: "Think you’ve got what it takes to be a part of Bob’s Team? Get in touch with the HR Manager." },
  gallery: { path: '/gallery', legacy: 'gallery.aspx', label: 'Gallery', title: "Gallery | Bob's Gym Varanasi", description: "Photographs of the Bob’s Gym floor, equipment and studios in Varanasi." },
  moments: { path: '/moments-of-glory', legacy: 'momentsofgallery.aspx', label: 'Moments of Glory', title: "Moments of Glory | Bob's Gym Varanasi", description: "Championships, celebrations and memorable moments from Bob’s Gym’s history." },
  packages: { path: '/packages', legacy: 'packages.aspx', label: 'Packages', title: "Packages & Prices | Bob's Gym Varanasi", description: "Personal training, yoga, aerobics, massage, martial arts and diet consultation packages at Bob’s Gym." },
  contact: { path: '/contact', legacy: 'contact.aspx', label: 'Contact', title: "Contact | Bob's Gym Varanasi", description: "Contact Bob’s Gym at Sigra, Hathua Market and Lanka (24×7), Varanasi. Call +91 9696899989 or email support@bobsgym.org." },
}

export const navigation = [
  { label: 'Home', to: pages.home.path },
  { label: 'About', items: [pages.about, pages.history, pages.founder, pages.mantra] },
  { label: 'Facilities', items: [pages.equipment, pages.aerobics, pages.yoga, pages.healthBar, pages.spa, pages.bmi] },
  { label: 'Join Us', items: [pages.membership, pages.careers] },
  { label: 'Photos', items: [pages.gallery, pages.moments] },
  { label: 'Packages', to: pages.packages.path },
  { label: 'Contact', to: pages.contact.path },
]

/** Legacy URL → new path, e.g. "/about.aspx" → "/about". Matched case-insensitively. */
export const legacyRedirects = Object.fromEntries(
  Object.values(pages).map((p) => [`/${p.legacy.toLowerCase()}`, p.path]),
)
