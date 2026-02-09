import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginService'
import userService from '../services/userService'

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})

export const { setUser, clearUser } = authSlice.actions

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
    userService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedAppUser')
    userService.setToken(null)
    dispatch(clearUser())
  }
}

export default authSlice.reducer