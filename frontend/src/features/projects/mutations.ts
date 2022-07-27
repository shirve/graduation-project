import { useMutation } from '@tanstack/react-query'
import {
  createProject,
  updateProject,
  deleteProject,
  approveProject,
  likeProject,
} from './services'

export const useCreateProject = (options = {}) =>
  useMutation(createProject, { mutationKey: ['createProject'], ...options })

export const useUpdateProject = (options = {}) =>
  useMutation(updateProject, {
    mutationKey: ['updateProject'],
    ...options,
  })

export const useDeleteProject = (options = {}) =>
  useMutation(deleteProject, {
    mutationKey: ['deleteProject'],
    ...options,
  })

export const useApproveProject = (options = {}) =>
  useMutation(approveProject, {
    mutationKey: ['approveProject'],
    ...options,
  })

export const useLikeProject = (options = {}) =>
  useMutation(likeProject, {
    mutationKey: ['likeProject'],
    ...options,
  })
