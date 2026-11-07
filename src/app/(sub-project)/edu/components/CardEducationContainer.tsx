'use client'

import { useEffect, useRef, useState } from 'react'
import { CardEducationCard } from './CardEducationCard'
import { EnglishPhrases } from '../service/EnglishPhrases'
import { englishEnum, type ItemType } from '../service/types'
import styles from './CardEducationContainer.module.css'

const englishPhrases = new EnglishPhrases()

export const CardEducationContainer = () => {
  const [sample, setSample] = useState<ItemType>()
  const [autoShuffle, setAutoShuffle] = useState(false)
  const [isRandom, setIsRandom] = useState(false)
  // setInterval 콜백이 항상 최신 isRandom을 읽도록 ref로 들고 있는다
  const randomRef = useRef(isRandom)
  randomRef.current = isRandom

  const next = () => {
    setSample(
      randomRef.current
        ? englishPhrases.getRandomSampleByType(englishEnum.BUSINESS_PATTERN)
        : englishPhrases.getOrderSampleByType(englishEnum.BUSINESS_PATTERN),
    )
  }

  useEffect(() => {
    next()
  }, [])

  useEffect(() => {
    if (!autoShuffle) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [autoShuffle])

  if (!sample) return null

  return (
    <div className={styles.stack}>
      <CardEducationCard sample={sample} />
      {autoShuffle && <div className={styles.progress} role="progressbar" aria-label="자동 넘김 중" />}
      <div className={styles.row}>
        <button type="button" className={styles.button} onClick={() => setAutoShuffle((v) => !v)}>
          Auto-Shuffle
        </button>
        <button type="button" className={styles.button} onClick={() => setAutoShuffle(false)}>
          Stop-Shuffle
        </button>
      </div>
      <div className={styles.row}>
        <button type="button" className={styles.button} aria-pressed={isRandom} onClick={() => setIsRandom(true)}>
          Random
        </button>
        <button type="button" className={styles.button} aria-pressed={!isRandom} onClick={() => setIsRandom(false)}>
          Non-Random
        </button>
      </div>
      <button type="button" className={styles.button} onClick={next}>
        Next
      </button>
    </div>
  )
}
