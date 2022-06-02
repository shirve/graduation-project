import axios from 'axios'

export const setAxiosAuthorizationHeaders = (token: string): void => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
