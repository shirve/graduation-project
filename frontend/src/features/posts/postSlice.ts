import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'
import { ObjectId } from 'mongoose'
import { Post, PostCreate } from '../../models/Post'
import { RootState } from '../../app/store'

interface IPostsState {
  posts: Post[]
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string | undefined
}

const initialState: IPostsState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new post
export const createPost = createAsyncThunk<
  PostCreate,
  PostCreate,
  { state: RootState }
>('posts/create', async (postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await postService.createPost(postData, token)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Get all posts
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, thunkAPI) => {
    try {
      return await postService.getPosts()
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

// Delete post
export const deletePost = createAsyncThunk<
  ObjectId,
  ObjectId,
  { state: RootState }
>('posts/delete/:id', async (postId: ObjectId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await postService.deletePost(postId, token)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Update post
export const updatePost = createAsyncThunk<Post, Post, { state: RootState }>(
  'posts/update/:id',
  async (updatedData: Post, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.updatePost(updatedData._id!, updatedData, token)
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

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts.push(payload as Post)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.error.message
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.error.message
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = state.posts.map((post) =>
          payload._id === post._id ? payload : post
        )
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.error.message
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = state.posts.filter((post) => post._id !== payload)
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.error.message
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
