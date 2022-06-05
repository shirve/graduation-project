import axios from 'axios'

const usersClient = axios.create({
  baseURL: '/api/users',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const postsClient = axios.create({
  baseURL: '/api/posts',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const projectsClient = axios.create({
  baseURL: '/api/projects',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const setAxiosAuthorizationHeaders = (token: string): void => {
  usersClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  postsClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  projectsClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export {
  setAxiosAuthorizationHeaders,
  usersClient,
  postsClient,
  projectsClient,
}
