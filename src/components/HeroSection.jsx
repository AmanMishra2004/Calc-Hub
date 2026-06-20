/**
 * HeroSection.jsx — Full-width banner with headline, subtext, and feature badges.
 * Uses a gradient background to create a visually striking top section.
 */
function HeroSection() {
  // Smooth scroll to calculators section
  const scrollToCalcs = () => {
    const el = document.getElementById('calculators')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Feature badges displayed below headline
  const features = [
    { icon: '⚡', label: 'Instant Results' },
    { icon: '🎯', label: 'Accurate & Free' },
    { icon: '📱', label: 'Mobile Friendly' },
    { icon: '🔒', label: 'No Sign-up Needed' },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
      {/* Decorative blurred circles for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-fade-in">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Free · No Registration · Always Available
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight tracking-tight animate-slide-up">
          Your Financial
          <span className="block text-blue-200 mt-1">Calculator Hub</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-primary-100 leading-relaxed mb-10 animate-fade-in">
          Calculate GST on any amount and estimate your loan EMIs instantly.
          Fast, accurate, and completely free — no sign-up required.
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToCalcs}
          className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-primary-50 transition-all duration-300 text-base group"
          id="hero-cta-btn"
        >
          Start Calculating
          <svg
            className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-200"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {features.map((feat) => (
            <div
              key={feat.label}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/85 text-sm font-medium px-4 py-2 rounded-full"
            >
              <span>{feat.icon}</span>
              <span>{feat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 720 0 0 40L0 60Z" fill="rgb(248 250 252)" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
