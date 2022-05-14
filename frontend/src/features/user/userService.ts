import axios from 'axios'
import { User, UserLogin, UserRegister } from '../../models/User'

const API_URL = '/api/users/'

// Register user
// POST /api/users/register
const registerUser = async (userData: UserRegister) => {
  const response = await axios.post(API_URL + 'register', userData)

  return response.data
}

// Login user
// POST /api/users/login
const loginUser = async (userData: UserLogin) => {
  const response = await axios.post(API_URL + 'login', userData)

  return response.data
}

// Logout user
// POST /api/users/logout
const logoutUser = async () => {
  await axios.post(API_URL + 'logout')
}

// Update user
// PUT /api/users/:id/update
const updateUser = async (userData: User, token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + `${userData._id}/update`,
    userData,
    config
  )

  return response.data
}

const userService = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
}

export default userService
