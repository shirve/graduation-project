import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'
import { ObjectId } from 'mongoose'
import { Post, PostCreate } from '../../models/Post'
import { RootState } from '../../app/store'

interface IPostsState {
  posts: Post[]
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

const initialState: IPostsState = {
  posts: [],
  success: false,
  loading: false,
  error: null,
}

// Create new post
export const createPost = createAsyncThunk<
  Post,
  PostCreate,
  { state: RootState; rejectValue: { type: string; message: string } }
>('posts/create', async (postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.createPost(postData, token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Get all posts
export const getPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: { type: string; message: string } }
>('posts/getPosts', async (_, thunkAPI) => {
  try {
    return await postService.getPosts()
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Delete post
export const deletePost = createAsyncThunk<
  ObjectId,
  ObjectId,
  { state: RootState; rejectValue: { type: string; message: string } }
>('posts/delete/:id', async (postId: ObjectId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.deletePost(postId, token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Update post
export const updatePost = createAsyncThunk<
  Post,
  Post,
  { state: RootState; rejectValue: { type: string; message: string } }
>('posts/update/:id', async (updatedData: Post, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.updatePost(updatedData._id, updatedData, token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
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
        state.loading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.posts.push(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.posts = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.posts = state.posts.map((post) =>
          action.payload._id === post._id ? action.payload : post
        )
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.posts = state.posts.filter((post) => post._id !== action.payload)
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
