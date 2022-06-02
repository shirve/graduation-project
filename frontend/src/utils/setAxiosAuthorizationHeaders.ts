import { postsClient, usersClient } from '../api/AxiosClients'

export const setAxiosAuthorizationHeaders = (token: string): void => {
  postsClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  usersClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
