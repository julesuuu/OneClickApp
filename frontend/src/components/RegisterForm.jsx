import { useState } from 'react'

const RegisterForm = ({ createUser }) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createUser({ username, name, email, password })

    setUsername('')
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className='form-container'>
      <h3>Create Account</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
          />
        </div>
        <div>
          username <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>
        <div>
          password <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <div>
          email <input
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            required
          />
        </div>
        <button type='submit'>create account</button>
      </form>
    </div>
  )
}

export default RegisterForm