'use client'

import type { Player, GameState } from '@/types/game'

interface GameStatusProps {
  gameState: GameState
  currentPlayer: Player
  isComputerThinking: boolean
  isVsComputer: boolean
}

export default function GameStatus({ gameState, currentPlayer, isComputerThinking, isVsComputer }: GameStatusProps) {
  const getStatusContent = () => {
    if (gameState === 'won') {
      const winner = currentPlayer
      const isComputer = isVsComputer && winner === 'O'
      return {
        icon: isComputer ? '🤖' : '🎉',
        text: isComputer ? 'Computer Wins!' : `Player ${winner} Wins!`,
        subtext: isComputer ? 'Better luck next time!' : 'Congratulations!',
        className: winner === 'X' ? 'text-pink-400' : 'text-blue-400',
      }
    }

    if (gameState === 'draw') {
      return {
        icon: '🤝',
        text: "It's a Draw!",
        subtext: 'Great game, well played!',
        className: 'text-yellow-400',
      }
    }

    if (isComputerThinking) {
      return {
        icon: '🤔',
        text: 'Computer is thinking...',
        subtext: 'Please wait',
        className: 'text-purple-400',
      }
    }

    const isComputerTurn = isVsComputer && currentPlayer === 'O'
    return {
      icon: currentPlayer === 'X' ? '✕' : '○',
      text: isComputerTurn ? "Computer's Turn" : `Player ${currentPlayer}'s Turn`,
      subtext: isComputerTurn ? 'AI is deciding...' : 'Make your move!',
      className: currentPlayer === 'X' ? 'text-pink-400' : 'text-blue-400',
    }
  }

  const status = getStatusContent()

  return (
    <div className="w-full flex items-center gap-3 px-5 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
      <span className="text-3xl">{status.icon}</span>
      <div>
        <p className={`font-bold text-lg leading-tight ${status.className}`}>{status.text}</p>
        <p className="text-white/40 text-xs font-medium">{status.subtext}</p>
      </div>
      {isComputerThinking && (
        <div className="ml-auto flex gap-1">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
