import { Button } from '@chakra-ui/react'
import { Country } from '../model/countries'
import { GameState } from '../pages'

interface AnswerOptionProps {
  country: Country
  gameState: GameState
  handleClickAnswer: (() => void) | ((country: Country) => void)
}
export function AnswerOption({ country, gameState, handleClickAnswer }: AnswerOptionProps) {
  const background = getAnswerBackground({ country, gameState })

  return (
    <Button
      size="md"
      key={country.name}
      w="100%"
      colorScheme={'blue'}
      borderWidth={4}
      borderColor={background}
      disabled={gameState.quizState !== 'question'}
      _disabled={{ background: 'auto' }}
      onClick={() => handleClickAnswer(country)}
    >
      {country.capital}
    </Button>
  )
}

function getAnswerBackground({
  country: country,
  gameState,
}: Omit<AnswerOptionProps, 'handleClickAnswer'>) {
  const { chosenAnswer, quizState, solutionCountry } = gameState
  if (quizState !== 'question' && country === gameState.solutionCountry) return 'green.800'
  if (quizState === 'question' || chosenAnswer !== country) return 'transparent'

  if (country.capital === solutionCountry.capital) {
    return 'green.800'
  } else {
    return 'red.800'
  }
}
