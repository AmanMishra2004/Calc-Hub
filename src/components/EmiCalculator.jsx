import { useState } from 'react'

/**
 * EmiCalculator.jsx — Calculates Equal Monthly Instalments (EMI) for a loan.
 *
 * EMI Formula (standard reducing-balance method):
 *   P = Principal (loan amount)
 *   r = Monthly interest rate = annual rate / (12 × 100)
 *   n = Tenure in months
 *
 *   EMI = P × r × (1 + r)^n  /  ((1 + r)^n − 1)
 *
 * Special case: r = 0 → EMI = P / n  (zero-interest loan)
 */

// Helper: format as Indian Rupee
const formatINR = (num) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)

function EmiCalculator() {
  // ─── State ─────────────────────────────────────────────────────────────────
  const [loanAmount, setLoanAmount]   = useState('')      // principal
  const [annualRate, setAnnualRate]   = useState('')      // annual interest %
  const [tenure, setTenure]           = useState('')      // duration value
  const [tenureType, setTenureType]   = useState('years') // 'years' | 'months'
  const [result, setResult]           = useState(null)    // computed results
  const [errors, setErrors]           = useState({})      // field errors

  // ─── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    const p = parseFloat(loanAmount)
    const r = parseFloat(annualRate)
    const t = parseInt(tenure, 10)

    if (!loanAmount.trim()) {
      errs.loanAmount = 'Please enter the loan amount.'
    } else if (isNaN(p) || p <= 0) {
      errs.loanAmount = 'Loan amount must be a positive number.'
    }

    if (!annualRate.trim()) {
      errs.annualRate = 'Please enter the annual interest rate.'
    } else if (isNaN(r) || r < 0 || r > 100) {
      errs.annualRate = 'Rate must be between 0% and 100%.'
    }

    if (!tenure.trim()) {
      errs.tenure = 'Please enter the loan tenure.'
    } else if (isNaN(t) || t <= 0) {
      errs.tenure = 'Tenure must be a positive number.'
    } else if (tenureType === 'years' && t > 50) {
      errs.tenure = 'Tenure cannot exceed 50 years.'
    } else if (tenureType === 'months' && t > 600) {
      errs.tenure = 'Tenure cannot exceed 600 months.'
    }

    return errs
  }

  // ─── Calculate EMI ─────────────────────────────────────────────────────────
  const handleCalculate = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setResult(null)
      return
    }
    setErrors({})

    const P = parseFloat(loanAmount)                          // principal
    const annualRateVal = parseFloat(annualRate)
    const r = annualRateVal / (12 * 100)                      // monthly rate
    const n = tenureType === 'years'
      ? parseInt(tenure, 10) * 12
      : parseInt(tenure, 10)                                  // tenure in months

    let emi
    if (r === 0) {
      // Zero-interest case
      emi = P / n
    } else {
      // Standard EMI formula
      const onePlusRPowN = Math.pow(1 + r, n)
      emi = (P * r * onePlusRPowN) / (onePlusRPowN - 1)
    }

    const totalPayment  = emi * n
    const totalInterest = totalPayment - P

    setResult({
      emi,
      totalInterest,
      totalPayment,
      months: n,
      principal: P,
      rate: annualRateVal,
    })
  }

  // ─── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setLoanAmount('')
    setAnnualRate('')
    setTenure('')
    setTenureType('years')
    setResult(null)
    setErrors({})
  }

  // ─── Computed breakdown bar widths ─────────────────────────────────────────
  const principalPct = result
    ? Math.round((result.principal / result.totalPayment) * 100)
    : 0
  const interestPct = result ? 100 - principalPct : 0

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="card p-6 sm:p-8">
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-md flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">EMI Calculator</h2>
          <p className="text-slate-400 text-sm">Plan your loan repayment easily</p>
        </div>
      </div>

      {/* ── Loan Amount ── */}
      <div className="mb-5">
        <label htmlFor="emi-loan-amount" className="form-label">Loan Amount (₹)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold select-none">₹</span>
          <input
            id="emi-loan-amount"
            type="number"
            min="0"
            value={loanAmount}
            onChange={(e) => { setLoanAmount(e.target.value); setErrors((p) => ({ ...p, loanAmount: undefined })) }}
            placeholder="e.g. 500000"
            className={`form-input pl-9 ${errors.loanAmount ? 'form-input-error' : ''}`}
          />
        </div>
        {errors.loanAmount && <p className="error-msg">{errors.loanAmount}</p>}
      </div>

      {/* ── Annual Interest Rate ── */}
      <div className="mb-5">
        <label htmlFor="emi-interest-rate" className="form-label">Annual Interest Rate (%)</label>
        <div className="relative">
          <input
            id="emi-interest-rate"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={annualRate}
            onChange={(e) => { setAnnualRate(e.target.value); setErrors((p) => ({ ...p, annualRate: undefined })) }}
            placeholder="e.g. 8.5"
            className={`form-input pr-10 ${errors.annualRate ? 'form-input-error' : ''}`}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold select-none">%</span>
        </div>
        {errors.annualRate && <p className="error-msg">{errors.annualRate}</p>}
      </div>

      {/* ── Loan Tenure ── */}
      <div className="mb-5">
        <label htmlFor="emi-tenure" className="form-label">Loan Tenure</label>
        <div className="flex gap-3">
          {/* Tenure value input */}
          <input
            id="emi-tenure"
            type="number"
            min="1"
            value={tenure}
            onChange={(e) => { setTenure(e.target.value); setErrors((p) => ({ ...p, tenure: undefined })) }}
            placeholder={tenureType === 'years' ? 'e.g. 5' : 'e.g. 60'}
            className={`form-input flex-1 ${errors.tenure ? 'form-input-error' : ''}`}
          />

          {/* Months / Years toggle */}
          <div className="flex rounded-xl overflow-hidden border border-slate-200 flex-shrink-0">
            <button
              id="emi-tenure-years"
              onClick={() => setTenureType('years')}
              className={`px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                tenureType === 'years'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              Yrs
            </button>
            <button
              id="emi-tenure-months"
              onClick={() => setTenureType('months')}
              className={`px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                tenureType === 'months'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              Mos
            </button>
          </div>
        </div>
        {errors.tenure && <p className="error-msg">{errors.tenure}</p>}
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex gap-3 mb-6">
        <button id="emi-calculate-btn" onClick={handleCalculate} className="btn-primary flex-1">
          Calculate EMI
        </button>
        <button id="emi-reset-btn" onClick={handleReset} className="btn-secondary px-4">
          Reset
        </button>
      </div>

      {/* ── Results Panel ── */}
      {result && (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-5 animate-slide-up">
          <h3 className="text-sm font-bold text-purple-700 uppercase tracking-wider mb-4">Results</h3>

          {/* Monthly EMI — hero metric */}
          <div className="bg-white rounded-xl p-4 mb-4 text-center border border-purple-100 shadow-sm">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Monthly EMI</p>
            <p className="text-3xl font-extrabold text-purple-700">{formatINR(result.emi)}</p>
            <p className="text-slate-400 text-xs mt-1">for {result.months} months</p>
          </div>

          {/* Breakdown rows */}
          <div className="space-y-0">
            <div className="result-row">
              <span className="result-label">Principal Amount</span>
              <span className="result-value">{formatINR(result.principal)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Total Interest</span>
              <span className="result-value text-orange-500">{formatINR(result.totalInterest)}</span>
            </div>
            <div className="result-row pt-3 mt-1 border-t-2 border-purple-200">
              <span className="font-bold text-slate-700">Total Payment</span>
              <span className="result-value-highlight text-purple-700">{formatINR(result.totalPayment)}</span>
            </div>
          </div>

          {/* Stacked breakdown bar */}
          <div className="mt-5">
            <div className="flex justify-between text-xs font-medium text-slate-500 mb-1.5">
              <span>Principal {principalPct}%</span>
              <span>Interest {interestPct}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden flex">
              <div
                className="h-full bg-primary-500 transition-all duration-700 rounded-l-full"
                style={{ width: `${principalPct}%` }}
              />
              <div
                className="h-full bg-orange-400 transition-all duration-700 rounded-r-full"
                style={{ width: `${interestPct}%` }}
              />
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-full bg-primary-500" />Principal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-full bg-orange-400" />Interest
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmiCalculator
