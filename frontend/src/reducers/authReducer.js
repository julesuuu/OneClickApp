import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/userService'

const authSlice = new createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    setUser(state, aciton) {
      return aciton.payload
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

export default authSlice.reducer