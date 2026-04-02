'use client'

import { useState, useCallback } from 'react'
import Board from './Board'
import ScoreBoard from './ScoreBoard'
import GameStatus from './GameStatus'
import { calculateWinner, isBoardFull } from '@/utils/gameLogic'
import type { Player, GameState, Scores } from '@/types/game'

export default function TicTacToe() {
  const [board, setBoard] = useState<(Player | null)[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [gameState, setGameState] = useState<GameState>('playing')
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draws: 0 })
  const [isVsComputer, setIsVsComputer] = useState(false)
  const [isComputerThinking, setIsComputerThinking] = useState(false)

  const getComputerMove = useCallback((currentBoard: (Player | null)[]): number => {
    // Try to win
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = [...currentBoard]
        testBoard[i] = 'O'
        if (calculateWinner(testBoard)?.winner === 'O') return i
      }
    }
    // Block player from winning
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = [...currentBoard]
        testBoard[i] = 'X'
        if (calculateWinner(testBoard)?.winner === 'X') return i
      }
    }
    // Take center
    if (!currentBoard[4]) return 4
    // Take corners
    const corners = [0, 2, 6, 8]
    const availableCorners = corners.filter(i => !currentBoard[i])
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)]
    }
    // Take any available
    const available = currentBoard.map((cell, i) => cell === null ? i : -1).filter(i => i !== -1)
    return available[Math.floor(Math.random() * available.length)]
  }, [])

  const handleCellClick = useCallback((index: number) => {
    if (board[index] || gameState !== 'playing' || isComputerThinking) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const result = calculateWinner(newBoard)
    if (result) {
      setWinningLine(result.line)
      setGameState('won')
      setScores(prev => ({ ...prev, [result.winner]: prev[result.winner as keyof Scores] + 1 }))
      return
    }

    if (isBoardFull(newBoard)) {
      setGameState('draw')
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }))
      return
    }

    const nextPlayer: Player = currentPlayer === 'X' ? 'O' : 'X'
    setCurrentPlayer(nextPlayer)

    if (isVsComputer && nextPlayer === 'O') {
      setIsComputerThinking(true)
      setTimeout(() => {
        const computerMove = getComputerMove(newBoard)
        const boardAfterComputer = [...newBoard]
        boardAfterComputer[computerMove] = 'O'
        setBoard(boardAfterComputer)

        const computerResult = calculateWinner(boardAfterComputer)
        if (computerResult) {
          setWinningLine(computerResult.line)
          setGameState('won')
          setScores(prev => ({ ...prev, [computerResult.winner]: prev[computerResult.winner as keyof Scores] + 1 }))
        } else if (isBoardFull(boardAfterComputer)) {
          setGameState('draw')
          setScores(prev => ({ ...prev, draws: prev.draws + 1 }))
        } else {
          setCurrentPlayer('X')
        }
        setIsComputerThinking(false)
      }, 600)
    }
  }, [board, currentPlayer, gameState, isVsComputer, isComputerThinking, getComputerMove])

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setGameState('playing')
    setWinningLine(null)
    setIsComputerThinking(false)
  }, [])

  const resetAll = useCallback(() => {
    resetGame()
    setScores({ X: 0, O: 0, draws: 0 })
  }, [resetGame])

  const toggleMode = useCallback(() => {
    setIsVsComputer(prev => !prev)
    resetAll()
  }, [resetAll])

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Tic Tac Toe
        </h1>
        <p className="text-purple-300 text-sm font-medium tracking-widest uppercase">
          {isVsComputer ? '🤖 vs Computer' : '👥 Two Players'}
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
        <span className={`text-sm font-semibold transition-colors ${!isVsComputer ? 'text-purple-300' : 'text-white/40'}`}>
          2 Players
        </span>
        <button
          onClick={toggleMode}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            isVsComputer ? 'bg-purple-600' : 'bg-white/20'
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
              isVsComputer ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-sm font-semibold transition-colors ${isVsComputer ? 'text-purple-300' : 'text-white/40'}`}>
          vs AI
        </span>
      </div>

      {/* Score Board */}
      <ScoreBoard scores={scores} isVsComputer={isVsComputer} />

      {/* Game Status */}
      <GameStatus
        gameState={gameState}
        currentPlayer={currentPlayer}
        isComputerThinking={isComputerThinking}
        isVsComputer={isVsComputer}
      />

      {/* Board */}
      <Board
        board={board}
        onCellClick={handleCellClick}
        winningLine={winningLine}
        gameState={gameState}
        isComputerThinking={isComputerThinking}
      />

      {/* Action Buttons */}
      <div className="flex gap-3 w-full">
        <button
          onClick={resetGame}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95"
        >
          New Game
        </button>
        <button
          onClick={resetAll}
          className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white font-semibold rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20"
        >
          Reset All
        </button>
      </div>
    </div>
  )
}
