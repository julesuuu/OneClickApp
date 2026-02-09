import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, logout } from './reducers/authReducer'
import userService from './services/userService'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      userService.setToken(user.token)
    }
  }, [dispatch])

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='app-hub'>
      <h1>OneClick App</h1>
      {notification && <div className='toast'>{notification}</div>}
      <LoginForm notify={notify} />
      <button onClick={handleLogout}>logout</button>
      <RegisterForm notify={notify} />
    </div>
  )
}

export default App
