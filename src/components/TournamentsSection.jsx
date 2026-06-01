import TournamentCard from './TournamentCard'

const TOURNAMENTS = [
  {
    id: 1,
    name: 'Copa Rift Abierta',
    date: '14 jun 2026',
    teams: 16,
    prize: 'Premio: $50.000 CLP',
    region: 'Santiago',
    status: 'inscripciones',
  },
  {
    id: 2,
    name: 'Torneo del Norte',
    date: '7 jun 2026',
    teams: 8,
    prize: 'Premio: $30.000 CLP',
    region: 'Antofagasta',
    status: 'en curso',
  },
  {
    id: 3,
    name: 'Liga Sur Invernal',
    date: '25 may 2026',
    teams: 12,
    prize: 'Premio: $20.000 CLP',
    region: 'Concepción',
    status: 'finalizado',
  },
]

export default function TournamentsSection() {
  return (
    <section className="bg-gray-900 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-white text-3xl font-bold mb-2">Torneos recientes</h2>
        <p className="text-gray-500 mb-10">Únete o sigue los torneos activos en Chile</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOURNAMENTS.map((t) => (
            <TournamentCard key={t.id} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}
