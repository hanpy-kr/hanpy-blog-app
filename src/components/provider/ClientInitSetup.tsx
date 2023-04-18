'use client'
import useI18N from '@/hooks/useI18N'
import { useEffect } from 'react'

const ClientInitSetup = () => {
  const { detecteLngAndSetI18n } = useI18N()
  useEffect(() => {
    detecteLngAndSetI18n()
  }, [])
  return <></>
}

export default ClientInitSetup
