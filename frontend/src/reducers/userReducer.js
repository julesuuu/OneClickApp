import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/userService'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendUser(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setUsers, appendUser } = userSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const createNewUser = (userObject) => {
  return async (dispatch) => {
    const newUser = await userService.create(userObject)
    dispatch(appendUser(newUser))
    return newUser
  }
}

export default userSlice.reducer