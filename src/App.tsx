import { useState } from 'react'
import { nanoid } from 'nanoid'
import type { GameState, Player } from './types'
import { applyTurn, createGame } from './gameLogic'
import { PlayerSetup } from './components/PlayerSetup'
import { TurnScreen } from './components/TurnScreen'
import { GameOver } from './components/GameOver'

function createPlayer(): Player {
  return { id: nanoid(), name: '' }
}

function App() {
  const [players, setPlayers] = useState<Player[]>([createPlayer(), createPlayer()])
  const [game, setGame] = useState<GameState | null>(null)

  function addPlayer() {
    setPlayers((prev) => (prev.length >= 10 ? prev : [...prev, createPlayer()]))
  }

  function removePlayer(id: string) {
    setPlayers((prev) => (prev.length <= 2 ? prev : prev.filter((player) => player.id !== id)))
  }

  function renamePlayer(id: string, name: string) {
    setPlayers((prev) => prev.map((player) => (player.id === id ? { ...player, name } : player)))
  }

  function movePlayer(id: string, direction: 'up' | 'down') {
    setPlayers((prev) => {
      const index = prev.findIndex((player) => player.id === id)
      const swapWith = direction === 'up' ? index - 1 : index + 1
      if (swapWith < 0 || swapWith >= prev.length) return prev

      const next = [...prev]
      ;[next[index], next[swapWith]] = [next[swapWith], next[index]]
      return next
    })
  }

  function startRound() {
    const namedPlayers = players.map((player, index) => ({
      ...player,
      name: player.name.trim() || `Player ${index + 1}`,
    }))
    setGame(createGame(namedPlayers))
  }

  function restart() {
    setGame(null)
  }

  if (!game) {
    return (
      <PlayerSetup
        players={players}
        onAdd={addPlayer}
        onRemove={removePlayer}
        onRename={renamePlayer}
        onMove={movePlayer}
        onStart={startRound}
      />
    )
  }

  if (game.winner) {
    return (
      <GameOver
        players={game.players}
        scores={game.scores}
        pointsHistory={game.pointsHistory}
        cardHistory={game.cardHistory}
        winner={game.winner}
        onRestart={restart}
      />
    )
  }

  return (
    <TurnScreen
      key={game.turnNumber}
      players={game.players}
      scores={game.scores}
      pointsHistory={game.pointsHistory}
      cardHistory={game.cardHistory}
      activePlayerIndex={game.activePlayerIndex}
      isFinalRound={game.finalRoundTriggeredBy !== null}
      onSkip={() => setGame((current) => applyTurn(current!, 0, 'skip', false))}
      onComplete={(points, card, reachedTutto) =>
        setGame((current) => applyTurn(current!, points, card, reachedTutto))
      }
    />
  )
}

export default App
