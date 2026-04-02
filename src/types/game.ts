export type Player = 'X' | 'O'

export type GameState = 'playing' | 'won' | 'draw'

export interface Scores {
  X: number
  O: number
  draws: number
}

export interface GameResult {
  winner: Player
  line: number[]
}
