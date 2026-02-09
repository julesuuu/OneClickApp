import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import authReducer from './reducers/authReducer'

const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer
  }
})

export default store