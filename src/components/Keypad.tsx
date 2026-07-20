const NUMBER_KEYS = ['7', '8', '9', '4', '5', '6', '1', '2', '3']

type Props = {
  onDigit: (digit: string) => void
  onSubmit: () => void
  submitDisabled: boolean
}

export function Keypad({ onDigit, onSubmit, submitDisabled }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {NUMBER_KEYS.map((digit) => (
        <button
          key={digit}
          type="button"
          onClick={() => onDigit(digit)}
          className="rounded border py-4 text-xl"
        >
          {digit}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onDigit('0')}
        className="col-span-2 rounded border py-4 text-xl"
      >
        0
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={submitDisabled}
        aria-label="Confirm points"
        className="rounded border py-4 text-xl disabled:opacity-30"
      >
        →
      </button>
    </div>
  )
}
