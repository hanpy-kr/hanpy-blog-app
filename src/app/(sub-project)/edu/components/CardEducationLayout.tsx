import type { ReactNode } from 'react'
import styles from './CardEducationLayout.module.css'

export const CardEducationLayout = ({ children }: { children: ReactNode }) => {
  return <div className={styles.background}>{children}</div>
}
