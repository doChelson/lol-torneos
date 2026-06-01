import { useParams, useNavigate } from 'react-router-dom'

const STATUS_STYLES = {
  inscripciones: 'bg-green-900 text-green-400',
  'en curso': 'bg-blue-900 text-blue-400',
  finalizado: 'bg-gray-700 text-gray-400',
}

const STATUS_LABELS = {
  inscripciones: 'Inscripciones abiertas',
  'en curso': 'En curso',
  finalizado: 'Finalizado',
}

export default function TournamentDetail({ tournaments }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const tournament = tournaments.find(t => String(t.id) === id)

  if (!tournament) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="text-gray-400 text-xl">No se encontró el torneo.</p>
        <button
          onClick={() => navigate('/')}
          className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          ← Volver a torneos
        </button>
      </div>
    )
  }

  const { name, universidad, format, date, teams, prize, region, status } = tournament

  return (
    <section className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium mb-8 flex items-center gap-2"
        >
          ← Volver a torneos
        </button>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h1 className="text-white text-3xl font-extrabold">{name}</h1>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[status] ?? STATUS_STYLES.finalizado}`}>
              {STATUS_LABELS[status] ?? status}
            </span>
          </div>

          {universidad && (
            <div className="bg-gray-700/60 border border-gray-600 rounded-xl px-5 py-4">
              <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-1">🎓 Universidad organizadora</p>
              <p className="text-white text-lg font-semibold">{universidad}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <InfoBlock icon="🎮" label="Formato" value={format} />
            <InfoBlock icon="📅" label="Fecha" value={date} />
            <InfoBlock icon="👥" label="Cupos" value={`${teams} ${format === '1v1' ? 'jugadores' : 'equipos'}`} />
            {region && <InfoBlock icon="🗺️" label="Región" value={region} />}
            {prize && <InfoBlock icon="🏆" label="Premio" value={prize} highlight />}
          </div>

          <div className="pt-2 border-t border-gray-700">
            <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl transition-colors text-lg">
              Inscribirse al torneo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoBlock({ icon, label, value, highlight = false }) {
  return (
    <div className="bg-gray-700/50 rounded-xl px-4 py-3 flex flex-col gap-1">
      <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">{icon} {label}</span>
      <span className={`text-sm font-semibold ${highlight ? 'text-yellow-400' : 'text-white'}`}>{value}</span>
    </div>
  )
}
