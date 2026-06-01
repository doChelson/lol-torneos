import TournamentCard from './TournamentCard'

export default function TournamentsSection({ tournaments }) {
  return (
    <section className="bg-gray-900 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-white text-3xl font-bold mb-2">Torneos recientes</h2>
        <p className="text-gray-500 mb-10">Únete o sigue los torneos activos en Chile</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tournaments.map((t) => (
            <TournamentCard key={t.id} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}
