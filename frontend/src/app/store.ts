import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import userReducer from '../features/users/userSlice'
import postReducer from '../features/posts/postSlice'
import projectReducer from '../features/projects/projectSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    projects: projectReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
