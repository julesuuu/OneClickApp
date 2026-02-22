import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './components/ui/theme-provider'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <Router>
          <ThemeProvider defaultTheme="light" storageKey="oneclick-theme">
            <App />
          </ThemeProvider>
        </Router>
      </Provider>
    </ClerkProvider>
  </StrictMode>
)
