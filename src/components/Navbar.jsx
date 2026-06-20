import { useState } from 'react'

/**
 * Navbar.jsx — Top navigation bar with app logo, name, and nav links.
 * Includes a mobile-responsive hamburger menu.
 */
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Smooth scroll to a section by id
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo & Brand ── */}
          <div className="flex items-center gap-3">
            {/* Calc icon SVG */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1-4H9a2 2 0 00-2 2v2h10V5a2 2 0 00-2-2z" />
                <line x1="9" y1="13" x2="15" y2="13" strokeLinecap="round" />
                <line x1="9" y1="17" x2="12" y2="17" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              Calc<span className="text-primary-600">Hub</span>
            </span>
          </div>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => scrollTo('gst-section')}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              GST Calculator
            </button>
            <button
              onClick={() => scrollTo('emi-section')}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              EMI Calculator
            </button>
            <button
              onClick={() => scrollTo('calculators')}
              className="ml-2 btn-primary text-sm py-2 px-5"
            >
              Get Started
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* ── Mobile Menu Dropdown ── */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1 pt-2 border-t border-slate-100">
              <button
                onClick={() => scrollTo('gst-section')}
                className="text-left px-4 py-3 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
              >
                GST Calculator
              </button>
              <button
                onClick={() => scrollTo('emi-section')}
                className="text-left px-4 py-3 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
              >
                EMI Calculator
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
