import { postsClient } from '../../api/AxiosClients'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ObjectId } from 'mongoose'
import { PostViewModel } from '../../models/Posts/PostViewModel'
import { PostDataViewModel } from '../../models/Posts/PostDataViewModel'
import { PaginatedPostsViewModel } from '../../models/Posts/PaginatedPostsViewModel'
import { PaginationViewModel } from '../../models/Pagination/PaginationViewModel'
import { AlertViewModel } from '../../models/Alert/AlertViewModel'

interface IPostsState {
  posts: PostViewModel[]
  pagination: PaginationViewModel
  loading: 'idle' | 'pending' | 'fulfilled' | 'failed'
  alert: AlertViewModel | undefined
}

const initialState: IPostsState = {
  posts: [],
  pagination: {
    page: 0,
    limit: 10,
    totalPages: 1,
  },
  loading: 'idle',
  alert: undefined,
}

// Get user posts
// GET /api/posts
export const getUserPosts = createAsyncThunk<
  PostViewModel[],
  void,
  { rejectValue: AlertViewModel }
>('posts/userPosts', async (_, thunkAPI) => {
  try {
    const { data } = await postsClient.get('/')
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Get approved posts
// GET /api/posts/approved?page=number&limit=number&genre=string&user=string
export const getApprovedPosts = createAsyncThunk<
  PaginatedPostsViewModel,
  { page?: number; limit?: number; genre?: string; user?: string } | undefined,
  { rejectValue: AlertViewModel }
>('posts/approved', async (pagination, thunkAPI) => {
  try {
    const { data } = await postsClient.get('/approved', {
      params: { ...pagination },
    })
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Get unapproved posts
// GET /api/posts/unapproved
export const getUnapprovedPosts = createAsyncThunk<
  PostViewModel[],
  void,
  { rejectValue: AlertViewModel }
>('posts/unapproved', async (_, thunkAPI) => {
  try {
    const { data } = await postsClient.get('/unapproved')
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Get post details
// GET /api/posts/:id
export const getPostDetails = createAsyncThunk<
  PostViewModel[],
  string,
  { rejectValue: AlertViewModel }
>('posts/details', async (postId, thunkAPI) => {
  try {
    const { data } = await postsClient.get(`/${postId}`)
    const arr = []
    arr.push(data)
    return arr
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Create post
// POST /api/posts
export const createPost = createAsyncThunk<
  AlertViewModel,
  PostDataViewModel,
  { rejectValue: AlertViewModel }
>('posts/create', async (postData, thunkAPI) => {
  try {
    const { data } = await postsClient.post('/', { data: postData })
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Update post
// PUT /api/posts/:id
export const updatePost = createAsyncThunk<
  { post: PostViewModel; alert: AlertViewModel },
  { postId: ObjectId; data: PostDataViewModel },
  { rejectValue: AlertViewModel }
>('posts/update', async (postData, thunkAPI) => {
  try {
    const { data } = await postsClient.put(`/${postData.postId}`, {
      data: postData.data,
    })
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Delete post
// DELETE /api/posts/:id
export const deletePost = createAsyncThunk<
  { postId: ObjectId; alert: AlertViewModel },
  ObjectId,
  { rejectValue: AlertViewModel }
>('posts/delete', async (postId, thunkAPI) => {
  try {
    const { data } = await postsClient.delete(`/${postId}`)
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Approve post
// PATCH /api/posts/:id/approve
export const approvePost = createAsyncThunk<
  { postId: ObjectId; alert: AlertViewModel },
  ObjectId,
  { rejectValue: AlertViewModel }
>('posts/approve', async (postId, thunkAPI) => {
  try {
    const { data } = await postsClient.patch(`/${postId}/approve`)
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Reject post
// PATCH /api/posts/:id/reject
export const rejectPost = createAsyncThunk<
  { postId: ObjectId; alert: AlertViewModel },
  { postId: ObjectId; message: string },
  { rejectValue: AlertViewModel }
>('posts/reject', async (postData, thunkAPI) => {
  try {
    const { data } = await postsClient.patch(`/${postData.postId}/reject`, {
      message: postData.message,
    })
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Like post
// PATCH /api/posts/:id/like
export const likePost = createAsyncThunk<
  PostViewModel,
  ObjectId,
  { rejectValue: AlertViewModel }
>('posts/like', async (postId, thunkAPI) => {
  try {
    const { data } = await postsClient.patch(`/${postId}/like`)
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Apply to contribute
// PATCH /api/posts/:id/contributors
export const applyToContribute = createAsyncThunk<
  { post: PostViewModel; alert: AlertViewModel },
  { postId: ObjectId; message: string },
  { rejectValue: AlertViewModel }
>('posts/contributors', async (postData, thunkAPI) => {
  try {
    const { data } = await postsClient.patch(
      `/${postData.postId}/contributors`,
      { message: postData.message }
    )
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Approve contributor
// PATCH /api/posts/:postId/contributors/:contributorId/approve
export const approveContributor = createAsyncThunk<
  PostViewModel,
  { postId: ObjectId; contributorId: ObjectId },
  { rejectValue: AlertViewModel }
>('posts/contributors/approve', async (postData, thunkAPI) => {
  try {
    const { data } = await postsClient.patch(
      `/${postData.postId}/contributors/${postData.contributorId}/approve`
    )
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Reject contributor
// PATCH /api/posts/:postId/contributors/:contributorId/reject
export const rejectContributor = createAsyncThunk<
  PostViewModel,
  { postId: ObjectId; contributorId: ObjectId },
  { rejectValue: AlertViewModel }
>('posts/contributors/reject', async (postData, thunkAPI) => {
  try {
    const { data } = await postsClient.patch(
      `/${postData.postId}/contributors/${postData.contributorId}/reject`
    )
    return data
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
    resetPagination: (state) => {
      state.pagination = initialState.pagination
    },
    resetAlert: (state) => {
      state.alert = initialState.alert
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPosts.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.posts = action.payload
        state.pagination = initialState.pagination
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(getApprovedPosts.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getApprovedPosts.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.posts = action.payload.posts
        state.pagination = action.payload.pagination
      })
      .addCase(getApprovedPosts.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(getUnapprovedPosts.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getUnapprovedPosts.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.posts = action.payload
        state.pagination = initialState.pagination
      })
      .addCase(getUnapprovedPosts.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(getPostDetails.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getPostDetails.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.posts = action.payload
        state.pagination = initialState.pagination
      })
      .addCase(getPostDetails.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.alert = action.payload
      })
      .addCase(createPost.rejected, (state, action) => {
        state.alert = action.payload
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.alert = action.payload.alert
        state.posts = state.posts.map((post) =>
          action.payload.post._id === post._id ? action.payload.post : post
        )
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.alert = action.payload
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.alert = action.payload.alert
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.postId
        )
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.alert = action.payload
      })
      .addCase(approvePost.fulfilled, (state, action) => {
        state.alert = action.payload.alert
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.postId
        )
      })
      .addCase(approvePost.rejected, (state, action) => {
        state.alert = action.payload
      })
      .addCase(rejectPost.fulfilled, (state, action) => {
        state.alert = action.payload.alert
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.postId
        )
      })
      .addCase(rejectPost.rejected, (state, action) => {
        state.alert = action.payload
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          action.payload._id === post._id ? action.payload : post
        )
      })
      .addCase(likePost.rejected, (state, action) => {
        state.alert = action.payload
      })
      .addCase(applyToContribute.fulfilled, (state, action) => {
        state.alert = action.payload.alert
        state.posts = state.posts.map((post) =>
          action.payload.post._id === post._id ? action.payload.post : post
        )
      })
      .addCase(applyToContribute.rejected, (state, action) => {
        state.alert = action.payload
      })
      .addCase(approveContributor.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          action.payload._id === post._id ? action.payload : post
        )
      })
      .addCase(approveContributor.rejected, (state, action) => {
        state.alert = action.payload
      })
      .addCase(rejectContributor.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          action.payload._id === post._id ? action.payload : post
        )
      })
      .addCase(rejectContributor.rejected, (state, action) => {
        state.alert = action.payload
      })
  },
})

export const { setPage, resetPagination, resetAlert } = postSlice.actions
export default postSlice.reducer
