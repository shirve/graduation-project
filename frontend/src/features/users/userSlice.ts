import { usersClient } from '../../api/AxiosClients'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserViewModel } from '../../models/Users/UserViewModel'
import { UserLoginViewModel } from '../../models/Users/UserLoginViewModel'
import { UserRegisterViewModel } from '../../models/Users/UserRegisterViewModel'
import { AlertViewModel } from '../../models/Alert/AlertViewModel'
import { jwtDecode } from '../../utils/jwtDecode'
import { setAxiosAuthorizationHeaders } from '../../utils/setAxiosAuthorizationHeaders'

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
  UserViewModel | null,
  UserRegisterViewModel,
  { rejectValue: AlertViewModel }
>('users/register', async (userData, thunkAPI) => {
  try {
    const { data } = await usersClient.post('/register', userData)
    setAxiosAuthorizationHeaders(data)
    return jwtDecode(data)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
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
// PUT /api/users/:id/update
export const updateUser = createAsyncThunk<
  UserViewModel,
  UserViewModel,
  { rejectValue: AlertViewModel }
>('users/update', async (userData, thunkAPI) => {
  try {
    const { data } = await usersClient.put(`/${userData._id}/update`, userData)
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
        state.user = initialState.user
        state.loading = initialState.loading
      })
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
