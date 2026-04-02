'use client'

import type { Player } from '@/types/game'

interface CellProps {
  value: Player | null
  onClick: () => void
  isWinning: boolean
  isDisabled: boolean
}

export default function Cell({ value, onClick, isWinning, isDisabled }: CellProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || !!value}
      className={`
        w-24 h-24 flex items-center justify-center
        rounded-xl text-5xl font-black
        transition-all duration-200
        border
        ${
          isWinning
            ? 'winner-cell border-purple-400/60'
            : value
            ? 'bg-white/5 border-white/10'
            : 'bg-white/5 border-white/10 cell-hover cursor-pointer'
        }
        ${isDisabled && !value ? 'cursor-not-allowed' : ''}
        ${!value && !isDisabled ? 'hover:border-purple-400/40' : ''}
      `}
    >
      {value && (
        <span
          className={`
            animate-bounce-in select-none
            ${value === 'X' ? 'x-symbol' : 'o-symbol'}
          `}
        >
          {value === 'X' ? '✕' : '○'}
        </span>
      )}
    </button>
  )
}
