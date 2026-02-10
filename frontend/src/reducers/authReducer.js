import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginService'
import userService from '../services/userService'
import { setNotification } from './notificationReducer'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null
  },
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

export const updateProfile = (profileData) => {
  return async (dispatch, getState) => {
    try {
      const { auth } = getState()
      
      const updatedUser = await userService.patchMe(profileData)

      const userToSave = { ...updatedUser, token: auth.token }

      dispatch(setUser(userToSave))

      window.localStorage.setItem('loggedAppUser', JSON.stringify(userToSave))

      return updatedUser

    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to update profile'
      dispatch(setNotification(errorMessage))
      throw error
    }
  }
}

export default authSlice.reducer