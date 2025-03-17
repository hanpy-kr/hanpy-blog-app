'use client'

import { Button, Heading, Stack, Text } from '@chakra-ui/react'

import styles from './NotFoundContainer.module.scss'

const NotFoundContainer = () => {
  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <hr style={{ width: '640px', border: '0.1px solid gray' }} />
          <div>
            <Stack spacing={6} align={'center'}>
              <Heading as="h3" size="lg">
                Page Not Found
              </Heading>
              <Text size="md" width={'40%'} textAlign={'left'}>
                Oops! The page you are looking for doesn't exist or may have
                been moved. Please check the URL or navigate back to the
                homepage.
              </Text>
              {/* <Text size="md" textAlign={'left'}>
                If you believe this is an error, please contact our support team
                for assistance.
              </Text> */}
              {/* <Heading as="h4" size="md">
                DEEPBRAINAI
              </Heading> */}
            </Stack>
          </div>

          <Button
            className={styles.box}
            colorScheme="gray"
            onClick={() => goHome()}
          >
            GO HOME
          </Button>

          <hr style={{ width: '640px', border: '0.1px solid gray' }} />

          {/* <Button className={styles.box} colorScheme="teal" onClick={goSupport}>
        Contact Support
      </Button>
      <Button className={styles.box} colorScheme="teal" onClick={goDocs}>
        Documentation
      </Button> */}
        </div>
      </main>
    </>
  )
}

export default NotFoundContainer
