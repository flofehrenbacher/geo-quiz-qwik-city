import { Badge } from '@chakra-ui/react'
import React from 'react'

interface HighscoreBadgesProps {
  highscore: number
  currentSeriesRight: number
}

export function HighscoreBadges({ highscore, currentSeriesRight }: HighscoreBadgesProps) {
  return (
    <>
      <Badge bg="whiteAlpha.900" color="green.500">
        Highscore {highscore}
      </Badge>
      <Badge bg="whiteAlpha.900" color="gray.500">
        Richtig in Folge {currentSeriesRight}
      </Badge>
    </>
  )
}
