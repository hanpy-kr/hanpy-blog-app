import { Box, Center } from '@chakra-ui/react'
import { ReactNode } from 'react'
import styles from './CardEducationLayout.module.css'

export const CardEducationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Center h={'100vh'} w={'100vw'} className={styles.background}>
      {children}
    </Center>
  )
}
