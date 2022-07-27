import { useQuery } from '@tanstack/react-query'
import {
  getApprovedPosts,
  getPostDetails,
  getUnapprovedPosts,
  getUserPosts,
} from './services'

export const useGetUserPosts = (options = {}) =>
  useQuery(['posts', 'owned'], getUserPosts, { ...options })

export const useGetApprovedPosts = (
  pagination?: { page?: number; limit?: number; genre?: string; user?: string },
  options = {}
) =>
  useQuery(['posts', { pagination }], getApprovedPosts, {
    ...options,
  })

export const useGetUnapprovedPosts = (options = {}) =>
  useQuery(['posts', 'unapproved'], getUnapprovedPosts, { ...options })

export const useGetPostDetails = (postId: string, options = {}) =>
  useQuery(['posts', { postId }], getPostDetails, { ...options })
