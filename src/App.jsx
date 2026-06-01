import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import TournamentsSection from './components/TournamentsSection'
import TournamentModal from './components/TournamentModal'
import TournamentDetail from './pages/TournamentDetail'

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return `${parseInt(day)} ${MONTHS[parseInt(month) - 1]} ${year}`
}

const INITIAL_TOURNAMENTS = [
  {
    id: 1,
    name: 'Copa Rift Abierta',
    date: '14 jun 2026',
    format: '5v5',
    teams: 16,
    prize: 'Premio: $50.000 CLP',
    region: 'Santiago',
    universidad: 'Universidad de Chile',
    status: 'inscripciones',
  },
  {
    id: 2,
    name: 'Torneo del Norte',
    date: '7 jun 2026',
    format: '5v5',
    teams: 8,
    prize: 'Premio: $30.000 CLP',
    region: 'Antofagasta',
    universidad: 'Universidad Técnica Federico Santa María (UTFSM)',
    status: 'en curso',
  },
  {
    id: 3,
    name: 'Liga Sur Invernal',
    date: '25 may 2026',
    format: 'Clash',
    teams: 12,
    prize: 'Premio: $20.000 CLP',
    region: 'Concepción',
    universidad: 'Universidad de Concepción',
    status: 'finalizado',
  },
]

export default function App() {
  const [tournaments, setTournaments] = useState(INITIAL_TOURNAMENTS)
  const [showModal, setShowModal] = useState(false)

  function handleCreate(formData) {
    const newTournament = {
      id: Date.now(),
      name: formData.name.trim(),
      date: formatDate(formData.date),
      format: formData.format,
      universidad: formData.universidad,
      teams: Number(formData.cupos),
      status: 'inscripciones',
    }
    setTournaments(prev => [newTournament, ...prev])
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero onCreateClick={() => setShowModal(true)} />
            <TournamentsSection tournaments={tournaments} />
            {showModal && (
              <TournamentModal onClose={() => setShowModal(false)} onCreate={handleCreate} />
            )}
          </>
        } />
        <Route path="/torneo/:id" element={<TournamentDetail tournaments={tournaments} />} />
      </Routes>
      <footer className="bg-gray-900 border-t border-gray-800 text-center text-gray-600 text-sm py-6">
        © 2026 LoLTorneos.cl · Para la comunidad amateur de Chile
      </footer>
    </div>
  )
}
