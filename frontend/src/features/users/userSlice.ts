import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'
import { UserInfo } from '../../models/User'

interface IUserInfoState {
  user: UserInfo
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string | undefined
}

const initialState: IUserInfoState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user
export const getUser = createAsyncThunk(
  'users/user/:id',
  async (userId: string, thunkAPI) => {
    try {
      return await userService.getUser(userId)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.error.message
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
