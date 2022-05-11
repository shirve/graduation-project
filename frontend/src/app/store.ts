import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import userReducer from '../features/user/userSlice'
import postReducer from '../features/posts/postSlice'

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    fetchedPosts: postReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
