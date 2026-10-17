/**
 * Class timetable from the home page of https://bobsgym.org/.
 * The original lists "12am - 1am" for the midday slot on Mon, Wed and Fri while
 * Tue, Thu and Sat list "12pm - 1pm" for the same slot; it is shown here as
 * 12pm – 1pm (typo fix — confirm with the client).
 */

const KICKBOXING_AM = { name: 'Kick Boxing / Martial Arts', time: '9am – 10am', kind: 'combat' }
const KICKBOXING_PM = { name: 'Kick Boxing / Martial Arts', time: '6pm – 7pm', kind: 'combat' }

const aerobicsDay = (name, kind = 'cardio') => [
  { name, time: '8:15am – 9am', kind },
  KICKBOXING_AM,
  { name, time: '10:30am – 11:30am', kind },
  { name, time: '12pm – 1pm', kind },
  { name, time: '4:30pm – 5:30pm', kind },
  KICKBOXING_PM,
]

export const timetable = [
  { day: 'Monday', short: 'Mon', classes: aerobicsDay('Dance Aerobics') },
  {
    day: 'Tuesday',
    short: 'Tue',
    classes: [{ name: 'Yoga Classes', time: '7am – 8am', kind: 'mind' }, ...aerobicsDay('Weight Aerobics', 'strength')],
  },
  { day: 'Wednesday', short: 'Wed', classes: aerobicsDay('Zumba / Bhangra Aerobics') },
  {
    day: 'Thursday',
    short: 'Thu',
    classes: (() => {
      const [first, ...rest] = aerobicsDay('Step Aerobics')
      return [first, { name: 'Yoga Classes', time: '8:30am – 10:30am', kind: 'mind' }, ...rest]
    })(),
  },
  { day: 'Friday', short: 'Fri', classes: aerobicsDay('Power Yoga / Ball Aerobics / Tai Chi', 'mind') },
  { day: 'Saturday', short: 'Sat', classes: aerobicsDay('Kettle Bell', 'strength') },
  {
    day: 'Sunday',
    short: 'Sun',
    classes: [{ name: 'Yoga Classes', time: '8:30am – 9:30am', kind: 'mind' }],
    note: 'Closed for the rest of the day',
  },
]

export const KIND_LABELS = {
  cardio: 'Cardio',
  strength: 'Strength',
  mind: 'Mind & body',
  combat: 'Combat',
}

/** Centre timings from the Yoga and Aerobics pages (kept verbatim, 24-hour format). */
export const yogaCentreTimings = [{ time: '0600 – 0800', duration: '2 hours' }]
export const aerobicsCentreTimings = [
  { time: '0800 – 1400', duration: '6 hours' },
  { time: '1400 – 1700', duration: '3 hours' },
]
