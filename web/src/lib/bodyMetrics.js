/**
 * Standard body-metric formulas for the BMI Calculator page. The original
 * page embedded a third-party Flash widget that no longer runs in browsers.
 */

/** Body Mass Index: weight (kg) / height (m)². */
export function bmi(weightKg, heightCm) {
  const m = heightCm / 100
  return weightKg / (m * m)
}

/** WHO adult BMI categories. */
export const BMI_CATEGORIES = [
  { id: 'under', label: 'Underweight', max: 18.5 },
  { id: 'healthy', label: 'Healthy weight', max: 25 },
  { id: 'over', label: 'Overweight', max: 30 },
  { id: 'obese', label: 'Obese', max: Infinity },
]

export const bmiCategory = (value) => BMI_CATEGORIES.find((c) => value < c.max)

/** Basal Metabolic Rate (kcal/day), Mifflin–St Jeor equation. */
export function bmr({ weightKg, heightCm, age, sex }) {
  return 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === 'male' ? 5 : -161)
}

/**
 * Ideal Body Weight range (kg) from the four common formulas — Robinson,
 * Miller, Devine and Hamwi. Each adds a fixed weight per inch over 5 ft.
 */
const IBW_FORMULAS = {
  Robinson: { male: [52, 1.9], female: [49, 1.7] },
  Miller: { male: [56.2, 1.41], female: [53.1, 1.36] },
  Devine: { male: [50, 2.3], female: [45.5, 2.3] },
  Hamwi: { male: [48, 2.7], female: [45.5, 2.2] },
}

export function idealBodyWeight(heightCm, sex) {
  const inchesOver5ft = Math.max(0, heightCm / 2.54 - 60)
  const results = Object.entries(IBW_FORMULAS).map(([name, f]) => {
    const [base, perInch] = f[sex]
    return { name, kg: base + perInch * inchesOver5ft }
  })
  const values = results.map((r) => r.kg)
  return { min: Math.min(...values), max: Math.max(...values), results }
}

export const round1 = (n) => Math.round(n * 10) / 10

const LIMITS = {
  age: [15, 100, 'Enter an age between 15 and 100 years.'],
  heightCm: [100, 250, 'Enter a height between 100 and 250 cm.'],
  weightKg: [20, 300, 'Enter a weight between 20 and 300 kg.'],
}

/** Validates the raw form values; returns { values } or { errors }. */
export function parseMetrics(form) {
  const heightCm =
    form.unit === 'cm' ? Number(form.cm) : (Number(form.ft) * 12 + Number(form.in || 0)) * 2.54
  const values = { sex: form.sex, age: Number(form.age), weightKg: Number(form.weight), heightCm }
  const errors = {}
  for (const [key, [min, max, message]] of Object.entries(LIMITS)) {
    const v = values[key]
    if (!Number.isFinite(v) || v < min || v > max) errors[key] = message
  }
  if (form.unit === 'cm' ? form.cm === '' : form.ft === '') errors.heightCm = LIMITS.heightCm[2]
  if (form.age === '') errors.age = LIMITS.age[2]
  if (form.weight === '') errors.weightKg = LIMITS.weightKg[2]
  return Object.keys(errors).length ? { errors } : { values }
}
