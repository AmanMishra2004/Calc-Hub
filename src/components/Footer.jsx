/**
 * Footer.jsx — Simple footer with brand info, links, and a copyright notice.
 */
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* ── Brand Column ── */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1-4H9a2 2 0 00-2 2v2h10V5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <span className="text-white text-lg font-bold tracking-tight">
                Calc<span className="text-primary-400">Hub</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Your free online financial calculator hub. Fast, accurate, and easy-to-use tools for everyday financial decisions.
            </p>
          </div>

          {/* ── Calculators Column ── */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Calculators</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'GST Calculator', id: 'gst-section' },
                { label: 'EMI Calculator', id: 'emi-section' },
              ].map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-slate-400 hover:text-primary-400 text-sm transition-colors duration-200"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Info Column ── */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">About</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              CalcHub provides general financial calculations for informational purposes only.
              Always consult a qualified financial advisor for important financial decisions.
            </p>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} CalcHub. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Built with ❤️ using React + Vite + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
