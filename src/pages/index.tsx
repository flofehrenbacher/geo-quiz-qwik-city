import { Box, Button, Center, Heading, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { useRef, useState, useEffect } from 'react'
import { AnswerOption } from '../components/answer-option'
import { bgColors, BodyBackground } from '../components/body-background'
import { useAnswerOptions } from '../hooks/use-capital-options'
import { useHighscore } from '../hooks/use-highscore'
import { countries, Country } from '../model/countries'
import { QuizState } from '../model/quiz-state'
import { pickRandom } from '../utils/pick-random'

export type GameState = {
  quizState: QuizState
  solutionCountry: Country
  chosenAnswer: Country | null
}
export default function Home() {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <StartGame />
}

function StartGame() {
  const [gameState, setGameState] = useState<GameState>({
    quizState: 'question',
    chosenAnswer: null,
    solutionCountry: pickRandom(countries),
  })

  const { solutionCountry, quizState } = gameState

  const nextButtonRef = useRef<HTMLButtonElement | null>(null)

  const answerOptions = useAnswerOptions(solutionCountry)
  const { increaseCurrentSeries, resetCurrentSeries, highscoreBadges } = useHighscore()

  const onChooseAnswer = (answer: Country) => {
    if (answer.capital === solutionCountry.capital) {
      setGameState((prev) => ({ ...prev, chosenAnswer: answer, quizState: 'correct' }))
      increaseCurrentSeries()
    } else {
      setGameState((prev) => ({ ...prev, chosenAnswer: answer, quizState: 'wrong' }))
      resetCurrentSeries()
    }
  }

  const onClickNext = () => {
    setGameState({
      solutionCountry: pickRandom(countries),
      chosenAnswer: null,
      quizState: 'question',
    })
  }

  return (
    <main>
      <BodyBackground quizState={quizState} />
      <Head>
        <title>Geo Quiz</title>
        <link rel="manifest" href="/manifest.json" />
        <link href="/icon_72x72.png" rel="icon" type="image/png" sizes="72x72" />
        <link href="/icon_144x144.png" rel="icon" type="image/png" sizes="144x144" />
        <link rel="apple-touch-icon" href="/icon_192x192.png"></link>
        <meta name="theme-color" content={bgColors[quizState]} />
      </Head>
      <Center h="100vh" w="100vw" color="white">
        <VStack spacing={6} textAlign="center">
          {highscoreBadges}
          <Heading as="h1" size="4xl" textShadow="2px 2px 0px hotpink, 4px 4px 0px yellow">
            Geo Quiz
            <Heading as="div" mt="5" size="md" textShadow="none">
              Was ist die Hauptstadt von...?
            </Heading>
          </Heading>
          <Heading as="h2" size="xl" textShadow="2px 2px 0px black">
            {solutionCountry.name}
          </Heading>
          <VStack spacing={4} w="100%">
            {answerOptions.map((answerOption) => (
              <AnswerOption
                key={answerOption.capital}
                country={answerOption}
                gameState={gameState}
                handleClickAnswer={quizState === 'question' ? onChooseAnswer : onClickNext}
              />
            ))}
            <Box h="5">
              {quizState === 'question' ? null : (
                <Button
                  autoFocus
                  size="sm"
                  minW="100"
                  ref={nextButtonRef}
                  colorScheme="yellow"
                  onClick={onClickNext}
                >
                  Weiter
                </Button>
              )}
            </Box>
          </VStack>
        </VStack>
      </Center>
    </main>)
}