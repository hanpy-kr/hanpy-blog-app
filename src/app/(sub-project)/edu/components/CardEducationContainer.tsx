'use client'

import { useEffect, useState } from 'react'
import { CardEducationCard } from './CardEducationCard'
import { EnglishPhrases } from '../service/EnglishPhrases'
import { englishEnum, ItemType } from '../service/types'
import { Box, Button, HStack, Progress, VStack } from '@chakra-ui/react'

const englishPhrases = new EnglishPhrases()

export const CardEducationContainer = () => {
  const [sample, setSample] = useState<ItemType>()
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [isRandom, setIsRandom] = useState<Boolean>(false)

  const handleShuffleTrigger = () => {
    if (isRandom) {
      setSample(
        englishPhrases.getRandomSampleByType(englishEnum.BUSINESS_PATTERN),
      )
    } else {
      setSample(
        englishPhrases.getOrderSampleByType(englishEnum.BUSINESS_PATTERN),
      )
    }
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

  const setRandom = () => {
    setIsRandom(true)
  }
  const setNonRandom = () => {
    setIsRandom(false)
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
        <HStack w={'100%'}>
          <Button w={'50%'} onClick={setRandom}>
            Random
          </Button>
          <Button w={'50%'} onClick={setNonRandom}>
            Non-Random
          </Button>
        </HStack>
        <Button w={'100%'} onClick={() => handleShuffleTrigger()}>
          Next
        </Button>
      </VStack>
    </>
  )
}
