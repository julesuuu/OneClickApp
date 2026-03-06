import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import { Loader2 } from 'lucide-react'
import { useUserSync } from './hooks/useUserSync'
import Landing from './components/pages/Landing'
import Dashboard from './components/pages/Dashboard'
import RequestsPage from './components/pages/RequestsPage'
import NewRequestPage from './components/pages/NewRequestPage'
import AppointmentsPage from './components/pages/AppointmentsPage'
import SettingsPage from './components/pages/SettingsPage'
import Parent from './components/pages/onboarding/Parent'

function App() {
  const { isLoaded, isSignedIn } = useUser()
  const { profile, loading, clearUser } = useUserSync()

  useEffect(() => {
    if (!isSignedIn) {
      clearUser()
    }
  }, [isSignedIn, clearUser])

  if (!isLoaded || (isSignedIn && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-foreground" />
          <p className="text-foreground">Verifying Student Profile...</p>
        </div>
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
          <Route path="/profile-completion" element={isProfileComplete ? <Navigate to="/dashboard" replace /> : <Parent />} />
          <Route path="/dashboard" element={isProfileIncomplete ? <Navigate to="/profile-completion" replace /> : <Dashboard />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/new-request" element={<NewRequestPage />} />
          <Route 
            path="/" 
            element={
              isProfileIncomplete 
                ? <Navigate to="/profile-completion" replace /> 
                : <Navigate to="/dashboard" replace />
            } 
          />
        </Routes>
      </SignedIn>
    </div>
  )
}

export default App
