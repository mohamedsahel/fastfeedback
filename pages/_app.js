import { ChakraProvider, CSSReset } from '@chakra-ui/react'

import { AuthProvider } from '@/lib/auth'
import theme from '@/styles/theme'


const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme} >
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default App
