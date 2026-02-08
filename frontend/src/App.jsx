import { useState } from 'react'
import RegisterForm from './components/RegisterForm'
import userService from './services/userService'

function App() {
  const [message, setMessage] = useState(null)

  const addUser = async (userObject) => {
    try {
      const returnedUser = await userService.create(userObject)
      setMessage(`User ${returnedUser.username} created successfully`)
      setTimeout(() => setMessage(null), 5000)
    }
    catch (error) {
      const errorMsg = error.respose?.data?.error || 'Could not create user'
      setMessage(`Error ${errorMsg}`)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <div className='container'>
      <h1>OneClick App</h1>
      {message && <div className='notification'>{message}</div>}
      <RegisterForm createUser={addUser} />
    </div>
  )
}

export default App
