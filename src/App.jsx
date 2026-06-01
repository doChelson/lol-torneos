import Header from './components/Header'
import Hero from './components/Hero'
import TournamentsSection from './components/TournamentsSection'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        <Hero />
        <TournamentsSection />
      </main>
      <footer className="bg-gray-900 border-t border-gray-800 text-center text-gray-600 text-sm py-6">
        © 2026 LoLTorneos.cl · Para la comunidad amateur de Chile
      </footer>
    </div>
  )
}
