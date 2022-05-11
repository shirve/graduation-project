import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'
import { ObjectId } from 'mongoose'
import {
  PaginatedPosts,
  PaginationData,
  Post,
  PostData,
} from '../../models/Post'
import { RootState } from '../../app/store'
import { Alert } from '../../models/Alert'

interface IPostsState {
  posts: Post[]
  pagination: PaginationData
  loading: 'idle' | 'pending' | 'fulfilled' | 'failed'
  alert: Alert | undefined | null
}

const initialState: IPostsState = {
  posts: [],
  pagination: {
    totalPosts: null,
    totalPages: null,
    prevPage: null,
    nextPage: null,
  },
  loading: 'idle',
  alert: null,
}

// Get user posts
// GET /api/posts
export const getUserPosts = createAsyncThunk<
  Post[],
  void,
  { state: RootState; rejectValue: Alert }
>('posts/userPosts', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().currentUser.user?.token
    return await postService.getUserPosts(token)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Get approved posts
// GET /api/posts/approved?page=number&size=number&genre=string
export const getApprovedPosts = createAsyncThunk<
  PaginatedPosts,
  { page?: number; size?: number; genre?: string },
  { state: RootState; rejectValue: Alert }
>('posts/approved', async (pagination, thunkAPI) => {
  try {
    return await postService.getApprovedPosts(
      pagination.page,
      pagination.size,
      pagination.genre
    )
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
    const token = thunkAPI.getState().currentUser.user?.token
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
    const token = thunkAPI.getState().currentUser.user?.token
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
>('posts/delete', async (postId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().currentUser.user?.token
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
>('posts/update', async (postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().currentUser.user?.token
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
>('posts/approve', async (postId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().currentUser.user?.token
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
>('posts/reject', async (postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().currentUser.user?.token
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
  name: 'posts',
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
        state.loading = 'pending'
        state.alert = null
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.alert = null
        state.posts = action.payload
        state.pagination = initialState.pagination
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(getApprovedPosts.pending, (state) => {
        state.loading = 'pending'
        state.alert = null
      })
      .addCase(getApprovedPosts.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.alert = null
        state.posts = action.payload.posts
        state.pagination = action.payload.pagination
      })
      .addCase(getApprovedPosts.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(getUnapprovedPosts.pending, (state) => {
        state.loading = 'pending'
        state.alert = null
      })
      .addCase(getUnapprovedPosts.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.alert = null
        state.posts = action.payload
        state.pagination = initialState.pagination
      })
      .addCase(getUnapprovedPosts.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(createPost.pending, (state) => {
        state.loading = 'pending'
        state.alert = null
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.alert = {
          type: 'info',
          message:
            'Post dodany pomyślnie. Przekazano do zatwierdzenia przez administratora.',
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = 'pending'
        state.alert = null
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.alert = null
        state.posts = state.posts.map((post) =>
          action.payload._id === post._id ? action.payload : post
        )
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = 'pending'
        state.alert = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.alert = null
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload._id
        )
        state.pagination.totalPosts = state.pagination.totalPosts
          ? state.pagination.totalPosts - 1
          : state.pagination.totalPosts
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(approvePost.pending, (state) => {
        state.loading = 'pending'
        state.alert = null
      })
      .addCase(approvePost.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.alert = null
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload._id
        )
      })
      .addCase(approvePost.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(rejectPost.pending, (state) => {
        state.loading = 'pending'
        state.alert = null
      })
      .addCase(rejectPost.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.alert = null
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload._id
        )
      })
      .addCase(rejectPost.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
  },
})

export const { reset, alertReset } = postSlice.actions
export default postSlice.reducer
