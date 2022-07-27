import { useMutation } from '@tanstack/react-query'
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  changePassword,
} from './services'

export const useRegisterUser = (options = {}) =>
  useMutation(registerUser, { mutationKey: ['registerUser'], ...options })

export const useLoginUser = (options = {}) =>
  useMutation(loginUser, {
    mutationKey: ['loginUser'],
    ...options,
  })

export const useLogoutUser = (options = {}) =>
  useMutation(logoutUser, {
    mutationKey: ['logoutUser'],
    ...options,
  })

export const useUpdateUser = (options = {}) =>
  useMutation(updateUser, {
    mutationKey: ['updateUser'],
    ...options,
  })

export const useChangePassword = (options = {}) =>
  useMutation(changePassword, {
    mutationKey: ['changePassword'],
    ...options,
  })
