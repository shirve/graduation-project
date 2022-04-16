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
  Post,
  PostCreate,
  { state: RootState; rejectValue: string }
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
export const getPosts = createAsyncThunk<Post[], void, { rejectValue: string }>(
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
  { state: RootState; rejectValue: string }
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
export const updatePost = createAsyncThunk<
  Post,
  Post,
  { state: RootState; rejectValue: string }
>('posts/update/:id', async (updatedData: Post, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await postService.updatePost(updatedData._id, updatedData, token)
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts.push(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = state.posts.map((post) =>
          action.payload._id === post._id ? action.payload : post
        )
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = state.posts.filter((post) => post._id !== action.payload)
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
