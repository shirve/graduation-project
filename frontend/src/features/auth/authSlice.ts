import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import { User, UserLogin, UserRegister } from '../../models/User'
import { RootState } from '../../app/store'

const user = JSON.parse(localStorage.getItem('user')!)

interface IAuthState {
  user: User | null
  success: boolean
  loading: boolean
  error:
    | {
        type: string
        message: string
      }
    | undefined
    | null
}

const initialState: IAuthState = {
  user: user ? user : null,
  success: false,
  loading: false,
  error: null,
}

// Register user
export const register = createAsyncThunk<
  User,
  UserRegister,
  { rejectValue: { type: string; message: string } }
>('auth/register', async (user: UserRegister, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Login user
export const login = createAsyncThunk<
  User,
  UserLogin,
  { rejectValue: { type: string; message: string } }
>('auth/login', async (user: UserLogin, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

// Update user
export const updateUser = createAsyncThunk<
  User,
  User,
  { state: RootState; rejectValue: { type: string; message: string } }
>('users/update/:id', async (updatedData: User, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await authService.updateUser(updatedData._id!, updatedData, token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
