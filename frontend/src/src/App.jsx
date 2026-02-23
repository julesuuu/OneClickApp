import { useEffect } from 'react'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import { useDispatch, useSelector } from 'react-redux'
import { syncUserWithBackend, clearUser } from './redux/userSlice'
import Landing from './components/pages/Landing'
import Dashboard from './components/pages/Dashboard'

function App() {
  const { isLoaded, isSignedIn, user } = useUser()
  const dispatch = useDispatch()

  const { loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (isSignedIn && user) {
      dispatch(
        syncUserWithBackend({
          email: user.primaryEmailAddress.emailAddress,
          username: user.username || user.firstName,
        })
      )
    } else if (!isSignedIn) {
      dispatch(clearUser())
    }
  }, [isSignedIn, user, dispatch])

  if (!isLoaded || (isSignedIn && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Verifying Student Profile...</p>
      </div>
    )
  }

  return (
    <div>
      <SignedOut>
        <Landing />
      </SignedOut>

      <SignedIn>
        <Dashboard />
      </SignedIn>
    </div>
  )
}

export default App
