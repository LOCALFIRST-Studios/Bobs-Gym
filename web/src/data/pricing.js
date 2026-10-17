/**
 * Prices in Indian Rupees, transcribed verbatim from bobsgym.org
 * (home page "Our Packages Price", the Packages page, and the price tables
 * that were embedded as images on the Membership page).
 */

const DURATIONS = ['1 day', '1 week', '1 month', '3 months', '6 months', '12 months']
const rows = (values) => DURATIONS.map((duration, i) => ({ duration, values: values[i] }))

export const membershipPlans = [
  {
    id: 'gym',
    title: 'Gym',
    audience: 'individual',
    image: 'images/photos/pricing-1.jpg',
    columns: ['Male', 'Female'],
    rows: rows([[500, 400], [1500, 1300], [5000, 4000], [8500, 7500], [12000, 11000], [15000, 14000]]),
    renewal: 'Male 8,500 · Female 7,500',
  },
  {
    id: 'gym-studio',
    title: 'Gym + Fitness Studio',
    audience: 'individual',
    image: 'images/photos/pricing-3.jpg',
    columns: ['Male', 'Female'],
    rows: rows([[600, 500], [1700, 1600], [6000, 5000], [12000, 11000], [17000, 16000], [22000, 21000]]),
    renewal: 'Separate packages applicable for renewal',
    featured: true,
  },
  {
    id: 'couples-gym',
    title: 'Gym',
    audience: 'couples',
    image: 'images/photos/pricing-2.jpg',
    columns: ['Couple'],
    rows: rows([[700], [2500], [7000], [14000], [20000], [25000]]),
    renewal: null,
  },
  {
    id: 'couples-studio',
    title: 'Gym + Fitness Studio',
    audience: 'couples',
    image: 'images/photos/pricing-4.jpg',
    columns: ['Couple'],
    rows: rows([[900], [2800], [8500], [18000], [26000], [32000]]),
    renewal: null,
    featured: true,
  },
]

export const membershipNotes = [
  '15% tax applicable for all the rates.',
  '15 days diet consultation free with 6 months and yearly packages.',
]

/** Personal training packages (Packages page). Values: [Single, Couple, Group of 4]. */
export const trainerCategories = [
  { category: 'Premium', trainers: ['Anup.J', 'Santosh.R'] },
  { category: 'Golden', trainers: ['Prabhu.D', 'Manish.M', 'Yasir.A'] },
  { category: 'Silver', trainers: ['Shiv.Y', 'Pratiksha', 'Kavita'] },
]

export const personalTraining = {
  columns: ['Single', 'Couple', 'Group of 4'],
  durations: [
    {
      id: '1m',
      label: '1 Month',
      prices: {
        'Anup.J': ['7,200', '14,000', '28,000'],
        'Santosh.R': ['4,620', '8,500', '18,000'],
        'Prabhu.D': ['4,620', '8,500', '18,000'],
        'Manish.M': ['4,620', '8,500', '18,000'],
        'Yasir.A': ['3,850', '6,500', '15,000'],
        'Shiv.Y': ['3,850', '6,500', '15,000'],
        Pratiksha: ['3,850', '6,500', '15,000'],
        Kavita: ['3,850', '6,500', '15,000'],
      },
    },
    {
      id: '3m',
      label: '3 Months',
      prices: {
        'Anup.J': ['17,150', '33,000', '68,000'],
        'Santosh.R': ['11,112', '21,000', '44,000'],
        'Prabhu.D': ['11,112', '21,000', '44,000'],
        'Manish.M': ['11,112', '21,000', '44,000'],
        'Yasir.A': ['9,900', '18,000', '38,000'],
        'Shiv.Y': ['9,900', '18,000', '38,000'],
        Pratiksha: ['9,900', '18,000', '38,000'],
        Kavita: ['9,900', '18,000', '38,000'],
      },
    },
    {
      id: '6m',
      label: '6 Months',
      prices: {
        'Anup.J': ['31,200', '60,000', '1,24,000'],
        'Santosh.R': ['21,560', '42,000', '85,000'],
        'Prabhu.D': ['21,560', '42,000', '85,000'],
        'Manish.M': ['21,560', '42,000', '85,000'],
        'Yasir.A': ['20,460', '38,000', '80,000'],
        'Shiv.Y': ['20,460', '38,000', '80,000'],
        Pratiksha: ['20,460', '38,000', '80,000'],
        Kavita: ['20,460', '38,000', '80,000'],
      },
    },
    {
      id: '12m',
      label: '1 Year',
      prices: {
        'Anup.J': ['44,500', '88,000', '1,77,000'],
        'Santosh.R': ['30,000', '58,000', '1,18,000'],
        'Prabhu.D': ['30,000', '58,000', '1,18,000'],
        'Manish.M': ['30,000', '58,000', '1,18,000'],
        'Yasir.A': ['28,000', '55,000', '1,10,000'],
        'Shiv.Y': ['28,000', '55,000', '1,10,000'],
        Pratiksha: ['28,000', '55,000', '1,10,000'],
        Kavita: ['28,000', '55,000', '1,10,000'],
      },
    },
  ],
}

