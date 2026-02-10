import { useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'
import { useDispatch, useSelector } from 'react-redux'
import { syncUserWithBackend, clearUser } from './redux/userSlice'
import Step2 from './components/onboarding/Step2'

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
    <div className="container">
      <SignedOut>
        <div className="landing">
          <h1>OneClick Enrollment System</h1>
          <p>Login with your school email to begin.</p>
          <SignInButton mode="modal" className="btn-primary" />
          <SignUpButton />
        </div>
      </SignedOut>

      <SignedIn>
        <nav>
          <p>Welcome, {user?.firstName}!</p>
          <UserButton afterSignOutUrl="/" />
        </nav>

        <main>
          {!profile?.profileCompleted ? (
            <section className="onboarding-flow">
              <Step2 />

              <button className="btn-next">Start Profile Setup</button>
            </section>
          ) : (
            <section className="dashboard">
              <h2>Student Dashboard</h2>
              <p>Status: {profile.isValidated ? "✅ Validated" : "⏳ Pending Validation"}</p>

            </section>
          )}
        </main>
      </SignedIn>
    </div>
  )
}

export default App