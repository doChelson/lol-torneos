export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-yellow-500 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-yellow-400 text-2xl">⚔️</span>
        <span className="text-white font-bold text-xl tracking-wide">
          LoL<span className="text-yellow-400">Torneos</span>.cl
        </span>
      </div>
      <nav className="flex gap-6 text-sm text-gray-300">
        <a href="#" className="hover:text-yellow-400 transition-colors">Torneos</a>
        <a href="#" className="hover:text-yellow-400 transition-colors">Rankings</a>
        <a href="#" className="hover:text-yellow-400 transition-colors">Iniciar sesión</a>
      </nav>
    </header>
  )
}
