import type { Player } from '../types'

type Props = {
  players: Player[]
  scores: Record<string, number>
  pointsHistory: Record<string, number[]>
  activePlayerId?: string
}

export function Scoreboard({ players, scores, pointsHistory, activePlayerId }: Props) {
  const highestScore = Math.max(...players.map((player) => scores[player.id]))
  const turnCount = Math.max(0, ...players.map((player) => pointsHistory[player.id].length))
  const turns = Array.from({ length: turnCount }, (_, index) => index)

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max border-collapse text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">turn</th>
            {players.map((player) => (
              <th
                key={player.id}
                className={`border px-2 py-1 text-right ${
                  player.id === activePlayerId ? 'border-purple-600' : ''
                }`}
              >
                {player.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {turns.map((turn) => (
            <tr key={turn}>
              <td className="border px-2 py-1">{turn + 1}</td>
              {players.map((player) => (
                <td key={player.id} className="border px-2 py-1 text-right">
                  {pointsHistory[player.id][turn] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="border px-2 py-1 font-medium">total</td>
            {players.map((player) => (
              <td
                key={player.id}
                className={`border px-2 py-1 text-right font-medium ${
                  scores[player.id] === highestScore ? 'border-2 border-yellow-400' : ''
                }`}
              >
                {scores[player.id]}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
