const STATUS_STYLES = {
  inscripciones: 'bg-green-900 text-green-400',
  'en curso': 'bg-blue-900 text-blue-400',
  finalizado: 'bg-gray-700 text-gray-400',
}

export default function TournamentCard({ name, date, format, teams, prize, region, universidad, status }) {
  return (
    <div className="bg-gray-800 border border-gray-700 hover:border-yellow-500 rounded-xl p-6 flex flex-col gap-4 transition-colors">
      <div className="flex items-start justify-between">
        <h3 className="text-white font-bold text-lg">{name}</h3>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_STYLES[status]}`}>
          {status}
        </span>
      </div>

      {universidad && (
        <div className="bg-gray-700/60 border border-gray-600 rounded-lg px-3 py-2">
          <span className="text-yellow-400 text-xs font-semibold uppercase tracking-wide">🎓 Universidad</span>
          <p className="text-white text-sm font-medium mt-0.5">{universidad}</p>
        </div>
      )}

      <div className="text-gray-400 text-sm flex flex-col gap-1">
        <span>📅 {date}</span>
        {region && <span>🗺️ {region}</span>}
        <span>👥 {teams} {format === '1v1' ? 'jugadores' : 'equipos'}</span>
        {format && <span>🎮 Formato: {format}</span>}
      </div>
      <div className="mt-auto flex items-center justify-between">
        {prize && <span className="text-yellow-400 font-bold">{prize}</span>}
        <button className="text-sm border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900 px-4 py-1.5 rounded-lg transition-colors font-medium ml-auto">
          Ver torneo
        </button>
      </div>
    </div>
  )
}
