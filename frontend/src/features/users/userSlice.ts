import {
  setAxiosAuthorizationHeaders,
  usersClient,
} from '../../api/AxiosClients'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserViewModel } from '../../models/Users/UserViewModel'
import { UserLoginViewModel } from '../../models/Users/UserLoginViewModel'
import { UserRegisterViewModel } from '../../models/Users/UserRegisterViewModel'
import { UserUpdateViewModel } from '../../models/Users/UserUpdateViewModel'
import { AlertViewModel } from '../../models/Alert/AlertViewModel'
import { ServerValidationErrorViewModel } from '../../models/Errors/ServerValidationErrorViewModel'
import { jwtDecode } from '../../utils/jwtDecode'

interface IAuthState {
  user: UserViewModel | null
  loading: 'idle' | 'pending' | 'fulfilled' | 'failed'
  alert: AlertViewModel | undefined
  serverErrors: ServerValidationErrorViewModel[] | undefined
}

const initialState: IAuthState = {
  user: null,
  loading: 'idle',
  alert: undefined,
  serverErrors: undefined,
}

// Register user
// POST /api/users/register
export const registerUser = createAsyncThunk<
  UserViewModel | null,
  UserRegisterViewModel,
  { rejectValue: ServerValidationErrorViewModel[] }
>('users/register', async (userData, thunkAPI) => {
  try {
    const { data } = await usersClient.post('/register', userData)
    setAxiosAuthorizationHeaders(data)
    return jwtDecode(data)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.errors)
  }
})

// Login user
// POST /api/users/login
export const loginUser = createAsyncThunk<
  UserViewModel | null,
  UserLoginViewModel,
  { rejectValue: AlertViewModel }
>('users/login', async (userData, thunkAPI) => {
  try {
    const { data } = await usersClient.post('/login', userData)
    setAxiosAuthorizationHeaders(data)
    return jwtDecode(data)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Logout user
// POST /api/users/logout
export const logoutUser = createAsyncThunk('users/logout', async () => {
  await usersClient.post('/logout')
})

// Update user
// PUT /api/users
export const updateUser = createAsyncThunk<
  UserViewModel,
  UserUpdateViewModel,
  { rejectValue: AlertViewModel }
>('users/update', async (userData, thunkAPI) => {
  try {
    const { data } = await usersClient.put('/', userData)
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload ? action.payload : initialState.user
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = 'pending'
        state.alert = initialState.alert
        state.serverErrors = initialState.serverErrors
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.alert = initialState.alert
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.serverErrors = action.payload
        state.user = initialState.user
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending'
        state.alert = initialState.alert
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.alert = initialState.alert
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
        state.user = initialState.user
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = initialState.user
        state.loading = initialState.loading
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.alert = {
          type: 'info',
          message: 'Profil zaktualizowano pomyślnie',
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.alert = {
          type: 'error',
          message: 'Oops! Coś poszło nie tak',
        }
      })
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
