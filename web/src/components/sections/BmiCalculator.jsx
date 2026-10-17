import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calculator } from 'lucide-react'
import { BMI_CATEGORIES, bmi, bmiCategory, bmr, idealBodyWeight, parseMetrics, round1 } from '../../lib/bodyMetrics'

// Position of a BMI value on a 15–40 scale, as a percentage.
const scalePos = (v) => `${Math.min(100, Math.max(0, ((v - 15) / 25) * 100))}%`

function Field({ id, label, error, children, hint }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && <small className="field__hint" id={`${id}-hint`}>{hint}</small>}
      {error && <small className="field__error" id={`${id}-error`}>{error}</small>}
    </div>
  )
}

export default function BmiCalculator() {
  const [form, setForm] = useState({ sex: 'male', age: '', unit: 'cm', cm: '', ft: '', in: '', weight: '' })
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const describe = (id, key) => (errors[key] ? `${id}-error` : undefined)

  const onSubmit = (e) => {
    e.preventDefault()
    const parsed = parseMetrics(form)
    if (parsed.errors) {
      setErrors(parsed.errors)
      setResult(null)
      return
    }
    setErrors({})
    const v = parsed.values
    const value = bmi(v.weightKg, v.heightCm)
    setResult({ bmi: value, category: bmiCategory(value), bmr: bmr(v), ibw: idealBodyWeight(v.heightCm, v.sex) })
  }

  return (
    <div className="calculator">
      <form className="calculator__form" onSubmit={onSubmit} noValidate aria-labelledby="calc-title">
        <h2 id="calc-title" className="calculator__title"><Calculator aria-hidden="true" />Check your numbers</h2>

        <fieldset className="field">
          <legend>Sex</legend>
          <div className="segmented">
            {['male', 'female'].map((s) => (
              <label key={s}>
                <input type="radio" name="sex" value={s} checked={form.sex === s} onChange={set('sex')} />
                <span>{s === 'male' ? 'Male' : 'Female'}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <Field id="calc-age" label="Age (years)" error={errors.age}>
          <input id="calc-age" type="number" inputMode="numeric" min="15" max="100" value={form.age} onChange={set('age')} aria-invalid={!!errors.age} aria-describedby={describe('calc-age', 'age')} />
        </Field>

        <fieldset className={`field ${errors.heightCm ? 'has-error' : ''}`}>
          <legend>Height</legend>
          <div className="segmented segmented--sm">
            {[['cm', 'Centimetres'], ['ft', 'Feet & inches']].map(([u, l]) => (
              <label key={u}>
                <input type="radio" name="unit" value={u} checked={form.unit === u} onChange={set('unit')} />
                <span>{l}</span>
              </label>
            ))}
          </div>
          {form.unit === 'cm' ? (
            <input aria-label="Height in centimetres" type="number" inputMode="decimal" value={form.cm} onChange={set('cm')} aria-invalid={!!errors.heightCm} aria-describedby={errors.heightCm ? 'calc-height-error' : undefined} placeholder="cm" />
          ) : (
            <div className="field__row">
              <input aria-label="Height, feet" type="number" inputMode="numeric" value={form.ft} onChange={set('ft')} aria-invalid={!!errors.heightCm} aria-describedby={errors.heightCm ? 'calc-height-error' : undefined} placeholder="ft" />
              <input aria-label="Height, inches" type="number" inputMode="numeric" value={form.in} onChange={set('in')} placeholder="in" />
            </div>
          )}
          {errors.heightCm && <small className="field__error" id="calc-height-error">{errors.heightCm}</small>}
        </fieldset>

        <Field id="calc-weight" label="Weight (kg)" error={errors.weightKg}>
          <input id="calc-weight" type="number" inputMode="decimal" value={form.weight} onChange={set('weight')} aria-invalid={!!errors.weightKg} aria-describedby={describe('calc-weight', 'weightKg')} />
        </Field>

        <button type="submit" className="btn btn--primary btn--block">
          <span>Calculate</span>
        </button>
      </form>

      <div className="calculator__result" aria-live="polite">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div key={result.bmi} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <p className="result__label">Your BMI</p>
              <p className="result__value">
                {round1(result.bmi)} <span className={`result__category result__category--${result.category.id}`}>{result.category.label}</span>
              </p>
              <div className="bmi-scale" aria-hidden="true">
                {BMI_CATEGORIES.map((c) => <span key={c.id} className={`bmi-scale__band bmi-scale__band--${c.id}`}>{c.label}</span>)}
                <motion.span className="bmi-scale__marker" initial={{ left: '0%' }} animate={{ left: scalePos(result.bmi) }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
              </div>
              <dl className="result__grid">
                <div>
                  <dt>BMR</dt>
                  <dd>{Math.round(result.bmr).toLocaleString('en-IN')} <small>kcal / day</small></dd>
                </div>
                <div>
                  <dt>Ideal body weight</dt>
                  <dd>{round1(result.ibw.min)} – {round1(result.ibw.max)} <small>kg</small></dd>
                </div>
              </dl>
              <p className="result__fineprint">
                BMR uses the Mifflin–St Jeor equation. The ideal weight range spans the Robinson, Miller, Devine and Hamwi formulas. Review these numbers with your doctor.
              </p>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="result__empty">
              <p>Enter your details to see your BMI, BMR and ideal body weight range.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
