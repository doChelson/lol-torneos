import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const STATUS_STYLES = {
  inscripciones: 'bg-green-900 text-green-400',
  'en curso':    'bg-blue-900 text-blue-400',
  finalizado:    'bg-gray-700 text-gray-400',
}

const STATUS_LABELS = {
  inscripciones: 'Inscripciones abiertas',
  'en curso':    'En curso',
  finalizado:    'Finalizado',
}

function playerCount(format) {
  return format === '1v1' ? 1 : 5
}

function emptyForm(format) {
  return { teamName: '', players: Array(playerCount(format)).fill('') }
}

export default function TournamentDetail({ tournaments, registrations, onRegister }) {
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

  const { name, universidad, format, date, teams: cupos, prize, region, status } = tournament
  const registered = registrations[tournament.id] ?? []
  const isFull = registered.length >= cupos
  const pCount = playerCount(format)

  return (
    <section className="py-16 px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <button
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-medium flex items-center gap-2 w-fit"
        >
          ← Volver a torneos
        </button>

        {/* Info card */}
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
            <InfoBlock icon="👥" label="Cupos" value={`${registered.length} / ${cupos} ${format === '1v1' ? 'jugadores' : 'equipos'}`} />
            {region && <InfoBlock icon="🗺️" label="Región" value={region} />}
            {prize && <InfoBlock icon="🏆" label="Premio" value={prize} highlight />}
          </div>

          {/* Barra de progreso de cupos */}
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Cupos ocupados</span>
              <span>{registered.length}/{cupos}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${isFull ? 'bg-red-500' : 'bg-yellow-400'}`}
                style={{ width: `${Math.min((registered.length / cupos) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Formulario de inscripción */}
        <RegisterForm
          format={format}
          pCount={pCount}
          isFull={isFull}
          registered={registered}
          tournamentId={tournament.id}
          onRegister={onRegister}
        />

        {/* Lista de equipos inscritos */}
        {registered.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-white text-xl font-bold">
              Equipos inscritos
              <span className="text-gray-500 font-normal text-base ml-2">({registered.length})</span>
            </h2>
            {registered.map((team, i) => (
              <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 flex flex-col gap-2">
                <p className="text-yellow-400 font-bold text-base">#{i + 1} {team.teamName}</p>
                <div className="flex flex-wrap gap-2">
                  {team.players.map((player, j) => (
                    <span key={j} className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                      {format === '1v1' ? '🎮' : `J${j + 1}`} {player}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function RegisterForm({ format, pCount, isFull, registered, tournamentId, onRegister }) {
  const [form, setForm] = useState(emptyForm(format))
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  function validate() {
    const next = {}
    if (!form.teamName.trim()) {
      next.teamName = 'El nombre del equipo es obligatorio'
    } else if (registered.some(t => t.teamName.toLowerCase() === form.teamName.trim().toLowerCase())) {
      next.teamName = 'Ya existe un equipo con ese nombre'
    }
    form.players.forEach((p, i) => {
      if (!p.trim()) next[`player_${i}`] = 'Obligatorio'
    })
    return next
  }

  function handleTeamName(e) {
    setForm(prev => ({ ...prev, teamName: e.target.value }))
    if (errors.teamName) setErrors(prev => ({ ...prev, teamName: undefined }))
    setSuccess(false)
  }

  function handlePlayer(index, value) {
    setForm(prev => ({ ...prev, players: prev.players.map((p, i) => i === index ? value : p) }))
    if (errors[`player_${index}`]) setErrors(prev => ({ ...prev, [`player_${index}`]: undefined }))
    setSuccess(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length > 0) { setErrors(next); return }
    onRegister(tournamentId, { teamName: form.teamName.trim(), players: form.players.map(p => p.trim()) })
    setForm(emptyForm(format))
    setErrors({})
    setSuccess(true)
  }

  if (isFull) {
    return (
      <div className="bg-red-900/30 border border-red-800 rounded-2xl p-6 text-center">
        <p className="text-red-400 font-bold text-lg">Torneo completo</p>
        <p className="text-gray-500 text-sm mt-1">No quedan cupos disponibles para este torneo.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 flex flex-col gap-5">
      <div>
        <h2 className="text-white text-xl font-bold">Inscribir equipo</h2>
        <p className="text-gray-500 text-sm mt-1">Completa los datos para inscribir tu {format === '1v1' ? 'jugador' : 'equipo'}.</p>
      </div>

      {success && (
        <div className="bg-green-900/40 border border-green-700 rounded-lg px-4 py-3 text-green-400 text-sm font-medium">
          ✓ Equipo inscrito correctamente.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Field label="Nombre del equipo" error={errors.teamName}>
          <input
            value={form.teamName}
            onChange={handleTeamName}
            placeholder="Nombre del equipo"
            className={inputClass(errors.teamName)}
          />
        </Field>

        <div className="flex flex-col gap-3">
          <label className="text-gray-300 text-sm font-medium">
            {format === '1v1' ? 'Jugador' : `Jugadores (${pCount})`}
          </label>
          {form.players.map((player, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xs w-6 text-right shrink-0">
                  {format === '1v1' ? '🎮' : `J${i + 1}`}
                </span>
                <input
                  value={player}
                  onChange={e => handlePlayer(i, e.target.value)}
                  placeholder={format === '1v1' ? 'Nombre del jugador' : `Jugador ${i + 1}`}
                  className={inputClass(errors[`player_${i}`])}
                />
              </div>
              {errors[`player_${i}`] && (
                <span className="text-red-400 text-xs pl-8">{errors[`player_${i}`]}</span>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl transition-colors"
        >
          Inscribir equipo
        </button>
      </form>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-300 text-sm font-medium">{label}</label>
      {children}
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
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

function inputClass(error) {
  const base = 'bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-colors placeholder-gray-500 w-full'
  const border = error
    ? 'border border-red-500 focus:border-red-400'
    : 'border border-gray-600 focus:border-yellow-500'
  return `${base} ${border}`
}
