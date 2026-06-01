const CARD_W = 160
const CARD_H = 65   // 2 × (py-2 + text-xs + py-2) + 1px divider
const SLOT_H = 96   // espacio vertical por partido en ronda 1
const COL_GAP = 52  // espacio horizontal entre columnas

function getRoundName(ri, total) {
  const fromEnd = total - 1 - ri
  if (fromEnd === 0) return 'Final'
  if (fromEnd === 1) return 'Semifinal'
  if (fromEnd === 2) return 'Cuartos de final'
  return `Ronda ${ri + 1}`
}

function MatchCard({ match, isFirstRound }) {
  const t1 = match.team1 ?? (isFirstRound ? 'BYE' : 'Por definir')
  const t2 = match.team2 ?? (isFirstRound ? 'BYE' : 'Por definir')

  return (
    <div className="bg-gray-700 border border-gray-600 rounded-lg overflow-hidden shadow text-xs">
      <div className={`px-3 py-2 truncate font-medium ${match.team1 ? 'text-white' : 'text-gray-500 italic'}`}>
        {t1}
      </div>
      <div className="border-t border-gray-600" />
      <div className={`px-3 py-2 truncate font-medium ${match.team2 ? 'text-white' : 'text-gray-500 italic'}`}>
        {t2}
      </div>
    </div>
  )
}

export default function Bracket({ rounds }) {
  const totalW = rounds.length * CARD_W + (rounds.length - 1) * COL_GAP
  const totalH = rounds[0].length * SLOT_H

  return (
    <div className="overflow-x-auto pb-2">
      {/* Encabezados de ronda */}
      <div className="relative mb-5" style={{ width: totalW, height: 20 }}>
        {rounds.map((_, ri) => (
          <div
            key={ri}
            className="absolute text-center text-xs text-yellow-500 font-semibold uppercase tracking-wide"
            style={{ left: ri * (CARD_W + COL_GAP), width: CARD_W }}
          >
            {getRoundName(ri, rounds.length)}
          </div>
        ))}
      </div>

      {/* Área del bracket */}
      <div className="relative" style={{ width: totalW, height: totalH }}>
        {/* Líneas de conexión SVG */}
        <svg
          className="absolute inset-0 overflow-visible pointer-events-none"
          width={totalW}
          height={totalH}
        >
          {rounds.slice(0, -1).map((round, ri) => {
            const slotH = SLOT_H * Math.pow(2, ri)
            const x1   = ri * (CARD_W + COL_GAP) + CARD_W
            const x2   = (ri + 1) * (CARD_W + COL_GAP)
            const xMid = x1 + (x2 - x1) / 2

            return round.map((_, mi) => {
              if (mi % 2 !== 0) return null
              const yTop  = mi * slotH + slotH / 2
              const yBot  = (mi + 1) * slotH + slotH / 2
              const yNext = (yTop + yBot) / 2

              return (
                <g key={`${ri}-${mi}`} stroke="#4B5563" strokeWidth="1.5" fill="none">
                  <line x1={x1}   y1={yTop}  x2={xMid} y2={yTop}  />
                  <line x1={xMid} y1={yTop}  x2={xMid} y2={yBot}  />
                  <line x1={x1}   y1={yBot}  x2={xMid} y2={yBot}  />
                  <line x1={xMid} y1={yNext} x2={x2}   y2={yNext} />
                </g>
              )
            })
          })}
        </svg>

        {/* Tarjetas de partidos */}
        {rounds.map((round, ri) => {
          const slotH = SLOT_H * Math.pow(2, ri)
          const x     = ri * (CARD_W + COL_GAP)

          return round.map((match, mi) => {
            const y = mi * slotH + (slotH - CARD_H) / 2
            return (
              <div
                key={`${ri}-${mi}`}
                className="absolute"
                style={{ left: x, top: y, width: CARD_W }}
              >
                <MatchCard match={match} isFirstRound={ri === 0} />
              </div>
            )
          })
        })}
      </div>
    </div>
  )
}
