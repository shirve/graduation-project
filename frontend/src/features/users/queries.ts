import { useQuery } from '@tanstack/react-query'
import { getUserDetails, authenticateUser } from './services'

export const useGetUserDetails = (userId: string, options = {}) =>
  useQuery(['users', { userId }], getUserDetails, { ...options })

export const useAuthenticateUser = (options = {}) =>
  useQuery(['users', 'auth'], authenticateUser, { ...options })
