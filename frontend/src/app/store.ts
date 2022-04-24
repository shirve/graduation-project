import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/posts/postSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
