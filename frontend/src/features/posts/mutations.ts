import { useMutation } from '@tanstack/react-query'
import {
  createPost,
  updatePost,
  deletePost,
  approvePost,
  rejectPost,
  likePost,
  applyToContribute,
  approveContributor,
  rejectContributor,
} from './services'

export const useCreatePost = (options = {}) =>
  useMutation(createPost, { mutationKey: ['createPost'], ...options })

export const useUpdatePost = (options = {}) =>
  useMutation(updatePost, {
    mutationKey: ['updatePost'],
    ...options,
  })

export const useDeletePost = (options = {}) =>
  useMutation(deletePost, {
    mutationKey: ['deletePost'],
    ...options,
  })

export const useApprovePost = (options = {}) =>
  useMutation(approvePost, {
    mutationKey: ['approvePost'],
    ...options,
  })

export const useRejectPost = (options = {}) =>
  useMutation(rejectPost, {
    mutationKey: ['rejectPost'],
    ...options,
  })

export const useLikePost = (options = {}) =>
  useMutation(likePost, {
    mutationKey: ['likePost'],
    ...options,
  })

export const useApplyToContribute = (options = {}) =>
  useMutation(applyToContribute, {
    mutationKey: ['applyToContribute'],
    ...options,
  })

export const useApproveContributor = (options = {}) =>
  useMutation(approveContributor, {
    mutationKey: ['approveContributor'],
    ...options,
  })

export const useRejectContributor = (options = {}) =>
  useMutation(rejectContributor, {
    mutationKey: ['rejectContributor'],
    ...options,
  })
