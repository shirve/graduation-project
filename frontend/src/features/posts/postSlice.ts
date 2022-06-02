import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { ObjectId } from 'mongoose'
import { PostViewModel } from '../../models/Posts/PostViewModel'
import { PostDataViewModel } from '../../models/Posts/PostDataViewModel'
import { PaginatedPostsViewModel } from '../../models/Posts/PaginatedPostsViewModel'
import { PaginationViewModel } from '../../models/Pagination/PaginationViewModel'
import { AlertViewModel } from '../../models/Alert/AlertViewModel'

const API_URL = '/api/posts/'

interface IPostsState {
  posts: PostViewModel[]
  pagination: PaginationViewModel
  loading: 'idle' | 'pending' | 'fulfilled' | 'failed'
  alert: AlertViewModel | undefined | null
}

const initialState: IPostsState = {
  posts: [],
  pagination: {
    page: 0,
    limit: 10,
    totalPages: 1,
  },
  loading: 'idle',
  alert: null,
}

// Get user posts
// GET /api/posts
export const getUserPosts = createAsyncThunk<
  PostViewModel[],
  void,
  { state: RootState; rejectValue: AlertViewModel }
>('posts/userPosts', async (_, thunkAPI) => {
  try {
    return await axios.get(API_URL).then((res) => {
      return res.data
    })
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Get approved posts
// GET /api/posts/approved?page=number&limit=number&genre=string
export const getApprovedPosts = createAsyncThunk<
  PaginatedPostsViewModel,
  { page?: number; limit?: number; genre?: string },
  { state: RootState; rejectValue: AlertViewModel }
>('posts/approved', async (pagination, thunkAPI) => {
  try {
    const config = {
      params: { ...pagination },
    }

    return await axios.get(API_URL + 'approved', config).then((res) => {
      return res.data
    })
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Get unapproved posts
// GET /api/posts/unapproved
export const getUnapprovedPosts = createAsyncThunk<
  PostViewModel[],
  void,
  { state: RootState; rejectValue: AlertViewModel }
>('posts/unapproved', async (_, thunkAPI) => {
  try {
    return await axios.get(API_URL + 'unapproved').then((res) => {
      return res.data
    })
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Create new post
// POST /api/posts/create
export const createPost = createAsyncThunk<
  AlertViewModel,
  PostDataViewModel,
  { state: RootState; rejectValue: AlertViewModel }
>('posts/create', async (postData, thunkAPI) => {
  try {
    return await axios
      .post(API_URL + 'create', { data: postData })
      .then((res) => {
        return res.data
      })
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Delete post
// DELETE /api/posts/:id/delete
export const deletePost = createAsyncThunk<
  { _id: ObjectId },
  ObjectId,
  { state: RootState; rejectValue: AlertViewModel }
>('posts/delete', async (postId, thunkAPI) => {
  try {
    return await axios.delete(API_URL + `${postId}/delete`).then((res) => {
      return res.data
    })
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Update post
// PUT /api/posts/:id/update
export const updatePost = createAsyncThunk<
  PostViewModel,
  { postId: ObjectId; data: PostDataViewModel },
  { state: RootState; rejectValue: AlertViewModel }
>('posts/update', async (postData, thunkAPI) => {
  try {
    return await axios
      .put(API_URL + `${postData.postId}/update`, { data: postData.data })
      .then((res) => {
        return res.data
      })
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Approve post
// PATCH /api/posts/:id/approve
export const approvePost = createAsyncThunk<
  PostViewModel,
  ObjectId,
  { state: RootState; rejectValue: AlertViewModel }
>('posts/approve', async (postId, thunkAPI) => {
  try {
    return await axios.patch(API_URL + `${postId}/approve`).then((res) => {
      return res.data
    })
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Reject post
// PATCH /api/posts/:id/reject
export const rejectPost = createAsyncThunk<
  PostViewModel,
  { postId: ObjectId; message: string },
  { state: RootState; rejectValue: AlertViewModel }
>('posts/reject', async (postData, thunkAPI) => {
  try {
    return await axios
      .patch(API_URL + `${postData.postId}/reject`, {
        message: postData.message,
      })
      .then((res) => {
        return res.data
      })
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Like post
// PATCH /api/posts/:id/like
export const likePost = createAsyncThunk<
  PostViewModel,
  ObjectId,
  { state: RootState; rejectValue: AlertViewModel }
>('posts/like', async (postId, thunkAPI) => {
  try {
    return await axios.patch(API_URL + `${postId}/like`).then((res) => {
      return res.data
    })
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.page = action.payload
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
        state.alert = null
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.alert = action.payload
      })
      .addCase(createPost.rejected, (state, action) => {
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
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          action.payload._id === post._id ? action.payload : post
        )
      })
  },
})

export const { setPage } = postSlice.actions
export default postSlice.reducer
