import type { Player } from '../types'

const MIN_PLAYERS = 2
const MAX_PLAYERS = 10

type Props = {
  players: Player[]
  onAdd: () => void
  onRemove: (id: string) => void
  onRename: (id: string, name: string) => void
  onMove: (id: string, direction: 'up' | 'down') => void
  onStart: () => void
}

export function PlayerSetup({ players, onAdd, onRemove, onRename, onMove, onStart }: Props) {
  return (
    <div className="mx-auto flex min-h-svh max-w-sm flex-col gap-6 p-4">
      <h1 className="text-center text-3xl font-bold">Tutto Counter</h1>

      <ul className="flex flex-col gap-3">
        {players.map((player, index) => (
          <li key={player.id} className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => onMove(player.id, 'up')}
                disabled={index === 0}
                aria-label="Move player up"
                className="rounded border px-2 disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => onMove(player.id, 'down')}
                disabled={index === players.length - 1}
                aria-label="Move player down"
                className="rounded border px-2 disabled:opacity-30"
              >
                ↓
              </button>
            </div>

            <input
              type="text"
              value={player.name}
              onChange={(event) => onRename(player.id, event.target.value)}
              placeholder={`Player ${index + 1}`}
              className="min-w-0 flex-1 rounded border px-3 py-2"
            />

            <button
              type="button"
              onClick={() => onRemove(player.id)}
              disabled={players.length <= MIN_PLAYERS}
              className="rounded border px-3 py-2 disabled:opacity-30"
            >
              del
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onAdd}
        disabled={players.length >= MAX_PLAYERS}
        aria-label="Add player"
        className="self-center rounded-full border w-10 h-10 text-xl leading-none disabled:opacity-30"
      >
        +
      </button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        To get the best experience, order the players like you are sitting at the table.
      </p>

      <button
        type="button"
        onClick={onStart}
        className="mt-auto rounded bg-purple-600 py-3 text-lg font-medium text-white"
      >
        start round
      </button>
    </div>
  )
}
