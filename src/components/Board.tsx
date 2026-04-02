'use client'

import Cell from './Cell'
import type { Player, GameState } from '@/types/game'

interface BoardProps {
  board: (Player | null)[]
  onCellClick: (index: number) => void
  winningLine: number[] | null
  gameState: GameState
  isComputerThinking: boolean
}

export default function Board({ board, onCellClick, winningLine, gameState, isComputerThinking }: BoardProps) {
  return (
    <div className="relative">
      {/* Glow effect behind board */}
      <div className="absolute inset-0 bg-purple-600/20 rounded-2xl blur-xl" />
      
      <div className="relative grid grid-cols-3 gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onClick={() => onCellClick(index)}
            isWinning={winningLine?.includes(index) ?? false}
            isDisabled={gameState !== 'playing' || isComputerThinking}
          />
        ))}
      </div>
    </div>
  )
}
