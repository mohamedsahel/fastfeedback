import { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase'

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
      setUser(user)
      return user
    } else {
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
  provider: user.providerData[0].providerId
})
