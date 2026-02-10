import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const syncUserWithBackend = createAsyncThunk(
  'user/sync',
  async ({ email, username }, { rejectWithValue }) => {
    try {
      const token = await window.Clerk.session.getToken()
      
      const response = await axios.post(
        'http://localhost:3001/api/users/sync',
        { email, username },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.profile = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncUserWithBackend.pending, (state) => {
        state.loading = true
      })
      .addCase(syncUserWithBackend.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(syncUserWithBackend.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearUser } = userSlice.actions
export default userSlice.reducer