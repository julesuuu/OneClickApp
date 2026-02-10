import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/authReducer'
import userService from './services/userService'
import RegisterStep1 from './components/RegisterStep1'
import RegisterStep2 from './components/RegisterStep2'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth?.user)
  const notification = useSelector(state => state.notification)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      userService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    if (user && user.token) {
      if (!user.name) navigate('/setup/step2')
      else if (!user.course) navigate('/setup/step3')
      else navigate('/dashboard')
    }
  }, [user, navigate])


  return (
    <div>
      <NavBar />
      {notification && <div className='notification'>{notification}</div>}
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<RegisterStep1 />} />

        <Route path='/setup/step2' element={user ? <RegisterStep2 /> : <Navigate to='/login' />} />
        <Route path='/setup/step3' element={user ? <RegisterStep3 /> : <Navigate to='/login' />} />
        <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login' />} />

        <Route path='/' element={<Navigate to='/login' />} />
      </Routes>
    </div>
  )
}

export default App
