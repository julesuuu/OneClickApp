import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/authReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(login({
        username: username.value,
        password: password.value
      }))
      resetUsername(); resetPassword();
    } catch (error) {
      dispatch(setNotification(error.errors[0].message))
    }
  }

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>username <input {...username} /></div>
        <div>password <input {...password} /></div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm