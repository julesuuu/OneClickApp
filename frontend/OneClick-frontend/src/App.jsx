import { useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'
import { useDispatch, useSelector } from 'react-redux'
import { syncUserWithBackend, clearUser } from './redux/userSlice'
import NavBar from './components/ui/NavBar'
import Parent from './components/onboarding/Parent'

function App() {
  const { isLoaded, isSignedIn, user } = useUser()
  const dispatch = useDispatch()

  const { profile, loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (isSignedIn && user) {
      dispatch(syncUserWithBackend({
        email: user.primaryEmailAddress.emailAddress,
        username: user.username || user.firstName
      }))
    } else if (!isSignedIn) {
      dispatch(clearUser())
    }
  }, [isSignedIn, user, dispatch])

  if (!isLoaded || (isSignedIn && loading)) {
    return <div className='loading-screen'>Verifiying Student Profile...</div>
  }
  return (
    <div>
      <SignedOut>
        <div className="landing">
          <h1>OneClick App</h1>
          <p>Login with your school email to begin.</p>
          <SignInButton mode="modal" className="btn-primary" />
          <SignUpButton />
        </div>
      </SignedOut>

      <SignedIn>
        <main>
          <Parent />
        </main>
      </SignedIn>
    </div>
  )
}

export default App