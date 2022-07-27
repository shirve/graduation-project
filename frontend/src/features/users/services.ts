import { QueryFunctionContext } from '@tanstack/react-query'
import { usersClient } from '../../api/AxiosClients'
import { UserViewModel } from '../../models/Users/UserViewModel'
import { UserDetailsViewModel } from '../../models/Users/UserDetailsViewModel'
import { UserRegisterViewModel } from '../../models/Users/UserRegisterViewModel'
import { UserLoginViewModel } from '../../models/Users/UserLoginViewModel'
import { UserPasswordChangeViewModel } from '../../models/Users/UserPasswordChangeViewModel'
import { AlertViewModel } from '../../models/Alert/AlertViewModel'

export const registerUser = async (
  userData: UserRegisterViewModel
): Promise<string> => {
  const { data } = await usersClient.post('/register', userData)
  return data
}

export const loginUser = async (
  userData: UserLoginViewModel
): Promise<string> => {
  const { data } = await usersClient.post('/login', userData)
  return data
}

export const logoutUser = async () => await usersClient.post('/logout')

export const updateUser = async (
  userData: UserDetailsViewModel
): Promise<{ user: UserViewModel; alert: AlertViewModel }> => {
  const { data } = await usersClient.put('/', userData)
  return data
}

export const changePassword = async (
  userData: UserPasswordChangeViewModel
): Promise<AlertViewModel> => {
  const { data } = await usersClient.patch('/chpasswd', userData)
  return data
}

export const getUserDetails = async ({
  queryKey,
}: QueryFunctionContext<
  [string, { userId: string }]
>): Promise<UserDetailsViewModel> => {
  const { data } = await usersClient.get(`/${queryKey[1].userId}`)
  return data
}

export const authenticateUser = async (): Promise<
  | {
      user: UserViewModel
      token: string
    }
  | ''
> => {
  const { data } = await usersClient.get('/auth')
  return data
}
