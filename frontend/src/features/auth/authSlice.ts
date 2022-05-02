import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import { User, UserLogin, UserRegister } from '../../models/User'
import { RootState } from '../../app/store'
import { Alert } from '../../models/Alert'

const user = JSON.parse(localStorage.getItem('user')!)

interface IAuthState {
  user: User | null
  success: boolean
  loading: boolean
  alert: Alert | undefined | null
}

const initialState: IAuthState = {
  user: user ? user : null,
  success: false,
  loading: false,
  alert: null,
}

// Register user
// POST /api/users/register
export const registerUser = createAsyncThunk<
  User,
  UserRegister,
  { rejectValue: Alert }
>('auth/register', async (user: UserRegister, thunkAPI) => {
  try {
    return await authService.registerUser(user)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Login user
// POST /api/users/login
export const loginUser = createAsyncThunk<
  User,
  UserLogin,
  { rejectValue: Alert }
>('auth/login', async (user: UserLogin, thunkAPI) => {
  try {
    return await authService.loginUser(user)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Update user
// PUT /api/users/:id
export const updateUser = createAsyncThunk<
  User,
  User,
  { state: RootState; rejectValue: Alert }
>('users/update/:id', async (updatedData: User, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await authService.updateUser(updatedData._id!, updatedData, token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Logout user
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await authService.logoutUser()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.alert = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.alert = null
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.alert = action.payload
        state.user = null
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.alert = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.alert = null
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.alert = action.payload
        state.user = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
