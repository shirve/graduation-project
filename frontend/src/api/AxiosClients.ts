import axios from 'axios'

const postsClient = axios.create({
  baseURL: '/api/posts',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const usersClient = axios.create({
  baseURL: '/api/users',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const setAxiosAuthorizationHeaders = (token: string): void => {
  postsClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  usersClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { setAxiosAuthorizationHeaders, postsClient, usersClient }
