import { QueryFunctionContext } from '@tanstack/react-query'
import { projectsClient } from '../../api/AxiosClients'
import { ProjectViewModel } from '../../models/Projects/ProjectViewModel'
import { PaginatedProjectsViewModel } from '../../models/Projects/PaginatedProjectsViewModel'
import { AlertViewModel } from '../../models/Alert/AlertViewModel'
import { ObjectId } from 'mongoose'

export const getUserProjects = async (): Promise<ProjectViewModel[]> => {
  const { data } = await projectsClient.get('/')
  return data
}

export const getApprovedProjects = async ({
  queryKey,
}: QueryFunctionContext<
  [
    string,
    {
      pagination?: {
        page?: number
        limit?: number
        genre?: string
        user?: string
      }
    }
  ]
>): Promise<PaginatedProjectsViewModel> => {
  const { data } = await projectsClient.get('/approved', {
    params: { ...queryKey[1].pagination },
  })
  return data
}

export const getUnapprovedProjects = async (): Promise<ProjectViewModel[]> => {
  const { data } = await projectsClient.get('/unapproved')
  return data
}

export const getProjectDetails = async ({
  queryKey,
}: QueryFunctionContext<
  [string, { projectId: string }]
>): Promise<ProjectViewModel> => {
  const { data } = await projectsClient.get(`/${queryKey[1].projectId}`)
  return data
}

export const createProject = async (
  projectData: FormData
): Promise<{ project: ProjectViewModel; alert: AlertViewModel }> => {
  const { data } = await projectsClient.post('/', projectData)
  return data
}

export const updateProject = async (projectData: {
  projectId: ObjectId
  data: FormData
}): Promise<{ project: ProjectViewModel; alert: AlertViewModel }> => {
  const { data } = await projectsClient.put(
    `/${projectData.projectId}`,
    projectData.data
  )
  return data
}

export const deleteProject = async (
  projectId: ObjectId
): Promise<{ project: ProjectViewModel; alert: AlertViewModel }> => {
  const { data } = await projectsClient.delete(`/${projectId}`)
  return data
}

export const approveProject = async (
  projectId: ObjectId
): Promise<{ project: ProjectViewModel; alert: AlertViewModel }> => {
  const { data } = await projectsClient.patch(`/${projectId}/approve`)
  return data
}

export const likeProject = async (
  projectId: ObjectId
): Promise<ProjectViewModel> => {
  const { data } = await projectsClient.patch(`/${projectId}/like`)
  return data
}
