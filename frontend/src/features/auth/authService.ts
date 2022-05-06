import axios from 'axios'
import { User, UserLogin, UserRegister } from '../../models/User'
import { ObjectId } from 'mongoose'

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
const updateUser = async (
  userId: ObjectId,
  updatedData: User,
  token: string | undefined
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + `${userId}/update`,
    updatedData,
    config
  )

  return response.data
}

// Logout user
const logoutUser = () => {
  localStorage.removeItem('user')
}

const authService = {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
}

export default authService
