import { useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'
import { useDispatch, useSelector } from 'react-redux'
import { syncUserWithBackend, clearUser } from './redux/userSlice'
import Step2 from './components/onboarding/Step2'
import Step3 from './components/onboarding/Step3'

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
    <div className="flex items-center justify-center w-full">
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
          {!profile?.profileCompleted ? (
            !profile?.name ? <Step2 /> : <Step3 />
          ) : (
            <Dashboard />
          )}
        </main>
      </SignedIn>
    </div>
  )
}

export default App