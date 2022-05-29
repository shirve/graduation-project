import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './userService'
import { UserViewModel } from '../../models/Users/UserViewModel'
import { UserLoginViewModel } from '../../models/Users/UserLoginViewModel'
import { UserRegisterViewModel } from '../../models/Users/UserRegisterViewModel'
import { RootState } from '../../app/store'
import { AlertViewModel } from '../../models/Alert/AlertViewModel'

interface IAuthState {
  user: UserViewModel | null
  loading: 'idle' | 'pending' | 'fulfilled' | 'failed'
  alert: AlertViewModel | undefined | null
}

const initialState: IAuthState = {
  user: null,
  loading: 'idle',
  alert: null,
}

// Register user
// POST /api/users/register
export const registerUser = createAsyncThunk<
  UserViewModel,
  UserRegisterViewModel,
  { rejectValue: AlertViewModel }
>('users/register', async (userData, thunkAPI) => {
  try {
    return await authService.registerUser(userData)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Login user
// POST /api/users/login
export const loginUser = createAsyncThunk<
  UserViewModel,
  UserLoginViewModel,
  { rejectValue: AlertViewModel }
>('users/login', async (userData, thunkAPI) => {
  try {
    return await authService.loginUser(userData)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Logout user
// POST /api/users/logout
export const logoutUser = createAsyncThunk('users/logout', async () => {
  await authService.logoutUser()
})

// Update user
// PUT /api/users/:id/update
export const updateUser = createAsyncThunk<
  UserViewModel,
  UserViewModel,
  { state: RootState; rejectValue: AlertViewModel }
>('users/update', async (userData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user?.token
    return await authService.updateUser(userData, token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: () => initialState,
    alertReset: (state) => {
      state.alert = null
    },
    authenticateUser: (state, action) => {
      state.user = action.payload ? action.payload : null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = 'pending'
        state.alert = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.alert = null
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
        state.user = null
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending'
        state.alert = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.alert = null
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
        state.user = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset, alertReset, authenticateUser } = userSlice.actions
export default userSlice.reducer
