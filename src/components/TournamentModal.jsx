import { useState } from 'react'

const UNIVERSIDADES = [
  'Universidad de Chile',
  'Pontificia Universidad Católica de Chile',
  'Universidad de Santiago de Chile (USACH)',
  'Universidad Técnica Federico Santa María (UTFSM)',
  'Universidad de Concepción',
  'Pontificia Universidad Católica de Valparaíso (PUCV)',
  'Universidad Austral de Chile (UACh)',
  'Universidad de Valparaíso',
  'Universidad del Bío-Bío',
  'Universidad de La Frontera (UFRO)',
  'Universidad de Tarapacá',
  'Universidad Arturo Prat',
  'Universidad de Atacama',
  'Universidad de La Serena',
  'Universidad de Magallanes',
  'Universidad de O\'Higgins',
  'Universidad de Aysén',
  'Universidad Andrés Bello (UNAB)',
  'Universidad Diego Portales (UDP)',
  'Universidad Adolfo Ibáñez (UAI)',
  'Universidad de los Andes',
  'Universidad del Desarrollo (UDD)',
  'Universidad Mayor',
  'Universidad San Sebastián (USS)',
  'Universidad Alberto Hurtado (UAH)',
  'Universidad Central de Chile',
  'Universidad Autónoma de Chile',
  'Universidad de las Américas (UDLA)',
  'Otra',
]

const EMPTY_FORM = { name: '', format: '5v5', date: '', cupos: '', universidad: '' }

export default function TournamentModal({ onClose, onCreate }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'El nombre es obligatorio'
    if (!form.date) next.date = 'La fecha es obligatoria'
    if (!form.cupos || Number(form.cupos) < 1) next.cupos = 'Ingresa un número de cupos válido'
    if (!form.universidad) next.universidad = 'Selecciona una universidad'
    return next
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length > 0) {
      setErrors(next)
      return
    }
    onCreate(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-md p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl leading-none"
          aria-label="Cerrar"
        >
          ✕
        </button>

        <h2 className="text-white text-2xl font-bold mb-1">Crear torneo</h2>
        <p className="text-gray-500 text-sm mb-6">Completa los datos para publicar tu torneo.</p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <Field label="Nombre del torneo" error={errors.name}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre del torneo"
              className={inputClass(errors.name)}
            />
          </Field>

          <Field label="Formato">
            <select name="format" value={form.format} onChange={handleChange} className={inputClass()}>
              <option value="1v1">1v1</option>
              <option value="5v5">5v5</option>
              <option value="Clash">Clash</option>
            </select>
          </Field>

          <Field label="Universidad" error={errors.universidad}>
            <select name="universidad" value={form.universidad} onChange={handleChange} className={inputClass(errors.universidad)}>
              <option value="">Selecciona una universidad</option>
              {UNIVERSIDADES.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </Field>

          <Field label="Fecha del torneo" error={errors.date}>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className={inputClass(errors.date)}
            />
          </Field>

          <Field label="Número de cupos" error={errors.cupos}>
            <input
              type="number"
              name="cupos"
              value={form.cupos}
              onChange={handleChange}
              min="1"
              placeholder="Número de cupos"
              className={inputClass(errors.cupos)}
            />
          </Field>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 py-3 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-lg transition-colors"
            >
              Publicar torneo
            </button>
          </div>
        </form>
      </div>
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

function inputClass(error) {
  const base =
    'bg-gray-700 text-white rounded-lg px-4 py-2.5 text-sm outline-none transition-colors placeholder-gray-500 w-full'
  const border = error
    ? 'border border-red-500 focus:border-red-400'
    : 'border border-gray-600 focus:border-yellow-500'
  return `${base} ${border}`
}
