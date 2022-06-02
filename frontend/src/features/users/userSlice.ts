import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserViewModel } from '../../models/Users/UserViewModel'
import { UserLoginViewModel } from '../../models/Users/UserLoginViewModel'
import { UserRegisterViewModel } from '../../models/Users/UserRegisterViewModel'
import { AlertViewModel } from '../../models/Alert/AlertViewModel'
import { jwtDecode } from '../../utils/jwtDecode'
import { setAxiosAuthorizationHeaders } from '../../utils/setAxiosAuthorizationHeaders'

const API_URL = '/api/users/'

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
    const token = await axios
      .post(API_URL + 'register', userData)
      .then((res) => {
        return res.data
      })
    setAxiosAuthorizationHeaders(token)
    return jwtDecode(token)
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
    const token = await axios.post(API_URL + 'login', userData).then((res) => {
      return res.data
    })
    setAxiosAuthorizationHeaders(token)
    return jwtDecode(token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Logout user
// POST /api/users/logout
export const logoutUser = createAsyncThunk('users/logout', async () => {
  await axios.post(API_URL + 'logout')
})

// Update user
// PUT /api/users/:id/update
export const updateUser = createAsyncThunk<
  UserViewModel,
  UserViewModel,
  { rejectValue: AlertViewModel }
>('users/update', async (userData, thunkAPI) => {
  try {
    return await axios
      .put(API_URL + `${userData._id}/update`, userData)
      .then((res) => {
        return res.data
      })
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
