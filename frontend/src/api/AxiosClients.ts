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

export { postsClient, usersClient }
