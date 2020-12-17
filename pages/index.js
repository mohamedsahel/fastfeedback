import Head from 'next/head'
import { useEffect } from 'react'

import styles from '../styles/Home.module.css'
import { useAuth } from '../lib/auth'


export default function Home() {
  const auth = useAuth()

  useEffect(() => {
    console.log(auth)
  }, [auth])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Fast Feedback
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
        {
          !auth.user && <button onClick={() => auth?.signinWithGithub()} >Signin With Github</button>
        }
        <div> {auth.user ? auth.user.email : 'Not Authenticated'} </div>
        {
          auth.user && <button onClick={() => auth.signout()} >signout</button>
        }
      </main>
    </div>
  )
}
