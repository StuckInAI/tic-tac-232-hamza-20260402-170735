'use client'

import type { Scores } from '@/types/game'

interface ScoreBoardProps {
  scores: Scores
  isVsComputer: boolean
}

export default function ScoreBoard({ scores, isVsComputer }: ScoreBoardProps) {
  return (
    <div className="flex gap-3 w-full">
      <ScoreCard
        label={"Player X"}
        score={scores.X}
        color="pink"
        symbol="✕"
      />
      <ScoreCard
        label="Draws"
        score={scores.draws}
        color="gray"
        symbol="—"
      />
      <ScoreCard
        label={isVsComputer ? 'Computer' : 'Player O'}
        score={scores.O}
        color="blue"
        symbol="○"
      />
    </div>
  )
}

function ScoreCard({
  label,
  score,
  color,
  symbol,
}: {
  label: string
  score: number
  color: 'pink' | 'blue' | 'gray'
  symbol: string
}) {
  const colorMap = {
    pink: {
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20',
      text: 'text-pink-400',
      score: 'text-pink-300',
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      text: 'text-blue-400',
      score: 'text-blue-300',
    },
    gray: {
      bg: 'bg-white/5',
      border: 'border-white/10',
      text: 'text-white/50',
      score: 'text-white/70',
    },
  }

  const colors = colorMap[color]

  return (
    <div
      className={`flex-1 flex flex-col items-center py-3 px-2 rounded-xl border ${colors.bg} ${colors.border} backdrop-blur-sm`}
    >
      <span className={`text-xl font-black ${colors.text}`}>{symbol}</span>
      <span className={`text-2xl font-extrabold ${colors.score}`}>{score}</span>
      <span className="text-xs text-white/40 font-medium mt-1 text-center leading-tight">{label}</span>
    </div>
  )
}
