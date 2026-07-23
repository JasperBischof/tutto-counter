export type Card = 'insta-win' | 'swap-1000' | null

export type Player = {
  id: string
  name: string
}

export type GameState = {
  players: Player[]
  scores: Record<string, number>
  // Points scored on each of a player's turns, in order, for the scoreboard's turn-by-turn table.
  pointsHistory: Record<string, number[]>
  // Card drawn (if any) on each of a player's turns, parallel to pointsHistory.
  cardHistory: Record<string, Card[]>
  activePlayerIndex: number
  turnNumber: number
  winner: Player | null
  // Index of the player who first hit the winning score. Once set, every
  // other player still gets one last turn before a winner is picked.
  finalRoundTriggeredBy: number | null
}
