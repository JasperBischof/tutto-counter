import type { Player } from '../types'
import { Scoreboard } from './Scoreboard'

type Props = {
  players: Player[]
  scores: Record<string, number>
  pointsHistory: Record<string, number[]>
  winner: Player
  onRestart: () => void
}

export function GameOver({ players, scores, pointsHistory, winner, onRestart }: Props) {
  return (
    <div className="mx-auto flex min-h-svh max-w-sm flex-col gap-6 p-4">
      <h1 className="text-center text-3xl font-bold">Tutto Counter</h1>
      <p className="text-center">
        <span className="rounded border-2 border-yellow-400 bg-yellow-300 px-3 py-1 text-xl font-medium text-black">
          {winner.name} wins!
        </span>
      </p>

      <Scoreboard players={players} scores={scores} pointsHistory={pointsHistory} />

      <button
        type="button"
        onClick={onRestart}
        className="mt-auto rounded bg-purple-600 py-3 text-lg font-medium text-white"
      >
        play again
      </button>
    </div>
  )
}
