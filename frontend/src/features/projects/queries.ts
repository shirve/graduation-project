import { useQuery } from '@tanstack/react-query'
import {
  getApprovedProjects,
  getProjectDetails,
  getUnapprovedProjects,
  getUserProjects,
} from './services'

export const useGetUserProjects = (options = {}) =>
  useQuery(['projects', 'owned'], getUserProjects, { ...options })

export const useGetApprovedProjects = (
  pagination?: { page?: number; limit?: number; genre?: string; user?: string },
  options = {}
) =>
  useQuery(['projects', { pagination }], getApprovedProjects, {
    ...options,
  })

export const useGetUnapprovedProjects = (options = {}) =>
  useQuery(['projects', 'unapproved'], getUnapprovedProjects, { ...options })

export const useGetProjectDetails = (projectId: string, options = {}) =>
  useQuery(['projects', { projectId }], getProjectDetails, { ...options })
