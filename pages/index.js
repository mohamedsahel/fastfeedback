import Head from 'next/head'
import { Button, Flex, Icon } from '@chakra-ui/react'

import { useAuth } from '@/lib/auth'

export default function Home() {
  const auth = useAuth()

  return (
    <Flex
      as='main'
      direction='column'
      align='center'
      justify='center'
      h='100vh'>
      <Head>
        <title>Fast Feedback</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-app')) {
            window.location.href = "/dashboard"
          }
        `,
          }}
        />
      </Head>

      <Icon color='black' name='logo' size='64px' />
      {auth.user ? (
        <Button as='a' href='/dashboard'>
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size='sm' onClick={(e) => auth.signinWithGithub()}>
          Sign In
        </Button>
      )}
    </Flex>
  )
}
