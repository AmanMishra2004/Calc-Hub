import { useState } from 'react'

/**
 * GstCalculator.jsx — Calculates GST for a given amount.
 *
 * Modes:
 *  - "add"    → GST is added ON TOP of the entered amount (exclusive GST)
 *  - "remove" → GST is already INCLUDED in the entered amount (inclusive GST)
 *
 * Formula:
 *  Add mode:    GST Amount = (amount × rate) / 100
 *               Final Amount = amount + GST Amount
 *
 *  Remove mode: Original (pre-tax) = (amount × 100) / (100 + rate)
 *               GST Amount = amount − Original
 */

// Preset GST slab buttons
const GST_PRESETS = [5, 12, 18, 28]

// Helper to format currency in Indian Rupee style
const formatINR = (num) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)

function GstCalculator() {
  // ─── State ─────────────────────────────────────────────────────────────────
  const [amount, setAmount]         = useState('')          // raw input
  const [gstRate, setGstRate]       = useState(18)          // selected rate (number)
  const [customRate, setCustomRate] = useState('')          // custom rate input string
  const [isCustom, setIsCustom]     = useState(false)       // using custom rate?
  const [mode, setMode]             = useState('add')       // 'add' | 'remove'
  const [result, setResult]         = useState(null)        // calculation result object
  const [errors, setErrors]         = useState({})          // validation errors

  // ─── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    const parsedAmount = parseFloat(amount)
    if (!amount.trim()) {
      errs.amount = 'Please enter an amount.'
    } else if (isNaN(parsedAmount) || parsedAmount <= 0) {
      errs.amount = 'Amount must be a positive number.'
    }

    const rate = isCustom ? parseFloat(customRate) : gstRate
    if (isCustom) {
      if (!customRate.trim()) {
        errs.rate = 'Please enter a GST rate.'
      } else if (isNaN(rate) || rate <= 0 || rate >= 100) {
        errs.rate = 'Rate must be between 0 and 100.'
      }
    }

    return errs
  }

  // ─── Calculate ─────────────────────────────────────────────────────────────
  const handleCalculate = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setResult(null)
      return
    }
    setErrors({})

    const parsedAmount = parseFloat(amount)
    const rate = isCustom ? parseFloat(customRate) : gstRate

    let original, gstAmount, finalAmount

    if (mode === 'add') {
      // Exclusive GST — add on top
      original    = parsedAmount
      gstAmount   = (parsedAmount * rate) / 100
      finalAmount = parsedAmount + gstAmount
    } else {
      // Inclusive GST — extract from total
      original    = (parsedAmount * 100) / (100 + rate)
      gstAmount   = parsedAmount - original
      finalAmount = parsedAmount
    }

    setResult({ original, gstAmount, finalAmount, rate, mode })
  }

  // ─── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setAmount('')
    setGstRate(18)
    setCustomRate('')
    setIsCustom(false)
    setMode('add')
    setResult(null)
    setErrors({})
  }

  // ─── Select preset GST rate ────────────────────────────────────────────────
  const handlePreset = (rate) => {
    setGstRate(rate)
    setIsCustom(false)
    setCustomRate('')
    setErrors((prev) => ({ ...prev, rate: undefined }))
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="card p-6 sm:p-8">
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md flex-shrink-0">
          <span className="text-white text-lg font-bold">%</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">GST Calculator</h2>
          <p className="text-slate-400 text-sm">Add or remove Goods & Services Tax</p>
        </div>
      </div>

      {/* ── Mode Toggle ── */}
      <div className="mb-5">
        <label className="form-label">Calculation Mode</label>
        <div className="flex rounded-xl overflow-hidden border border-slate-200">
          <button
            id="gst-mode-add"
            onClick={() => { setMode('add'); setResult(null) }}
            className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-200 ${
              mode === 'add'
                ? 'bg-primary-600 text-white shadow-inner'
                : 'bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            ➕ Add GST
          </button>
          <button
            id="gst-mode-remove"
            onClick={() => { setMode('remove'); setResult(null) }}
            className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-200 ${
              mode === 'remove'
                ? 'bg-primary-600 text-white shadow-inner'
                : 'bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            ➖ Remove GST
          </button>
        </div>
        <p className="text-slate-400 text-xs mt-1.5">
          {mode === 'add'
            ? 'GST will be added on top of the entered amount.'
            : 'GST is already included — we will extract it.'}
        </p>
      </div>

      {/* ── Amount Input ── */}
      <div className="mb-5">
        <label htmlFor="gst-amount" className="form-label">
          {mode === 'add' ? 'Base Amount (₹)' : 'Total Amount incl. GST (₹)'}
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold select-none">₹</span>
          <input
            id="gst-amount"
            type="number"
            min="0"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setErrors((prev) => ({ ...prev, amount: undefined })) }}
            placeholder="e.g. 1000"
            className={`form-input pl-9 ${errors.amount ? 'form-input-error' : ''}`}
          />
        </div>
        {errors.amount && <p className="error-msg">{errors.amount}</p>}
      </div>

      {/* ── GST Rate Selection ── */}
      <div className="mb-5">
        <label className="form-label">GST Rate</label>

        {/* Preset Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {GST_PRESETS.map((rate) => (
            <button
              key={rate}
              id={`gst-preset-${rate}`}
              onClick={() => handlePreset(rate)}
              className={`py-2.5 text-sm font-bold rounded-xl border transition-all duration-200 ${
                !isCustom && gstRate === rate
                  ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-primary-400 hover:text-primary-600'
              }`}
            >
              {rate}%
            </button>
          ))}
        </div>

        {/* Custom Rate Toggle + Input */}
        <div className="flex items-center gap-3">
          <button
            id="gst-custom-toggle"
            onClick={() => { setIsCustom(!isCustom); setErrors((prev) => ({ ...prev, rate: undefined })) }}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200 flex-shrink-0 ${
              isCustom
                ? 'bg-amber-50 text-amber-600 border-amber-300'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-amber-300 hover:text-amber-600'
            }`}
          >
            {isCustom ? '✓ Custom' : '+ Custom %'}
          </button>
          {isCustom && (
            <div className="flex-1">
              <input
                id="gst-custom-rate"
                type="number"
                min="0"
                max="100"
                value={customRate}
                onChange={(e) => { setCustomRate(e.target.value); setErrors((prev) => ({ ...prev, rate: undefined })) }}
                placeholder="Enter rate (e.g. 6)"
                className={`form-input py-2 text-sm ${errors.rate ? 'form-input-error' : ''}`}
              />
            </div>
          )}
        </div>
        {errors.rate && <p className="error-msg mt-1">{errors.rate}</p>}
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex gap-3 mb-6">
        <button id="gst-calculate-btn" onClick={handleCalculate} className="btn-primary flex-1">
          Calculate GST
        </button>
        <button id="gst-reset-btn" onClick={handleReset} className="btn-secondary px-4">
          Reset
        </button>
      </div>

      {/* ── Results Panel ── */}
      {result && (
        <div className="bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100 rounded-2xl p-5 animate-slide-up">
          <h3 className="text-sm font-bold text-primary-700 uppercase tracking-wider mb-4">Results</h3>

          <div className="space-y-0">
            <div className="result-row">
              <span className="result-label">
                {result.mode === 'add' ? 'Original Amount' : 'Base Amount (excl. GST)'}
              </span>
              <span className="result-value">{formatINR(result.original)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">GST Amount ({result.rate}%)</span>
              <span className="result-value text-green-600">{formatINR(result.gstAmount)}</span>
            </div>
            <div className="result-row pt-3 mt-1 border-t-2 border-primary-200">
              <span className="font-bold text-slate-700">
                {result.mode === 'add' ? 'Total (incl. GST)' : 'Total Paid (incl. GST)'}
              </span>
              <span className="result-value-highlight">{formatINR(result.finalAmount)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GstCalculator
