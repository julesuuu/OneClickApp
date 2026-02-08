import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import { createNewUser } from '../reducers/userReducer'

const RegisterForm = ({ notify }) => {
  const dispatch = useDispatch()

  const { reset: resetName, ...name } = useField('text')
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const { reset: resetEmail, ...email } = useField('email')

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      await dispatch(createNewUser({
        username: username.value,
        name: name.value,
        email: email.value,
        password: password.value
      }))
      notify(`Successfully registered ${username.value}`)

      resetName(); resetUsername(); resetPassword(); resetEmail();
    } catch (error) {
      notify(`Error: ${error.respose?.data?.error || 'Failed to register'}`)
    }
  }

  return (
    <div className='register-box'>
      <h3>Create Account</h3>
      <form onSubmit={handleRegister}>
        <div>name <input {...name} required /></div>
        <div>username <input {...username} required /></div>
        <div>password <input {...password} required /></div>
        <div>email <input {...email} required /></div>
        <button type='submit'>create account</button>
      </form>
    </div>
  )
}

export default RegisterForm