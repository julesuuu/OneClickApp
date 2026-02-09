import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/authReducer'

const LoginForm = ({ notify }) => {
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
      notify(`Error: ${error.response?.data?.error || 'Wrong credentials'}`)
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