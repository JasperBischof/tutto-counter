import { useState } from 'react'
import type { Card, Player } from '../types'
import { Keypad } from './Keypad'
import { Scoreboard } from './Scoreboard'

const BONUS_CARDS = [
  'bonus-100',
  'bonus-200',
  'bonus-300',
  'bonus-400',
  'bonus-500',
  'bonus-600',
] as const satisfies readonly Exclude<Card, null>[]

type Props = {
  players: Player[]
  scores: Record<string, number>
  pointsHistory: Record<string, number[]>
  cardHistory: Record<string, Card[]>
  activePlayerIndex: number
  isFinalRound: boolean
  onSkip: () => void
  onComplete: (points: number, card: Card, reachedTutto: boolean) => void
}

export function TurnScreen({
  players,
  scores,
  pointsHistory,
  cardHistory,
  activePlayerIndex,
  isFinalRound,
  onSkip,
  onComplete,
}: Props) {
  const [tab, setTab] = useState<'turn' | 'scoreboard'>('turn')
  const [digits, setDigits] = useState('')
  const [card, setCard] = useState<Card>(null)
  const [step, setStep] = useState<'entry' | 'confirm'>('entry')

  const activePlayer = players[activePlayerIndex]

  // Drawing swap-1000, street, or insta-win asks a yes/no question right away.
  function chooseCard(value: Exclude<Card, 'firework' | null>) {
    setCard(value)
    setStep('confirm')
  }

  // Firework and the bonus cards ask nothing — they just tag the turn while
  // entry continues normally, so pressing one again untags it.
  function toggleTag(value: Exclude<Card, null>) {
    setCard((prev) => (prev === value ? null : value))
  }

  function submitEntry() {
    if (digits === '') return
    onComplete(Number(digits), card, false)
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-sm flex-col gap-6 p-4">
      <h1 className="text-center text-2xl font-bold">Tutto Counter</h1>

      {isFinalRound && (
        <p className="text-center text-sm font-medium text-purple-600">
          final round – highest score wins
        </p>
      )}

      <div className="flex gap-2 text-sm">
        <button
          type="button"
          onClick={() => setTab('turn')}
          className={`flex-1 rounded border py-2 ${tab === 'turn' ? 'bg-purple-600 text-white' : ''}`}
        >
          turn
        </button>
        <button
          type="button"
          onClick={() => setTab('scoreboard')}
          className={`flex-1 rounded border py-2 ${tab === 'scoreboard' ? 'bg-purple-600 text-white' : ''}`}
        >
          scoreboard
        </button>
      </div>

      {tab === 'scoreboard' && (
        <Scoreboard
          players={players}
          scores={scores}
          pointsHistory={pointsHistory}
          cardHistory={cardHistory}
          activePlayerId={activePlayer.id}
        />
      )}

      {tab === 'turn' && step === 'entry' && (
        <>
          <p className="text-center text-lg">{activePlayer.name}'s turn</p>

          <button
            type="button"
            onClick={() => setDigits('')}
            aria-label="Clear entered points"
            className="rounded border py-3 text-center text-xl"
          >
            {digits || '0'}
          </button>

          <div className="flex gap-2 text-sm">
            <button type="button" onClick={onSkip} className="flex-1 rounded border py-2">
              skip
            </button>
            <button
              type="button"
              onClick={() => toggleTag('firework')}
              className={`flex-1 rounded border py-2 ${card === 'firework' ? 'bg-purple-600 text-white' : ''}`}
            >
              firework
            </button>
          </div>

          <div className="flex gap-2 text-sm">
            <button
              type="button"
              onClick={() => chooseCard('swap-1000')}
              className="flex-1 rounded border py-2"
            >
              +-1000
            </button>
            <button
              type="button"
              onClick={() => chooseCard('street')}
              className="flex-1 rounded border py-2"
            >
              street
            </button>
            <button
              type="button"
              onClick={() => chooseCard('insta-win')}
              className="flex-1 rounded border py-2"
            >
              insta win
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm">
            {BONUS_CARDS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => toggleTag(value)}
                className={`rounded border py-2 ${card === value ? 'bg-purple-600 text-white' : ''}`}
              >
                +{value.replace('bonus-', '')}
              </button>
            ))}
          </div>

          <Keypad
            onDigit={(digit) => setDigits((prev) => prev + digit)}
            onSubmit={submitEntry}
            submitDisabled={digits === ''}
          />
        </>
      )}

      {tab === 'turn' && step === 'confirm' && (
        <>
          <p className="text-center text-lg">{activePlayer.name}'s turn</p>
          <p className="text-center font-medium">
            {card === 'insta-win'
              ? 'reached tutto twice in a row?'
              : card === 'street'
                ? 'reached street?'
                : 'reached tutto?'}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onComplete(0, card, true)}
              className="flex-1 rounded border py-3"
            >
              yes
            </button>
            <button
              type="button"
              onClick={() => onComplete(0, card, false)}
              className="flex-1 rounded border py-3"
            >
              no
            </button>
          </div>
        </>
      )}
    </div>
  )
}
