import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/authReducer'

const NavBar = () => {
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch()

  if (!user) return null

  return (
    <nav style={{ padding: '10px', background: '#f4f4f4', display: 'flex', justifyContent: 'space-between' }}>
      <span>OneClick | {user.name}</span>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </nav>
  )
}

export default NavBar