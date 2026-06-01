export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-center py-24 px-6">
      <p className="text-yellow-400 uppercase tracking-widest text-sm font-semibold mb-4">
        Plataforma amateur · Chile
      </p>
      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
        Compite. Demuestra.<br />
        <span className="text-yellow-400">Conquista la Rift.</span>
      </h1>
      <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10">
        Organiza y participa en torneos de League of Legends para jugadores amateur de todo Chile.
        Totalmente gratis.
      </p>
      <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-4 px-10 rounded-lg text-lg transition-colors shadow-lg shadow-yellow-400/20">
        Crear torneo
      </button>
    </section>
  )
}
