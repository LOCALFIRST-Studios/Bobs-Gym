import { describe, expect, it } from 'vitest'
import { bmi, bmiCategory, bmr, idealBodyWeight, parseMetrics, round1 } from './bodyMetrics'

describe('body metrics', () => {
  it('computes BMI from kg and cm', () => {
    expect(round1(bmi(70, 175))).toBe(22.9)
  })

  it('maps BMI values to WHO categories at the boundaries', () => {
    expect(bmiCategory(18.4).id).toBe('under')
    expect(bmiCategory(18.5).id).toBe('healthy')
    expect(bmiCategory(24.9).id).toBe('healthy')
    expect(bmiCategory(25).id).toBe('over')
    expect(bmiCategory(30).id).toBe('obese')
  })

  it('uses the Mifflin–St Jeor equation for BMR', () => {
    expect(bmr({ weightKg: 70, heightCm: 175, age: 30, sex: 'male' })).toBeCloseTo(1648.75)
    expect(bmr({ weightKg: 60, heightCm: 165, age: 30, sex: 'female' })).toBeCloseTo(1320.25)
  })

  it('returns an ideal body weight range spanning the four formulas', () => {
    const { min, max, results } = idealBodyWeight(175, 'male')
    expect(results.map((r) => r.name)).toEqual(['Robinson', 'Miller', 'Devine', 'Hamwi'])
    expect(min).toBeLessThan(max)
    expect(round1(results.find((r) => r.name === 'Devine').kg)).toBe(70.5)
  })
})

describe('parseMetrics', () => {
  const base = { sex: 'male', age: '30', unit: 'cm', cm: '175', ft: '', in: '', weight: '70' }

  it('accepts valid metric input', () => {
    expect(parseMetrics(base).values).toMatchObject({ age: 30, heightCm: 175, weightKg: 70 })
  })

  it('converts feet and inches', () => {
    const { values } = parseMetrics({ ...base, unit: 'ft', cm: '', ft: '5', in: '9' })
    expect(values.heightCm).toBeCloseTo(175.26)
  })

  it('reports every missing or out-of-range field', () => {
    const { errors } = parseMetrics({ ...base, age: '', cm: '20', weight: '900' })
    expect(Object.keys(errors).sort()).toEqual(['age', 'heightCm', 'weightKg'])
  })
})
