import { useState } from 'react'
import RegisterForm from './components/RegisterForm'

function App() {
  const [notification, setNotification] = useState(null)

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <div className='app-hub'>
      <h1>OneClick App</h1>
      {notification && <div className='toast'>{notification}</div>}
      <RegisterForm notify={notify} />
    </div>
  )
}

export default App
