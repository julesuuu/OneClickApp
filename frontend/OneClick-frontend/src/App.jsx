import { useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'
import { useDispatch, useSelector } from 'react-redux'
import { syncUserWithBackend, clearUser } from './redux/userSlice'
import Step1 from './components/onboarding/Step1'
import Step2 from './components/onboarding/Step2'
import NavBar from './components/NavBar'

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
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-950 dark:bg-gray-900 text-gray-100">
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
          <NavBar />
          <Step1 />
          <Step2 />
        </main>
      </SignedIn>
    </div>
  )
}

export default App