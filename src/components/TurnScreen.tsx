import { useState } from 'react'
import type { Card, Player } from '../types'
import { Keypad } from './Keypad'
import { Scoreboard } from './Scoreboard'

type Props = {
  players: Player[]
  scores: Record<string, number>
  pointsHistory: Record<string, number[]>
  activePlayerIndex: number
  isFinalRound: boolean
  onSkip: () => void
  onComplete: (points: number, card: Card, reachedTutto: boolean) => void
}

export function TurnScreen({
  players,
  scores,
  pointsHistory,
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

  // Drawing a card asks the tutto question right away; a plain number never does.
  function chooseCard(value: Exclude<Card, null>) {
    setCard(value)
    setStep('confirm')
  }

  function submitEntry() {
    if (digits === '') return
    onComplete(Number(digits), null, false)
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
              onClick={() => chooseCard('swap-1000')}
              className="flex-1 rounded border py-2"
            >
              +-1000
            </button>
            <button
              type="button"
              onClick={() => chooseCard('insta-win')}
              className="flex-1 rounded border py-2"
            >
              insta win
            </button>
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
            {card === 'insta-win' ? 'reached tutto twice in a row?' : 'reached tutto?'}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onComplete(Number(digits || '0'), card, true)}
              className="flex-1 rounded border py-3"
            >
              yes
            </button>
            <button
              type="button"
              onClick={() => onComplete(Number(digits || '0'), card, false)}
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
