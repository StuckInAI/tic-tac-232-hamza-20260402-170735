import type { Player } from '@/types/game'

const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Anti-diagonal
]

export function calculateWinner(
  board: (Player | null)[]
): { winner: Player; line: number[] } | null {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: [a, b, c] }
    }
  }
  return null
}

export function isBoardFull(board: (Player | null)[]): boolean {
  return board.every(cell => cell !== null)
}
