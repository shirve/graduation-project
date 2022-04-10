import axios from 'axios'
import { User, UserLogin, UserRegister } from '../../models/User'
import { ObjectId } from 'mongoose'

const API_URL = '/api/users/'

// Register user
const register = async (userData: UserRegister) => {
  const response = await axios.post(API_URL + 'register', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData: UserLogin) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

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
    API_URL + `update/${userId}`,
    updatedData,
    config
  )

  return response.data
}

const authService = {
  register,
  login,
  logout,
  updateUser,
}

export default authService
