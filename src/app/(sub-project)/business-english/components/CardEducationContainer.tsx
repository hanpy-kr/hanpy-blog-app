'use client'

import { useEffect, useState } from 'react'
import { CardEducationCard } from './CardEducationCard'
import { EnglishPhrases } from '../service/EnglishPhrases'
import { englishEnum, ItemType } from '../service/types'
import { Box, Button, HStack, Progress, VStack } from '@chakra-ui/react'

export const CardEducationContainer = () => {
  const [sample, setSample] = useState<ItemType>()
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const handleShuffleTrigger = () => {
    const englishPhrases = new EnglishPhrases()
    setSample(
      englishPhrases.getRandomSampleByType(englishEnum.BUSINESS_PATTERN),
    )
  }

  const startAutoShuffle = () => {
    if (!intervalId) {
      const id = setInterval(handleShuffleTrigger, 5000)
      setIntervalId(id)
    } else {
      stopAutoShuffle()
    }
  }

  const stopAutoShuffle = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }

  useEffect(() => {
    handleShuffleTrigger()
  }, [])

  if (!sample) {
    return null
  }
  return (
    <>
      <VStack w={'90%'}>
        <CardEducationCard sample={sample} />
        {intervalId && <Progress w={'100%'} size="xs" isIndeterminate />}
        <HStack w={'100%'}>
          <Button w={'50%'} onClick={startAutoShuffle}>
            Auto-Shuffle
          </Button>
          <Button w={'50%'} onClick={stopAutoShuffle}>
            Stop-Shuffle
          </Button>
        </HStack>
        <Button w={'100%'} onClick={() => handleShuffleTrigger()}>
          Next
        </Button>
      </VStack>
    </>
  )
}