/** Activity packages (Packages page). Prices kept exactly as published, including "x/y" pairs. */
export const activityPackages = [
  {
    id: 'yoga',
    title: 'Yoga Packages',
    columns: ['Duration', 'Price'],
    rows: [['1 Month', '1,200'], ['3 Month', '3,200'], ['6 Month', '6,000'], ['12 Month', '10,000']],
    notes: [],
  },
  {
    id: 'aerobics',
    title: 'Aerobics Packages',
    columns: ['Duration', 'Price'],
    rows: [['1 Month', '1,999'], ['3 Month', '4,999'], ['6 Month', '6,999'], ['12 Month', '10,999']],
    notes: ['Taxes extra', '6 days a week', 'For DALIMSS students 20% discount'],
  },
  {
    id: 'karate',
    title: 'Karate / Taekwondo Package',
    columns: ['Duration', 'Price'],
    rows: [['1 Month', '1,999'], ['3 Month', '5,999'], ['6 Month', '8,999'], ['12 Month', '11,999']],
    notes: ['Taxes extra', '5 days a week', 'For DALIMSS students 20% discount'],
  },
  {
    id: 'kickboxing',
    title: 'Kick Boxing / Boxing Package',
    columns: ['Duration', 'Price'],
    rows: [['1 Month', '1,999'], ['3 Month', '4,999'], ['6 Month', '8,999'], ['12 Month', '11,999']],
    notes: [
      'Taxes extra',
      '5 days a week',
      'For students and females 10% discount on 3 months packages',
      'For DALIMSS students 20% discount',
    ],
  },
  {
    id: 'mma',
    title: 'Mixed Martial Art',
    columns: ['Duration', 'Price'],
    rows: [['1 Month', '2,999'], ['3 Month', '6,999'], ['6 Month', '9,999'], ['12 Month', '14,999']],
    notes: [
      'Taxes extra',
      '6 days a week',
      'For students and females 10% discount on 3 months and above packages',
      'For DALIMSS students 20% discount',
    ],
  },
  {
    id: 'diet',
    title: 'Diet Consultation',
    columns: ['Duration', 'Price'],
    rows: [['1 Month', '1,999'], ['3 Month', '3,999 / 3,000'], ['6 Month', '5,999 / 5,000'], ['12 Month', '9,999 / 8,000']],
    notes: ['15% tax applicable for all the rates'],
  },
]

export const massagePackages = [
  {
    id: 'olive-oil',
    title: 'Olive Oil Massage',
    columns: ['Counts', 'Duration', 'Price'],
    rows: [
      ['10', '1 Month', '2,000'],
      ['15', '3 Month', '2,800'],
      ['20', '5 Month', '3,800'],
      ['50+2', '8 Month', '5,700'],
      ['100+3', '1 Year', '10,000'],
      ['100+20', '18 Months', '18,000'],
    ],
  },
  {
    id: 'fat-loss-oil',
    title: 'Fat Loss Oil Massage',
    columns: ['Counts', 'Duration', 'Price'],
    rows: [
      ['7', '1 Month', '2,500'],
      ['10', '3 Month', '3,200'],
      ['15', '5 Month', '4,700'],
      ['20', '6 Month', '6,500'],
    ],
  },
]

/** Membership page — transcribed from the price image images/photos/p12.jpg. */
export const weightLossProgram = {
  columns: ['Weight loss', 'Duration', 'Price', 'Yearly', 'Rate'],
  rows: [
    ['5 kgs', '1', '5,300', '1+11', '18,000'],
    ['7 kgs', '2', '7,500', '2+10', '18,900'],
    ['10 kgs', '3', '9,500', '3+9', '21,400'],
    ['15 kgs', '4', '11,500', '4+8', '22,500'],
    ['20 kgs', '6', '17,200', '6+6', '23,500'],
    ['25 kgs', '7', '17,200', '7+5', '24,500'],
    ['30 kgs', '8', '20,000', '8+4', '25,900'],
  ],
}

/** Membership page — transcribed from the price image images/photos/Personal-t.jpg. */
export const personalTrainerPrograms = {
  columns: ['Program', '1 month', '3 months', '6 months', '1 year'],
  rows: [
    ['Golden Pep', '6,000', '14,000', '26,000', '37,000'],
    ['Silver Pep', '5,000', '12,000', '22,000', '35,000'],
  ],
}

export const formatINR = (n) => (typeof n === 'number' ? n.toLocaleString('en-IN') : n)
