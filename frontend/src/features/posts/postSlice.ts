import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'
import { ObjectId } from 'mongoose'
import { Post, PostCreate } from '../../models/Post'
import { RootState } from '../../app/store'
import { Alert } from '../../models/Alert'
import { Message } from 'yup/lib/types'

interface IPostsState {
  posts: Post[]
  success: boolean
  loading: boolean
  alert: Alert | undefined | null
}

const initialState: IPostsState = {
  posts: [],
  success: false,
  loading: false,
  alert: null,
}

// Get posts
// GET /api/posts
export const getPosts = createAsyncThunk<Post[], void, { rejectValue: Alert }>(
  'posts/getPosts',
  async (_, thunkAPI) => {
    try {
      return await postService.getPosts()
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Create new post
// POST /api/posts/create
export const createPost = createAsyncThunk<
  Post,
  PostCreate,
  { state: RootState; rejectValue: Alert }
>('posts/create', async (postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.createPost(postData, token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Delete post
// DELETE /api/posts/delete/:id
export const deletePost = createAsyncThunk<
  ObjectId,
  ObjectId,
  { state: RootState; rejectValue: Alert }
>('posts/delete/:id', async (postId: ObjectId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.deletePost(postId, token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Update post
// PUT /api/posts/update/:id
export const updatePost = createAsyncThunk<
  Post,
  Post,
  { state: RootState; rejectValue: Alert }
>('posts/update/:id', async (updatedData: Post, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.updatePost(updatedData._id, updatedData, token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Approve post
// PATCH /api/posts/approve/:id
export const approvePost = createAsyncThunk<
  Post,
  ObjectId,
  { state: RootState; rejectValue: Alert }
>('posts/approve/:id', async (postId: ObjectId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.approvePost(postId, token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Reject post
// PATCH /api/posts/reject/:id
export const rejectPost = createAsyncThunk<
  Post,
  { postId: ObjectId; message: string },
  { state: RootState; rejectValue: Alert }
>('posts/reject/:id', async (postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.rejectPost(
      postData.postId,
      postData.message,
      token
    )
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
        state.alert = null
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.alert = {
          type: 'info',
          message:
            'Post dodany pomyślnie. Przekazano do zatwierdzenia przez administratora.',
        }
        state.posts.push(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false
        state.alert = action.payload
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true
        state.alert = null
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.alert = null
        state.posts = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false
        state.alert = action.payload
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true
        state.alert = null
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.alert = null
        state.posts = state.posts.map((post) =>
          action.payload._id === post._id ? action.payload : post
        )
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false
        state.alert = action.payload
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true
        state.alert = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.alert = null
        state.posts = state.posts.filter((post) => post._id !== action.payload)
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false
        state.alert = action.payload
      })
      .addCase(approvePost.pending, (state) => {
        state.loading = true
        state.alert = null
      })
      .addCase(approvePost.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.alert = null
        state.posts = state.posts.map((post) =>
          action.payload._id === post._id ? action.payload : post
        )
      })
      .addCase(approvePost.rejected, (state, action) => {
        state.loading = false
        state.alert = action.payload
      })
      .addCase(rejectPost.pending, (state) => {
        state.loading = true
        state.alert = null
      })
      .addCase(rejectPost.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.alert = null
        state.posts = state.posts.map((post) =>
          action.payload._id === post._id ? action.payload : post
        )
      })
      .addCase(rejectPost.rejected, (state, action) => {
        state.loading = false
        state.alert = action.payload
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
