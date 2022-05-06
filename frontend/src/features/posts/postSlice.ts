import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'
import { ObjectId } from 'mongoose'
import { Post, PostData } from '../../models/Post'
import { RootState } from '../../app/store'
import { Alert } from '../../models/Alert'

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

// Get user posts
// GET /api/posts
export const getUserPosts = createAsyncThunk<
  Post[],
  void,
  { state: RootState; rejectValue: Alert }
>('posts', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.getUserPosts(token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Get approved posts
// GET /api/posts/approved
export const getApprovedPosts = createAsyncThunk<
  Post[],
  void,
  { state: RootState; rejectValue: Alert }
>('posts/approved', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.getApprovedPosts(token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Get unapproved posts
// GET /api/posts/unapproved
export const getUnapprovedPosts = createAsyncThunk<
  Post[],
  void,
  { state: RootState; rejectValue: Alert }
>('posts/unapproved', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.getUnapprovedPosts(token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Create new post
// POST /api/posts/create
export const createPost = createAsyncThunk<
  Post,
  PostData,
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
// DELETE /api/posts/:id/delete
export const deletePost = createAsyncThunk<
  { _id: ObjectId },
  ObjectId,
  { state: RootState; rejectValue: Alert }
>('posts/:id/delete', async (postId: ObjectId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.deletePost(postId, token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Update post
// PUT /api/posts/:id/update
export const updatePost = createAsyncThunk<
  Post,
  { postId: ObjectId; data: PostData },
  { state: RootState; rejectValue: Alert }
>('posts/:id/update', async (postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.updatePost(postData.postId, postData.data, token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Approve post
// PATCH /api/posts/:id/approve
export const approvePost = createAsyncThunk<
  Post,
  ObjectId,
  { state: RootState; rejectValue: Alert }
>('posts/:id/approve', async (postId: ObjectId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    return await postService.approvePost(postId, token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Reject post
// PATCH /api/posts/:id/reject
export const rejectPost = createAsyncThunk<
  Post,
  { postId: ObjectId; message: string },
  { state: RootState; rejectValue: Alert }
>('posts/:id/reject', async (postData, thunkAPI) => {
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
    alertReset: (state) => {
      state.alert = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true
        state.alert = null
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.alert = null
        state.posts = action.payload
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.loading = false
        state.alert = action.payload
      })
      .addCase(getApprovedPosts.pending, (state) => {
        state.loading = true
        state.alert = null
      })
      .addCase(getApprovedPosts.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.alert = null
        state.posts = action.payload
      })
      .addCase(getApprovedPosts.rejected, (state, action) => {
        state.loading = false
        state.alert = action.payload
      })
      .addCase(getUnapprovedPosts.pending, (state) => {
        state.loading = true
        state.alert = null
      })
      .addCase(getUnapprovedPosts.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.alert = null
        state.posts = action.payload
      })
      .addCase(getUnapprovedPosts.rejected, (state, action) => {
        state.loading = false
        state.alert = action.payload
      })
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
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload._id
        )
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
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload._id
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
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload._id
        )
      })
      .addCase(rejectPost.rejected, (state, action) => {
        state.loading = false
        state.alert = action.payload
      })
  },
})

export const { reset, alertReset } = postSlice.actions
export default postSlice.reducer
