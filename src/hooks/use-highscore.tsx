import { Box } from '@chakra-ui/layout'
import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { HighscoreBadges } from '../components/highscore-badges'
import { useLocalStorageState } from './use-local-storage-state'

export function useHighscore() {
  const [currentSeriesRight, setCurrentSeriesRight] = useState(0)
  const [highscore, setHighscore] = useLocalStorageState('highscore', 0)
  const [throwConfetti, setThrowConfetti] = useState(false)

  useEffect(() => {
    if (currentSeriesRight === 0) {
      setThrowConfetti(false)
    }
  }, [currentSeriesRight, highscore])

  useEffect(() => {
    if (currentSeriesRight > highscore) {
      setThrowConfetti(true)
      setHighscore(currentSeriesRight)
    }
  }, [currentSeriesRight, highscore, setHighscore])

  const { width, height } = useWindowSize()

  return {
    increaseCurrentSeries: () => setCurrentSeriesRight((prev) => prev + 1),
    resetCurrentSeries: () => setCurrentSeriesRight(0),
    highscoreBadges: (
      <>
        <HighscoreBadges currentSeriesRight={currentSeriesRight} highscore={highscore} />
        <Box top="0" left="0">
          {throwConfetti ? (
            <Confetti
              width={width}
              height={height}
              tweenDuration={3000}
              numberOfPieces={1000}
              recycle={false}
            />
          ) : null}
        </Box>
      </>
    ),
  }
}
