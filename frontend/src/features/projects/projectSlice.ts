import { projectsClient } from '../../api/AxiosClients'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ObjectId } from 'mongoose'
import { ProjectViewModel } from '../../models/Projects/ProjectViewModel'
import { PaginatedProjectsViewModel } from '../../models/Projects/PaginatedProjectsViewModel'
import { PaginationViewModel } from '../../models/Pagination/PaginationViewModel'
import { AlertViewModel } from '../../models/Alert/AlertViewModel'

interface IProjectState {
  projects: ProjectViewModel[]
  pagination: PaginationViewModel
  loading: 'idle' | 'pending' | 'fulfilled' | 'failed'
  alert: AlertViewModel | undefined
}

const initialState: IProjectState = {
  projects: [],
  pagination: {
    page: 0,
    limit: 10,
    totalPages: 1,
  },
  loading: 'idle',
  alert: undefined,
}

// Get user projects
// GET /api/projects
export const getUserProjects = createAsyncThunk<
  ProjectViewModel[],
  void,
  { rejectValue: AlertViewModel }
>('projects/userProjects', async (_, thunkAPI) => {
  try {
    const { data } = await projectsClient.get('/')
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Get approved projects
// GET /api/projects/approved?page=number&limit=number&genre=string&user=string
export const getApprovedProjects = createAsyncThunk<
  PaginatedProjectsViewModel,
  { page?: number; limit?: number; genre?: string; user?: string } | undefined,
  { rejectValue: AlertViewModel }
>('projects/approved', async (pagination, thunkAPI) => {
  try {
    const { data } = await projectsClient.get('/approved', {
      params: { ...pagination },
    })
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Get unapproved projects
// GET /api/projects/unapproved
export const getUnapprovedProjects = createAsyncThunk<
  ProjectViewModel[],
  void,
  { rejectValue: AlertViewModel }
>('projects/unapproved', async (_, thunkAPI) => {
  try {
    const { data } = await projectsClient.get('/unapproved')
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Get project details
// GET /api/projects/:id
export const getProjectDetails = createAsyncThunk<
  ProjectViewModel[],
  string,
  { rejectValue: AlertViewModel }
>('projects/details', async (projectId, thunkAPI) => {
  try {
    const { data } = await projectsClient.get(`/${projectId}`)
    const arr = []
    arr.push(data)
    return arr
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Create project
// POST /api/projects
export const createProject = createAsyncThunk<
  AlertViewModel,
  FormData,
  { rejectValue: AlertViewModel }
>('projects/create', async (projectData, thunkAPI) => {
  try {
    const { data } = await projectsClient.post('/', projectData)
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Update project
// PUT /api/projects/:id
export const updateProject = createAsyncThunk<
  { project: ProjectViewModel; alert: AlertViewModel },
  { projectId: ObjectId; data: FormData },
  { rejectValue: AlertViewModel }
>('projects/update', async (projectData, thunkAPI) => {
  try {
    const { data } = await projectsClient.put(
      `/${projectData.projectId}`,
      projectData.data
    )
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Delete project
// DELETE /api/projects/:id
export const deleteProject = createAsyncThunk<
  { projectId: ObjectId; alert: AlertViewModel },
  ObjectId,
  { rejectValue: AlertViewModel }
>('projects/delete', async (projectId, thunkAPI) => {
  try {
    const { data } = await projectsClient.delete(`/${projectId}`)
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Approve project
// PATCH /api/projects/:id/approve
export const approveProject = createAsyncThunk<
  { projectId: ObjectId; alert: AlertViewModel },
  ObjectId,
  { rejectValue: AlertViewModel }
>('projects/approve', async (projectId, thunkAPI) => {
  try {
    const { data } = await projectsClient.patch(`/${projectId}/approve`)
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Like project
// PATCH /api/projects/:id/like
export const likeProject = createAsyncThunk<
  ProjectViewModel,
  ObjectId,
  { rejectValue: AlertViewModel }
>('projects/like', async (projectId, thunkAPI) => {
  try {
    const { data } = await projectsClient.patch(`/${projectId}/like`)
    return data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const projectSlice = createSlice({
  name: 'projects',
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
      .addCase(getUserProjects.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getUserProjects.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.projects = action.payload
        state.pagination = initialState.pagination
      })
      .addCase(getUserProjects.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(getApprovedProjects.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getApprovedProjects.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.projects = action.payload.projects
        state.pagination = action.payload.pagination
      })
      .addCase(getApprovedProjects.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(getUnapprovedProjects.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getUnapprovedProjects.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.projects = action.payload
        state.pagination = initialState.pagination
      })
      .addCase(getUnapprovedProjects.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(getProjectDetails.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getProjectDetails.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.projects = action.payload
        state.pagination = initialState.pagination
      })
      .addCase(getProjectDetails.rejected, (state, action) => {
        state.loading = 'failed'
        state.alert = action.payload
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.alert = action.payload
      })
      .addCase(createProject.rejected, (state, action) => {
        state.alert = action.payload
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.alert = action.payload.alert
        state.projects = state.projects.map((project) =>
          action.payload.project._id === project._id
            ? action.payload.project
            : project
        )
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.alert = action.payload
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.alert = action.payload.alert
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload.projectId
        )
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.alert = action.payload
      })
      .addCase(approveProject.fulfilled, (state, action) => {
        state.alert = action.payload.alert
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload.projectId
        )
      })
      .addCase(approveProject.rejected, (state, action) => {
        state.alert = action.payload
      })
      .addCase(likeProject.fulfilled, (state, action) => {
        state.projects = state.projects.map((project) =>
          action.payload._id === project._id ? action.payload : project
        )
      })
  },
})

export const { setPage, resetPagination, resetAlert } = projectSlice.actions
export default projectSlice.reducer
