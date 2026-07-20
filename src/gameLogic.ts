import type { Card, GameState, Player } from './types'

const WINNING_SCORE = 6000
const SWAP_AMOUNT = 1000

export function createGame(players: Player[]): GameState {
  const scores: Record<string, number> = {}
  const pointsHistory: Record<string, number[]> = {}
  for (const player of players) {
    scores[player.id] = 0
    pointsHistory[player.id] = []
  }

  return {
    players,
    scores,
    pointsHistory,
    activePlayerIndex: 0,
    turnNumber: 0,
    winner: null,
    finalRoundTriggeredBy: null,
  }
}

// reachedTutto only matters when a card was drawn:
// - 'swap-1000' asks "reached tutto?" for that turn
// - 'insta-win' asks "reached tutto twice in a row?"
export function applyTurn(
  state: GameState,
  pointsScored: number,
  card: Card,
  reachedTutto: boolean,
): GameState {
  const activePlayer = state.players[state.activePlayerIndex]

  const scores = { ...state.scores }
  scores[activePlayer.id] += pointsScored

  const pointsHistory = {
    ...state.pointsHistory,
    [activePlayer.id]: [...state.pointsHistory[activePlayer.id], pointsScored],
  }

  if (card === 'swap-1000' && reachedTutto) {
    applySwapCard(scores, activePlayer.id)
  }

  // Insta win always ends the game right away, skipping the final round.
  if (card === 'insta-win' && reachedTutto) {
    return {
      ...state,
      scores,
      pointsHistory,
      winner: activePlayer,
      turnNumber: state.turnNumber + 1,
    }
  }

  // Reaching the winning score starts a final round: whoever hasn't taken
  // their turn yet this round still gets to, but nobody gets an extra one.
  // Turn order always cycles back through index 0, so that's the round
  // boundary — the final round ends there, not back at the trigger's seat.
  const finalRoundTriggeredBy =
    state.finalRoundTriggeredBy ??
    (scores[activePlayer.id] >= WINNING_SCORE ? state.activePlayerIndex : null)

  const nextPlayerIndex = (state.activePlayerIndex + 1) % state.players.length
  const finalRoundComplete = finalRoundTriggeredBy !== null && nextPlayerIndex === 0

  const winner = finalRoundComplete
    ? pickWinner(state.players, scores, finalRoundTriggeredBy!)
    : null

  return {
    ...state,
    scores,
    pointsHistory,
    winner,
    finalRoundTriggeredBy,
    turnNumber: state.turnNumber + 1,
    activePlayerIndex: winner ? state.activePlayerIndex : nextPlayerIndex,
  }
}

// Highest score wins; ties go to whoever triggered the final round, since
// they were the first to reach the winning score.
function pickWinner(
  players: Player[],
  scores: Record<string, number>,
  triggeredByIndex: number,
): Player {
  const highestScore = Math.max(...Object.values(scores))
  const contenders = players.filter((player) => scores[player.id] === highestScore)
  const trigger = players[triggeredByIndex]
  return contenders.find((player) => player.id === trigger.id) ?? contenders[0]
}

// The active player always gains 1000. The player(s) with the most points
// lose 1000 too, unless the leading score isn't above the swap amount.
function applySwapCard(scores: Record<string, number>, activePlayerId: string) {
  const highestScore = Math.max(...Object.values(scores))
  if (highestScore > SWAP_AMOUNT) {
    for (const playerId of Object.keys(scores)) {
      if (scores[playerId] === highestScore) {
        scores[playerId] -= SWAP_AMOUNT
      }
    }
  }
  scores[activePlayerId] += SWAP_AMOUNT
}
