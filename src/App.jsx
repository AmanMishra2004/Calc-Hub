import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import GstCalculator from './components/GstCalculator'
import EmiCalculator from './components/EmiCalculator'
import Footer from './components/Footer'

/**
 * App.jsx — Root component that assembles all sections.
 * Layout: Navbar → Hero → Calculators (side-by-side on lg+, stacked on mobile) → Footer
 */
function App() {
  return (
    <div className="min-h-screen flex flex-col font-inter">
      {/* Top navigation */}
      <Navbar />

      {/* Hero banner */}
      <HeroSection />

      {/* Main calculator area */}
      <main id="calculators" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* GST Calculator */}
          <div id="gst-section" className="animate-slide-up">
            <GstCalculator />
          </div>

          {/* EMI Calculator */}
          <div id="emi-section" className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <EmiCalculator />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
