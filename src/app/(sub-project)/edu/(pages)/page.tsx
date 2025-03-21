'use client'

import { Button } from '@chakra-ui/react'

export default function EnglishHome() {
  const goBusiness = () => {
    window.location.href = '/edu/business-english'
  }
  return (
    <>
      <Button onClick={() => goBusiness()}>Business English</Button>
    </>
  )
}
