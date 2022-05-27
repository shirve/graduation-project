import axios from 'axios'
import { UserViewModel } from '../../models/Users/UserViewModel'
import { UserLoginViewModel } from '../../models/Users/UserLoginViewModel'
import { UserRegisterViewModel } from '../../models/Users/UserRegisterViewModel'

const API_URL = '/api/users/'

// Register user
// POST /api/users/register
const registerUser = async (userData: UserRegisterViewModel) => {
  const response = await axios.post(API_URL + 'register', userData)

  return response.data
}

// Login user
// POST /api/users/login
const loginUser = async (userData: UserLoginViewModel) => {
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
const updateUser = async (
  userData: UserViewModel,
  token: string | undefined
) => {
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
