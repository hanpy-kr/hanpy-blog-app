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
          <div className={styles.answer} id="answer">
            {englishContent}
          </div>
        )}
      </div>
    </>
  )
}
