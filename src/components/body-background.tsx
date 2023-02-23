import { theme } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'
import React from 'react'
import { QuizState } from '../model/quiz-state'

export function BodyBackground({ quizState }: { quizState: QuizState }) {
  return (
    <Global
      styles={css`
        body {
          background-color: ${bgColors[quizState]};
          transition: background-color 150ms ease-in-out;
        }
      `}
    />
  )
}

export const bgColors: Record<QuizState, string> = {
  question: theme.colors.blue[400],
  correct: theme.colors.green[400],
  wrong: theme.colors.red[400],
}
