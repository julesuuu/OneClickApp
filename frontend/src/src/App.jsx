import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import { useDispatch, useSelector } from 'react-redux'
import { syncUserWithBackend, clearUser } from './redux/userSlice'
import Landing from './components/pages/Landing'
import Dashboard from './components/pages/Dashboard'
import RequestsPage from './components/pages/RequestsPage'
import NewRequestPage from './components/pages/NewRequestPage'
import AppointmentsPage from './components/pages/AppointmentsPage'
import Parent from './components/pages/onboarding/Parent'

function App() {
  const { isLoaded, isSignedIn, user } = useUser()
  const dispatch = useDispatch()

  const { profile, loading } = useSelector((state) => state.user)

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

  const isProfileIncomplete = isSignedIn && profile && !profile.profileCompleted
  const isProfileComplete = isSignedIn && profile && profile.profileCompleted

  return (
    <div>
      <SignedOut>
        <Landing />
      </SignedOut>

      <SignedIn>
        <Routes>
          <Route path="/profile-completion" element={<Parent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/new-request" element={<NewRequestPage />} />
          <Route 
            path="/" 
            element={
              isProfileIncomplete 
                ? <Navigate to="/profile-completion" replace /> 
                : isProfileComplete 
                  ? <Navigate to="/dashboard" replace />
                  : <Navigate to="/profile-completion" replace />
            } 
          />
        </Routes>
      </SignedIn>
    </div>
  )
}

export default App
