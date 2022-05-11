import axios from 'axios'
import { User, UserLogin, UserRegister } from '../../models/User'

const API_URL = '/api/users/'

// Register user
// POST /api/users/register
const registerUser = async (userData: UserRegister) => {
  const response = await axios.post(API_URL + 'register', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
// POST /api/users/login
const loginUser = async (userData: UserLogin) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
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

// Logout user
const logoutUser = () => {
  localStorage.removeItem('user')
}

const userService = {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
}

export default userService
