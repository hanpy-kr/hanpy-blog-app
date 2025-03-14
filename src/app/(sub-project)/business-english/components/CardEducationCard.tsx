import styles from './CardEducationCard.module.css'
import { ItemType } from '../service/types'
import { useEffect, useState } from 'react'
import { Progress } from '@chakra-ui/react'

export const CardEducationCard = ({ sample }: { sample: ItemType }) => {
  const [englishContent, setEnglishContent] = useState('')
  const [koreaContent, setKoreaContent] = useState('')

  const [isView, setIsView] = useState(false)

  useEffect(() => {
    setEnglishContent(sample.en)
    setKoreaContent(sample.ko)
    setIsView(false)
  }, [sample])

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US' // 미국 영어 발음
    speechSynthesis.speak(utterance)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      console.log('Text copied to clipboard:', text)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <>
      <div
        className={styles.card}
        onClick={() => {
          setIsView(true)
        }}
      >
        <div className={styles.question} id="question">
          {koreaContent}
        </div>
        {isView && (
          <div
            className={styles.answer}
            id="answer"
            onClick={() => {
              speak(englishContent)
              copyToClipboard(englishContent)
            }}
          >
            {englishContent}
          </div>
        )}
      </div>
    </>
  )
}
