import { useState, useEffect, useContext, createContext } from 'react'
import Cookies from 'js-cookie'

import firebase from './firebase'
import { createUser } from './db'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

function useAuthProvider() {
  const [user, setUser] = useState(null)

  const handleUser = (rawUser) => {
    if(rawUser) {
      const user = formatUser(rawUser)
      const { token, ...userWithoutToken } = user

      createUser(user.uid, userWithoutToken)
      // Set Cookie for redirecting
      Cookies.set('fast-feedback-app', true, {
        expires: 1
      })
      setUser(user)
      return user
    } else {
      Cookies.remove('fast-feedback-app')
      setUser(false)
      return false
    }
  }

  const signinWithGithub = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider()

    return firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((response) => handleUser(response.user))
  }

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => handleUser(user))

    return () => unsubscribe()
  }, [])

  return {
    user,
    signinWithGithub,
    signout,
  }
}

const formatUser = user => ({
  uid: user.uid,
  name: user.displayName,
  email: user.email,
  token: user.ya,
  provider: user.providerData[0].providerId,
  photoUrl: user.photoURL
})
